import '../../icons/modusbox/toggle-invisible.svg';
import '../../icons/modusbox/toggle-visible.svg';
import './TextArea.scss';

import * as utils from 'common/generic';
import keyCodes from 'common/keyCodes';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { InnerButton, InvalidIcon, Loader, Placeholder, ValidationWrapper } from '../Common';
import Icon, { iconSizes } from '../Icon';

class TextArea extends PureComponent {
  constructor(props) {
    super(props);

    // Events
    this.onPageClick = this.onPageClick.bind(this);
    this.onTextAreaClick = this.onTextAreaClick.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);

    // Wrapper events
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);

    // Internal lifecycle methods
    this.closeTextArea = this.closeTextArea.bind(this);
    this.leaveTextArea = this.leaveTextArea.bind(this);
    this.enterTextArea = this.enterTextArea.bind(this);
    this.testKey = this.testKey.bind(this);

    const { value } = this.props;
    this.state = {
      isOpen: false,
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

  onTextAreaClick() {
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

      if (this.props.onChange) {
        this.props.onChange(value);
      }
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
    this.closeTextArea();
  }
  onFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
    this.enterTextArea(e);
  }

  onPageClick(evt) {
    if (!this.state.isOpen) {
      return;
    }
    const isClickWithinTextAreaBox = this.area.contains(evt.target);
    if (!isClickWithinTextAreaBox) {
      this.closeTextArea();
      this.input.blur();
    }
  }
  closeTextArea() {
    this.setState({ isOpen: false });
  }
  leaveTextArea(next) {
    this.closeTextArea();
    utils.focusNextFocusableElement(this.input, next);
  }
  enterTextArea() {
    if (this.props.disabled) {
      this.leaveTextArea();
      return;
    }
    this.setState({ isOpen: true });
  }
  testKey(e) {
    const { keyCode, shiftKey } = e.nativeEvent;
    if (keyCode === keyCodes.KEY_TAB) {
      e.preventDefault();
      this.leaveTextArea(!shiftKey);
    }
  }

  render() {
    const {
      autofocus,
      style,
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
    const { isOpen, value } = this.state;
    const hasButton = typeof onButtonClick === 'function';
    const iconSize = iconSizes[size];
    const hasValue = !(value === undefined || value === '');

    const componentClassName = utils.composeClassNames([
      className,
      'input-textarea__component',
      'mb-input',
      'mb-input__borders',
      'mb-input__background',
      'mb-input__shadow',
      size === 's' && 'mb-input--small',
      size === 's' && 'mb-textarea--small',
      size === 'm' && 'mb-input--medium',
      size === 'm' && 'mb-textarea--medium',
      size === 'l' && 'mb-input--large',
      size === 'l' && 'mb-textarea--large',
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
      /* eslint-enable  */
    ]);

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
        <div className="mb-input__inner-icon input-textarea__icon">
          <Icon size={iconSize} name={icon} />
        </div>
      );
    }

    return (
      <ValidationWrapper messages={invalidMessages} active={isOpen}>
        <div
          style={style}
          className={componentClassName}
          onClick={this.onTextAreaClick}
          ref={area => {
            this.area = area;
          }}
          role="presentation"
        >
          <div className="mb-input__content input-textarea__content">
            <div className="input-textarea__placeholder">{customPlaceholder}</div>
            <textarea
              rows={10}
              id={id}
              ref={input => {
                this.input = input;
              }}
              autoFocus={autofocus === true}
              autoComplete="off"
              type="text"
              onClick={this.onClick}
              onChange={this.onChange}
              onKeyDown={this.testKey}
              onKeyPress={this.onKeyPress}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              value={value || ''}
              disabled={disabled}
              className="mb-input__input input-textarea__value"
            />
            {innerButton}
            {loader}
            {invalidIcon}
            {customIcon}
          </div>
        </div>
      </ValidationWrapper>
    );
  }
}

TextArea.propTypes = {
  autofocus: PropTypes.bool,
  style: PropTypes.shape(),
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

TextArea.defaultProps = {
  autofocus: false,
  style: {},
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

export default TextArea;
