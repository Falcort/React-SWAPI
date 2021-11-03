import React from 'react';
import { Table as AntTable, TableColumnGroupType, TableColumnType } from 'antd';

interface Props {
    columns: (TableColumnGroupType<Object> | TableColumnType<Object>)[]
    data: Object[]
    loading: boolean,
}

function Table({ columns, data, loading }: Props) {
  return (
    <AntTable columns={columns} dataSource={data} loading={loading} />
  );
}

export default Table;
