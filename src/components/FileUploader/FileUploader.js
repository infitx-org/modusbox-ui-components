import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import * as utils from '../../utils/common';
import keyCodes from '../../utils/keyCodes';

import { Loader, Placeholder, InnerButton, Validation } from '../Common';

import '../../icons/mule/upload-small.svg';
import '../../icons/mule/close-small.svg';

import './FileUploader.scss';

class FileUploader extends PureComponent {
  constructor(props) {
    super(props);

    this.onClickFileUploader = this.onClickFileUploader.bind(this);
    this.onCloseFileUploader = this.onCloseFileUploader.bind(this);
    this.leaveFileUploader = this.leaveFileUploader.bind(this);
    this.onEnterFileUploader = this.onEnterFileUploader.bind(this);
    this.onPageClick = this.onPageClick.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onRemoveButtonClick = this.onRemoveButtonClick.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    this.state = {
      isOpen: false,
      fileName: undefined,
    };
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.onPageClick, false);
  }
  componentDidUpdate(prevProps) {
    const { file, disabled } = this.props;

    if (file !== this.fileContent) {
      this.fileContent = file;
    }
    if (disabled !== prevProps.disabled) {
      this.setState({ isOpen: false });
    }

  }
  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onPageClick, false);
  }
  async onChangeFile(e) {
    const readAsText = file => {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsText(file);
      });
    };
    const readAsBase64 = file => {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.readAsDataURL(file);
        reader.onload = event => resolve(event.target.result.split(',')[1]);
        reader.onerror = error => reject(error);
      });
    };

    const [file] = e.target.files;
    if (file === undefined) {
      return;
    }

    const { parseFileAs } = this.props;
    let fileContent = file;
    if (parseFileAs === 'text') {
      fileContent = await readAsText(file);
    }
    if (parseFileAs === 'base64') {
      fileContent = await readAsBase64(file);
    }
    this.fileContent = file;
    this.setState({
      fileName: file.name,
    });

    if (this.props.onChange) {
      this.props.onChange(fileContent);
    }
  }
  onCloseFileUploader() {
    this.setState({ isOpen: false });
  }
  onEnterFileUploader() {
    this.setState({ isOpen: true });
    if (this.state.disabled) {
      this.leaveFileUploader();
    }
  }
  onClickFileUploader() {
    const isOpen = !this.state.isOpen;
    this.setState({ isOpen });
    if (isOpen === true) {
      this.fileuploader.focus();
    }
  }
  onButtonClick() {
    this.fileuploader.click();
  }
  onRemoveButtonClick() {
    this.fileuploader.value = '';
    this.fileContent = undefined;
    this.setState({
      fileName: undefined,
    });
    if (this.props.onChange) {
      this.props.onChange(undefined);
    }
  }

  onKeyDown(e) {
    if (!this.state.isOpen) {
      return;
    }
    const { keyCode, shiftKey } = e.nativeEvent;
    if (keyCode === keyCodes.KEY_TAB) {
      e.preventDefault();
      e.stopPropagation();
      this.leaveFileUploader(!shiftKey);
      return;
    }

    if (keyCode === keyCodes.KEY_RETURN) {
      e.preventDefault();
      this.onButtonClick();
    }
  }
  onPageClick(e) {
    if (!this.state.isOpen) {
      return;
    }
    const isClickWithinTextFieldBox = this.area.contains(e.target);
    if (!isClickWithinTextFieldBox) {
      this.onCloseFileUploader();
    }
  }
  leaveFileUploader(next = true) {
    utils.focusNextFocusableElement(this.fileuploader, next);
    this.onCloseFileUploader();
  }

  render() {
    const {
      id,
      size,
      className,
      placeholder,
      fileType,
      style,
      required,
      invalid,
      invalidMessages,
      pending,
      disabled,
    } = this.props;
    const { isOpen, fileName } = this.state;
    const hasFile = this.fileContent !== undefined && fileName;

    const componentClassName = utils.composeClassNames([
      className,
      'input-fileuploader__component',
      'mb-input',
      'mb-input__borders',
      'mb-input__background',
      'mb-input__shadow',
      size === 's' && 'mb-input--small',
      size === 'm' && 'mb-input--medium',
      size === 'l' && 'mb-input--large',
      /* eslint-disable max-len  */
      isOpen &&
        'mb-input--open mb-input__borders--open mb-input__background--open mb-input__shadow--open',
      disabled && 'mb-input--disabled mb-input__borders--disabled mb-input__background--disabled',
      pending &&
        'mb-input--pending mb-input__borders--pending mb-input__background--pending mb-input__shadow--pending',
      invalid &&
        'mb-input--invalid mb-input__borders--invalid mb-input__background--invalid mb-input__shadow--invalid',
      required &&
        fileName === undefined &&
        'mb-input--required mb-input__borders--required mb-input__background--required mb-input__shadow--required',
      /* eslint-enable */
    ]);

    let customPlaceholder = null;
    if (placeholder) {
      customPlaceholder = <Placeholder size={size} label={placeholder} active />;
    }

    const fileNameClassName = utils.composeClassNames([
      'input-fileuploader__filename',
      !hasFile && 'input-fileuploader__filename--no-file',
      size === 's' && 'input-fileuploader__filename--small',
      size === 'm' && 'input-fileuploader__filename--medium',
      size === 'l' && 'input-fileuploader__filename--large',
    ]);
    const fileNameLabel = hasFile ? fileName : 'No File Choosen';

    let fileButton = null;
    if (!pending) {
      let buttonClassName = 'input-fileuploader__button-add';
      let onClick = this.onButtonClick;
      let label = 'Choose File';
      let icon = 'upload-small';
      let kind = isOpen ? 'primary' : 'dark';

      if (hasFile) {
        buttonClassName = 'input-fileuploader__button-remove';
        onClick = this.onRemoveButtonClick;
        label = 'Remove File';
        icon = 'close-small';
        if (isOpen) {
          kind = 'danger';
        }
      }
      fileButton = (
        <InnerButton
          size={size}
          tabIndex="-1"
          className={buttonClassName}
          onClick={onClick}
          kind={kind}
          noFill={!isOpen}
          icon={icon}
          label={label}
          disabled={disabled}
          active={isOpen}
        />
      );
    }

    let loader = null;
    if (pending) {
      loader = <Loader size={size} />;
    }

    return (
      <div
        style={style}
        id={id}
        className={componentClassName}
        onClick={this.onClickFileUploader}
        onKeyDown={this.onClickFileUploader}
        ref={area => {
          this.area = area;
        }}
        role="presentation"
      >
        <div className="input-fileuploader-box">
          <div className="mb-input__content input-fileuploader__content">
            {customPlaceholder}
            <input
              className="input-fileuploader__input"
              type="file"
              accept={fileType}
              onFocus={this.onEnterFileUploader}
              onChange={this.onChangeFile}
              disabled={disabled}
              ref={fileuploader => {
                this.fileuploader = fileuploader;
              }}
              onKeyDown={this.onKeyDown}
              id={`${id}-file`}
            />
            <div className={fileNameClassName}>{fileNameLabel}</div>
            {loader}
            {fileButton}
            <Validation
              className="input-fileuploader__icon"
              active={isOpen}
              messages={invalidMessages}
              invalid={invalid}
            />
          </div>
        </div>
      </div>
    );
  }
}

FileUploader.propTypes = {
  style: PropTypes.shape(),
  id: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(['s', 'm', 'l']),
  file: PropTypes.string,
  fileType: PropTypes.string,
  parseFileAs: PropTypes.oneOf(['text', 'base64']),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  pending: PropTypes.bool,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  invalidMessages: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      text: PropTypes.string,
    }),
  ),
  
  required: PropTypes.bool,
};

FileUploader.defaultProps = {
  style: {},
  id: undefined,
  className: undefined,
  size: 'l',
  file: undefined,
  fileType: undefined,
  parseFileAs: undefined,
  onChange: undefined,
  placeholder: undefined,
  pending: false,
  disabled: false,
  invalid: false,
  invalidMessages: [],
  required: false,
};

export default FileUploader;
