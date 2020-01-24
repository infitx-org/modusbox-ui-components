import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import DataList from '../../../components/DataList';
import ScrollBox from '../../../components/ScrollBox';
import TextField from '../../../components/TextField';
import Modal from '../../../components/Modal';


import React, { PureComponent } from 'react';
import { list, settingsStyle, containerStyle, rowStyle, getColumns, buildRow } from './funcs';

class DataListWithSettings extends PureComponent {
  constructor(props) {
    super(props);

    this.onCheck = this.onCheck.bind(this);
    this.toggleColumn = this.toggleColumn.bind(this);
    this.toggleModifier = this.toggleModifier.bind(this);
    this.changeMessage = this.changeMessage.bind(this);
    this.changeTransformer = this.changeTransformer.bind(this);
    this.updateItems = this.updateItems.bind(this);

    this.state = {
      items: list,
      checked:[],
      transformers: {
        counter: 1,
        multiplier: 1,
        randomizer: 1,
        buildRow: undefined,
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
        canCheck: false,
      },
      messages: {
        empty: 'nothing to show!',
        error: 'custom error msg',
      },
    };
  }
  onCheck(items) {
    this.setState({
      checked: items,
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
    } else if (transformer === 'buildRow') {
      this.setState({
        items: [...this.state.items, buildRow()],
      });
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
  updateItems(updater) {
    let newItems = [...this.state.items];
    if (updater === 'Add Item') {
      newItems.push(buildRow());
    } else if (updater === 'Remove Item') {
      newItems.splice(0, 1);
    } else if (updater === 'Reset Items') {
      newItems = list;
    } else if (updater === 'Clear Items') {
      newItems = [];
    }
    this.setState({ items: newItems });
  }
  increment() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }
  render() {
    const { transformers, modifiers, messages, columns, items } = this.state;

    const toggleColumn = column => () => this.toggleColumn(column);
    const toggleModifier = modifier => () => this.toggleModifier(modifier);
    const changeMessage = message => value => this.changeMessage(message, value);
    const changeTransformer = transformer => value => this.changeTransformer(transformer, value);
    const updateItems = updater => () => this.updateItems(updater);

    const mapItemsFromSource = (source, type) =>
      Object.entries(source).map(([label, value]) => ({
        type,
        label,
        value,
      }));

    const columnSettings = mapItemsFromSource(columns, 'checkbox');
    const modifierSettings = mapItemsFromSource(modifiers, 'checkbox');
    const messageSettings = mapItemsFromSource(messages, 'textfield');
    const transformerSettings = mapItemsFromSource(transformers, 'button');
    const dataUpdateSettings = ['Add Item', 'Remove Item', 'Clear Items', 'Reset Items'].map(
      label => ({ label, type: 'button' }),
    );

    const columnsToRender = getColumns({
      valueModifier: this.state.counter,
      ...columns,
    });

    const datalist = (
      <DataList
        columns={columnsToRender}
        noData={messages.empty}
        errorMsg={messages.error}
        hasError={modifiers.hasError}
        flex={modifiers.isFlex}
        isPending={modifiers.isPending}
        onCheck={modifiers.canCheck ? this.onCheck : undefined}
        checked={modifiers.canCheck ? this.state.checked : undefined}
        list={items}
      />
    );

    let content = modifiers.isFlex ? datalist : <ScrollBox>{datalist}</ScrollBox>;
    if (modifiers.inModal) {
      content = <Modal allowClose onClose={toggleModifier('inModal')}>{content}</Modal>
    }

    return (
      <div style={{ ...containerStyle, maxHeight: modifiers.isFlex ? '100%' : undefined }}>
        <Settings title="Columns" items={columnSettings} onChange={toggleColumn} />
        <Settings title="Modifiers" items={modifierSettings} onChange={toggleModifier} />
        <Settings title="Messages" items={messageSettings} onChange={changeMessage} />
        <Settings title="Transformer" items={transformerSettings} onChange={changeTransformer} />
        <Settings title="Data update" items={dataUpdateSettings} onChange={updateItems} />

        {content}
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
        label={item.label}
        onClick={onChange(item.label)}
      />
    );
  }
  return null;
};

export default DataListWithSettings;
