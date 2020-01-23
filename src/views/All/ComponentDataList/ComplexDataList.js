import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import DataList from '../../../components/DataList';
import ScrollBox from '../../../components/ScrollBox';
import TextField from '../../../components/TextField';

import React, { PureComponent } from 'react';
import { list, containerStyle, rowStyle, getColumns } from './funcs';

class ComplexDataList extends PureComponent {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleColumn = this.toggleColumn.bind(this);
    this.increment = this.increment.bind(this);
    this.changeNoDataLabel = this.changeNoDataLabel.bind(this);
    this.changeErrorMessage = this.changeErrorMessage.bind(this);
    this.state = {
      counter: 1,
      noDataLabel: 'MyStupidList',
      errorMsg: 'my default error message',
      pending: false,
      error: false,
      flex: false,
      columns: {
        col1: false,
        col2: false,
        col3: false,
        col4: false,
        linkColumn: false,
        textColumn: false,
        transformColumn: false,
        spanColumn: false,
        nestedColumn: false,
        linkFuncColumn: false,
        iconColumn: false,
        componentColumn: false,
      },
    };
  }
  increment() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }
  toggle(field, value) {
    this.setState({
      [field]: value,
    });
  }
  toggleColumn(column) {
    this.setState({
      columns: {
        ...this.state.columns,
        [column]: !this.state.columns[column],
      },
    });
  }
  changeNoDataLabel(value) {
    this.setState({
      noDataLabel: value,
    });
  }
  changeErrorMessage(value) {
    this.setState({
      errorMsg: value,
    });
  }
  render() {
    const toggle = field => value => this.toggle(field, value);
    const toggleColumn = column => () => this.toggleColumn(column);
    const columns = Object.entries(this.state.columns).map(([key, value]) => ({
      name: key,
      label: key,
      checked: value,
    }));

    const columnsToRender = getColumns({
      valueModifier: this.state.counter,
      ...this.state.columns,
    });

    console.log(this.state.columns);
    return (
      <div style={containerStyle}>
        <div style={rowStyle}>
          <div className="m5">
            <TextField
              size="s"
              placeholder="no data"
              value={this.state.noDataLabel}
              onChange={this.changeNoDataLabel}
            />
          </div>
          <div className="m5">
            <TextField
              size="s"
              placeholder="error message"
              value={this.state.errorMsg}
              onChange={this.changeErrorMessage}
            />
          </div>
          <div className="m5">
            <Checkbox checked={this.state.pending} onChange={toggle('pending')} label="Pending" />
          </div>
          <div className="m5">
            <Checkbox checked={this.state.error} onChange={toggle('error')} label="Error" />
          </div>
          <div className="m5">
            <Checkbox checked={this.state.flex} onChange={toggle('flex')} label="Flex" />
          </div>
          <div className="m5">
            <Button size="s" label="increment" onClick={this.increment} />
          </div>
        </div>
        <div style={rowStyle}>
          {columns.map(col => (
            <div className="m5">
              <Checkbox
                checked={col.checked}
                onChange={toggleColumn(col.label)}
                label={col.label}
              />
            </div>
          ))}
        </div>
        <List
          columns={columnsToRender}
          noDataLabel={this.state.noDataLabel}
          errorMsg={this.state.errorMsg}
          pending={this.state.pending}
          error={this.state.error}
          flex={this.state.flex}
        />
      </div>
    );
  }
}

const List = ({ columns, noDataLabel, errorMsg, pending, error, flex }) => {
  const datalist = (
    <DataList
      flex={flex}
      columns={columns}
      list={list}
      sortColumn="Double"
      sortAsc={false}
      isPending={pending}
      hasError={error}
      checkable={item => item.a !== 0}
      selected={list[0]}
      noData={noDataLabel}
      errorMsg={errorMsg}
    />
  );
  if (!flex) {
    return <ScrollBox>{datalist}</ScrollBox>;
  }
  return datalist;
};

export default ComplexDataList;
