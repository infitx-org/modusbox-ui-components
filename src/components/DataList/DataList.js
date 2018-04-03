import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import isEqual from 'lodash/isEqual';
import orderBy from 'lodash/orderBy';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

import Column from '../Column';
import Row from '../Row';
import TextField from '../TextField';
import Icon from '../Icon';

import { NotifyResize } from 'react-notify-resize';
import './DataList.scss';

import ScrollBar from '../ScrollBox/ScrollBar';
import Link from './Link';
import Header from './Header';
import ListItem from './ListItem';

const SpinnerBox = ({ id = 'element-datalist__pending-box' }) => (
	<div id={`${id}`} style={{ width: '100%' }}>
		<Row align="center center" className="loading-box">
			<Icon size={16} className="loading-spinner" name="warning-sign" />
			{/*<Spinner size='s' className='loading-spinner'/>*/}
		</Row>
	</div>
);

const ErrorBox = ({ id = 'element-datalist__error-box', message }) => (
	<div id={`${id}`} className="element-datalist__error-box">
		<Icon size={50} name="settings" fill="#ccc" />
		<span style={{ color: '#ccc', fontSize: 20, marginLeft: 10 }}> Service Unavailable </span>
	</div>
);

const NoDataBox = ({ message }) => (
	<div className="element-datalist__message-box">
		<Icon name="dashboard" size={40} fill="#ccc" />
		<span style={{ color: '#ccc', fontSize: 20, marginLeft: 10 }}>{message}</span>
	</div>
);

const OverlayColumnResizer = props => (
	<div
		className={`overlay-column-resizer ${props.isMinimumWidth && 'minimum'}`}
		style={{ left: props.start, width: props.stop }}
	>
		<div className="overlay-column-resizer-label">{props.name}</div>
	</div>
);

const Paging = props => {
	const { selected, qty } = props;
	const betweenPages = Math.max(qty - 2, 0);
	const siblings = new Array(betweenPages).fill(0).map((i, idx) => ({ value: idx + 1, label: idx + 2 }));
	const translation = -(Math.min(Math.max(0, qty - 7), Math.max(0, selected - 3)) * 38);

	return (
		<div className="paging-box">
			{qty > 0 && <Page onClick={() => props.onSelect(0)} label={1} value={0} isSelected={selected === 0} />}
			<div className="paging-scroller-box">
				<div className="paging-scroller " style={{ transform: `translate3d(${translation}px,0px,0px)` }}>
					{siblings.map((item, index) => (
						<Page
							onClick={() => props.onSelect(item.value)}
							key={index}
							isSelected={selected === item.value}
							label={item.label}
							value={item.value}
						/>
					))}
				</div>
			</div>
			{qty > 1 && (
				<Page onClick={() => props.onSelect(qty - 1)} label={qty} value={qty - 1} isSelected={selected === qty - 1} />
			)}
		</div>
	);
};
const Page = ({ onClick, label, value, isSelected }) => (
	<div onClick={onClick} className={`paging-page ${isSelected && 'selected'}`}>
		{label}
	</div>
);
//////////////////////////////////////////////////////////

