/* eslint no-console: "off" */
import React, { useState } from 'react';
import DataList from './DataList';
import Icon from '../Icon';

export default {
  title: 'DataList',
  component: DataList,
};

function buildRow(row, index) {
  return {
    col1: index * 4 + 1,
    col2: index * 4 + 2,
    col3: index * 4 + 3,
    col4: index * 4 + 4,
  };
}

export const Default = () => {
  const items = [1, 2, 3, 4, 5].map(buildRow);
  const columns = [
    {
      label: 'first column',
      key: 'col1',
    },
    {
      label: 'second column',
      key: 'col2',
    },
    {
      label: 'third column',
      key: 'col3',
    },
    {
      label: 'fourth column',
      key: 'col4',
    },
  ];

  return <DataList columns={columns} list={items} />;
};

export const SortingRows = () => {
  const items = [1, 2, 3, 4, 5].map(buildRow);
  const columns = [
    {
      label: 'first column',
      key: 'col1',
    },
    {
      label: 'second column',
      key: 'col2',
    },
    {
      label: 'third column',
      key: 'col3',
    },
    {
      label: 'fourth column',
      key: 'col4',
    },
  ];

  return <DataList columns={columns} list={items} sortColumn={columns[2].label} />;
};

export const SortingRowsDescending = () => {
  const items = [1, 2, 3, 4, 5].map(buildRow);
  const columns = [
    {
      label: 'first column',
      key: 'col1',
    },
    {
      label: 'second column',
      key: 'col2',
    },
    {
      label: 'third column',
      key: 'col3',
    },
    {
      label: 'fourth column',
      key: 'col4',
    },
  ];

  return <DataList columns={columns} list={items} sortColumn={columns[2].label} sortAsc={false} />;
};

export const RenderWithFlexbox = () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(buildRow);
  const columns = [
    {
      label: 'first column',
      key: 'col1',
    },
    {
      label: 'second column',
      key: 'col2',
    },
    {
      label: 'third column',
      key: 'col3',
    },
    {
      label: 'fourth column',
      key: 'col4',
    },
  ];

  return (
    <div style={{ height: '200px', display: 'flex', flexDirection: 'column' }}>
      <DataList columns={columns} list={items} flex />
    </div>
  );
};

export const RenderingComponents = () => {
  const items = [1, 2, 3].map(buildRow);
  const columns = [
    {
      label: 'first column',
      key: 'col1',
      func: value => <Icon name="deploy-small" fill={value % 2 ? '#f00' : '#333'} />,
    },
    {
      label: 'second column',
      key: 'col2',
      func: value => <Icon name="deploy-small" fill={value % 2 ? '#f00' : '#333'} />,
    },
    {
      label: 'third column',
      key: 'col3',
      func: value => <Icon name="deploy-small" fill={value % 2 ? '#f00' : '#333'} />,
    },
    {
      label: 'fourth column',
      key: 'col4',
      func: value => <Icon name="deploy-small" fill={value % 2 ? '#f00' : '#333'} />,
    },
  ];

  return <DataList columns={columns} list={items} />;
};

export const SelectedRows = () => {
  const items = [1, 2, 3, 4, 5].map(buildRow);
  const columns = [
    {
      label: 'first column',
      key: 'col1',
    },
    {
      label: 'second column',
      key: 'col2',
    },
    {
      label: 'third column',
      key: 'col3',
    },
    {
      label: 'fourth column',
      key: 'col4',
    },
  ];

  const [selectedItems, onSelectItems] = useState([items[2]]);
  const onUnselect = item => {
    onSelectItems(selectedItems.filter(selectedItem => selectedItem !== item));
  };
  const onSelect = item => {
    onSelectItems(selectedItems.concat(item));
  };

  return (
    <DataList
      columns={columns}
      list={items}
      selected={selectedItems}
      onSelect={onSelect}
      onUnselect={onUnselect}
    />
  );
};

export const SelectedRowsWithFunction = () => {
  const items = [1, 2, 3, 4, 5].map(buildRow);
  const columns = [
    {
      label: 'first column',
      key: 'col1',
    },
    {
      label: 'second column',
      key: 'col2',
    },
    {
      label: 'third column',
      key: 'col3',
    },
    {
      label: 'fourth column',
      key: 'col4',
    },
  ];

  return <DataList columns={columns} list={items} selected={item => item.col1 > 7} />;
};

export const CheckedRows = () => {
  const items = [1, 2, 3, 4, 5].map(buildRow);
  const columns = [
    {
      label: 'first column',
      key: 'col1',
    },
    {
      label: 'second column',
      key: 'col2',
    },
    {
      label: 'third column',
      key: 'col3',
    },
    {
      label: 'fourth column',
      key: 'col4',
    },
  ];

  return <DataList columns={columns} list={items} checked={[items[2]]} onCheck={console.log} />;
};

export const CheckedRowsWithFunction = () => {
  const items = [1, 2, 3, 4, 5].map(buildRow);
  const columns = [
    {
      label: 'first column',
      key: 'col1',
    },
    {
      label: 'second column',
      key: 'col2',
    },
    {
      label: 'third column',
      key: 'col3',
    },
    {
      label: 'fourth column',
      key: 'col4',
    },
  ];

  return (
    <DataList
      columns={columns}
      list={items}
      checked={item => item.col1 > 7}
      onCheck={console.log}
    />
  );
};

export const CheckableRows = () => {
  const items = [1, 2, 3, 4, 5].map(buildRow);
  const columns = [
    {
      label: 'first column',
      key: 'col1',
    },
    {
      label: 'second column',
      key: 'col2',
    },
    {
      label: 'third column',
      key: 'col3',
    },
    {
      label: 'fourth column',
      key: 'col4',
    },
  ];

  return (
    <DataList
      columns={columns}
      list={items}
      checked={item => item.col1 > 7}
      checkable={item => item.col1 > 7}
      onCheck={console.log}
    />
  );
};
