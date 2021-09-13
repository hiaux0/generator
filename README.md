# Yeoman Code Generator

![npm](https://img.shields.io/npm/v/generator-wemogy)

## Get it running

```bash
npm install -g generator-wemogy
```

```bash
yo wemogy
```

## What can be generated?

### New wemogy project

| Type | Description | Direct command |
|---|---|---|
| Basic project structure | Scaffolds the basic components of every repository like EditorConfig and Readme. | `yo wemogy-project-core` |
| SDK (.NET) | An SDK Class Library for other .NET projects | `yo wemogy-project-sdk-dotnet` |
| Service / Microservice (.NET) | ASP.NET Web Api project to create small services | `yo wemogy-project-service-dotnet` |
| Class Library (.NET)  | .NET Class Library for shared components. | `yo wemogy-project-lib-dotnet` |

### Other templates

| Category | Type | Description | Direct command |
|---|---|---|---|
| .NET | Solution |  | `yo wemogy-dotnet-solution` |
| .NET | Class Library |  | `yo wemogy-dotnet-classlib` |
| .NET | ASP.NET Web Api |  | `yo wemogy-dotnet-aspnet` |
| .NET | xUnit Tests |  | `yo wemogy-dotnet-xunit` |
| Terraform | Azure Kubernetes Service (AKS) |  | `yo wemogy-terraform-aks` |
| Terraform | Kubernetes Cluster configuration |  | `yo wemogy-terraform-kubernetes` |
| Yeoman | Template Generator |  | `yo wemogy-terraform-template` |
| Yeoman | Selector Generator |  | `yo wemogy-terraform-selector` |

## Development

Open a Terminal at the repository root and run the following commands.

```bash
yarn install
```

Start the development using the following command in the root directory.

```bash
yarn develop
```

To test the generator, create a `test` folder in the same repository at root level

```bash
mkdir test
cd test
```

Now link the generator

```bash
yarn link
yarn link generator-wemogy
```

Run the following command to start and test the generator

```bash
yo wemogy
```

To remove the linked generator, run the following command

```bash
yarn unlink

# Check, if removal was successful
npm list -g --depth=0
```
