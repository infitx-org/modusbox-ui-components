import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import uuid from '../../utils/uuid';

import * as utils from '../../utils/common';

import './Tooltip.scss';

class TooltipViewer extends PureComponent {
  static getCoordinates(parentId, target, position) {
    const parent = document.getElementById(parentId);
    const _MINIMUM_MARGIN = 10;
    const { innerWidth, innerHeight } = window;

    const sum = (prev, curr) => prev + curr;

    const getCoordinatesByPosition = (pos, parentRect, targetRect) => {
      const leftCenteredByY = parentRect.left + (parentRect.width - targetRect.width) / 2;
      const topCenteredByX = parentRect.top + (parentRect.height - targetRect.height) / 2;
      const byPosition = {
        top: () => ({
          top: parentRect.top - targetRect.height - 10,
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
          left: parentRect.left - targetRect.width - 10,
          direction: 'left',
        }),
        right: () => ({
          top: topCenteredByX,
          left: parentRect.left + parentRect.width + 10,
          direction: 'right',
        }),
      };
      const byPositionGetter = byPosition[pos];
      return byPositionGetter();
    }

    const getMaxTargetWidth = (rect, pos) => {
      const center = rect.left + rect.width / 2;
      const byLeft = 2 * center - 2 * _MINIMUM_MARGIN;
      const byRight = 2 * innerWidth - center * 2 - _MINIMUM_MARGIN;
      const min = Math.min(byLeft, byRight);

      const byPosition = {
        top: min,
        left: rect.left - 2 * _MINIMUM_MARGIN,
        right: innerWidth - rect.left - rect.width - 2 * _MINIMUM_MARGIN,
        bottom: min,
      }
      return byPosition[pos];
    }

    const getNextPosition = (originalPosition, iteration) => {
      // returns the next position based on a clockwise directiom
      const positions = ['top', 'right', 'bottom', 'left'];
      const positionIndex = positions.indexOf(originalPosition);
      const nextPositionIndex = (positionIndex + iteration) % positions.length;
      return positions[nextPositionIndex];
    };

    const testCoordinates = (coordinates, rect) => {
      if (!coordinates) {
        return 0;
      }

      const exceedings = {
        // test for every position if the tooltip size exceeds the limits
        top: ({ top }) => Math.abs(Math.min(0, top)),
        left: ({ left }) => Math.abs(Math.min(0, left)),
        right: ({ left }) => Math.abs(Math.max(0, - innerWidth + left + rect.width)),
        bottom: ({ top }) => Math.abs(Math.max(0, - innerHeight + top + rect.height)),
      };

      // make sure it not exceeds any of the limits
      return [
        exceedings.top(coordinates),
        exceedings.left(coordinates),
        exceedings.right(coordinates),
        exceedings.bottom(coordinates),
      ].reduce(sum);
    };

    const parentRect = parent.getBoundingClientRect();
    let iteration = 0;
    let coordinates;
    let previousExceeds = Infinity;
    let previousHeight = Infinity;
    let finalCoordinates;
    let finalMaxWidth;

    while (iteration < 4) {
      const currentPosition = getNextPosition(position, iteration);
      const maxWidth = getMaxTargetWidth(parentRect, currentPosition);

      // eslint-disable-next-line
      target.style.maxWidth = maxWidth;
      const targetRect = target.getBoundingClientRect();
      coordinates = getCoordinatesByPosition(currentPosition, parentRect, targetRect);
      const exceeds = testCoordinates(coordinates, targetRect);

      const isNotExceeding = previousExceeds > exceeds;
      const hasLowerHeight = previousExceeds === exceeds && targetRect.height < previousHeight;

      if (isNotExceeding || hasLowerHeight) {
        previousExceeds = exceeds;
        previousHeight = targetRect.height;
        finalCoordinates = coordinates;
        finalMaxWidth = maxWidth;
      }
      iteration += 1;
    }
    return { ...finalCoordinates, maxWidth: finalMaxWidth };
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
    const { top, left, direction, maxWidth } = TooltipViewer.getCoordinates(
      parentId,
      this._location,
      position,
    );

    // Apply final updates to the tooltip itself
    this._location.style.top = `${top}px`;
    this._location.style.left = `${left}px`;
    this._location.style.maxWidth = `${maxWidth}px`;

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
    let tooltipInnerComponent = null;
    const addNewLine = (prev, current, index, array) => ([
      ...prev,
      current,
      index < array.length - 1 ? <br /> : null
    ])

    if (content) {
      if (custom) {
        // We need to provide the content with the position it will be render
        tooltipInnerComponent = React.cloneElement(content, { ...content.props, position });
      } else {
        tooltipInnerComponent = content;
      }
    } else if (label) {
      if (Array.isArray(label)) {
        tooltipInnerComponent = label.map(single => <span>{single}</span>).reduce(addNewLine, []);
      } else {
        tooltipInnerComponent = <span>{label}</span>;
      }
    } else {
      tooltipInnerComponent = <span>{children}</span>;
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

    const rendering = [
      <div key="handle"className={handleClassName} />,
      <div key="content"className={childClassName}>{tooltipInnerComponent}</div>
    ];
    return ReactDOM.createPortal(rendering, this._location);
  }
}

class Tooltip extends PureComponent {
  constructor(props) {
    super(props);
    this._scrollNode = null;
    this._id = uuid();
    this.mountTooltip = this.mountTooltip.bind(this);
    this.unmountTooltip = this.unmountTooltip.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.delayShowTooltip = this.delayShowTooltip.bind(this);
    this.delayHideTooltip = this.delayHideTooltip.bind(this);
    this.state = { show: this.props.forceVisibility };
  }
  componentDidMount() {
    this.detectTooltipRequired();
  }
  componentDidUpdate() {
    if (this.props.forceVisibility === true) {
      this.showTooltip(true);
    }
    if (this.props.forceVisibility === false) {
      this.hideTooltip(true);
    }
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

    this._scrollNode = utils.getScrollParent(this.box);
    this._scrollNode.addEventListener('scroll', this.hideTooltip);
    this.setState({ show: true });
  }
  hideTooltip(force = false) {
    if (this._isHoveringTooltip === true && force === false) {
      return;
    }
    if (this._scrollNode) {
      this._scrollNode.removeEventListener('scroll', this.hideTooltip);
      this._scrollNode = null;
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
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'auto']),
  kind: PropTypes.oneOf(['regular', 'error', 'info', 'warning']),
  custom: PropTypes.bool,
};
Tooltip.defaultProps = {
  delay: 200,
  forceVisibility: undefined,
  content: undefined,
  children: null,
  style: {},
  label: undefined,
  position: 'top',
  kind: 'regular',
  custom: false,
};

export default Tooltip;
