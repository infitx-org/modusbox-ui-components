import '../../icons/modusbox/toggle-invisible.svg';
import '../../icons/modusbox/toggle-visible.svg';
import './TextField.scss';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import * as utils from '../../utils/common';
import keyCodes from '../../utils/keyCodes';
import { InnerButton, InvalidIcon, Loader, Placeholder, ValidationWrapper } from '../Common';
import ControlIcon from '../ControlIcon';
import Icon, { iconSizes } from '../Icon';

class TextField extends PureComponent {
  constructor(props) {
    super(props);

    // Events
    this.onShowPasswordClick = this.onShowPasswordClick.bind(this);
    this.onPageClick = this.onPageClick.bind(this);
    this.onTextFieldClick = this.onTextFieldClick.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);

    // Wrapper events
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);

    // Internal lifecycle methods
    this.closeTextField = this.closeTextField.bind(this);
    this.leaveTextField = this.leaveTextField.bind(this);
    this.enterTextField = this.enterTextField.bind(this);
    this.testKey = this.testKey.bind(this);

    const { value } = this.props;
    this.state = {
      isOpen: false,
      isPasswordVisible: false,
      value,
    };
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.onPageClick, false);
  }
  componentDidUpdate(prevProps) {
    const changes = {};
    const { value, disabled } = this.props;

    if (value !== prevProps.value) {
      changes.value = value;
    }
    if (disabled !== prevProps.disabled) {
      changes.isOpen = false;
    }

    if (Object.keys(changes).length > 0) {
      this.setState(changes);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onPageClick, false);
  }

  onTextFieldClick() {
    this.input.click();
  }
  onButtonClick(e) {
    e.stopPropagation();
    if (this.props.onButtonClick) {
      this.props.onButtonClick(e);
    }
  }
  onClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
    if (this.state.isOpen === true) {
      return;
    }
    this.input.focus();
    this.setState({ isOpen: true });
  }
  onChange(e) {
    const { value } = e.target;
    if (this.state.value !== value) {
      this.setState({ value });

      let finalValue = value;

      if (this.props.onChange) {
        if (this.props.type === 'number') {
          finalValue = parseFloat(finalValue);
          if (Number.isNaN(finalValue)) {
            finalValue = undefined;
          }
        }
      }
      this.props.onChange(finalValue);
    }
  }
  onKeyPress(e) {
    if (this.props.onKeyPress) {
      this.props.onKeyPress(e);
    }
  }
  onBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
    this.closeTextField();
  }
  onFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
    this.enterTextField(e);
  }

  onPageClick(evt) {
    if (!this.state.isOpen) {
      return;
    }
    const isClickWithinTextFieldBox = this.area.contains(evt.target);
    if (!isClickWithinTextFieldBox) {
      this.closeTextField();
      this.input.blur();
    }
  }
  onShowPasswordClick(e) {
    e.stopPropagation();
    this.setState({ isPasswordVisible: !this.state.isPasswordVisible });
  }

  closeTextField() {
    this.setState({ isOpen: false });
  }
  leaveTextField(next) {
    this.closeTextField();
    utils.focusNextFocusableElement(this.input, next);
  }
  enterTextField() {
    if (this.props.disabled) {
      this.leaveTextField();
      return;
    }
    this.setState({ isOpen: true });
  }
  testKey(e) {
    const { keyCode, shiftKey } = e.nativeEvent;
    if (keyCode === keyCodes.KEY_TAB) {
      e.preventDefault();
      this.leaveTextField(!shiftKey);
      return;
    }
    if (keyCode === keyCodes.KEY_RETURN) {
      if (this.props.buttonText) {
        this.onButtonClick(e);
      } else {
        e.preventDefault();
        this.leaveTextField(!shiftKey);
      }
    }
  }

  render() {
    const {
      autofocus,
      style,
      type,
      id,
      className,
      size,
      placeholder,
      onButtonClick,
      buttonText,
      buttonKind,
      buttonDisabled,
      icon,
      disabled,
      pending,
      required,
      invalid,
      invalidMessages,
    } = this.props;
    const { isOpen, value, isPasswordVisible } = this.state;
    const hasButton = typeof onButtonClick === 'function';
    const iconSize = iconSizes[size];
    const hasValue = !(value === undefined || value === '');

    const componentClassName = utils.composeClassNames([
      className,
      'input-textfield__component',
      'mb-input',
      'mb-input__borders',
      'mb-input__background',
      'mb-input__shadow',
      size === 's' && 'mb-input--small',
      size === 'm' && 'mb-input--medium',
      size === 'l' && 'mb-input--large',
      /* eslint-disable max-len  */
      isOpen &&
        'mb-input--open mb-input__borders--open mb-input__background--open mb-input__shadow--open',
      disabled && 'mb-input--disabled mb-input__borders--disabled mb-input__background--disabled',
      pending &&
        'mb-input--pending mb-input__borders--pending mb-input__background--pending mb-input__shadow--pending',
      invalid &&
        'mb-input--invalid mb-input__borders--invalid mb-input__background--invalid mb-input__shadow--invalid',
      required &&
        !hasValue &&
        'mb-input--required mb-input__borders--required mb-input__background--required mb-input__shadow--required',
      /* eslint-enabl  */
    ]);

    const inputType = isPasswordVisible ? 'text' : type;

    let passwordToggle = null;
    if (type === 'password') {
      passwordToggle = (
        <div className="mb-input__inner-icon input-textfield__icon">
          <ControlIcon
            onClick={this.onShowPasswordClick}
            icon={isPasswordVisible ? 'toggle-invisible' : 'toggle-visible'}
            size={iconSize}
            fill={isPasswordVisible ? '#999' : '#39f'}
          />
        </div>
      );
    }

    let customPlaceholder = null;
    if (placeholder) {
      const isPlaceholderActive = isOpen || hasValue;
      customPlaceholder = (
        <Placeholder size={size} label={placeholder} active={isPlaceholderActive} />
      );
    }

    let innerButton = null;
    if (hasButton) {
      innerButton = (
        <InnerButton
          kind={buttonKind}
          onClick={this.onButtonClick}
          label={buttonText}
          disabled={disabled || buttonDisabled}
          active={isOpen}
          noFill
        />
      );
    }

    let loader = null;
    if (pending) {
      loader = <Loader size={size} />;
    }

    let invalidIcon = null;
    if (invalid) {
      invalidIcon = <InvalidIcon size={size} />;
    }

    let customIcon = null;
    if (icon) {
      customIcon = (
        <div className="mb-input__inner-icon input-textfield__icon">
          <Icon size={iconSize} name={icon} />
        </div>
      );
    }

    return (
      <ValidationWrapper messages={invalidMessages} active={isOpen}>
        <div
          style={style}
          className={componentClassName}
          onClick={this.onTextFieldClick}
          ref={area => {
            this.area = area;
          }}
          role="presentation"
        >
          <div className="mb-input__content input-textfield__content">
            {customPlaceholder}
            <input
              id={id}
              ref={input => {
                this.input = input;
              }}
              autoFocus={autofocus === true}
              autoComplete="off"
              type={inputType}
              onClick={this.onClick}
              onChange={this.onChange}
              onKeyDown={this.testKey}
              onKeyPress={this.onKeyPress}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              value={value || ''}
              disabled={disabled}
              className="mb-input__input input-textfield__value"
            />
            {innerButton}
            {loader}
            {invalidIcon}
            {passwordToggle}
            {customIcon}
          </div>
        </div>
      </ValidationWrapper>
    );
  }
}

