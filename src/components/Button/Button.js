import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as utils from '../../utils/common';

import Icon from '../Icon';
import Spinner from '../Spinner';
import Tooltip from '../Tooltip';

class Button extends PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.testKey = this.testKey.bind(this);
  }

  componentWillReceiveProps() {}

  onClick(e) {
    if (this.props.disabled) return;
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }
  testKey(e) {
    if (e.nativeEvent.keyCode === 9) {
      e.preventDefault();
      utils.focusNextFocusableElement(this.input, !e.nativeEvent.shiftKey);
      return;
    }

    if (e.nativeEvent.keyCode === 13) {
      e.preventDefault();
      this.onClick(e);
    }
  }
  render() {
    const {
      id,
      className,
      style,
      kind,
      label,
      icon,
      noFill,
      disabled,
      pending,
      tooltip,
    } = this.props;
    const isDisabledOrPending = disabled === true || pending === true;
    const classNames = utils.composeClassNames([
      className,
      'mb-input',
      'input-button__input',
      kind === 'primary' && 'input-button__mb-input--primary',
      kind === 'secondary' && 'input-button__mb-input--secondary',
      kind === 'tertiary' && 'input-button__mb-input--tertiary',
      kind === 'success' && 'input-button__mb-input--success',
      kind === 'danger' && 'input-button__mb-input--danger',
      kind === 'warning' && 'input-button__mb-input--warning',
      kind === 'dark' && 'input-button__mb-input--dark',
      kind === 'light' && 'input-button__mb-input--light',
      isDisabledOrPending && 'mb-input--disabled input-button__mb-input--disabled',
      pending && 'mb-input--pending input-button__mb-input--pending',
      noFill && 'noFill',
    ]);

    const button = (
      <button
        ref={input => {
          this.input = input;
        }}
        id={id}
        style={style}
        className={classNames}
        onKeyDown={this.testKey}
        onClick={this.onClick}
        disabled={isDisabledOrPending}
        label={label}
        kind={kind}
      >
        <div className="input-button__content">
          {(pending || icon) && (
            <div className="input-button__icon">
              {pending ? (
                <Spinner color="inherit" size={16} />
              ) : (
                <Icon name={icon} stroke="none" spin={pending} size={16} />
              )}
            </div>
          )}
          {label && <span>{label}</span>}
        </div>
      </button>
    );

    if (tooltip) {
      return (
        <Tooltip label={tooltip} position="top">
          {button}
        </Tooltip>
      );
    }
    return button;
  }
}
Button.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.shape(),
  kind: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'success',
    'danger',
    'warning',
    'dark',
    'light',
  ]),
  label: PropTypes.string,
  icon: PropTypes.string,
  noFill: PropTypes.bool,
  disabled: PropTypes.bool,
  pending: PropTypes.bool,
  onClick: PropTypes.func,
  tooltip: PropTypes.string,
};
Button.defaultProps = {
  className: undefined,
  id: undefined,
  style: undefined,
  kind: 'primary',
  label: undefined,
  icon: undefined,
  noFill: false,
  disabled: false,
  pending: false,
  onClick: undefined,
  tooltip: undefined,
};

export default Button;
