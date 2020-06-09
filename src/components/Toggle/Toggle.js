import './Toggle.scss';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import * as utils from '../../utils/common';

class Toggle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked,
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.testKey = this.testKey.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (this.props.checked !== prevProps.checked) {
      // eslint-disable-next-line
      this.setState({ checked: this.props.checked });
    }
  }

  onChange(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.disabled) {
      return;
    }

    const checked = !this.state.checked;
    this.setState({ checked });
    if (this.props.onChange) {
      this.props.onChange(checked);
    }
  }
  onBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }
  onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }
  onFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }
  testKey(e) {
    if (e.keyCode === 9) {
      e.stopPropagation();
      e.preventDefault();
      utils.focusNextFocusableElement(this.input, !e.shiftKey);
      return;
    }
    if (e.keyCode === 13) {
      e.stopPropagation();
      e.preventDefault();
      this.onChange(e);
    }
  }
  render() {
    const { checked } = this.state;
    const { style, className, id, label, disabled } = this.props;
    const toggleClassName = utils.composeClassNames(['mb-input', 'input-toggle', className]);
    const labelClassName = utils.composeClassNames([!label && 'input-toggle__label--no-margin']);
    return (
      <div className={toggleClassName} style={style}>
        <input
          ref={input => {
            this.input = input;
          }}
          type="checkbox"
          id={id}
          className="input-toggle__input"
          onClick={this.onClick}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onKeyDown={this.testKey}
          onChange={e => {
            e.preventDefault();
            e.stopPropagation();
          }}
          checked={checked}
          disabled={disabled}
        />
        {/* eslint-disable-next-line */}
        <label htmlFor={id} className={labelClassName} onClick={this.onChange} role="button">
          {label}
        </label>
      </div>
    );
  }
}
Toggle.propTypes = {
  style: PropTypes.shape(),
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
};
Toggle.defaultProps = {
  style: undefined,
  className: undefined,
  id: undefined,
  label: undefined,
  onBlur: undefined,
  onClick: undefined,
  onChange: undefined,
  onFocus: undefined,
  checked: false,
  disabled: false,
};
export default Toggle;
