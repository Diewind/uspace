import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// Import memoryUtils from '@utils/memoryUtils'
import { asyncComponent } from '@utils/asyncComponent';

import Left from '@pages/components/LeftBar';
import Header from '@pages/components/Header';
import NotFound from '@pages/NotFound';
import { getToken } from '@utils/authorize';

import { Layout } from 'antd';

import routerConfig from '@config/router';
const { Content, Footer, Sider } = Layout;

// 管理的路由组件
const Admin:React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const userToken = getToken();
  if(!userToken){
    // 自动跳转到登录
    return <Redirect to='/login/' />;
  }
  return (
    <Layout style={{ minHeight: '100%' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Left collapsed={collapsed} />
      </Sider>
      <Layout>
        <Header
          collapsed={collapsed}
          toggle={toggle}
        />
        <Content style={{ margin: 20, backgroundColor: '#fff' }}>
          <Switch>
            <Redirect exact from="/" to="/home" />
            {
              routerConfig.map((v:any) => {
                if (v.children){
                  return v.children.map((n:any) => <Route key={n.path} path={n.path} component={asyncComponent(n.component)} />);
                }
                return <Route key={v.path} path={v.path} component={asyncComponent(v.component)} />;
              })
            }
            <Route component={NotFound} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>本系统由pilot开发，版权所有，盗版必究！</Footer>
      </Layout>
    </Layout>
  );
}

export default Admin;
