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


const TooltipMessage = ({ text, active }) => (
  <li className={`tooltip-content__message ${active ? 'tooltip-content__message--active' : ''}`}>
    <Icon name={active ? 'check-small' : 'close-small'} size={12} />
    <span className="tooltip-content__message-text">{text}</span>
  </li>
);

TooltipMessage.propTypes = {
  text: PropTypes.string,
  active: PropTypes.bool,
};
TooltipMessage.defaultProps = {
  text: undefined,
  active: false,
};


const TooltipMessages = ({ content }) => {
  let tooltipMessageList = null;
  if (!Array.isArray(content)) {
    tooltipMessageList = <TooltipMessage message={content} active={false} />;
  } else {
    tooltipMessageList = content.map((message, i) => (<TooltipMessage
      key={i.toString()}
      text={message.text}
      active={message.active}
    />));
  }
  return <ul className="tooltip-content__messages">{tooltipMessageList}</ul>;
};

TooltipMessages.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(TooltipMessage.defaultProps),
  ]),
};
TooltipMessages.defaultProps = {
  content: '',
};

const TooltipContent = ({
  icon, size, content, position, style = {},
}) => (
  <div className={`tooltip-content__box tooltip-content__box--${position}`} style={style}>
    <TooltipIcon icon={icon} size={size} />
    <TooltipMessages content={content} />
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
