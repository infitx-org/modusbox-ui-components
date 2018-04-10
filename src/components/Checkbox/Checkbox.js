import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { focusNextFocusableElement } from '../../utils/common';
import './Checkbox.scss';

class Checkbox extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			checked: this.props.checked,
		};
		this.onChange = this.onChange.bind(this);
		this.testKey = this.testKey.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const { checked } = nextProps;
		if (checked !== this.state.checked) {
			this.setState({ checked });
		}
	}
	onChange() {
		if (this.props.disabled) return;

		const checked = !this.state.checked;
		this.setState({ checked });
		this.input.focus();

		if (typeof this.props.onChange === 'function') {
			this.props.onChange(checked);
		}
	}
	testKey(e) {
		if (e.nativeEvent.keyCode === 9) {
			e.stopPropagation();
			e.preventDefault();
			focusNextFocusableElement(this.input, !e.nativeEvent.shiftKey);
			return;
		}
		if (e.nativeEvent.keyCode === 13) {
			e.stopPropagation();
			e.preventDefault();
			this.onChange(e);
		}
	}
	render() {
		const { checked } = this.state;
		const {
			semi, id, label, disabled, round,
		} = this.props;

		return (
			<div className="mb-input input-checkbox">
				<input
					ref={(input) => {
						this.input = input;
					}}
					type="checkbox"
					id={id}
					className={`input-checkbox__input ${semi ? 'semi-checked' : ''}`}
					onKeyDown={this.testKey}
					checked={checked && semi !== true}
					onChange={this.preventDefault}
					onClick={this.onChange}
					disabled={disabled}
				/>
				<label htmlFor={id} className={`${round ? 'round' : ''}`}>
					{label}
				</label>
			</div>
		);
	}
}
Checkbox.propTypes = {
	semi: PropTypes.bool,
	id: PropTypes.string,
	label: PropTypes.string,
	round: PropTypes.bool,
	onChange: PropTypes.func,
	checked: PropTypes.bool,
	disabled: PropTypes.bool,
};
Checkbox.defaultProps = {
	semi: false,
	id: undefined,
	label: undefined,
	round: false,
	onChange: undefined,
	checked: false,
	disabled: false,
};
export default Checkbox;
