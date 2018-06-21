import React from 'react';
import PropTypes from 'prop-types';

import * as utils from '../../utils/common';
import Button from '../Button';
import Icon from '../Icon';
import Spinner from '../Spinner';
import Tooltip from '../Tooltip';

import './Common.scss';

const Loader = () => (
  <div className="mb-input__inner-icon mb-loader">
    <Spinner size={16} />
  </div>
);

Loader.propTypes = {};
Loader.defaultProps = {};

const Placeholder = ({ label, active }) => {
  // The Placeholder that renders inside an input

  const placeholderClassName = utils.composeClassNames([
    'mb-input__placeholder',
    active && 'mb-input__placeholder--active',
  ]);

  return <label className={placeholderClassName}>{label}</label>;
};

Placeholder.propTypes = {
  label: PropTypes.string,
  active: PropTypes.bool,
};

Placeholder.defaultProps = {
  label: undefined,
  active: false,
};

const InnerButton = ({
  className, kind, active, onClick, label, disabled, noFill, icon,
}) => {
  // Internal button used by inputs

  const innerButtonClassName = utils.composeClassNames([
    className,
    'mb-input__inner-button',
    active && 'mb-input__inner-button--active',
  ]);
  return (
    <Button
      kind={kind}
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
  kind: PropTypes.string,
  icon: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

InnerButton.defaultProps = {
  className: undefined,
  kind: 'primary',
  icon: undefined,
  active: false,
  onClick: undefined,
  label: undefined,
  disabled: false,
};

const ValidationMessage = ({ text, active }) => (
  <li className={`validation__message ${active ? 'validation__message--active' : ''}`}>
    <Icon name={active ? 'check-small' : 'close-small'} size={12} />
    <span className="validation__message-text">{text}</span>
  </li>
);

ValidationMessage.propTypes = {
  text: PropTypes.string,
  active: PropTypes.bool,
};
ValidationMessage.defaultProps = {
  text: undefined,
  active: false,
};

const ValidationMessages = ({ messages }) => {
  let validationMessageList = null;
  const messageList = !Array.isArray(messages) ? [messages] : messages;
  if (messageList.length) {
    validationMessageList = messageList.map((message, i) => (
      <ValidationMessage
        key={i.toString()}
        text={message.text}
        active={message.active}
      />
    ));
  }
  return <ul className="validation__messages">{validationMessageList}</ul>;
};

ValidationMessages.propTypes = {
  messages: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(ValidationMessage.defaultProps),
  ]),
};

ValidationMessages.defaultProps = {
  messages: undefined,
};

const InvalidIcon = ({ messages, forceTooltipVisibility }) => (
  <Tooltip
    position="right"
    kind="error"
    custom
    content={<ValidationMessages messages={messages} />}
    forceVisibility={forceTooltipVisibility}
  >
    <Icon size={16} name="warning-sign" />
  </Tooltip>
);
const Validation = ({ active, className, messages }) => {
  // Validation Icon with custom tooltip
  const invalidIconClassName = utils.composeClassNames([
    'mb-input__inner-icon',
    'mb-input__inner-icon--invalid',
    className,
  ]);
  return (
    <div className={invalidIconClassName}>
      <InvalidIcon messages={messages} forceTooltipVisibility={active} />
    </div>
  );
};

export { Loader, Placeholder, InnerButton, Validation };
