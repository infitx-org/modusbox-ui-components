/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';

import isEqual from 'lodash/isEqual';
import orderBy from 'lodash/orderBy';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

import ScrollBox from '../ScrollBox';
import Header from './Header';
import ListItem from './ListItem';
import OverlayColumnResizer from './Overlay';
import { SpinnerBox, ErrorBox, NoDataBox } from './Boxes';
import { Paging, Paginator } from './Paging';

import './DataList.scss';

class DataList extends React.Component {
  constructor(props) {
    super(props);

    // internal method for sorting, filtering and async loading
    this.setContainerState = this.setContainerState.bind(this);
    this.getSortingKey = this.getSortingKey.bind(this);
    this.getFilteringColumn = this.getFilteringColumn.bind(this);
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
    const hasChildren = this.props.children != undefined;
    const hasMultiSelect = this.props.multiSelect;
    const sortKey = this.getSortingKey(this.props.sortColumn);
    const sortAsc = this.props.sortAsc;
    const hasPages = typeof this.props.paging !== 'undefined';
    const pageQty = this.getPageQty(this.props.list);

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

    const isLoadingNewData = !!this.props.hasInfiniteScrolling;

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
      list,
      currentList,
      columns: this.props.columns,
      multiSelected: [],

      // Item related state
      forceRenderItems: false,

      // SEARCHING
      filters: [],

      // Sorting
      sortKey,
      sortLabel: this.props.sortColumn,
      sortAsc,
      hasChildren,
      hasMultiSelect,

      // Paging
      hasPages,
      pageQty,
      page: 0,

      // Composite HTML rules related state
      isScrollbarVisible: false,
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

  componentWillMount() {
    this.setContainerState(this.props);
  }
  componentDidMount() {
    this.isComponentMounted = true;

    if (this.isNewData) {
      this.isNewData = false;
    }

    if (this.props.hasInfiniteScrolling) {
      this.getData({ count: this.state.itemsToShow });
    }
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  componentDidUpdate() {
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

  setContainerState(props) {
    const hasChildren = props.children != undefined;
    const arrowCellWidth = hasChildren ? 40 : 0;
    const multiSelectWidth = props.multiSelect ? 40 : 0;
    const fixedPxAmount =
      multiSelectWidth +
      arrowCellWidth +
      props.columns.reduce((a, b) => (b.width ? b.width + a : a), 0);
    const columnsAutoWidthNumber = props.columns.filter(col => col.width == undefined).length;
    const columnPerc = 100 / columnsAutoWidthNumber;
    const columnPxToRemove = fixedPxAmount / columnsAutoWidthNumber;
    const hasInfiniteScrolling = typeof update === 'function';
    const style = {
      multiSelectColumn: {
        width: `${multiSelectWidth}px`,
        padding: '9px',
        overflow: 'hidden',
      },
      arrowColumn: { width: arrowCellWidth },
      dataColumn: {
        width: `calc(${columnPerc}%` + ` - ${columnPxToRemove}px )`,
      },
    };
    const containerStyle = {
      position: 'relative',
      display: 'flex',
      width: '100%',
      ...(typeof props.height === 'undefined' ? { flex: '2' } : { height: props.height }),
    };
    setSearchableColumns(props.columns, hasInfiniteScrolling);
    this.setState({
      style,
      containerStyle,
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setContainerState(nextProps);

    // ////////////////////////////////////////////////////////////////

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
        multiSelected: nextProps.multiSelected || [],
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
        const currentList = this.sortList(nextProps.list, this.state.sortKey, this.state.sortAsc);
        this.setState({
          list: nextProps.list,
          currentList,
          pageQty: this.getPageQty(nextProps.list),
        });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isNotforceRenderItems =
      this.state.forceRenderItems === true && nextState.forceRenderItems === false;
    return !isNotforceRenderItems;
  }

  // /////////////////////////////////////////////////////////////////

  getPageQty(list) {
    return -Math.floor(-(list || []).length / 50);
  }
  changePage(page, list) {
    const sourceList = list || this.state.list;
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
        filters,
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

    this.props
      .update(config)
      .then(json => {
        if (this.props.wrapper) return this.props.wrapper(json);
        return json;
      })
      .then(data => {
        this._reqProcessed++;
        if (isPartialRequest) {
          this.renderNextChunk(data, false);
        } else {
          this.parseData(data);
        }
      })
      .catch(err => {
        if (!this.isComponentMounted) return;

        let errorMsg;
        if (err.status != undefined && err.statusText != undefined)
          errorMsg = `${err.status} ${err.statusText}`;
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

  parseData(data) {
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

  getSortingKey(label) {
    let sortingKey;

    // if the label is a string, get the column for that label and set the item key
    if (label != undefined) {
      const columns = this.props.columns.filter(col => col.label === label);
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
    return undefined;
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
        const value =
          field != undefined ? (column.func != undefined ? column.func(field, item) : field) : '';
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
    this.noPointerEventsTimeout = setTimeout(
      () => this.rows.classList.remove('remove-pointer-events'),
      50
    );
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
          const data = this.state.list.slice(
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
    const listLength = this.state.currentList.length;
    limit = limit && limit < listLength ? limit : listLength;

    for (let i = 0; i < limit; i++) {
      height += this.getItemHeight(i);
    }

    return height;
  }

  getItemHeight(index) {
    return this[`${index}-reference`].item.clientHeight;
  }

  storeHeights(start, stop) {
    for (let i = 0; i < stop - start && i < this.state.currentList.length; i++) {
      const itemIndex = start + i;
      this.heights[itemIndex] = this.getItemHeight(i);
    }
  }

  renderPrevChunk() {
    // get the indexes
    const start = this.state.currentIndexStart - this.state.itemsNumber;
    const stop = start + this.state.itemsToShow;

    // set the current list, no need to changes the whole list
    const newCurrentList = this.state.list.slice(start, stop);
    let elementsHeight = 0;

    // get the new elements height and remove it from the
    // total compensation value to keep the same scrolling position
    for (let i = start; i < start + this.state.itemsNumber; i++) {
      elementsHeight += this.heights[i];
    }

    const newCompensatorIndex = this.state.compensatorIndex - elementsHeight;

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
    const endOfData = data.length == 0 ? this.state.currentIndexStop : false;

    // describe the changes to apply to the state
    let changes = {
      endOfData,
      isUpdating: false,
    };

    if (endOfData === false) {
      let newList = [...this.state.list];

      // get the new indexes for showing items
      const start = this.state.currentIndexStart + this.state.itemsNumber;
      const stop = start + this.state.itemsToShow;

      if (!wasCached) {
        // updates the whole store list just if data was fetched new
        newList = [...newList, ...data];
        changes.list = newList;
      }

      // set new lists and new blank elements
      const newCurrentList = newList.slice(start, stop);
      const newcompensatorIndex = this.getTotalHeight(this.state.itemsNumber);

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
  handleResize(index) {
    const itemIndex = this.state.currentIndexStart + index;
    this.heights[itemIndex] = this.getItemHeight(index);

    if (this.lastSelectedIndex != undefined && this.lastSelectedIndex != itemIndex) {
      // detect if the items is part of the first set which doesn't require calculation in compensation
      // get the difference between the last element height and its new height
      const isFirstSetItem = itemIndex < this.state.itemsToShow;
      if (!isFirstSetItem) {
        const difference = this.heights[this.lastSelectedIndex] - 41;
        const newCompensatorIndex = this.state.compensatorIndex - difference;
        this.scroller.scrollTop -= difference;
        this.setState({ compensatorIndex: newCompensatorIndex });
      }
      this.heights[this.lastSelectedIndex] = 41;
    }

    this.lastSelectedIndex = itemIndex;
  }

  // resort the table when changing and filter the current list
  handleColumnClick(label) {
    const nextSortKey = this.getSortingKey(label);
    const nextSortAsc = this.state.sortLabel === label ? !this.state.sortAsc : true;
    if (nextSortKey === false) return;

    const changes = {
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
      const { hasPages, list, page, filters } = this.state;
      if (hasPages) {
        // sort all records
        const sortedList = nextSortKey ? this.sortList(list, nextSortKey, nextSortAsc) : list;
        const filteredList = this.filterList(sortedList, filters);
        const { currentList } = this.changePage(page, filteredList);
        changes.list = sortedList;
        changes.pageQty = this.getPageQty(filteredList);
        changes.currentList = currentList;
      } else {
        changes.currentList = nextSortKey
          ? this.sortList(this.state.currentList, nextSortKey, nextSortAsc)
          : list;
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
        filters: this.state.filters.concat({ label, value: undefined }),
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
      let pageQty;
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
    const { left } = this.datalist.getBoundingClientRect();
    this.setState({
      isResizingColumn: true,
      resizingColumnIndex: cellIndex,
      cellLeftPosition: cellStart - left,
      cellWidth: cellStop - cellStart,
      cellName,
      isOverlayColumnVisible: true,
    });
  }
  handleStopResizeColumnWidth(event) {
    if (this.state.isResizingColumn) {
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();

      const columns = [...this.state.columns];

      for (let i = 0; i < this.state.resizingColumnIndex; i++) {
        if (this.state.columns[i].width && this.state.columns[i].width < 100) {
          continue;
        }
        const cell = this.header[`headerCell${i}`];
        const { left, right } = cell.getBoundingClientRect();
        columns[i].width = right - left;
      }

      columns[this.state.resizingColumnIndex].width = this.state.cellWidth;

      const arrowCellWidth = this.state.hasChildren ? 40 : 0;
      const multiSelectWidth = this.state.hasMultiSelect ? 40 : 0;
      const fixedPxAmount =
        multiSelectWidth +
        arrowCellWidth +
        columns.reduce((a, b) => (b.width ? b.width + a : a), 0);
      const columnsAutoWidthNumber = columns.filter(col => col.width == undefined).length;
      const columnPerc = 100 / columnsAutoWidthNumber;
      const columnPxToRemove = fixedPxAmount / columnsAutoWidthNumber;
      const style = {
        multiSelectColumn: { width: `${multiSelectWidth}px`, padding: '9px' },
        arrowColumn: { width: arrowCellWidth },
        dataColumn: {
          width: `calc(${columnPerc}%` + ` - ${columnPxToRemove}px )`,
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
      const currentX = 10 + event.nativeEvent.clientX - this.datalist.getBoundingClientRect().left;
      const diff = Math.max(currentX - this.state.cellLeftPosition, 100);
      this.setState({
        cellWidth: diff,
        isMinimumWidth: diff == 100,
      });
    }
  }

  handleMultiSelect(item) {
    const { id } = item;
    const arrayIds = [...this.state.multiSelected];
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
    const filterItems =
      typeof this.props.showMultiSelect === 'function' ? this.props.showMultiSelect : item => item;
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
    if (this.props.isPending) {
      return <SpinnerBox id={`${this.props.id}-pending-box`} />;
    }
    if (this.props.isError) {
      return <ErrorBox id={`${this.props.id}-error-box`} />;
    }

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
    const hideList =
      (isNoDataInfiniteUnfiltered && !isFiltering) || isNoData || isLoading || apiError;
    const isNoDataInfiniteUnfilteredNotFiltering = isNoDataInfiniteUnfiltered && !isFiltering;
    const scrollboxStyle = { display: this.state.isLoadingNewData ? 'hidden' : undefined };

    return (
      <div style={this.state.containerStyle}>
        <div
          className="element-datalist__wrapper"
          ref={datalist => (this.datalist = datalist)}
          onMouseMove={this.handleResizeColumnWidth}
          onClick={this.handleStopResizeColumnWidth}
        >
          {/* Resize detector */}
          <ReactResizeDetector handleWidth onResize={this.resizeList} />

          {/* Loading data */}
          {isLoading && <SpinnerBox id={`${this.props.id}-pending-box`} />}

          {/* Empty table */}
          {(isNoData || isNoDataInfiniteUnfilteredNotFiltering) && (
            <NoDataBox message={this.props.noData} />
          )}

          {/* API ERROR */}
          {apiError && <ErrorBox message={apiError} />}

          <div
            className="element-datalist"
            id={this.props.id}
            style={hideList ? { display: 'none' } : undefined}
          >
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

            <div
              className="central-box"
              style={{ display: isSortingOrFiltering ? 'none' : 'flex' }}
            >
              <Paginator
                show={this.hasUpdatedNewItems}
                hide={this.hasUpdatedPreviousItems}
                start={this.state.currentIndexStart}
                stop={this.state.currentIndexStop}
                position={5}
                direction="down"
              />

              <ScrollBox
                ref={scroller => (this.scroller = scroller)}
                className="element-datalist__body-box"
                style={scrollboxStyle}
              >
                <div>
                  <div
                    id="compensator"
                    style={{
                      height: this.state.compensatorIndex,
                      width: '100%',
                      background: '#fff',
                    }}
                  />

                  <div ref={rows => (this.rows = rows)} className="element-datalist__body-rows">
                    {this.state.currentList.map((item, i) => {
                      const style = { ...this.state.style, ...item.style };
                      const isSelected = this.props.selected === item.id;
                      const onItemClick = isSelected ? this.props.onUnselect : this.props.onSelect;
                      const isMultiSelected = this.state.multiSelected.includes(item.id);
                      const showMultiSelect = hasMultiSelectFilter
                        ? this.props.showMultiSelect(item)
                        : true;

                      // detect necessary fade-in animation
                      const isNewData = this.isNewData;
                      const isAnimatingUp =
                        (this.hasUpdatedPreviousItems && i < this.state.itemsNumber) || false;
                      const isAnimatingDown =
                        (this.hasUpdatedNewItems && i >= this.state.itemsNumber) || false;
                      const animateItem = isAnimatingUp || isAnimatingDown || isNewData;

                      return (
                        <ListItem
                          ref={item => (this[`${i}-reference`] = item)}
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
                          onResize={() => this.handleResize(i)}
                          showScrollbar={this.state.isScrollbarVisible}
                        >
                          {isSelected && this.state.hasChildren ? this.props.children : null}
                        </ListItem>
                      );
                    })}
                  </div>

                  {this.state.isUpdating && <SpinnerBox id={`${this.props.id}-updating-box`} />}
                  {isNoDataInfiniteFiltered && (
                    <NoDataBox message={`${this.props.noData} with these filters`} />
                  )}
                </div>
              </ScrollBox>

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
              <Paging
                qty={this.state.pageQty}
                selected={this.state.page}
                onSelect={this.pageClick}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

DataList.propTypes = {
  children: PropTypes.node,
  api: PropTypes.string,
  multiSelect: PropTypes.bool,
  sortColumn: PropTypes.string,
  sortAsc: PropTypes.bool,
  paging: PropTypes.bool,
  list: PropTypes.array,
  hasInfiniteScrolling: PropTypes.bool,
  style: PropTypes.shape(),
  forceUpdate: PropTypes.array,
  forceRender: PropTypes.array,
  multiSelected: PropTypes.array,
  forceColumnUpdate: PropTypes.bool,
  wrapper: PropTypes.string,
  update: PropTypes.func,
  columns: PropTypes.array,
  onMultiSelect: PropTypes.func,
  showMultiSelect: PropTypes.bool,
  isPending: PropTypes.bool,
  id: PropTypes.string,
  isError: PropTypes.bool,
  allowFilter: PropTypes.bool,
  noData: PropTypes.string,
  selected: PropTypes.string,
  onUnselect: PropTypes.func,
  onSelect: PropTypes.func,
  rowStyle: PropTypes.shape(),
};

// ///////////////////////////////////////////////////////

const setSearchableColumns = (columns, hasInfiniteScrolling) => {
  columns.forEach(column => {
    const { searchable, showLabel, label } = column;
    if (searchable == undefined) {
      if (searchable === false || showLabel === false || label === '' || hasInfiniteScrolling) {
        column.searchable = false;
      } else {
        column.searchable = true;
      }
    }
  });
};

export default DataList;
