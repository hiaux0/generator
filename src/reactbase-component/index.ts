import _ = require('lodash');
import BaseTemplateGenerator from '../BaseTemplateGenerator';
import { resolveGeneratorInheritance } from '../GeneratorResolver';

class ReactbaseComponent extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'name',
        message: 'Component Name',
        default: 'MyComponent'
      }
    ]);
  }

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.appendToIndex();
    this.copyTemplateToDestination();
  }

  private appendToIndex(): void {
    const indexPath = this.destinationPath() + '/index.ts';
    const componentName = this.pascalCase(this.answers.name);
    const line = `export { default as ${componentName} } from 'ui/core/${componentName}';`;
    this.appendLine(indexPath, line);
  }
}

export default resolveGeneratorInheritance(ReactbaseComponent);
