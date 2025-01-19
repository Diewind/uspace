// 引入 token，此处直接引入，也可以在 main.js 中全局引入
import Cookies from 'js-cookie';

// 设置 token 存储的 key
const TokenKey = 'Token';

// 获取 token
export function getToken() {
  return Cookies.get(TokenKey);
}

// 设置 token
export function setToken(token: string) {
  const inFifteenMinutes = new Date(new Date().getTime() + 1000 * 60 * 60 * 2); // 设置过期时间 2小时
  return Cookies.set(TokenKey, token, { expires: inFifteenMinutes });
}

// 移除 token
export function removeToken() {
  return Cookies.remove(TokenKey);
}