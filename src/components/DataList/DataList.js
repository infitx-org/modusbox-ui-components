import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import orderBy from 'lodash/orderBy';
import find from 'lodash/find';
import get from 'lodash/get';
import uuid from '../../utils/uuid';
import * as utils from '../../utils/common';

import Checkbox from '../Checkbox';
import Header from './Header';
import Rows from './Rows';
import Link from './Link';
import { NoData, Pending, ErrorMessage } from './Boxes';

import './DataList.scss';

class DataList extends PureComponent {
  static getCheckedItems(list, checked) {
    if (typeof checked === 'function') {
      return list.filter(checked);
    } else if (Array.isArray(checked)) {
      return checked;
    }
    return undefined;
  }
  static isItemChecked(item) {
    return item._checked === true;
  }
  static convertColumns(columns, prevColumns = [], onCheck) {
    const tpmColumns = [];
    let translateIndex = 0;

    if (prevColumns.some(col => col._onChange)) {
      // detect if any of the previous columns was the checkbox
      // and set and a translation index to properly get the right column
      translateIndex = 1;
    }
    if (typeof onCheck === 'function') {
      translateIndex = 1;
      tpmColumns.push({
        _index: '_checkbox_column',
        _onChange: onCheck,
      });
    }

    const mapIndexToColumns = prev => (column, i) => {
      tpmColumns.push({
        // get the _index key from the already existing columns if available
        // so that it does not change and worn't break sorting or filtering
        // because they use the column _index key to identify the column
        _index: get(prev, `[${i + translateIndex}]._index`) || uuid(),
        ...column,
      });
    };

    columns.forEach(mapIndexToColumns(prevColumns));
    return tpmColumns;
  }
  static toItems(list, columns, selected, checked, prevItems, prevList = []) {
    // applies the column configuration to the list
    // so that child components will not need any transformation logic
    const reduceColumns = (row, _rowIndex) => (prev, column) => {
      const { func, key, link, _index, _onChange } = column;
      let value = get(row._source, key);
      let component = null;

      if (typeof func === 'function') {
        value = func(value, row._source, _rowIndex);
      }
      if (typeof link === 'function') {
        // eslint-disable-next-line
        component = <Link onClick={() => link(row._source[key], row._source)}>{value}</Link>;
      } else if (_onChange) {
        component = <Checkbox onChange={() => _onChange(_rowIndex)} round />;
      }

      const isTextContent = typeof value === 'string' || typeof value === 'number';

      if (React.isValidElement(value)) {
        component = value;
      }

      return {
        ...prev,
        [_index]: {
          value: isTextContent ? value : null,
          component,
        },
      };
    };

    const mapListRowToItem = (oldItems, oldList) => (item, _listIndex) => {
      let row;
      if (isEqual(item, oldList[_listIndex])) {
        // use last item if available so that the internal index does
        // not change, keeping eveything working faster
        row = find(oldItems, { _position: _listIndex });
      } else {
        row = {
          _position: _listIndex,
          _index: get(oldItems, `[${_listIndex}]._index`) || uuid(),
          _source: item,
          _visible: true,
        };
      }

      row._selected = selected ? selected(item) : false;
      row._checked = checked
        ? checked.some(check => isEqual(check, item))
        : get(oldItems, `[${_listIndex}]._checked`);
      row.data = columns.reduce(reduceColumns(row, row._index), {});

      return row;
    };

    return list.map(mapListRowToItem(prevItems, prevList));
  }
  static filterItems(items, columns, filters) {
    const filtersByKey = filters.filter(item => item.value !== '');

    const matchingRows = item => ({
      ...item,
      _visible: filtersByKey.every(filter => {
        const { _index, value } = filter;
        let cell = get(item.data[_index], 'value');
        if (typeof cell === 'number') {
          cell = cell.toString();
        }
        if (typeof cell === 'string') {
          return cell.toLowerCase().includes(value.toLowerCase());
        }

        return false;
      }),
    });

    return items.map(matchingRows);
  }
  static sortItems(items, asc, _index) {
    // sorts the items by the column key and the direction
    const getContentAtIndex = key => item => get(item.data[key], 'value');
    return orderBy(items, getContentAtIndex(_index), asc ? 'asc' : 'desc');
  }
  static getSortColumn(label, columns) {
    let sortColumn;
    columns.some(column => {
      if (!column._onChange) {
        sortColumn = column._index;
        return true;
      }
      return false;
    });
    // gets the key of the sorting column
    if (label !== undefined) {
      const column = find(columns, { label });
      sortColumn = get(column, '_index');
    }
    return sortColumn;
  }
  static getFilters(filters, _index, value) {
    const filter = find(filters, { _index });

    if (!filter) {
      // add the filter if does not exist
      return [...filters, { _index, value: value || '' }];
    }
    if (value !== undefined) {
      // change the value for an existing filter
      const index = filters.indexOf(filter);
      return [...filters.slice(0, index), { _index, value }, ...filters.slice(index + 1)];
    }
    if (filter.value === '') {
      // if the filter has 0 len string, remove it
      const index = filters.indexOf(filter);
      return [...filters.slice(0, index), ...filters.slice(index + 1)];
    }
    // there was no value but the filter exists, do not change anything
    return filters;
  }

