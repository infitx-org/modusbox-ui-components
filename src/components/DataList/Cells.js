import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import isEqual from 'lodash/isEqual';
import Icon from '../Icon';
import Checkbox from './Checkbox';

// the icon is throwing an error, but the code and the functionality isn't broken
class ArrowCell extends Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.isSelected != this.props.selected;
	}
	render() {
		return (
			<div className="data-list-body-cell arrow-cell">
				<Icon
					size="xs"
					name="arrow-down-small"
					className={'data-list-body-arrowIcon ' + (!this.props.isSelected ? 'rotated' : '')}
				/>
			</div>
		);
	}
}

class CheckboxCell extends Component {
	constructor(props) {
		super(props);
	}
	shouldComponentUpdate(nextProps) {
		let isShowChanged = nextProps.show != this.props.show;
		let isSelectedChanged = nextProps.isSelected != this.props.isSelected;
		let isIdChanged = nextProps.id != this.props.id;
		return isShowChanged || isSelectedChanged || isIdChanged;
	}

	render() {
		const { show, id, isSelected, onMultiSelect, style } = this.props;
		return (
			<div style={style} className="data-list-body-cell data-list-body-column-cell">
				<div style={{ width: '100%' }}>
					{show && <Checkbox id={id} isSelected={isSelected} onChange={onMultiSelect} />}
				</div>
			</div>
		);
	}
}

class ListItemCell extends React.Component {
	constructor(props) {
		super(props);
		this.detectTooltipRequired = this.detectTooltipRequired.bind(this);
		this.applyTooltip = this.applyTooltip.bind(this);
		this.removeTooltip = this.removeTooltip.bind(this);
		this.showToolTip = this.showToolTip.bind(this);
		this.hideToolTip = this.hideToolTip.bind(this);

		this.hasTooltip = false;
		this.cellIndex = `${this.props.rowIndex}-${this.props.index}`;
	}
	// check if we need to apply to tooltip
	detectTooltipRequired() {
		if (this.box) {
			if (this.box.scrollWidth > this.box.offsetWidth) {
				this.applyTooltip();
			}
		}
	}
	applyTooltip() {
		this.box.addEventListener('mouseenter', this.showToolTip);
		this.box.addEventListener('mouseleave', this.hideToolTip);
		this.hasTooltip = true;
	}
	removeTooltip() {
		if (this.hasTooltip) {
			this.box.removeEventListener('mouseenter', this.showToolTip);
			this.box.removeEventListener('mouseleave', this.hideToolTip);
			this.hideToolTip();
		}
	}
	showToolTip() {
		var viewportOffset = this.cell.getBoundingClientRect();
		let screenWidth = window.screen.availWidth;
		// these are relative to the viewport, i.e. the window
		const { top, left, right } = viewportOffset;
		let width = this.box.scrollWidth;
		let overflowScreen = left + width > screenWidth;
		let text = this.props.content ? this.props.content : this.props.value;
		var p = document.createElement('div');
		p.className = 'datalist-tooltip';
		p.style.width = width;
		p.style.top = top - 30;
		p.style.left = overflowScreen ? right - width : left;
		p.id = `datalist-tooltip-${this.cellIndex}`;
		p.innerText = text;
		document.body.appendChild(p);
	}
	hideToolTip() {
		let tooltip = document.getElementById(`datalist-tooltip-${this.cellIndex}`);
		if (tooltip) {
			tooltip.parentNode.removeChild(tooltip);
		}
	}
	componentDidMount() {
		this.detectTooltipRequired();
	}
	componentDidUpdate() {
		this.removeTooltip();
		this.detectTooltipRequired();
	}
	componentWillUnmount() {
		this.removeTooltip();
	}

	shouldComponentUpdate(nextProps, nextState) {
		const iconChanged = !isEqual(nextProps.icon, this.props.icon);
		const contentChanged = !isEqual(nextProps.content, this.props.content);
		const valueChanged = !isEqual(nextProps.value, this.props.value);
		const isStyleChanged = !isEqual(nextProps.style, this.props.style);
		return iconChanged || contentChanged || valueChanged || isStyleChanged;
	}

