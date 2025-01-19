import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Popconfirm, Form,Row, Col,TreeSelect, message } from 'antd';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import {v4 as uuid} from 'uuid';

import LinkButton from '@pages/components/LinkButton/index';
import EditTable from '@pages/components/EditTable';
import { PAGE_SIZE } from '@utils/constants';
import { fetchCategory, saveCategory, deleteCategory } from '@services/categoryService';

import './index.less';

const FormItem = Form.Item;

const Category: React.FC = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<any>([]);
  useEffect(() => {
    queryCategory();
  }, []);
  const queryCategory = async () => {
    const res:any = await fetchCategory();
    const data = res.map((v:any) => v._status = 'update');
    setDataSource(data);
  };

  const delCategory = async (record:any) => {
    if(record._status === 'create'){
      const newDataSource = [...dataSource];
      setDataSource(newDataSource.filter(item => item.id !== record.id));
    }else{
      const res:any = await deleteCategory(record.id);
      if(res.status === 0){
        message.success('删除成功!');
        queryCategory();
      }
    }
  }
  const columns = [
    {
      title: '分类名',
      dataIndex: 'categoryName',
      width: '60%',
      render: (val:any, record:any) => {
        if (record._status === 'update' || record._status === 'create') {
          return (
            <Form
              form={record.$form}
            >
              <FormItem name={[record.id, 'categoryName']} rules={[{ required: true, message: '请输入分类名!' }]}>
                <Input
                />
              </FormItem>
            </Form>
          );
        } else {
          return val;
        }
      }
    },
    {
      title: '归属分类',
      dataIndex: 'attributionCategory',
      width: '30%',
      render: (val:any, record:any) => {
        if(['create', 'update'].includes(record._status)){
          return (
            <Form
              form={record.$form}
            >
              <FormItem name={[record.id,'attributionCategory']} rules={[{ required: true, message: '请选择分类!' }]}>
                <TreeSelect
                  treeData={[
                    { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
                  ]}
                />
              </FormItem>
            </Form>
          );
        }
        return val;
      }
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: '10%',
      render: (val:any, record:any) => {
        return ['create', 'update'].includes(record._status) ? (
          <Popconfirm title='是否删除?' onConfirm={() => delCategory(record)}>
            <LinkButton type='danger-button'>删除</LinkButton>
          </Popconfirm>
        ) : null;
      }
    }
  ];

  const handleAdd = () => {
    const newData = {_status: 'create',id: uuid()};
    setDataSource([...dataSource, newData]);
  };

  const handleSave = () => {
    form.validateFields().then(async (values:any) => {
      const tableData = dataSource.map((v:any) => {
        if(['create', 'update'].includes(v._status)){
          return values[v.id];
        }else{
          return v;
        }
      });
      const result:any = await saveCategory(tableData);
      if(result.status === 0){
        message.success('保存成功!');
        queryCategory();
      }
    });
  };

  const extra = (
    <Row gutter={[8, 8]}>
      <Col span={12}>
        <Button onClick={handleAdd}>
          <PlusOutlined />
          添加
        </Button>
      </Col>
      <Col span={12}>
        <Button type='primary' onClick={handleSave}>
          <SaveOutlined />
          保存
        </Button>
      </Col>
    </Row>
  );

  return (
    <Card title={'分类列表'} extra={extra}>
      <EditTable
        dataSource={dataSource}
        columns={columns}
        rowClassName='editable-row'
        rowKey={'id'}
        bordered={true}
        loading={false}
        form={form}
        pagination={{
          defaultPageSize: PAGE_SIZE,
          showQuickJumper: true
        }}
        size='small'
      />
    </Card>
  );
}

export default Category;
