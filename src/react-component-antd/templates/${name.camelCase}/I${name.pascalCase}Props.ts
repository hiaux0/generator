import React from 'react';
import { <%= antdComponentName.pascalCase %>Props } from 'antd';

export default interface I<%= name.pascalCase %>Props extends <%= antdComponentName.pascalCase %>Props {
  children: React.ReactNode;
}
