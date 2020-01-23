import React from 'react';
import { list, buildRow, containerStyle, rowStyle, getColumns } from './funcs';
import Button from '../../../components/Button';
import DataList from '../../../components/DataList';

class CheckableDataList extends React.Component {
  constructor(props) {
    super(props);
    this.onCheck = this.onCheck.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onAddNewItem = this.onAddNewItem.bind(this);
    this.state = {
      items: list,
      checked: [],
    };
  }
  onCheck(items) {
    this.setState({
      checked: items,
    });
  }
  onClear() {
    this.setState({
      checked: [],
    });
  }
  onAddNewItem() {
    this.setState({
      items: [...this.state.items, buildRow()],
    });
  }
  render() {
    return (
      <div style={containerStyle}>
        <div style={rowStyle}>
          <Button size="m" label="clear checked" onClick={this.onClear} />
          <Button size="m" label="add new items" onClick={this.onAddNewItem} />
        </div>
        <DataList
          columns={getColumns({ valueModifier: 0 })}
          list={this.state.items}
          onCheck={this.onCheck}
          checked={this.state.checked}
        />
      </div>
    );
  }
}

export default CheckableDataList;