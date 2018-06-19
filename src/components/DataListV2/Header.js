/* eslint-disable */
import React, { PureComponent } from 'react';
import Row from '../Row';
import { HeaderCell } from './Cells';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { columns, sortKey, sortAsc, onSortClick } = this.props;
    const headerCells = columns.map( (column, columnIdx) => (
      <HeaderCell
        key={columnIdx}
        label={column.label}
        isSorting={sortKey === column.key}
        isSortingAsc={sortAsc}
        onClick={() => onSortClick(column.key)}
      />
    ));
    return (
      <div className="element-datalist__header">        
        <Row>{headerCells}</Row>
      </div>
    );
  }
}

export default Header;
