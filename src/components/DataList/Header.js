/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';

import Row from '../Row';

import { HeaderCell } from './Cells';
import Checkbox from './Checkbox';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      id,
      hasChildren,
      hasMultiSelect,
      allSelected,
      someSelected,
      onMultiSelectAll,
      style,
      originalColumns,
      columns,
      filters,
      sortLabel,
      isSortingAsc,
      onColumnClick,
      onSearchClick,
      onSearchChange,
      onSearchRemove,
      onTriggerResizeWidth,
      showScrollbar,
    } = this.props;
    return (
      <div className="element-datalist__header-row-box">
        <Row
          className="element-datalist__header-row"
          style={{ paddingRight: showScrollbar ? '6px' : '0px' }}
        >
          {hasChildren && (
            <div className="element-datalist__header-cell" style={style.arrowColumn} />
          )}
          {hasMultiSelect && (
            <div
              id={`${id}-multiselect-all`}
              className="element-datalist__header-cell element-datalist__header-column-cell"
              style={{ ...style.multiSelectColumn, paddingTop: 6 }}
            >
              <Checkbox
                id="general-multi-select"
                isSelected={allSelected}
                onChange={onMultiSelectAll}
                halfChecked={someSelected}
              />
            </div>
          )}
          {columns.map((column, i) => {
            const newStyle = {
              ...(column.headerStyle || {}),
              width: column.width ? column.width : style.dataColumn.width,
            };

            const originalColumn = originalColumns[i];
            const isSortable = !(column.sortable === false);
            const isSearchable = !(column.searchable === false);
            const isResizable = !(column.resizable === false);
            const filter = find(filters, { label: column.label });
            const isSearching = filter != undefined;
            const headerCellId = `${id}-${column.label.toLowerCase().replace(/ /g, '-')}`;
            const isLastColumn = i === columns.length - 1;

            return (
              <HeaderCell
                id={headerCellId}
                key={i.toString()}
                index={i}
                isLastColumn={isLastColumn}
                searchable={isSearchable}
                resizable={isResizable}
                style={newStyle}
                column={column}
                sortable={isSortable} // undefined is sortable
                label={column.label}
                content={originalColumn.headerContent}
                showLabel={column.showLabel != undefined ? column.showLabel : true}
                isSearching={isSearching}
                filter={filter}
                isSorting={sortLabel === column.label}
                isSortingAsc={isSortingAsc}
                onColumnClick={() => (isSortable ? onColumnClick(column.label) : {})}
                onSearchClick={evt => (isSearchable ? onSearchClick(evt, column.label) : {})}
                onSearchChange={onSearchChange}
                onSearchRemove={onSearchRemove}
                onTriggerResizeWidth={onTriggerResizeWidth}
                ref={cell => (this[`headerCell${i}`] = cell)}
              />
            );
          })}
        </Row>
      </div>
    );
  }
}

Header.propTypes = {
  id: PropTypes.string,
  hasChildren: PropTypes.bool,
  hasMultiSelect: PropTypes.bool,
  allSelected: PropTypes.bool,
  someSelected: PropTypes.bool,
  onMultiSelectAll: PropTypes.func,
  style: PropTypes.shape(),
  originalColumns: PropTypes.array,
  columns: PropTypes.array,
  filters: PropTypes.array,
  sortLabel: PropTypes.string,
  isSortingAsc: PropTypes.bool,
  onColumnClick: PropTypes.func,
  onSearchClick: PropTypes.func,
  onSearchChange: PropTypes.func,
  onSearchRemove: PropTypes.func,
  onTriggerResizeWidth: PropTypes.func,
  showScrollbar: PropTypes.bool,
};
export default Header;
