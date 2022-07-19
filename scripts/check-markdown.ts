import * as path            from 'path';
import * as fs              from 'fs';

import { promisify }        from 'util';
import { fromMarkdown }     from 'mdast-util-from-markdown'
import { Parent, Root }     from 'mdast-util-from-markdown/lib';

const readdirAsync      = promisify(fs.readdir);
const statAsync         = promisify(fs.stat);

const ignoreFolders = [
    "node_modules",
    ".bin",
    ".obj",
    ".git",
    ".idea",
    ".vs",
    ".run"
];

const ignoreFiles = [
    "class-diagram.md"
];

async function scanMarkdownFiles(directoryPath: string, results : string[] = []) {
    let files = await readdirAsync(directoryPath);
    // console.log(`${directoryPath}    ${files.length}`)

    for (let filename of files) {
        let fullPath: string = path.join(directoryPath, filename);
        fullPath = fullPath.replaceAll("\\", "/");
        let stat = await statAsync(fullPath);
        if (stat.isDirectory()) {
            if (ignoreFolders.indexOf(filename) != - 1) {
                continue;
            }
            await scanMarkdownFiles(fullPath, results);
        } else {
            if (ignoreFiles.indexOf(filename) != - 1) {
                continue;
            }       
            if (fullPath.endsWith(".md")) {
                results.push(fullPath);
            }
        }
    }
    return results;
}

type MdLink = {
    url:    string;
    line:   number;
    column:    number;
}

type Error = {
    message:    string;
    line:       number;
    column:     number;
}

type Markdown = {
    path:       string,
    folder:     string,
    links:      MdLink[],
    anchors:    { [anchor: string] : true }
    errors:     Error[]
}

type MarkdownMap = { [path: string] : Markdown };

type MarkdownContext = {
    markdownMap:    MarkdownMap,
    externalLinks:  string[],
}

function textFromNode(node: Parent, texts: string[])  {
    const children = node.children
    for (const name in children) {
        const child = children[name];
        const node  = child as Parent;
        switch(child.type) {
            case "text":        texts.push(child.value);    break;
            case "inlineCode":  texts.push(child.value);    break;
        }
        if (node.children) {
            textFromNode(node, texts);
        }  
    }
}

function markdownFromTree(tree: Parent, markdown: Markdown) {
    const children = tree.children
    for (const child of children) {
        const node  = child as Parent;
        if (node.children) {
            markdownFromTree(node, markdown);
        }
        if (node.type == "link") {
            const start = node.position.start;
            const link: MdLink = {
                url:    node.url,
                line:   start.line,
                column: start.column
            }
            markdown.links.push(link);
        }
        if (node.type == "heading") {    
            const texts: string[] = [];
            textFromNode (node, texts);
            const label = normalizeAnchorLink(texts.join(""));
            markdown.anchors[label] = true;
        }    
    }
}

function normalizeAnchorLink (anchor: string) : string {
    anchor = anchor.trim().toLocaleLowerCase();
    let result = "";
    for (let i = 0; i < anchor.length; i++) {
        const c = anchor.charCodeAt(i);
        if ((48 <= c && c <= 57)   ||    // 0..9
            (97 <= c && c <= 122))       // a..z
        {
            result += anchor[i];
            continue;
        }
        if (c == 32) {                  // ' '
            result += '-';
            continue;
        }        
    }
    return result;
}

function parseMarkdown(filePath: string) : Markdown {
    const content       = fs.readFileSync(filePath, {encoding: 'utf8'});
    const tree: Root    = fromMarkdown(content);
    const folder        = path.dirname(filePath);

    const markdown: Markdown = {
        path:       filePath,
        folder:     folder,
        links:      [],
        anchors:    {},
        errors:     []
    };
    markdownFromTree (tree, markdown);
    return markdown;
}

function checkLinks (cwd: string, markdown: Markdown, context: MarkdownContext) {
    for (const link of markdown.links) {
        const line      = link.line;
        const column    = link.column;
        const url       = link.url;
        if (url.startsWith("http://")   ||
            url.startsWith("https://")
        ) {
            context.externalLinks.push(url);
            continue;
        }
        const hashPos   = url.indexOf("#");
        const urlPath   = hashPos == -1 ? url :  url.substring(0, hashPos);
        const target    = path.normalize(markdown.folder + "/" + urlPath).replaceAll("\\", "/");

        if (hashPos != -1) {
            const targetMarkdown= hashPos == 0 ? markdown : context.markdownMap[target];
            if (!targetMarkdown) {
                markdown.errors.push ({message: "broken link", line, column});
            } else {
                const hash = url.substring(hashPos + 1);
                if (!targetMarkdown.anchors[hash]) {
                    markdown.errors.push ({message: `hash not found: ${hash}`, line, column});
                }
            }
            continue;
        }
        if (!fs.existsSync(cwd + target)) {
            markdown.errors.push ({message: `broken link: ${target}`, line, column});
        }
    }
}

function logExternalLinks(externalLinks: string[]) {
    console.log("---------- external links ----------");
    externalLinks.sort();
    let last: string = null;
    for (const link of externalLinks) {
        if (link == last)
            continue;
        last = link;
        console.log(link);
    }
}

async function main() : Promise<number> {
    const cwd = process.cwd();
    console.log(`cwd: ${cwd}\n`);

    // --- scan all markdown files in folder
    const files = await scanMarkdownFiles("./");

    const markdownMap : MarkdownMap = {};
    const context:      MarkdownContext = {
        markdownMap:    markdownMap,
        externalLinks:  []
    }
    const debugFile = null; // "README.md";
    if (debugFile) {
        parseMarkdown(debugFile);
    }

    // --- parse all markdown files
    for (const file of files) {
        const markdown = parseMarkdown(file);
        markdownMap[file] = markdown;
        // console.log(markdown);
        console.log("./" + file);
    }
    if (debugFile) {
        console.log(markdownMap[debugFile]);
        checkLinks(cwd + "/", markdownMap[debugFile], context);
    }

    // --- check links in all markdown files
    let errorCount = 0;
    for (const path in markdownMap) {
        const markdown = markdownMap[path];
        checkLinks(cwd + "/", markdown, context);
        errorCount += markdown.errors.length;
    }

    // --- render results & errors
    console.log (`\n ${errorCount} errors`);
    for (const path in markdownMap) {
        const markdown = markdownMap[path];
        for (const error of markdown.errors) {
            console.log(`${cwd + "/" + markdown.path}:${error.line}:${error.column}   - error ${error.message}`);
        }
    }
    console.log (``);
    if (process.argv.indexOf("--links") != -1) {
        logExternalLinks (context.externalLinks);
    }
    return errorCount;
}

const errorCount = await main();
if (errorCount != 0) process.exit(1);
