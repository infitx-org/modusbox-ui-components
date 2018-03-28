import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import DayPicker, { DateUtils } from 'react-day-picker'

import * as utils from '../../utils/common'
import keyCodes from '../../utils/keyCodes'

import Row from '../Row'
import Icon from '../Icon'
import { Loader, Placeholder } from '../Common'

import './DatePicker.scss'

class DatePicker extends React.PureComponent {
	constructor(props) {
		super(props)
		
		// interaction methods 
		this.handlePageClick = this.handlePageClick.bind(this)
		this.onFocus = this.onFocus.bind(this)		
		
		// time methods 
		this.handleDayClick = this.handleDayClick.bind(this)
		this.handleHourClick = this.handleHourClick.bind(this)
		this.handleMinuteClick = this.handleMinuteClick.bind(this)
		this.handleSecondClick = this.handleSecondClick.bind(this)
		this.handleDateTimeChange = this.handleDateTimeChange.bind(this)
		
		// internal methods 
		this.getDateString = this.getDateString.bind(this)
		this.getDayAndString = this.getDayAndString.bind(this)
		this.getTime = this.getTime.bind(this)
		this.getDate = this.getDate.bind(this)
		this.leaveDatePicker = this.leaveDatePicker.bind(this)
		this.testKey = this.testKey.bind(this)

		// internal timeout 
		this.deferredTimeChangeTimeout = undefined

		const { selectedDay, dateString } = this.getDayAndString( this.props.value )
		const { hour, minute, second } = this.getTime( this.props.value )
		
		this.state = {
			disabled: this.props.disabled,
			selectedDay,
			dateString,
			hour,
			minute,
			second,
			isOpen: false,		
		};		
	}
	
	componentDidMount() {
		window.addEventListener('mouseup', this.handlePageClick, false);
	}
	componentWillUnmount() {
		window.removeEventListener('mouseup', this.handlePageClick, false);
	}
	componentWillReceiveProps(props) {

		const { value, defaultHour, defaultMinute, defaultSecond } = props
		const defaultTime = {
			hour: defaultHour,
			minute: defaultMinute,
			second: defaultSecond
		}
		
		let timeValue = value
		if( typeof value === 'string' ){
			timeValue = parseInt(value)
		}
		const { selectedDay, dateString } = this.getDayAndString( timeValue )		
		const { hour, minute, second } = value ? this.getTime( timeValue ) : defaultTime

		this.setState({ 
			selectedDay,
			dateString,
			hour,
			minute,
			second
		});

	}
	leaveDatePicker( next ){				
		this.setState({ isOpen: false })
		utils.focusNextFocusableElement( this.refs.input, next );
	}
	testKey( e ){		
		const { keyCode, shiftKey } = e.nativeEvent		
		if( keyCode === keyCodes.KEY_TAB ){
			e.preventDefault()
			this.leaveDatePicker( ! shiftKey )
			return
		}		
	}
	getDate( value ){
		if( typeof value === 'string' || typeof value === 'number' ){
			return new Date( parseInt(value) )
		}
		return undefined
	}
	getTime( value ){
		const intValue = typeof value === 'undefined' ? 0 : typeof value === 'string' ? parseInt( value ) : value

		const hour = value ? moment(intValue).get('hour') : 0
		const minute = value ? moment(intValue).get('minute') : 0
		const second = value ? moment(intValue).get('second') : 0
		return { hour, minute, second }

	}

	getDayAndString( value ){
		var myValue = value
		if( typeof value === 'string' ){
			myValue = parseInt(value)
		}
		return { 
			selectedDay: myValue ? new Date( myValue ) : null,
			dateString: myValue
		}	
	}
	
	getDateString( day, hour, minute, second){
		const date = day ? moment(day).startOf('day').format('x') : 0 
		const dateTime = parseInt( date ) + hour * 3600000 + minute * 60000 + second * 1000
		return dateTime 
	}

