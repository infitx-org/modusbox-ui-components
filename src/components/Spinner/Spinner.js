import React, { PropTypes } from 'react';

import './Spinner.scss';

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
	var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
	return {
		x: centerX + radius * Math.cos(angleInRadians),
		y: centerY + radius * Math.sin(angleInRadians),
	};
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
	const start = polarToCartesian(x, y, radius, endAngle);
	const end = polarToCartesian(x, y, radius, startAngle);
	const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
	return [
		'M',
		start.x,
		start.y,
		'A',
		radius,
		radius,
		0,
		largeArcFlag,
		0,
		end.x,
		end.y,
	].join(' ');
};

const Spinner = ({ size, center, color }) => {
	const realSize =
		typeof size === 'string' ? { s: 16, m: 30, l: 50 }[size] : size;
	const strokeWidth = realSize / 10;
	const width = `${realSize}px`,
		height = `${realSize}px`;
	const position = realSize / 2;
	const radius = position - strokeWidth;
	const style = { stroke: color };

	return (
		<div
			className={`element-spinner ${center ? 'center' : ''}`}
			style={{ width, height }}
		>
			<svg
				className="element-spinner__component"
				width={width}
				height={height}
				viewBox={`0 0 ${realSize} ${realSize}`}
			>
				<path
					className="element-spinner__svg-path"
					strokeWidth={strokeWidth}
					d={describeArc(position, position, radius, 90, 200)}
					style={style}
				/>
			</svg>
		</div>
	);
};

Spinner.defaultProps = {
	size: 20,
	center: false,
	color: undefined,
};

Spinner.PropTypes = {
	size: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number,
	]),
	center: React.PropTypes.bool,
	color: React.PropTypes.string,
};
export default Spinner;
