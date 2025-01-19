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
import { fetchCustomer, deleteCustomer, updateCustomer, saveCustomer } from '@services/customerService';
import { parseTableParams } from '@utils/util';

import EditCustomer from './EditCustomer';

export interface editCustomerProps {
  roles: Array<[]>,
  customer: Object,
  editCustomerVisible: boolean,
  saveLoading: boolean,
  onOk: () => void,
  onSetCustomer: () => void,
  onCancel: () => void,
  onRef: () => void,
}

const Customer: React.FC = () => {
  const [customers, setCustomers] = useState<any>({});
  const [customerPagination, setCustomerPagination] = useState({});
  const [roles, setRoles] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>({});
  const [ editCustomerVisible, setEditCustomerVisible ] = useState(false);
  

  const queryCustomer = (params = {size: 10, current: 1}) => {
    fetchCustomer(params).then((res : any) => {
      if(res.data){
        setCustomers(res.data.data.page);
        const customerPage = parseTableParams(res.data.data.page);
        setCustomerPagination(customerPage);
      }
    });
  };

  useEffect(() => {
    queryCustomer();
  },[]);

  const handleEditCustomer = (customer:any):void => {
    // setSelectedCustomer(customer);
    editCustomerFormRef.setFieldsValue(customer);
    setEditCustomerVisible(true);
  };

  const handleDeleteCustomer = async (customer:any):Promise<void> => {
    const res = await deleteCustomer(customer.id, customer.companyName);
    const { code, message } = res.data;
    if(code === 200){
      notification.success({
        message: code,
        description: message,
        placement: 'bottomRight',
      });
      await queryCustomer();
    }
  };

  const columns = [
    {
      title: '公司名称',
      dataIndex: 'companyName'
    },
    {
      title: '公司地址',
      dataIndex: 'companyAddress'
    },
    {
      title: '公司所在省份',
      dataIndex: 'companyProvince'
    },
    {
      title: '联系人',
      dataIndex: 'contact'
    },
    {
      title: '联系方式',
      dataIndex: 'phone'
    },
    {
      title: '联系人qq号',
      dataIndex: 'qq'
    },
    {
      title: '邮箱',
      dataIndex: 'email'
    },
    {
      title: '邮编',
      dataIndex: 'postalCode'
    },
    {
      title: '公司人数',
      dataIndex: 'companyEmployeeNumber'
    },
    {
      title: '公司主营业务',
      dataIndex: 'mainBusiness'
    },
    {
      title: '公司成立日期',
      dataIndex: 'establishDate'
    },
    {
      title: '公司是否上市',
      dataIndex: 'isPublic'
    },
    {
      title: '公司官网',
      dataIndex: 'website'
    },
    {
      title: '主营产品',
      dataIndex: 'mainProducts'
    },
    {
      title: '添加时间',
      dataIndex: 'addTime'
    },
    {
      title: '注册资本',
      dataIndex: 'registerCapital'
    },
    {
      title: '营业执照',
      dataIndex: 'businessLicense'
    },
    {
      title: '操作',
      render: (customer: any) => (<span>
        <LinkButton onClick={() => handleEditCustomer(customer)}>修改</LinkButton>
        <Popconfirm
          title="确定删除吗？"
          icon={
            <QuestionCircleOutlined
              style={{ color: 'red' }}
            />
          }
          onConfirm={() => handleDeleteCustomer(customer)}
        >
          <LinkButton type='danger-button'>删除</LinkButton>
        </Popconfirm>
      </span>)
    }
  ];

  const title = <Button type='primary' onClick={ () => handleAddEditCustomer() }>创建客户</Button>;

  let editCustomerFormRef: FormInstance;

  const bindEditCustomerRef:any = (form: FormInstance):void => {
    editCustomerFormRef = form;
  };

  const handleEditCustomerOk = ():void => {
    editCustomerFormRef.validateFields()
    .then(async (values: any) => {
      let param: any = {
        id: '',
      };
      let result:any;
      setSaveLoading(true);
      // 如果是更新，需要customer中有id
      if(Object.keys(selectedCustomer).length > 0){
        param.id = selectedCustomer.id;
        const params = {
          ...values,
          ...param,
        }
        result = await updateCustomer(params);
      }else{
        const params = {
          ...values,
        }
        result = await saveCustomer(params);
      }
      const { code, message } = result.data;
      if (code === 200) {
        notification.success({
          message: code,
          description: message,
          placement: 'bottomRight',
        });
        editCustomerFormRef.setFieldsValue({});
        setSelectedCustomer({});
        setSaveLoading(false);
        setEditCustomerVisible(false);
        await queryCustomer();
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

  const handleEditCustomerCancel = ():void => {
    setSelectedCustomer({});
    editCustomerFormRef.setFieldsValue({});
    setEditCustomerVisible(false);
  };

  const handleAddEditCustomer = ():void => {
    // setSelectedCustomer({});
    // editCustomerFormRef.setFieldsValue({});
    setEditCustomerVisible(true);
  };

  const handleSetCustomer = ():void => {
    setSelectedCustomer({});
    // editCustomerFormRef.resetFields({});
    setEditCustomerVisible(false);
  };

  const handleOnChange = (page:any):void => {
    const { pageSize = 10, current = 1, } = page;
    const searchParams = {
      size: pageSize,
      current,
    };
    queryCustomer(searchParams);
  };

  const tableProps: object = {
    rowKey: 'id',
    bordered: true,
    columns,
    dataSource: customers.records,
    loading: false,
    pagination: customerPagination,
    size: 'small',
    onChange: handleOnChange,
  };

  const editCustomerProps: editCustomerProps = {
    roles,
    customer: selectedCustomer,
    editCustomerVisible,
    onOk: handleEditCustomerOk,
    onCancel: handleEditCustomerCancel,
    onSetCustomer: handleSetCustomer,
    onRef: bindEditCustomerRef,
    saveLoading,
  };

  return (
    <Card title={title}>
      <Table
        {...tableProps}
      />
      <EditCustomer
        {...editCustomerProps}
      />
    </Card>
  );
}

export default Customer;
