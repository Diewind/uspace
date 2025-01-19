import ajax from './ajax';

const adminPrefix = '/admin/';
const adminMindPrefix = `${adminPrefix}learn/mind/`;
const adminFlowPrefix = `${adminPrefix}learn/flow/`;
const adminKoniPrefix = `${adminPrefix}learn/koni/`;

/* 思维导图 */
/**
 * fetchMindList - 获取思维导图列表
 * @returns {object} res
 */
export const fetchMindList = () => {
  return ajax(`${adminMindPrefix}list`);
};
/**
 * deleteMindList - 删除思维导图列表
 * @param {string} id - 删除的项
 * @returns {object} res
 */
export const deleteMindList = (id:string) => {
  return ajax(`${adminMindPrefix}delete`, { id }, 'POST');
}
/**
 * saveMind - 保存思维导图列表
 * @param {object} params - 保存的数据
 * @returns {object} res
 */
export const saveMind = (params:object) => {
  return ajax(`${adminMindPrefix}save`, { params }, 'POST');
}

/* 流程图 */
/**
 * fetchFlowList - 获取流程图列表
 * @returns {object} res
 */
export const fetchFlowList = () => {
  return ajax(`${adminFlowPrefix}list`);
};
/**
 * deleteFlowList - 删除流程图列表
 * @param {string} id - 删除的项
 * @returns {object} res
 */
export const deleteFlowList = (id:string) => {
  return ajax(`${adminFlowPrefix}delete`, { id }, 'POST');
}
/**
 * saveFlow - 删除流程图列表
 * @param {object} params - 保存的数据
 * @returns {object} res
 */
export const saveFlow = (params:object) => {
  return ajax(`${adminFlowPrefix}save`, { params }, 'POST');
}

/* 拓扑图 */
/**
 * fetchKoniList - 获取拓扑图列表
 * @returns {object} res
 */
export const fetchKoniList = () => {
  return ajax(`${adminKoniPrefix}list`);
};
/**
 * deleteKoniList - 删除拓扑图列表
 * @param {string} id - 删除的项
 * @returns {object} res
 */
export const deleteKoniList = (id:string) => {
  return ajax(`${adminKoniPrefix}delete`, { id }, 'POST');
}
/**
 * saveKoni - 删除拓扑图列表
 * @param {object} params - 保存的数据
 * @returns {object} res
 */
export const saveKoni = (params:object) => {
  return ajax(`${adminKoniPrefix}save`, { params }, 'POST');
}
