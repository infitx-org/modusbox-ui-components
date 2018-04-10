import React from 'react';
import PropTypes from 'prop-types';

const OverlayColumnResizer = ({
	isMinimumWidth, start, stop, name,
}) => (
	<div className={`overlay-column-resizer ${isMinimumWidth && 'minimum'}`} style={{ left: start, width: stop }}>
		<div className="overlay-column-resizer-label">{name}</div>
	</div>
);

OverlayColumnResizer.propTypes = {
	isMinimumWidth: PropTypes.bool,
	start: PropTypes.number,
	stop: PropTypes.number,
	name: PropTypes.string,
};

export default OverlayColumnResizer;
