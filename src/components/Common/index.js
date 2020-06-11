import './Common.scss';
import '../../icons/mule/check-small.svg';
import '../../icons/mule/close-small.svg';

import PropTypes from 'prop-types';
import React from 'react';

import * as utils from '../../utils/common';
import Button from '../Button';
import Icon, { iconSizes } from '../Icon';
import Row from '../Row';
import Spinner from '../Spinner';
import Tooltip from '../Tooltip';

const Loader = ({ size }) => (
  <div className="mb-input__inner-icon mb-loader">
    <Spinner size={iconSizes[size]} />
  </div>
);

Loader.propTypes = {
  size: PropTypes.oneOf(['s', 'm', 'l']),
};
Loader.defaultProps = {
  size: 'l',
};

const Placeholder = ({ label, size, active }) => {
  // The Placeholder that renders inside an input

  const placeholderClassName = utils.composeClassNames([
    'mb-input__placeholder',
    size === 's' && 'mb-input__placeholder--small',
    size === 'm' && 'mb-input__placeholder--medium',
    size === 'l' && 'mb-input__placeholder--large',
    size === 's' && active && 'mb-input__placeholder--active-small',
    size === 'm' && active && 'mb-input__placeholder--active-medium',
    size === 'l' && active && 'mb-input__placeholder--active-large',
  ]);

  return <label className={placeholderClassName}>{label}</label>;
};

Placeholder.propTypes = {
  label: PropTypes.string,
  active: PropTypes.bool,
  size: PropTypes.oneOf(['s', 'm', 'l']),
};

Placeholder.defaultProps = {
  label: undefined,
  active: false,
  size: 'l',
};

const InnerButton = ({ className, size, kind, onClick, label, disabled, noFill, icon }) => {
  // Internal button used by inputs

  let innerButtonSize;
  if (size === 'l') {
    innerButtonSize = 'm';
  } else if (size === 'm') {
    innerButtonSize = 's';
  } else {
    innerButtonSize = 'xs';
  }

  const innerButtonClassName = utils.composeClassNames([
    className,
    'mb-input__inner-button',
    size === 's' && 'mb-input__inner-button--small',
    size === 'm' && 'mb-input__inner-button--medium',
    size === 'l' && 'mb-input__inner-button--large',
  ]);
  return (
    <Button
      kind={kind}
      size={innerButtonSize}
      className={innerButtonClassName}
      icon={icon}
      noFill={noFill}
      onClick={onClick}
      tabIndex="-1"
      label={label}
      disabled={disabled}
    />
  );
};

InnerButton.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['s', 'm', 'l']),
  kind: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

InnerButton.defaultProps = {
  className: undefined,
  size: 'l',
  kind: 'primary',
  icon: undefined,
  onClick: undefined,
  label: undefined,
  disabled: false,
};

const ActiveValidationIcon = () => (
  <Icon className="validation__message__icon--active" name="close-small" size={12} />
);
const InactiveValidationIcon = () => (
  <Icon className="validation__message__icon--inactive" name="check-small" size={14} />
);
const UnsetValidationIcon = () => <div className="validation__message__icon--unset" />;

const ValidationIcon = ({ active }) => {
  if (active === true) {
    return <ActiveValidationIcon />;
  } else if (active === false) {
    return <InactiveValidationIcon />;
  }
  return <UnsetValidationIcon />;
};

const ValidationMessage = ({ message, active }) => (
  <Row>
    <li
      className={`validation__message ${active === false ? 'validation__message--inactive' : ''}`}
    >
      <div className="validation__message__icon-container">
        <ValidationIcon active={active} />
      </div>
      <span className="validation__message__text">{message}</span>
    </li>
  </Row>
);

ValidationMessage.propTypes = {
  message: PropTypes.string,
  active: PropTypes.bool,
};
ValidationMessage.defaultProps = {
  message: undefined,
  active: undefined,
};

const ValidationMessages = ({ messages }) => {
  let validationMessageList = null;
  if (messages.length) {
    validationMessageList = messages.map(({ message, active }, i) => (
      <ValidationMessage key={i.toString()} message={message} active={active} />
    ));
  }
  return <ul className="validation__messages">{validationMessageList}</ul>;
};

ValidationMessages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape(ValidationMessage.propTypes)),
};

ValidationMessages.defaultProps = {
  messages: [],
};

const InvalidIcon = ({ size }) => (
  <Icon
    size={iconSizes[size]}
    name="warning-sign"
    className="mb-input__inner-icon validation__icon validation__icon--invalid "
    tooltip="Invalid"
    tooltipDelay={500}
    tooltipKind="error"
  />
);

const ValidationWrapper = ({ messages, active, children }) => (
  <Tooltip
    position="right"
    kind="neutral"
    custom
    delay={500}
    content={<ValidationMessages messages={messages} />}
    forceVisibility={active === true && messages && messages.length > 0}
    showOnHover={false}
  >
    {children}
  </Tooltip>
);

const NamedIcon = ({ namedIconTitle }) => <div className="named__icon">{namedIconTitle[0]}</div>;

NamedIcon.propTypes = {
  namedIconTitle: PropTypes.string,
};
NamedIcon.defaultProps = {
  namedIconTitle: undefined,
};

export { Loader, Placeholder, InnerButton, ValidationWrapper, InvalidIcon, NamedIcon };
