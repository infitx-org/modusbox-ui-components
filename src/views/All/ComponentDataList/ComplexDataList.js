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
        <List
          counter={this.state.counter}
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

const List = ({ counter, noDataLabel, errorMsg, pending, error, flex }) => {
  const columns = getColumns(counter);
  const datalist = (
    <DataList
      flex={flex}
      columns={columns}
      list={list}
      sortColumn="Double"
      sortAsc={false}
      isPending={pending}
      hasError={error}
      onSelect={console.log}
      onUnselect={console.log}
      onCheck={data => console.log(JSON.stringify(data))}
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