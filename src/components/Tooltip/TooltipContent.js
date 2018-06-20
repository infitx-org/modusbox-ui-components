import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

const TooltipIcon = ({ icon, size }) => {
  if (!icon) {
    return null;
  }
  return (
    <div className="tooltip-content__icon-box">
      <Icon size={size} name={icon} />
    </div>
  );
};

TooltipIcon.propTypes = {
  icon: PropTypes.string,
  size: PropTypes.number,
};
TooltipIcon.defaultProps = {
  icon: undefined,
  size: 0,
};

const TooltipContent = ({
  icon, size, content, position, style = {}, children,
}) => (
  <div className={`tooltip-content__box tooltip-content__box--${position}`} style={style}>
    <TooltipIcon icon={icon} size={size} />
    {children}
  </div>
);

TooltipContent.propTypes = {
  icon: PropTypes.string,
  size: PropTypes.number,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  position: PropTypes.string,
  style: PropTypes.shape(),
};
TooltipContent.defaultProps = {
  icon: undefined,
  size: undefined,
  content: undefined,
  position: 'right',
  style: undefined,
};

export default TooltipContent;
