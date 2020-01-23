import React from 'react';
import { list, containerStyle, getColumns } from './funcs';
import DataList from '../../../components/DataList';

const NonCheckableDataList = () => (
  <div style={containerStyle}>
    <DataList
      columns={getColumns()}
      list={list}
    />
  </div>
);

export default NonCheckableDataList;