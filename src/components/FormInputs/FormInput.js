import './FormInput.scss';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import * as utils from '../../utils/common';
import Button from '../Button';
import Checkbox from '../Checkbox';
import DatePicker from '../DatePicker';
import FileUploader from '../FileUploader';
import Icon from '../Icon';
import RadioGroup from '../RadioGroup';
import Select from '../Select';
import TextArea from '../TextArea';
import TextField from '../TextField';
import Tooltip from '../Tooltip';

const FieldInfoOverlay = ({ assignRef, title, description }) => (
  <div className="forminput__field-info" ref={assignRef}>
    <div className="forminput__field-info__title">{title}</div>
    <div className="forminput__field-info__content">
      <p>{description}</p>
    </div>
  </div>
);

class FieldInfo extends PureComponent {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.closeIfClickingOutside = this.closeIfClickingOutside.bind(this);
    this.state = {
      open: false,
    };
  }
  componentWillUnmount() {
    this.close();
  }
  onClick() {
    if (this.state.open) {
      this.close();
    } else {
      this.open();
    }
  }
  open() {
    this.area = React.createRef();
    this.setState(
      {
        open: true,
      },
      () => {
        document.addEventListener('click', this.closeIfClickingOutside);
      },
    );
  }
  close() {
    this.setState(
      {
        open: false,
      },
      () => {
        this.area = null;
        document.removeEventListener('click', this.closeIfClickingOutside);
      },
    );
  }
  closeIfClickingOutside(evt) {
    if (!this.area.current) {
      return;
    }
    if (!this.area.current.contains(evt.target)) {
      this.close();
    }
  }
  render() {
    const { iconSize, title, description, url } = this.props;
    let content = null;
    if (this.state.open) {
      content = (
        <FieldInfoOverlay assignRef={this.area} title={title} description={description} url={url} />
      );
    }
    const fieldInfoClassName = utils.composeClassNames([
      'forminput__field-info__icon',
      this.state.open && 'forminput__field-info__icon--active',
    ]);

    return (
      <Tooltip
        forceVisibility={this.state.open}
        showOnHover={false}
        content={content}
        custom
        position="right"
      >
        <Icon
          name="forum-small"
          onClick={this.onClick}
          size={iconSize}
          className={fieldInfoClassName}
        />
      </Tooltip>
    );
  }
}

const Label = ({ size, label, required, complete, description, url }) => {
  if (!label) {
    return null;
  }

  const className = utils.composeClassNames([
    'forminput__label-box',
    size === 's' && 'forminput__label-box--small',
    size === 'm' && 'forminput__label-box--medium',
    size === 'l' && 'forminput__label-box--large',
  ]);
  const iconSizes = {
    s: 11,
    m: 12,
    l: 14,
  };
  const iconSize = iconSizes[size];
  return (
    <div className={className}>
      {required && (
        <Icon
          size={iconSize}
          name="info-small"
          className="forminput__label-icon"
          fill={complete ? '#39f' : '#f93'}
          tooltip={complete ? '' : 'This is a required field'}
        />
      )}
      <label>{label}</label>
      <FieldInfo iconSize={iconSize} title={label} description={description} url={url} />
    </div>
  );
};

const InlineButton = ({ visible, isLocked, isDisabled, onClick, label }) => {
  if (!visible || isLocked || isDisabled) {
    return null;
  }

  return (
    <Button
      size="m"
      noFill
      kind="secondary"
      className="forminput__inline-button"
      onClick={onClick}
      disabled={isDisabled}
      label={label}
    />
  );
};

const LockedIcon = ({ locked }) => {
  if (!locked) {
    return null;
  }
  return (
    <div className="forminput__inline-icon">
      <Icon
        name="lock-small"
        size={20}
        fill="#999"
        style={{ marginLeft: '10px' }}
        tooltip="this field is locked"
      />
    </div>
  );
};

const InfoMessage = ({ message }) => (
  <div className="forminput__input-message">{message && <Tooltip>{message}</Tooltip>}</div>
);

const addKey = (element, index) => React.cloneElement(element, { key: index });

const composeSelect = props => [
  <div className="forminput-input" style={props.wrapperStyle}>
    <Label
      size={props.size}
      label={props.label}
      required={props.isRequired}
      complete={props.hasValue}
    />
    <Select
      size={props.size}
      className={props.className}
      id={props.componentId}
      selected={props.value}
      options={props.options}
      onChange={props.onChange}
      required={props.isRequiredAndUnset}
      invalid={props.isInvalid}
      invalidMessages={props.validationMessages}
      disabled={props.isDisabled}
      style={props.inputStyle}
      placeholder={props.placeholder}
      pending={props.isPending}
    />
    {props.children !== undefined && props.children}
    <InfoMessage message={props.inputMessage} />
  </div>,
  <InlineButton
    visible={props.hasInlineButton}
    locked={props.isLocked}
    disabled={props.isDisabled}
    onClick={props.onInlineButtonClick}
    label={props.inlineButtonLabel}
  />,
  <LockedIcon locked={props.isLocked} />,
];