TextField.propTypes = {
  autofocus: PropTypes.bool,
  style: PropTypes.shape(),
  type: PropTypes.oneOf(['text', 'number', 'password']),
  id: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(['s', 'm', 'l']),
  placeholder: PropTypes.string,
  value: PropTypes.string,
  buttonText: PropTypes.string,
  buttonKind: PropTypes.string,
  buttonDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  onButtonClick: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyPress: PropTypes.func,
  icon: PropTypes.string,
  pending: PropTypes.bool,
  required: PropTypes.bool,
  invalid: PropTypes.bool,
  invalidMessages: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      text: PropTypes.string,
    }),
  ),
  disabled: PropTypes.bool,
};

TextField.defaultProps = {
  autofocus: false,
  style: {},
  type: 'text',
  id: undefined,
  className: undefined,
  size: 'l',
  placeholder: undefined,
  value: undefined,
  buttonText: undefined,
  buttonKind: undefined,
  buttonDisabled: false,
  onClick: undefined,
  onButtonClick: undefined,
  onChange: undefined,
  onBlur: undefined,
  onFocus: undefined,
  onKeyPress: undefined,
  icon: undefined,
  pending: false,
  required: false,
  invalid: false,
  invalidMessages: [],
  disabled: false,
};

export default TextField;