class ListItems extends React.Component {
	constructor(props) {
		super(props);

		// internal method for sorting, filtering and async loading
		this.getSortingKey = this.getSortingKey.bind(this);
		this.getFilteringColumn = this.getFilteringColumn.bind(this);
		this.getScrollBarWidth = this.getScrollBarWidth.bind(this);
		this.renderNextChunk = this.renderNextChunk.bind(this);
		this.renderPrevChunk = this.renderPrevChunk.bind(this);
		this.getTotalHeight = this.getTotalHeight.bind(this);
		this.getItemHeight = this.getItemHeight.bind(this);
		this.storeHeights = this.storeHeights.bind(this);
		this.resizeList = this.resizeList.bind(this);
		this.parseData = this.parseData.bind(this);
		this.getFilteredData = this.getFilteredData.bind(this);
		this.getData = this.getData.bind(this);
		this.sortList = this.sortList.bind(this);
		this.filterList = this.filterList.bind(this);
		this.getPageQty = this.getPageQty.bind(this);
		this.detectMainMultiselected = this.detectMainMultiselected.bind(this);
		this.getAllItemIds = this.getAllItemIds.bind(this);
		this.updateScrollbar = this.updateScrollbar.bind(this);

		// exposed methods to HTML components
		this.handleMultiSelect = this.handleMultiSelect.bind(this);
		this.handleMultiSelectAll = this.handleMultiSelectAll.bind(this);
		this.handleColumnClick = this.handleColumnClick.bind(this);
		this.handleSearchClick = this.handleSearchClick.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleSearchRemove = this.handleSearchRemove.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.handleResize = this.handleResize.bind(this);
		this.handleResizeColumnWidth = this.handleResizeColumnWidth.bind(this);
		this.handleStartResizeColumnWidth = this.handleStartResizeColumnWidth.bind(this);
		this.handleStopResizeColumnWidth = this.handleStopResizeColumnWidth.bind(this);
		this.changePage = this.changePage.bind(this);
		this.pageClick = this.pageClick.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.prevPage = this.prevPage.bind(this);

		// internal
		this.heights = [];
		this.lastScrollPosition = undefined;
		this.lastSelectedIndex = undefined;
		this.isNewData = true;
		this.api = this.props.api;
		this.updateListTimeout = undefined;
		this.filterTimeout = undefined;
		this.noPointerEventsTimeout = undefined;
		this._reqProcessed = 0;
		this._reqNumber = 0;

		// computations to set the initial state
		let hasChildren = this.props.childrens != undefined;
		let hasMultiSelect = this.props.multiSelect;
		let sortKey = this.getSortingKey(this.props.sortColumn);
		let sortAsc = this.props.sortAsc;
		/*let scrollbarWidth = this.props.showScrollbar ? 0 : this.getScrollBarWidth()*/
		let scrollbarWidth = this.getScrollBarWidth();
		let hasPages = typeof this.props.paging != 'undefined';
		let pageQty = this.getPageQty(this.props.list);

		// detect if it uses internal data or has function to async retrieve data
		let list = [],
			currentList = [];
		if (this.props.hasInfiniteScrolling != true) {
			list = this.sortList(this.props.list, sortKey, sortAsc);
			if (hasPages) {
				currentList = this.changePage(0, list).currentList;
			} else {
				currentList = list;
			}
		}

		const isLoadingNewData = this.props.hasInfiniteScrolling ? true : false;

		const ITEMS_NUMBER = 50;
		const ITEMS_TO_SHOW = 100;

		this.state = {
			// list related properties flags
			endOfData: false,
			isUpdating: false,
			apiError: false,
			isLoadingNewData,
			isSortingData: false,
			isFilteringData: false,

			// list related properties values
			itemsNumber: ITEMS_NUMBER,
			itemsToShow: ITEMS_TO_SHOW,
			currentIndexStart: 0,
			currentIndexStop: ITEMS_TO_SHOW,
			compensatorIndex: 0,
			list: list,
			currentList: currentList,
			columns: this.props.columns,
			multiSelected: [],

			// Item related state
			forceRenderItems: false,

			// SEARCHING
			filters: [],

			// Sorting
			sortKey: sortKey,
			sortLabel: this.props.sortColumn,
			sortAsc: sortAsc,
			hasChildren: hasChildren,
			hasMultiSelect: hasMultiSelect,

			// Paging
			hasPages: hasPages,
			pageQty: pageQty,
			page: 0,

			// Composite HTML rules related state
			scrollbarWidth: scrollbarWidth,
			isScrollbarVisible: false,
			bodyWidth: `calc(100% + ${scrollbarWidth}px)`,
			listWidth: 0,

			// Css style related state
			isOverlayColumnVisible: false,
			isResizingColumn: false,
			isMinimumWidth: false,
			resizingColumnIndex: 0,
			cellLeftPosition: 0,
			cellName: '',
			cellWidth: 0,
			style: this.props.style,
		};
	}

	componentDidMount() {
		this.isComponentMounted = true;

		if (this.isNewData) {
			this.isNewData = false;
		}

		if (this.props.showScrollbar) {
			window.addEventListener('resize', this.updateScrollbar);
			this.scroller.addEventListener('scroll', this.updateScrollbar);
			this.updateScrollbar();
		}

		this.scroller.addEventListener('scroll', this.handleScroll);
		// don't apply external loading data logic if it is a static table
		if (this.props.hasInfiniteScrolling) {
			this.getData({ count: this.state.itemsToShow });
		}
	}

	componentWillUnmount() {
		this.isComponentMounted = false;
		if (this.props.showScrollbar) {
			window.removeEventListener('resize', this.updateScrollbar);
			this.scroller.removeEventListener('scroll', this.updateScrollbar);
		}

		// don't apply external loading data logic if it is a static table
		//if( ! this.props.hasInfiniteScrolling ) return
		this.scroller.removeEventListener('scroll', this.handleScroll);
	}

	componentDidUpdate(prevProps, prevState) {
		this.updateScrollbar();
		if (this.lastScrollPosition != undefined) {
			this.scroller.scrollTop = this.lastScrollPosition;
		}

		if (this.isNewData) {
			this.isNewData = false;
		}
		// push the new heights and store them
		if (this.hasUpdatedPreviousItems) {
			this.hasUpdatedPreviousItems = false;
		}
		if (this.hasUpdatedNewItems) {
			this.hasUpdatedNewItems = false;
		}
		if (this.avoidNextScroll) {
			this.avoidNextScroll = false;
		}
		if (this.state.forceRenderItems) {
			this.setState({ forceRenderItems: false });
		}

		this.storeHeights(this.state.currentIndexStart, this.state.currentIndexStop);
	}

