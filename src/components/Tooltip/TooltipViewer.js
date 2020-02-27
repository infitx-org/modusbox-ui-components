import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import * as utils from '../../utils/common';

/* eslint-disable no-param-reassign */

const TooltipHandle = ({ custom, direction, kind }) => {
  const handleWrapperClassName = utils.composeClassNames([
    'el-tooltip__handle-wrapper',
    direction && `el-tooltip__handle-wrapper--${direction}`,
  ]);
  const handleClassName = utils.composeClassNames([
    'el-tooltip__handle',
    `el-tooltip__handle--${kind}`,
    !custom && 'el-tooltip__handle--default',
  ]);

  return (
    <div className={handleWrapperClassName}>
      <div key="handle" className={handleClassName} />
    </div>
  );
};

const MultiLine = ({ string }) => {
  return string
    .map(line => <span>{line}</span>)
    .reduce((lines, line, index, array) => {
      const newLines = [...lines, line];
      if (index < array.length - 1) {
        newLines.push(<br />);
      }
      return newLines;
    }, []);
};

export default class TooltipViewer extends PureComponent {
  static getCoordinatesByPosition(pos, parentRect, targetRect) {
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

  static getMaxTargetWidth(rect, pos, _MINIMUM_MARGIN) {
    const { innerWidth } = window;
    const center = rect.left + rect.width / 2;
    const byLeft = 2 * center - 2 * _MINIMUM_MARGIN;
    const byRight = 2 * innerWidth - center * 2 - _MINIMUM_MARGIN;
    const min = Math.min(byLeft, byRight);

    const byPosition = {
      top: min,
      left: rect.left - 2 * _MINIMUM_MARGIN,
      right: innerWidth - rect.left - rect.width - 2 * _MINIMUM_MARGIN,
      bottom: min,
    };
    return byPosition[pos];
  }

  static getNextPosition(originalPosition = 'top', iteration) {
    // returns the next position based on a clockwise directiom
    const positions = ['top', 'right', 'bottom', 'left'];
    const positionIndex = positions.indexOf(originalPosition);
    const nextPositionIndex = (positionIndex + iteration) % positions.length;
    return positions[nextPositionIndex];
  }

  static testCoordinates(coordinates, rect) {
    if (!coordinates) {
      return 0;
    }

    const { innerWidth, innerHeight } = window;
    const exceedings = {
      // test for every position if the tooltip size exceeds the limits
      top: ({ top }) => Math.abs(Math.min(0, top)),
      left: ({ left }) => Math.abs(Math.min(0, left)),
      right: ({ left }) => Math.abs(Math.max(0, -innerWidth + left + rect.width)),
      bottom: ({ top }) => Math.abs(Math.max(0, -innerHeight + top + rect.height)),
    };

    // make sure it not exceeds any of the limits
    return [
      exceedings.top(coordinates),
      exceedings.left(coordinates),
      exceedings.right(coordinates),
      exceedings.bottom(coordinates),
    ].reduce((prev, curr) => prev + curr);
  }

  static getCoordinates(parentId, target, position) {
    const parent = document.getElementById(parentId);
    const [firstChild] = document.getElementById(parentId).children;
    const wrappedElement = firstChild || parent;
    const _MINIMUM_MARGIN = 10;
    const parentRect = wrappedElement.getBoundingClientRect();
    const knowsPosition = position !== undefined;
    let iteration = 0;
    let coordinates;
    let previousExceeds = Infinity;
    let previousHeight = Infinity;
    let finalCoordinates;
    let finalMaxWidth;

    while (iteration < 4) {
      const currentPosition = TooltipViewer.getNextPosition(position, iteration);
      const maxWidth = TooltipViewer.getMaxTargetWidth(
        parentRect,
        currentPosition,
        _MINIMUM_MARGIN,
      );
      target.style.maxWidth = maxWidth;

      const targetRect = target.getBoundingClientRect();
      coordinates = TooltipViewer.getCoordinatesByPosition(currentPosition, parentRect, targetRect);

      const exceeds = TooltipViewer.testCoordinates(coordinates, targetRect);
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

  static setPosition(id, position, _portal, _viewer) {
    const { top, left, direction, maxWidth } = TooltipViewer.getCoordinates(id, _portal, position);

    _portal.style.top = `${top}px`;
    _portal.style.left = `${left}px`;
    _portal.style.maxWidth = `${maxWidth}px`;

    if (!_viewer.className.includes('el-tooltip__viewer--fade-in')) {
      _viewer.className += ' el-tooltip__viewer--fade-in';
    }
    if (!_viewer.className.includes(`el-tooltip__viewer--fade-in-${direction}`)) {
      _viewer.className += ` el-tooltip__viewer--fade-in-${direction}`;
    }
    return direction;
  }
  constructor(props) {
    super(props);
    this._viewer = document.createElement('div');
    this._viewer.className = utils.composeClassNames([
      'el-tooltip__viewer',
      this.props.custom !== true && 'el-tooltip__viewer--default',
      this.props.custom !== true && `el-tooltip__viewer--${this.props.kind}`,
    ]);
    this._location = document.body.appendChild(this._viewer);
    this.state = {
      direction: undefined,
    };
  }
  componentDidMount() {
    const { parentId, position } = this.props;
    const direction = TooltipViewer.setPosition(parentId, position, this._location, this._viewer);
    // eslint-disable-next-line
    this.setState({ direction });
  }
  componentDidUpdate() {
    const { parentId, position } = this.props;
    const direction = TooltipViewer.setPosition(parentId, position, this._location, this._viewer);

    if (direction !== this.state.direction) {
      this.setState({ direction });
    }
  }
  componentWillUnmount() {
    document.body.removeChild(this._location);
  }

  render() {
    const { direction } = this.state;
    const { content, label, position, children, kind, custom } = this.props;
    let tooltipInnerComponent = null;

    if (content) {
      if (custom) {
        // We need to provide the content with the position it will be render
        tooltipInnerComponent = React.cloneElement(content, { ...content.props, position });
      } else {
        tooltipInnerComponent = content;
      }
    } else if (label) {
      if (Array.isArray(label)) {
        tooltipInnerComponent = <MultiLine string={label} />;
      } else {
        tooltipInnerComponent = <span>{label}</span>;
      }
    } else {
      tooltipInnerComponent = <span>{children}</span>;
    }

    const childClassName = utils.composeClassNames([
      'el-tooltip__child',
      custom && 'el-tooltip__child--custom',
    ]);

    const rendering = [
      <div key="content" className={childClassName}>
        {tooltipInnerComponent}
      </div>,
      <TooltipHandle kind={kind} direction={direction} custom={custom} key="handle" />,
    ];

    return ReactDOM.createPortal(rendering, this._location);
  }
}
