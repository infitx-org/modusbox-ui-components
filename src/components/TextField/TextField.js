import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import * as utils from '../../utils/common';
import keyCodes from '../../utils/keyCodes';

import Icon from '../Icon';
import { Loader, Placeholder, InnerButton } from '../Common';

import './TextField.scss';

class TextField extends PureComponent {
	constructor(props) {
		super(props);

		// Events
		this.onShowPasswordClick = this.onShowPasswordClick.bind(this);
		this.onPageClick = this.onPageClick.bind(this);
		this.onTextFieldClick = this.onTextFieldClick.bind(this);
		this.onButtonClick = this.onButtonClick.bind(this);

		// Wrapper events
		this.onClick = this.onClick.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onFocus = this.onFocus.bind(this);

		// Internal lifecycle methods
		this.closeTextField = this.closeTextField.bind(this);
		this.leaveTextField = this.leaveTextField.bind(this);
		this.enterTextField = this.enterTextField.bind(this);
		this.testKey = this.testKey.bind(this);

		const { value } = this.props;
		this.state = {
			isOpen: false,
			isPasswordVisible: false,
			value,
		};
	}

	componentDidMount() {
		window.addEventListener('mouseup', this.onPageClick, false);
	}
	componentWillReceiveProps(nextProps) {
		const changes = {};
		const { value, disabled } = nextProps;

		if (value !== this.props.value) {
			changes.value = value;
		}
		if (disabled !== this.props.disabled) {
			changes.isOpen = false;
		}

		if (Object.keys(changes).length > 0) {
			this.setState(changes);
		}
	}
	componentWillUnmount() {
		window.removeEventListener('mouseup', this.onPageClick, false);
	}

	onTextFieldClick() {
		this.input.click();
	}
	onButtonClick(e) {
		e.stopPropagation();
		if (typeof this.props.onButtonClick === 'function') {
			this.props.onButtonClick(e);
		}
	}
	onClick(e) {
		if (typeof this.props.onClick === 'function') {
			this.props.onClick(e);
		}
		if (this.state.isOpen === true) {
			return;
		}
		this.input.focus();
		this.setState({ isOpen: true });
	}
	onChange(e) {
		const { value } = e.target;
		if (this.state.value !== value) {
			this.setState({ value });

			if (typeof this.props.onChange === 'function') {
				this.props.onChange(value);
			}
		}
	}
	onKeyPress(e) {
		if (typeof this.props.onKeyPress === 'function') {
			this.props.onKeyPress(e);
		}
	}
	onBlur(e) {
		if (typeof this.props.onBlur === 'function') {
			this.props.onBlur(e);
		}
		this.closeTextField();
	}
	onFocus(e) {
		if (typeof this.props.onFocus === 'function') {
			this.props.onFocus(e);
		}
		this.enterTextField(e);
	}

	onPageClick(evt) {
		if (!this.state.isOpen) {
			return;
		}
		const isClickWithinTextFieldBox = this.area.contains(evt.target);
		if (!isClickWithinTextFieldBox) {
			this.closeTextField();
			this.input.blur();
		}
	}
	onShowPasswordClick(e) {
		e.stopPropagation();
		this.setState({ isPasswordVisible: !this.state.isPasswordVisible });
	}

	closeTextField() {
		this.setState({ isOpen: false });
	}
	leaveTextField(next) {
		this.closeTextField();
		utils.focusNextFocusableElement(this.input, next);
	}
	enterTextField() {
		if (this.props.disabled) {
			this.leaveTextField();
			return;
		}
		this.setState({ isOpen: true });
	}
	testKey(e) {
		const { keyCode, shiftKey } = e.nativeEvent;
		if (keyCode === keyCodes.KEY_TAB) {
			e.preventDefault();
			this.leaveTextField(!shiftKey);
			return;
		}
		if (keyCode === keyCodes.KEY_RETURN) {
			if (this.props.buttonText) {
				this.onButtonClick(e);
			} else {
				e.preventDefault();
				this.leaveTextField(!shiftKey);
			}
		}
	}

