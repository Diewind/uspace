import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';
import { Input, Button, Card, Table, message, Row, Col } from 'antd';

import LinkButton from '@pages/components/LinkButton';
import { fetchKoniList, deleteKoniList } from '@services/learnService';

const Koni: React.FC = () => {
  const history = useHistory();
  const [state, setState] = useState<any>({
    dataSource: [],
    searchName: ''
  });
  useEffect(() => {
    fetchList();
  }, []);
  const jumpDetail = (readOnly:boolean, record:any) => {

    history.push('/learn/koni-detail', {
      state: {
        readOnly,
        record,
      }
    });
  };
  const columns = [
    {
      title: '名称',
      dataIndex: 'title',
      width: '15%',
      ellipsis: true
    },
    {
      title: '描述',
      dataIndex: 'desc',
      width: '50%',
      ellipsis: true
    },
    {
      title: '所属分类',
      dataIndex: 'category',
      width: '15%',
      ellipsis: true
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      width: '20%',
      ellipsis: true
    },
    {
      title: '操作',
      width: '20%',
      render: (_:any, record:any) => (
        <span>
          <LinkButton onClick={() => jumpDetail(true, record)}>详情</LinkButton>
          <LinkButton onClick={() => jumpDetail(false, record)}>修改</LinkButton>
          <LinkButton onClick={() => handleDelete(record)} type='danger-button'>删除</LinkButton>
        </span>
      )
    },
  ];

  const fetchList = async () => {
    const result:any = await fetchKoniList();
    try {
      if (result.status === 0) {
        // 取出分页数据，更新状态，显示分页列表
        const { list } = result.data;
        setState({
          dataSource: list,
        });
      } else {
        message.error('获取列表失败！');
      }
    } catch (error) {

    }
  }

  const handleAdd = () => {
    // const history = useHistory();
    history.push('/learn/koni-detail');
  }

  const handleDelete = async (record:any) => {
    const { id } = record;
    const result:any = await deleteKoniList(id);
    try {
      if (result.status === 0) {
        message.success('删除成功！');
        fetchList();
      } else {
        message.error('删除失败！');
      }
    } catch (error) {

    }
  }

  const { dataSource, searchName } = state;
  const title = (
    <Row>
      <Col span={6}>
        <Input
          placeholder='请输入标题'
          defaultValue={searchName}
          onChange={(event) => {
            setState({ searchName: event.target.value });
          }}
          style={{
            marginRight: 10,
          }}
        />
        <Button type='primary' onClick={() => {
          fetchKoniList();
        }}>搜索</Button>
      </Col>
    </Row>
  );

  const extra = (
    <Button type='primary' onClick={handleAdd}>
      <PlusOutlined />
      添加
    </Button>
  );

  return (
    <Card title={title} extra={extra}>
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        rowKey='id'
        size='small'
      />
    </Card>
  );
}

export default Koni;
