import React from 'react'
import { Typography, Row, } from 'antd';

const { Title } = Typography;

type Props = {
  children: object,
}

const Left = (props: Props) => {
  return (
    <Row className='api-menu'>
      <Title level={4}>API:</Title>
      <div className='api-menu-list'>
        {props.children}
      </div>
    </Row>
  )
}

export default Left;
