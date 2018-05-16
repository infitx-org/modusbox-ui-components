import React from 'react';
import PropTypes from 'prop-types';

import * as utils from '../../utils/common';
import Button from '../Button';
import Icon from '../Icon';
import Spinner from '../Spinner';
import Tooltip, { TooltipContent } from '../Tooltip';

const Loader = ({ visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className="mb-input__inner-icon mb-loader">
      <Spinner size={16} />
    </div>
  );
};

Loader.propTypes = {
  visible: PropTypes.bool,
};
Loader.defaultProps = {
  visible: true,
};

const Placeholder = ({ label, active }) => {
  if (!label === 'string') {
    return null;
  }

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
  kind, isOpen, onClick, label, disabled,
}) => {
  const className = utils.composeClassNames([
    'mb-input__inner-button',
    isOpen && 'mb-input__inner-button--active',
  ]);
  return (
    <Button
      kind={kind}
      className={className}
      noFill
      onClick={onClick}
      tabIndex="-1"
      label={label}
      disabled={disabled}
    />
  );
};

InnerButton.propTypes = {
  kind: PropTypes.string,
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

InnerButton.defaultProps = {
  kind: 'primary',
  isOpen: false,
  onClick: undefined,
  label: undefined,
  disabled: false,
};

const InvalidIcon = ({ messages, forceTooltipVisibility }) => {
  const tooltipContent = <TooltipContent content={messages} size={16} kind="error" />;
  return (
    <Tooltip
      position="right"
      kind="error"
      content={tooltipContent}
      forceVisibility={forceTooltipVisibility}
    >
      <Icon size={16} name="warning-sign" />
    </Tooltip>
  );
};

export { Loader, Placeholder, InnerButton, InvalidIcon };
