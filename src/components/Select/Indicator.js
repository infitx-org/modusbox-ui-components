import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

const Indicator = ({ isOpen = false }) => (
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
	isOpen: PropTypes.bool
}

export default Indicator;
