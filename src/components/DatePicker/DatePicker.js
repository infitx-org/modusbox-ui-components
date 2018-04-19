import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';

import * as utils from '../../utils/common';
import keyCodes from '../../utils/keyCodes';

import Icon from '../Icon';
import { Loader, Placeholder } from '../Common';

import './DatePicker.scss';

class DatePicker extends PureComponent {
	static getDate(value) {
		if (typeof value === 'string' || typeof value === 'number') {
			return new Date(parseInt(value));
		}
		return undefined;
	}
	static getTimeObject(value) {
		let intValue = value;
		if (typeof value === 'undefined') {
			intValue = 0;
		}
		if (typeof value === 'string') {
			intValue = parseInt(value);
		}

		const hour = value ? moment(intValue).get('hour') : 0;
		const minute = value ? moment(intValue).get('minute') : 0;
		const second = value ? moment(intValue).get('second') : 0;
		return { hour, minute, second };
	}
	static getSelectedDayAndTimestamp(value) {
		let myValue = value;
		if (typeof value === 'string') {
			myValue = parseInt(value);
		}
		return {
			selectedDay: myValue ? new Date(myValue) : null,
			timestamp: myValue,
		};
	}
	static getTimestamp(day, hour, minute, second) {
		const date = day
			? moment(day)
				.startOf('day')
				.format('x')
			: 0;
		const dateTime = parseInt(date) + hour * 3600000 + minute * 60000 + second * 1000;
		return dateTime;
	}

	constructor(props) {
		super(props);

		this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
		this.handleDayClick = this.handleDayClick.bind(this);
		this.handleHourClick = this.handleHourClick.bind(this);
		this.handleMinuteClick = this.handleMinuteClick.bind(this);
		this.handleSecondClick = this.handleSecondClick.bind(this);
		this.handlePageClick = this.handlePageClick.bind(this);

		// internal methods
		this.leaveDatePicker = this.leaveDatePicker.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.testKey = this.testKey.bind(this);

		// internal timeout
		this.deferredTimeChangeTimeout = undefined;

		const { selectedDay, timestamp } = DatePicker.getSelectedDayAndTimestamp(this.props.value);
		const { hour, minute, second } = DatePicker.getTimeObject(this.props.value);

		this.state = {
			selectedDay,
			timestamp,
			hour,
			minute,
			second,
			isOpen: false,
		};
	}

