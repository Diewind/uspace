/*
发送异步ajax请求的函数模块
封装axios库
函数的返回值是promise对象
1.优化1：统一处理请求异常
        在外层包一个自己创建的promise对象
        在请求出错时，不reject(error)，而是显示错误提示
2.优化2：异步得到不是response，而是response.data
        在请求成功resolve时：resolve(response.data)
*/
import React from 'React';
import axios from 'axios';
import { notification } from 'antd';

import { getToken, removeToken } from '@utils/authorize';

// 创建 axios 实例
const request = axios.create({
  // 统一 url 配置，定义访问前缀 baseURL
  baseURL: '/',
  // 定义请求超时时间
  timeout: 2 * 60 * 1000,
  // 请求带上 cookie
  withCredentials: true,
  // 定义消息头
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

// 定义请求拦截器
request.interceptors.request.use(
  config => {
      // 让每个请求携带 token
      config.headers['Token'] = getToken();
      return config;
  },
  error => {
      Promise.reject(error);
  }
)

// 定义响应拦截器
request.interceptors.response.use(
  response => {
    const res = response.data;
    // 当 token 失效时，清除 cookie 保存的 token 值，并跳转到登陆界面
    if (res && res.code === 401) {
      removeToken();
      notification.error({
        message: res.code,
        description: res.message,
        placement: 'bottomRight',
      });
      // window.location.href = '/login';
    }
    if(res.code === 500){
      notification.error({
        message: res.code,
        description: res.message,
        placement: 'bottomRight',
      });
      
    }
    // 未找到页面时，跳转到 404 页面
    if (res && res.code === 404) {
      notification.error({
        message: res.code,
        description: res.message,
        placement: 'bottomRight',
      });
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
)

export default request;

// export default function ajax(url:any, data = {}, type = 'GET') {
//   return new Promise((resolve) => {
//     let promise = null;
//     // 1.执行异步ajax请求
//     if (type === 'GET') { //发GET请求
//       promise = axios.get(url, { //配置对象
//         params: data
//       });
//     } else { //发POST请求
//       promise = axios.post(url, data);
//     }
//     // 2.如果成功了，调用resolve(value)
//     // 3.如果失败了，不调用reject(reason)
//     promise.then((response) => {
//       resolve(response.data);
//     }).catch((error) => {
//       // Reject(error);
//       message.error(`请求出错了：${error.message}`);
//     });


//   });
// }