	render() {
		const {
			autofocus, id, type, style, placeholder, onButtonClick, buttonText, buttonKind, buttonDisabled, icon, disabled, pending, required, invalid,
		} = this.props;
		const { isOpen, value, isPasswordVisible } = this.state;
		const isPlaceholderActive = isOpen || value !== undefined;
		const hasButton = typeof onButtonClick === 'function';

		const componentClassName = utils.composeClassNames([
			'input-textfield__component',
			'mb-input',
			'mb-input__borders',
			'mb-input__background',
			isOpen && 'mb-input--open mb-input__borders--open mb-input__background--open',
			disabled && 'mb-input--disabled mb-input__borders--disabled mb-input__background--disabled',
			pending && 'mb-input--pending mb-input__borders--pending mb-input__background--pending',
			invalid && 'mb-input--invalid mb-input__borders--invalid mb-input__background--invalid',
			required &&
				(value === undefined || value === '') &&
				'mb-input--required mb-input__borders--required mb-input__background--required',
		]);

		const inputType = (isPasswordVisible && 'text') || type;

		return (
			<div className="input-textfield mb-input__box" style={style}>
				<div
					className={componentClassName}
					onClick={this.onTextFieldClick}
					ref={(area) => { this.area = area; }}
					role="presentation"
				>
					<div className="mb-input__content input-textfield__content">
						<Placeholder label={placeholder} active={isPlaceholderActive} />

						<input
							id={id}
							ref={(input) => { this.input = input; }}
							autoFocus={autofocus === true}
							type={inputType}
							onClick={this.onClick}
							onChange={this.onChange}
							onKeyDown={this.testKey}
							onKeyPress={this.onKeyPress}
							onBlur={this.onBlur}
							onFocus={this.onFocus}
							value={value || ''}
							disabled={disabled}
							className="mb-input__input input-textfield__value"
						/>
						{hasButton && (
							<InnerButton
								kind={buttonKind}
								onClick={this.onButtonClick}
								label={buttonText}
								disabled={disabled||buttonDisabled}
								isOpen={isOpen}								
							/>
						)}

						<Loader visible={pending} />

						{type === 'password' && (
							<div className="mb-input__inner-icon input-textfield__icon">
								<EyeIcon open={isPasswordVisible} onClick={this.onShowPasswordClick} />
							</div>
						)}
						{icon && (
							<div className="mb-input__inner-icon input-textfield__icon">
								<Icon size={16} name={icon} />
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

TextField.propTypes = {
	autofocus: PropTypes.bool,
	style: PropTypes.shape(),
	type: PropTypes.oneOf(['text', 'password']),
	id: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	buttonText: PropTypes.string,
	buttonKind: PropTypes.string,
	buttonDisabled: PropTypes.bool,
	onClick: PropTypes.func,
	onButtonClick: PropTypes.func,
	onChange: PropTypes.func,
	onKeyPress: PropTypes.func,
	onBlur: PropTypes.func,
	onFocus: PropTypes.func,
	icon: PropTypes.string,
	pending: PropTypes.bool,
	required: PropTypes.bool,
	invalid: PropTypes.bool,
	disabled: PropTypes.bool,
};

TextField.defaultProps = {
	autofocus: false,
	type: 'text',
	id: undefined,
	style: {},
	placeholder: undefined,
	value: undefined,
	buttonText: undefined,
	buttonKind: undefined,
	buttonDisabled: false,
	onClick: undefined,
	onButtonClick: undefined,
	onChange: undefined,
	onKeyPress: undefined,
	onBlur: undefined,
	onFocus: undefined,
	icon: undefined,
	pending: false,
	required: false,
	invalid: false,
	disabled: false,
};

const EyeIcon = ({ open, onClick }) => (
	<Icon
		style={{cursor:'pointer'}}
		onClick={onClick}
		name={open ? 'toggle-invisible' : 'toggle-visible'}
		size={16}
		fill={open ? '#999' : '#39f'}
	/>
);

EyeIcon.propTypes = {
	open: PropTypes.bool,
	onClick: PropTypes.func,
};
EyeIcon.defaultProps = {
	open: false,
	onClick: undefined,
};

export default TextField;
