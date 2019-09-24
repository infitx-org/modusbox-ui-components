import React from 'react';
import PropTypes from 'prop-types';
import * as utils from '../../utils/common';
import { Icon, Tooltip } from '../index';
import './ControlIcon.scss';

const tooltipKind = (kind) => {
  if (kind === 'danger') {
    return 'error';
  } else if (kind === 'warning') {
    return 'warning';
  } else if (kind === 'primary') {
    return 'info';
  }
  return undefined;
}
const ControlIcon = ({
  color,
  icon,
  size,
  id,
  className,
  onClick,
  tooltip,
  tooltipPosition,
  delay = 300,
  kind,
  disabled,
}) => {
  const iconClassName = utils.composeClassNames([
    'control__icon',
    !disabled && onClick && 'control__icon--button',
    disabled && 'control__icon--disabled',
    kind === 'default' && 'control__icon--default',
    kind === 'primary' && 'control__icon--primary',
    kind === 'secondary' && 'control__icon--secondary',
    kind === 'tertiary' && 'control__icon--tertiary',
    kind === 'success' && 'control__icon--success',
    kind === 'danger' && 'control__icon--danger',
    kind === 'warning' && 'control__icon--warning',
    kind === 'dark' && 'control__icon--dark',
    kind === 'light' && 'control__icon--light',
    className,
  ]);

  let iconComponent = (
    <div
      className={iconClassName}
      role="presentation"
      onClick={disabled ? undefined : onClick}
      id={id}
    >
      <Icon size={size} name={icon} fill={color} />
    </div>
  );

  if (tooltip) {
    iconComponent = (
      <Tooltip label={tooltip} kind={tooltipKind(kind)} position={tooltipPosition} delay={delay}>
        {iconComponent}
      </Tooltip>
    );
  }

  return iconComponent;
};

ControlIcon.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
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
  icon: PropTypes.string,
  delay: PropTypes.number,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  tooltip: PropTypes.string,
};

ControlIcon.defaultProps = {
  className: undefined,
  id: undefined,
  style: undefined,
  kind: 'default',
  size: 20,
  icon: undefined,
  delay: 300,
  disabled: false,
  onClick: undefined,
  tooltip: undefined,
};

export default ControlIcon;
