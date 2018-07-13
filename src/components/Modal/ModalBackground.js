import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import * as utils from '../../utils/common';

import Icon from '../Icon';
import Button from '../Button';
import ScrollBox from '../ScrollBox';


const ModalContent = ({ tabbed, flex, children }) => {
  if (tabbed) {
    return children;
  }
  const contentClassName = utils.composeClassNames([
    'element-modal__body__content',
    flex && 'element-modal__body__content--flexible',
  ]);
  const wrappedContent = <div className={contentClassName}>{children}</div>;
  if (flex) {
    return wrappedContent;
  }
  return (
    <ScrollBox flex>
      {wrappedContent}
    </ScrollBox>
  );
};

export default class ModalBackground extends PureComponent {
  constructor(props) {
    super(props);
    this.onClickOverlay = this.onClickOverlay.bind(this);

    this.onClose = this.onClose.bind(this);
    this.onUndo = this.onUndo.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      isSubmitPending: this.props.isSubmitPending,
    };
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isSubmitPending !== this.state.isSubmitPending) {
      if (nextProps.isSubmitPending === false) {
        if (this._isMounted) {
          this.setState({ isSubmitPending: false });
        }
      } else {
        this.setState({ isSubmitPending: true });
      }
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  onUndo() {
    if (this.props.onUndo) {
      this.props.onUndo();
    }
  }
  onCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }
  onSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  }
  onClickOverlay() {
    if (this.props.allowClose && this.props.isCloseEnabled && !this.state.isSubmitPending) {
      this.onClose();
    }
  }

  render() {
    const {
      flex, tabbed, maximise, modalIndex, isSubmitEnabled, isCloseEnabled, isCancelEnabled,
      isUndoEnabled, noFooter, width, children, kind, title, allowClose, allowCancel, allowUndo,
      allowSubmit, submitButtonId, primaryAction,
    } = this.props;
    const maxHeight = maximise ? 'auto' : `calc(100% - ${60 * modalIndex + 70}px)`;
    const bottom = maximise ? '20px' : undefined;
    const modalStyle = {
      top: 50 + 60 * modalIndex,
      bottom,
      maxHeight,
      width,
      left: '50%',
      marginLeft: `-${parseInt(width, 10) / 2}px`,
    };
    const customStyle = {
      background: modalIndex > 0 ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.7)',
    };

    const isSubmitDisabled = !isSubmitEnabled || this.state.isSubmitPending;
    const isCloseDisabled = !isCloseEnabled || this.state.isSubmitPending;

    const bodyClassName = utils.composeClassNames([
      'element-modal__body',
      tabbed && 'element-modal__body--tabbed',
    ]);
    return (
      <div className="element element-modal">
        <div
          className="element-modal__overlay"
          style={customStyle}
          onClick={this.onClickOverlay}
          role="presentation"
        />
        <div className={`element-modal__container ${kind}`} style={modalStyle}>
          <div className="element-modal__header">
            <div className="element-modal__header-title">{title}</div>
            {allowClose && (
              <div className="element-modal__header-close">
                <Icon
                  onClick={this.onClose}
                  name="close-small"
                  size={20}
                  disabled={isCloseDisabled}
                  tooltip="Close"
                  tooltipPosition="left"
                />
              </div>
            )}
          </div>

          <div className={bodyClassName}>
            <ModalContent
              tabbed={tabbed}
              flex={flex}
            >
              {children}
            </ModalContent>
          </div>

          {!noFooter &&
            <div className="element-modal__footer">
              <div className="element-modal__footer-left" />
              <div className="element-modal__footer-right">
                {allowCancel && (
                  <Button
                    onClick={this.onCancel}
                    disabled={!isCancelEnabled}
                    label="Cancel"
                    icon="close-small"
                    kind="secondary"
                  />
                )}
                {allowUndo && (
                  <Button
                    onClick={this.onUndo}
                    disabled={!isUndoEnabled || this.state.isSubmitPending}
                    label="Undo"
                    icon="trash-small"
                    kind="secondary"
                  />
                )}
                {allowSubmit && (
                  <Button
                    id={submitButtonId}
                    pending={this.state.isSubmitPending}
                    icon="check-small"
                    disabled={isSubmitDisabled}
                    onClick={this.onSubmit}
                    label={primaryAction}
                    kind={kind}
                    className={`element-modal__submit ${isSubmitDisabled ? 'disabled' : ''}`}
                  />
                )}
                {this.props.allowClose && (
                  <Button
                    noFill
                    disabled={isCloseDisabled}
                    onClick={this.onClose}
                    label="Close"
                    kind="secondary"
                    className={`element-modal__close ${isCloseDisabled ? 'disabled' : ''}`}
                  />
                )}
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

ModalBackground.defaultProps = {
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
  modalIndex: 0,
  title: '',
  allowCancel: false,
  isCancelEnabled: false,
  submitButtonId: '',
};

ModalBackground.propTypes = {
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
  modalIndex: PropTypes.number,
  title: PropTypes.string,
  allowCancel: PropTypes.bool,
  isCancelEnabled: PropTypes.bool,
  submitButtonId: PropTypes.string,
};