	render() {
		const { onClick, icon, value, content, style } = this.props;
		const { name, color, size } = typeof icon === 'object' ? icon : {};
		const isContent = content != false;
		const cellContent = isContent ? content : value;

		return (
			<div style={style} className="data-list-body-cell data-list-body-column-cell" ref={cell => (this.cell = cell)}>
				<div className="data-list-body-cell-content-wrapper">
					{icon && (
						<Icon size={size || 16} name={name || ''} color={color || '#333'} className="data-list-body-cell-icon" />
					)}
					{isContent ? (
						<div className="data-list-body-cell-content"> {cellContent} </div>
					) : (
						<div className="data-list-body-cell-text" ref={box => (this.box = box)} onClick={onClick}>
							{' '}
							{cellContent}{' '}
						</div>
					)}
				</div>
			</div>
		);
	}
}

// Cell in the Header
class HeaderCell extends React.Component {
	constructor(props) {
		super(props);
		this.detectTooltipRequired = this.detectTooltipRequired.bind(this);
		this.applyTooltip = this.applyTooltip.bind(this);
		this.removeTooltip = this.removeTooltip.bind(this);
		this.showToolTip = this.showToolTip.bind(this);
		this.hideToolTip = this.hideToolTip.bind(this);
		this.pageClick = this.pageClick.bind(this);
		this.changeColumnWidthStart = this.changeColumnWidthStart.bind(this);

		this.hasTooltip = false;
		this.cellIndex = `${this.props.id}`;

		this.state = { growInput: false };
	}
	componentDidMount() {
		this.detectTooltipRequired();
		window.addEventListener('mouseup', this.pageClick, false);
	}
	componentWillUnmount() {
		this.removeTooltip();
		window.removeEventListener('mouseup', this.pageClick, false);
	}
	// check if we need to apply to tooltip
	detectTooltipRequired() {
		if (this.box) {
			if (this.box.scrollWidth > this.box.offsetWidth) {
				this.applyTooltip();
			}
		}
	}
	applyTooltip() {
		this.box.addEventListener('mouseenter', this.showToolTip);
		this.box.addEventListener('mouseleave', this.hideToolTip);
		this.hasTooltip = true;
	}
	removeTooltip() {
		if (this.hasTooltip) {
			if (this.box) {
				this.box.removeEventListener('mouseenter', this.showToolTip);
				this.box.removeEventListener('mouseleave', this.hideToolTip);
			}
			this.hideToolTip();
		}
	}
	showToolTip() {
		var viewportOffset = this.cell.getBoundingClientRect();
		let screenWidth = window.screen.availWidth;
		// these are relative to the viewport, i.e. the window
		const { top, left, right } = viewportOffset;
		let width = this.box.scrollWidth;
		let overflowScreen = left + width > screenWidth;
		let text = this.props.content ? this.props.content(this.props.column) : this.props.label;
		var p = document.createElement('div');
		p.className = 'datalist-tooltip';
		p.style.width = width;
		p.style.top = top - 30;
		p.style.left = overflowScreen ? right - width : left;
		p.id = `datalist-tooltip-${this.cellIndex}`;
		p.innerText = text;
		document.body.appendChild(p);
	}
	hideToolTip() {
		let tooltip = document.getElementById(`datalist-tooltip-${this.cellIndex}`);
		if (tooltip) {
			tooltip.parentNode.removeChild(tooltip);
		}
	}
	pageClick(evt) {
		if (this.refs['search-input'] == undefined) {
			return;
		}
		if (!this.props.isSearching) {
			return;
		}
		if (this.props.filter.value != undefined && this.props.filter.value != '') {
			return;
		}
		const area = ReactDOM.findDOMNode(this.refs['search-input']);
		if (!area.contains(evt.target)) {
			this.props.onSearchRemove(evt, this.props.label);
		}
	}

	changeColumnWidthStart(event) {
		event.stopPropagation();
		let { left, right } = this.cell.getBoundingClientRect();
		let name = this.props.content
			? this.props.content(this.props.column)
			: this.props.showLabel ? this.props.label : '';
		this.props.onTriggerResizeWidth(this.props.index, left, right, name);
	}

