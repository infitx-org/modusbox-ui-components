import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

// Render into subtree is necessary for parent contexts to transfer over
// For example, for react-router

class ModalPortal extends PureComponent {
  constructor(props) {
    super(props);
    // Create a div and append it to the body
    // Mount a component on that div
    this._div = document.createElement('div');
    if (this.props.id) {
      this._div.id = this.props.id;
    }
    this._div.className = 'el-modal__box';
    this._target = document.body.appendChild(this._div);
    this._modalIndex = document.querySelectorAll('.el-modal__box').length;
  }
  componentDidMount() {
    if (!this._div.contains(document.activeElement)) {
      document.activeElement.blur();
    }
  }
  componentWillUnmount() {
    document.body.removeChild(this._target);
  }

  // This doesn't actually return anything to render
  render() {
    const childrenWithIndex = React.cloneElement(this.props.children, {
      modalIndex: this._modalIndex,
    });

    return ReactDOM.createPortal(childrenWithIndex, this._target);
  }
}
ModalPortal.defaultProps = {
  id: undefined,
  children: undefined,
};

ModalPortal.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
};

export default ModalPortal;
