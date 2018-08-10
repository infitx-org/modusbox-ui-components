import React, { PureComponent } from 'react';
import find from 'lodash/find';
import * as utils from '../../utils/common';

import Row from '../Row';
import Icon from '../Icon';
import Tooltip from '../Tooltip';

import './Header.scss';
import '../../icons/modusbox/arrow.svg';

const Header = ({
  columns, sortKey, sortAsc, onSortClick, filters, onFilterChange, onFilterBlur, onFilterClick,
}) => {
  const headerCells = columns.map((column) => {
    const filter = find(filters, { label: column.label });
    return (
      <HeaderCell
        key={column.__index}
        label={column.label}
        isSortable={column.sortable}
        isSorting={sortKey === column.key}
        isSortingAsc={sortAsc}
        isFiltering={filter !== undefined}
        filter={filter}
        onClick={() => onSortClick(column.key)}
        onFilterChange={value => onFilterChange(column.label, value)}
        onFilterBlur={() => onFilterBlur(column.label)}
        onFilterClick={() => onFilterClick(column.label)}
      />
    );
  });

  return (
    <div className="element-datalist__header">
      <Row>{headerCells}</Row>
    </div>
  );
};


// Cell in the Header
class HeaderCell extends PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    if (this.props.isSortable) {
      this.props.onClick();
    }
  }
  render() {
    const {
      label,
      isSortable,
      isSorting,
      isSortingAsc,
      isFiltering,
      filter,
      onFilterChange,
      onFilterBlur,
      onFilterClick,
    } = this.props;

    const headerCellClassName = utils.composeClassNames([
      'element-datalist__header-cell',
      isSortable && 'element-datalist__header-cell--sortable',
      isSorting && 'element-datalist__header-cell--sorting',
      isFiltering && 'element-datalist__header-cell--filtering',
    ]);

    return (
      <div className={headerCellClassName} onClick={this.onClick} role="presentation">

        <FilterIcon
          isFiltering={isFiltering}
          onClick={onFilterClick}
        />
        <HeaderCellContent
          label={label}
          isFiltering={isFiltering}
          filter={filter}
          onFilterChange={onFilterChange}
          onFilterBlur={onFilterBlur}
        />

        <SortIcon
          isSorting={isSorting}
          isSortingAsc={isSortingAsc}
        />
      </div>
    );
  }
}

const HeaderCellContent = ({
  isFiltering,
  filter,
  label,
  onFilterChange,
  onFilterBlur,
}) => {
  if (!isFiltering) {
    return (
      <div className="element-datalist__header-cell__label">
        <Tooltip>{label}</Tooltip>
      </div>
    );
  }
  return (
    <input
      type="text"
      className="element-datalist__header-cell__filter"
      value={filter.value || ''}
      onChange={e => onFilterChange(e.target.value)}
      onBlur={onFilterBlur}
    />
  );
};

const FilterIcon = ({ isFiltering, onClick }) => {
  const searchIconClassName = utils.composeClassNames([
    'element-datalist__header-cell__search-icon',
    isFiltering && 'element-datalist__header-cell__search-icon--active',
  ]);

  return (
    <Icon
      name="search-small"
      className={searchIconClassName}
      size={14}
      onClick={onClick}
    />
  );
};

const SortIcon = ({ isSorting, isSortingAsc }) => {
  if (!isSorting) {
    return null;
  }

  const iconClassName = utils.composeClassNames([
    'element-datalist__header-cell__sort-icon',
    isSortingAsc && 'element-datalist__header-cell__sort-icon--asc',
  ]);

  return (
    <Icon
      className={iconClassName}
      name="arrow"
      size={10}
    />
  );
};

export default Header;
