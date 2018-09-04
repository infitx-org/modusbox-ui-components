import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
import find from 'lodash/find';
import uuid from '../../utils/uuid';

import Header from './Header';
import Rows from './Rows';
import Link from './Link';
import { NoData, Pending, ErrorMessage } from './Boxes';

class DataList extends PureComponent {
  static convertColumns(columns) {
    const mapColumns = column => ({
      __index: uuid(),
      ...column,
    });
    return columns.map(mapColumns);
  }
  static convertItems(items, columns, selected) {
    // applies the column configuration to the items
    // so that child components will not need any transformation logic
    const reduceColumns = (item, rowIndex) => (prev, column) => {
      const { func, key, link } = column;
      let value = item[key];
      if (typeof func === 'function') {
        value = func(value, item, rowIndex);
      }
      if (typeof link === 'function') {
        // eslint-disable-next-line
        value = <Link onClick={() => link(item[key], item)}>{value}</Link>;
      }
      return {
        ...prev,
        [key]: value,
      };
    };

    const mapItems = (item, rowIndex) => ({
      __index: uuid(),
      __source: item,
      __selected: selected(item),
      ...columns.reduce(reduceColumns(item, rowIndex), {}),
    });

    return items.map(mapItems);
  }
  static getLabelKey(columns, label) {
    const column = find(columns, { label });
    if (column) {
      return column.key;
    }
    return undefined;
  }

  static filterItems(items, columns, filters) {
    const filtersByKey = filters
      .map(filter => ({
        value: filter.value,
        key: DataList.getLabelKey(columns, filter.label),
      }))
      .filter(filter => filter.value !== '');

    const matchingRows = item =>
      filtersByKey.every((filter) => {
        const { key, value } = filter;
        let cell = item[key];
        if (typeof cell === 'number') {
          cell = cell.toString();
        }
        if (typeof cell === 'string') {
          return cell.includes(value);
        }
        return false;
      });

    return items.filter(matchingRows);
  }
  static sortItems(items, asc, key) {
    // sorts the items by the column key and the direction
    return orderBy(items, key, asc ? 'asc' : 'desc');
  }
  static getSortKey(label, columns) {
    let sortKey = columns[0].key;
    // gets the key of the sorting column
    if (label !== undefined) {
      const column = find(columns, { label });
      sortKey = column && column.key;
    }
    return sortKey;
  }

  constructor(props) {
    super(props);

    this.transformList = this.transformList.bind(this);
    this.onSortClick = this.onSortClick.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onFilterBlur = this.onFilterBlur.bind(this);
    this.onFilterClick = this.onFilterClick.bind(this);
    this.onItemClick = this.onItemClick.bind(this);

    const { columns, sortAsc, sortColumn } = this.props;

    const sortKey = DataList.getSortKey(sortColumn, columns);

    this.state = {
      sortAsc: sortAsc === true,
      sortKey,
      items: [],
      filters: [],
    };
  }
  componentWillMount() {
    this._list = this.props.list;
    this._columns = DataList.convertColumns(this.props.columns);
    this.transformList({ applyColumns: true, sort: true });
  }
  componentWillReceiveProps(nextProps) {
    const { list, columns } = nextProps;
    this._list = list;
    this._columns = DataList.convertColumns(columns);
    if (this.props.list !== list || this.props.columns !== columns) {
      this.transformList({ applyColumns: true, sort: true });
    }
  }
  onSortClick(key) {
    this.setState(
      {
        sortAsc: this.state.sortKey === key ? !this.state.sortAsc : true,
        sortKey: key,
      },
      () => {
        this.transformList({ sort: true });
      },
    );
  }
  onFilterChange(label, value) {
    const filters = [...this.state.filters];
    const filter = find(filters, { label });
    if (filter) {
      filter.value = value;
    } else {
      filters.push({ label, value });
    }

    const items = DataList.filterItems(this._list, this._columns, filters);

    this.setState({
      items,
      filters,
    });
  }
  onFilterBlur(label) {
    const { filters } = this.state;
    const filter = find(filters, { label });
    if (filter.value === '') {
      const index = filters.indexOf(filter);
      this.setState({
        filters: [...filters.slice(0, index), ...filters.slice(index + 1)],
      });
    }
  }
  onFilterClick(label) {
    const { filters } = this.state;
    const filter = find(filters, { label });
    if (!filter) {
      this.setState({
        filters: [...this.state.filters, { label, value: '' }],
      });
    }
  }

  onItemClick(__index) {
    const { items } = this.state;
    const { onSelect, onUnselect } = this.props;
    const item = find(items, { __index });
    const eventHandler = item.__selected ? onUnselect : onSelect;
    if (typeof eventHandler === 'function') {
      eventHandler(item.__source);
    }
  }

  transformList(cfg) {
    if (cfg.applyColumns === true) {
      this._list = DataList.convertItems(this._list, this._columns, this.props.selected);
    }
    if (cfg.sort === true) {
      const { sortAsc, sortKey } = this.state;
      this._list = DataList.sortItems(this._list, sortAsc, sortKey);
    }
    this.setState({
      items: this._list,
    });
  }

  render() {
    const {
      columns, isPending, noData, hasError,
    } = this.props;
    const {
      items, sortAsc, sortKey, filters,
    } = this.state;

    let content = null;
    if (isPending) {
      content = <Pending />;
    } else if (hasError) {
      content = <ErrorMessage />;
    } else if (items.length === 0 && filters.length === 0) {
      content = <NoData label={noData} />;
    } else {
      content = [
        <Header
          key="datalist-header"
          columns={this._columns}
          sortKey={sortKey}
          sortAsc={sortAsc}
          onSortClick={this.onSortClick}
          filters={filters}
          onFilterChange={this.onFilterChange}
          onFilterBlur={this.onFilterBlur}
          onFilterClick={this.onFilterClick}
        />,
        <Rows key="datalist-rows" items={items} columns={columns} onItemClick={this.onItemClick} />,
      ];
    }

    return <div className="mb-element element-datalist">{content}</div>;
  }
}

DataList.defaultProps = {
  sortAsc: true,
};
DataList.propTypes = {
  sortAsc: PropTypes.bool,
};

export default DataList;
