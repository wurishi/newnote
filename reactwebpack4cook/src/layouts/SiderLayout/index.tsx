import { Layout, Menu } from 'antd';
const { Sider, Header, Content, Footer } = Layout;
import React, { FC, memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Styles from './style.module.less';

const SiderLayout: FC = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = useCallback(
    (collapsed: boolean) => setCollapsed(collapsed),
    []
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        trigger={null}
      >
        <div>logo</div>
        <Menu>
          <Menu.Item>
            <Link to="/hehe">hehe</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/ts">ts</Link>
          </Menu.Item>
          <Menu.Item>Option 3</Menu.Item>
          <Menu.Item>Option 4</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content>{props.children}</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};

SiderLayout.defaultProps = {};
SiderLayout.displayName = 'SiderLayout';

export default memo(SiderLayout);
