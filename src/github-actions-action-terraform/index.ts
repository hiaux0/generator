import BaseTemplateGenerator from '../BaseTemplateGenerator';

class GitHubActionsTerraformActionGenerator extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Your initialization methods (checking current project state, getting configs, etc
  public initialize(): void {}

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      {
        type: 'confirm',
        name: 'kubernetes',
        message: 'Do you have an additional Terraform script for Kubernetes?',
        default: false
      },
      {
        type: 'confirm',
        name: 'sameBackends',
        message: 'Do all backends use the same Azure Storage Account?',
        default: true,
        followUpQuestions: [
          {
            type: 'input',
            name: 'storageAccountName',
            message: 'Azure Storage Account Name?'
          }
        ]
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.fs.copyTpl(this.templatePath(), this.destinationPath('.github/workflows'), this.answers);
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default GitHubActionsTerraformActionGenerator;