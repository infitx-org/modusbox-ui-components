import React, { PureComponent } from 'react';
import find from 'lodash/find';
import * as utils from '../../utils/common';

import Checkbox from '../Checkbox';
import Row from '../Row';
import Icon from '../Icon';
import ControlIcon from '../ControlIcon';
import Tooltip from '../Tooltip';

import '../../icons/modusbox/arrow.svg';

import './Header.scss';

const Header = ({
  columns,
  sortColumn,
  sortAsc,
  onSortClick,
  filters,
  checked,
  semiChecked,
  disabledCheck,
  onCheckboxChange,
  onFilterChange,
  onFilterBlur,
  onFilterClick,
}) => {
  const headerCells = columns.map(column => {
    const filter = find(filters, { _index: column._index });
    return (
      <HeaderCell
        className={column.className}
        key={column._index}
        label={column.label}
        isCheckbox={column._onChange}
        isSearchable={column.searchable !== false}
        isSortable={column.sortable !== false && !column._onChange}
        isSorting={sortColumn === column._index}
        isSortingAsc={sortAsc}
        isFiltering={filter !== undefined}
        filter={filter}
        onClick={() => onSortClick(column._index)}
        checked={checked}
        semiChecked={semiChecked}
        disabledCheck={disabledCheck}
        onCheckboxChange={onCheckboxChange}
        onFilterChange={value => onFilterChange(column._index, value)}
        onFilterBlur={() => onFilterBlur(column._index)}
        onFilterClick={() => onFilterClick(column._index)}
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
    if (this.props.isFiltering && !prevProps.isFiltering) {
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
    e.preventDefault();
  }
  render() {
    const {
      className,
      label,
      isCheckbox,
      isSearchable,
      isSortable,
      isSorting,
      isSortingAsc,
      isFiltering,
      filter,
      checked,
      semiChecked,
      disabledCheck,
      onCheckboxChange,
      onFilterChange,
      onFilterBlur,
    } = this.props;

    const headerCellClassName = utils.composeClassNames([
      'element-datalist__header-cell',
      isCheckbox && 'element-datalist__header-cell--checkbox',
      isSortable && 'element-datalist__header-cell--sortable',
      isSorting && 'element-datalist__header-cell--sorting',
      isFiltering && 'element-datalist__header-cell--filtering',
      className,
    ]);

    let headerCellContent = null;

    if (isCheckbox) {
      headerCellContent = (
        <Checkbox
          semi={!checked && semiChecked}
          checked={checked}
          onChange={onCheckboxChange}
          disabled={disabledCheck}
          round
        />
      );
    } else {
      headerCellContent = [];

      if (label !== '' && isSearchable) {
        headerCellContent.push(
          <FilterIcon key="filter-icon" isFiltering={isFiltering} onClick={this.onFilterClick} />,
        );
      }
      if (label !== '' && !isFiltering) {
        headerCellContent.push(<HeaderLabel key="header-label" label={label} />);
      }
      if (label !== '' && isFiltering) {
        headerCellContent.push(
          <HeaderFilter
            key="header-filter"
            isFiltering={isFiltering}
            filter={filter}
            onFilterClick={this.onFilterClick}
            onFilterChange={onFilterChange}
            onFilterBlur={onFilterBlur}
            assignRef={input => {
              this._filter = input;
            }}
          />,
        );
      }
    }
    return (
      <div className={headerCellClassName} onClick={this.onClick} role="presentation">
        {headerCellContent}
        <SortIcon isSorting={isSorting} isSortingAsc={isSortingAsc} />
      </div>
    );
  }
}

const HeaderLabel = ({ label }) => (
  <div className="element-datalist__header-cell__label">
    <Tooltip style={{ flex: ' 1 0 0 ' }}>{label}</Tooltip>
  </div>
);

const HeaderFilter = ({ filter, onFilterClick, onFilterChange, onFilterBlur, assignRef }) => (
  <input
    type="text"
    className="element-datalist__header-cell__filter"
    value={filter.value || ''}
    onClick={onFilterClick}
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
    <div className={searchIconClassName}>
      <ControlIcon
        icon="search-small"
        size={15}
        onClick={onClick}
        kind={!isFiltering ? 'default' : 'warning'}
        active={isFiltering}
      />
    </div>
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

  return <Icon className={iconClassName} name="arrow" size={10} />;
};

export default Header;
