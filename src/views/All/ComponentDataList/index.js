import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import DataList from '../../../components/DataList';
import ScrollBox from '../../../components/ScrollBox';
import TextField from '../../../components/TextField';
import Modal from '../../../components/Modal';


import React, { PureComponent } from 'react';
import { list, settingsStyle, containerStyle, rowStyle, getColumns, buildRow } from './funcs';

const ACTIONS = {
  ITEM_ADD: 'Add Item',
  ITEM_REMOVE: 'Remove Item',
  ITEMS_CLEAR: 'Clear Items',
  ITEMS_RESET: 'Reset Items',
  VAR_BUMP: 'Increase Counter',
  VAR_RND: 'Randomize Counter',
};







class DataListWithSettings extends PureComponent {
  constructor(props) {
    super(props);

    this.onCheck = this.onCheck.bind(this);
    this.onSelect = this.onSelect.bind(this);

    this.toggleColumn = this.toggleColumn.bind(this);
    this.toggleModifier = this.toggleModifier.bind(this);
    this.changeMessage = this.changeMessage.bind(this);
    this.updateItems = this.updateItems.bind(this);

    this.state = {
      items: list,
      checked:[],
      selected: undefined,
      transformers: {
        counter: 1,
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
        canCheck: false,
        canSelect: false,
      },
      messages: {
        empty: 'nothing to show!',
        error: 'custom error msg',
      },
    };
  }
  onCheck(checked) {
    this.setState({
      checked,
    });
  }
  onSelect(selected) {
    this.setState({
      selected,
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
  updateItems(action) {
    let newItems = [...this.state.items];
    let newTransformers = { ...this.state.transformers };
    switch(action) {
      case ACTIONS.ITEM_ADD:
        newItems.push(buildRow());
        break;
      case ACTIONS.ITEM_REMOVE:
        newItems.splice(0, 1);
        break;
      case ACTIONS.ITEMS_RESET:
        newItems = list;
        break;
      case ACTIONS.ITEMS_CLEAR:
        newItems = [];
        break;
      case ACTIONS.VAR_RND:
        newTransformers.counter = Math.floor(Math.random() * 10);
        break;
      case ACTIONS.VAR_BUMP:
        newTransformers.counter = newTransformers.counter + 1;
        break;
      default:
        break;
    }
    this.setState({ items: newItems, transformers: newTransformers });
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
    const dataUpdateSettings = Object.values(ACTIONS).map(label => ({ label, type: 'button' }));

    const columnsToRender = getColumns({
      valueModifier: transformers.counter,
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
        onSelect={modifiers.canSelect ? this.onSelect : undefined}
        selected={modifiers.canSelect ? this.state.selected : undefined}
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
