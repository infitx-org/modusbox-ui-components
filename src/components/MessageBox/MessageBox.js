import './MessageBox.scss';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { composeClassNames } from '../../utils/common';
import { Icon } from '../index';

const splitLines = (prev, curr) => [...prev, ...curr.split(`\n`)];

const getMessageComponent = (message, index) => (
  <div key={index} className="message-box__message">
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
      kind,
      style,
      icon,
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
      'message-box',
      `message-box--${kind}`,
      center && 'message-box--centered',
      className,
    ]);

    const messagesClassName = composeClassNames([
      'message-box__messages',
      center && 'message-box__messages--centered'
    ]);

    let iconComponent = null;
    if (icon) {
      iconComponent = (
        <div className="message-box__icon-box" style={{ marginRight: `${higherSize / 2}px` }}>
          <Icon className="message-box__icon" name={icon} size={size} />
        </div>
      );
    }

    return (
      <div className={messageBoxClassName} style={{ style, padding: `${higherSize / 2}px` }}>
        {iconComponent}
        <div className={messagesClassName} style={{ fontSize: `${fontSize}px` }}>
          {children || getMessages(message)}
        </div>
      </div>
    );
  };
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
  icon: PropTypes.string,
  // TODO: Add iconPosition: PropTypes.oneOf(['left', 'right']),
};
MessageBox.defaultProps = {
  className: undefined,
  style: undefined,
  kind: 'default',
  size: 20,
  fontSize: 13,
  label: undefined,
  icon: undefined,
  // TODO: Add iconPosition: 'left', 
};

export default MessageBox;