	onFocus(){
		if( this.state.isOpen === false ){
			this.refs.input.focus()
			this.setState({ isOpen: true })
		}
	}
	// detect if the used clicks outside the datepicker box
	handlePageClick( e ) {		
		const area = ReactDOM.findDOMNode(this.refs.area)	    
		if (!area.contains(e.target)) {
			this.setState({ isOpen: false })
	   }
	}

	handleHourClick( hour ){
		clearTimeout( this.deferredTimeChangeTimeout )
		const dateString = this.getDateString( this.state.selectedDay, hour, this.state.minute, this.state.second )
		if( hour > 23 ) return 		
		this.setState({ hour, dateString })
		this.deferredTimeChangeTimeout = setTimeout( () => this.handleDateTimeChange( this.state.selectedDay, hour, this.state.minute, this.state.second ), 500 )
	}
	
	handleMinuteClick( minute ){	
		clearTimeout( this.deferredTimeChangeTimeout )
		const dateString = this.getDateString( this.state.selectedDay, this.state.hour, minute, this.state.second )		
		if( minute > 59 ) return 
		this.setState({ minute, dateString })
		this.deferredTimeChangeTimeout = setTimeout( () => this.handleDateTimeChange( this.state.selectedDay, this.state.hour, minute, this.state.second ), 500 )
	}

	handleSecondClick( second ){
		clearTimeout( this.deferredTimeChangeTimeout )		
		const dateString = this.getDateString( this.state.selectedDay, this.state.hour, this.state.minute, second )
		if( second > 59 ) return 		
		this.setState({ second, dateString })
		this.deferredTimeChangeTimeout = setTimeout( () => this.handleDateTimeChange( this.state.selectedDay, this.state.hour, this.state.minute, second ), 500 )
	}
		
	handleDayClick(e, day, { selected, disabled }) {
			
		if( disabled ) return 
		const selectedDay = selected ? null : day		
		const dateString =  this.getDateString( selected ? undefined : day, 0, 0, 0 )
		this.setState({ selectedDay, dateString })
		this.handleDateTimeChange( selectedDay, this.state.hour, this.state.minute, this.state.second )
	}

	handleDateTimeChange(selectedDay, hour, minute, second ){

		// convert the value into the specified format if necessary		
		let exportDay = (selectedDay == null || selectedDay == undefined) ? undefined : selectedDay
		if( exportDay != undefined && this.props.exportFormat ){
			let dayStamp = moment( exportDay ).startOf('day').format( this.props.exportFormat )
			let date = parseInt(dayStamp) + hour * 3600000 + minute * 60000 + second * 1000
			
			// convert the string into integer when dealing with milliseconds
			if( this.props.exportFormat === 'x'){
				exportDay = moment( date ).format('x')
				exportDay = parseInt(exportDay)
			}
		}

		// call the external function
		if( typeof this.props.onSelect === 'function' ){
			this.props.onSelect( exportDay )
		}
	}


