/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';

const Paging = props => {
  const { selected, qty } = props;
  const betweenPages = Math.max(qty - 2, 0);
  const siblings = new Array(betweenPages)
    .fill()
    .map((i, idx) => ({ value: idx + 1, label: idx + 2 }));
  const translation = -(Math.min(Math.max(0, qty - 7), Math.max(0, selected - 3)) * 38);

  return (
    <div className="paging-box">
      {qty > 0 && (
        <Page onClick={() => props.onSelect(0)} label={1} value={0} isSelected={selected === 0} />
      )}
      <div className="paging-scroller-box">
        <div
          className="paging-scroller "
          style={{ transform: `translate3d(${translation}px,0px,0px)` }}
        >
          {siblings.map(item => (
            <Page
              onClick={() => props.onSelect(item.value)}
              key={item.value}
              isSelected={selected === item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>
      </div>
      {qty > 1 && (
        <Page
          onClick={() => props.onSelect(qty - 1)}
          label={qty}
          isSelected={selected === qty - 1}
        />
      )}
    </div>
  );
};

Paging.propTypes = {
  selected: PropTypes.number,
  qty: PropTypes.number,
  onSelect: PropTypes.func,
};

const Page = ({ onClick, label, isSelected }) => (
  <div onClick={onClick} className={`paging-page ${isSelected && 'selected'}`}>
    {label}
  </div>
);

Page.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  isSelected: PropTypes.bool,
};

class Paginator extends React.Component {
  constructor(props) {
    super(props);

    // define a timeout store
    this.rangeChangeTimeout = undefined;
    this.state = {
      originalTop: this.props.direction === 'down' ? -45 : 5,
      showingTop: this.props.position,
      valueStart: this.props.start,
      valueStop: this.props.stop,
      animate: false,
    };
  }
  componentWillUnmount() {
    clearTimeout(this.rangeChangeTimeout);
  }
  componentWillReceiveProps(nextProps) {
    const changes = {};
    if (nextProps.hide && nextProps.hide != this.props.hide) {
      changes.animate = false;
    }
    if (nextProps.show && nextProps.show != this.props.show) {
      changes.valueStart = nextProps.start;
      changes.valueStop = nextProps.stop;
      changes.animate = true;

      // remove the previous timeout, might request a new animation soon
      clearTimeout(this.rangeChangeTimeout);
      this.rangeChangeTimeout = setTimeout(() => {
        this.setState({ animate: false });
      }, 1500);
    }

    if (Object.keys(changes).length > 0) {
      this.setState(changes);
    }
  }

  render() {
    const rangeClass = this.state.animate ? 'fadeInOut' : '';
    const top = this.state.animate ? this.state.showingTop : this.state.originalTop;

    return (
      <div className="paginator">
        <div
          className={` paginator-animator ${rangeClass}`}
          style={{ transform: `translateY(${top}px)` }}
        >
          <div className="paginator-range">
            {this.state.valueStart} - {this.state.valueStop}
          </div>
        </div>
      </div>
    );
  }
}

Paginator.propTypes = {
  direction: PropTypes.string,
  position: PropTypes.number,
  start: PropTypes.number,
  stop: PropTypes.number,
  hide: PropTypes.bool,
  show: PropTypes.bool,
};

export { Paging, Page, Paginator };
