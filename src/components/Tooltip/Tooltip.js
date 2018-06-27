import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import * as utils from '../../utils/common';

class TooltipViewer extends PureComponent {
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
    this._viewer = document.createElement('div');
    this._viewer.className = utils.composeClassNames([
      'element-tooltip__viewer',
      'element-tooltip__viewer--fade-in',
      this.props.custom !== true && 'element-tooltip__viewer--default',
      this.props.custom !== true && `element-tooltip__viewer--${this.props.kind}`,
    ]);
    this._location = document.body.appendChild(this._viewer);
    this.state = {
      direction: undefined,
    };
  }
  componentDidMount() {
    const { box, position } = this.props;
    const { top, left, direction } = TooltipViewer.getPosition(box, this._location, position);

    // Apply final updates to the tooltip itself
    this._location.style.top = top;
    this._location.style.left = left;

    // eslint-disable-next-line
    this.setState({ direction });
  }
  componentWillUnmount() {
    document.body.removeChild(this._location);
  }
  // This doesn't actually return anything to render
  render() {
    const { direction } = this.state;
    const { content, label, position, children, kind, custom } = this.props;
    let tooltipInnerComponent = <span>{children}</span>;

    if (content) {
      // We need to provide the content with the position it will be render
      if (custom) {
        tooltipInnerComponent = React.cloneElement(content, { ...content.props, position });
      } else {
        tooltipInnerComponent = content;
      }
    } else if (label) {
      tooltipInnerComponent = <span>{label}</span>;
    }

    const childClassName = utils.composeClassNames([
      'element-tooltip__child',
      custom && 'element-tooltip__child--custom',
    ]);
    const handleClassName = utils.composeClassNames([
      'element-tooltip__handle',
      `element-tooltip__handle--${kind}`,
      !custom && 'element-tooltip__handle--default',
      direction && `element-tooltip__handle--${direction}`,
    ]);

    const rendering = (
      <div>
        <div className={handleClassName} />
        <div className={childClassName}>{tooltipInnerComponent}</div>
      </div>
    );
    return ReactDOM.createPortal(rendering, this._location);
  }
}

class Tooltip extends PureComponent {
  constructor(props) {
    super(props);
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.delayShowTooltip = this.delayShowTooltip.bind(this);
    this.delayHideTooltip = this.delayHideTooltip.bind(this);
    this.state = { show: this.props.forceVisibility };
  }
  componentDidMount() {
    this.box.addEventListener('mouseenter', this.delayShowTooltip);
    this.box.addEventListener('mouseleave', this.delayHideTooltip);
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

    const { content, label } = this.props;
    const { scrollWidth, offsetWidth } = this.box;
    const hasChildrenOverflow = scrollWidth > offsetWidth;
    const isLabelDefined = label !== undefined;
    const isContentDefined = content !== undefined;
    const shouldShowTooltip = hasChildrenOverflow || isLabelDefined || isContentDefined;

    if (!shouldShowTooltip) {
      return;
    }
    this.setState({ show: true });
  }
  hideTooltip(force = false) {
    if (this._isHoveringTooltip === true && force === false) {
      return;
    }
    this.setState({ show: false });
  }

  render() {
    const { style, children, content, label, position, kind, custom } = this.props;

    const viewerProps = {
      content,
      label,
      position,
      children,
      kind,
      custom,
    };

    return (
      <div
        className="element-tooltip"
        style={style}
        ref={box => {
          this.box = box;
        }}
      >
        {children}
        {this.state.show && <TooltipViewer box={this.box} {...viewerProps} />}
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
