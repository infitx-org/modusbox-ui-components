/* eslint-disable */
import React, { PureComponent } from 'react';

import * as utils from '../../utils/common';

import Icon from '../Icon';
import Tooltip from '../Tooltip';

import './Cells.scss';

// the icon is throwing an error, but the code and the functionality isn't broken
class ArrowCell extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="element-datalist__body-cell arrow-cell">
        <Icon
          size="xs"
          name="arrow-down-small"
          className={`element-datalist__body-arrowIcon ${!this.props.isSelected ? 'rotated' : ''}`}
        />
      </div>
    );
  }
}

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

// Cell in the Header
class HeaderCell extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { label, isSorting, isSortingAsc, onClick } = this.props;
    let sortIcon = null;

    if (isSorting) {
      const iconClassNames = utils.composeClassNames([
        'element-datalist__header-cell__sort-icon',
        isSortingAsc && 'element-datalist__header-cell__sort-icon--asc'
      ])
      sortIcon = (
        <Icon
          className={iconClassNames}
          name='arrow-down-small'
          size={16}
        />
      )
    }

    return (
      <div className="element-datalist__header-cell" onClick={onClick} role="presentation">
        <div className="element-datalist__header-cell__label">
          {label}
        </div>
        {sortIcon}
      </div>
    );
  }
}

export { ItemCell, HeaderCell };
