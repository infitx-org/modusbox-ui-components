import '../../icons/modusbox/toggle-invisible.svg';
import '../../icons/modusbox/toggle-visible.svg';
import './TextField.scss';

import * as utils from 'common/generic';
import keyCodes from 'common/keyCodes';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { InnerButton, InvalidIcon, Loader, Placeholder, ValidationWrapper } from '../Common';
import ControlIcon from '../ControlIcon/ControlIcon';
import Icon, { iconSizes } from '../Icon';
import Tooltip from '../Tooltip';

class Card extends PureComponent {
  render() {
    const {
      active,
      parent,
      assignRef,
      children,
      Content,
      value,
      cardable,
      onChange,
      onClick,
    } = this.props;

    let content = null;
    if (Content) {
      content = (
        <Content
          onChange={onChange}
          value={value}
          assignRef={assignRef}
          parent={parent}
          onClick={onClick}
          cardable={cardable}
        />
      );
    }

    return (
      <Tooltip
        position="bottom"
        custom
        content={content}
        forceVisibility={active}
        showOnHover={false}
      >
        {children}
      </Tooltip>
    );
  }
}

class ValueToken extends PureComponent {
  render() {
    const {
      assignRef,
      isCardable,
      isSelected,
      isInvalid,
      isMissing,
      onKeyDown,
      onChange,
      onClick,
      onFocus,
      word,
    } = this.props;

    return (
      <input
        type="text"
        onClick={onClick}
        className={utils.composeClassNames([
          'input-textfield__value__token',
          isSelected && 'input-textfield__value__token--selected',
          isCardable && 'input-textfield__value__token--matching',
          isCardable && isInvalid && 'input-textfield__value__token--invalid',
          isCardable && isMissing && 'input-textfield__value__token--missing',
        ])}
        ref={assignRef}
        onKeyDown={onKeyDown}
        onChange={onChange}
        onFocus={onFocus}
        value={word}
      />
    );
  }
}

class TextField extends PureComponent {
  static setElementWidth(element) {
    if (!element) {
      return;
    }
    const fontSize = window.getComputedStyle(element).getPropertyValue('font-size');
    const fontWeight = window.getComputedStyle(element).getPropertyValue('font-weight');
    const tmp = document.createElement('div');
    tmp.style.fontSize = fontSize;
    tmp.style.fontWeight = fontWeight;
    tmp.className = element.className;
    tmp.innerHTML = element.value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    document.body.appendChild(tmp);
    // eslint-disable-next-line
    element.style.width = tmp.getBoundingClientRect().width + 3 + 'px';
    document.body.removeChild(tmp);
  }
  static getRegex(delimiters) {
    const [open, close] = delimiters;

    return new RegExp(`(\\${open}[^\\${open}\\${close}]*[\\${close}]{0,1})`);
  }
  static getIsWrappedBetweenDelimiters(value, delimiters) {
    const [open, close] = delimiters;
    return value.startsWith(open) && value.endsWith(close);
  }
  static getIsCardable(value, delimiters) {
    if (!delimiters) {
      return false;
    }

    const [open] = delimiters;
    return (
      value
        .split(`\\${open}`)
        .join('%%%')
        .match(TextField.getRegex(delimiters)) !== null
    );
  }
  static getTokensAndInput(value = '', delimiters) {
    if (!delimiters) {
      return { tokens: [], inputValue: value };
    }
    const [open, close] = delimiters;

    function defineToken(tokenValue, index, arr) {
      const isCardable = TextField.getIsWrappedBetweenDelimiters(tokenValue, delimiters);
      if (index === arr.length - 1 && !isCardable) {
        return null;
      }
      return {
        word: tokenValue.split('%%%').join(`\\${open}`),
        isPartiallyCardable: tokenValue.startsWith(open) && !tokenValue.endsWith(close),
        isCardable,
      };
    }

    const tokens = value
      .split(`\\${open}`)
      .join('%%%')
      .split(TextField.getRegex(delimiters))
      .filter(str => str !== '')
      .map(defineToken)
      .filter(token => token !== null);

    return { tokens, inputValue: value.slice(TextField.getTokensText(tokens).length) };
  }
  static getTokensText(tokens) {
    return tokens.map(token => token.word).join('');
  }
  static getTotalLength(...items) {
    return items.reduce((total, current) => {
      return total + current.length;
    }, 0);
  }
  static getFullValue(tokens, inputValue) {
    return TextField.getTokensText(tokens) + (inputValue || '');
  }
  static getNextPosition(tokens, inputValue, positionFromRight) {
    let remaining = positionFromRight - inputValue.length;
    if (remaining <= 0) {
      return {
        nextCardToken: undefined,
        nextPosition: Math.abs(remaining),
      };
    }

    let i = tokens.length - 1;
    for (i; remaining > 0 && i >= 0; i -= 1) {
      remaining -= tokens[i].word.length;
    }
    return {
      nextCardToken: i + 1,
      nextPosition: Math.abs(remaining),
    };
  }

