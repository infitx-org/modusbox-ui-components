import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import delay from 'lodash/delay';
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

    const getNextPosition = (originalPosition = 'top', iteration) => {
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
    const knowsPosition = position !== undefined;
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
      if (knowsPosition && !exceeds) {
        break;
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
    const rendering = [
      <div key="content" className={childClassName}>{tooltipInnerComponent}</div>,
      <TooltipHandle kind={kind} direction={direction} custom={custom} key="handle" />
    ];
    return ReactDOM.createPortal(rendering, this._location);
  }
}

const TooltipHandle = ({ custom, direction, kind }) => {
  const handleWrapperClassName = utils.composeClassNames([
    'element-tooltip__handle-wrapper',
    direction && `element-tooltip__handle-wrapper--${direction}`,
  ]);
  const handleClassName = utils.composeClassNames([
    'element-tooltip__handle',
    `element-tooltip__handle--${kind}`,
    !custom && 'element-tooltip__handle--default',
  ]);

  return (
    <div className={handleWrapperClassName}>
      <div key="handle" className={handleClassName} />
    </div>
  );
}

class Tooltip extends PureComponent {
  static visibleAfterScroll (element, parents){
    const percentX = 100;
    const percentY = 100;
    const tolerance = 0.01;
    const rect = element.getBoundingClientRect();
    return parents.every(parent => {
      const prect = parent.getBoundingClientRect();
      const visiblePixelX = Math.min(rect.right, prect.right) - Math.max(rect.left, prect.left);
      const visiblePixelY = Math.min(rect.bottom, prect.bottom) - Math.max(rect.top, prect.top);
      /* eslint-disable no-mixed-operators */
      const visiblePercentageX = visiblePixelX / rect.width * 100;
      const visiblePercentageY = visiblePixelY / rect.height * 100;
      /* eslint-enable no-mixed-operators */
      return visiblePercentageX + tolerance > percentX && visiblePercentageY + tolerance > percentY;
    });
  };
  constructor(props) {
    super(props);
    this._scrollNodes = [];
    this._id = uuid();
    this.viewerId = null;
    this.mountTooltip = this.mountTooltip.bind(this);
    this.unmountTooltip = this.unmountTooltip.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.delayShowTooltip = this.delayShowTooltip.bind(this);
    this.delayHideTooltip = this.delayHideTooltip.bind(this);
    this.hideTooltipBeforeScroll = this.hideTooltipBeforeScroll.bind(this);
    this.showForcedTooltipAfterScroll = this.showForcedTooltipAfterScroll.bind(this);
    this.state = { show: false };
  }
  componentDidMount() {
    if (this.props.forceVisibility !== undefined) {
      if (this.props.forceVisibility === true) {
        this.delayShowTooltip();
      } else {
        this.delayHideTooltip();
      }
    } else {
      this.detectTooltipRequired();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this._scrolling) {
      return;
    }
    if (this.props.forceVisibility !== undefined) {
      if (this.props.forceVisibility === true) {
        this.delayShowTooltip();
      } else {
        this.delayHideTooltip(0);
      }
    } else {
      
      if (prevState.show === false && this.state.show === true) {
        return;
      }
      this.detectTooltipRequired();
    }
  }
  componentWillUnmount() {
    this.unmountTooltip();
  }
  delayShowTooltip() {
    this._isHoveringTooltip = true;
    delay(() => this.showTooltip(), this.props.delay);
  }
  delayHideTooltip(delayTime = this.props.delay) {
    this._isHoveringTooltip = false;
    if (this.props.forceVisibility === true) {
      return;
    }
    delay(this.hideTooltip, delayTime);
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
    if (this.props.showOnHover !== false) {
      this.box.addEventListener('mouseenter', this.delayShowTooltip);
      this.box.addEventListener('mouseleave', this.delayHideTooltip);
    }
    this.box.classList.remove('element-tooltip--inactive');
  }
  unmountTooltip() {
    this.hideTooltip();
    if (this.props.showOnHover !== false) {
      this.box.removeEventListener('mouseenter', this.delayShowTooltip);
      this.box.removeEventListener('mouseleave', this.delayHideTooltip);
    }
    this.box.classList.add('element-tooltip--inactive');
  }
  showTooltip() {
    const force = this.props.forceVisibility;
    if (this._isHoveringTooltip === false && force !== true) {
      // do show tooltip afterDealy if not still hovered and not forced
      return;
    }
    if (this.box === undefined) {
      // don't show if there is not box
      return;
    }
    if (!this._scrollNodes.length) {
      // listen for scroll in containers
      this._scrollNodes = utils.getScrollParents(this.box);
      this._scrollNodes.forEach(node => {
        node.addEventListener('scroll', this.hideTooltipBeforeScroll);
      });
    }
    if(!Tooltip.visibleAfterScroll(this.box, this._scrollNodes)) {
      return;
    }
    this.setState({ show: true });
  }
  hideTooltip() {
    const force = this.props.forceVisibility;
    if (this._isHoveringTooltip === true && force === false) {
      return;
    }
    if (!this.state.show) {
      return;
    }
    if (this._scrollNodes.length) {
      this._scrollNodes.forEach(node => {
        node.removeEventListener('scroll', this.hideTooltipBeforeScroll);
      });
      this._scrollNodes = [];
    }
    this.setState({ show: false });
  }
  hideTooltipBeforeScroll() {
    this._scrolling = true;
    this.hideTooltip();
    clearTimeout(this.tooltiptimeout);
    this.tooltiptimeout = setTimeout(this.showForcedTooltipAfterScroll, 500);
  }
  showForcedTooltipAfterScroll() {
    this._scrolling = false;
    this.showTooltip();
  }

  render() {
    const { style, children, content, label, position, kind, custom } = this.props;
    const className = utils.composeClassNames([
      'element-tooltip',
      custom && 'element-tooltip--custom'
    ]);

    return (
      <div
        className={className}
        style={style}
        ref={box => {
          this.box = box;
        }}
        id={this._id}
      >
        {children}
        {this.state.show && (
          <TooltipViewer
            ref={viewer => { this.viewer = viewer; }}
            parentId={this._id}
            content={content}
            label={label}
            position={position}
            kind={kind}
            custom={custom}
          >
            {children}
          </TooltipViewer>
        )}
      </div>
    );
  }
}

Tooltip.propTypes = {
  delay: PropTypes.number,
  forceVisibility: PropTypes.bool,
  showOnHover: PropTypes.bool,
  content: PropTypes.node,
  children: PropTypes.node,
  style: PropTypes.shape(),
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.node
  ]),
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'auto']),
  kind: PropTypes.oneOf(['regular', 'error', 'info', 'warning', 'neutral']),
  custom: PropTypes.bool,
};
Tooltip.defaultProps = {
  delay: 200,
  forceVisibility: undefined,
  showOnHover: undefined,
  content: undefined,
  children: null,
  style: {},
  label: undefined,
  position: undefined,
  kind: 'regular',
  custom: false,
};

export default Tooltip;
