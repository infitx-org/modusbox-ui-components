import React, { PureComponent } from 'react';
import orderBy from 'lodash/orderBy';
import find from 'lodash/find';

import Spinner from '../Spinner';
import ScrollBox from '../ScrollBox';

import Header from './Header';
import RowsContent from './RowsContent';

import './DataListV2.scss';

class DataList extends PureComponent {
  static convertItems(items, columns) {
    // applies the column configuration to the items
    // so that child components will not need any transformation logic
    return items.map((item, itemIndex) => columns.reduce((prev, column) => {
      const { func, key } = column;
      let value = item[key];
      if (typeof func === 'function') {
        value = func(value, item, itemIndex);
      }
      return {
        ...prev,
        [key]: value,
      };
    }, {}));
  }

  static filterItems(items, filters) {
    return items;
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

    this.onSortClick = this.onSortClick.bind(this);
    this.transformList = this.transformList.bind(this);

    const {
      columns, sortAsc, sortColumn,
    } = this.props;

    const sortKey = DataList.getSortKey(sortColumn, columns);

    this.state = {
      sortAsc: sortAsc === true,
      sortKey,
      items: [],
    };
  }
  componentWillMount() {
    this._list = this.props.list;
    this._columns = this.props.columns;
    this.transformList({ applyColumns: true, sort: true });
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps, nextState) {
    const { list, columns } = nextProps;
    this._list = list;
    this._columns = columns;

    if (this.props.list !== list || this.props.columns !== columns) {
      this.transformList({ applyColumns: true, sort: true });
    }
  }
  onSortClick(key) {
    this.setState({
      sortAsc: this.state.sortKey === key ? !this.state.sortAsc : false,
      sortKey: key,
    });
    this.transformList({ sort: true });
  }

  transformList(cfg) {
    if (cfg.applyColumns === true) {
      this._list = DataList.convertItems(this._list, this._columns);
    }
    if (cfg.filter === true) {
      const { filter } = this.state;
      this._list = DataList.filterItems(this._list, filters);
    }
    if (cfg.sort === true) {
      const { sortAsc, sortKey } = this.state;
      console.log(sortAsc, sortKey);
      this._list = DataList.sortItems(this._list, sortAsc, sortKey);
    }
    this.setState({
      items: this._list,
    });
  }

  render() {
    const { isPending, columns } = this.props;
    const { items, sortAsc, sortKey } = this.state;
    if (isPending) {
      return <Spinner size={20} />;
    }
    return (
      <div className="mb-element element-datalistV2">
        <Header
          columns={columns}
          sortKey={sortKey}
          sortAsc={sortAsc}
          onSortClick={this.onSortClick}
        />
        <ScrollBox>
          <RowsContent items={items} columns={columns} />
        </ScrollBox>
      </div>


    );
  }
}

export default DataList;
