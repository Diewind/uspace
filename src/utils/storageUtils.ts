/*
进行local数据存储管理的工具模块
*/
import store from 'store';// 引用store库来实现浏览器兼容storage
const USER_KEY: string = 'user_key';
export default {
  /*
  保存user
  */
  saveUser(user: string) {
    // LocalStorage.setItem(USER_KEY,JSON.stringify(user));
    store.set(USER_KEY, user);
  },
  /*
  读取user
  */
  getUser() {
    // Return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
    return store.get(USER_KEY) || {};
  },
  /*
  删除user
  */
  removeUser() {
    // LocalStorage.removeItem(USER_KEY);
    store.remove(USER_KEY);
  }
};
