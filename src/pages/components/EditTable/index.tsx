import React from 'react';
import { Table } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';

import './index.less';

interface Props {
  dataSource: object[],
  columns: object[],
  form: FormInstance,
  rowClassName: string,
  rowKey: string,
  bordered: boolean,
  loading: boolean,
  pagination: object,
  size: string,
}

/**
 * @function EditTable - 可编辑表格
 * @reactProps {array} dataSource - 数据源
 * @reactProps {array} columns - 表格列
 * @reactProps {object} form - form对象
 * @returns React.element
 */
const EditTable:React.FC<Props> = (props:any) => {
  const { dataSource, columns, form, ...others } = props;
  const newDataSource = dataSource && dataSource.length > 0 && dataSource.map((v:any) => {
    if(['create','update'].includes(v._status) && !v.$form){
      v['$form'] = form;
    }
    return v;
  });
  return (
    <Table
      className='edit-table'
      dataSource={newDataSource}
      columns={columns}
      {...others}
    />
  );
}

export default EditTable;
