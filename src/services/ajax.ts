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
import axios from 'axios';
import { message } from 'antd';
export default function ajax(url:any, data = {}, type = 'GET') {
  return new Promise((resolve) => {
    let promise = null;
    // 1.执行异步ajax请求
    if (type === 'GET') { //发GET请求
      promise = axios.get(url, { //配置对象
        params: data
      });
    } else { //发POST请求
      promise = axios.post(url, data);
    }
    // 2.如果成功了，调用resolve(value)
    // 3.如果失败了，不调用reject(reason)
    promise.then((response) => {
      resolve(response.data);
    }).catch((error) => {
      // Reject(error);
      message.error(`请求出错了：${error.message}`);
    });


  });
}