	componentDidMount() {
		window.addEventListener('mouseup', this.handlePageClick, false);
	}
	componentWillReceiveProps(props) {
		const {
			value, defaultHour, defaultMinute, defaultSecond,
		} = props;
		const defaultTime = {
			hour: defaultHour,
			minute: defaultMinute,
			second: defaultSecond,
		};

		let timeValue = value;
		if (typeof value === 'string') {
			timeValue = parseInt(value);
		}
		const { selectedDay, timestamp } = DatePicker.getSelectedDayAndTimestamp(timeValue);
		const { hour, minute, second } = value ? DatePicker.getTimeObject(timeValue) : defaultTime;

		this.setState({
			selectedDay,
			timestamp,
			hour,
			minute,
			second,
		});
	}
	componentWillUnmount() {
		window.removeEventListener('mouseup', this.handlePageClick, false);
	}
	onFocus() {
		if (this.state.isOpen === false) {
			this.input.focus();
			this.setState({ isOpen: true });
		}
	}
	handleDateTimeChange(selectedDay, hour, minute, second) {
		// convert the value into the specified format if necessary
		let exportDay = selectedDay === null || selectedDay === undefined ? undefined : selectedDay;
		if (exportDay !== undefined && this.props.format) {
			const dayStamp = moment(exportDay)
				.startOf('day')
				.format(this.props.format);
			const date = parseInt(dayStamp) + hour * 3600000 + minute * 60000 + second * 1000;

			// convert the string into integer when dealing with milliseconds
			if (this.props.format) {
				exportDay = moment(date).format(this.props.format);
				exportDay = parseInt(exportDay);
			}
		}

		// call the external function
		if (typeof this.props.onSelect === 'function') {
			this.props.onSelect(exportDay);
		}
	}
	handleDayClick(e, day, { selected, disabled }) {
		if (disabled) return;
		const selectedDay = selected ? null : day;
		const timestamp = DatePicker.getTimestamp(selected ? undefined : day, 0, 0, 0);
		this.setState({ selectedDay, timestamp });
		this.handleDateTimeChange(selectedDay, this.state.hour, this.state.minute, this.state.second);
	}
	handleHourClick(hour) {
		clearTimeout(this.deferredTimeChangeTimeout);
		const timestamp = DatePicker.getTimestamp(this.state.selectedDay, hour, this.state.minute, this.state.second);
		if (hour > 23) return;
		this.setState({ hour, timestamp });
		this.deferredTimeChangeTimeout = setTimeout(
			() => this.handleDateTimeChange(this.state.selectedDay, hour, this.state.minute, this.state.second),
			500,
		);
	}
	handleMinuteClick(minute) {
		clearTimeout(this.deferredTimeChangeTimeout);
		const timestamp = DatePicker.getTimestamp(this.state.selectedDay, this.state.hour, minute, this.state.second);
		if (minute > 59) return;
		this.setState({ minute, timestamp });
		this.deferredTimeChangeTimeout = setTimeout(
			() => this.handleDateTimeChange(this.state.selectedDay, this.state.hour, minute, this.state.second),
			500,
		);
	}
	handlePageClick(e) {
		if (!this.area.contains(e.target)) {
			this.setState({ isOpen: false });
		}
	}
	handleSecondClick(second) {
		clearTimeout(this.deferredTimeChangeTimeout);
		const timestamp = DatePicker.getTimestamp(this.state.selectedDay, this.state.hour, this.state.minute, second);
		if (second > 59) return;
		this.setState({ second, timestamp });
		this.deferredTimeChangeTimeout = setTimeout(
			() => this.handleDateTimeChange(this.state.selectedDay, this.state.hour, this.state.minute, second),
			500,
		);
	}
	leaveDatePicker(next) {
		this.setState({ isOpen: false });
		utils.focusNextFocusableElement(this.input, next);
	}
	testKey(e) {
		const { keyCode, shiftKey } = e.nativeEvent;
		if (keyCode === keyCodes.KEY_TAB) {
			e.preventDefault();
			this.leaveDatePicker(!shiftKey);
		}
	}

	render() {
		const {
			placeholder, id, style, disabled, pending, invalid, required, dateFormat,
		} = this.props;
		const { isOpen, timestamp, selectedDay } = this.state;
		const initialMonth = selectedDay || DatePicker.getDate(this.props.initialMonth);
		const hasDate = timestamp !== 0 && timestamp !== undefined;
		const isPlaceholderActive = isOpen || hasDate;
		const valueFormat = dateFormat || 'MMM Do YYYY, HH:mm:ss';
		const value = hasDate ? moment(timestamp).format(valueFormat) : '';

		const componentClassName = utils.composeClassNames([
			'input-datepicker__component',
			'mb-input',
			'mb-input__borders',
			'mb-input__background',
			isOpen && 'mb-input--open mb-input__borders--open mb-input__background--open',
			disabled && 'mb-input--disabled mb-input__borders--disabled mb-input__background--disabled',
			pending && 'mb-input--pending mb-input__borders--pending mb-input__background--pending',
			invalid && 'mb-input--invalid mb-input__borders--invalid mb-input__background--invalid',
			required && 'mb-input--required mb-input__borders--required mb-input__background--required',
		]);

		return (
			<div className="input-datepicker mb-input__box" style={style}>
				<div className={componentClassName}>
					<div
						id={id}
						className="mb-input__content input-datepicker__content"
						onClick={this.onFocus}
						onKeyDown={this.onFocus}
						role="presentation"
					>
						<Placeholder label={placeholder} active={isPlaceholderActive} />

						<input
							onFocus={this.onFocus}
							ref={(input) => {
								this.input = input;
							}}
							className="mb-input__input input-datepicker__value"
							value={value}
							onKeyDown={this.testKey}
							disabled={disabled}
						/>

						<Loader visible={pending} />

						<div className="mb-input__inner-icon input-datepicker__icon">
							<Icon size={16} name="calendar-small" fill="#999" />
						</div>
					</div>
				</div>

				<div ref={(area) => { this.area = area; }}>
					{this.state.isOpen && (
						<div className="daypicker-position">
							<DayPicker
								initialMonth={initialMonth}
								selectedDays={day => DateUtils.isSameDay(selectedDay, day)}
								onDayClick={this.handleDayClick}
								disabledDays={this.props.disabledDays}
							/>
							{this.props.withTime && (
								<TimePicker
									hour={this.state.hour}
									minute={this.state.minute}
									second={this.state.second}
									onHourChange={this.handleHourClick}
									onMinuteChange={this.handleMinuteClick}
									onSecondChange={this.handleSecondClick}
									disabled={selectedDay === undefined || selectedDay == null}
								/>
							)}
						</div>
					)}
				</div>
			</div>
		);
	}
}

