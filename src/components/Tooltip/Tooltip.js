import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import * as utils from '../../utils/common';

class TooltipViewer extends PureComponent {
  static getCoordinates(parentId, target, position) {
    const parent = document.getElementById(parentId);

    const parentRect = parent.getBoundingClientRect();
    const viewerRect = target.getBoundingClientRect();

    const leftCenteredByY = parentRect.left + (parentRect.width - viewerRect.width) / 2;
    const topCenteredByX = parentRect.top + (parentRect.height - viewerRect.height) / 2;

    const positionGetters = {
      top: () => ({
        top: parentRect.top - viewerRect.height - 10,
        left: leftCenteredByY,
        direction: 'top',
      }),
      bottom: () => ({
        top: parentRect.top + parentRect.height + 10,
        left: leftCenteredByY,
        direction: 'bottom',
      }),
      left: () => ({
        top: topCenteredByX,
        left: parentRect.left - viewerRect.width - 10,
        direction: 'left',
      }),
      right: () => ({
        top: topCenteredByX,
        left: parentRect.left + parentRect.width + 10,
        direction: 'right',
      }),
    };

    const getNextPosition = (originalPosition, iteration) => {
      // returns the next position based on a clockwise directiom
      const positions = ['top', 'right', 'bottom', 'left'];
      const positionIndex = positions.indexOf(originalPosition);
      const nextPositionIndex = (positionIndex + iteration) % positions.length;
      return positions[nextPositionIndex];
    };

    const testPositions = (coordinates, rect) => {
      if (!coordinates) {
        return false;
      }
      const { innerWidth, innerHeight } = window;
      // This is an arbitrary minimum margin space between tooltip rect positions and window size
      const _MINIMUM_MARGIN = 10;
      const positionTesters = {
        // test for every position if the tooltip size exceeds the limits
        top: () => coordinates.top < _MINIMUM_MARGIN,
        left: () => coordinates.left < _MINIMUM_MARGIN,
        right: () => coordinates.left + rect.width > innerWidth - _MINIMUM_MARGIN,
        bottom: () => coordinates.top + rect.height > innerHeight - _MINIMUM_MARGIN,
      };

      // make sure it not exceeds any of the limits
      return [
        positionTesters.top(),
        positionTesters.left(),
        positionTesters.right(),
        positionTesters.bottom(),
      ].every(result => result === false);
    };

    let iteration = 0;
    let coordinates;

    while (!testPositions(coordinates, viewerRect) && iteration < 4) {
      const currentPosition = getNextPosition(position, iteration);
      const getPosition = positionGetters[currentPosition];
      coordinates = getPosition();
      iteration += 1;
    }
    return coordinates;
  }
  constructor(props) {
    super(props);
    this._viewer = document.createElement('div');
    this._viewer.className = utils.composeClassNames([
      'element-tooltip__viewer',
      this.props.custom !== true && 'element-tooltip__viewer--default',
      this.props.custom !== true && `element-tooltip__viewer--${this.props.kind}`,
    ]);
    this._location = document.body.appendChild(this._viewer);
    this.state = {
      direction: undefined,
    };
  }
  componentDidMount() {
    const { parentId, position } = this.props;
    const { top, left, direction } = TooltipViewer.getCoordinates(
      parentId,
      this._location,
      position
    );

    // Apply final updates to the tooltip itself
    this._location.style.top = `${top}px`;
    this._location.style.left = `${left}px`;

    const viewerFadeInClassName = utils.composeClassNames([
      'element-tooltip__viewer--fade-in',
      `element-tooltip__viewer--fade-in-${direction}`,
    ]);
    this._viewer.className += ` ${viewerFadeInClassName}`;
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
    this.mountTooltip = this.mountTooltip.bind(this);
    this.unmountTooltip = this.unmountTooltip.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.delayShowTooltip = this.delayShowTooltip.bind(this);
    this.delayHideTooltip = this.delayHideTooltip.bind(this);
    this.state = { show: this.props.forceVisibility };
  }
  componentWillMount() {
    this._id = Math.random().toString();
  }
  componentDidMount() {
    this.detectTooltipRequired();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.forceVisibility === true) {
      this.showTooltip(true);
    }
    if (nextProps.forceVisibility === false) {
      this.hideTooltip(true);
    }
    if (nextProps.children !== this.props.children) {
      this.detectTooltipRequired();
    }
  }
  componentDidUpdate() {
    this.detectTooltipRequired();
  }
  componentWillUnmount() {
    this.unmountTooltip();
  }
  delayShowTooltip() {
    this._isHoveringTooltip = true;
    clearTimeout(this.tooltipTimeout);
    this.tooltipTimeout = setTimeout(this.showTooltip, this.props.delay);
  }
  delayHideTooltip() {
    this._isHoveringTooltip = false;
    if (this.props.forceVisibility === true) {
      return;
    }
    clearTimeout(this.tooltipTimeout);
    this.tooltipTimeout = setTimeout(this.hideTooltip, this.props.delay);
  }
  detectTooltipRequired() {
    const { content, label } = this.props;
    const { scrollWidth, offsetWidth } = this.box;
    const hasChildrenOverflow = scrollWidth > offsetWidth;
    const isLabelDefined = label !== undefined;
    const isContentDefined = content !== undefined;
    const shouldShowTooltip = hasChildrenOverflow || isLabelDefined || isContentDefined;
    if (shouldShowTooltip) {
      this.mountTooltip();
    } else {
      this.unmountTooltip();
    }
  }
  mountTooltip() {
    this.box.addEventListener('mouseenter', this.delayShowTooltip);
    this.box.addEventListener('mouseleave', this.delayHideTooltip);
    this.box.classList.remove('element-tooltip--inactive');
  }
  unmountTooltip() {
    this.hideTooltip(true);
    this.box.removeEventListener('mouseenter', this.delayShowTooltip);
    this.box.removeEventListener('mouseleave', this.delayHideTooltip);
    this.box.classList.add('element-tooltip--inactive');
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
        id={this._id}
      >
        {children}
        {this.state.show && <TooltipViewer parentId={this._id} {...viewerProps} />}
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
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
