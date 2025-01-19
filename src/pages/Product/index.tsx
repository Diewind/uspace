import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { Select, Input, Button, Card, Table, message } from 'antd';

import LinkButton from '@pages/components/LinkButton';
import { fetchProduct, deleteProduct, searchProduct, updateProductStatus } from '@services/productService';
import { PAGE_SIZE } from '@utils/constants';

const { Option } = Select;

const Product: React.FC = () => {
  const history = useHistory();
  const [state, setState] = useState<any>({
    dataSource: [], // 数据源
    loading: false,
    total: 0, //商品的总数量
    searchName: '', //搜索的关键字
    searchType: 'productName', //根据哪个字段搜索
    pageNum: 0,
  });
  useEffect(() => {
    fetchList();
  }, []);
  const updateStatus = async (productId:any, status:any) => {
    const result:any = await updateProductStatus(productId, status);
    if (result.status === 0) {
      message.success('更新状态成功');
      fetchList();
    } else {
      message.error('更新状态失败');
    }
  }
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      ellipsis: true
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
      ellipsis: true
    },
    {
      title: '价格',
      dataIndex: 'price',
      render: (price:any) => `￥${price}`
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 230,
      render: (status:any, records:any) => (
        <span>
          <Button
            type='primary'
            onClick={() => {
              updateStatus(records.id, status === 1 ? 2 : 1);
            }}
          >
            {status === 1 ? '下架' : '上架'}
          </Button>
          <span>{status === 1 ? '在售' : '已下架'}</span>
        </span>
      )
    },
    {
      title: '操作',
      width: 150,
      render: (product:any) => (
        <span>
          <LinkButton onClick={() => handleJump('/product/product-detail', product)}>详情</LinkButton>
          <LinkButton onClick={() => handleJump('/product/product-detail', product)}>修改</LinkButton>
          <LinkButton onClick={() => {
            handleDelete(product);
          }} style={{ color: 'red' }}>删除</LinkButton>
        </span>
      )
    },
  ];
  const handleDelete = async (product:any) => {
    const { id } = product;
    const result:any = await deleteProduct(id);
    try {
      if (result.status === 0) {
        message.success('删除商品成功！');
        fetchList();
      } else {
        message.error('删除商品失败');
      }
    } catch (error) {

    }
  }
  const fetchList = async () => {
    setState({ loading: true });
    const { searchName, searchType, pageNum } = state;
    // 如果搜索关键字有值，说明要搜索分页
    let result:any;
    if (searchName) {
      result = await searchProduct({ pageNum, pageSize: PAGE_SIZE, searchName, searchType });
    } else {
      result = await fetchProduct(pageNum, PAGE_SIZE);
    }
    setState({ loading: false });
    try {
      if (result.status === 0) {
        // 取出分页数据，更新状态，显示分页列表
        const { total, list } = result.data;
        setState({
          total,
          products: list
        });
      } else {
        message.error('获取商品失败');
        setState({
          loading: false
        });
      }
    } catch (error) {
      setState({
        loading: false
      });
    }
  }

  const { products, total, loading, searchType, searchName, pageNum } = state;

  const title = (
    <span>
      <Select value={searchType} style={{ width: 150 }} onChange={(value) => {
        setState({ searchType: value });
      }}>
        <Option value='productName'>按名称搜索</Option>
        <Option value='productDesc'>按描述搜索</Option>
      </Select>
      <Input placeholder='关键字' style={{ width: 150, margin: '0 15px' }} defaultValue={searchName} onChange={(event) => {
        setState({ searchName: event.target.value });
      }} />
      <Button type='primary' onClick={() => {
        fetchList();
      }}>搜索</Button>
    </span>
  );

  const handleJump = (flag: any, record?: any) => {
    if(flag === 'add'){
      history.push('/product/product-detail');
    }else if(flag === 'edit'){
      history.push('/product/product-detail', {
        state: record
      });
    }else{
      history.push('/product/product-detail');
    }
  }

  const extra = (
    <Button type='primary' onClick={() => handleJump('add')}>
      <PlusOutlined />
      添加
    </Button>
  );

  return (
    <Card title={title} extra={extra}>
      <Table
        bordered
        dataSource={products}
        columns={columns}
        rowKey={'id'}
        loading={loading}
        pagination={{
          current: pageNum,
          defaultPageSize: PAGE_SIZE,
          total,
          showQuickJumper: true,
          onChange: fetchList
        }}
        size='small'
      />
    </Card>
  );
}

export default Product;

