import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import DataList from '../../../components/DataList';
import ScrollBox from '../../../components/ScrollBox';
import TextField from '../../../components/TextField';

import React, { PureComponent } from 'react';
import { list, settingsStyle, containerStyle, rowStyle, getColumns } from './funcs';

class ComplexDataList extends PureComponent {
  constructor(props) {
    super(props);
    this.toggleColumn = this.toggleColumn.bind(this);
    this.toggleModifier = this.toggleModifier.bind(this);
    this.changeMessage = this.changeMessage.bind(this);
    this.changeTransformer = this.changeTransformer.bind(this);

    this.increment = this.increment.bind(this);
    this.state = {
      transformers: {
        counter: 1,
        multiplier: 1,
        randomizer: 1,
      },
      columns: {
        col1: true,
        col2: true,
        col3: true,
        col4: true,
        link: false,
        text: false,
        transform: false,
        span: false,
        nested: false,
        linkFunc: false,
        icon: false,
        component: false,
      },
      modifiers: {
        isFlex: false,
        inModal: false,
        isPending: false,
        hasError: false,
      },
      messages: {
        empty: 'nothing to show!',
        error: 'custom error msg',
      },
    };
  }
  increment() {
    this.setState({
      counter: this.state.counter + 1,
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
  toggleModifier(modifier) {
    this.setState({
      modifiers: {
        ...this.state.modifiers,
        [modifier]: !this.state.modifiers[modifier],
      },
    });
  }
  changeMessage(message, value) {
    this.setState({
      messages: {
        ...this.state.messages,
        [message]: value,
      },
    });
  }
  changeTransformer(transformer) {
    let newValue;
    if (transformer === 'counter') {
      newValue = this.state.transformers.counter + 1;
    } else if (transformer === 'multiplier') {
      newValue = this.state.transformers.multiplier + 1;
    } else if (transformer === 'randomizer') {
      newValue = Math.floor(Math.random() * 10);
    } else {
      return;
    }

    this.setState({
      transformers: {
        ...this.state.transformers,
        [transformer]: newValue,
      },
    });
  }
  render() {
    const { transformers, modifiers, messages, columns } = this.state;
    const toggleColumn = column => () => this.toggleColumn(column);
    const toggleModifier = modifier => () => this.toggleModifier(modifier);
    const changeMessage = message => value => this.changeMessage(message, value);
    const changeTransformer = transformer => value => this.changeTransformer(transformer, value);

    const getItems = (source, type) =>
      Object.entries(source).map(([label, value]) => ({
        type,
        label,
        value,
      }));

    const columnItems = getItems(columns, 'checkbox');
    const modifierItems = getItems(modifiers, 'checkbox');
    const messageItems = getItems(messages, 'textfield');
    const transformerItems = getItems(transformers, 'button');

    const columnsToRender = getColumns({
      valueModifier: this.state.counter,
      ...columns,
    });

    const datalist = (
      <DataList
        columns={columnsToRender}
        noDataLabel={messages.noDataLabel}
        errorMsg={messages.errorMsg}
        hasError={modifiers.hasError}
        flex={modifiers.isFlex}
        isPending={modifiers.isPending}
        list={list}
      />
    );

    return (
      <div style={containerStyle}>

        <Settings title="Columns" items={columnItems} onChange={toggleColumn} />
        <Settings title="Modifiers" items={modifierItems} onChange={toggleModifier} />
        <Settings title="Messages" items={messageItems} onChange={changeMessage} />
        <Settings title="Transformer" items={transformerItems} onChange={changeTransformer} />

        {modifiers.isFlex ? datalist : <ScrollBox>{datalist}</ScrollBox>}
      </div>
    );
  }
}

const Settings = ({ title, items, onChange }) => (
  <div style={settingsStyle}>
    <div style={rowStyle}>
      <div>
        <b>{title}</b>
      </div>
      {items.map(item => (
        <div className="m5" key={item.label}>
          <Setting onChange={onChange} item={item} />
        </div>
      ))}
    </div>
  </div>
);

const Setting = ({ item, onChange }) => {
  if (item.type === 'checkbox') {
    return <Checkbox checked={item.value} onChange={onChange(item.label)} label={item.label} />;
  } else if (item.type === 'textfield') {
    return (
      <TextField
        size="s"
        placeholder={item.label}
        value={item.value}
        onChange={onChange(item.label)}
      />
    );
  } else if (item.type === 'button') {
    return (
      <Button
        style={{ width: '100px' }}
        size="s"
        label={`${item.label}: ${item.value}`}
        onClick={onChange(item.label)}
      />
    );
  }
  return null;
};


export default ComplexDataList;
