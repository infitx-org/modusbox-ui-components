import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as utils from '../../utils/common';

import Icon, { iconSizes } from '../Icon';
import Spinner from '../Spinner';
import Tooltip from '../Tooltip';

class Dropdown extends PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.testKey = this.testKey.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.state = {
      isOpen: false,
    }
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.handlePageClick, false);
  }
  componentWillUnmount() {
    window.removeEventListener('mouseup', this.handlePageClick, false);
  }

  onClick() {
    if (this.props.disabled) {
      return;
    }
    
    this.setState({
      isOpen: !this.state.isOpen
    });

  }
  handlePageClick(e) {
    if (!this.container.contains(e.target)) {
      this.setState({ isOpen: false });
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
      size,
      kind,
      label,
      icon,
      noFill,
      disabled,
      pending,
      tooltip,
    } = this.props;
    const isDisabledOrPending = disabled === true || pending === true;
    const iconSize = iconSizes[size];
    const classNames = utils.composeClassNames([
      className,
      'mb-input',
      'input-dropdown__input',
      size === 's' && 'input-dropdown__mb-input--small',
      size === 'm' && 'input-dropdown__mb-input--medium',
      size === 'l' && 'input-dropdown__mb-input--large',
      kind === 'primary' && 'input-dropdown__mb-input--primary',
      kind === 'secondary' && 'input-dropdown__mb-input--secondary',
      kind === 'tertiary' && 'input-dropdown__mb-input--tertiary',
      kind === 'success' && 'input-dropdown__mb-input--success',
      kind === 'danger' && 'input-dropdown__mb-input--danger',
      kind === 'warning' && 'input-dropdown__mb-input--warning',
      kind === 'dark' && 'input-dropdown__mb-input--dark',
      kind === 'light' && 'input-dropdown__mb-input--light',
      isDisabledOrPending && 'mb-input--disabled input-dropdown__mb-input--disabled',
      pending && 'mb-input--pending input-dropdown__mb-input--pending',
      noFill && 'noFill',
    ]);

    const button = (
      <div className="input-dropdown" ref={container => { this.container = container; }}>
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
          <div className="input-dropdown__content">
            {(pending || icon) && (
              <div className="input-dropdown__icon">
                {pending ? (
                  <Spinner color="inherit" size={iconSize} />
                ) : (
                  <Icon name={icon} stroke="none" spin={pending} size={iconSize} />
                )}
              </div>
            )}
            {label && <span>{label}</span>}
          </div>
        </button>
        {this.state.isOpen && (
          <div
            className="input-dropdown__popup"
          >
            {this.props.children}
          </div>
        )}
      </div>
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
Dropdown.propTypes = {
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
  size: PropTypes.oneOf(['s', 'm', 'l']),
  label: PropTypes.string,
  icon: PropTypes.string,
  noFill: PropTypes.bool,
  disabled: PropTypes.bool,
  pending: PropTypes.bool,
  tooltip: PropTypes.string,
};
Dropdown.defaultProps = {
  className: undefined,
  id: undefined,
  style: undefined,
  kind: 'primary',
  size: 'l',
  label: undefined,
  icon: undefined,
  noFill: false,
  disabled: false,
  pending: false,
  tooltip: undefined,
};

export default Dropdown;
