import * as _ from 'lodash';
import BaseTemplateGenerator from '../BaseTemplateGenerator';
import { resolveGeneratorInheritance } from '../GeneratorResolver';

/**
 * 0. questions (-> #prompting())
 * 1. /template dir as sibling of this file
 * 2. creating/appending to index of parent (-> #install())
 *
 * <%= antdComponentName.pascalCase %>
 * <%= name.pascalCase %>
 */
class ReactComponentAntd extends BaseTemplateGenerator {
  private get folderName(): string {
    if (!this.answers) {
      return '';
    }

    if (this.answers.feature) {
      return `features/${this.answers.feature}/${this.answers.atomicType}s`;
    }

    return `src/ui/${this.answers.atomicType}s`;
    // todo care for correct directory path

    return `${this.answers.atomicType}s`;
  }

  constructor(args: any, options: any) {
    super(args, options);
  }

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'name',
        message: 'Component name'
      },
      // {
      //   type: 'input',
      //   name: 'componentPrefix',
      //   message: 'What component prefix are you using? (Enter, if not using any)',
      //   default: ''
      // },
      {
        type: 'list',
        name: 'atomicType',
        message: 'Select an Atomic Design type:',
        choices: [
          { name: 'Atom - Smallest unit of a UI element', value: 'atom' },
          { name: 'Molecule - Group of atoms working together', value: 'molecule' },
          { name: 'Organism - Group of molecules working together', value: 'organism' },
          { name: 'Template - Generic layout for a type of page', value: 'template' },
          { name: 'Page - Instance of a template with real content', value: 'page' }
        ]
      }
    ]);
    this.answers.addStorybookFile = true;
    this.answers.enableMobxObserver = false;
    this.answers.features = '';
    /** To get antd component used to import from antd */
    this.answers.componentPrefix = 'Rfs';
    this.answers.antdComponentName = this.answers.name.replace(this.answers.componentPrefix, '');
  }

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.folderName;
    this.copyTemplateToDestination(this.folderName);
  }

  // Where installation are run (npm, bower)
  public install(): void {
    const camelCaseName = _.camelCase(this.answers.name);
    // Add export to folderName/index.ts
    const indexFilePath = this.destinationPath(`${this.folderName}/index.ts`);
    const exportLine = `export * from './${camelCaseName}';`;
    if (this.fs.exists(indexFilePath)) {
      // If index file exists, append exportLine to end of file
      const data = this.fs.read(indexFilePath);
      if (!data.includes(exportLine)) {
        this.fs.append(indexFilePath, `${exportLine}\n`);
      }
    } else {
      // If index file does not exist, create it with exportLine
      this.fs.write(indexFilePath, `${exportLine}\n`);
    }

    // Remove storybook file, if not needed
    if (!this.answers.addStorybookFile) {
      const pascalCaseName = this.pascalCase(this.answers.name);
      const storybookFilePath = this.destinationPath(
        `${this.folderName}/${camelCaseName}/${pascalCaseName}.stories.tsx`
      );
      if (this.fs.exists(storybookFilePath)) {
        this.fs.delete(storybookFilePath);
      }
    }
  }
}

export default resolveGeneratorInheritance(ReactComponentAntd);
