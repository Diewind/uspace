import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Menu } from 'antd';
import routers from '@config/router';
import './index.less';
import logo from '@assets/images/logo.png';
import memoryUtils from '@utils/memoryUtils';

import renderIcon from './renderIcon';

type LeftBarProps = React.PropsWithChildren<{
  collapsed: boolean,
}>;

const { SubMenu } = Menu;
/*
左侧导航组件
*/
const LeftNav:React.FC<LeftBarProps> = (props:any) => {
  let defaultSelectedKeys: any;
  let openKey: any;

  /**
   * hasAuth - 判断当前登录用户对item是否有权限
   * @param {object} item - 拥有权限的菜单
   */
  const hasAuth = (item: any) => {
    const { key, isPublic } = item;
    const menus = memoryUtils.user && memoryUtils.user.role && memoryUtils.user.role.menus || [];
    const username = memoryUtils.user && memoryUtils.user.username;
    /*
    1.如果当前用户是admin
    2.如果当前item是公开的
    3.当前用户有此item的权限：key有没有menus中
    */
    if (username === 'admin' || isPublic || menus.indexOf(key) !== -1) {
      return true;
    } else if (item.children) { //4.如果当前用户有此item的某个子item的权限
      return Boolean(item.children.find((child:any) => menus.indexOf(child.key) !== -1));
    }
    return false;
  }
  /**
   * getMenuNodes - 根据menu的数据数组生成对应的标签数组,使用reduce()+递归调用
   * @param {array} menuList - 菜单
   * @returns {ReactNode}
   */
  const getMenuNodes = (menuList:any) => {
    // 得到当前请求的路由路径
    let location = useLocation();
    const path = location.pathname;
    return menuList.reduce((pre:any, item:any) => {
      // 如果当前用户有item对应的权限，才需要显示对应的菜单
      if (hasAuth(item) || true) {
        // 向pre添加<Menu.Item>
        if (!item.children) {
          // 判断item是否是当前对应的item
          if (item.key === path || path.indexOf(item.key) === 0) {
            // 更新redux中的headTitle状态
            // props.setHeadTitle(item.title);
            defaultSelectedKeys = item.key;
          }
          if(item.hideMenu !== true){
            pre.push(
              <Menu.Item key={item.key}>
                <Link to={item.key}>
                  {renderIcon(item.icon)}
                  <span>{item.title}</span>
                </Link>
              </Menu.Item>
            );
          }
        } else {
          // 查找一个与当前路径匹配的子Item
          const cItem = item.children.find((cItem:any) => path.indexOf(cItem.key) === 0);
          // 如果存在，说明当前item所对应的子列表需要展开
          if (cItem) {
            openKey = item.key;
          }
          if(item.hideMenu !== true){
            pre.push(
              <SubMenu
                key={item.key}
                title={
                  <span>
                    {renderIcon(item.icon)}
                    <span>{item.title}</span>
                  </span>
                }
              >
                {getMenuNodes(item.children)}
              </SubMenu>
            );
          }
        }
      }
      // 向pre添加<SubMenu>
      return pre;
    }, []);
  }
  const menuNodes = getMenuNodes(routers);

  // 得到当前请求的路由路径
  let path = location.pathname;
  switch (true) {
  case path.indexOf('/product/category') === 0:
    path = '/product/category';
    break;
  case path.indexOf('/product/product') === 0:
    path = '/product/product';
    break;
  case path.indexOf('/product/product-detail') === 0:
    path = '/product/product-detail';
    break;
  case path.indexOf('/learnTools/mind') === 0:
    path = '/learnTools/mind';
    break;
  case path.indexOf('/learnTools/flow') === 0:
    path = '/learnTools/flow';
    break;
  case path.indexOf('/learnTools/koni') === 0:
    path = '/learnTools/koni';
    break;
  default:
    break;
  }
  // 得到当前需要打开菜单项的key
  // const { openKey } = this;
  return (
    <div>
      <div className='left-nav'>
        <Link to='/' className='left-nav-header'>
          <img src={logo} alt='logo' />
          {props.collapsed ? '' : <h1>USpace后台</h1>}
        </Link>
        <Menu theme='dark' mode='inline' selectedKeys={[path]} defaultOpenKeys={[openKey]}>
          {menuNodes}
        </Menu>
      </div>
    </div>
  );

  /*
  根据menu的数据数组生成对应的标签数组
  使用map()+递归调用
  */
  // GetMenuNodes = (menuList = []) => {
  //     Return menuList.map(item=>{
  //         If(!item.children){
  //             Return (
  //             <Menu.Item key={item.key}>
  //                 <Link to={item.key}>
  //                     <Icon type={item.icon} />
  //                     <span>{item.title}</span>
  //                 </Link>
  //             </Menu.Item>
  //             )
  //         }else{
  //             Return (
  //                 <SubMenu
  //                     Key={item.key}
  //                     Title={
  //                         <span>
  //                         <Icon type={item.icon} />
  //                         <span>{item.title}</span>
  //                         </span>
  //                     }
  //                     >
  //                     {this.getMenuNodes(item.children)}
  //                 </SubMenu>
  //             );
  //         }
  //     });
  // }
}

export default LeftNav;
