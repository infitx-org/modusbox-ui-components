import React from 'react';
import * as utils from '../../utils/common';

import './Icon.scss';

class Icon extends React.PureComponent {
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
		const { className, style, size, name, fill, stroke, spin } = this.props;
		const svgStyle = {
			height: `${size}px`,
			width: `${size}px`,
			fill,
			stroke,
			...style,
		};
		const componentClassName = utils.composeClassNames([
			'element-icon',
			spin && 'spin',
			className,
		]);
		return (
			<svg
				style={svgStyle}
				onClick={this.onClick}
				className={componentClassName}
			>
				<use xlinkHref={`#${name}`} />
			</svg>
		);
	}
}

Icon.defaultProps = {
	id: undefined,
	style: undefined,
	className: undefined,
	size: 20,
	name: undefined,
	fill: undefined,
	stroke: undefined,
	spin: false,
};

Icon.propTypes = {
	idName: React.PropTypes.string,
	style: React.PropTypes.object,
	className: React.PropTypes.string,
	size: React.PropTypes.number,
	name: React.PropTypes.string,
	fill: React.PropTypes.string,
	stroke: React.PropTypes.string,
	spin: React.PropTypes.bool,
};
export default Icon;
