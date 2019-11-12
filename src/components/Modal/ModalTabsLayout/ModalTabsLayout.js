import './ModalTabsLayout.scss';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import * as utils from '../../../utils/common';
import ScrollBox from '../../ScrollBox';

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
      selected: Math.max(0, itemIndex),
    };

    this.onSelect = this.onSelect.bind(this);
  }
  onSelect(index, disabled = false) {
    if (disabled) {
      return;
    }
    this.setState({ selected: index });
  }

  render() {
    const { selected } = this.state;
    const { children, items } = this.props;
    const child = children[selected];
    const content = React.cloneElement(child, {
      ...child.props,
      style: { ...child.props.style, padding: '10px', flex: '2' },
    });
    return (
      <div className="el-modal-tab-layout">
        <ModalTabs items={items} selected={selected} onSelect={this.onSelect} />
        <div className="el-modal-tab-layout__content">
          <ScrollBox flex>{content}</ScrollBox>
        </div>
      </div>
    );
  }
}

ModalTabsLayout.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.strin })),
  selected: PropTypes.string,
  children: PropTypes.node,
};

ModalTabsLayout.defaultProps = {
  items: [],
  selected: 0,
  children: undefined,
};

const ModalTabs = ({ items, selected, onSelect }) => (
  <div className="el-modal-tab-layout__items">
    {items.map((item, index) => {
      const itemClassName = utils.composeClassNames([
        'el-modal-tab-layout__item',
        index === selected && 'el-modal-tab-layout__item--selected',
        item.disabled && 'el-modal-tab-layout__item--disabled',
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
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelect: PropTypes.func,
};

ModalTabs.defaultProps = {
  items: [],
  selected: 0,
  onSelect: undefined,
};

export default ModalTabsLayout;
