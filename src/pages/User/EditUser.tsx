import React, { useEffect } from 'react';
import { Form, Input, Select, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';

import { FORM_ITEM_LAYOUT_ONE_IN_THREE } from '@utils/constants';

const { Option } = Select;
const FormItem = Form.Item;

interface Prop{
  roles: object[],
  user: object,
  editUserVisible: boolean,
  saveLoading: boolean,
  onOk: () => void,
  onCancel: () => void,
  onSetUser: () => void,
  onRef: (ref: FormInstance) => void,
}

const EditUser: React.FC<Prop> = (props) => {
  const { roles, user, editUserVisible, saveLoading, onOk, onCancel, onRef, onSetUser } = props;
  const [form] = Form.useForm();
  onRef(form);

  return (
    <Modal
      title='添加角色'
      open={editUserVisible}
      destroyOnClose
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={saveLoading}
    >
      <Form
        form={form}
        initialValues={user}
        preserve={false}
      >
        <FormItem
          {...FORM_ITEM_LAYOUT_ONE_IN_THREE}
          label="用户id"
          name="id"
          hidden
        >
          <Input
            autoComplete='off'
          />
        </FormItem>
        <FormItem
          {...FORM_ITEM_LAYOUT_ONE_IN_THREE}
          label="用户名"
          name="name"
          rules={[{
            required: true,
            message: '用户名不能为空!'
          }]}
        >
          <Input
            autoComplete='off'
          />
        </FormItem>

        <FormItem
          {...FORM_ITEM_LAYOUT_ONE_IN_THREE}
          label="密码"
          name="password"
          rules={[{
            required: true,
            message: '密码不能为空!'
          }]}
        >
          <Input.Password
            autoComplete='off'
          />
        </FormItem>
        <FormItem
          {...FORM_ITEM_LAYOUT_ONE_IN_THREE}
          label="手机号"
          name="mobile"
          rules={[{
            required: true,
            message: '手机号不能为空!'
          }]}
        >
          <Input
            autoComplete='off'
          />
        </FormItem>
        <FormItem
          {...FORM_ITEM_LAYOUT_ONE_IN_THREE}
          label="邮箱"
          name="email"
          rules={[{
            required: true,
            message: '邮箱不能为空!'
          }]}
        >
          <Input
            autoComplete='off'
          />
        </FormItem>
        <FormItem
          {...FORM_ITEM_LAYOUT_ONE_IN_THREE}
          label="角色"
          name="roleId"
          rules={[{
            required: false,
            message: '角色不能为空!'
          }]}
        >
          <Select placeholder='请选择角色'>
            {
              roles.map((role:any) => <Option key={role.id} value={role.id}>{role.name}</Option>
              )
            }
          </Select>
        </FormItem>
      </Form>
    </Modal>
    )
}

export default EditUser;
