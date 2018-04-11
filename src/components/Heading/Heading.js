import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Heading extends PureComponent {
	render() {
		const { size, children } = this.props;
		const intSize = parseInt(size);
		const number = Number.isNaN(intSize) === false && intSize;
		let component = null;
		switch (number) {
		case 1: component = <h1>{children}</h1>; break;
		case 2: component = <h2>{children}</h2>; break;
		case 3: component = <h3>{children}</h3>; break;
		case 4: component = <h4>{children}</h4>; break;
		case 5: component = <h5>{children}</h5>; break;
		case 6: component = <h6>{children}</h6>; break;
		default: component = <h3>{children}</h3>; break;
		}
		return component;
	}
}

Heading.propTypes = {
	size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	children: PropTypes.node,
};
Heading.defaultProps = {
	size: 3,
	children: undefined,
};

export default Heading;
