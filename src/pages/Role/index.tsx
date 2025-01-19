import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Card, Button, Table, message, Popconfirm, notification } from 'antd';
import { FormInstance } from 'antd/lib/form/Form' //获取form表单的interface

import { PAGE_SIZE } from '@utils/constants';
import { fetchRole, deleteRole, updateRole, saveRole } from '@services/roleService';
import memoryUtils from '@utils/memoryUtils';
import storageUtils from '@utils/storageUtils';
import { parseTableParams } from '@utils/util';

import EditRole from './EditRole';
import EditRoleAuth from './EditRoleAuth';

const Role: React.ForwardRefExoticComponent<any> = forwardRef(() => {
  const [roleList,setRoleList] = useState<any>([]);// 所有角色列表
  const [rolePagination, setRolePagination] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [selectedRole,setSelectedRole] = useState({
    id: '',
    name: '',
  });

  const [roleVisible, setRoleVisible] = useState(false);
  const [roleAuthVisible,setRoleAuthVisible] = useState(false);
  const column = [
    {
      title: '角色名称',
      dataIndex: 'name'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
    },
    {
      title: '授权时间',
      dataIndex: 'updateTime'
    },
    {
      title: '授权人',
      dataIndex: 'authorizer'
    },
  ];
  const queryRole = (params = {size: 10, current: 1}) => {
    fetchRole(params).then((res : any) => {
      if(res.data){
        setRoleList(res.data.data.page);
        const rolePage = parseTableParams(res.data.data.page);
        setRolePagination(rolePage);
      }
    });
  };
  useEffect(() => {
    queryRole();
  },[]);
  let roleFormRef:FormInstance;
  // 删除角色
  const handleDeleteRole = async () => {
    const { id = '', name = '' } = selectedRole;
    // 请求更新
    const res:any = await deleteRole(id, name);
    const { code, message } = res.data;
    if(code === 200){
      notification.success({
        message: code,
        description: message,
        placement: 'bottomRight',
      });
      await queryRole();
    }
  }
  const onRow = (role:any) => ({
    onClick: () => { // 点击行
      setSelectedRole(role);
    }
  });
  const title =
    <span>
      <Button type='primary' onClick={() => {
        setRoleVisible(true);
      }}>创建角色</Button>
      <Popconfirm
        title='确定要删除吗？'
        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        onConfirm={handleDeleteRole}
        placement='bottomLeft'
        disabled={!selectedRole.id}
      >
        <Button danger style={{ marginLeft: 20 }} disabled={!selectedRole.id}>删除角色</Button>
      </Popconfirm>
      <Button type='primary' style={{ marginLeft: 20 }} disabled={!selectedRole.id} onClick={() => {
        setRoleAuthVisible(true);
      }}>设置角色权限</Button>
    </span>;
  const roleRef:any = (form: FormInstance) => {
    roleFormRef = form;
  }
  const handleRoleCancel = () => {
    roleFormRef.resetFields();
    setRoleVisible(false)
  };
  const handleRoleOk = () => {
    roleFormRef.validateFields()
    .then(async (values: any) => {
      const { roleName } = values;
      roleFormRef.resetFields();
      const result:any = await saveRole({
        name: roleName,
        authorizer: 'admin',
      });
      const { code, message } = result.data;
      if (code === 200) {
        notification.success({
          message: code,
          description: message,
          placement: 'bottomRight',
        });
        setRoleVisible(false);
        setSaveLoading(false);
        queryRole();
      } else {
        notification.error({
          message: code,
          description: message,
          placement: 'bottomRight',
        });
        setSaveLoading(false);
      }
    });
  }
  const roleAuthRef:any = useRef(null);
  const handleRoleAuthOk = async() => {
    const authorizedMenu = roleAuthRef.current.getMenus();
    const params = {
      ...selectedRole,
      authorizedMenu,
      authorizer: memoryUtils.user.username || 'admin',
    };
    // 请求更新
    const result:any = await updateRole(params);
    const { code, message } = result.data;
    if (code === 200) {
      // 如果更新的是自己角色的权限，强制退出
      if (selectedRole.id === memoryUtils.user.role.id) {
        memoryUtils.user = {
          username: '',
          role: {
            id: '',
            menus: [],
          }
        };
        storageUtils.removeUser();
        // this.props.history.replace('/login');
        message.info('当前用户角色权限修改了，重新登录!');
      } else {
        notification.success({
          message: code,
          description: message,
          placement: 'bottomRight',
        });
        setRoleAuthVisible(false);
        queryRole();
      }
    } else {
      message.error(message);
    }
  };
  const handleOnChange = (page:any):void => {
    const { pageSize = 10, current = 1, } = page;
    const searchParams = {
      size: pageSize,
      current,
    };
    queryRole(searchParams);
  };
  const handleRoleAuthCancel = () => setRoleAuthVisible(false);
  const rowSelection:object = {
    type: 'radio',
    selectedRowKeys: [selectedRole.id],
    onSelect: (role: any) => {
      setSelectedRole(role);
    }
  };
  const tableProps:object = {
    bordered: true,
    columns: column,
    rowKey: 'id',
    dataSource: roleList.records,
    loading: false,
    pagination: rolePagination,
    rowSelection,
    size: 'small',
    onChange: handleOnChange,
    onRow,
  };
  const editRoleProps = {
    roleVisible,
    onOk: handleRoleOk,
    onCancel: handleRoleCancel,
    onRef: roleRef,
  }
  const editRoleAuthProps = {
    roleAuthVisible: roleAuthVisible,
    onOk: handleRoleAuthOk,
    onCancel: handleRoleAuthCancel,
    selectedRole: selectedRole,
    ref: roleAuthRef,
  }
  return (
    <Card title={title}>
      <Table
        {...tableProps}
      />
      <EditRole
        {...editRoleProps}
      />
      <EditRoleAuth
        {...editRoleAuthProps}
      />
    </Card>
  );
});

export default Role;
