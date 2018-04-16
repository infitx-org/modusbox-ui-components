import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Heading extends PureComponent {
	render() {
		const { size, children, style } = this.props;
		const intSize = parseInt(size);
		const number = Number.isNaN(intSize) === false && intSize;
		let component = null;
		switch (number) {
		case 1: component = <h1 style={style}>{children}</h1>; break;
		case 2: component = <h2 style={style}>{children}</h2>; break;
		case 3: component = <h3 style={style}>{children}</h3>; break;
		case 4: component = <h4 style={style}>{children}</h4>; break;
		case 5: component = <h5 style={style}>{children}</h5>; break;
		case 6: component = <h6 style={style}>{children}</h6>; break;
		default: component = <h3 style={style} >{children}</h3>; break;
		}
		return component;
	}
}

Heading.propTypes = {
	size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	style: PropTypes.shape(),
	children: PropTypes.node,
};
Heading.defaultProps = {
	size: 3,
	style: undefined,
	children: undefined,
};

export default Heading;