const composePicker = props => [
  <div className="forminput-input picker" style={props.wrapperStyle}>
    <Label
      size={props.size}
      label={props.label}
      required={props.isRequired}
      complete={props.hasValue}
    />
    <TextField
      type="text"
      size={props.size}
      className={props.className}
      icon="search"
      id={props.componentId}
      onKeyPress={props.onKeyPress}
      onClick={props.onClick}
      value={props.value}
      pending={props.isPending}
      disabled={props.isDisabled}
      required={props.isRequiredAndUnset}
      invalid={props.isInvalid}
      invalidMessages={props.validationMessages}
      style={props.inputStyle}
      placeholder={props.placeholder}
      buttonText={props.inlineButtonLabel}
      buttonKind="secondary"
      buttonDisabled={!props.hasValue}
      onButtonClick={props.onInlineButtonClick}
    />
    {props.children !== undefined && props.children}
    <InfoMessage message={props.inputMessage} />
  </div>,
  <LockedIcon locked={props.isLocked} />,
];

const composeArea = props => [
  <div className="forminput-input" style={props.wrapperStyle}>
    <Label
      size={props.size}
      label={props.label}
      required={props.isRequired}
      complete={props.hasValue}
    />
    <TextArea
      className={props.className}
      size={props.size}
      id={props.componentId}
      autofocus={props.autofocus}
      value={props.value}
      onChange={props.onChange}
      disabled={props.isDisabled}
      required={props.isRequiredAndUnset}
      pending={props.isPending}
      invalid={props.isInvalid}
      invalidMessages={props.validationMessages}
      style={props.inputStyle}
      placeholder={props.placeholder}
    />
    {props.children !== undefined && props.children}
    <InfoMessage message={props.inputMessage} />
  </div>,
  <InlineButton
    visible={props.hasInlineButton}
    locked={props.isLocked}
    disabled={props.isDisabled}
    onClick={props.onInlineButtonClick}
    label={props.inlineButtonLabel}
  />,
  <LockedIcon locked={props.isLocked} />,
];

const composeText = props => [
  <div className="forminput-input" style={props.wrapperStyle}>
    <Label
      size={props.size}
      label={props.label}
      required={props.isRequired}
      complete={props.hasValue}
    />
    <TextField
      type={props.type}
      className={props.className}
      size={props.size}
      id={props.componentId}
      autofocus={props.autofocus}
      value={props.value}
      onChange={props.onChange}
      disabled={props.isDisabled}
      required={props.isRequiredAndUnset}
      pending={props.isPending}
      invalid={props.isInvalid}
      invalidMessages={props.validationMessages}
      tokens={props.tokens}
      cardSelectors={props.cardSelectors}
      cardComponent={props.cardComponent}
      style={props.inputStyle}
      placeholder={props.placeholder}
    />
    {props.children !== undefined && props.children}
    <InfoMessage message={props.inputMessage} />
  </div>,
  <InlineButton
    visible={props.hasInlineButton}
    locked={props.isLocked}
    disabled={props.isDisabled}
    onClick={props.onInlineButtonClick}
    label={props.inlineButtonLabel}
  />,
  <LockedIcon locked={props.isLocked} />,
];

const composeDate = props => [
  <div className="forminput-input" style={props.wrapperStyle}>
    <Label
      size={props.size}
      label={props.label}
      required={props.isRequired}
      complete={props.hasValue}
    />
    <DatePicker
      size={props.size}
      className={props.className}
      withTime={props.type === 'datetime'}
      format={props.format || 'X'} // export as seconds timestamp
      dateFormat={props.dateFormat || 'X'}
      onSelect={props.onChange}
      value={props.value}
      placeholder={props.placeholder}
      required={props.isRequiredAndUnset}
      invalid={props.isInvalid}
      invalidMessages={props.validationMessages}
      pending={props.isPending}
      disabled={props.isDisabled}
      style={props.inputStyle}
      id={props.componentId}
      label={props.label}
      hasTime
    />
    {props.children !== undefined && props.children}
    <InfoMessage message={props.inputMessage} />
  </div>,
  <InlineButton
    visible={props.hasInlineButton}
    locked={props.isLocked}
    disabled={props.isDisabled}
    onClick={props.onInlineButtonClick}
    label={props.inlineButtonLabel}
  />,
  <LockedIcon locked={props.isLocked} />,
];

