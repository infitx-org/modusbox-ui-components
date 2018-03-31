import React, { PropTypes } from 'react';
import find from 'lodash/find';

import Row from '../Row';

import { HeaderCell, ScrollBarHeaderCell } from './Cells';
import Checkbox from './Checkbox';

class Header extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const {
			id,
			hasChildren,
			hasMultiSelect,
			allSelected,
			someSelected,
			onMultiSelectAll,
			style,
			originalColumns,
			columns,
			filters,
			sortLabel,
			isSortingAsc,
			onColumnClick,
			onSearchClick,
			onSearchChange,
			onSearchRemove,
			onTriggerResizeWidth,
			onResizeWidth,
			showScrollbar,
		} = this.props;
		return (
			<div className="data-list-header-row-box">
				<Row
					className="data-list-header-row"
					style={{ paddingRight: showScrollbar ? '6px' : '0px' }}
				>
					{hasChildren && (
						<div className="data-list-header-cell" style={style.arrowColumn} />
					)}
					{hasMultiSelect && (
						<div
							id={`${id}-multiselect-all`}
							className="data-list-header-cell data-list-header-column-cell"
							style={{ ...style.multiSelectColumn, paddingTop: 6 }}
						>
							<Checkbox
								id="general-multi-select"
								isSelected={allSelected}
								onChange={onMultiSelectAll}
								halfChecked={someSelected}
							/>
						</div>
					)}
					{columns.map((column, i) => {
						let newStyle = {
							...(column.headerStyle || {}),
							width: column.width ? column.width : style.dataColumn.width,
						};

						const originalColumn = originalColumns[i];
						const isSortable = !(column.sortable === false);
						const isSearchable = !(column.searchable === false);
						const isResizable = !(column.resizable === false);
						const filter = find(filters, { label: column.label });
						const isSearching = filter != undefined;
						const headerCellId = `${id}-${column.label
							.toLowerCase()
							.replace(/\ /g, '-')}`;
						const isLastColumn = i === columns.length - 1;

						return (
							<HeaderCell
								id={headerCellId}
								key={i.toString()}
								index={i}
								isLastColumn={isLastColumn}
								searchable={isSearchable}
								resizable={isResizable}
								style={newStyle}
								column={column}
								sortable={isSortable} // undefined is sortable
								label={column.label}
								content={originalColumn.headerContent}
								showLabel={
									column.showLabel != undefined ? column.showLabel : true
								}
								isSearching={isSearching}
								filter={filter}
								isSorting={sortLabel === column.label}
								isSortingAsc={isSortingAsc}
								onColumnClick={() =>
									isSortable ? onColumnClick(column.label) : {}
								}
								onSearchClick={evt =>
									isSearchable ? onSearchClick(evt, column.label) : {}
								}
								onSearchChange={onSearchChange}
								onSearchRemove={onSearchRemove}
								onTriggerResizeWidth={onTriggerResizeWidth}
								ref={`headerCell${i}`}
							/>
						);
					})}

					{/* showScrollbar && <ScrollBarHeaderCell /> */}
				</Row>
			</div>
		);
	}
}

export default Header;
