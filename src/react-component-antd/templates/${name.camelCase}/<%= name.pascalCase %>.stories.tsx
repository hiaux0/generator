import type { Meta, StoryObj } from '@storybook/react';

import <%= name.pascalCase %> from './<%= name.pascalCase %>';

// CSF 3.0
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof <%= name.pascalCase %>> = {
  component: <%= name.pascalCase %>,
  title: '<%= atomicType.pascalCase %>s/<%= name.pascalCase %>',
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof <%= name.pascalCase %>>;

export const Default<%= name.antdComponentName %>: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {},
};