DatePicker.propTypes = {
	id: PropTypes.string,
	style: PropTypes.shape(),
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	placeholder: PropTypes.string,
	onSelect: PropTypes.func,
	format: PropTypes.string,
	dateFormat: PropTypes.string,
	withTime: PropTypes.bool,
	defaultHour: PropTypes.number,
	defaultMinute: PropTypes.number,
	defaultSecond: PropTypes.number,
	disabled: PropTypes.bool,
	pending: PropTypes.bool,
	required: PropTypes.bool,
	invalid: PropTypes.bool,
	initialMonth: PropTypes.string,
	disabledDays: PropTypes.func,
};
DatePicker.defaultProps = {
	id: undefined,
	style: undefined,
	value: undefined,
	placeholder: undefined,
	onSelect: undefined,
	format: undefined,
	dateFormat: undefined,
	withTime: false,
	defaultHour: 0,
	defaultMinute: 0,
	defaultSecond: 0,
	disabled: false,
	pending: false,
	required: false,
	invalid: false,
	initialMonth: undefined,
	disabledDays: undefined,
};

const TimePicker = ({
	hour, minute, second, onHourChange, onMinuteChange, onSecondChange, disabled,
}) => (
	<div className="timepicker-position">
		<TimeInput name="Hours" limit={23} selected={hour} onChange={onHourChange} disabled={disabled} />
		<TimeInput name="Minutes" limit={59} selected={minute} onChange={onMinuteChange} disabled={disabled} />
		<TimeInput name="Seconds" limit={59} selected={second} onChange={onSecondChange} disabled={disabled} />
	</div>
);
TimePicker.propTypes = {
	hour: PropTypes.number,
	minute: PropTypes.number,
	second: PropTypes.number,
	onHourChange: PropTypes.func,
	onMinuteChange: PropTypes.func,
	onSecondChange: PropTypes.func,
	disabled: PropTypes.bool,
};
TimePicker.defaultProps = {
	hour: 0,
	minute: 0,
	second: 0,
	onHourChange: undefined,
	onMinuteChange: undefined,
	onSecondChange: undefined,
	disabled: false,
};

// //////////////////////////////////////////////

class TimeInput extends PureComponent {
	static getDoubleDigitTime(value) {
		const intValue = parseInt(value);
		return intValue < 10 ? `0${intValue}` : intValue;
	}
	constructor(props) {
		super(props);

		this.onChangeValue = this.onChangeValue.bind(this);
		this.state = {
			value: parseInt(this.props.selected),
			shown: TimeInput.getDoubleDigitTime(this.props.selected),
		};
	}

	componentWillReceiveProps(nextProps) {
		if (parseInt(nextProps.selected) === this.state.value) return;
		this.setState({
			value: parseInt(nextProps.selected),
			shown: TimeInput.getDoubleDigitTime(nextProps.selected),
		});
	}

	onChangeValue(e) {
		const { value } = e.target;
		const time = value === '' ? 0 : parseInt(value);
		this.props.onChange(time);
	}

	render() {
		const { name, limit, disabled } = this.props;
		return (
			<div className="timepicker-item-box">
				<div className="placeholder"> {name} </div>
				<input
					disabled={disabled}
					type="number"
					className="timepicker-select"
					onFocus={e => e.target.select()}
					onChange={this.onChangeValue}
					value={this.state.shown}
					min={0}
					max={limit}
				/>
			</div>
		);
	}
}
TimeInput.propTypes = {
	name: PropTypes.string,
	limit: PropTypes.number,
	selected: PropTypes.number,
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
};
TimeInput.defaultProps = {
	name: '',
	limit: 0,
	selected: false,
	onChange: undefined,
	disabled: false,
};
export default DatePicker;
