import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';

import * as utils from '../../utils/common';
import keyCodes from '../../utils/keyCodes';

import Icon from '../Icon';
import { Loader, Placeholder } from '../Common';

import Options from './Options';
import Indicator from './Indicator';

import './Select.scss';

class Select extends PureComponent {
	constructor(props) {
		super(props);

		this.onClickSelect = this.onClickSelect.bind(this);
		this.onSelectOption = this.onSelectOption.bind(this);
		this.onPageClick = this.onPageClick.bind(this);
		this.onSelectFilter = this.onSelectFilter.bind(this);

		// Internal lifecycle methods
		this.setValue = this.setValue.bind(this);

		this.closeSelect = this.closeSelect.bind(this);
		this.leaveSelect = this.leaveSelect.bind(this);
		this.openSelect = this.openSelect.bind(this);
		this.testKey = this.testKey.bind(this);
		this.applyFilter = this.applyFilter.bind(this);
		this.filterOptions = this.filterOptions.bind(this);
		this.highlightNextOption = this.highlightNextOption.bind(this);
		this.handleResize = this.handleResize.bind(this);

		const { options, value } = this.props;
		const selectedItem = find(options, { value });
		const selectedLabel = selectedItem ? selectedItem.label : undefined;
		this.state = {
			isOpen: false,
			highlightedOption: 0,
			options,
			selectedLabel,
			value,
			filter: undefined,
		};
	}
	componentWillReceiveProps(nextProps) {
		const changes = {};
		const { options, value, disabled } = nextProps;

		if (value !== this.props.value) {
			const selectedItem = find(options, { value });
			const selectedLabel = selectedItem ? selectedItem.label : undefined;
			changes.value = value;
			changes.selectedLabel = selectedLabel;
			this.setValue(selectedLabel);
		}
		if (options !== this.props.options) {
			changes.options = options;
		}
		if (disabled !== this.props.disabled) {
			changes.isOpen = false;
			changes.highlightedOption = 0;
			changes.filter = undefined;
		}

		if (Object.keys(changes).length > 0) {
			this.setState(changes);
		}
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
		window.addEventListener('mouseup', this.onPageClick, false);
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
		window.removeEventListener('mouseup', this.onPageClick, false);
	}

	setValue(value) {
		this.filter.value = value;
	}
	closeSelect() {
		this.setState({ isOpen: false, filter: undefined, highlightedOption: 0 });
	}
	leaveSelect(next) {
		this.closeSelect();
		utils.focusNextFocusableElement(this.filter, next);
	}
	openSelect() {
		this.setState({ isOpen: true });
		this.handleResize();
	}
	handleResize() {
		const getParentOverflow = (elem) => {
			const { overflowY } = window.getComputedStyle(elem.parentNode);
			if (overflowY === 'hidden') {
				return elem.parentNode;
			}
			if (overflowY === 'scroll') {
				if (elem.getBoundingClientRect().height > elem.parentNode.offsetHeight) return elem.parentNode;
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
		const maxLowerHeight = Math.min(wrapperRect.height + wrapperRect.top - top, window.innerHeight - bottom) - 10;
		const maxUpperHeight = Math.min(top, top - wrapperRect.top - wrapper.parentNode.scrollTop - 45) - 10;
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
				const options = this.filterOptions();
				this.onSelectOption(options[this.state.highlightedOption]);
			} else {
				this.openSelect();
			}
		}
	}
	applyFilter() {
		const { value } = this.filter;
		this.setState({ filter: value, isOpen: true });
		if (value === '') {
			this.setState({
				selectedLabel: undefined,
				value: undefined,
			});
			this.openSelect();
		}
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

		this.options.items.children[nextHighlightedOption].focus();
		this.filter.focus();
		this.setState({ highlightedOption: nextHighlightedOption });
	}

	// when clicking on the page
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
			this.filter.blur();
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
		this.filter.focus();
	}

	// when selecting the options item itself
	onSelectOption({ value } = {}) {
		if (value == undefined) {
			return;
		}
		const selectedItem = find(this.state.options, { value });
		const selectedLabel = selectedItem ? selectedItem.label : undefined;
		this.setState({
			filter: undefined,
			value,
			selectedLabel,
		});
		this.setState({ isOpen: false });
		if (typeof this.props.onChange === 'function') {
			this.props.onChange(value);
		}
	}
	filterOptions() {
		const { options, filter } = this.state;
		if (filter == undefined || filter == '') {
			return options;
		}
		return options.filter(item => item.label.includes(filter));
	}

	render() {
		const {
			id, style, placeholder, pending, disabled, invalid, required,
		} = this.props;
		const {
			isOpen, selectedLabel, value, filter, highlightedOption,
		} = this.state;

		const inputValue = filter || selectedLabel || '';
		const isPlaceholderActive = isOpen || selectedLabel != undefined;

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

		return (
			<div id={id} className="input-select mb-input__box" style={style}>
				<div className={componentClassName} onClick={this.onClickSelect} ref={area => (this.area = area)}>
					<div className="mb-input__content input-select__content">
						<Placeholder label={placeholder} active={isPlaceholderActive} />

						<input
							className={`mb-input__input input-select__value ${filter ? 'has-filter' : ''}`}
							type="text"
							ref={filter => (this.filter = filter)}
							onKeyDown={this.testKey}
							onChange={this.applyFilter}
							onFocus={this.openSelect}
							onClick={this.openSelect}
							value={inputValue}
							disabled={disabled}
						/>

						{filter && (
							<div className="mb-input__inner-icon input-select-mb-input__icon">
								<Icon name="search-small" size={16} />
							</div>
						)}

						<Loader visible={pending} />

						<div className="mb-input__inner-icon input-select-mb-input__icon">
							<Indicator isOpen={isOpen} />
						</div>
					</div>
				</div>

				<div className="input-select__options" ref={position => (this.optionsPosition = position)}>
					<Options
						open={isOpen}
						ref={options => (this.options = options)}
						options={this.filterOptions()}
						maxHeight={this.maxHeight || 0}
						reverse={this.reverse}
						selected={value}
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
	style: PropTypes.object,
	value: PropTypes.string,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
	})),
	selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
	pending: PropTypes.bool,
	required: PropTypes.bool,
	invalid: PropTypes.bool,
	disabled: PropTypes.bool,
};

Select.defaultProps = {
	id: 'select',
	style: {},
	value: undefined,
	onChange: undefined,
	placeholder: undefined,
	options: [],
	selected: undefined,
	pending: false,
	required: false,
	invalid: false,
	disabled: false,
};

export default Select;
