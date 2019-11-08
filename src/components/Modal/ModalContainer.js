import './Modal.scss';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import ModalBackground from './ModalBackground';
import ModalPortal from './ModalPortal';

class ModalContainer extends PureComponent {
  render() {
    const {
      props: { children, ...otherProps },
    } = this;

    return (
      <ModalPortal {...otherProps}>
        <ModalBackground {...otherProps}>{children}</ModalBackground>
      </ModalPortal>
    );
  }
}

ModalContainer.defaultProps = {
  children: undefined,
};

ModalContainer.propTypes = {
  children: PropTypes.node,
};

export default ModalContainer;
