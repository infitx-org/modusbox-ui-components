import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import * as utils from '../../utils/common';
import keyCodes from '../../utils/keyCodes';

import './Tabs.scss';

class Tabs extends PureComponent {
	constructor(props) {
		super(props);

		const { selected, children } = this.props;
		const items = this.getTabs(children);

		this.state = {
			selected: Math.max(
				0,
				typeof selected === 'string' ? items.indexOf(selected) : selected != undefined ? selected : 0,
			),
			focused: undefined,
		};

		this.onSelect = this.onSelect.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);

		this.getTabListAndTabPanels = this.getTabListAndTabPanels.bind(this);
		this.getTabs = this.getTabs.bind(this);
		this.getPanels = this.getPanels.bind(this);

		this.testKey = this.testKey.bind(this);
		this.selectSiblingTab = this.selectSiblingTab.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		let { selected } = this.state;
		if (nextProps.selected != this.props.selected) {
			selected = nextProps.selected;
		}

		const tabs = this.getTabs();
		const { hidden, disabled } = tabs[selected].props;
		if (hidden || disabled) {
			selected = 0;
		}

		this.setState({ selected });
	}

	getTabListAndTabPanels() {
		const items = this.props.children;
		const subElements = Array.isArray(items) ? items : [items];
		const [tabList, tabPanels] = subElements;
		return [tabList, tabPanels];
	}
	getTabs() {
		const [tabList] = this.getTabListAndTabPanels();
		return tabList.props.children.filter(child => child.type === Tab);
	}
	getPanels() {
		const tabPanels = this.getTabListAndTabPanels()[1];
		const panels = tabPanels ? tabPanels.props.children || [] : [];
		return panels.filter(child => child.type === TabPanel);
	}
	onSelect(index) {
		this.setState({ selected: index, focused: index });

		this.input.focus();

		if (typeof this.props.onSelect === 'function') {
			this.props.onSelect(index);
		}
	}
	onFocus(e) {
		e.preventDefault();
		e.stopPropagation();
		if (this.state.focused === undefined) {
			this.setState(state => ({ focused: state.selected }));
		}
	}
	onBlur() {
		this.setState({ focused: undefined });
	}
	testKey(e) {
		const { keyCode, shiftKey } = e.nativeEvent;
		if (keyCode === keyCodes.KEY_TAB) {
			e.preventDefault();
			this.setState({ focused: undefined });
			utils.focusNextFocusableElement(this.input, !shiftKey);
			return;
		}
		if (keyCode === keyCodes.KEY_LEFT) {
			e.preventDefault();
			this.selectSiblingTab(false);
			return;
		}
		if (keyCode === keyCodes.KEY_RIGHT) {
			e.preventDefault();
			this.selectSiblingTab(true);
		}
	}
	selectSiblingTab(next) {
		const { selected } = this.state;
		const tabs = this.getTabs(this.props.children);
		let nextIndex = selected;
		const found = false;
		while (!found) {
			nextIndex += next ? 1 : -1;
			if (nextIndex == tabs.length || nextIndex < 0) {
				break;
			}
			if (!tabs[nextIndex].props.disabled) {
				this.setState({ selected: nextIndex, focused: nextIndex });
				break;
			}
		}
	}
	render() {
		const { selected, focused } = this.state;
		const { children } = this.props;
		const [tabList] = this.getTabListAndTabPanels();

		const panels = this.getPanels(children);
		const panel = panels.length >= selected + 1 ? panels[selected] : null;
		const { width } = tabList.props.style || {};
		const growTab = width != undefined;
		const tabs = this.getTabs(children).map((child, index) => {
			const props = {
				...child.props,
				onSelect: () => this.onSelect(index),
				key: index,
				selected: selected === index,
				focused: focused === index,
				flex: growTab,
			};
			return React.cloneElement(child, props);
		});

		return (
			<div className="element element-tabs">
				<input
					ref={input => (this.input = input)}
					type="button"
					className="modus-element__holder"
					onFocus={this.onFocus}
					onBlur={this.onBlur}
					onKeyDown={this.testKey}
				/>
				<div className="element-tabs__tab-items" style={tabList.props.style}>
					{tabs}
				</div>
				{panel}
			</div>
		);
	}
}

Tabs.propTypes = {
	selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	onSelect: PropTypes.func,
	disabled: PropTypes.bool,
	flex: PropTypes.bool,
	style: PropTypes.object,
	children: PropTypes.node,
};

class Tab extends PureComponent {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}
	onClick() {
		if (!this.props.disabled) {
			this.props.onSelect();
		}
	}
	render() {
		const {
			selected, focused, children, disabled, hidden, flex, style,
		} = this.props;
		if (hidden) {
			return null;
		}
		const className = utils.composeClassNames([
			'element-tabs__tab-item',
			focused && 'element-tabs__tab-item--focused',
			selected && 'element-tabs__tab-item--selected',
			disabled && 'element-tabs__tab-item--disabled',
			flex && 'fill-width',
		]);

		return (
			<div onClick={this.onClick} className={className} style={style}>
				{children}
			</div>
		);
	}
}
Tab.propTypes = {
	children: PropTypes.node,
	selected: PropTypes.bool,
	focused: PropTypes.bool,
	onSelect: PropTypes.func,
	text: PropTypes.string,
	disabled: PropTypes.bool,
	hidden: PropTypes.bool,
	flex: PropTypes.bool,
	style: PropTypes.object,
};


const TabList = ({ children }) => children;

TabList.propTypes = {
	children: PropTypes.node,
};

const TabPanel = ({ children }) => <div className="element-tabs__tab__content">{children}</div>;

TabPanel.propTypes = {
	children: PropTypes.node,
};
const TabPanels = ({ children }) => children;

TabPanels.propTypes = {
	children: PropTypes.node,
};

export { Tab, Tabs, TabList, TabPanel, TabPanels };
