import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.variable.min.css';

import '@assets/css/reset.css';

import App from './App';
import storageUtils from './utils/storageUtils';
import memoryUtils from './utils/memoryUtils';

import { ConfigProvider } from 'antd';

ConfigProvider.config({
  theme: {
    primaryColor: '#032c52',
  },
});

// 读取local中保存user，保存到内存中
const user = storageUtils.getUser();

memoryUtils.user = user;

function render() {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}

render();
