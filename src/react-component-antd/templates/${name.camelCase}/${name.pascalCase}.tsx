import { ConfigProvider, <%= antdComponentName.pascalCase %> as <%= antdComponentName.pascalCase %>Base } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { RfsAntdTheme } from '../../styles/RfsAntdTheme';
import I<%= name.pascalCase %>Props from './I<%= name.pascalCase %>Props';

const Styled<%= antdComponentName.pascalCase %>Base = styled(<%= antdComponentName.pascalCase %>Base)<I<%= name.pascalCase %>Props>``;

const <%= name.pascalCase %>: React.FC<I<%= name.pascalCase %>Props> = ({ ...props }) => (
  <ConfigProvider
    theme={{
      hashed: false,
      token: {
        ...RfsAntdTheme.token,
        ...RfsAntdTheme.components?.<%= antdComponentName.pascalCase %>,
      },
    }}
  >
    <Styled<%= antdComponentName.pascalCase %>Base className="<%= name.pascalCase %>" {...props} />
  </ConfigProvider>
);

export default <%= name.pascalCase %>;
