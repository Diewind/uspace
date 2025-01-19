import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Table,
  Popconfirm,
  message,
  notification,
} from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import { QuestionCircleOutlined } from '@ant-design/icons';
import memoize from "memoize-one";

import LinkButton from '@pages/components/LinkButton/index';
import { fetchUser, deleteUser, updateUser, saveUser } from '@services/userService';
import { fetchRole } from '@services/roleService';
import { parseTableParams } from '@utils/util';

import EditUser from './EditUser';

export interface editUserProps {
  roles: Array<[]>,
  user: Object,
  editUserVisible: boolean,
  saveLoading: boolean,
  onOk: () => void,
  onSetUser: () => void,
  onCancel: () => void,
  onRef: () => void,
}

const User: React.FC = () => {
  const [users, setUsers] = useState<any>({});
  const [userPagination, setUserPagination] = useState({});
  const [roles, setRoles] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>({});
  const [ editUserVisible, setEditUserVisible ] = useState(false);
  

  const queryUser = (params = {size: 10, current: 1}) => {
    fetchUser(params).then((res : any) => {
      if(res.data){
        setUsers(res.data.data.page);
        const userPage = parseTableParams(res.data.data.page);
        setUserPagination(userPage);
        fetchRole({size: 100, current: 1}).then((roleRes : any) => {
          if(roleRes.data){
            setRoles(roleRes.data.data.page.records);
          }
        })
      }
    });
  };

  useEffect(() => {
    queryUser();
  },[]);

  // 根据role的数组，生成包含所有角色名的对象(属性名用角色id值)
  const initRoleNames = memoize((roles) => {
    const roleNames = roles.length && roles.reduce((pre:any, role: any) => {
      pre[role.id] = role.name;
      return pre;
    }, {});
    // 保存
    return roleNames;
  });

  const handleEditUser = (user:any):void => {
    editUserFormRef.setFieldsValue(user);
    setEditUserVisible(true);
  };

  const handleDeleteUser = async (user:any):Promise<void> => {
    const res = await deleteUser(user.id, user.name);
    const { code, message } = res.data;
    if(code === 200){
      notification.success({
        message: code,
        description: message,
        placement: 'bottomRight',
      });
      await queryUser();
    }
  };

  const roleNames = initRoleNames(roles);

  const columns = [
    {
      title: '用户名',
      dataIndex: 'name'
    },
    {
      title: '邮箱',
      dataIndex: 'email'
    },
    {
      title: '电话',
      dataIndex: 'mobile'
    },
    {
      title: '注册时间',
      dataIndex: 'createTime'
    },
    {
      title: '所属角色',
      dataIndex: 'roleId',
      render: (roleId: string) => roleNames[roleId]
    },
    {
      title: '操作',
      render: (user: any) => (<span>
        <LinkButton onClick={() => handleEditUser(user)}>修改</LinkButton>
        <Popconfirm
          title="确定删除吗？"
          icon={
            <QuestionCircleOutlined
              style={{ color: 'red' }}
            />
          }
          onConfirm={() => handleDeleteUser(user)}
        >
          <LinkButton type='danger-button'>删除</LinkButton>
        </Popconfirm>
      </span>)
    }
  ];

  const title = <Button type='primary' onClick={ () => handleAddEditUser() }>创建用户</Button>;

  let editUserFormRef: FormInstance;

  const bindEditUserRef:any = (form: FormInstance):void => {
    editUserFormRef = form;
  };

  const handleEditUserOk = ():void => {
    editUserFormRef.validateFields()
    .then(async (values: any) => {
      let param: any = {
        id: '',
      };
      let result:any;
      setSaveLoading(true);
      // 如果是更新，需要user中有id
      if(Object.keys(selectedUser).length > 0){
        param.id = selectedUser.id;
        const params = {
          ...values,
          ...param,
          'roleName': roleNames[values.roleId]
        }
        result = await updateUser(params);
      }else{
        const params = {
          ...values,
          'roleName': roleNames[values.roleId]
        }
        result = await saveUser(params);
      }
      const { code, message } = result.data;
      if (code === 200) {
        notification.success({
          message: code,
          description: message,
          placement: 'bottomRight',
        });
        editUserFormRef.setFieldsValue({});
        setSelectedUser({});
        setSaveLoading(false);
        setEditUserVisible(false);
        await queryUser();
      } else {
        notification.error({
          message: code,
          description: message,
          placement: 'bottomRight',
        });
        setSaveLoading(false);
      }

    });
  };

  const handleEditUserCancel = ():void => {
    setSelectedUser({});
    editUserFormRef.setFieldsValue({});
    setEditUserVisible(false);
  };

  const handleAddEditUser = ():void => {
    setEditUserVisible(true);
  };

  const handleSetUser = ():void => {
    setSelectedUser({});
    setEditUserVisible(false);
  };

  const handleOnChange = (page:any):void => {
    const { pageSize = 10, current = 1, } = page;
    const searchParams = {
      size: pageSize,
      current,
    };
    queryUser(searchParams);
  };

  const tableProps: object = {
    rowKey: 'id',
    bordered: true,
    columns,
    dataSource: users.records,
    loading: false,
    pagination: userPagination,
    size: 'small',
    onChange: handleOnChange,
  };

  const editUserProps: editUserProps = {
    roles,
    user: selectedUser,
    editUserVisible,
    onOk: handleEditUserOk,
    onCancel: handleEditUserCancel,
    onSetUser: handleSetUser,
    onRef: bindEditUserRef,
    saveLoading,
  };

  return (
    <Card title={title}>
      <Table
        {...tableProps}
      />
      <EditUser
        {...editUserProps}
      />
    </Card>
  );
}

export default User;
