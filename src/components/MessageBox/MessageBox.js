import './MessageBox.scss';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { composeClassNames } from '../../utils/common';
import { Icon } from '../index';

const splitLines = (prev, curr) => [...prev, ...curr.split(`\n`)];

const getMessageComponent = (message, index) => (
  <div key={index} className="el-message-box__message">
    {message}
  </div>
);

const getMessages = message => {
  const subMessages = typeof message === 'string' ? [message] : message;
  return subMessages.reduce(splitLines, []).map(getMessageComponent);
};

class MessageBox extends PureComponent {
  render() {
    const {
      id,
      kind,
      style,
      active,
      icon,
      fill,
      message,
      center,
      size,
      fontSize,
      className,
      children,
    } = this.props;

    if (!message && !children) {
      return null;
    }

    const higherSize = Math.max.apply(Math, [icon ? size : 0, fontSize, 20]);

    const messageBoxClassName = composeClassNames([
      'el-message-box',
      `el-message-box--${kind}`,
      active ? `el-message-box--active` : `el-message-box--inactive`,
      center && 'el-message-box--centered',
      className,
    ]);

    const messagesClassName = composeClassNames([
      'el-message-box__messages',
      center && 'el-message-box__messages--centered',
    ]);

    const messageBoxStyle = {
      ...style,
      padding: `${higherSize / 2}px`,
      borderWidth: `${parseInt(higherSize / 10, 10)}px`,
    };

    const messagesStyle = {
      fontSize: `${fontSize}px`,
    };

    let iconComponent = null;
    if (icon) {
      iconComponent = (
        <div className="el-message-box__icon-box" style={{ marginRight: `${higherSize / 2}px` }}>
          <Icon className="el-message-box__icon" name={icon} size={size} fill={fill} />
        </div>
      );
    }

    return (
      <div id={id} className={messageBoxClassName} style={messageBoxStyle}>
        {iconComponent}
        <div className={messagesClassName} style={messagesStyle}>
          {children || getMessages(message)}
        </div>
      </div>
    );
  }
}

MessageBox.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape(),
  kind: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'tertiary',
    'success',
    'danger',
    'warning',
    'dark',
    'light',
  ]),
  size: PropTypes.number,
  fontSize: PropTypes.number,
  fill: PropTypes.string,
  icon: PropTypes.string,
  active: PropTypes.bool,
  center: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  // TODO: Add iconPosition: PropTypes.oneOf(['left', 'right']),
};
MessageBox.defaultProps = {
  className: undefined,
  style: undefined,
  kind: 'default',
  size: 20,
  fontSize: 13,
  fill: undefined,
  icon: undefined,
  message: '',
  center: false,
  active: false,

  // TODO: Add iconPosition: 'left',
};

export default MessageBox;
