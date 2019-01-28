import React, { PureComponent } from 'react';
import * as utils from '../../utils/common';

import Tooltip from '../Tooltip';
import ScrollBox from '../ScrollBox';

class Rows extends PureComponent {
  constructor(props) {
    super(props);
    this.onItemClick = this.onItemClick.bind(this);
  }
  onItemClick(index) {
    this.props.onItemClick(index);
  }
  render() {
    const { items, columns } = this.props;
    const rows = items.map(item => (
      <RowItem
        item={item}
        key={item._index}
        columns={columns}
        selected={item._selected}
        onClick={this.onItemClick}
        visible={item._visible}
      />
    ));

    return (
      <ScrollBox>
        <div className="element-datalist__rows">{rows}</div>
      </ScrollBox>
    );
  }
}

class RowItem extends PureComponent {
  static getCells(item) {
    return column => (
      <ItemCell
        key={column._index}
        className={column.className}
        content={item.data[column._index].component}
        value={item.data[column._index].value}
      />
    );
  }
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.onClick(this.props.item._index);
  }
  render() {
    const { item, columns, selected, visible } = this.props;
    const rowCells = columns.map(RowItem.getCells(item));
    const rowClassName = utils.composeClassNames([
      'element-datalist__row',
      selected && 'element-datalist__row--selected',
      !visible && 'element-datalist__row--filtered',
    ]);

    return (
      <div className={rowClassName} onClick={this.onClick} role="presentation">
        {rowCells}
      </div>
    );
  }
}

class ItemCell extends PureComponent {
  render() {
    const { content, value, className } = this.props;
    const itemCellClassName = utils.composeClassNames(['element-datalist__item-cell', className]);
    let cell = null;
    if (content) {
      cell = content;
    } else {
      cell = <Tooltip>{value}</Tooltip>
    }
    return (
      <div className={itemCellClassName}>
        {cell}
      </div>
    );
  }
}
export default Rows;