  constructor(props) {
    super(props);

    this.onSortClick = this.onSortClick.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onFilterBlur = this.onFilterBlur.bind(this);
    this.onFilterClick = this.onFilterClick.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.onHeaderCheckboxChange = this.onHeaderCheckboxChange.bind(this);
    this.onChange = this.onChange.bind(this);

    if (this.props.onCheck) {
      this.onItemCheck = this.onItemCheck.bind(this);
    }

    this._columns = DataList.convertColumns(
      this.props.columns,
      undefined,
      this.props.onCheck ? this.onItemCheck : undefined,
    );

    let checkedItems;
    if (this.props.checked) {
      checkedItems = DataList.getCheckedItems(this.props.list, this.props.checked);
    }

    const sortAsc = this.props.sortAsc === true;
    const sortColumn = DataList.getSortColumn(this.props.sortColumn, this._columns);
    const items = DataList.toItems(
      this.props.list,
      this._columns,
      this.props.selected,
      checkedItems,
    );

    const sortedItems = DataList.sortItems(items, sortAsc, sortColumn);

    this.state = {
      items: sortedItems,
      sortAsc,
      sortColumn,
      filters: [],
    };
  }
  componentDidUpdate(prevProps) {
    const { list, columns, selected, checked, onCheck } = this.props;

    if (prevProps.columns !== columns) {
      this._columns = DataList.convertColumns(
        columns,
        this._columns,
        onCheck ? this.onItemCheck : undefined,
      );
    }
    if (prevProps.list !== list || prevProps.columns !== columns) {
      const { sortAsc, sortColumn, items } = this.state;

      let checkedItems;
      if (this.props.checked !== prevProps.checked) {
        checkedItems = DataList.getCheckedItems(list, checked);
      }
      const listItems = DataList.toItems(
        list,
        this._columns,
        selected,
        checkedItems,
        items,
        prevProps.list,
      );

      const filteredItems = DataList.filterItems(listItems, this._columns, this.state.filters);
      const sortedItems = DataList.sortItems(filteredItems, sortAsc, sortColumn);

      this.setState({ items: sortedItems });
    }
  }
  onSortClick(key) {
    const sortAsc = this.state.sortColumn === key ? !this.state.sortAsc : true;
    const sortColumn = key;

    const items = DataList.sortItems(this.state.items, sortAsc, sortColumn);

    this.setState({
      sortAsc,
      sortColumn,
      items,
    });
  }
  onFilterChange(_index, value) {
    const filters = DataList.getFilters(this.state.filters, _index, value);
    const items = DataList.filterItems(this.state.items, this._columns, filters);

    this.setState({
      items,
      filters,
    });
  }
  onFilterBlur(_index) {
    const filters = DataList.getFilters(this.state.filters, _index);
    this.setState({ filters });
  }
  onFilterClick(_index) {
    const filters = DataList.getFilters(this.state.filters, _index);
    this.setState({ filters });
  }

