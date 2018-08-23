import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import '../../icons/modusbox/arrow.svg';

const Indicator = ({ isOpen }) => (
  <Icon
    className="input-select__indicator"
    name="arrow"
    style={{
      marginTop: '2px',
      transform: `rotateZ(90deg) rotateY(${isOpen ? '180' : 0}deg)`,
    }}
    size={10}
    fill="rgba(0,0,0,0.5)"
  />
);

Indicator.propTypes = {
  isOpen: PropTypes.bool,
};
Indicator.defaultProps = {
  isOpen: false,
};

export default Indicator;
