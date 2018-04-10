import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import * as utils from '../../utils/common';
import keyCodes from '../../utils/keyCodes';

import { Loader, Placeholder } from '../Common';
import Button from '../Button';

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
			fileContent: undefined,
			fileName: undefined,
		};
	}

	componentDidMount() {
		window.addEventListener('mouseup', this.onPageClick, false);
	}
	componentWillReceiveProps(nextProps) {
		const changes = {};
		const { certificate, pending, disabled } = nextProps;

		if (certificate !== this.state.fileContent) {
			changes.fileContent = certificate;
		}
		if (pending !== this.props.pending) {
			changes.pending = pending;
		}
		if (disabled !== this.props.disabled) {
			changes.disabled = disabled;
			changes.isOpen = false;
		}

		if (Object.keys(changes).length > 0) {
			this.setState(changes);
		}
	}
	componentWillUnmount() {
		window.removeEventListener('mouseup', this.onPageClick, false);
	}
	async onChangeFile(e) {
		const readAsText = (file) => {
			const reader = new FileReader();
			return new Promise((resolve, reject) => {
				reader.onload = event => resolve(event.target.result);
				reader.onerror = error => reject(error);
				reader.readAsText(file);
			});
		};
		const readAsBase64 = (file) => {
			const reader = new FileReader();
			return new Promise((resolve, reject) => {
				reader.readAsDataURL(file);
				reader.onload = event => resolve(event.target.result);
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
		this.setState({
			fileContent,
			fileName: file.name,
		});

		if (typeof this.props.onChange === 'function') {
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
		this.setState({
			fileContent: undefined,
			fileName: undefined,
		});
		if (typeof this.props.onChange === 'function') {
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
			id, placeholder, fileType, style, required, invalid, pending, disabled,
		} = this.props;
		const { isOpen, fileName, fileContent } = this.state;
		const hasFile = fileContent !== undefined && fileName;

		const isPlaceholderActive = isOpen || fileName || placeholder;
		const componentClassName = utils.composeClassNames([
			'input-fileuploader__component',
			'mb-input',
			'mb-input__borders',
			'mb-input__background',
			isOpen && 'mb-input--open mb-input__borders--open mb-input__background--open',
			disabled && 'mb-input--disabled mb-input__borders--disabled mb-input__background--disabled',
			pending && 'mb-input--pending mb-input__borders--pending mb-input__background--pending',
			invalid && 'mb-input--invalid mb-input__borders--invalid mb-input__background--invalid',
			required &&
				fileName === undefined &&
				'mb-input--required mb-input__borders--required mb-input__background--required',
		]);

		return (
			<div className="input-fileuploader mb-input__box" style={style}>
				<div
					id={id}
					className={componentClassName}
					onClick={this.onClickFileUploader}
					onKeyDown={this.onClickFileUploader}
					ref={(area) => {
						this.area = area;
					}}
					role="presentation"
				>
					<div className="input-fileuploader-box">
						<Placeholder label={placeholder} active={isPlaceholderActive} />

						<div className="mb-input__content input-fileuploader__content">
							<input
								className="input-fileuploader__input"
								type="file"
								accept={fileType}
								onFocus={this.onEnterFileUploader}
								onChange={this.onChangeFile}
								disabled={disabled}
								ref={(fileuploader) => {
									this.fileuploader = fileuploader;
								}}
								onKeyDown={this.onKeyDown}
								id={id}
							/>
							<div className={`input-fileuploader__value ${fileName ? '' : 'missing'}`}>
								{fileName || 'No File Choosen'}
							</div>
							{pending && <Loader visible />}
							{!pending &&
								hasFile && (
								<Button
									className={`mb-input__inner-button input-fileuploader__button-remove ${
										isOpen ? 'mb-input__inner-button--active' : ''
									}`}
									onClick={this.onRemoveButtonClick}
									tabIndex="-1"
									icon="close-small"
									label="Remove"
									disabled={disabled}
								/>
							)}
							{!pending &&
								!hasFile && (
								<Button
									className={`mb-input__inner-button input-fileuploader__button-add ${
										isOpen ? 'mb-input__inner-button--active' : ''
									}`}
									onClick={this.onButtonClick}
									tabIndex="-1"
									icon="upload-small"
									label="Choose File"
									disabled={disabled}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

FileUploader.propTypes = {
	style: PropTypes.shape(),
	id: PropTypes.string,
	certificate: PropTypes.string,
	fileType: PropTypes.string,
	parseFileAs: PropTypes.oneOf(['text', 'base64']),
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	pending: PropTypes.bool,
	disabled: PropTypes.bool,
	invalid: PropTypes.bool,
	required: PropTypes.bool,
};

FileUploader.defaultProps = {
	style: {},
	id: undefined,
	certificate: undefined,
	fileType: undefined,
	parseFileAs: undefined,
	onChange: undefined,
	placeholder: undefined,
	pending: false,
	disabled: false,
	invalid: false,
	required: false,
};

export default FileUploader;
