import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { ScrollBar } from '../../ScrollBox';
import './ModalTabsLayout.css';

class ModalTabsLayout extends PureComponent {
	constructor(props) {
		super(props);

		const { items, selected } = this.props;
		const itemIndex =
			typeof selected === 'string'
				? items.map(item => item.name).indexOf(selected)
				: typeof selected === 'undefined' ? 0 : selected;
		this.state = {
			items,
			selected: Math.max(0, itemIndex),
		};
		this.onSelect = this.onSelect.bind(this);
		this.updateScrollbar = this.updateScrollbar.bind(this);
	}
	componentDidMount() {
		window.addEventListener('resize', this.updateScrollbar);
		this.wrapper.addEventListener('scroll', this.updateScrollbar);
		this.updateScrollbar();
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateScrollbar);
		this.wrapper.removeEventListener('scroll', this.updateScrollbar);
	}
	componentWillReceiveProps(nextProps) {
		const { items } = nextProps;
		if (!isEqual(this.props.items, items)) {
			this.setState({ items });
		}
	}
	componentDidUpdate() {
		this.updateScrollbar();
	}
	updateScrollbar() {
		if (!this.wrapper) {
			return;
		}
		const { scrollTop } = this.wrapper;
		const { height } = this.wrapper.getBoundingClientRect();
		const rowsHeight = this.wrapper.childNodes[0].getBoundingClientRect().height;
		const offset = 0;
		if (this.scrollbar) {
			this.scrollbar.setPosition({
				scrollTop,
				offset,
				rowsHeight,
				height,
			});
		}
	}
	onSelect(index, disabled = false) {
		if (disabled) {
			return;
		}
		this.setState({ selected: index });
	}

	render() {
		const { items, selected } = this.state;
		const { children } = this.props;
		const { flex } = items[selected];

		return (
			<div className="modal-tab-layout">
				<ModalTabs items={items} selected={selected} onSelect={this.onSelect} />
				<div className="modal-tab-content-wrapper">
					<div ref={wrapper => this.wrapper = wrapper} className={`modal-tab-content ${flex ? 'flexible' : ''}`}>
						{children[selected]}
					</div>
					<ScrollBar ref={scrollbar => this.scrollbar = scrollbar} onInit={this.updateScrollbar} />
				</div>
			</div>
		);
	}
}

ModalTabsLayout.propTypes = {
	items: PropTypes.arrayOf([ PropTypes.shape({ label: PropTypes.string, value: PropTypes.strin }) ]),
	selected: PropTypes.string,
	children: PropTypes.node
}

const ModalTabs = ({ items, selected, onSelect }) => {
	return (
		<div className="modal-tab-items">
			{items.map((item, index) => (
				<div
					key={index}
					onClick={() => onSelect(index, item.disabled)}
					className={`modal-tab-item ${index === selected ? 'selected' : ''} ${item.disabled ? 'disabled' : ''} `}
				>
					{item.name}
				</div>
			))}
		</div>
	);
};

ModalTabs.propTypes = {
	items: PropTypes.arrayOf([ PropTypes.shape({ label: PropTypes.string, value: PropTypes.strin }) ]),
	selected: PropTypes.string,
	children: PropTypes.node,
	onSelect: PropTypes.func
}


export default ModalTabsLayout;
