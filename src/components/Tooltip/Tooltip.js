import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import * as utils from '../../utils/common';

const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

class Tooltip extends PureComponent {
  static getPosition(box, target, position) {
    let coordinates = {};
    const { innerWidth, innerHeight } = window;
    const boxRect = box.getBoundingClientRect();
    const tooltipRect = target.getBoundingClientRect();

    const leftCenteredByY = boxRect.left + (boxRect.width - tooltipRect.width) / 2;
    const topCenteredByX = boxRect.top + (boxRect.height - tooltipRect.height) / 2;

    const getTop = () => ({
      top: boxRect.top - tooltipRect.height - 10,
      left: leftCenteredByY,
      direction: 'top',
    });
    const getBottom = () => ({
      top: boxRect.top + boxRect.height + 10,
      left: leftCenteredByY,
      direction: 'bottom',
    });
    const getLeft = () => ({
      top: topCenteredByX,
      left: boxRect.left - tooltipRect.width - 10,
      direction: 'left',
    });
    const getRight = () => ({
      top: topCenteredByX,
      left: boxRect.left + boxRect.width + 10,
      direction: 'right',
    });

    // Calculate tooltip position, it should be centered on top of the box
    if (position === 'top') {
      coordinates = getTop();
    } else if (position === 'bottom') {
      coordinates = getBottom();
    } else if (position === 'left') {
      coordinates = getLeft();
    } else if (position === 'right') {
      coordinates = getRight();
    }

    if (coordinates.left < 10) {
      coordinates = getRight();
    }
    if (coordinates.left + tooltipRect.width > innerWidth - 10) {
      coordinates = getLeft();
    }
    if (coordinates.top < 10) {
      coordinates = getBottom();
    }
    if (coordinates.top + tooltipRect.height > innerHeight - 10) {
      coordinates = getTop();
    }

    return coordinates;
  }
  constructor(props) {
    super(props);
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.delayShowTooltip = this.delayShowTooltip.bind(this);
    this.delayHideTooltip = this.delayHideTooltip.bind(this);
  }
  componentDidMount() {
    this.box.addEventListener('mouseenter', this.delayShowTooltip);
    this.box.addEventListener('mouseleave', this.delayHideTooltip);
    this._mounted = true;
    if (this.props.forceVisibility === true) {
      this.delayShowTooltip();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.forceVisibility === true) {
      this.delayShowTooltip(1);
    }
    if (nextProps.forceVisibility === false) {
      this.delayHideTooltip(1);
    }
  }
  componentWillUnmount() {
    this._mounted = false;
    this.hideTooltip(true);
    this.box.removeEventListener('mouseenter', this.delayShowTooltip);
    this.box.removeEventListener('mouseleave', this.delayHideTooltip);
  }
  delayShowTooltip(delay) {
    const customDelay = typeof delay === 'number' ? delay : null;
    this._isHoveringTooltip = true;
    clearTimeout(this.tooltipTimeout);
    this.tooltipTimeout = setTimeout(this.showTooltip, customDelay || this.props.delay);
  }
  delayHideTooltip(delay) {
    if (this.props.forceVisibility === false) {
      this._isHoveringTooltip = false;
      clearTimeout(this.tooltipTimeout);
      this.tooltipTimeout = setTimeout(this.hideTooltip, delay || 200);
    }
  }
  showTooltip(force) {
    if (this._isHoveringTooltip === false && force === false) {
      return;
    }
    if (this.box === undefined) {
      return;
    }
    if (this._hasMountedTooltip === true) {
      return;
    }

    const {
      content, label, position, children, kind, custom,
    } = this.props;
    const { scrollWidth, offsetWidth } = this.box;
    const hasChildrenOverflow = scrollWidth > offsetWidth;
    const isLabelDefined = label !== undefined;
    const isContentDefined = content !== undefined;
    const shouldShowTooltip = hasChildrenOverflow || isLabelDefined || isContentDefined;

    if (!shouldShowTooltip) {
      return;
    }

    let tooltipInnerComponent = <span>{children}</span>;

    if (content) {
      // We need to provide the content with the position it will be render
      if (custom) {
        tooltipInnerComponent = React.cloneElement(content, {
          ...content.props,
          position,
        });
      } else {
        tooltipInnerComponent = content;
      }
    } else if (label) {
      tooltipInnerComponent = <span>{label}</span>;
    }

    this._viewer = document.createElement('div');
    this._viewer.className = utils.composeClassNames([
      'element-tooltip__viewer',
      'element-tooltip__viewer--fade-in',
      (custom !== true) && 'element-tooltip__viewer--default',
      (custom !== true) && `element-tooltip__viewer--${kind}`,
    ]);

    this._child = document.createElement('div');
    this._child.className = utils.composeClassNames([
      'element-tooltip__child',
      custom && 'element-tooltip__child--custom',
    ]);

    this._handle = document.createElement('div');
    this._handle.className = utils.composeClassNames([
      'element-tooltip__handle',
      `element-tooltip__handle--${kind}`,
    ]);

    this._viewer.appendChild(this._handle);
    this._target = this._viewer.appendChild(this._child);
    this._location = document.body.appendChild(this._viewer);

    this._component = renderSubtreeIntoContainer(this, tooltipInnerComponent, this._target);

    const { top, left, direction } = Tooltip.getPosition(this.box, this._location, position);

    // Apply final updates to the tooltip itself
    this._location.style.top = top;
    this._location.style.left = left;

    // Apply direction classNames
    this._viewer.className += ` element-tooltip__viewer--fade-in-${direction}`;
    this._handle.className += ` element-tooltip__handle--${direction}`;

    this._hasMountedTooltip = true;
  }
  hideTooltip(force = false) {
    if (this._isHoveringTooltip === true && force === false) {
      return;
    }
    if (this._hasMountedTooltip) {
      ReactDOM.unmountComponentAtNode(this._target);
      document.body.removeChild(this._location);
      this._target = null;
      this._component = null;
      this._hasMountedTooltip = false;
    }
  }

  render() {
    const { style, children } = this.props;
    return (
      <div
        className="element-tooltip"
        style={style}
        ref={(box) => {
          this.box = box;
        }}
      >
        {children}
      </div>
    );
  }
}

Tooltip.propTypes = {
  delay: PropTypes.number,
  forceVisibility: PropTypes.bool,
  content: PropTypes.node,
  children: PropTypes.node,
  style: PropTypes.shape(),
  label: PropTypes.string,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'auto']),
  kind: PropTypes.oneOf(['regular', 'error', 'info', 'warning']),
  custom: PropTypes.bool,
};
Tooltip.defaultProps = {
  delay: 200,
  forceVisibility: false,
  content: undefined,
  children: null,
  style: {},
  label: undefined,
  position: 'top',
  kind: 'regular',
  custom: false,
};

export default Tooltip;
