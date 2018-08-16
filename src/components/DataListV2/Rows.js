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
  constructor(props){
    super(props);
  }

  render(){
    const { item, columns } = this.props;
    const rowCells = columns.map( (column, cellIdx) => <ItemCell key={cellIdx}>{item[column.key]}</ItemCell> );
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

class ItemCell extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { icon, children } = this.props;
    return (
      <div  className="element-datalist__item-cell__wrapper">
        <div className="element-datalist__item-cell__content">
          {icon && (
            <Icon
              size={16}
              name={''}
              color={color || '#333'}
              className="element-datalist__body-cell-icon"
            />
          )}
          <Tooltip>{children}</Tooltip>
        </div>
      </div>
    );
  }
}

export default Rows;