	componentDidUpdate(prevProps) {
		this.removeTooltip();
		this.detectTooltipRequired();

		if (prevProps.isSearching != this.props.isSearching) {
			if (this.props.isSearching) {
				this.refs['search-input'].focus();
				this.setState({ growInput: true });
			} else {
				this.setState({ growInput: false });
			}
		}
	}
	render() {
		const {
			id,
			isLastColumn,
			resizable,
			searchable,
			style,
			column,
			sortable,
			label,
			content,
			showLabel,
			isSearching,
			isSorting,
			isSortingAsc,
			onColumnClick,
			onSearchClick,
			onSearchChange,
			onSearchRemove,
		} = this.props;
		const labelContent = content ? content(column) : showLabel ? label : '';
		const isLabelEmpty = labelContent === '';
		const sortingArrowIconClassName = ['data-list-header-cell-arrowIcon', !isSortingAsc && 'rotated']
			.filter(x => typeof x === 'string')
			.join(' ');

		const sortingArrowIconBoxClassName = ['data-list-header-cell-arrowIcon-box', isLabelEmpty && 'center']
			.filter(x => typeof x === 'string')
			.join(' ');

		const columnClassNames = [
			'data-list-header-cell',
			'data-list-header-column-cell',
			isSorting ? 'isSorting ' : '',
			sortable ? 'sortable' : 'non-sortable',
			searchable ? 'searchable' : 'non-searchable',
			isSearching ? 'isSearching' : '',
		].join(' ');

		const allowResizeWidth =
			resizable && !isSearching && !((typeof style.width === 'number' && style.width < 50) || isLastColumn);
		const onRemoveFilter = e => onSearchRemove(e, label);

		return (
			<div ref={cell => (this.cell = cell)} id={id} onClick={onColumnClick} style={style} className={columnClassNames}>
				<div className="data-list-header-cell-box">
					{searchable && (
						<div
							className="data-list-header-cell-searchIcon-box"
							onClick={isSearching ? onRemoveFilter : onSearchClick}
						>
							<Icon
								size={16}
								name="search-small"
								className={'data-list-header-cell-searchIcon ' + (isSearching ? 'rotated' : '')}
							/>
						</div>
					)}
					{isSearching && (
						<div className="data-list-header-cell-searchInput-box">
							<input
								type="text"
								className={`data-list-header-cell-searchInput-input ${this.state.growInput ? 'grow' : ''} `}
								placeholder={`Search on ${label}`}
								onClick={e => e.stopPropagation()}
								onChange={e => onSearchChange(e, label)}
								/*onBlur={ onRemoveFilter } */
								ref="search-input"
							/>
							<Icon
								size={16}
								name="close-small"
								className="data-list-header-cell-searchInput-remove"
								onClick={onRemoveFilter}
							/>
						</div>
					)}
					{!isSearching &&
						!isLabelEmpty && (
							<div className="data-list-header-cell-label" ref={box => (this.box = box)}>
								{' '}
								{labelContent}{' '}
							</div>
						)}

					{isSorting && (
						<div className={sortingArrowIconBoxClassName}>
							<Icon size={16} name="arrow-down-small" className={sortingArrowIconClassName} />
						</div>
					)}
					{allowResizeWidth && (
						<div className="data-list-header-cell-holder" onClick={this.changeColumnWidthStart}>
							<div className="resize-icon">
								<div className="resizer-left" />
								<div className="resizer-right" />
							</div>
							{/*<Icon className='holder-icon' name='contextmenu' size={16} />*/}
						</div>
					)}
				</div>
			</div>
		);
	}
}

const ScrollBarCell = () => {
	return <div className="data-list-body-cell data-list-scrollbar-cell" />;
};

const ScrollBarHeaderCell = () => {
	return <div className="data-list-header-cell data-list-scrollbar-cell" />;
};
export { ArrowCell, CheckboxCell, ListItemCell, HeaderCell, ScrollBarHeaderCell, ScrollBarCell };
