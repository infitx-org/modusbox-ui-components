import './ScrollBox.scss';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import * as utils from 'utils/common';

import ScrollBar from './ScrollBar';

class ScrollBox extends PureComponent {
  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
    this.updateScrollbar = this.updateScrollbar.bind(this);
    this.updateContentSize = this.updateContentSize.bind(this);
    this.onDrag = this.onDrag.bind(this);

    this.wrapperRef = React.createRef(document.createElement('div'));
    this.contentBoxRef = React.createRef(document.createElement('div'));
    this.contentRef = React.createRef(document.createElement('div'));
    this.scrollbarRef = React.createRef(document.createElement('div'));
  }
  componentDidMount() {
    this.updateContentSize();
    this.updateScrollbar();
    this.contentBoxRef.current.addEventListener('scroll', this.updateScrollbar);
  }
  componentDidUpdate() {
    this.updateContentSize();
    this.updateScrollbar();
  }
  componentWillUnmount() {
    this.contentBoxRef.current.removeEventListener('scroll', this.updateScrollbar);
  }
  onDrag(ratio) {
    const { height } = this.contentRef.current.getBoundingClientRect();
    const boxHeight = this.contentBoxRef.current.getBoundingClientRect().height;

    const scrollTop = ratio * (height - boxHeight);
    this.contentBoxRef.current.scrollTop = scrollTop;
  }
  handleResize() {
    this.updateContentSize();
    this.updateScrollbar();
  }
  updateScrollbar() {
    const { scrollTop } = this.contentBoxRef.current;
    const { height } = this.contentBoxRef.current.getBoundingClientRect();
    const contentHeight = this.contentRef.current.childNodes[0].getBoundingClientRect().height;
    const offset = 0;
    if (this.scrollbarRef.current) {
      this.scrollbarRef.current.setPosition({
        scrollTop,
        offset,
        contentHeight,
        height,
      });
    }
  }
  updateContentSize() {
    const { width } = this.wrapperRef.current.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(this.wrapperRef.current, null);
    const paddingLeft = parseFloat(computedStyle.getPropertyValue('padding-left'));
    const paddingRight = parseFloat(computedStyle.getPropertyValue('padding-right'));
    const exactWidth = `${width - paddingLeft + paddingRight}px`;

    this.contentRef.current.style.minWidth = exactWidth;
    this.contentRef.current.style.maxWidth = exactWidth;
    this.contentRef.current.style.width = exactWidth;
  }
  render() {
    const { showTrack, handleStyle, trackStyle, style, children, flex, className } = this.props;
    const wrapperClassName = utils.composeClassNames([
      'element',
      'el-scrollbox__wrapper',
      className,
    ]);
    const contentBoxClassName = utils.composeClassNames([
      'el-scrollbox__content-box',
      flex && 'el-scrollbox__content-box--flexible',
    ]);
    const contentClassName = utils.composeClassNames([
      'el-scrollbox__content',
      flex && 'el-scrollbox__content--flexible',
    ]);

    return (
      <ReactResizeDetector
        handleWidth
        handleHeight
        onResize={this.handleResize}
        targetRef={this.wrapperRef}
      >
        <div ref={this.wrapperRef} className={wrapperClassName} style={style}>
          <div ref={this.contentBoxRef} className={contentBoxClassName}>
            <ReactResizeDetector
              handleHeight
              onResize={this.handleResize}
              targetRef={this.contentRef}
            >
              <div ref={this.contentRef} className={contentClassName}>
                {children}
              </div>
            </ReactResizeDetector>
          </div>

          <ScrollBar
            ref={this.scrollbarRef}
            trackStyle={trackStyle}
            handleStyle={handleStyle}
            showTrack={showTrack}
            onDrag={this.onDrag}
          />
        </div>
      </ReactResizeDetector>
    );
  }
}
ScrollBox.propTypes = {
  className: PropTypes.string,
  flex: PropTypes.bool,
  style: PropTypes.shape(),
  trackStyle: PropTypes.shape(),
  handleStyle: PropTypes.shape(),
  showTrack: PropTypes.bool,
  children: PropTypes.node,
};
ScrollBox.defaultProps = {
  className: undefined,
  flex: false,
  style: {},
  trackStyle: {},
  handleStyle: {},
  showTrack: false,
  children: undefined,
};
export default ScrollBox;