	componentWillReceiveProps(nextProps) {
		const forceUpdateList = !isEqual(this.props.forceUpdate, nextProps.forceUpdate);
		const forceRenderItems = !isEqual(this.props.forceRender, nextProps.forceRender);
		const multiSelectChanged = !isEqual(this.state.multiSelected, nextProps.multiSelected);
		const forceUpdateColumns = !isEqual(this.state.forceColumnUpdate, nextProps.forceColumnUpdate);

		if (forceUpdateColumns) {
			this.setState({ columns: nextProps.columns });
		}
		if (forceRenderItems) {
			this.setState({ forceRenderItems });
		}
		if (multiSelectChanged) {
			this.setState({
				forceRenderItems: true,
				multiSelected: nextProps.multiSelected,
			});
		}
		if (forceUpdateList) {
			this.setState({
				isLoadingNewData: true,
				apiError: false,
				multiSelected: [],
			});
			clearTimeout(this.updateListTimeout);
			this.updateListTimeout = setTimeout(() => this.getData(), 300);
		}

		if (!this.props.hasInfiniteScrolling) {
			// if list changed we need to re-render
			if (!isEqual(nextProps.list, this.state.list)) {
				let newList = this.sortList(nextProps.list, this.state.sortKey, this.state.sortAsc);
				this.setState({
					list: nextProps.list,
					currentList: newList,
					pageQty: this.getPageQty(nextProps.list),
				});
			}
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		const isNotforceRenderItems = this.state.forceRenderItems === true && nextState.forceRenderItems === false;
		return !isNotforceRenderItems;
	}

	///////////////////////////////////////////////////////////////////

	updateScrollbar() {
		if (!this.props.showScrollbar) return;
		const { scrollTop } = this.scroller;
		const { height } = this.scroller.getBoundingClientRect();
		const contentHeight = this.rows.getBoundingClientRect().height;
		const offset = this.state.compensatorIndex;

		if (this.scrollbar) {
			this.scrollbar.setPosition({
				scrollTop,
				offset,
				contentHeight,
				height,
			});
		}

		const barHeight = height / contentHeight * 100;
		const showScrollbar = barHeight < 100;

		if (showScrollbar != this.state.isScrollbarVisible) {
			this.setState({
				isScrollbarVisible: showScrollbar,
				forceRenderItems: true,
			});
		}
	}

	getPageQty(list) {
		return -Math.floor(-(list || []).length / 50);
	}
	changePage(page, list) {
		const sourceList = list || this.state.list;
		const sourceListLength = sourceList.length;
		// get last available page if new number of pages is minor than selected page number
		if (sourceList.length <= page * 50) {
			page = Math.floor(sourceList.length / 50);
		}
		const currentList = sourceList.slice(page * 50, (page + 1) * 50);

		return { currentList, page };
	}
	pageClick(page) {
		const filteredList = this.filterList(this.state.list, this.state.filters);
		const { currentList } = this.changePage(page, filteredList);
		this.setState({
			currentList,
			page,
		});
	}

	nextPage() {
		if (this.state.page < this.state.pageQty - 1) {
			this.pageClick(this.state.page + 1);
			this.scroller.scrollTop = 0;
		}
	}
	prevPage() {
		if (this.state.page > 0) {
			this.pageClick(this.state.page - 1);
			const { height } = this.scroller.getBoundingClientRect();
			this.scroller.scrollTop = height;
		}
	}

	resizeList(dimensions) {
		if (this.state.listWidth != dimensions.width) {
			this.setState({
				listWidth: dimensions.width,
				forceRenderItems: true,
			});
		}
	}
	getFilteredData(filters) {
		clearTimeout(this.filterTimeout);
		this.filterTimeout = setTimeout(() => {
			const orderBy = this.getSortingKey(this.state.sortLabel);
			const updateConfig = {
				offset: 0,
				orderBy,
				desc: !this.state.sortAsc,
				filters: filters,
			};
			this.getData(updateConfig, false);
		}, 300);

		return {
			forceRenderItems: true,
			isFilteringData: true,
			currentList: [],
		};
	}
	getData(cfg = {}, isPartialRequest = false) {
		// config object for retrieving data with some flags
		const config = {
			api: this.props.api,
			wrapper: this.props.wrapper,
			count: this.state.itemsToShow,
			offset: 0,
			orderBy: this.state.sortKey,
			desc: !this.state.sortAsc,
			filters: this.state.filters,
			...cfg,
		};

		const reqN = ++this._reqNumber;

		this.props
			.update(config)
			.then(json => {
				if (this.props.wrapper) return this.props.wrapper(json);
				else return json;
			})
			.then(data => {
				this._reqProcessed++;
				if (isPartialRequest) {
					this.renderNextChunk(data, false);
				} else {
					this.parseData(data, reqN);
				}
			})
			.catch(err => {
				if (!this.isComponentMounted) return;

				let errorMsg;
				if (err.status != undefined && err.statusText != undefined) errorMsg = `${err.status} ${err.statusText}`;
				else errorMsg = 'Service unavailable';

				this.setState({
					apiError: errorMsg,
					isUpdating: false,
					isLoadingNewData: false,
					isFilteringData: false,
				});
				if (!isPartialRequest) {
					this._reqProcessed++;
				}
			});
	}

	parseData(data, reqN) {
		// loading data logic
		if (!this.isComponentMounted) return;
		if (this._reqProcessed != this._reqNumber) {
			return;
		}
		// everytime we change the scroll position, the handler is called,
		// it is necesssary to avoid it when refreshing data
		this.avoidNextScroll = true;
		if (this.scroller) {
			this.lastScrollPosition = 0;
		}

		this.isNewData = true;

		this.setState({
			currentList: data,
			list: data,
			isLoadingNewData: false,
			isSortingData: false,
			isFilteringData: false,
			currentIndexStart: 0,
			currentIndexStop: this.state.itemsToShow,
			compensatorIndex: 0,
		});
	}

	getScrollBarWidth() {
		var outer = document.createElement('div');
		var inner = document.createElement('div');
		outer.style.visibility = 'hidden';
		outer.style.width = '100px';
		outer.style.overflow = 'scroll';
		outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
		inner.style.width = '100%';
		outer.appendChild(inner);
		document.body.appendChild(outer);
		var widthNoScroll = outer.offsetWidth;
		var widthWithScroll = inner.offsetWidth;
		outer.parentNode.removeChild(outer);
		return widthNoScroll - widthWithScroll;
	}

	getSortingKey(label) {
		let sortingKey = undefined;

		// if the label is a string, get the column for that label and set the item key
		if (label != undefined) {
			let columns = this.props.columns.filter(col => col.label === label);
			if (columns.length) {
				if (columns[0].sortable === false) sortingKey = false;
				else sortingKey = columns[0].key;
			}
		}

		return sortingKey;
	}

	getFilteringColumn(label) {
		// if the label is a string, get the column for that label and set the item key
		if (label != undefined) return find(this.props.columns, { label });
		else return undefined;
	}

	sortList(list, key, asc) {
		return orderBy(list, key, asc ? 'asc' : 'desc');
	}

	filterList(list, filters) {
		if (filters.length === 0) {
			return list;
		}

		return filters.reduce((list, filter) => {
			const pattern = filter.value;

			if (pattern === '' || typeof pattern === 'undefined') {
				return list;
			}

			const column = this.getFilteringColumn(filter.label);
			const key = column != undefined && column.searchable ? column.key : undefined;

			if (!key) {
				return [];
			}

			// custom search function described outside this component
			if (column.search) {
				return list.filter(item => column.search(pattern.toLowerCase(), item[key], item));
			}

			const chunks = pattern
				.toLowerCase()
				.split(' ')
				.filter(c => c != '');
			const filtered = list.filter(item => {
				const field = item[key];
				const value = field != undefined ? (column.func != undefined ? column.func(field, item) : field) : '';
				return chunks.every(chunk =>
					value
						.toString()
						.toLowerCase()
						.includes(chunk)
				);
			});

			return filtered;
		}, list);
	}

	handleScroll() {
		this.rows.classList.add('remove-pointer-events');
		clearTimeout(this.noPointerEventsTimeout);
		this.noPointerEventsTimeout = setTimeout(() => this.rows.classList.remove('remove-pointer-events'), 50);
		// detect scroll direction
		const { scrollTop } = this.scroller;
		const isScrollingDown = scrollTop > (this.lastScrollPosition || 0);
		this.lastScrollPosition = this.scroller.scrollTop;

		if (isScrollingDown) {
			if (this.avoidNextScroll) return;
			if (this.state.isUpdating) return;

			const totalHeight = this.getTotalHeight();
			const pixelsToEnd = totalHeight - (scrollTop + this.scroller.offsetHeight);

			if (this.state.hasPages) {
				if (pixelsToEnd === 0 && this.state.hasPages) {
					this.nextPage();
				}
				return;
			}

			// handle scrolling down
			// when top is close to 0 it means we need to get new data
			if (pixelsToEnd < 1000 && this.state.endOfData != this.state.currentIndexStop) {
				// stop here if
				if (this.state.list.length < this.state.currentIndexStop) return;

				this.setState({ isUpdating: true });
				this.hasUpdatedNewItems = false;

				// detect data is cached otherwise api call
				if (this.state.list.length >= this.state.currentIndexStop + this.state.itemsNumber) {
					let data = this.state.list.slice(
						this.state.currentIndexStop,
						this.state.currentIndexStop + this.state.itemsNumber
					);
					this.renderNextChunk(data, true);
				} else {
					this.getData({ offset: this.state.currentIndexStop }, true);
				}
			}
		} else {
			const pixelsToStart = scrollTop - this.state.compensatorIndex;

			if (this.state.hasPages) {
				if (pixelsToStart === 0 && this.state.hasPages) {
					this.prevPage();
				}
				return;
			}
			// handle scroll up
			if (pixelsToStart < 1000 && this.state.currentIndexStart > 0) {
				this.setState({ isUpdating: true });
				this.hasUpdatedPreviousItems = false;
				this.renderPrevChunk();
			}
		}
	}

	getTotalHeight(limit = false) {
		let height = this.state.compensatorIndex;
		let listLength = this.state.currentList.length;
		limit = limit && limit < listLength ? limit : listLength;

		for (var i = 0; i < limit; i++) {
			height += this.getItemHeight(i);
		}

		return height;
	}

	getItemHeight(index) {
		return this[index + '-reference'].item.clientHeight;
	}

	storeHeights(start, stop) {
		for (var i = 0; i < stop - start && i < this.state.currentList.length; i++) {
			let itemIndex = start + i;
			this.heights[itemIndex] = this.getItemHeight(i);
		}
	}

	renderPrevChunk() {
		// get the indexes
		let start = this.state.currentIndexStart - this.state.itemsNumber;
		let stop = start + this.state.itemsToShow;

		// set the current list, no need to changes the whole list
		let newCurrentList = this.state.list.slice(start, stop);
		let elementsHeight = 0;

		// get the new elements height and remove it from the
		// total compensation value to keep the same scrolling position
		for (var i = start; i < start + this.state.itemsNumber; i++) {
			elementsHeight += this.heights[i];
		}

		let newCompensatorIndex = this.state.compensatorIndex - elementsHeight;

		this.hasUpdatedPreviousItems = true;
		this.setState({
			isUpdating: false,
			currentIndexStart: start,
			currentIndexStop: stop,
			currentList: newCurrentList,
			compensatorIndex: newCompensatorIndex,
		});
	}

	renderNextChunk(data, wasCached) {
		// there is no more data
		let endOfData = data.length == 0 ? this.state.currentIndexStop : false;

		// describe the changes to apply to the state
		let changes = {
			endOfData: endOfData,
			isUpdating: false,
		};

		if (endOfData === false) {
			let newList = [...this.state.list];

			// get the new indexes for showing items
			let start = this.state.currentIndexStart + this.state.itemsNumber;
			let stop = start + this.state.itemsToShow;

			if (!wasCached) {
				// updates the whole store list just if data was fetched new
				newList = [...newList, ...data];
				changes.list = newList;
			}

			// set new lists and new blank elements
			let newCurrentList = newList.slice(start, stop);
			let newcompensatorIndex = this.getTotalHeight(this.state.itemsNumber);

			changes = {
				...changes,
				currentIndexStart: start,
				currentIndexStop: stop,
				currentList: newCurrentList,
				compensatorIndex: newcompensatorIndex,
			};
			this.hasUpdatedNewItems = true;
		}

		// set the new state
		this.setState(changes);
	}

	// handle resize on list items
	handleResize(index, height) {
		let itemIndex = this.state.currentIndexStart + index;
		this.heights[itemIndex] = this.getItemHeight(index);

		if (this.lastSelectedIndex != undefined && this.lastSelectedIndex != itemIndex) {
			// detect if the items is part of the first set which doesn't require calculation in compensation
			// get the difference between the last element height and its new height
			let isFirstSetItem = itemIndex < this.state.itemsToShow;
			if (!isFirstSetItem) {
				let difference = this.heights[this.lastSelectedIndex] - 41;
				let newCompensatorIndex = this.state.compensatorIndex - difference;
				this.scroller.scrollTop -= difference;
				this.setState({ compensatorIndex: newCompensatorIndex });
			}
			this.heights[this.lastSelectedIndex] = 41;
		}

		this.lastSelectedIndex = itemIndex;
	}

	// resort the table when changing and filter the current list
	handleColumnClick(label) {
		let nextSortKey = this.getSortingKey(label);
		let nextSortAsc = this.state.sortLabel === label ? !this.state.sortAsc : true;
		if (nextSortKey === false) return;

		let changes = {
			sortAsc: nextSortAsc,
			sortKey: nextSortKey,
			sortLabel: label,
		};

		// update externally if necessary or just reorder the list internally
		if (this.props.hasInfiniteScrolling) {
			const updateConfig = {
				offset: 0,
				orderBy: nextSortKey,
				desc: !nextSortAsc,
			};

			this.getData(updateConfig);
			changes.isSortingData = true;
		} else {
			if (this.state.hasPages) {
				// sort all records
				const sortedList = nextSortKey ? this.sortList(this.state.list, nextSortKey, nextSortAsc) : list;
				const filteredList = this.filterList(sortedList, this.state.filters);
				const { currentList } = this.changePage(this.state.page, filteredList);
				changes.list = sortedList;
				changes.pageQty = this.getPageQty(filteredList);
				changes.currentList = currentList;
			} else {
				changes.currentList = nextSortKey ? this.sortList(this.state.currentList, nextSortKey, nextSortAsc) : list;
			}
		}

		this.setState(changes);
	}

	handleSearchClick(evt, label) {
		evt.stopPropagation();
		const [filter] = this.state.filters.filter(filter => filter.label === label);
		if (filter) {
			this.handleSearchRemove(evt, label);
		} else {
			this.setState({
				filters: this.state.filters.concat({ label: label, value: undefined }),
			});
		}
	}

	handleSearchChange(evt, label) {
		const { value } = evt.target;
		let changes = {};
		// replace the value for that filter
		const filters = [...this.state.filters];
		const index = findIndex(filters, { label });
		filters[index].value = value;
		changes.filters = filters;

		if (this.props.hasInfiniteScrolling) {
			const addChanges = this.getFilteredData(filters);
			changes = {
				...changes,
				...addChanges,
			};
		} else {
			// filter the list
			let pageQty = undefined;
			let filteredList = this.filterList(this.state.list, filters);
			let newPage = this.state.page;
			if (this.state.hasPages) {
				pageQty = this.getPageQty(filteredList);
				const { currentList, page } = this.changePage(this.state.page, filteredList);
				filteredList = currentList;
				newPage = page;
			}
			changes.currentList = filteredList;
			changes.pageQty = pageQty;
			changes.page = newPage;
		}

		this.setState(changes);
	}
	handleSearchRemove(evt, label) {
		evt.stopPropagation();
		const index = findIndex(this.state.filters, { label });
		const filters = [...this.state.filters.slice(0, index), ...this.state.filters.slice(index + 1)];
		let changes = {
			filters,
			pageQty: this.getPageQty(this.state.list),
		};
		if (this.props.hasInfiniteScrolling) {
			const addChanges = this.getFilteredData(filters);
			changes = {
				...changes,
				...addChanges,
			};
		} else {
			changes.currentList = this.filterList(this.state.list, filters);
		}
		this.setState(changes);
	}

	handleStartResizeColumnWidth(cellIndex, cellStart, cellStop, cellName) {
		let { left, right } = this.datalist.getBoundingClientRect();
		this.setState({
			isResizingColumn: true,
			resizingColumnIndex: cellIndex,
			cellLeftPosition: cellStart - left,
			cellWidth: cellStop - cellStart,
			cellName: cellName,
			isOverlayColumnVisible: true,
		});
	}
	handleStopResizeColumnWidth(event) {
		if (this.state.isResizingColumn) {
			event.stopPropagation();
			event.nativeEvent.stopImmediatePropagation();

			let columns = [...this.state.columns];

			for (var i = 0; i < this.state.resizingColumnIndex; i++) {
				if (this.state.columns[i].width && this.state.columns[i].width < 100) {
					continue;
				}
				let cell = this.header[`headerCell${i}`];
				const domNode = ReactDOM.findDOMNode(cell);
				let { left, right } = domNode.getBoundingClientRect();
				columns[i].width = right - left;
			}

			columns[this.state.resizingColumnIndex].width = this.state.cellWidth;

			let arrowCellWidth = this.state.hasChildren ? 40 : 0;
			let multiSelectWidth = this.state.hasMultiSelect ? 40 : 0;
			let fixedPxAmount = multiSelectWidth + arrowCellWidth + columns.reduce((a, b) => (b.width ? b.width + a : a), 0);
			let columnsAutoWidthNumber = columns.filter((col, index) => col.width == undefined).length;
			let columnPerc = 100 / columnsAutoWidthNumber;
			let columnPxToRemove = fixedPxAmount / columnsAutoWidthNumber;
			let style = {
				multiSelectColumn: { width: multiSelectWidth + 'px', padding: '9px' },
				arrowColumn: { width: arrowCellWidth },
				dataColumn: {
					width: 'calc(' + columnPerc + '%' + ' - ' + columnPxToRemove + 'px )',
				},
			};

			this.setState({
				style,
				columns,
				isResizingColumn: false,
				isOverlayColumnVisible: false,
				forceRenderItems: true,
			});
		}
	}
	handleResizeColumnWidth(event) {
		if (this.state.isResizingColumn) {
			var currentX = 10 + event.nativeEvent.clientX - this.datalist.getBoundingClientRect().left;
			var diff = Math.max(currentX - this.state.cellLeftPosition, 100);
			this.setState({
				cellWidth: diff,
				isMinimumWidth: diff == 100,
			});
		}
	}

	handleMultiSelect(item) {
		let { id } = item;
		let arrayIds = [...this.state.multiSelected];
		if (arrayIds.includes(id)) {
			const pos = arrayIds.indexOf(id);
			arrayIds.splice(pos, 1);
		} else {
			arrayIds.push(id);
		}
		this.setState({
			multiSelected: arrayIds,
		});

		this.props.onMultiSelect(arrayIds);
	}

	handleMultiSelectAll() {
		let multiSelected = this.getAllItemIds();
		if (this.detectMainMultiselected()) {
			multiSelected = [];
		}

		this.setState({
			multiSelected,
		});

		this.props.onMultiSelect(multiSelected);
	}
	getAllItemIds() {
		const filterItems = typeof this.props.showMultiSelect === 'function' ? this.props.showMultiSelect : item => item;
		return this.state.list.filter(filterItems).map(item => item.id);
	}

	detectMainMultiselected() {
		const allItemIds = this.getAllItemIds();
		const allSelectedIds = this.state.multiSelected;
		return (
			allItemIds.length > 0 &&
			allItemIds.length === allSelectedIds.length &&
			allItemIds.every(id => allSelectedIds.includes(id))
		);
	}

	render() {
		const { list, currentList, apiError, filters } = this.state;
		const { allowFilter } = this.props;

		const hasMultiSelectFilter = typeof this.props.showMultiSelect === 'function';
		const isLoading = this.state.isLoadingNewData;
		const isSorting = this.state.isSortingData;
		const isFiltering = this.state.isFilteringData;
		const isMainMultiSelected = this.detectMainMultiselected();
		const isNoData = list.length === 0 && !isLoading && !apiError && !allowFilter;
		const isNoDataInfiniteUnfiltered =
			allowFilter && currentList.length === 0 && !isLoading && !apiError && filters.length == 0;
		const isNoDataInfiniteFiltered =
			allowFilter && currentList.length === 0 && !isLoading && !apiError && filters.length > 0;
		const isSortingOrFiltering = isSorting || isFiltering;
		const hideList = (isNoDataInfiniteUnfiltered && !isFiltering) || isNoData || isLoading || apiError;
		const isNoDataInfiniteUnfilteredNotFiltering = isNoDataInfiniteUnfiltered && !isFiltering;

		return (
			<div
				className="element-datalist__wrapper"
				ref={datalist => (this.datalist = datalist)}
				onMouseMove={this.handleResizeColumnWidth}
				onClick={this.handleStopResizeColumnWidth}
			>
				{/*Resize detector*/}
				<NotifyResize onResize={this.resizeList} />

				{/* Loading data */}
				{isLoading && <SpinnerBox id={`${this.props.id}-pending-box`} />}

				{/* Empty table */}
				{(isNoData || isNoDataInfiniteUnfilteredNotFiltering) && <NoDataBox message={this.props.noData} />}

				{/* API ERROR */}
				{apiError && <ErrorBox message={apiError} />}

				<div className="element-datalist" id={this.props.id} style={hideList ? { display: 'none' } : undefined}>
					{this.state.isOverlayColumnVisible && (
						<OverlayColumnResizer
							start={this.state.cellLeftPosition}
							stop={this.state.cellWidth}
							isMinimumWidth={this.state.isMinimumWidth}
							name={this.state.cellName}
						/>
					)}
					<Header
						ref={header => (this.header = header)}
						id={this.props.id}
						hasChildren={this.state.hasChildren}
						hasMultiSelect={this.state.hasMultiSelect}
						onMultiSelectAll={this.handleMultiSelectAll}
						allSelected={isMainMultiSelected}
						someSelected={isMainMultiSelected == false && this.state.multiSelected.length}
						style={this.state.style}
						originalColumns={this.props.columns}
						columns={this.state.columns}
						filters={this.state.filters}
						sortLabel={this.state.sortLabel}
						isSortingAsc={this.state.sortAsc}
						onColumnClick={this.handleColumnClick}
						onSearchClick={this.handleSearchClick}
						onSearchChange={this.handleSearchChange}
						onSearchRemove={this.handleSearchRemove}
						onTriggerResizeWidth={this.handleStartResizeColumnWidth}
						showScrollbar={this.state.isScrollbarVisible}
					/>

					{/* Sorting */}
					{isSortingOrFiltering && <SpinnerBox id={`${this.props.id}-pending-box`} />}

					<div className="central-box" style={{ display: isSortingOrFiltering ? 'none' : 'flex' }}>
						<Paginator
							show={this.hasUpdatedNewItems}
							hide={this.hasUpdatedPreviousItems}
							start={this.state.currentIndexStart}
							stop={this.state.currentIndexStop}
							position={5}
							direction="down"
						/>

						<div
							ref={scroller => (this.scroller = scroller)}
							className="element-datalist__body-box"
							style={{
								width: this.state.bodyWidth,
								paddingRight: this.state.scrollbarWidth,
								display: this.state.isLoadingNewData ? 'hidden' : 'block',
							}}
						>
							<div
								id="compensator"
								style={{
									height: this.state.compensatorIndex,
									width: '100%',
									background: '#fff',
								}}
							/>

							<div
								ref={rows => (this.rows = rows)}
								style={{ width: this.state.bodyWidth }}
								className="element-datalist__body-rows"
							>
								{this.state.currentList.map((item, i) => {
									let style = { ...this.state.style, ...item.style };
									const isSelected = this.props.selected === item.id;
									const onItemClick = isSelected ? this.props.onUnselect : this.props.onSelect;
									const isMultiSelected = this.state.multiSelected.includes(item.id);
									const showMultiSelect = hasMultiSelectFilter ? this.props.showMultiSelect(item) : true;

									// detect necessary fade-in animation
									const isNewData = this.isNewData;
									const isAnimatingUp = (this.hasUpdatedPreviousItems && i < this.state.itemsNumber) || false;
									const isAnimatingDown = (this.hasUpdatedNewItems && i >= this.state.itemsNumber) || false;
									const animateItem = isAnimatingUp || isAnimatingDown || isNewData;

									return (
										<ListItem
											ref={item => (this[i + '-reference'] = item)}
											key={i.toString()}
											index={i}
											style={style}
											rowStyle={this.props.rowStyle}
											originalColumns={this.props.columns}
											columns={this.state.columns}
											item={item}
											isSelected={isSelected}
											isMultiSelected={isMultiSelected}
											onMultiSelect={this.handleMultiSelect}
											showMultiSelect={showMultiSelect}
											onItemClick={onItemClick}
											showArrow={this.state.hasChildren}
											showCheckbox={this.state.hasMultiSelect}
											forceUpdate={this.state.forceRenderItems}
											animate={animateItem}
											children={isSelected && this.state.hasChildren ? this.props.childrens : undefined}
											onResize={height => this.handleResize(i, height)}
											showScrollbar={this.state.isScrollbarVisible}
										/>
									);
								})}
							</div>

							{this.state.isUpdating && <SpinnerBox id={`${this.props.id}-updating-box`} />}
							{isNoDataInfiniteFiltered && <NoDataBox message={`${this.props.noData} with these filters`} />}
						</div>
						<ScrollBar ref={scrollbar => (this.scrollbar = scrollbar)} onInit={this.updateScrollbar} />

						{/* this.props.showScrollbar &&  */}

						<Paginator
							show={this.hasUpdatedPreviousItems}
							hide={this.hasUpdatedNewItems}
							start={this.state.currentIndexStart}
							stop={this.state.currentIndexStop}
							position={-35}
							direction="up"
						/>
					</div>
					{this.state.hasPages && (
						<Paging qty={this.state.pageQty} selected={this.state.page} onSelect={this.pageClick} />
					)}
				</div>
			</div>
		);
	}
}

class Paginator extends React.Component {
	constructor(props) {
		super(props);

		// define a timeout store
		this.rangeChangeTimeout = undefined;
		this.state = {
			originalTop: this.props.direction === 'down' ? -45 : 5,
			showingTop: this.props.position,
			valueStart: this.props.start,
			valueStop: this.props.stop,
			animate: false,
		};
	}
	componentWillUnmount() {
		clearTimeout(this.rangeChangeTimeout);
	}
	componentWillReceiveProps(nextProps) {
		let changes = {};
		if (nextProps.hide && nextProps.hide != this.props.hide) {
			changes.animate = false;
		}
		if (nextProps.show && nextProps.show != this.props.show) {
			changes.valueStart = nextProps.start;
			changes.valueStop = nextProps.stop;
			changes.animate = true;

			// remove the previous timeout, might request a new animation soon
			clearTimeout(this.rangeChangeTimeout);
			this.rangeChangeTimeout = setTimeout(() => {
				this.setState({ animate: false });
			}, 1500);
		}

		if (Object.keys(changes).length > 0) {
			this.setState(changes);
		}
	}

