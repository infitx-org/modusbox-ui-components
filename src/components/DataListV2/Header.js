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
    this.onFilterClick = this.onFilterClick.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (this.props.isFiltering && this.props.isFiltering !== prevProps.isFiltering) {
      this._filter.focus();
    }
  }
  onClick() {
    if (this.props.isSortable) {
      this.props.onClick();
    }
  }
  onFilterClick(e) {
    this.props.onFilterClick();
    e.stopPropagation();
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
    } = this.props;

    const headerCellClassName = utils.composeClassNames([
      'element-datalist__header-cell',
      isSortable && 'element-datalist__header-cell--sortable',
      isSorting && 'element-datalist__header-cell--sorting',
      isFiltering && 'element-datalist__header-cell--filtering',
    ]);

    return (
      <div
        className={headerCellClassName}
        onClick={this.onClick}
        role="presentation"
      >

        <FilterIcon
          isFiltering={isFiltering}
          onClick={this.onFilterClick}
        />
        {!isFiltering && <HeaderLabel label={label} />}
        {isFiltering &&
          <HeaderFilter
            isFiltering={isFiltering}
            filter={filter}
            onFilterClick={this.onFilterClick}
            onFilterChange={onFilterChange}
            onFilterBlur={onFilterBlur}
            assignRef={(input) => { this._filter = input; }}
          />
        }
        <SortIcon
          isSorting={isSorting}
          isSortingAsc={isSortingAsc}
        />
      </div>
    );
  }
}


const HeaderLabel = ({ label }) => (
  <div className="element-datalist__header-cell__label">
    <Tooltip>{label}</Tooltip>
  </div>
);

const HeaderFilter = ({
  filter,
  onFilterChange,
  onFilterBlur,
  assignRef,
}) => (
  <input
    type="text"
    className="element-datalist__header-cell__filter"
    value={filter.value || ''}
    onChange={e => onFilterChange(e.target.value)}
    onBlur={onFilterBlur}
    ref={assignRef}
  />
);

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