	render() {		
		
		const { placeholder, id, style, disabled, pending, invalid, required } = this.props
		const { isOpen, dateString, selectedDay } = this.state
		const initialMonth = selectedDay == undefined ? this.getDate( this.props.initialMonth ) : selectedDay
		const hasDate = dateString != 0 && dateString != undefined		
		const isPlaceholderActive = isOpen || hasDate		
		
		const componentClassName = utils.composeClassNames([
			'input-datepicker__component',
			'modus-input',
			'modus-input__borders',
			'modus-input__background',
			isOpen && 'modus-input--open modus-input__borders--open modus-input__background--open',
			disabled && 'modus-input--disabled modus-input__borders--disabled modus-input__background--disabled',
			pending && 'modus-input--pending modus-input__borders--pending modus-input__background--pending',
			invalid && 'modus-input--invalid modus-input__borders--invalid modus-input__background--invalid',
			required && 'modus-input--required modus-input__borders--required modus-input__background--required',
		])

		return (
			<div className='input-datepicker modus-input__box' style={ style }>
				<div className={ componentClassName }>
					<div 
						id={ id }
						className='modus-input__content input-datepicker__content'						
						onClick={ this.onFocus }							
					>
						<Placeholder label={ placeholder } active={ isPlaceholderActive } />
						
						<input
							onFocus={ this.onFocus }
							ref='input'
							className='modus-input__input input-datepicker__value'
							value={ hasDate ? moment( dateString ).format('MMM Do YYYY, HH:mm:ss') : '' }
							onKeyDown={ this.testKey }
							disabled={ disabled }
						/>
						
						
						<Loader visible={ pending } />

						<div className='modus-input__inner-icon input-datepicker__icon'> 
							<Icon size={16} name='calendar-small' fill='#999'/>	
						</div>

					</div>
				</div>
				
				<div ref='area'>
					{ this.state.isOpen &&
						<div className='daypicker-position'>
							<DayPicker		
								initialMonth={ initialMonth }				
								selectedDays={ day => DateUtils.isSameDay(selectedDay, day) }
								onDayClick={ this.handleDayClick }
								disabledDays={ this.props.disabledDays }
							/>
							{ this.props.withTime &&
								<TimePicker 
									hour={ this.state.hour }
									minute={ this.state.minute }
									second={ this.state.second }
									onHourChange={ this.handleHourClick }
									onMinuteChange={ this.handleMinuteClick }
									onSecondChange={ this.handleSecondClick }
									disabled={ selectedDay == undefined || selectedDay == null }
								/>
							}
						</div>
					}				
				</div>
			</div>
		);
	}
}

DatePicker.propTypes = {
	id: PropTypes.string,
	style: PropTypes.object,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	onSelect: PropTypes.func,
	exportFormat: PropTypes.string,
	withTime: PropTypes.bool,
	defaultHour: PropTypes.number,
	defaultMinute: PropTypes.number,
	defaultSecond: PropTypes.number,
	disabled: PropTypes.bool,
	pending: PropTypes.bool,
	required: PropTypes.bool,
	invalid: PropTypes.bool,
}
DatePicker.defaultProps = {
	id: undefined,
	style: undefined,
	value: undefined,
	placeholder: undefined,
	onSelect: undefined,
	exportFormat: undefined,
	withTime: false,
	defaultHour: 0,
	defaultMinute: 0,
	defaultSecond: 0,
	disabled: false,
	pending: false,
	required: false,
	invalid: false
}


const TimePicker = ({ hour, minute, second, onHourChange, onMinuteChange, onSecondChange, disabled }) => (
	<div className='timepicker-position'>		
		<TimeInput name='Hours'  limit={23} selected={hour} onChange={onHourChange} disabled={disabled}/>
		<TimeInput name='Minutes' limit={59} selected={minute} onChange={onMinuteChange} disabled={disabled}/>			
		<TimeInput name='Seconds' limit={59} selected={second} onChange={onSecondChange} disabled={disabled}/>			
	</div>
)

////////////////////////////////////////////////


class TimeInput extends React.PureComponent{
	constructor(props){
		super(props)
		this.getDoubleDigitTime = this.getDoubleDigitTime.bind(this)
		this.onChangeValue = this.onChangeValue.bind(this)
		this.state = {
			value: parseInt( this.props.selected ),
			shown: this.getDoubleDigitTime( this.props.selected )
		}
	}

	componentWillReceiveProps(nextProps){		
		if( parseInt( nextProps.selected ) == this.state.value ) return 
		this.setState({
			value: parseInt( nextProps.selected ),
			shown: this.getDoubleDigitTime( nextProps.selected )
		})
	}

	getDoubleDigitTime(value){
		value = parseInt(value)	
		return value < 10 ? `0${value}` : value
	}

	onChangeValue( e ){
		const value = parseInt( e.target.value )
		this.props.onChange(value)
	}

	render(){
		const { name, limit, selected, onChange, disabled } = this.props		
		return (
			<div className='timepicker-item-box'>
				<div className='placeholder'> { name } </div>
				<input 
					disabled={ disabled }
					type='number'
					className='timepicker-select'
					onFocus={ ( e ) => e.target.select() }				
					onChange={ this.onChangeValue }				
					value={ this.state.shown }
					min={ 0 }
					max={ limit }
				/>		
			</div>
		)
	}
}


export default DatePicker