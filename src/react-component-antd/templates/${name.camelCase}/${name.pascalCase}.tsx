import { ConfigProvider, <%= antdComponentName.pascalCase %> as <%= antdComponentName.pascalCase %>Base } from 'antd';
import React from 'react';
import styled from 'styled-components';
import I<%= name.pascalCase %>Props from './I<%= name.pascalCase %>Props';
import { rfsDefaultTheme } from '../../styles/RfsAntdTheme';

const Styled<%= antdComponentName.pascalCase %>Base = styled(<%= antdComponentName.pascalCase %>Base)<I<%= name.pascalCase %>Props>``;

const <%= name.pascalCase %>: React.FC<I<%= name.pascalCase %>Props> = ({ ...props }) => (
  <ConfigProvider
    theme={{
      hashed: false,
      token: {
        ...rfsDefaultTheme.token,
        ...rfsDefaultTheme.components?.<%= antdComponentName.pascalCase %>,
      },
    }}
  >
    <Styled<%= antdComponentName.pascalCase %>Base className="<%= name.pascalCase %>" {...props} />
  </ConfigProvider>
);

export default <%= name.pascalCase %>;