const composeFile = props => {
  let parseFileAs;
  if (props.parseFileAsText) {
    parseFileAs = 'text';
  } else if (props.parseFileAsBase64) {
    parseFileAs = 'base64';
  }
  return [
    <div className="forminput-input" style={props.wrapperStyle}>
      <Label
        size={props.size}
        label={props.label}
        required={props.isRequired}
        complete={props.hasValue}
      />
      <FileUploader
        size={props.size}
        className={props.className}
        style={props.inputStyle}
        id={props.componentId}
        placeholder={props.placeholder}
        file={props.value}
        fileType={props.fileType}
        fileName={props.fileName}
        parseFileAs={parseFileAs}
        pending={props.isPending}
        onChange={props.onChange}
        required={props.isRequiredAndUnset}
        invalid={props.isInvalid}
        disabled={props.isDisabled}
      />
      {props.children !== undefined && props.children}
      <InfoMessage message={props.inputMessage} />
    </div>,
    <InlineButton
      visible={props.hasInlineButton}
      locked={props.isLocked}
      disabled={props.isDisabled}
      onClick={props.onInlineButtonClick}
      label={props.inlineButtonLabel}
    />,
    <LockedIcon locked={props.isLocked} />,
  ];
};

const composeRadio = props => [
  <div className="forminput-checkbox" style={props.wrapperStyle}>
    <Label
      size={props.size}
      label={props.label}
      required={props.isRequired}
      complete={props.hasValue}
    />
    <RadioGroup
      id={props.componentId}
      onChange={props.onChange}
      disabled={props.isDisabled}
      value={props.value}
      options={props.options}
    />
  </div>,
  <LockedIcon locked={props.isLocked} />,
];

const composeCheckbox = props => [
  <div className="forminput-checkbox" style={props.wrapperStyle}>
    <Checkbox
      id={props.componentId}
      label={props.label}
      checked={props.value}
      onChange={props.onChange}
      disabled={props.isDisabled}
    />
  </div>,
  <LockedIcon locked={props.isLocked} />,
];

class FormInput extends PureComponent {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onTextFieldChange = this.onTextFieldChange.bind(this);
    this.onPickerClick = this.onPickerClick.bind(this);
  }
  onChange(value) {
    const { transformUpdate, onChange } = this.props;
    let updateValue = value;
    if (typeof transformUpdate === 'function') {
      updateValue = transformUpdate(value);
    }
    if (typeof onChange === 'function') {
      onChange(updateValue);
    }
  }
  onTextFieldChange(value) {
    let updateValue = value;
    if (value === '') {
      updateValue = undefined;
    }
    this.onChange(updateValue);
  }
  onPickerClick(e) {
    const { onClick } = this.props;
    e.nativeEvent.preventDefault();
    e.nativeEvent.stopPropagation();
    if (typeof onClick === 'function') {
      // release the focus on the textfield so that validation card will not spawn
      document.activeElement.blur();
      onClick();
    }
  }
  render() {
    const {
      validation,
      transformValue,
      required,
      invalid,
      pending,
      messageVisibility,
      errorVisibility,
      message,
      type,
      style,
      className,
      size,
      name,
      label,
      // optional parameters
      subgroup,
      hidden,
      autofocus,
      disabled,
      locked,
      elementWidth,
      placeholder = '',
      id,
      // select and radio parameters
      options,
      // extra inline button
      onInlineButtonClick,
      inlineButtonLabel,
      // Date Picker Props
      format,
      dateFormat,
      // FileUploader Props
      parseFileAsText,
      parseFileAsBase64,
      fileType,
      fileName,
      // has children to be shown below
      children,
    } = this.props;

    if (hidden === true) {
      return null;
    }

    let { value } = this.props;

    if (typeof transformValue === 'function') {
      value = transformValue(value);
    }

    const hasValue = value !== undefined && value !== null && value !== '';
    const hasValidationMessages =
      validation && validation.messages && validation.messages.length > 0;
    const hasValidationTokens = validation && validation.tokens && validation.tokens.length > 0;
    const isFieldInvalid = validation && validation.isValid === false && hasValue;
    const hasValidationRequiredFlag = validation && validation.isRequired;
    const isRequired = required || hasValidationRequiredFlag;
    const shouldShowValidation = invalid || isFieldInvalid || messageVisibility === true;
    const isInvalid = shouldShowValidation && errorVisibility !== false;
    const isPending = pending;
    const validationMessages = hasValidationMessages ? validation.messages : [];
    const validationTokens = hasValidationTokens ? validation.tokens : [];
    const messageVisibilities = Array.isArray(messageVisibility)
      ? messageVisibility
      : [messageVisibility];
    const messages = Array.isArray(message) ? message : [message];
    const activeMessageIndex = messageVisibilities.indexOf(true);
    const inputMessage = activeMessageIndex === -1 ? null : messages[activeMessageIndex];

    const wrapperStyle = { width: elementWidth, ...style, flexBasis: elementWidth };
    const inputStyle = { width: elementWidth };

    const isRequiredAndUnset = isRequired && !hasValue;

    const cmnProps = {
      componentId: id || (subgroup ? `${subgroup}-${name}` : name),
      isDisabled: disabled === true || isPending === true,
      label,
      placeholder,
      className,
      size,
      value,
      isRequired,
      isRequiredAndUnset,
      isPending,
      isInvalid,
      validationMessages,
      inputMessage,
      wrapperStyle,
      inputStyle,
      isLocked: locked,
      hasValue,
      onChange: this.onChange,
      children,
    };

    const btnProps = {
      hasInlineButton: typeof onInlineButtonClick === 'function',
      inlineButtonLabel,
      onInlineButtonClick,
    };

    // Return correct input
    let input = null;

    if (type === 'select') {
      input = composeSelect({ ...cmnProps, ...btnProps, options });
    } else if (type === 'checkbox') {
      input = composeCheckbox({ ...cmnProps });
    } else if (type === 'radio') {
      input = composeRadio({ ...cmnProps, options });
    } else if (type === 'picker') {
      input = composePicker({
        ...cmnProps,
        ...btnProps,
        onKeyPress: this.onPickerClick,
        onClick: this.onPickerClick,
      });
    } else if (type === 'date' || type === 'datetime') {
      input = composeDate({ ...cmnProps, ...btnProps, type, format, dateFormat });
    } else if (type === 'file') {
      input = composeFile({ ...cmnProps, parseFileAsText, parseFileAsBase64, fileType, fileName });
    } else if (type === 'area') {
      input = composeArea({
        ...cmnProps,
        ...btnProps,
        autofocus,
        onChange: this.onTextFieldChange,
      });
    } else if (type === 'text' || type === 'number' || type === 'email' || type === 'password') {
      input = composeText({
        ...cmnProps,
        ...btnProps,
        tokens: validationTokens,
        cardSelectors: this.props.cardSelectors,
        cardComponent: this.props.cardComponent,
        type,
        autofocus,
        onChange: this.onTextFieldChange,
      });
    }
    input = input.map(addKey);

    return <div className="forminput__row">{input}</div>;
  }
}

