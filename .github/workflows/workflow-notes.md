

# 2022-07-16  Build error:

https://github.com/friflo/FlioxHub.Demos/runs/7372704105

This and 11 previous builds failed for the same reason:

```
Demo -> /home/runner/work/FlioxHub.Demos/FlioxHub.Demos/Demo/Client/bin/Debug/net6.0/Demo.dll
/home/runner/.dotnet/sdk/6.0.302/Sdks/Microsoft.NET.Sdk/targets/Microsoft.NET.Sdk.targets(176,5): error MSB4018: The "GenerateDepsFile" task failed unexpectedly. [/home/runner/work/FlioxHub.Demos/FlioxHub.Demos/Demo/Client/Demo.csproj]
/home/runner/.dotnet/sdk/6.0.302/Sdks/Microsoft.NET.Sdk/targets/Microsoft.NET.Sdk.targets(176,5): error MSB4018: System.IO.IOException: The process cannot access the file '/home/runner/work/FlioxHub.Demos/FlioxHub.Demos/Demo/Client/bin/Debug/net6.0/Demo.deps.json' because it is being used by another process. [/home/runner/work/FlioxHub.Demos/FlioxHub.Demos/Demo/Client/Demo.csproj]
...
Build FAILED.
```

Similar to:
[GenerateDepsFile: The process cannot access the file '...\MyProject.deps.json' because it is being used by another process.](https://github.com/dotnet/sdk/issues/2902#issuecomment-460742123)

## Solution

[Github Actions - analyse: GenerateDepsFile error](https://github.com/friflo/FlioxHub.Demos/commit/1a6fefc26a1b5d60c43a1f9eb7c389fc0e46dfed)

remove `--framework net6.0`  
in yml ->
```
    - name: Build
      run: |
        dotnet build --no-restore
```

Info: Observe further builds to check if solution fixes this Build error.