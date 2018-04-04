import React from 'react';
import PropTypes from 'prop-types';

const OverlayColumnResizer = props => (
	<div
		className={`overlay-column-resizer ${props.isMinimumWidth && 'minimum'}`}
		style={{ left: props.start, width: props.stop }}
	>
		<div className="overlay-column-resizer-label">{props.name}</div>
	</div>
);

export default OverlayColumnResizer;
