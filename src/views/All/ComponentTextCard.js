/* eslint no-console: "off" */
import React from 'react';

import FormInput from '../../components/FormInputs/FormInput';
import Modal from '../../components/Modal';
import TextField from '../../components/TextField';
import { createValidation, validate, vd } from '../../reduxValidation';

const options = [
  { type: 'path', label: 'ONE', value: 'the first path' },
  { type: 'path', label: 'TWO', value: 'the second path' },
  { type: 'path', label: 'THREE', value: 'last path' },
  { type: 'port', label: 'HTTP', value: '80' },
  { type: 'port', label: 'HTTPS', value: '443' },
  { type: 'port', label: 'FTP', value: '21' },
  { type: 'address', label: 'APPLE', value: 'apple.com' },
  { type: 'address', label: 'GOOGLE', value: 'google.com' },
  { type: 'address', label: 'MICROSOFT', value: 'microsoft.com' },
];

const portOptions = options.filter(option => option.type === 'port');
const pathOptions = options.filter(option => option.type === 'path');
const addressOptions = options.filter(option => option.type === 'address');

function getCardComponent(type, onInnerClick) {
  return class CardComponent extends React.Component {
    constructor(props) {
      super(props);
      this.assignRef = this.assignRef.bind(this);
      this.onClick = this.onClick.bind(this);
    }
    componentDidMount() {}
    onClick() {
      onInnerClick();
      this.props.onClick();
    }
    assignRef(element) {
      if (element) {
        this.props.assignRef(element);
        this.element = element;
        this.element.style.width = this.props.parent.offsetWidth;
      }
    }
    render() {
      const availableOptions = options.filter(option => option.type === type);
      const { value, onChange } = this.props;

      return (
        <div
          ref={this.assignRef}
          style={{
            background: '#fff',
            border: '2px solid #eee',
          }}
        >
          <div style={{ padding: '5px', borderBottom: '2px solid #eee' }}>
            <TextField onClick={this.onClick} />
          </div>
          Current value: <span>{value}</span>
          {availableOptions.map(option => (
            <div
              key={option.label}
              role="presentation"
              style={{ display: 'flex', flexDirection: 'row', padding: '10', cursor: 'pointer' }}
              onClick={() => onChange(option.label)}
            >
              <div style={{ padding: '5px', flex: '1' }}>{option.label}</div>
              <div style={{ padding: '5px', width: '200px', flex: '0 0 200px', color: '#999' }}>
                {option.value}
              </div>
            </div>
          ))}
        </div>
      );
    }
  };
}

class TextFieldWithValidation extends React.Component {
  constructor() {
    super();
    this.state = {
      value: undefined,
      isModalVisible: false,
    };
    this.portValidators = createValidation([
      vd.isEmail,
      vd.isNum,
      vd.maxLength(30)
    ], portOptions, '[]');

    this.pathValidators = createValidation([
      vd.isEmail,
      vd.isNum,
      vd.maxLength(30)
    ], pathOptions, '[]');

    this.addressValidators = createValidation([
      vd.isEmail,
      vd.isNum,
      vd.maxLength(30)
    ], addressOptions, '[]');

    this.onChange = this.onChange.bind(this);
    this.onModalClick = this.onModalClick.bind(this);
  }
  onChange(value) {
    this.setState({ value: value !== '' ? value : undefined });
  }
  onModalClick() {
    this.setState({ isModalVisible: true });
  }
  render() {
    const portCardValidationResult = validate(this.state.value, this.portValidators);
    const pathCardValidationResult = validate(this.state.value, this.pathValidators);
    const addressCardValidationResult = validate(this.state.value, this.addressValidators);

    return (
      <div>
        <FormInput
          className="m5"
          type="text"
          placeholder="Validation"
          value={this.state.value}
          onChange={this.onChange}
          required
          tokens={pathCardValidationResult.tokens}
          cardComponent={getCardComponent('port', this.onModalClick)}
          tokenDelimiters="[]"
        />

        <TextField
          className="m5"
          type="text"
          placeholder="Validation"
          value={this.state.value}
          onChange={this.onChange}
          required
          invalid={!portCardValidationResult.isValid}
          invalidMessages={portCardValidationResult.messages}
          tokens={portCardValidationResult.tokens}
          tokenDelimiters="[]"
          cardComponent={getCardComponent('port', this.onModalClick)}
        />

        <TextField
          className="m5"
          type="text"
          placeholder="Validation"
          value={this.state.value}
          onChange={this.onChange}
          required
          invalid={!pathCardValidationResult.isValid}
          invalidMessages={pathCardValidationResult.messages}
          tokens={pathCardValidationResult.tokens}
          tokenDelimiters="[]"
          cardComponent={getCardComponent('path', this.onModalClick)}
        />

        <TextField
          className="m5"
          type="text"
          placeholder="Validation"
          value={this.state.value}
          onChange={this.onChange}
          required
          invalid={!addressCardValidationResult.isValid}
          invalidMessages={addressCardValidationResult.messages}
          tokens={addressCardValidationResult.tokens}
          tokenDelimiters="[]"
          cardComponent={getCardComponent('address', this.onModalClick)}
        />
        {this.state.isModalVisible && <Modal title="test" />}
      </div>
    );
  }
}

const TestTextCard = () => (
  <div>
    <div className="p10 b1-ccc w500">
      <TextFieldWithValidation />
    </div>
  </div>
);

export default TestTextCard;
