/* eslint-disable */
import React, { PureComponent } from 'react';
import * as utils from '../../utils/common';

import Row from '../Row';
import Icon from '../Icon';
import Tooltip from '../Tooltip';
import ScrollBox from '../ScrollBox';

import './Rows.scss';

class Rows extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { items, columns } = this.props;
    const rows = items.map(item => (
      <RowItem
        item={item}
        key={item.__index}
        columns={columns}
      />
    ));

    return (
      <ScrollBox>
        <div className="element-datalist__rows">
          {rows}
        </div>
      </ScrollBox>
    );
  }
}

class RowItem extends PureComponent {
  static getCells(item) {
    return (column, index) => (
      <ItemCell key={index}>{item[column.key]}</ItemCell>
    );
  } 
  constructor(props){
    super(props);
  }

  render(){
    const { item, columns } = this.props;
    const rowCells = columns.map(RowItem.getCells(item));
    return (
      <Row className="element-datalist__row">
        {rowCells}
      </Row>
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

const ItemCell = ({ children }) => (
  <div  className="element-datalist__item-cell__wrapper">
    <div className="element-datalist__item-cell__content">
      <Tooltip>{children}</Tooltip>
    </div>
  </div>
);

export default Rows;
