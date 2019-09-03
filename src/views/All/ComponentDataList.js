/* eslint no-console: "off" */
import React, { PureComponent } from 'react';

import Checkbox from '../../components/Checkbox';
import TextField from '../../components/TextField';
import DataList from '../../components/DataList';
import Button from '../../components/Button';
import ScrollBox from '../../components/ScrollBox';
import Icon from '../../components/Icon';
import Modal from '../../components/Modal';
import { Tab, Tabs, TabList, TabPanel, TabPanels } from '../../components/Tabs';

const containerStyle = {
  padding: '5px',
  display: 'flex',
  flex: '2 1 auto',
  flexDirection: 'column',
  minHeight: '0',
};

const rowStyle = {
  padding: '2px',
  margin: '5px 0px',
  display: 'flex',
  flex: '0 0 auto',
  flexDirection: 'row',
  alignItems: 'center',
  background: '#F0F9F9',
};

class ListManager extends React.Component {
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

const list = new Array(20).fill(0).map(buildRow);

const getColumns = (counter = 1) => [
  {
    label: 'Double',
    key: 'a',
    func: x => x * 2 * counter,
    className: 'col-100px',
  },
  {
    label: 'Triple',
    key: 'a',
    func: x => x * 3 * counter,
    className: 'col-100px',
  },
  {
    label: 'Zero Zero Zero Zero',
    key: 'a',
    func: () => new Array(25).fill(counter).join(' -  '),
  },
  {
    label: 'Square',
    key: 'b',
    func: x => x * x * counter,
  },
  {
    label: 'c',
    key: 'c.test.value',
  },
  {
    label: 'd',
    key: 'd',
    func: x => new Array(15).fill(x).join(''),
    link: console.log,
  },
  {
    label: '',
    key: 'e',
    func: () => <Icon name="close-small" size={16} fill="#999" />,
    className: 'col-40px',
  },
  {
    label: '',
    key: 'e',
    func: () => <Checkbox checked={counter % 2 !== 0} />,
    className: 'col-40px',
  },

  {
    label: 'Counter',
    key: 'e',
    func: () => counter,
    className: 'col-40px',
  },
];

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
      selected={o => o.a === 10}
      noData={noDataLabel}
      errorMsg={errorMsg}
    />
  );
  if (!flex) {
    return <ScrollBox>{datalist}</ScrollBox>;
  }
  return datalist;
};

class ModalList extends PureComponent {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.increment = this.increment.bind(this);
    this.rnd = this.rnd.bind(this);
    this.state = { visible: false, counter: 0, rnd: 5 };
    this.timer = setInterval(this.increment, 3000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  increment() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }
  rnd() {
    this.setState({
      rnd: this.state.rnd + 1,
    });
  }
  toggle() {
    this.setState({
      visible: !this.state.visible,
    });
  }
  render() {
    return (
      <div>
        <Button label="open" onClick={this.toggle} />
        {this.state.visible && (
          <Modal allowClose onClose={this.toggle}>
            <Button label={this.state.rnd} onClick={this.rnd} />
            <DataList columns={getColumns(this.state.counter)} list={list} onCheck={console.log} />
          </Modal>
        )}
      </div>
    );
  }
}

const TestDataList = () => (
  <Tabs flex>
    <TabList style={{ width: '500px' }}>
      <Tab>Multi</Tab>
      <Tab>Simple</Tab>
      <Tab>Modal</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <ListManager />
      </TabPanel>
      <TabPanel>
        <div style={containerStyle}>
          <DataList columns={getColumns(0)} list={list} sortColumn="Double" sortAsc={false} />
        </div>
      </TabPanel>
      <TabPanel>
        <ModalList />
      </TabPanel>
    </TabPanels>
  </Tabs>
);
export default TestDataList;
