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
      {
        type: 'input',
        name: 'targetDirectory',
        message: 'Target directory',
        default: 'src'
      },
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

    // Add XUnit Test Project
    this.composeWith('wemogy:test-dotnet', {
      targetDirectory: this.options.targetDirectory,
      solutionName: this.answers.solutionName,
      folder: this.answers.folder,
      name: `${this.answers.name}.UnitTests`,
      skipEclint: true
    });
  }

  // Where installation are run (npm, bower)
  public install(): void {
    // Add Library to Solution
    addProjectToSln.bind(this)(
      this.getSolutionPath(),
      this.destinationPath(`${this.getProjectPath()}/${this.answers.name}/${this.answers.name}.csproj`)
    );
  }

  private getProjectPath(): string {
    if (this.answers.folder) {
      const folderPath = this.answers.folder.split('/').map(_.kebabCase).join('/');
      return `${this.options['targetDirectory']}/${folderPath}`;
    }
    return this.options['targetDirectory'];
  }

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default LibraryDotnetGenerator;
