import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import * as utils from 'utils/common';

/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */

const POSITIONS = ['top', 'right', 'bottom', 'left'];
const ALIGNMENTS = ['start', 'center', 'end'];
const MARGIN = 10;
const TRANSLATION = 10;

const TooltipHandle = ({ custom, direction, alignment, kind }) => {
  const handleWrapperClassName = utils.composeClassNames([
    'el-tooltip__handle-wrapper',
    direction && alignment && `el-tooltip__handle-wrapper--${direction}-${alignment}`,
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
  static getCoordinatesByPosition(position = 'top', align = 'center', parentRect, targetRect) {
    const leftCenterByY = parentRect.left + (parentRect.width - targetRect.width) / 2;
    const topCenterByX = parentRect.top + (parentRect.height - targetRect.height) / 2;
    const leftAlignByY = parentRect.left - TRANSLATION;
    const rightAlignByY = parentRect.left + parentRect.width + TRANSLATION - targetRect.width;
    const topAlignByX = parentRect.top - TRANSLATION;
    const bottomAlignByX = parentRect.top + parentRect.height - targetRect.height + TRANSLATION;

    const left =
      align === 'center' ? leftCenterByY : align === 'start' ? leftAlignByY : rightAlignByY;
    const top =
      align === 'center' ? topCenterByX : align === 'start' ? topAlignByX : bottomAlignByX;

    const byPosition = {
      top: () => ({
        top: parentRect.top - targetRect.height - 10,
        left,
      }),
      bottom: () => ({
        top: parentRect.top + parentRect.height + 10,
        left,
      }),
      left: () => ({
        top,
        left: parentRect.left - targetRect.width - 10,
      }),
      right: () => ({
        top,
        left: parentRect.left + parentRect.width + 10,
      }),
    };
    const byPositionGetter = byPosition[position];
    return byPositionGetter(align);
  }

  static getMaxSizes(rect, pos, align) {
    const { innerWidth, innerHeight } = window;
    const centerX = rect.left + rect.width / 2;
    const centerFromLeft = 2 * centerX - 2 * MARGIN;
    const centerFromRight = 2 * innerWidth - centerX * 2 - MARGIN;

    const centerY = rect.top + rect.height / 2;
    const centerFromTop = 2 * centerY - 2 * MARGIN;
    const centerFromBottom = 2 * innerHeight - centerY * 2 - MARGIN;

    const maxWidthLeft = rect.left - 2 * MARGIN;
    const maxWidthStart = innerWidth - rect.left;
    const maxWidthCenter = Math.min(centerFromLeft, centerFromRight);
    const maxWidthEnd = rect.left + rect.width;
    const maxWidthRight = innerWidth - rect.left - rect.width - 2 * MARGIN;

    const maxHeightTop = rect.top - 2 * MARGIN;
    const maxHeightStart = innerHeight - rect.top;
    const maxHeightCenter = Math.min(centerFromTop, centerFromBottom);
    const maxHeightEnd = innerHeight - (rect.top + rect.height);
    const maxHeightBottom = innerHeight - (rect.top + rect.height) - 2 * MARGIN;

    const byPosition = {
      top: {
        start: [maxWidthStart, maxHeightTop],
        center: [maxWidthCenter, maxHeightTop],
        end: [maxWidthEnd, maxHeightTop],
      },
      left: {
        start: [maxWidthLeft, maxHeightStart],
        center: [maxWidthLeft, maxHeightCenter],
        end: [maxWidthLeft, maxHeightEnd],
      },
      right: {
        start: [maxWidthRight, maxHeightStart],
        center: [maxWidthRight, maxHeightCenter],
        end: [maxWidthRight, maxHeightEnd],
      },
      bottom: {
        start: [maxWidthStart, maxHeightBottom],
        center: [maxWidthCenter, maxHeightBottom],
        end: [maxWidthEnd, maxHeightBottom],
      },
    };
    return byPosition[pos][align];
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

  static getCoordinates(parentId, target, position = 'top', align = 'center') {
    const parent = document.getElementById(parentId);
    const [firstChild] = document.getElementById(parentId).children;
    const wrappedElement = firstChild || parent;
    const parentRect = wrappedElement.getBoundingClientRect();
    let positionIteration = 0;
    let alignIteration = 0;
    const finalPositions = [];

    while (positionIteration < POSITIONS.length) {
      while (alignIteration < ALIGNMENTS.length) {
        const currentPosition = POSITIONS[positionIteration];
        const currentAlign = ALIGNMENTS[alignIteration];

        const [maxWidth, maxHeight] = TooltipViewer.getMaxSizes(
          parentRect,
          currentPosition,
          currentAlign,
        );

        target.style.maxWidth = `${maxWidth}px`;
        target.style.maxHeight = `${maxHeight}px`;

        const targetRect = target.getBoundingClientRect();

        const coordinates = TooltipViewer.getCoordinatesByPosition(
          currentPosition,
          currentAlign,
          parentRect,
          targetRect,
        );

        const exceeds = TooltipViewer.testCoordinates(coordinates, targetRect);

        finalPositions.push({
          position: currentPosition,
          align: currentAlign,
          aspectRatio: targetRect.width / targetRect.height,
          top: coordinates.top,
          left: coordinates.left,
          exceeds,
          maxWidth,
          maxHeight,
        });

        alignIteration += 1;
      }
      alignIteration = 0;
      positionIteration += 1;
    }

    function sortByExceeds(a, b) {
      if (a.exceeds > b.exceeds) {
        return 1;
      } else if (a.exceeds < b.exceeds) {
        return -1;
      }
      return 0;
    }

    function removeExceeds(item) {
      return item.exceeds === 0 /* && item.aspectRatio > 0.5 && item.aspectRatio < 10 */;
    }

    function withPositions(targetPosition, targetAlign) {
      return function filter(item) {
        if (targetPosition && targetAlign) {
          return item.position === targetPosition && item.align === targetAlign;
        } else if (targetPosition) {
          return item.position === targetPosition;
        }
        return item.align === targetAlign;
      };
    }

    finalPositions.sort(sortByExceeds);

    const samePos = finalPositions.filter(withPositions(position));
    const [samePosCenter] = samePos.filter(withPositions(null, 'center')).filter(removeExceeds);
    const [bestSamePos] = samePos.sort(sortByExceeds);

    const [samePosAndAlign] = finalPositions
      .filter(withPositions(position, align))
      .filter(removeExceeds);
    const [bestCenterPos] = finalPositions
      .filter(withPositions(null, 'center'))
      .sort(sortByExceeds);

    if (samePosAndAlign) {
      return samePosAndAlign;
    } else if (samePosCenter) {
      return samePosCenter;
    } else if (bestCenterPos) {
      return bestCenterPos;
    } else if (bestSamePos) {
      return bestSamePos;
    }
    return finalPositions[0];
  }

  static setPosition(id, wantedPosition, wantedAlignment, _portal, _viewer) {
    const { top, left, position, align, maxWidth, maxHeight } = TooltipViewer.getCoordinates(
      id,
      _portal,
      wantedPosition,
      wantedAlignment,
    );

    _portal.style.top = `${top}px`;
    _portal.style.left = `${left}px`;
    _portal.style.maxWidth = `${maxWidth}px`;
    _portal.style.maxHeight = `${maxHeight}px`;

    if (!_viewer.className.includes('el-tooltip__viewer--fade-in')) {
      _viewer.className += ' el-tooltip__viewer--fade-in';
    }
    if (!_viewer.className.includes(`el-tooltip__viewer--fade-in-${position}`)) {
      _viewer.className += ` el-tooltip__viewer--fade-in-${position}`;
    }
    return { direction: position, alignment: align };
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
      alignment: undefined,
    };
  }
  componentDidMount() {
    const { parentId, position, align } = this.props;
    const { direction, alignment } = TooltipViewer.setPosition(
      parentId,
      position,
      align,
      this._location,
      this._viewer,
    );
    // eslint-disable-next-line
    this.setState({ direction, alignment });
  }
  componentDidUpdate() {
    const { parentId, position, align } = this.props;
    const { direction, alignment } = TooltipViewer.setPosition(
      parentId,
      position,
      align,
      this._location,
      this._viewer,
    );

    if (direction !== this.state.direction || alignment !== this.state.alignment) {
      this.setState({ direction, alignment });
    }
  }
  componentWillUnmount() {
    document.body.removeChild(this._location);
  }

  render() {
    const { direction, alignment } = this.state;
    const { content, label, position, children, kind, custom } = this.props;
    let tooltipInnerComponent = null;

    if (content) {
      tooltipInnerComponent = React.cloneElement(content, { ...content.props, position });
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
      <TooltipHandle
        kind={kind}
        direction={direction}
        alignment={alignment}
        custom={custom}
        key="handle"
      />,
    ];

    return ReactDOM.createPortal(rendering, this._location);
  }
}
