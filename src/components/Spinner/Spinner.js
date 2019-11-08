import './Spinner.scss';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180.0);
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');
};

class Spinner extends PureComponent {
  render() {
    const { size, center, color } = this.props;
    const realSize = typeof size === 'string' ? { s: 20, m: 40, l: 60 }[size] : size;
    const strokeWidth = realSize / 10;
    const width = `${realSize}px`;
    const height = `${realSize}px`;
    const position = realSize / 2;
    const radius = position - strokeWidth;
    const spinnerStyle = {
      width: center === false && width,
      height: center === false && height,
    };
    const pathStyle = { stroke: color };

    return (
      <div className={`element-spinner ${center ? 'center' : ''}`} style={spinnerStyle}>
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
            style={pathStyle}
          />
        </svg>
      </div>
    );
  }
}

Spinner.defaultProps = {
  size: 20,
  center: false,
  color: undefined,
};

Spinner.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  center: PropTypes.bool,
  color: PropTypes.string,
};
export default Spinner;
