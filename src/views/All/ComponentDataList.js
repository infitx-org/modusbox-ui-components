/* eslint no-console: "off" */
import React from 'react';

import Checkbox from '../../components/Checkbox';
import TextField from '../../components/TextField';
import DataList from '../../components/DataList';
import Icon from '../../components/Icon';

const columnStyle = {
  padding: '10px',
  margin: '5px 0px',
  border: '1px solid #ccc',
  display: 'flex',
  flex: '2 1 auto',
  flexDirection: 'column',
};

const rowStyle = {
  padding: '10px',
  margin: '5px 0px',
  border: '1px solid #ccc',
  display: 'flex',
  flex: '0 0 auto',
  flexDirection: 'row',
};

class ListManager extends React.Component {
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.togglePending = this.togglePending.bind(this);
    this.toggleError = this.toggleError.bind(this);
    this.changeNoDataLabel = this.changeNoDataLabel.bind(this);
    this.changeErrorMessage = this.changeErrorMessage.bind(this);
    this.state = {
      counter: 0,
      noDataLabel: 'MyStupidList',
      errorMessage: 'my default error message',
      pending: false,
      error: false,
    };
  }
  componentDidMount() {
    this.start();
  }
  componentWillUnmount() {
    clearInterval(this._interval);
  }
  start() {
    this._interval = setInterval(() => {
      this.setState({
        counter: this.state.counter + 1,
      });
    }, 1000000);
  }
  togglePending() {
    this.setState({
      pending: !this.state.pending,
    });
  }
  toggleError() {
    this.setState({
      error: !this.state.error,
    });
  }
  changeNoDataLabel(value) {
    this.setState({
      noDataLabel: value,
    });
  }
  changeErrorMessage(value) {
    this.setState({
      errorMessage: value,
    });
  }
  render() {
    return (
      <div style={columnStyle}>
        <div style={rowStyle}>
          <TextField
            placeholder="no data"
            value={this.state.noDataLabel}
            onChange={this.changeNoDataLabel}
          />
          <TextField
            placeholder="error message"
            value={this.state.errorMessage}
            onChange={this.changeErrorMessage}
          />
          <Checkbox checked={this.state.pending} onChange={this.togglePending} label="Pending" />
          <Checkbox checked={this.state.error} onChange={this.toggleError} label="Error" />
        </div>
        <List
          counter={this.state.counter}
          noDataLabel={this.state.noDataLabel}
          pending={this.state.pending}
          error={this.state.error}
        />
      </div>
    );
  }
}

const labels = ['a', 'b', 'c', 'd', 'e'];
const list = new Array(100).fill(0).map((row, rowIdx) =>
  labels.reduce((prev, curr, colIdx) => {
    // eslint-disable-next-line max-len
    const value = colIdx + rowIdx * labels.length;
    return {
      ...prev,
      [`${curr}`]: value,
    };
  }, {}));

const List = ({
  counter, noDataLabel, pending, error,
}) => {
  const columns = [
    {
      label: 'Double',
      key: 'a',
      func: x => x * 2,
    },
    {
      label: 'Square',
      key: 'b',
      func: x => x * counter,
    },
    {
      label: 'c',
      key: 'c',
      func: x => <span>{x}</span>,
    },
    {
      label: 'd',
      key: 'd',
      func: x => new Array(20).fill(x).join(''),
      sortable: false,
      link: console.log,
    },
    {
      label: 'e',
      key: 'e',
      func: () => <Icon name="close-small" size={20} />,
    },
  ];

  return (
    <DataList
      columns={columns}
      list={list}
      sortColumn="Square"
      sortAsc={false}
      noData={noDataLabel}
      isPending={pending}
      hasError={error}
    />
  );
};

const TestDataList = () => <ListManager />;
export default TestDataList;