	render() {
		const rangeClass = this.state.animate ? 'fadeInOut' : '';
		const top = this.state.animate ? this.state.showingTop : this.state.originalTop;

		return (
			<div className="paginator">
				<div className={` paginator-animator ${rangeClass}`} style={{ transform: `translateY(${top}px)` }}>
					<div className="paginator-range">
						{this.state.valueStart} - {this.state.valueStop}
					</div>
				</div>
			</div>
		);
	}
}

/////////////////////////////////////////////////////////

const DataList = ({
	id = 'datalist',
	height = 'auto',
	rowStyle = {},
	list = undefined,
	isPending = false,
	isError = false,
	errorMsg = '',
	columns,
	selected,
	onSelect = () => {},
	onUnselect = () => {},
	multiSelect = false,
	multiSelected = [],
	onMultiSelect = () => {},
	showMultiSelect = undefined,
	sortColumn = undefined,
	sortAsc = true,
	onChangeFilters = undefined,
	paging = undefined,
	forceRender = undefined,
	forceUpdate = undefined,
	forceColumnUpdate = undefined,
	children,
	noData = 'no data found',
	debug = false,
	update = undefined,
	api = undefined,
	wrapper = undefined,
	allowFilter,
	showScrollbar = true,
}) => {
	// perform necessary calculations
	const hasChildren = children != undefined;
	const arrowCellWidth = hasChildren ? 40 : 0;
	const multiSelectWidth = multiSelect ? 40 : 0;
	const scrollbarWidth = showScrollbar ? 6 : 0;
	const fixedPxAmount =
		scrollbarWidth + multiSelectWidth + arrowCellWidth + columns.reduce((a, b) => (b.width ? b.width + a : a), 0);
	const columnsAutoWidthNumber = columns.filter(col => col.width == undefined).length;
	const columnPerc = 100 / columnsAutoWidthNumber;
	const columnPxToRemove = fixedPxAmount / columnsAutoWidthNumber;
	const hasInfiniteScrolling = typeof update === 'function';
	let style = {
		multiSelectColumn: {
			width: multiSelectWidth + 'px',
			padding: '9px',
			overflow: 'hidden',
		},
		arrowColumn: { width: arrowCellWidth },
		dataColumn: {
			width: 'calc(' + columnPerc + '%' + ' - ' + columnPxToRemove + 'px )',
		},
	};

	const containerHeight = {
		position: 'relative',
		display: 'flex',
		width: '100%',
		...(height == 'auto' ? { flex: 2 } : { height }),
	};

	// apply searchable property to every column
	columns.forEach(column => {
		if (column.searchable == undefined) {
			if (column.searchable === false || column.showLabel === false || column.label === '' || hasInfiniteScrolling) {
				column.searchable = false;
			} else {
				column.searchable = true;
			}
		}
	});

	const showList = () => (
		<div style={containerHeight}>
			<ListItems
				id={id}
				rowStyle={rowStyle}
				style={style}
				columns={columns}
				list={list}
				selected={selected}
				onSelect={onSelect}
				onUnselect={onUnselect}
				multiSelect={multiSelect}
				multiSelected={multiSelected}
				onMultiSelect={onMultiSelect}
				showMultiSelect={showMultiSelect}
				childrens={children}
				sortColumn={sortColumn}
				sortAsc={sortAsc}
				onChangeFilters={onChangeFilters}
				paging={paging}
				forceRender={forceRender}
				forceUpdate={forceUpdate}
				forceColumnUpdate={forceColumnUpdate}
				update={update}
				debug={debug}
				api={api}
				wrapper={wrapper}
				noData={noData}
				allowFilter={allowFilter}
				hasInfiniteScrolling={hasInfiniteScrolling}
				showScrollbar={showScrollbar}
			/>
		</div>
	);
	return isPending ? (
		<SpinnerBox id={`${id}-pending-box`} />
	) : isError ? (
		<ErrorBox message={errorMsg} id={`${id}-error-box`} />
	) : (
		showList()
	);
};

DataList.propTypes = {
	id: PropTypes.string,
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	rowStyle: PropTypes.object,
	list: PropTypes.arrayOf(PropTypes.object),
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,
	selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
	onSelect: PropTypes.func,
	onUnselect: PropTypes.func,
	multiSelect: PropTypes.bool,
	multiSelected: PropTypes.arrayOf(PropTypes.string),
	onMultiSelect: PropTypes.func,
	showMultiSelect: PropTypes.func,
	sortColumn: PropTypes.string,
	sortAsc: PropTypes.bool,
	onChangeFilters: PropTypes.func,
	paging: PropTypes.bool,
	forceRender: PropTypes.any,
	forceUpdate: PropTypes.any,
	forceColumnUpdate: PropTypes.any,
	children: PropTypes.node,
	noData: PropTypes.string,
	update: PropTypes.func,
	api: PropTypes.string,
	wrapper: PropTypes.func,
	showScrollbar: PropTypes.bool,
	isPending: PropTypes.bool,
	isError: PropTypes.bool,
	errorMsg: PropTypes.string,
	allowFilter: PropTypes.bool,
	debug: PropTypes.bool,
};

export default DataList;
