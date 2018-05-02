import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ScrollBar extends PureComponent {
  constructor(props) {
    super(props);
    this.setPosition = this.setPosition.bind(this);
    this.fadeMovingHandle = this.fadeMovingHandle.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.originalState = {
      showScrollbar: false,
      barHeight: '0%',
      translate: 0,
      isMoving: false,
    };
    this.state = { ...this.originalState };
    this.movingTimeout = false;
  }
  componentDidMount() {
    this._isMounted = true;
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }
  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown(e) {
    this._originMouseY = e.nativeEvent.offsetY;
    this._dragging = true;
  }
  onMouseMove(e) {
    if (this._dragging) {
      const { top, height } = this.tracker.getBoundingClientRect();
      const mousePosY = e.pageY - top;
      if (typeof this.props.onDrag === 'function') {
        const diff = mousePosY - this._originMouseY;
        const max = Math.round(height - this.state.barHeight);
        let ratio = diff / max;
        if (diff > max) { ratio = 1; }
        if (diff < 0) { ratio = 0; }
        this.props.onDrag(ratio);
      }
    }
  }
  onMouseUp() {
    this._dragging = false;
  }
  setPosition(positions) {
    const { tracker } = this;
    const { height } = tracker ? tracker.getBoundingClientRect() : positions;
    const { contentHeight, scrollTop, offset } = positions;
    const totalContentHeight = offset + contentHeight;
    const viewToContentRatio = positions.height / totalContentHeight;
    const barHeight = Math.max(10, viewToContentRatio * height);
    const realBaHeight = Math.max(10, (height / totalContentHeight) * height);
    const showScrollbar = viewToContentRatio < 1;
    const scrollBarScale = (height - realBaHeight) / (totalContentHeight - height);
    const scrollBarTranslate = scrollTop * scrollBarScale;
    const translate = showScrollbar ? scrollBarTranslate : 0;
    const isMoving = true;

    this.setState({
      showScrollbar,
      barHeight,
      translate,
      isMoving,
    });
    this.fadeMovingHandle();
  }
  fadeMovingHandle() {
    clearTimeout(this.movingTimeout);

    this.movingTimeout = setTimeout(() => {
      if (this._isMounted) {
        this.setState({ isMoving: false });
      }
    }, 500);
  }
  render() {
    const { showTrack, trackStyle, handleStyle } = this.props;
    const {
      showScrollbar, barHeight, translate, isMoving,
    } = this.state;

    const handleStyles = {
      height: `${Math.round(barHeight)}px`,
      transform: `translate3d(0,${Math.round(translate)}px,0)`,
      ...handleStyle,
    };

    if (!showScrollbar) {
      return null;
    }

    return (
      <div
        ref={(tracker) => { this.tracker = tracker; }}
        className={`scrollbar ${showTrack ? 'track-visible' : ''}`}
        style={trackStyle}
      >
        <div
          role="presentation"
          onMouseDown={this.onMouseDown}
          className={`${isMoving ? 'moving' : ''} scrollbar-handle`}
          style={handleStyles}
        />
      </div>
    );
  }
}

ScrollBar.propTypes = {
  showTrack: PropTypes.bool,
  onDrag: PropTypes.func,
  trackStyle: PropTypes.shape(),
  handleStyle: PropTypes.shape(),
};
ScrollBar.defaultProps = {
  showTrack: true,
  onDrag: undefined,
  trackStyle: {},
  handleStyle: {},
};

export default ScrollBar;
