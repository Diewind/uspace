import React from 'react';
import { Form, Input, Modal } from 'antd';

import { FORM_ITEM_LAYOUT_ONE_IN_FIVE } from '@utils/constants';

const FormItem = Form.Item;

interface Prop{
  roleVisible: boolean,
  onOk: () => void,
  onCancel: () => void,
  onRef: (ref: object) => void,
}

const EditRole: React.FC<Prop> = (props) => {
  const { roleVisible, onOk, onCancel, onRef } = props;
  const [form] = Form.useForm();
  onRef(form);
  return (
    <Modal
      title='添加角色'
      visible={roleVisible}
      forceRender
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form
        form={form}
      >
        <FormItem
          {...FORM_ITEM_LAYOUT_ONE_IN_FIVE}
          label="角色名称"
          name="roleName"
          rules={[{
            required: true,
            message: '角色名不能为空!'
          }]}
        >
          <Input />
        </FormItem>
      </Form>
    </Modal>
  );
}

export default EditRole;