  static removeDelimiters(value, delimiters) {
    let str = value;
    const [openSelector, closeSelector] = delimiters;
    if (str.startsWith(openSelector)) {
      str = str.slice(1);
    }
    if (str.endsWith(closeSelector)) {
      str = str.slice(0, -1);
    }
    return str;
  }
  static isSelectionAtStart(element) {
    return element.selectionStart === 0;
  }
  static isSelectionAtEnd(element) {
    return element.selectionStart === element.value.length;
  }
  static isSelectionAfterFirstChar(element) {
    return element.selectionStart === 1;
  }
  static isSelectionBeforeLastChar(element) {
    return element.selectionStart === element.value.length - 1;
  }
  static isMultiSelection(element) {
    return element.selectionStart !== element.selectionEnd;
  }
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

    // Card methods
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onCardChange = this.onCardChange.bind(this);
    this.onTokenClick = this.onTokenClick.bind(this);
    this.onTokenChange = this.onTokenChange.bind(this);
    this.onTokenFocus = this.onTokenFocus.bind(this);
    this.goNextToken = this.goNextToken.bind(this);
    this.goPrevToken = this.goPrevToken.bind(this);

    this.deleteToken = this.deleteToken.bind(this);
    this.deleteTokenLastChar = this.deleteTokenLastChar.bind(this);
    this.deleteTokenFirstChar = this.deleteTokenFirstChar.bind(this);
    this.applyTokens = this.applyTokens.bind(this);
    this.afterTokenSelection = this.afterTokenSelection.bind(this);

    const { value, tokenDelimiters } = this.props;
    const { tokens, inputValue } = TextField.getTokensAndInput(value, tokenDelimiters);

