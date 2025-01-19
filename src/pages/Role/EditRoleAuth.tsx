import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Form, Input, Modal, Tree } from 'antd';

import routers from '@config/router';
import { FORM_ITEM_LAYOUT_ONE_IN_FIVE } from '@utils/constants';

const FormItem = Form.Item;
const { TreeNode } = Tree;

interface Prop{
  selectedRole: {
    name: string,
  },
  onOk: () => void,
  roleAuthVisible: boolean,
  onCancel: () => void,
  ref: (ref: object) => void,
}

const EditRoleAuth: React.ForwardRefExoticComponent<any> = forwardRef((props: any, ref) => {
  const {
    selectedRole,
    roleAuthVisible,
    onCancel,
    onOk,
  } = props;
  const [checkedKeys,setCheckedKeys] = useState();
  const getTreeNode = (menuList:any) => menuList.reduce((pre: any, item: any) => {
    pre.push(
      <TreeNode title={item.title} key={item.key}>
        {item.children ? getTreeNode(item.children) : null}
      </TreeNode>
    );
    return pre;
  }, []);
  const handleSelected = (checked:any) => {
    setCheckedKeys(checked);
  };
  // 为父组件提交获取menus最新数据的方法
  const getMenus = () => checkedKeys;
  useImperativeHandle(ref, () => {
    return {
      getMenus,
    };
  });
  return (
    <Modal
      title='设置角色权限'
      open={roleAuthVisible}
      destroyOnClose
      onOk={onOk}
      onCancel={onCancel}
    >
      <FormItem label='角色名称' {...FORM_ITEM_LAYOUT_ONE_IN_FIVE}>
        {
          <Input disabled value={selectedRole.name} />
        }
      </FormItem>
      <Tree
        checkable
        defaultExpandAll
        defaultCheckedKeys={selectedRole.authorizedMenu}
        onCheck={handleSelected}
      >
        <TreeNode title='平台权限' key='all'>
          {getTreeNode(routers)}
        </TreeNode>
      </Tree>
    </Modal>
  );
});

export default EditRoleAuth;
