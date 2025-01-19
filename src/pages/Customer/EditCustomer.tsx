import React, { useEffect } from 'react';
import { Form, Input, Select, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';

import { FORM_ITEM_LAYOUT_ONE_IN_THREE } from '@utils/constants';

const { Option } = Select;
const FormItem = Form.Item;

interface Prop{
  roles: object[],
  customer: object,
  editCustomerVisible: boolean,
  saveLoading: boolean,
  onOk: () => void,
  onCancel: () => void,
  onSetCustomer: () => void,
  onRef: (ref: FormInstance) => void,
}

const EditCustomer: React.FC<Prop> = (props) => {
  const { roles, customer, editCustomerVisible, saveLoading, onOk, onCancel, onRef, onSetCustomer } = props;
  const [form] = Form.useForm();
  onRef(form);

  return (
    <Modal
      title='添加角色'
      open={editCustomerVisible}
      destroyOnClose
      // forceRender // 有bug，弹窗关掉后值不会清空
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={saveLoading}
    >
      <Form
        form={form}
        initialValues={customer}
        preserve={false}
      >
        <FormItem
          {...FORM_ITEM_LAYOUT_ONE_IN_THREE}
          label="客户id"
          name="id"
          hidden
        >
          <Input
            autoComplete='off'
          />
        </FormItem>
        <FormItem
          {...FORM_ITEM_LAYOUT_ONE_IN_THREE}
          label="公司名称"
          name="companyName"
          rules={[{
            required: true,
            message: '公司名称不能为空!'
          }]}
        >
          <Input
            autoComplete='off'
          />
        </FormItem>
        <FormItem
          {...FORM_ITEM_LAYOUT_ONE_IN_THREE}
          label="公司地址"
          name="companyAddress"
          rules={[{
            required: true,
            message: '公司地址不能为空!'
          }]}
        >
          <Input
            autoComplete='off'
          />
        </FormItem>
        <FormItem
          {...FORM_ITEM_LAYOUT_ONE_IN_THREE}
          label="公司所在省份"
          name="companyProvince"
          rules={[{
            required: true,
            message: '公司所在省份不能为空!'
          }]}
        >
          <Input
            autoComplete='off'
          />
        </FormItem>
        <FormItem
          {...FORM_ITEM_LAYOUT_ONE_IN_THREE}
          label="联系人"
          name="contact"
          rules={[{
            required: true,
            message: '联系人不能为空!'
          }]}
        >
          <Input
            autoComplete='off'
          />
        </FormItem>
        <FormItem
          {...FORM_ITEM_LAYOUT_ONE_IN_THREE}
          label="联系方式"
          name="phone"
          rules={[{
            required: true,
            message: '联系方式不能为空!'
          }]}
        >
          <Input
            autoComplete='off'
          />
        </FormItem>
        <FormItem
          {...FORM_ITEM_LAYOUT_ONE_IN_THREE}
          label="联系人qq号"
          name="qq"
          rules={[{
            required: true,
            message: '联系人qq号不能为空!'
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
          label="邮编"
          name="postalCode"
          rules={[{
            required: true,
            message: '邮编不能为空!'
          }]}
        >
          <Input
            autoComplete='off'
          />
        </FormItem>
        <FormItem
          {...FORM_ITEM_LAYOUT_ONE_IN_THREE}
          label="公司人数"
          name="companyEmployeeNumber"
          rules={[{
            required: true,
            message: '公司人数不能为空!'
          }]}
        >
          <Input
            autoComplete='off'
          />
        </FormItem>
        <FormItem
          {...FORM_ITEM_LAYOUT_ONE_IN_THREE}
          label="公司主营业务"
          name="mainBusiness"
          rules={[{
            required: true,
            message: '公司主营业务不能为空!'
          }]}
        >
          <Input
            autoComplete='off'
          />
        </FormItem>
        <FormItem
          {...FORM_ITEM_LAYOUT_ONE_IN_THREE}
          label="公司成立日期"
          name="establishDate"
          rules={[{
            required: true,
            message: '公司成立日期不能为空!'
          }]}
        >
          <Input
            autoComplete='off'
          />
        </FormItem>
        <FormItem
          {...FORM_ITEM_LAYOUT_ONE_IN_THREE}
          label="公司是否上市"
          name="isPublic"
          rules={[{
            required: true,
            message: '公司是否上市不能为空!'
          }]}
        >
          <Input
            autoComplete='off'
          />
        </FormItem>
        <FormItem
          {...FORM_ITEM_LAYOUT_ONE_IN_THREE}
          label="公司官网"
          name="website"
          rules={[{
            required: true,
            message: '公司官网不能为空!'
          }]}
        >
          <Input
            autoComplete='off'
          />
        </FormItem>
        <FormItem
          {...FORM_ITEM_LAYOUT_ONE_IN_THREE}
          label="主营产品"
          name="mainProducts"
          rules={[{
            required: true,
            message: '主营产品不能为空!'
          }]}
        >
          <Input
            autoComplete='off'
          />
        </FormItem>
        <FormItem
          {...FORM_ITEM_LAYOUT_ONE_IN_THREE}
          label="注册资本"
          name="registerCapital"
          rules={[{
            required: true,
            message: '注册资本不能为空!'
          }]}
        >
          <Input
            autoComplete='off'
          />
        </FormItem>
        <FormItem
          {...FORM_ITEM_LAYOUT_ONE_IN_THREE}
          label="营业执照"
          name="businessLicense"
          rules={[{
            required: true,
            message: '营业执照不能为空!'
          }]}
        >
          <Input
            autoComplete='off'
          />
        </FormItem>
      </Form>
    </Modal>
    )
}

export default EditCustomer;
