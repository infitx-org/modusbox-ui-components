import React from 'react';
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

const TooltipMessage = ({ children }) => (
  <div className="tooltip-content__message">
    <span>{children}</span>
  </div>
);

const TooltipContent = ({
  icon, size, content, position, style = {},
}) => {
  let tooltipMessage = <TooltipMessage>{content}</TooltipMessage>;
  if (typeof content === 'object' && Array.isArray(content)) {
    tooltipMessage = content.map(msg =>
      msg.split('.').map((line, i) => <TooltipMessage key={i.toString()}>{line}</TooltipMessage>));
  }
  return (
    <div className={`tooltip-content__box tooltip-content__box--${position}`} style={style}>
      <TooltipIcon icon={icon} size={size} />
      <div className="tooltip-content__message-box">{tooltipMessage}</div>
    </div>
  );
};

export default TooltipContent;
