import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as utils from '../../utils/common';

import './Icon.scss';

class Icon extends PureComponent {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick(e) {
		if (typeof this.props.onClick === 'function') {
			this.props.onClick(e);
		}
	}
	render() {
		const {
			id, className, style, size, name, fill, stroke, spin,
		} = this.props;
		const svgStyle = {
			height: `${size}px`,
			width: `${size}px`,
			fill,
			stroke,
			...style,
		};
		const componentClassName = utils.composeClassNames(['element-icon', spin && 'spin', className]);
		return (
			<svg id={id} style={svgStyle} onClick={this.onClick} className={componentClassName}>
				<use xlinkHref={`#${name}`} />
			</svg>
		);
	}
}

Icon.propTypes = {
	id: PropTypes.string,
	style: PropTypes.shape(),
	className: PropTypes.string,
	size: PropTypes.number,
	name: PropTypes.string,
	fill: PropTypes.string,
	stroke: PropTypes.string,
	spin: PropTypes.bool,
	onClick: PropTypes.func,
};
Icon.defaultProps = {
	id: undefined,
	style: undefined,
	className: undefined,
	size: 20,
	name: undefined,
	fill: undefined,
	stroke: undefined,
	spin: false,
	onClick: undefined,
};

export default Icon;
