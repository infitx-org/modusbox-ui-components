import './Rows.scss';

import React, { PureComponent } from 'react';
import * as utils from 'utils/common';

import ScrollBox from '../ScrollBox';
import Tooltip from '../Tooltip';

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
        <div className="el-datalist__rows">{rows}</div>
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
        isCheckbox={column._onChange !== undefined}
        checked={item._checked}
        isCentered={column.centered}
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
      'el-datalist__row',
      selected && 'el-datalist__row--selected',
      !visible && 'el-datalist__row--filtered',
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
    const { isCheckbox, checked, isCentered, content, value, className } = this.props;
    const itemCellClassName = utils.composeClassNames([
      className,
      'el-datalist__item-cell',
      isCentered && 'el-datalist__item-cell--centered',
      isCheckbox && 'el-datalist__item-cell--checkbox',
    ]);
    let cell = null;
    if (isCheckbox && content) {
      cell = React.cloneElement(content, { ...content.props, checked });
    } else if (content) {
      cell = content;
    } else {
      cell = <Tooltip>{value}</Tooltip>;
    }
    return <div className={itemCellClassName}>{cell}</div>;
  }
}
export default Rows;