FormInput.propTypes = {
  size: PropTypes.oneOf(['s', 'm', 'l']),
  type: PropTypes.oneOf([
    'select',
    'checkbox',
    'radio',
    'area',
    'text',
    'number',
    'email',
    'password',
    'picker',
    'date',
    'datetime',
    'file',
  ]),
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  validation: PropTypes.shape({
    isRequired: PropTypes.bool,
    isValid: PropTypes.bool,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        message: PropTypes.string,
        active: PropTypes.bool,
      }),
    ),
  }),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  transformValue: PropTypes.func,
  transformUpdate: PropTypes.func,
  // eslint-disable-next-line
  allowEmpty: PropTypes.bool,

  // overwrite a nested object in the store
  subgroup: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  hidden: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  invalid: PropTypes.bool,
  pending: PropTypes.bool,
  // eslint-disable-next-line
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  messageVisibility: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.bool)]),
  errorVisibility: PropTypes.bool,
  // eslint-disable-next-line
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  onClick: PropTypes.func,
  onInlineButtonClick: PropTypes.func,
  inlineButtonLabel: PropTypes.string,
  autofocus: PropTypes.bool,

  //   custom for date picker
  format: PropTypes.string,
  dateFormat: PropTypes.string,

  // custom for fileuploader
  parseFileAsText: PropTypes.bool,
  fileType: PropTypes.string,
  fileName: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape(),
  elementWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  locked: PropTypes.bool,
};

FormInput.defaultProps = {
  size: 'l',
  name: undefined,
  label: undefined,
  onChange: undefined,
  validation: undefined,
  value: undefined,
  options: undefined,
  transformValue: undefined,
  transformUpdate: undefined,
  allowEmpty: false,
  subgroup: undefined,
  locked: false,
  hidden: false,
  autofocus: false,
  disabled: false,
  required: false,
  invalid: false,
  pending: undefined,
  messageVisibility: undefined,
  errorVisibility: undefined,
  message: undefined,
  onClick: undefined,
  onInlineButtonClick: undefined,
  inlineButtonLabel: 'Custom',
  format: undefined,
  dateFormat: undefined,
  parseFileAsText: undefined,
  fileType: undefined,
  fileName: undefined,
  type: 'text',
  className: undefined,
  style: undefined,
  elementWidth: undefined,
};
export default FormInput;
export { Label };
