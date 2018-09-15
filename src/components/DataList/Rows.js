/* eslint-disable */
import React, { Component, PureComponent } from 'react';
import * as utils from '../../utils/common';
import isEqual from 'lodash/isEqual';

import Row from '../Row';
import Icon from '../Icon';
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
    const rows = items.map((item, index) => (
      <RowItem
        item={item}
        key={index}
        columns={columns}
        selected={item._selected}
        onClick={this.onItemClick}
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
    return (column, index) => (
      <ItemCell key={index.toString()} className={column.className}>
        {item.data[column.key]}
      </ItemCell>
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
    const { item, columns, selected } = this.props;
    const rowCells = columns.map(RowItem.getCells(item));
    const rowClassName = utils.composeClassNames([
      'element-datalist__row',
      selected && 'element-datalist__row--selected',
    ]);
    return (
      <div className={rowClassName} onClick={this.onClick}>
        {rowCells}
      </div>
    );
  }
}

// the icon is throwing an error, but the code and the functionality isn't broken
const ArrowCell = ({ isSelected }) => (
  <div className="element-datalist__body-cell arrow-cell">
    <Icon
      size="xs"
      name="arrow-down-small"
      className={`element-datalist__body-arrowIcon ${!this.props.isSelected ? 'rotated' : ''}`}
    />
  </div>
);

class ItemCell extends PureComponent {
  render() {
    const { children, className } = this.props;
    const itemCellClassName = utils.composeClassNames(['element-datalist__item-cell', className]);
    return (
      <div className={itemCellClassName}>
        <div className="element-datalist__item-cell__content">
          <Tooltip>{children}</Tooltip>
        </div>
      </div>
    );
  }
}
export default Rows;
