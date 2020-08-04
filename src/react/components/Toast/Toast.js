import './Toast.scss';

import * as utils from 'common/generic';
import PropTypes from 'prop-types';
import Notification from 'rc-notification';
import React, { Component } from 'react';

import Icon from '../Icon';

/* initialized Toast Lib */
let notification;
Notification.newInstance(
  {
    style: { bottom: 0, right: '20px' },
  },
  n => {
    notification = n;
  },
);

let toastCount = 0;
const now = Date.now();
function toastUID() {
  toastCount += 1;
  return `el-toast_${now}_${toastCount}`;
}
function close(key) {
  notification.removeNotice(key);
}
const noOp = () => {};

/**
 Toast is used to diplay quick notifications to the user in the corners of the screen
 */

const iconNameMaps = {
  success: 'check-small',
  error: 'close-small',
  info: 'info-small',
};
export default class Toast extends Component {
  static show(config) {
    const text = config.title ? config.title : '';
    const toastKey = config.key ? config.key : toastUID();
    const toastKind = config.kind ? config.kind : 'custom';
    const toastDuration = config.duration ? config.duration : 4;
    const toastOnClose = config.onClose ? config.onClose : noOp;
    const toastStyle = config.style ? config.style : {};
    const closeable = config.closeable ? close.bind(null, toastKey) : noOp;
    const toastContent = (
      <span id={toastKey} onClick={closeable} role="presentation">
        <Toast title={text} kind={toastKind}>
          {config.element}
        </Toast>
      </span>
    );

    const toastConfig = {
      key: toastKey,
      content: toastContent,
      style: toastStyle,
      duration: toastDuration,
      onClose: toastOnClose,
    };
    notification.notice(toastConfig);
    if (config.onOpen) {
      config.onOpen(toastKey);
    }
  }

  static remove(key) {
    notification.removeNotice(key);
  }

  getClassNames() {
    const { kind, className } = this.props;
    const isCustom = kind === 'custom';
    const componentClassName = utils.composeClassNames([
      'el-toast',
      `el-toast--${kind}`,
      className,
      isCustom && 'el-toast-noPadding',
      !isCustom && 'el-toast-padding',
    ]);
    return componentClassName;
  }
  render() {
    const { kind, children, title } = this.props;
    const className = this.getClassNames();
    const isCustom = kind === 'custom';

    let icon = null;
    if (!isCustom) {
      const iconName = iconNameMaps[kind];
      icon = (
        <div className="el-toast__icon">
          <Icon name={iconName} size={20} />
        </div>
      );
    }

    const titleElement = (
      <div className="el-toast__title">
        {icon} {title}
      </div>
    );

    const childrenElement = <div className="el-toast__custom">{children}</div>;

    return (
      <div className={className}>
        {title && titleElement}
        {children && childrenElement}
      </div>
    );
  }
}

Toast.propsTypes = {
  closeable: PropTypes.bool,
  kind: PropTypes.oneOf(['success', 'error', 'info', 'custom']),
  title: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
};

Toast.defaultProps = {
  closeable: undefined,
  kind: undefined,
  title: undefined,
  children: undefined,
  className: undefined,
};
