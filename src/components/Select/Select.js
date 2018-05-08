import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';

import * as utils from '../../utils/common';
import keyCodes from '../../utils/keyCodes';

import Icon from '../Icon';
import { Loader, Placeholder, InvalidIcon } from '../Common';

import Options from './Options';
import Indicator from './Indicator';

class Select extends PureComponent {
  constructor(props) {
    super(props);

    this.onClickSelect = this.onClickSelect.bind(this);
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
        .includes(lowerCaseFilter));
  }
  closeSelect() {
    this.setState({ isOpen: false, filter: undefined });
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
    const getParentOverflow = (elem) => {
      const { overflowY } = window.getComputedStyle(elem.parentNode);
      if (overflowY === 'hidden') {
        return elem.parentNode;
      }
      if (overflowY === 'scroll') {
        if (elem.getBoundingClientRect().height > elem.parentNode.offsetHeight) {
          return elem.parentNode;
        }
        return elem;
      }
      if (elem.parentNode === document.body) {
        return document.body;
      }
      return getParentOverflow(elem.parentNode);
    };

    const wrapper = getParentOverflow(this.optionsPosition);
    const wrapperRect = wrapper.getBoundingClientRect();
    const { top, bottom } = this.optionsPosition.getBoundingClientRect();

    const lowerWrapper = wrapperRect.height + wrapperRect.top - top;
    const lowerInner = window.innerHeight - bottom;
    const maxLowerHeight = Math.min(lowerWrapper, lowerInner) - 10;

    const upperWrapper = top - wrapperRect.top - wrapper.parentNode.scrollTop - 45;
    const maxUpperHeight = Math.min(top, upperWrapper) - 10;
    const optionsHeight = Math.min(240, this.state.options.length * 30);
    this.reverse = maxLowerHeight > optionsHeight ? false : maxLowerHeight < maxUpperHeight;
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
        this.onSelectOption(options[this.state.highlightedOption]);
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
    this.inputFilter.focus();
    this.setState({ highlightedOption: nextHighlightedOption });
  }
  scrollToOption(index) {
    const nextOption = this.options.items.children[index];
    if (nextOption) {
      nextOption.focus();
    }
  }

  render() {
    const {
      id,
      style,
      placeholder,
      pending,
      disabled,
      invalid,
      required,
      invalidMessages,
    } = this.props;
    const {
      isOpen, selectedLabel, selected, filter, highlightedOption,
    } = this.state;
    const options = this.getOptions();

    const inputValue = filter === undefined ? selectedLabel || '' : filter;
    const isPlaceholderActive = isOpen || selectedLabel !== undefined;

    const componentClassName = utils.composeClassNames([
      'input-select__component',
      'mb-input',
      'mb-input__borders',
      'mb-input__background',
      isOpen && 'mb-input--open mb-input__borders--open mb-input__background--open',
      disabled && 'mb-input--disabled mb-input__borders--disabled mb-input__background--disabled',
      pending && 'mb-input--pending mb-input__borders--pending mb-input__background--pending',
      invalid && 'mb-input--invalid mb-input__borders--invalid mb-input__background--invalid',
      required &&
        selectedLabel === undefined &&
        'mb-input--required mb-input__borders--required mb-input__background--required',
    ]);

    const invalidIconClassName = utils.composeClassNames([
      'mb-input__inner-icon',
      'mb-input__inner-icon--invalid',
      'input-select__icon',
    ]);

    return (
      <div id={id} className="input-select mb-input__box" style={style}>
        <div
          className={componentClassName}
          onClick={this.onClickSelect}
          ref={(area) => {
            this.area = area;
          }}
          role="presentation"
        >
          <div className="mb-input__content input-select__content">
            <Placeholder label={placeholder} active={isPlaceholderActive} />

            <input
              className={`mb-input__input input-select__value ${filter ? 'has-filter' : ''}`}
              type="text"
              ref={(inputFilter) => {
                this.inputFilter = inputFilter;
              }}
              onKeyDown={this.testKey}
              onChange={this.applyFilter}
              onFocus={this.openSelect}
              onClick={this.openSelect}
              value={inputValue}
              disabled={disabled}
            />
            <input type="hidden" disabled value={JSON.stringify(options)} />

            {filter && (
              <div className="mb-input__inner-icon input-select__icon">
                <Icon size={16} name="search-small" />
              </div>
            )}
            {invalid && (
              <div className={invalidIconClassName}>
                <InvalidIcon messages={invalidMessages} />
              </div>
            )}

            <Loader visible={pending} />

            <div className="mb-input__inner-icon input-select__icon">
              <Indicator isOpen={isOpen} />
            </div>
          </div>
        </div>

        <div
          className="input-select__options"
          ref={(position) => {
            this.optionsPosition = position;
          }}
        >
          <Options
            open={isOpen}
            ref={(wrapper) => {
              this.options = wrapper;
            }}
            options={options}
            maxHeight={this.maxHeight || 0}
            reverse={this.reverse}
            selected={selected}
            highlighted={highlightedOption}
            onSelect={this.onSelectOption}
          />
        </div>
      </div>
    );
  }
}

Select.propTypes = {
  id: PropTypes.string,
  style: PropTypes.shape(),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  })),
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  pending: PropTypes.bool,
  required: PropTypes.bool,
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  invalidMessages: PropTypes.arrayOf(PropTypes.string),
};

Select.defaultProps = {
  id: undefined,
  style: {},
  selected: undefined,
  onChange: undefined,
  placeholder: undefined,
  options: [],
  pending: false,
  required: false,
  invalid: false,
  invalidMessages: [],
  disabled: false,
};

export default Select;
