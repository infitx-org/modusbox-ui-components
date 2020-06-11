import './Icon.scss';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import * as utils from '../../utils/common';
import Tooltip from '../Tooltip';

const iconSizes = {
  xs: 10,
  s: 12,
  m: 14,
  l: 16,
};

class Icon extends PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }
  render() {
    const {
      id,
      className,
      style,
      size,
      name,
      fill,
      stroke,
      spin,
      tooltip,
      tooltipKind,
      tooltipDelay,
      tooltipPosition,
    } = this.props;

    const svgStyle = {
      height: `${size}px`,
      width: `${size}px`,
      fill,
      stroke,
      ...style,
    };
    const componentClassName = utils.composeClassNames([
      'el-icon',
      spin && 'el-icon--spin',
      className,
    ]);
    const svg = (
      <svg id={id} style={svgStyle} onClick={this.onClick} className={componentClassName}>
        <use xlinkHref={`#${name}`} />
      </svg>
    );
    if (tooltip) {
      return (
        <Tooltip label={tooltip} position={tooltipPosition} delay={tooltipDelay} kind={tooltipKind}>
          {svg}
        </Tooltip>
      );
    }
    return svg;
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
  tooltipKind: PropTypes.oneOf(['regular', 'error', 'info', 'warning', 'neutral']),
  tooltipDelay: PropTypes.number,
  tooltip: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  tooltipPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
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
  tooltipKind: undefined,
  tooltipDelay: undefined,
  tooltip: undefined,
  tooltipPosition: undefined,
};

export default Icon;
export { iconSizes };
