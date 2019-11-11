import './ScrollBox.scss';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactResizeDetector from 'react-resize-detector';

import * as utils from '../../utils/common';
import ScrollBar from './ScrollBar';

class ScrollBox extends PureComponent {
  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
    this.updateScrollbar = this.updateScrollbar.bind(this);
    this.updateContentSize = this.updateContentSize.bind(this);
    this.onDrag = this.onDrag.bind(this);
  }
  componentDidMount() {
    this.updateContentSize();
    this.updateScrollbar();
    this.contentBox.addEventListener('scroll', this.updateScrollbar);
  }
  componentDidUpdate() {
    this.updateContentSize();
    this.updateScrollbar();
  }
  componentWillUnmount() {
    this.contentBox.removeEventListener('scroll', this.updateScrollbar);
  }
  onDrag(ratio) {
    const { height } = this.content.getBoundingClientRect();
    const boxHeight = this.contentBox.getBoundingClientRect().height;

    const scrollTop = ratio * (height - boxHeight);
    this.contentBox.scrollTop = scrollTop;
  }
  handleResize() {
    this.updateContentSize();
    this.updateScrollbar();
  }
  updateScrollbar() {
    const { scrollTop } = this.contentBox;
    const { height } = this.contentBox.getBoundingClientRect();
    const contentHeight = this.content.childNodes[1].getBoundingClientRect().height;
    const offset = 0;
    if (this.scrollbar) {
      this.scrollbar.setPosition({
        scrollTop,
        offset,
        contentHeight,
        height,
      });
    }
  }
  updateContentSize() {
    const { width } = this.wrapper.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(this.wrapper, null);
    const paddingLeft = parseFloat(computedStyle.getPropertyValue('padding-left'));
    const paddingRight = parseFloat(computedStyle.getPropertyValue('padding-right'));
    const exactWidth = `${width - paddingLeft + paddingRight}px`;

    this.content.style.minWidth = exactWidth;
    this.content.style.maxWidth = exactWidth;
    this.content.style.width = exactWidth;
  }
  render() {
    const { showTrack, handleStyle, trackStyle, style, children, flex, className } = this.props;

    const wrapperClassName = utils.composeClassNames([
      'element',
      'element-scrollbox__wrapper',
      className,
    ]);
    const contentBoxClassName = utils.composeClassNames([
      'element-scrollbox__content-box',
      flex && 'element-scrollbox__content-box--flexible',
    ]);
    const contentClassName = utils.composeClassNames([
      'element-scrollbox__content',
      flex && 'element-scrollbox__content--flexible',
    ]);

    return (
      <div
        ref={wrapper => {
          this.wrapper = wrapper;
        }}
        className={wrapperClassName}
        style={style}
      >
        <ReactResizeDetector handleWidth handleHeight onResize={this.handleResize} />
        <div
          ref={contentBox => {
            this.contentBox = contentBox;
          }}
          className={contentBoxClassName}
        >
          <div
            ref={content => {
              this.content = content;
            }}
            className={contentClassName}
          >
            <ReactResizeDetector handleHeight onResize={this.handleResize} />
            {children}
          </div>
        </div>

        <ScrollBar
          ref={scrollbar => {
            this.scrollbar = scrollbar;
          }}
          trackStyle={trackStyle}
          handleStyle={handleStyle}
          showTrack={showTrack}
          onDrag={this.onDrag}
        />
      </div>
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
