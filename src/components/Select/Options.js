import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import * as utils from '../../utils/common';

import ScrollBox from '../ScrollBox';
import Icon from '../Icon';
import Tooltip from '../Tooltip';

class Options extends PureComponent {
  constructor(props) {
    super(props);

    this.onClickOption = this.onClickOption.bind(this);
    this.state = {
      highlighted: this.props.highlighted,
      options: this.props.options,
      selected: this.props.selected,
    };
    this.items = [];
  }

  componentWillReceiveProps(nextProps) {
    const { options, selected, highlighted } = nextProps;
    this.setState({
      options,
      selected,
      highlighted,
    });
  }
  onClickOption(item) {
    this.props.onSelect(item);
  }
  render() {
    const { options, selected, highlighted } = this.state;
    const { maxHeight, reverse, open } = this.props;
    if (!open) {
      return null;
    }
    const top = reverse ? undefined : 0;
    const bottom = reverse ? 45 : undefined;
    // const items = reverse ? [...options].reverse() : options

    const className = utils.composeClassNames([
      'input',
      'input-select__options-wrapper',
      reverse ? 'input-select__options-wrapper--reverse' : 'input-select__options-wrapper--regular',
    ]);

    let optionItems = null;
    if (options.length > 0) {
      optionItems = options.map((item, index) => {
        const isSelected = selected === item.value;
        return (
          <Option
            highlighted={highlighted === index}
            label={item.label}
            value={item.value}
            icon={item.icon}
            disabled={item.disabled === true}
            key={index.toString()}
            selected={isSelected}
            onClick={() => this.onClickOption(item)}
          />
        );
      });
    } else {
      optionItems = (
        <div className="input-select__options-item--no-options__box">
          <Icon name="info-small" size={20} />
          <div className="input-select__options-item--no-options__message">
            No options available
          </div>
        </div>
      );
    }
    return (
      <div className={className} style={{ position: 'absolute', top, bottom }}>
        <ScrollBox
          style={{ maxHeight }}
          handleStyle={{ borderRadius: '3px' }}
          trackStyle={{
            top: '2px',
            bottom: '2px',
            right: '4px',
            width: '5px',
          }}
          showTrack={false}
        >
          <div
            ref={(items) => {
              this.items = items;
            }}
          >
            {optionItems}
          </div>
        </ScrollBox>
      </div>
    );
  }
}
Options.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  })),
  highlighted: PropTypes.number,
  selected: PropTypes.string,
  onSelect: PropTypes.func,
  maxHeight: PropTypes.number,
  reverse: PropTypes.bool,
  open: PropTypes.bool,
};

Options.defaultProps = {
  options: [],
  highlighted: undefined,
  selected: undefined,
  onSelect: undefined,
  maxHeight: 0,
  reverse: false,
  open: false,
};

class Option extends PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    if (this.props.disabled) return;
    this.props.onClick();
  }
  render() {
    const {
      value, label, icon, selected, disabled, highlighted,
    } = this.props;
    const optionsClassNames = utils.composeClassNames([
      'input-select__options-item',
      selected && 'input-select__options-item--selected',
      disabled && 'input-select__options-item--disabled',
      highlighted && 'input-select__options-item--highlighted',
    ]);
    return (
      <div
        className={optionsClassNames}
        onClick={this.onClick}
        tabIndex="1"
        role="presentation"
        label={label}
        value={value}
      >
        {icon && <Icon className="input-select__options-item__icon" name={icon} size={16} />}
        <div className="input-select__options-item__label">
          <Tooltip>{label}</Tooltip>
        </div>
      </div>
    );
  }
}

Option.defaultProps = {
  highlighted: false,
  selected: false,
  disabled: false,
  onClick: undefined,
  label: undefined,
  icon: undefined,
};

Option.propTypes = {
  highlighted: PropTypes.bool,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string,
  icon: PropTypes.string,
};
export default Options;
