import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import * as utils from '../../../utils/common';
import ScrollBox from '../../ScrollBox';
import './ModalTabsLayout.scss';

class ModalTabsLayout extends PureComponent {
	constructor(props) {
		super(props);

		const { items, selected } = this.props;
		let itemIndex = null;

		if (typeof selected === 'string') {
			itemIndex = items.map(item => item.name).indexOf(selected);
		} else if (selected === undefined) {
			itemIndex = 0;
		} else {
			itemIndex = selected;
		}

		this.state = {
			items,
			selected: Math.max(0, itemIndex),
		};

		this.onSelect = this.onSelect.bind(this);
	}
	componentDidMount() {


	}
	componentWillReceiveProps(nextProps) {
		const { items } = nextProps;
		if (!isEqual(this.props.items, items)) {
			this.setState({ items });
		}
	}
	componentWillUnmount() {}
	onSelect(index, disabled = false) {
		if (disabled) {
			return;
		}
		this.setState({ selected: index });
	}

	render() {
		const { items, selected } = this.state;
		const { children } = this.props;
		return (
			<div className="element-modal-tab-layout">
				<ModalTabs items={items} selected={selected} onSelect={this.onSelect} />
				<div className="element-modal-tab-layout__content">
					<ScrollBox>{children[selected]}</ScrollBox>
				</div>
			</div>
		);
	}
}

ModalTabsLayout.propTypes = {
	items: PropTypes.arrayOf([PropTypes.shape({ label: PropTypes.string, value: PropTypes.strin })]),
	selected: PropTypes.string,
	children: PropTypes.node,
};

ModalTabsLayout.defaultProps = {
	items: [],
	selected: 0,
	children: undefined,
};

const ModalTabs = ({ items, selected, onSelect }) => (
	<div className="element-modal-tab-layout__items">
		{items.map((item, index) => {
			const itemClassName = utils.composeClassNames([
				'element-modal-tab-layout__item',
				index === selected && 'element-modal-tab-layout__item--selected',
				item.disabled && 'element-modal-tab-layout__item--disabled',
			]);
			return (
				<div
					key={index.toString()}
					onClick={() => onSelect(index, item.disabled)}
					className={itemClassName}
					role="presentation"
				>
					{item.name}
				</div>
			);
		})}
	</div>
);

ModalTabs.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, value: PropTypes.string })),
	selected: PropTypes.string,
	onSelect: PropTypes.func,
};

ModalTabs.defaultProps = {
	items: [],
	selected: 0,
	onSelect: undefined,
};

export default ModalTabsLayout;
