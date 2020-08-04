import './Pill.scss';

import PropTypes from 'prop-types';
import React from 'react';
import { composeClassNames } from 'utils/common';

import Icon from '../Icon';
import Tooltip from '../Tooltip';

const Pill = ({ id, className, kind = 'default', icon, fill, label, active, tooltip }) => {
  const pillClassName = composeClassNames([
    'el',
    'el-pill',
    `el-pill--${kind}`,
    active ? `el-pill--active` : `el-pill--inactive`,
    className,
  ]);

  let pill = (
    <div className={pillClassName} id={id}>
      {icon && (
        <div className="el-pill__icon-box">
          <Icon name={icon} size={16} className="el-pill__icon" fill={fill} />
        </div>
      )}
      {label && <span className="el-pill__label">{label}</span>}
    </div>
  );

  if (tooltip) {
    pill = <Tooltip label={tooltip}>{pill}</Tooltip>;
  }
  return pill;
};

export default Pill;

Pill.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
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
  fill: PropTypes.string,
  label: PropTypes.string,
  active: PropTypes.bool,
  tooltip: PropTypes.string,
};
