/**
 * sysService - 系统登录、退出service
 */
import request from '@utils/request';
import { API_PREFIX, API_PREFIX_SYS } from '@utils/constants';

/**
 * sysLogin - 用户登录
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @returns {object} res
 */
export const sysLogin = (username:any, password:any) => {
  const res = request({
    method: 'post',
    url: `${API_PREFIX}${API_PREFIX_SYS}/sys-user/login/namePwdLogin`,
    data: { userName: username, password },
  });
  return res;
};

/**
 * sysLogout - 用户退出
 * @param {string} userName - 要用户的name
 * @returns {object} res
 */
export const sysLogout = ( userName:string ) => {
  const res = request({
    method: 'get',
    url: `${API_PREFIX}${API_PREFIX_SYS}/sys-user/logout`,
    params: { userName },
  });
  return res;
}

/**
 * fetchUserInfo - 获取用户信息
 * @returns {object} res
 */
export const fetchUserInfo = () => {
  const res = request({
    method: 'get',
    url: `${API_PREFIX}${API_PREFIX_SYS}/sys-user/info`,
  });
  return res;
}
