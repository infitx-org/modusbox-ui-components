import './Link.scss';

import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../Icon';

const Link = ({ value, children, onClick }) => {
  const content = value !== undefined ? value.toString() : children;
  return (
    <div className="el-datalist__link" onClick={onClick} role="presentation">
      <div className="el-datalist__link__container">
        <span className="el-datalist__link__content">{content}</span>
      </div>
      <div className="el-datalist__link__icon">
        <Icon name="open" size={16} fill="#00A3E0" />
      </div>
    </div>
  );
};

Link.defaultProps = {
  onClick: undefined,
  value: undefined,
  children: undefined,
};
Link.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
  children: PropTypes.node,
};
export default Link;
