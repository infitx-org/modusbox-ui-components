import * as utils from 'common/generic';
import React, { PureComponent } from 'react';

import Button from '../Button';
import ControlIcon from '../ControlIcon/ControlIcon';
import ScrollBox from '../ScrollBox';

const ModalContent = ({ tabbed, flex, children }) => {
  if (tabbed) {
    return children;
  }
  const contentClassName = utils.composeClassNames([
    'el-modal__body__content',
    flex && 'el-modal__body__content--flexible',
  ]);
  const wrappedContent = <div className={contentClassName}>{children}</div>;
  if (flex) {
    return wrappedContent;
  }
  return <ScrollBox flex>{wrappedContent}</ScrollBox>;
};

const ModalHeader = ({ kind, title, allowClose, onClose, isCloseDisabled }) => (
  <div className="el-modal__header">
    <div className="el-modal__header-title">{title}</div>
    {allowClose && (
      <div className="el-modal__header-close">
        <ControlIcon
          onClick={onClose}
          kind={kind !== 'primary' ? 'light' : 'default'}
          icon="close-small"
          size={20}
          disabled={isCloseDisabled}
          delay={500}
          tooltip="Close"
          tooltipPosition="left"
        />
      </div>
    )}
  </div>
);

const ModalFooter = ({
  allowCancel,
  onCancel,
  isCancelDisabled,

  allowUndo,
  onUndo,
  isUndoDisabled,

  allowSubmit,
  submitId,
  isSubmitPending,
  isSubmitDisabled,
  onSubmit,
  submitLabel,
  submitKind,

  allowClose,
  onClose,
  isCloseDisabled,
}) => (
  <div className="el-modal__footer">
    <div className="el-modal__footer-left" />
    <div className="el-modal__footer-right">
      {allowCancel && (
        <Button
          onClick={onCancel}
          disabled={isCancelDisabled}
          label="Cancel"
          icon="close-small"
          kind="secondary"
        />
      )}
      {allowUndo && (
        <Button
          onClick={onUndo}
          disabled={isUndoDisabled}
          label="Undo"
          icon="trash-small"
          kind="secondary"
        />
      )}
      {allowSubmit && (
        <Button
          id={submitId}
          pending={isSubmitPending}
          icon="check-small"
          disabled={isSubmitDisabled}
          onClick={onSubmit}
          label={submitLabel}
          kind={submitKind}
          className={`el-modal__submit ${isSubmitDisabled ? 'disabled' : ''}`}
        />
      )}
      {allowClose && (
        <Button
          noFill
          disabled={isCloseDisabled}
          onClick={onClose}
          label="Close"
          kind="secondary"
          className={`el-modal__close ${isCloseDisabled ? 'disabled' : ''}`}
        />
      )}
    </div>
  </div>
);

export default class ModalBackground extends PureComponent {
  constructor(props) {
    super(props);
    this.onClickOverlay = this.onClickOverlay.bind(this);

    this.onClose = this.onClose.bind(this);
    this.onUndo = this.onUndo.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
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
    if (this.props.allowClose && this.props.isCloseEnabled && !this.props.isSubmitPending) {
      this.onClose();
    }
  }

  render() {
    const {
      flex,
      tabbed,
      maximise,
      modalIndex,
      isSubmitEnabled,
      isCloseEnabled,
      isCancelEnabled,
      isUndoEnabled,
      noFooter,
      width,
      children,
      kind,
      title,
      allowClose,
      allowCancel,
      allowUndo,
      allowSubmit,
      submitButtonId,
      primaryAction,
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

    const isSubmitDisabled = !isSubmitEnabled || this.props.isSubmitPending;
    const isCloseDisabled = !isCloseEnabled || this.props.isSubmitPending;

    const bodyClassName = utils.composeClassNames([
      'el-modal__body',
      tabbed && 'el-modal__body--tabbed',
    ]);
    return (
      <div className="element el-modal">
        <div
          className="el-modal__overlay"
          style={customStyle}
          onClick={this.onClickOverlay}
          role="presentation"
        />
        <div className={`el el-modal__container ${kind}`} style={modalStyle}>
          <ModalHeader
            kind={kind}
            title={title}
            allowClose={allowClose}
            onClose={this.onClose}
            isCloseDisabled={isCloseDisabled}
          />

          <div className={bodyClassName}>
            <ModalContent tabbed={tabbed} flex={flex}>
              {children}
            </ModalContent>
          </div>

          {!noFooter && (
            <ModalFooter
              allowCancel={allowCancel}
              onCancel={this.onCancel}
              isCancelDisabled={!isCancelEnabled}
              allowUndo={allowUndo}
              onUndo={this.onUndo}
              isUndoDisabled={!isUndoEnabled || this.props.isSubmitPending}
              allowSubmit={allowSubmit}
              submitId={submitButtonId}
              isSubmitPending={this.props.isSubmitPending}
              isSubmitDisabled={isSubmitDisabled}
              onSubmit={this.onSubmit}
              submitLabel={primaryAction}
              submitKind={kind}
              allowClose={this.props.allowClose}
              onClose={this.onClose}
              isCloseDisabled={isCloseDisabled}
            />
          )}
        </div>
      </div>
    );
  }
}
