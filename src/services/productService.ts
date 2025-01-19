import ajax from './ajax';
const adminPrefix = '/admin/';

/**
 * fetchProduct - 查询商品列表
 * @param {number} pageNum - 页码
 * @param {number} pageSize - 每页显示条数
 * @returns {object} res
 */
export const fetchProduct = (pageNum: number, pageSize: number) => {
  return ajax(`${adminPrefix}product/lst`, { pageNum, pageSize });
};

/**
 * addProduct - 添加商品
 * @param {object} productinfo - 商品信息
 * @returns {object} res
 */
export const addProduct = (productinfo: object) => {
  return ajax(`${adminPrefix}product/add`, productinfo, 'POST');
};

/**
 * deleteProduct - 删除商品
 * @param {string} id - 删除的id
 * @returns {object} res
 */
export const deleteProduct = (id: string) => {
  return ajax(`${adminPrefix}product/delete`, { id }, 'POST');
};

/**
 * deleteProductImg - 删除商品图片
 * @param {string} name - 图片名称
 * @returns {object} res
 */
export const deleteProductImg = (name:string) => {
  return ajax(`${adminPrefix}product/imgDelete`, { name }, 'POST');
};

/**
 * updateProductStatus - 更新商品状态
 * @param { string } productId - 商品id
 * @param { number } status - 商品状态
 * @returns {object} res
 */
export const updateProductStatus = (productId: string, status: number) => {
  return ajax(`${adminPrefix}product/updateStatus`, { productId, status }, 'POST');
};

/**
 * queryProductInCategory - 查询商品所在分类
 * @param {string} categoryId - 分类id
 * @param {string} pageflag - 页面标识
 * @returns {object} res
 */
export const queryProductInCategory = (categoryId: string, pageflag: string) => {
  return ajax(`${adminPrefix}product/getProCate`, { categoryId, pageflag }, 'POST');
}

/**
 * searchProduct - 搜索商品
 * @param {object} params - 搜索参数
 * @param {string} params.searchType - 搜索类型productName/productDesc
 * @returns {object} res
 */
export const searchProduct = (params: any) => {
  const { pageNum, pageSize, searchName, searchType } = params;
  return ajax(`${adminPrefix}product/search`, {
    pageNum,
    pageSize,
    [searchType]: searchName
  });
}
