import { getSlnSelectionOptions, addProjectToSln, toPascalCase } from '../DotnetHelpers';
import BaseDotnetTemplateGenerator from '../BaseDotnetTemplateGenerator';
import _ = require('lodash');

class LibraryDotnetGenerator extends BaseDotnetTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Your initialization methods (checking current project state, getting configs, etc
  public initialize(): void {}

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      this.slnPrompt,
      {
        type: 'input',
        name: 'folder',
        message: 'Subfolder name (optional)',
        default: ''
      },
      {
        type: 'input',
        name: 'name',
        message: 'Project name',
        default: `Wemogy.${toPascalCase(this.appname)}.Shared.Core`
      },
      {
        type: 'confirm',
        name: 'nuget',
        message: 'Packable via NuGet?',
        default: true,
        followUpQuestions: [
          {
            type: 'input',
            name: 'nugetRepoUrl',
            message: 'Nuget: GitHub Repository Url'
          },
          {
            type: 'input',
            name: 'nugetDescription',
            message: 'NuGet: Package description'
          }
        ]
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.composeSolutionIfNeeded();
    this.copyTemplateToDestination(this.destinationPath(this.getProjectPath()));
  }

  // Where installation are run (npm, bower)
  public install(): void {
    // Add Library to Solution
    addProjectToSln.bind(this)(
      this.getSolutionPath(),
      this.destinationPath(`${this.getProjectPath()}/${this.answers.name}/${this.answers.name}.csproj`)
    );

    // Add UnitTests to Solution
    addProjectToSln.bind(this)(
      this.getSolutionPath(),
      this.destinationPath(
        `${this.getProjectPath()}/${this.answers.name}.UnitTests/${this.answers.name}.UnitTests.csproj`
      )
    );
  }

  private getProjectPath(): string {
    if (this.answers.folder) {
      return `src/${_.kebabCase(this.answers.folder)}`;
    }
    return 'src';
  }

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default LibraryDotnetGenerator;
