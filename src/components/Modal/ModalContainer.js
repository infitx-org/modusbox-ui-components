import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ModalPortal from './ModalPortal';
import ModalBackground from './ModalBackground';

class ModalContainer extends PureComponent {
  render() {
    const { props: { children, ...otherProps } } = this;

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
