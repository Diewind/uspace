/*
用来在内存中保存一些数据的工具模块
*/
interface userInfo {
  user: {
    username:string,
    role: {
      id: string,
      menus: object[],
    }
  }
}
const memoryObj: userInfo = {
  user: {
    username: '',
    role: {
      id: '',
      menus: [],
    }
  } // 保存当前登录的user
}
export default memoryObj;
