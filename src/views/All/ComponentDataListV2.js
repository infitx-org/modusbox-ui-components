/* eslint no-console: "off" */
import React from 'react';

import DataList from '../../components/DataListV2';
import Icon from '../../components/Icon';


class Rand extends React.Component {
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.state = {
      counter: 0,
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
    }, 1000);
  }
  render() {
    return (
      <div>
        <List />
      </div>
    );
  }
}

const List = () => {
  const rand = Math.random();
  const labels = ['a', 'b', 'c', 'd', 'e'];
  const list = new Array(100).fill(0).map((row, rowIdx) => labels.reduce((prev, curr, colIdx) => {
    // eslint-disable-next-line max-len
    const value = colIdx + rowIdx * labels.length;
    return {
      ...prev,
      [`${curr}`]: value,
    };
  }, {}));

  const columns = [
    {
      label: 'Double',
      key: 'a',
      func: x => x * 2,
    },
    {
      label: 'Square',
      key: 'b',
      func: x => x * rand,
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
    },
    {
      label: 'e',
      key: 'e',
      func: () => <Icon name="close-small" size={20} />,
    },
  ];


  return (
    <div
      style={{
        padding: '10px',
        margin: '5px 0px',
        border: '1px solid #ccc',
        display: 'flex',
        flex: '2 1 auto',
      }}
    >
      <DataList
        columns={columns}
        list={list}
        sortColumn="Square"
        sortAsc={false}
      />
    </div>
  );
};

const TestDataList = () => (
  <Rand />
);
export default TestDataList;
