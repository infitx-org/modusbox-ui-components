import React from 'react';
import { list, buildRow, containerStyle, getColumns } from './funcs';
import DataList from '../../../components/DataList';

class TestList2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: list,
    };
  }
  
  onAddNewItem() {
    this.setState({
      items: [...this.state.items, buildRow()],
    });
  }
  render() {
    return (
      <div style={containerStyle}>
        <DataList
          columns={getColumns(0)}
          list={this.state.items}
        />
      </div>
    );
  }
}

export default TestList2;