    this.state = {
      isOpen: false,
      isPasswordVisible: false,
      valueToken: undefined,
      tokens,
      inputValue,
    };
    this.valueTokens = [];
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.onPageClick, false);
    this.valueTokens.forEach(TextField.setElementWidth);
    TextField.setElementWidth(this.input);
  }
  componentDidUpdate(prevProps) {
    this.valueTokens.forEach(TextField.setElementWidth);
    TextField.setElementWidth(this.input);

    if (this._nextPosition !== undefined) {
      const nextElement =
        this._nextCardToken !== undefined ? this.valueTokens[this._nextCardToken] : this.input;

      nextElement.focus();

      if (this.props.type !== 'number') {
        nextElement.setSelectionRange(this._nextPosition, this._nextPosition);
      }
      this._nextCardToken = undefined;
      this._nextPosition = undefined;
    }
    const changes = {};
    const { value, disabled, tokenDelimiters } = this.props;

    if (
      value !== prevProps.value &&
      value !== TextField.getFullValue(this.state.tokens, this.state.inputValue)
    ) {
      const { tokens, inputValue } = TextField.getTokensAndInput(value, tokenDelimiters);
      changes.tokens = tokens;
      changes.inputValue = inputValue;
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

    this.setState({ isOpen: true }, () => this.input.focus());
  }
  onChange(e) {
    this.applyTokens(
      this.state.tokens,
      e.target.value,
      e.target.value.length - e.target.selectionStart || 0,
    );
  }
  onKeyPress(e) {
    if (this.props.onKeyPress) {
      this.props.onKeyPress(e);
    }
  }
  onCardChange(value) {
    const { valueToken, tokens } = this.state;
    const { tokenDelimiters } = this.props;
    const [openSelector, closeSelector] = tokenDelimiters;
    const tokenValue = `${openSelector}${value}${closeSelector}`;
    let fullValue;
    let positionFromRight = 0;

    if (valueToken !== undefined) {
      const str = tokens[valueToken].word;
      const idx = str.lastIndexOf(openSelector);
      const tmpValue = `${str.slice(0, idx)}${tokenValue}`;
      fullValue =
        TextField.getTokensText(tokens.slice(0, valueToken)) +
        tmpValue +
        TextField.getTokensText(tokens.slice(valueToken + 1)) +
        this.state.inputValue;

      positionFromRight = TextField.getTotalLength(
        TextField.getTokensText(tokens.slice(valueToken + 1)),
        this.state.inputValue,
      );
    } else {
      const idx = this.state.inputValue.lastIndexOf(openSelector);
      const tmpValue = `${this.state.inputValue.slice(0, idx)}${tokenValue}`;
      fullValue = TextField.getTokensText(tokens) + tmpValue;
    }
    const values = TextField.getTokensAndInput(fullValue, tokenDelimiters);
    this.applyTokens(values.tokens, values.inputValue, positionFromRight);
  }
  onTokenClick(e, index) {
    e.preventDefault();
    e.stopPropagation();
    this._nextCardToken = index;
    this.setState({
      isOpen: true,
      valueToken: index,
    });
  }
  onTokenChange(e, index) {
    const { tokens, inputValue } = this.state;
    const newWord = e.target.value;
    const nextPosition = TextField.getTotalLength(
      newWord.slice(e.target.selectionStart),
      TextField.getTokensText(tokens.slice(index + 1)),
      this.state.inputValue,
    );

    this.applyTokens(
      [
        ...tokens.slice(0, index),
        {
          ...tokens[index],
          word: newWord,
        },
        ...tokens.slice(index + 1),
      ],
      inputValue,
      nextPosition,
    );
  }
  onTokenFocus(e) {
    const valueToken = this.valueTokens.indexOf(e.target);
    if (this.state.valueToken !== valueToken) {
      this.setState({
        valueToken,
      });
    }
  }
  async onBlur(e) {
    if (this.state.valueToken !== undefined) {
      return;
    }
    if (this.card) {
      return;
    }
    if (this.valueTokens.includes(e.relatedTarget)) {
      return;
    }
    if (e.relatedTarget === this.input) {
      return;
    }
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
    this.closeTextField();
  }
  onFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
    this.setState({ valueToken: undefined });
    this.enterTextField(e);
  }

  onPageClick(evt) {
    if (!this.state.isOpen) {
      return;
    }
    const isClickWithinTextFieldBox = this.area.contains(evt.target);
    const isClickWithinCardBox =
      document.body.contains(this.card) && this.card && this.card.contains(evt.target);

    if (!isClickWithinTextFieldBox && !isClickWithinCardBox) {
      this.closeTextField();
      this.input.blur();
    }
  }
  onShowPasswordClick(e) {
    e.stopPropagation();
    this.setState({ isPasswordVisible: !this.state.isPasswordVisible });
  }
  onKeyDown(e) {
    const { keyCode, shiftKey } = e.nativeEvent;
    const isSelectionAtStart = TextField.isSelectionAtStart(e.target);
    const isSelectionAtEnd = TextField.isSelectionAtEnd(e.target);
    const isSelectionAfterFirstChar = TextField.isSelectionAfterFirstChar(e.target);
    const isSelectionBeforeLastChar = TextField.isSelectionBeforeLastChar(e.target);
    const isMultiSelection = TextField.isMultiSelection(e.target);
    const isInput = e.target === this.input;
    const { valueToken, tokens } = this.state;

    if (keyCode === keyCodes.KEY_BACK_SPACE && isMultiSelection) {
      return;
    }

    if (keyCode === keyCodes.KEY_BACK_SPACE && isSelectionAtStart) {
      e.preventDefault();
      if (!tokens.length || valueToken === 0) {
        return;
      }
      const lastToken = isInput ? tokens.length - 1 : valueToken - 1;
      if (tokens[lastToken].isCardable) {
        this.deleteToken(lastToken);
      } else {
        this.deleteTokenLastChar(lastToken);
      }
      return;
    }

    if (keyCode === keyCodes.KEY_BACK_SPACE && isSelectionAtEnd && !isInput) {
      if (tokens[valueToken].isCardable) {
        e.preventDefault();
        this.deleteToken(valueToken);
        return;
      }
    }

    if (keyCode === keyCodes.KEY_BACK_SPACE && isSelectionAfterFirstChar && !isInput) {
      e.preventDefault();
      this.deleteTokenFirstChar(this.state.valueToken);
      return;
    }

    if (keyCode === keyCodes.KEY_TAB) {
      e.preventDefault();
      this.leaveTextField(!shiftKey);
      return;
    }

    if (keyCode === keyCodes.KEY_RETURN) {
      e.preventDefault();
      if (this.props.buttonText) {
        this.onButtonClick(e);
      } else {
        this.leaveTextField(!shiftKey);
      }
    }

    if (keyCode === keyCodes.KEY_LEFT && isSelectionAtStart && this.state.valueToken !== 0) {
      e.preventDefault();
      this.goPrevToken(e.target);
    }

    if (keyCode === keyCodes.KEY_RIGHT && isSelectionBeforeLastChar && !isInput) {
      e.preventDefault();
      this.goNextToken(e.target);
    }
  }
  closeTextField() {
    this.setState({ isOpen: false, valueToken: undefined });
  }
  leaveTextField(next) {
    const nextInput = utils.getNextFocusableElement(this.input, next);
    if (nextInput === this.input) {
      return;
    } else if (!this.card || !this.card.contains(nextInput)) {
      this.closeTextField();
    }
    utils.focusNextFocusableElement(this.input, next);
  }
  enterTextField() {
    if (this.props.disabled) {
      this.leaveTextField();
      return;
    }
    if (!this.state.isOpen) {
      this.setState({ isOpen: true });
    }
  }
  deleteToken(index) {
    const { tokens, inputValue } = this.state;
    this.applyTokens(
      [...tokens.slice(0, index), ...tokens.slice(index + 1)],
      inputValue,
      TextField.getTotalLength(TextField.getTokensText(tokens.slice(index + 1)), inputValue),
    );
  }
  deleteTokenFirstChar(index) {
    const { tokens, inputValue } = this.state;
    const word = tokens[index].word.slice(1);
    const nextPosition = TextField.getTotalLength(
      word,
      TextField.getTokensText(tokens.slice(index + 1)),
      inputValue,
    );

    this.applyTokens(
      [...tokens.slice(0, index), { ...tokens[index], word }, ...tokens.slice(index + 1)],
      inputValue,
      nextPosition,
    );
  }
  deleteTokenLastChar(index) {
    const { tokens, inputValue } = this.state;
    const word = tokens[index].word.slice(0, -1);
    const nextPosition = TextField.getTotalLength(
      TextField.getTokensText(tokens.slice(index + 1)),
      inputValue,
    );

    this.applyTokens(
      [...tokens.slice(0, index), { ...tokens[index], word }, ...tokens.slice(index + 1)],
      inputValue,
      nextPosition,
    );
  }
  applyTokens(nextTokens, nextInputValue, nextRightPosition) {
    const nextFullValue = TextField.getFullValue(nextTokens, nextInputValue);
    const { tokens, inputValue } = TextField.getTokensAndInput(
      nextFullValue,
      this.props.tokenDelimiters,
    );

    let nextCardToken = this.state.valueToken;
    let nextPosition;
    if (nextRightPosition !== undefined) {
      ({ nextCardToken, nextPosition } = TextField.getNextPosition(
        tokens,
        inputValue,
        nextRightPosition,
      ));
    }

    if (nextPosition !== undefined) {
      this._nextCardToken = nextCardToken;
      this._nextPosition = nextPosition;
    }

    this.setState(
      {
        inputValue,
        tokens,
        valueToken: tokens.length > nextCardToken ? nextCardToken : undefined,
      },
      () => {
        if (this.props.onChange) {
          let onChangeValue = nextFullValue;

          if (this.props.type === 'number') {
            onChangeValue = parseFloat(onChangeValue);
            if (Number.isNaN(onChangeValue)) {
              onChangeValue = undefined;
            }
          }
          this.props.onChange(onChangeValue);
        }
      },
    );
  }
  goPrevToken(target) {
    let valueToken;
    if (target === this.input) {
      valueToken = this.valueTokens.length - 1;
    } else if (this.state.valueToken > 0) {
      valueToken = this.state.valueToken - 1;
    }
    this.afterTokenSelection(valueToken, false);
  }
  goNextToken(target) {
    let valueToken;
    if (target === this.input) {
      return;
    } else if (this.state.valueToken === this.state.tokens.length - 1) {
      valueToken = undefined;
    } else if (this.state.valueToken !== undefined) {
      valueToken = this.state.valueToken + 1;
    }
    this.afterTokenSelection(valueToken, true);
  }
  afterTokenSelection(valueToken, isNext) {
    this._nextCardToken = valueToken;
    this._nextPosition =
      isNext || valueToken === undefined ? 0 : this.state.tokens[valueToken].word.length - 1;
    this.setState({
      valueToken,
    });
  }
  render() {
    this.card = null;
    this.valueTokens = [];

    const {
      autofocus,
      cardComponent,
      tokenDelimiters,
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

    const { isOpen, tokens, inputValue, isPasswordVisible, valueToken } = this.state;

    let cardValue;
    let tokenIsCardable;
    const iconSize = iconSizes[size];
    const inputType = isPasswordVisible ? 'text' : type;
    const hasValue = TextField.getFullValue(tokens, inputValue) !== '';
    const hasButton = typeof onButtonClick === 'function';
    const hasCard = typeof tokenDelimiters === 'string';
    const hasCardTokens = tokens.length > 0;
    const currentToken = tokens[valueToken];

    const isInputCardable =
      valueToken === undefined && TextField.getIsCardable(inputValue, tokenDelimiters);

    const isCardVisible =
      isOpen &&
      (isInputCardable ||
        (valueToken !== undefined &&
          currentToken &&
          (currentToken.isCardable || currentToken.isPartiallyCardable)));

    if (isInputCardable) {
      cardValue = TextField.removeDelimiters(inputValue, tokenDelimiters);
    }

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
      /* eslint-disable */
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
      /* eslint-enable */
    ]);

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

    let valueTokens = null;
    let cardEyeIcon = null;

    if (hasCardTokens) {
      let tooltip = '';
      valueTokens = tokens.map((token, index) => {
        const { word, isCardable } = token;
        const isSelected = valueToken === index;
        const cleanWord = TextField.removeDelimiters(word, tokenDelimiters);
        let isInvalid = true;
        let currentVar;

        if (isCardable) {
          currentVar = this.props.tokens.find(v => v.value === cleanWord);
        }

        if (currentVar) {
          const { available, isUndefined, replaced } = currentVar;
          isInvalid = !!(!available || isUndefined);
          tooltip += `${replaced}`;
        } else {
          tooltip += word;
        }

        if (isSelected) {
          cardValue = cleanWord;
          tokenIsCardable = isCardable;
        }

        return (
          <ValueToken
            word={token.word}
            isCardable={isCardable}
            assignRef={card => {
              this.valueTokens[index] = card;
            }}
            key={index.toString()}
            index={index}
            isSelected={isSelected}
            isInvalid={isInvalid}
            onFocus={this.onTokenFocus}
            onKeyDown={this.onKeyDown}
            onChange={e => this.onTokenChange(e, index)}
            onClick={e => this.onTokenClick(e, index)}
          />
        );
      });

      tooltip += inputValue;

      cardEyeIcon = (
        <Icon
          className="mb-input__inner-icon input-textfield__icon"
          name="toggle-visible"
          tooltip={tooltip}
          size={iconSize}
          fill="#226291"
        />
      );
    }

    const component = (
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
            <div className="input-textfield__value__tokens">
              {valueTokens}
              <input
                key="input"
                id={id}
                ref={input => {
                  this.input = input;
                }}
                autoFocus={autofocus === true}
                autoComplete="off"
                type={inputType}
                onClick={this.onClick}
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
                onKeyPress={this.onKeyPress}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                value={inputValue}
                disabled={disabled}
                className="mb-input__input input-textfield__value"
              />
            </div>
            {innerButton}
            {loader}
            {cardEyeIcon}
            {invalidIcon}
            {passwordToggle}
            {customIcon}
          </div>
        </div>
      </ValidationWrapper>
    );

    if (hasCard) {
      return (
        <Card
          assignRef={card => {
            this.card = card;
          }}
          parent={this.area}
          active={isCardVisible}
          value={cardValue || ''}
          cardable={tokenIsCardable}
          Content={cardComponent}
          onChange={this.onCardChange}
          onClick={this.closeTextField}
        >
          {component}
        </Card>
      );
    }
    return component;
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
  tokens: [],
  tokenDelimiters: undefined,
  cardComponent: undefined,
  disabled: false,
};

export default TextField;
