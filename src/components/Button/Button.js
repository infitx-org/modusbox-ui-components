import React, { PropTypes } from 'react';
import * as utils from '../../utils/common';

import Icon from '../Icon';
import Spinner from '../Spinner';
import './Button.scss';

class Button extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.testKey = this.testKey.bind(this);
	}

	componentWillReceiveProps(nextProps) {}

	onClick(e) {
		if (this.props.disabled) return;
		if (typeof this.props.onClick === 'function') {
			this.props.onClick(e);
		}
	}
	testKey(e) {
		if (e.nativeEvent.keyCode === 9) {
			e.preventDefault();
			utils.focusNextFocusableElement(this.refs.input, !e.nativeEvent.shiftKey);
			return;
		}

		if (e.nativeEvent.keyCode === 13) {
			e.preventDefault();
			this.onClick(e);
			return;
		}
	}
	render() {
		const {
			id,
			className,
			style,
			kind,
			label,
			icon,
			noFill,
			disabled,
			pending,
		} = this.props;
		const classNames = utils.composeClassNames([
			className,
			'modus-input input-button__input',
			kind === 'primary' && 'input-button__modus-input--primary',
			kind === 'secondary' && 'input-button__modus-input--secondary',
			kind === 'tertiary' && 'input-button__modus-input--tertiary',
			kind === 'danger' && 'input-button__modus-input--danger',
			disabled && 'modus-input--disabled input-button__modus-input--disabled',
			pending && 'modus-input--pending input-button__modus-input--pending',
			noFill && 'noFill',
		]);

		return (
			<Btn
				ref="input"
				id={id}
				style={style}
				className={classNames}
				onKeyDown={this.testKey}
				onClick={this.onClick}
				disabled={disabled}
			>
				<div className="input-button__content">
					{(pending || icon) && (
						<div className="input-button__icon">
							{pending ? (
								<Spinner color="inherit" size={16} />
							) : (
								<Icon name={icon} stroke="none" spin={pending} size={16} />
							)}
						</div>
					)}
					{label && <span>{label}</span>}
				</div>
			</Btn>
		);
	}
}
Button.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string,
	style: PropTypes.string,
	kind: PropTypes.string,
	label: PropTypes.string,
	icon: PropTypes.string,
	noFill: PropTypes.bool,
	disabled: PropTypes.bool,
	pending: PropTypes.bool,
	onClick: PropTypes.func,
};
Button.defaultProps = {
	className: undefined,
	id: undefined,
	style: undefined,
	kind: 'primary',
	label: undefined,
	icon: undefined,
	noFill: false,
	disabled: false,
	pending: false,
	onClick: undefined,
};

class Btn extends React.PureComponent {
	constructor(props) {
		super(props);
	}
	render() {
		const {
			id,
			style,
			className,
			onKeyDown,
			onClick,
			disabled,
			children,
		} = this.props;
		return (
			<button
				id={id}
				style={style}
				className={className}
				onKeyDown={onKeyDown}
				onClick={onClick}
				disabled={disabled}
			>
				{children}
			</button>
		);
	}
}
export default Button;
