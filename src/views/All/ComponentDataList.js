/* eslint no-console: "off" */
import React from 'react';

import Checkbox from '../../components/Checkbox';
import TextField from '../../components/TextField';
import DataList from '../../components/DataList';
import Button from '../../components/Button';
import ScrollBox from '../../components/ScrollBox';
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
    this.toggle = this.toggle.bind(this);
    this.increment = this.increment.bind(this);
    this.changeNoDataLabel = this.changeNoDataLabel.bind(this);
    this.changeErrorMessage = this.changeErrorMessage.bind(this);
    this.state = {
      counter: 0,
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
      [field]: value
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
      <div style={columnStyle}>
        <div style={rowStyle}>
          <TextField
            placeholder="no data"
            value={this.state.noDataLabel}
            onChange={this.changeNoDataLabel}
          />
          <TextField
            placeholder="error message"
            value={this.state.errorMsg}
            onChange={this.changeErrorMessage}
          />
          <Checkbox checked={this.state.pending} onChange={toggle('pending')} label="Pending" />
          <Checkbox checked={this.state.error} onChange={toggle('error')} label="Error" />
          <Checkbox checked={this.state.flex} onChange={toggle('flex')} label="Flex" />
          <Button label="increment" onClick={this.increment} />
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

const labels = ['a', 'b', 'c', 'd', 'e'];
const generate = {
  a: value => value,
  b: value => value,
  c: value => ({ test: { value } }),
  d: value => value,
  e: value => value,
};
let idx = 0;
const buildRow = () =>
  labels.reduce(
    (prev, key) => ({
      ...prev,
      // eslint-disable-next-line
      [key]: generate[key](idx++),
    }),
    {},
  );

const list = new Array(100).fill(0).map(buildRow);

const List = ({ counter, noDataLabel, errorMsg, pending, error, flex }) => {
  const columns = [
    {
      label: 'Double',
      key: 'a',
      func: x => x * 2,
      className: 'col-100px',
    },
    {
      label: 'Triple',
      key: 'a',
      func: x => x * 3,
      className: 'col-100px',
    },
    {
      label: 'Zero Zero Zero Zero',
      key: 'a',
      func: () => 0,
    },
    {
      label: 'Square',
      key: 'b',
      func: x => x * x,
    },
    {
      label: 'c',
      key: 'c.test.value',
    },
    {
      label: 'd',
      key: 'd',
      func: x => new Array(15).fill(x).join(''),
      sortable: false,
      searchable: false,
      link: console.log,
    },
    {
      label: '',
      key: 'e',
      func: () => <Icon name="close-small" size={16} fill="#999" />,
      className: 'col-40px',
    },
    {
      label: 'Counter',
      key: 'e',
      func: () => counter,
      className: 'col-40px',
    },
  ];

  const datalist = (
    <DataList
      flex={flex}
      columns={columns}
      list={list}
      sortColumn="Square"
      sortAsc={false}
      isPending={pending}
      hasError={error}
      onSelect={console.log}
      onUnselect={console.log}
      selected={o => o.a === 10}
      noData={noDataLabel}
      errorMsg={errorMsg}
    />
  )
  if (!flex) {
    return <ScrollBox>{datalist}</ScrollBox>;
  }
  return datalist;
};


const TestDataList = () => <ListManager />;
export default TestDataList;
