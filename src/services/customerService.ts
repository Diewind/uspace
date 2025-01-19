import request from '@utils/request';
import { API_PREFIX, API_PREFIX_CUSTOMER } from '@utils/constants';

/**
 * fetchCustomer - 获取客户
 * @returns {object} res
 */
export const fetchCustomer = (params: any) => {
  const res = request({
    method: 'get',
    url: `${API_PREFIX}${API_PREFIX_CUSTOMER}/getListOfCustomer`,
    params,
  });
  return res;
};

/**
 * saveCustomer - 添加客户
 * @param {number} customer - 客户信息
 * @returns {object} res
 */
export const saveCustomer = ( customer:object ) => {
  const res = request({
    method: 'post',
    url: `${API_PREFIX}${API_PREFIX_CUSTOMER}/saveCustomer`,
    data: customer,
  });
  return res;
}

/**
 * updateCustomer - 更新客户
 * @param {object} customer - 客户信息
 * @returns {object} res
 */
export const updateCustomer = ( customer:object ) => {
  const res = request({
    method: 'post',
    url: `${API_PREFIX}${API_PREFIX_CUSTOMER}/updateCustomer`,
    data: customer,
  });
  return res;
}

/**
 * deleteCustomer - 删除客户
 * @param {string} id - 要删除客户的id
 * @param {string} companyName - 要删除客户的name
 * @returns {object} res
 */
export const deleteCustomer = ( id:string, companyName: string ) => {
  const res = request({
    method: 'delete',
    url: `${API_PREFIX}${API_PREFIX_CUSTOMER}/deleteCustomer`,
    params: { companyName },
  });
  return res;
}