import './Modal.scss';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import ModalBackground from './ModalBackground';
import ModalPortal from './ModalPortal';

class Modal extends PureComponent {
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

Modal.defaultProps = {
  kind: 'primary',
  isSubmitPending: false,
  isCloseEnabled: true,
  isSubmitEnabled: undefined,
  isUndoEnabled: undefined,
  allowClose: true,
  allowSubmit: undefined,
  allowUndo: undefined,
  noFooter: false,
  onClose: undefined,
  onUndo: undefined,
  onCancel: undefined,
  onSubmit: undefined,
  primaryAction: 'Submit',
  flex: false,
  tabbed: false,
  maximise: false,
  children: undefined,
  width: '600',
  title: '',
  allowCancel: false,
  isCancelEnabled: false,
  submitButtonId: '',
};

Modal.propTypes = {
  kind: PropTypes.oneOf(['danger', 'warning', 'primary']),
  isSubmitPending: PropTypes.bool,
  isCloseEnabled: PropTypes.bool,
  isSubmitEnabled: PropTypes.bool,
  isUndoEnabled: PropTypes.bool,
  allowClose: PropTypes.bool,
  allowSubmit: PropTypes.bool,
  allowUndo: PropTypes.bool,
  noFooter: PropTypes.bool,
  onClose: PropTypes.func,
  onUndo: PropTypes.func,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  primaryAction: PropTypes.string,
  flex: PropTypes.bool,
  tabbed: PropTypes.bool,
  maximise: PropTypes.bool,
  children: PropTypes.node,
  width: PropTypes.string,
  title: PropTypes.string,
  allowCancel: PropTypes.bool,
  isCancelEnabled: PropTypes.bool,
  submitButtonId: PropTypes.string,
};

export default Modal;
