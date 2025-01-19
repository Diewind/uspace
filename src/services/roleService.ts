import request from '@utils/request';
import { API_PREFIX, API_PREFIX_ROLE } from '@utils/constants';

/**
 * fetchRole - 获取角色
 * @returns {object} res
 */
export const fetchRole = (params: any) => {
  const res = request({
    method: 'get',
    url: `${API_PREFIX}${API_PREFIX_ROLE}/getListOfRole`,
    params,
  });
  return res;
};

/**
 * saveRole - 添加角色
 * @param {number} role - 角色信息
 * @returns {object} res
 */
export const saveRole = ( role:object ) => {
  const res = request({
    method: 'post',
    url: `${API_PREFIX}${API_PREFIX_ROLE}/saveRole`,
    data: role,
  });
  return res;
}

/**
 * updateRole - 更新角色
 * @param {object} role - 角色信息
 * @returns {object} res
 */
export const updateRole = ( role:object ) => {
  const res = request({
    method: 'post',
    url: `${API_PREFIX}${API_PREFIX_ROLE}/updateRole`,
    data: role,
  });
  return res;
}

/**
 * deleteRole - 删除角色
 * @param {string} id - 要删除角色的id
 * @param {string} name - 要删除角色的name
 * @returns {object} res
 */
export const deleteRole = ( id:string, name: string ) => {
  const res = request({
    method: 'delete',
    url: `${API_PREFIX}${API_PREFIX_ROLE}/deleteRole`,
    params: { name },
  });
  return res;
}