import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';

import * as utils from '../../utils/common';
import keyCodes from '../../utils/keyCodes';

import Icon, { iconSizes } from '../Icon';
import { Loader, Placeholder, Validation } from '../Common';

import Options from './Options';
import Indicator from './Indicator';

import '../../icons/mule/search-small.svg';

class Select extends PureComponent {
  constructor(props) {
    super(props);

    this.onClickSelect = this.onClickSelect.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onClearOption = this.onClearOption.bind(this);
    this.onSelectOption = this.onSelectOption.bind(this);
    this.onPageClick = this.onPageClick.bind(this);
    this.onSelectFilter = this.onSelectFilter.bind(this);

    // Internal lifecycle methods
    this.setInputValue = this.setInputValue.bind(this);
    this.setSelectedLabel = this.setSelectedLabel.bind(this);
    this.closeSelect = this.closeSelect.bind(this);
    this.leaveSelect = this.leaveSelect.bind(this);
    this.openSelect = this.openSelect.bind(this);
    this.testKey = this.testKey.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.highlightNextOption = this.highlightNextOption.bind(this);
    this.scrollToOption = this.scrollToOption.bind(this);

    const { options, selected } = this.props;
    const selectedItem = find(options, { value: selected });
    const selectedLabel = selectedItem ? selectedItem.label : undefined;

    this.state = {
      isOpen: false,
      highlightedOption: 0,
      options: options || [],
      selectedLabel,
      selected,
      filter: undefined,
    };
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('mouseup', this.onPageClick, false);
  }
  componentWillReceiveProps(nextProps) {
    const { options, selected, disabled } = nextProps;

    if (disabled !== this.props.disabled) {
      this.setState({
        isOpen: false,
        highlightedOption: 0,
        filter: undefined,
      });
    }
    this.setSelectedLabel(selected, options);
  }
  componentDidUpdate(_,prevState) {
    const { isOpen, highlightedOption } = this.state;
    if (isOpen === true && prevState.isOpen === false) {
      this.scrollToOption(highlightedOption);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mouseup', this.onPageClick, false);
  }
  onPageClick(e) {
    if (!this.state.isOpen) {
      return;
    }
    const isClickWithinSelectBox = this.area.contains(e.target);

    const isClickWithinOptionsBox = this.optionsPosition.childNodes[0]
      ? this.optionsPosition.childNodes[0].contains(e.target)
      : false;
    if (!isClickWithinSelectBox && !isClickWithinOptionsBox) {
      this.closeSelect();
      this.inputFilter.blur();
    }
  }

  // when opening the list of options...
  onClickSelect() {
    const isOpen = !this.state.isOpen;
    if (isOpen === true) {
      this.onSelectFilter();
      this.setState({ isOpen });
    } else {
      this.closeSelect();
    }
  }
  onClearOption() {
    if (this.props.onClear) {
      this.setState({
        selected: undefined,
        selectedLabel: undefined,
      });
      this.props.onClear();
      this.closeSelect();
    }
  }
  onBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }
  onFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
    this.openSelect();
  }

  onSelectFilter() {
    this.inputFilter.focus();
  }

  // when selecting the options item itself
  onSelectOption({ value } = {}) {
    if (value === undefined) {
      return;
    }
    if (value !== this.state.selected) {
      const selectedItem = find(this.state.options, { value });
      const selectedLabel = selectedItem ? selectedItem.label : undefined;
      this.setState({
        selected: value,
        selectedLabel,
      });
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(value);
      }
    }
    this.closeSelect();
  }
  setInputValue(value) {
    this.inputFilter.value = value;
  }
  setSelectedLabel(selected, options) {
    const selectedItem = find(options, { value: selected });
    const selectedLabel = selectedItem ? selectedItem.label : undefined;

    this.setState({
      options,
      selected,
      selectedLabel,
    });
  }
  getOptions() {
    const { options, filter } = this.state;
    if (filter === undefined || filter === '') {
      return options;
    }
    const lowerCaseFilter = filter.toLowerCase();
    return options.filter(item =>
      item.label
        .toString()
        .toLowerCase()
        .includes(lowerCaseFilter),
    );
  }
  closeSelect() {
    this.setState({ isOpen: false, filter: undefined });
    this.onBlur();
  }
  leaveSelect(next) {
    this.closeSelect();
    utils.focusNextFocusableElement(this.inputFilter, next);
  }
  openSelect() {
    const { options, selected } = this.state;
    const highlightedOption = Math.max(options.map(option => option.value).indexOf(selected), 0);
    this.setState({ isOpen: true, highlightedOption });
    this.handleResize();
  }
  handleResize() {
    const wrapper = utils.getParentOverflow(this.optionsPosition);
    const maxOptionsHeight = Math.min(240, this.state.options.length * 30);
    const { maxLowerHeight, maxUpperHeight } = utils.getSpaceAvailability(
      maxOptionsHeight,
      this.optionsPosition,
      wrapper,
    );
    this.reverse = maxLowerHeight > maxOptionsHeight ? false : maxLowerHeight < maxUpperHeight;
    this.maxHeight = Math.min(240, Math.max(maxLowerHeight, maxUpperHeight));

    clearTimeout(this._forceUpdateTimeout);
    this._forceUpdateTimeout = setTimeout(() => this.forceUpdate(), 50);
  }
  testKey(e) {
    const { keyCode, shiftKey } = e.nativeEvent;

    if (keyCode === keyCodes.KEY_TAB) {
      e.preventDefault();
      this.leaveSelect(!shiftKey);
      return;
    }
    if (keyCode === keyCodes.KEY_UP || keyCode === keyCodes.KEY_DOWN) {
      e.preventDefault();
      this.highlightNextOption(keyCode === keyCodes.KEY_DOWN);
    }
    if (keyCode === keyCodes.KEY_RETURN) {
      e.preventDefault();
      if (this.state.isOpen) {
        const options = this.getOptions();
        const selected = options[this.state.highlightedOption];
        this.onSelectOption(selected);
      } else {
        this.openSelect();
      }
    }
  }
  applyFilter() {
    const { value } = this.inputFilter;
    this.setState({ filter: value, isOpen: true });
  }
  highlightNextOption(next = true) {
    const { highlightedOption, options } = this.state;
    // const items = this.reverse ? [...options].reverse() : options
    const items = options;
    let currentHightlightedOption = highlightedOption;
    let nextHighlightedOption = -1;

    const getNextEnabledOption = () => {
      let option = (currentHightlightedOption + (next ? 1 : -1)) % items.length;
      if (option < 0) {
        option = items.length - 1;
      }
      currentHightlightedOption = option;
      if (items[option].disabled) {
        return -1;
      }
      return option;
    };

    while (nextHighlightedOption === -1) {
      nextHighlightedOption = getNextEnabledOption();
    }

    this.scrollToOption(nextHighlightedOption);
    this.setState({ highlightedOption: nextHighlightedOption });
  }
  scrollToOption(index) {
    const nextOption = this.options.items.children[index];
    if (nextOption) {
      nextOption.focus();
    }
    this.inputFilter.focus();
  }

  render() {
    const {
      id,
      style,
      className,
      size,
      placeholder,
      pending,
      disabled,
      invalid,
      required,
      invalidMessages,
    } = this.props;
    const { isOpen, selectedLabel, selected, filter, highlightedOption } = this.state;
    const options = this.getOptions();
    const inputValue = filter === undefined ? selectedLabel || '' : filter;
    const iconSize = iconSizes[size];

    const componentClassName = utils.composeClassNames([
      className,
      'input-select__component',
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
        selectedLabel === undefined &&
        'mb-input--required mb-input__borders--required mb-input__background--required mb-input__shadow--required',
      /* eslint-enable */
    ]);

    let customPlaceholder = null;
    if (placeholder) {
      const isPlaceholderActive = isOpen || selectedLabel !== undefined;
      customPlaceholder = (
        <Placeholder size={size} label={placeholder} active={isPlaceholderActive} />
      );
    }

    let optionsFilter = null;
    if (filter) {
      optionsFilter = (
        <div className="mb-input__inner-icon input-select__icon">
          <Icon size={iconSize} name="search-small" />
        </div>
      );
    }

    let validation = null;
    if (invalid) {
      validation = (
        <Validation className="input-select__icon" active={isOpen} messages={invalidMessages} />
      );
    }

    let loader = null;
    if (pending) {
      loader = <Loader size={size} />;
    }

    return (
      <div id={id} className="input-select mb-input__box" style={style}>
        <div
          className={componentClassName}
          onClick={this.onClickSelect}
          ref={area => {
            this.area = area;
          }}
          role="presentation"
        >
          <div className="mb-input__content input-select__content">
            {customPlaceholder}
            <input
              className={`mb-input__input input-select__value ${filter ? 'has-filter' : ''}`}
              type="text"
              ref={inputFilter => {
                this.inputFilter = inputFilter;
              }}
              onKeyDown={this.testKey}
              onChange={this.applyFilter}
              onFocus={this.onFocus}
              onClick={this.openSelect}
              value={inputValue}
              disabled={disabled}
            />
            <input type="hidden" disabled value={JSON.stringify(options)} />
            {optionsFilter}
            {validation}
            {loader}
            <div className="mb-input__inner-icon input-select__icon">
              <Indicator isOpen={isOpen} size={size} />
            </div>
          </div>
          <div
            className="input-select__options"
            ref={position => {
              this.optionsPosition = position;
            }}
          >
            <Options
              size={size}
              open={isOpen}
              ref={wrapper => {
                this.options = wrapper;
              }}
              options={options}
              maxHeight={this.maxHeight || 0}
              reverse={this.reverse}
              selected={selected}
              highlighted={highlightedOption}
              onSelect={this.onSelectOption}
              onClear={this.onClearOption}
              clearable={this.props.onClear}
            />
          </div>
        </div>
      </div>
    );
  }
}

Select.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape(),
  size: PropTypes.oneOf(['s', 'm', 'l']),
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    }),
  ),
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  pending: PropTypes.bool,
  required: PropTypes.bool,
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  invalidMessages: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      text: PropTypes.string,
    }),
  ),
};

Select.defaultProps = {
  id: undefined,
  className: undefined,
  style: {},
  size: 'l',
  selected: undefined,
  onChange: undefined,
  onClear: undefined,
  onFocus: undefined,
  onBlur: undefined,
  placeholder: undefined,
  options: [],
  pending: false,
  required: false,
  invalid: false,
  invalidMessages: [],
  disabled: false,
};

export default Select;
