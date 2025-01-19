import request from '@utils/request';
import { API_PREFIX, API_PREFIX_USER } from '@utils/constants';

/**
 * fetchUser - 获取用户
 * @returns {object} res
 */
export const fetchUser = (params: any) => {
  const res = request({
    method: 'get',
    url: `${API_PREFIX}${API_PREFIX_USER}/getListOfUser`,
    params,
  });
  return res;
};

/**
 * saveUser - 添加用户
 * @param {number} user - 用户信息
 * @returns {object} res
 */
export const saveUser = ( user:object ) => {
  const res = request({
    method: 'post',
    url: `${API_PREFIX}${API_PREFIX_USER}/saveUser`,
    data: user,
  });
  return res;
}

/**
 * updateUser - 更新用户
 * @param {object} user - 用户信息
 * @returns {object} res
 */
export const updateUser = ( user:object ) => {
  const res = request({
    method: 'post',
    url: `${API_PREFIX}${API_PREFIX_USER}/updateUser`,
    data: user,
  });
  return res;
}

/**
 * deleteUser - 删除用户
 * @param {string} id - 要删除用户的id
 * @param {string} name - 要删除用户的name
 * @returns {object} res
 */
export const deleteUser = ( id:string, name: string ) => {
  const res = request({
    method: 'delete',
    url: `${API_PREFIX}${API_PREFIX_USER}/deleteUser`,
    params: { name },
  });
  return res;
}