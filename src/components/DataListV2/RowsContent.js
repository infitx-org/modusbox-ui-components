/* eslint-disable */
import React, { PureComponent } from 'react';
import Row from '../Row';
import { ItemCell } from './Cells';

class RowsContent extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { items, columns } = this.props;
    const rows = items.map( (item, itemIdx) => <RowItem item={item} key={itemIdx} columns={columns}/> );
    return (
      <div className="element-datalist__rows">
        {rows}
      </div>
    );
  }
}

class RowItem extends PureComponent {
  constructor(props){
    super(props);
  }

  render(){
    const { item, columns } = this.props;
    const rowCells = columns.map( (column, cellIdx) => <ItemCell>{item[column.key]}</ItemCell> );
    return (
      <Row>
        {rowCells}
      </Row>
    );
  }
}

export default RowsContent;
