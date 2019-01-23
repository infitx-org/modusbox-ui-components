import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
import find from 'lodash/find';
import get from 'lodash/get';
import uuid from '../../utils/uuid';
import * as utils from '../../utils/common';

import Header from './Header';
import Rows from './Rows';
import Link from './Link';
import { NoData, Pending, ErrorMessage } from './Boxes';

class DataList extends PureComponent {
  static convertColumns(columns, prevColumns) {
    const mapIndexToColumns = prev => (column, i) => ({
      // get the _index key from the already existing columns if available
      // so that it does not change and worn't break sorting or filtering
      // because they use the column _index key to identify the column
      _index: get(prev,`[${i}]._index`) || uuid(),
      ...column,
    });
    return columns.map(mapIndexToColumns(prevColumns));
  }
  static toItems(list, columns, selected, prevItems) {
    // applies the column configuration to the list
    // so that child components will not need any transformation logic
    const reduceColumns = (item, rowIndex) => (prev, column) => {
      const { func, key, link, _index } = column;
      let value = get(item, key);
      if (typeof func === 'function') {
        value = func(value, item, rowIndex);
      }
      if (typeof link === 'function') {
        // eslint-disable-next-line
        value = <Link onClick={() => link(item[key], item)}>{value}</Link>;
      }
      return {
        ...prev,
        [_index]: value,
      };
    };

    const mapListRowToItem = prev => (item, rowIndex) => {
        return {
          _index: get(prev, `[${rowIndex}]._index`) || uuid(),
          _source: item,
          _selected: selected ? selected(item) : false,
          data: columns.reduce(reduceColumns(item, rowIndex), {}),
        };
    }

    return list.map(mapListRowToItem(prevItems));
  }

  static filterItems(items, columns, filters) {
    const filtersByKey = filters.filter(item => item.value !== '');

    const matchingRows = item =>
      filtersByKey.every(filter => {
        const { _index, value } = filter;
        let cell = item.data[_index];
        if (typeof cell === 'number') {
          cell = cell.toString();
        }
        if (typeof cell === 'string') {
          return cell.toLowerCase().includes(value.toLowerCase());
        }

        return false;
      });

    return items.filter(matchingRows);
  }
  static sortItems(items, asc, _index) {
    // sorts the items by the column key and the direction
    const getContentAtIndex = key => item => item.data[key];
    return orderBy(items, getContentAtIndex(_index), asc ? 'asc' : 'desc');
  }
  static getSortColumn(label, columns) {
    let sortColumn = columns[0]._index;
    // gets the key of the sorting column
    if (label !== undefined) {
      const column = find(columns, { label });
      sortColumn = get(column, '_index');
    }
    return sortColumn;
  }

  constructor(props) {
    super(props);

    this.onSortClick = this.onSortClick.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onFilterBlur = this.onFilterBlur.bind(this);
    this.onFilterClick = this.onFilterClick.bind(this);
    this.onItemClick = this.onItemClick.bind(this);

    const { list, columns, sortAsc, sortColumn, selected } = this.props;

    this._columns = DataList.convertColumns(columns);

    const items = DataList.toItems(list, this._columns, selected);
    const sortedItems = DataList.sortItems(items, sortAsc, sortColumn);

    this._items = items;
    
    this.state = {
      items: sortedItems,
      sortAsc: sortAsc === true,
      sortColumn: DataList.getSortColumn(sortColumn, this._columns),
      filters: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    const { list, columns } = nextProps;
    if (this.props.columns !== columns) {
      this._columns = DataList.convertColumns(columns, this._columns);
    }
    if (this.props.list !== list || this.props.columns !== columns) {
      const { selected, sortAsc, sortColumn } = this.props;
      
      const items = DataList.toItems(list, this._columns, selected, this._items);
      const filteredItems = DataList.filterItems(items, this._columns, this.state.filters);
      const sortedItems = DataList.sortItems(filteredItems, sortAsc, sortColumn);
      
      this._items = items;
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
    const filters = [...this.state.filters];
    const filter = find(filters, { _index });
    if (filter) {
      filter.value = value;
    } else {
      filters.push({ _index, value });
    }

    const items = DataList.filterItems(this._items, this._columns, filters);

    this.setState({
      items,
      filters,
    });
  }
  onFilterBlur(_index) {
    const { filters } = this.state;
    const filter = find(filters, { _index });
    if (filter.value === '') {
      const index = filters.indexOf(filter);
      this.setState({
        filters: [...filters.slice(0, index), ...filters.slice(index + 1)],
      });
    }
  }
  onFilterClick(_index) {
    const { filters } = this.state;
    const filter = find(filters, { _index });
    if (!filter) {
      this.setState({
        filters: [...this.state.filters, { _index, value: '' }],
      });
    }
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

  render() {
    const { flex, isPending, noData, errorMsg, hasError } = this.props;
    const { items, sortAsc, sortColumn, filters } = this.state;
    const className = utils.composeClassNames([
      'mb-element',
      'element-datalist',
      flex && 'element-datalist--flexible'
    ]);

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
  onSelect: undefined,
  onUnselect: undefined,
  selected: undefined,
  noData: 'No items',
  errorMsg: 'There was an error',
};

DataList.propTypes = {
  flex: PropTypes.bool,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      key: PropTypes.string,
      func: PropTypes.fund,
      className: PropTypes.string,
      link: PropTypes.fund,
      sortable: PropTypes.bool,
      searchable: PropTypes.bool,
    }),
  ),
  list: PropTypes.arrayOf(PropTypes.shape()),
  sortAsc: PropTypes.bool,
  sortColumn: PropTypes.string,
  isPending: PropTypes.bool,
  hasError: PropTypes.bool,
  onSelect: PropTypes.func,
  onUnselect: PropTypes.func,
  selected: PropTypes.func,
  noData: PropTypes.string,
  errorMsg: PropTypes.string,
};

export default DataList;
