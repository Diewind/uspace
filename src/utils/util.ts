import { PAGE_SIZE } from '@utils/constants';
export const getBase64 = (file:any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export const parseTableParams = (params: any = {}) => {
  const defaultObj:any = {
    pageSize: PAGE_SIZE,
    current: 1,
    showQuickJumper: true,
    showSizeChanger: true,
  };
  if(!params){
    return defaultObj;
  }
  const { current = 1, size = 10, total = 0 } = params;
  if(total){
    defaultObj.current = current;
    defaultObj.pageSize = size;
    defaultObj.total = total;
    defaultObj.showTotal = (total:any, range:any) => `第 ${range[0]} - ${range[1]} 条， 共 ${total} 条`;
  }
  return defaultObj;
}