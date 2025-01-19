import React from 'react';
import { Row, Col, Typography } from 'antd';

const { Title } = Typography;

type Props = {
  children: object,
}

const Content: React.FC<Props> = (props: Props) => {
  return (
    <Row className='content'>
      <Title level={4}>Usage:</Title>
      <div className='content-box'>{props.children}</div>
    </Row>
  )
}

export default Content;
