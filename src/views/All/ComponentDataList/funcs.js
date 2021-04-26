import React from 'react';

import Checkbox from '../../../components/Checkbox';
import { Link } from '../../../components/DataList';
import Icon from '../../../components/Icon';

let idx = 0;
export const buildRow = () => {
  const row = {
    col1: (idx += 1),
    col2: (idx += 1),
    col3: (idx += 1),
    col4: (idx += 1),
    col5: { nested: { nested: (idx += 1) } },
  };
  return row;
};

export const list = new Array(1200).fill(0).map(buildRow);

export const containerStyle = {
  padding: '5px',
  display: 'flex',
  flex: '2 0 auto',
  flexDirection: 'column',
  minHeight: '0',
};

export const rowStyle = {
  padding: '0px 5px',
  display: 'inline-flex',
  flex: '0 0 auto',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
};

export const settingsStyle = {
  background: '#eee',
  padding: 0,
  borderRadius: '10px',
  marginBottom: 3,
};

export const getColumns = ({
  valueModifier = 1,
  col1 = false,
  col2 = false,
  col3 = false,
  col4 = false,
  centered = false,
  link = false,
  text = false,
  transform = false,
  span = false,
  nested = false,
  linkFunc = false,
  icon = false,
  component = false,
  disableTooltip,
} = {}) => {
  return [
    col1 && {
      label: 'Col 1',
      key: 'col1',
    },
    col2 && {
      label: 'Col 2',
      key: 'col2',
    },
    col3 && {
      label: 'Col 3',
      key: 'col3',
    },
    col4 && {
      label: 'Col 4',
      key: 'col4',
    },
    centered && {
      label: 'Centered Very MUUUUUUUUUCH',
      key: '_',
      func: () => 'centerd',
      centered: true,
    },
    link && {
      label: 'Link',
      key: 'col1',
      // eslint-disable-next-line
      func: value => <Link>{value}</Link>,
    },
    text && {
      label: 'Regular',
      key: 'col1',
      // eslint-disable-next-line
      func: x => <Link>{x}</Link>,
    },
    transform && {
      label: 'Transform',
      key: 'col1',
      func: x => x * 2 * valueModifier,
      className: 'col-100px',
    },
    span && {
      label: 'As a span',
      key: 'col1',
      func: x => <span>{x * Math.random()}</span>,
      className: 'col-100px',
    },
    nested && {
      label: 'Nested',
      key: 'col5.nested.nested',
    },
    linkFunc && {
      label: 'As a Link',
      key: 'col1',
      func: x => new Array(15).fill(x).join(''),
      // eslint-disable-next-line
      link: console.log,
    },
    icon && {
      sortable: false,
      label: '',
      key: 'col1',
      func: () => <Icon name="close-small" size={16} fill="#999" />,
      className: 'col-40px',
    },
    component && {
      sortable: false,
      label: '',
      key: 'col1',
      func: () => <Checkbox checked={valueModifier % 2 !== 0} />,
      className: 'col-40px',
    },
  ].filter(item => item !== false && item !== undefined).map(col => ({...col, disableTooltip}));
};