  onItemClick(id) {
    const { items } = this.state;
    const { onSelect, onUnselect } = this.props;
    const item = find(items, { _index: id });
    const eventHandler = item._selected ? onUnselect : onSelect;
    if (typeof eventHandler === 'function') {
      eventHandler(item._source);
    }
  }

  onItemCheck(id) {
    const idx = this.state.items.findIndex(c => c._index === id);
    this.setState(
      {
        items: [
          ...this.state.items.slice(0, idx),
          {
            ...this.state.items[idx],
            _checked: !this.state.items[idx]._checked,
          },
          ...this.state.items.slice(idx + 1),
        ],
      },
      this.onChange,
    );
  }

  onHeaderCheckboxChange(value) {
    this.setState(
      {
        items: this.state.items.map(item => ({ ...item, _checked: value })),
      },
      this.onChange,
    );
  }

  onChange() {
    const sourceCheckedItems = this.state.items
      .filter(item => item._checked === true)
      .map(item => item._source);

    this.props.onCheck(sourceCheckedItems);
  }

  render() {
    const { flex, isPending, noData, errorMsg, hasError } = this.props;
    const { items, sortAsc, sortColumn, filters } = this.state;
    const className = utils.composeClassNames([
      'mb-element',
      'element-datalist',
      flex && 'element-datalist--flexible',
    ]);

    const isAllChecked = items.every(DataList.isItemChecked);
    const isSomeChecked = items.some(DataList.isItemChecked);

    let content = null;
    if (isPending) {
      content = <Pending />;
    } else if (hasError) {
      content = <ErrorMessage message={errorMsg} />;
    } else if (items.length === 0 && filters.length === 0) {
      content = <NoData message={noData} />;
    } else {
      content = [
        <Header
          key="datalist-header"
          columns={this._columns}
          sortColumn={sortColumn}
          sortAsc={sortAsc}
          onSortClick={this.onSortClick}
          filters={filters}
          checked={isAllChecked}
          semiChecked={isSomeChecked}
          onCheckboxChange={this.onHeaderCheckboxChange}
          onFilterChange={this.onFilterChange}
          onFilterBlur={this.onFilterBlur}
          onFilterClick={this.onFilterClick}
        />,
        <Rows
          key="datalist-rows"
          items={items}
          columns={this._columns}
          onItemClick={this.onItemClick}
        />,
      ];
    }

    return <div className={className}>{content}</div>;
  }
}

DataList.defaultProps = {
  flex: true,
  columns: [],
  list: [],
  sortAsc: true,
  sortColumn: undefined,
  isPending: false,
  hasError: false,
  selected: undefined,
  checked: undefined,
  noData: 'No items',
  errorMsg: 'There was an error',
  onSelect: undefined,
  onUnselect: undefined,
  onCheck: undefined,
};

DataList.propTypes = {
  flex: PropTypes.bool,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      key: PropTypes.string,
      func: PropTypes.func,
      className: PropTypes.string,
      link: PropTypes.func,
      sortable: PropTypes.bool,
      searchable: PropTypes.bool,
    }),
  ),
  list: PropTypes.arrayOf(PropTypes.shape()),
  sortAsc: PropTypes.bool,
  sortColumn: PropTypes.string,
  isPending: PropTypes.bool,
  hasError: PropTypes.bool,
  selected: PropTypes.func,
  checked: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.shape())]),
  noData: PropTypes.string,
  errorMsg: PropTypes.string,
  onSelect: PropTypes.func,
  onUnselect: PropTypes.func,
  onCheck: PropTypes.func,
};

export default DataList;
