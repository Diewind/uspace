import React from 'react';
import { Row, Col, Button } from 'antd';
import './index.less';

const NotFound:React.FC = (props:any) => {
  const goHome = () => {
    props.history.replace('/home');
  };
  return (
    <Row className='not-found'>
      <Col span={12} className='left'></Col>
      <Col span={12} className='right'>
        <h1>404</h1>
        <h2>抱歉，你访问的页面不存在</h2>
        <div className='goHomeBtn'>
          <Button type='primary' onClick={goHome}>
            回到首页
          </Button>
        </div>
      </Col>
    </Row>
  );
}

export default NotFound;
