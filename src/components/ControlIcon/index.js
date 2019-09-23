import React from 'react';
import * as utils from '../../utils/common';
import { Icon, Tooltip } from '../index';
import './ControlIcon.scss';

const ControlIcon = ({
  color,
  icon,
  size = 20,
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
    >
      <Icon size={size} name={icon} fill={color} />
    </div>
  );

  if (tooltip) {
    iconComponent = (
      <Tooltip label={tooltip} kind={kind} position={tooltipPosition} delay={delay}>
        {iconComponent}
      </Tooltip>
    );
  }

  return iconComponent;
};

export default ControlIcon;
