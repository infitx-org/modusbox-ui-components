import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import * as utils from '../../utils/common';

import ScrollBox from '../ScrollBox';
import Icon, { iconSizes } from '../Icon';
import Tooltip from '../Tooltip';

class Options extends PureComponent {
  constructor(props) {
    super(props);

    this.onClickOption = this.onClickOption.bind(this);
    this.items = [];
  }

  onClickOption(item) {
    this.props.onSelect(item);
  }
  render() {
    const { options, selected, highlighted, maxHeight, reverse, open, size, onClear } = this.props;

    if (!open) {
      return null;
    }

    const className = utils.composeClassNames([
      'input-select__options-wrapper',
      reverse && 'input-select__options-wrapper--reverse',
      !reverse && 'input-select__options-wrapper--regular',
      size === 's' && reverse && 'input-select__options-wrapper--reverse-small',
      size === 's' && !reverse && 'input-select__options-wrapper--regular-small',
      size === 'm' && reverse && 'input-select__options-wrapper--reverse-medium',
      size === 'm' && !reverse && 'input-select__options-wrapper--regular-medium',
      size === 'l' && reverse && 'input-select__options-wrapper--reverse-large',
      size === 'l' && !reverse && 'input-select__options-wrapper--regular-large',
    ]);

    let clearOption = null;
    if (this.props.clearable && selected !== undefined) {
      clearOption = <ClearOption onClick={onClear} size={size} />;
    }

    let optionItems = null;
    if (options.length > 0) {
      optionItems = options.map((item, index) => {
        const isSelected = selected === item.value;
        return (
          <Option
            size={size}
            highlighted={item.value === highlighted}
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
          <Icon name="info-small" size={iconSizes[size]} />
          <div className="input-select__options-item--no-options__message">
            No options available
          </div>
        </div>
      );
    }
    return (
      <div className={className}>
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
            ref={items => {
              this.items = items;
            }}
          >
            {clearOption}
            {optionItems}
          </div>
        </ScrollBox>
      </div>
    );
  }
}

const valuePropType = PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]);

Options.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: valuePropType,
    }),
  ),
  highlighted: valuePropType,
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
    const { size, value, label, icon, selected, disabled, highlighted } = this.props;
    const optionsClassNames = utils.composeClassNames([
      'input-select__options-item',
      size === 's' && 'input-select__options-item--small',
      size === 'm' && 'input-select__options-item--medium',
      size === 'l' && 'input-select__options-item--large',
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
        {icon && (
          <Icon className="input-select__options-item__icon" name={icon} size={iconSizes[size]} />
        )}
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

const ClearOption = ({ onClick, size }) => {
  const clearOptionClassName = utils.composeClassNames([
    'input-select__options-item',
    size === 's' && 'input-select__options-item--small',
    size === 'm' && 'input-select__options-item--medium',
    size === 'l' && 'input-select__options-item--large',
    'input-select__options-item--clear',
  ]);
  const clearOptionIconClassName = utils.composeClassNames([
    'input-select__options-item__icon',
    'input-select__options-item__icon--clear',
  ]);
  const clearOptionLabelClassName = utils.composeClassNames([
    'input-select__options-item__label',
    'input-select__options-item__label--clear',
  ]);
  return (
    <div
      className={clearOptionClassName}
      onClick={onClick}
      tabIndex="1"
      role="presentation"
      label="Clear"
    >
      <Icon className={clearOptionIconClassName} name="close-small" size={iconSizes[size]} />
      <div className={clearOptionLabelClassName}>
        <Tooltip>Clear</Tooltip>
      </div>
    </div>
  );
};

export default Options;
