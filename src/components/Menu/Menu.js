import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import * as utils from '../../utils/common';
import Icon from '../Icon';
import './Menu.scss';
import '../../icons/mule/back-small.svg';

const bindOnClickProp = onClick => element =>
  React.cloneElement(element, {
    ...element.props,
    onClick,
  });

const bindPathnameProp = pathname => element =>
  React.cloneElement(element, {
    ...element.props,
    pathname,
  });

const bindActiveProp = pathname => element => {
  const { path, back, active } = element.props;
  const matchesPath = path !== undefined && path === pathname && !back;
  if (matchesPath || active) {
    return React.cloneElement(element, {
      ...element.props,
      active: true,
    });
  }
  return element;
};
const bindKey = (element, index) =>
  React.cloneElement(element, {
    ...element.props,
    key: index.toString(),
  });

const bindDisabledProp = disabled => element =>
  React.cloneElement(element, {
    ...element.props,
    disabled: element.props.disabled || disabled,
  });

/* eslint-disable */
const isMenuSection = element => element.type === MenuSection;
const isMenuItem = element => element.type === MenuItem;
/* eslint-enable */

const wrapItemsInSections = items => {
  const groupedMenuItems = [];
  let currentGroup = [];
  const addCurrenntGroupToGroupedItems = () => {
    if (currentGroup.length) {
      groupedMenuItems.push(<MenuItemsGroup>{currentGroup}</MenuItemsGroup>);
      currentGroup = [];
    }
  };

  items.forEach(node => {
    if (isMenuSection(node) || node.props.back) {
      addCurrenntGroupToGroupedItems();
      groupedMenuItems.push(node);
    } else {
      currentGroup.push(node);
    }
  });

  addCurrenntGroupToGroupedItems();
  return groupedMenuItems.map(bindKey);
};

class MenuItem extends PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    if (!this.props.disabled) {
      this.props.onClick(this.props.to || this.props.path);
    }
  }
  render() {
    const { label, disabled, hidden, active, back } = this.props;
    if (hidden) {
      return null;
    }
    let BackIcon = null;
    if (back) {
      BackIcon = (
        <Icon className="element-menu__item__back-icon" name="arrow" size={10} fill="#999" />
      );
    }
    const classNames = utils.composeClassNames([
      'element-menu__item',
      active && 'element-menu__item--active',
      disabled && 'element-menu__item--disabled',
      back && 'element-menu__item--back',
    ]);

    return (
      <div className={classNames} onClick={this.onClick} role="presentation">
        {BackIcon}
        {label}
      </div>
    );
  }
}

MenuItem.defaultProps = {
  path: undefined,
  to: undefined,
  disabled: false,
  hidden: false,
  back: false,
};
MenuItem.propTypes = {
  path: PropTypes.string,
  to: PropTypes.string,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  back: PropTypes.bool,
};

const MenuSection = ({ pathname, label, children, onClick, hidden, disabled }) => {
  if (hidden) {
    return null;
  }
  const menuItems = React.Children.toArray(children)
    .filter(element => isMenuItem(element))
    .map(bindOnClickProp(onClick))
    .map(bindActiveProp(pathname))
    .map(bindDisabledProp(disabled));

  let menuSectionLabel = null;
  if (label) {
    menuSectionLabel = <div className="element-menu__section-label">{label}</div>;
  }
  return (
    <div className="element-menu__section">
      {menuSectionLabel}
      <div className="element-menu__section-items">{menuItems}</div>
    </div>
  );
};

MenuSection.defaultProps = {
  label: undefined,
};
MenuSection.propTypes = {
  label: PropTypes.string,
};

const MenuItemsGroup = ({ children }) => (
  <div className="element-menu__section-items">{children}</div>
);

class Menu extends PureComponent {
  static flattenMenuSections(items) {
    // It flattens nested MenuSection, MenuItem components into a one-level array
    return items.reduce(
      (prevItems, currentItem) => [
        ...prevItems,
        ...(isMenuSection(currentItem)
          ? Menu.flattenMenuSections(React.Children.toArray(currentItem.props.children))
          : [currentItem]),
      ],
      []
    );
  }
  constructor() {
    super();
    this.getActiveRoot = this.getActiveRoot.bind(this);
  }
  getActiveRoot(parentNode) {
    const { pathname } = this.props;
    let activeRoot = null;
    // render Menu when pathname matches path
    if (parentNode.props.path !== undefined && parentNode.props.path === pathname) {
      return parentNode;
    }
    // Default to Menu when going manual - no route matching
    if (parentNode === this && parentNode.props.pathname === undefined) {
      activeRoot = parentNode;
    }

    // Flatten MenuSections in order not to have nested children when detecting active menu
    const items = Menu.flattenMenuSections(React.Children.toArray(parentNode.props.children));

    items.some(node => {
      // find the first matching menu item and return the parent or the item itself
      // depending if needs to be treated like a root
      const { path, asRoot, children, active } = node.props;
      const hasChildren = children !== undefined;
      const pathMatches = path !== undefined && path === pathname;
      if (isMenuItem(node)) {
        if (pathMatches || active) {
          // asRoot prop is meant to be used when menu has child elements
          // and we do not want to render the parent node but the child nodes
          activeRoot = asRoot ? node : parentNode;
        } else if (hasChildren) {
          activeRoot = this.getActiveRoot(node);
        }
      }
      return activeRoot;
    });

    return activeRoot;
  }

  render() {
    const { pathname, onChange } = this.props;
    let menuComponents = null;
    const activeRoot = this.getActiveRoot(this);
    if (activeRoot !== null) {
      menuComponents = React.Children.toArray(activeRoot.props.children);
      menuComponents = wrapItemsInSections(
        menuComponents
          .filter(element => isMenuItem(element) || isMenuSection(element))
          .map(bindOnClickProp(onChange))
          .map(bindPathnameProp(pathname))
          .map(bindActiveProp(pathname))
      );
    }
    return <div className="mb-element element-menu">{menuComponents}</div>;
  }
}

Menu.defaultProps = {
  path: undefined,
  pathname: undefined,
};
Menu.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  path: PropTypes.string,
  pathname: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Menu;
export { MenuItem, MenuSection };
