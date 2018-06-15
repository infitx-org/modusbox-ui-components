import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import * as utils from '../../utils/common';

class Checkbox extends PureComponent {
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

  componentWillReceiveProps(nextProps) {
    const { checked } = nextProps;
    if (checked !== this.state.checked) {
      this.setState({ checked });
    }
  }
  onChange() {
    if (this.props.disabled) return;

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
    const {
      style, className, id, label, disabled, round, semi,
    } = this.props;
    const checkboxClassName = utils.composeClassNames(['mb-input', 'input-checkbox', className]);

    return (
      <div className={checkboxClassName} style={style}>
        <input
          ref={(input) => {
            this.input = input;
          }}
          type="checkbox"
          id={id}
          className={`input-checkbox__input ${semi ? 'semi-checked' : ''}`}
          onClick={this.onClick}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onKeyDown={this.testKey}
          onChange={e => e.preventDefault()}
          checked={checked && semi !== true}
          disabled={disabled}
        />
        <label
          htmlFor={id}
          className={`${round ? 'input-checkbox__label--round' : ''}`}
          onClick={this.onChange}
          role="presentation"
        >
          {label}
        </label>
      </div>
    );
  }
}
Checkbox.propTypes = {
  style: PropTypes.shape(),
  className: PropTypes.string,
  semi: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  round: PropTypes.bool,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
};
Checkbox.defaultProps = {
  style: undefined,
  className: undefined,
  semi: false,
  id: undefined,
  label: undefined,
  round: false,
  onBlur: undefined,
  onClick: undefined,
  onChange: undefined,
  onFocus: undefined,
  checked: false,
  disabled: false,
};
export default Checkbox;
