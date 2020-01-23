import React, { PureComponent } from 'react';
import { list, getColumns } from './funcs';
import Button from '../../../components/Button';
import DataList from '../../../components/DataList';
import Modal from '../../../components/Modal';

class ModalDataList extends PureComponent {
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
    const  { visible, counter } = this.state;
    const columns = getColumns({
      valueModifier: counter,
      textColumn: true,
      transformColumn: true,
      spanColumn: true,
      nestedColumn: true,
    });
    return (
      <div>
        <Button label="open" onClick={this.toggle} />
        {visible && (
          <Modal allowClose onClose={this.toggle}>
            <Button label={this.state.rnd} onClick={this.rnd} />
            <DataList columns={columns} list={list} sortColumn="Double" />
          </Modal>
        )}
      </div>
    );
  }
}

export default ModalDataList;