import ajax from './ajax';
const adminPrefix = '/admin/';

/**
 * fetchCategory - 获取分类
 * @returns {object} res
 */
export const fetchCategory = () => {
  return ajax(`${adminPrefix}category/catelist`);
};

/**
 * saveCategory - 保存分类
 * @param {array} data - 数据
 * @returns {object} res
 */
export const saveCategory = (data:object[]) => {
  return ajax(`${adminPrefix}category/save`, data, 'POST');
};

/**
 * deleteCategory - 删除分类
 * @param {string} categoryId - 分类id
 * @returns {object} res
 */
export const deleteCategory = (categoryId:string) => {
  return ajax(`${adminPrefix}category/delete`, { categoryId }, 'POST');
}
