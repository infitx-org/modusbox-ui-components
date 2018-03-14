import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import DayPicker, { DateUtils } from 'react-day-picker'
import * as utils from '../../utils/common'

import { default as Row } from '@mulesoft/anypoint-components/Row'
import Icon from '../Icon'

import './DatePicker.css'

export default class DatePicker extends React.Component {
	constructor(props) {
		super(props)
		
		// interaction methods 
		this.handlePageClick = this.handlePageClick.bind(this)
		this.handleOpenClick = this.handleOpenClick.bind(this)		
		
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

		const { value, defaultHour, defaultMinute, defaultSecond, disabled } = props
		let timeValue = value
		const defaultTime = {
			hour: defaultHour || 0 ,
			minute: defaultMinute || 0,
			second: defaultSecond || 0
		}
		
		if( typeof value === 'string' ){
			timeValue = parseInt(value)
		}
		const { selectedDay, dateString } = this.getDayAndString( timeValue )		
		const { hour, minute, second } = value ? this.getTime( timeValue ) : defaultTime

		this.setState({ 
			disabled,
			selectedDay,
			dateString,
			hour,
			minute,
			second
		});

	}

	getDate( value ){
		if( typeof value === 'string' || typeof value === 'number' ){
			return new Date( parseInt(value) )
		}
		return undefined
	}
	getTime( value ){
		let intValue = 0
		if( typeof value === 'string' ){
			intValue = parseInt( value )
		}
					
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

	handleOpenClick(){
		this.setState({ isOpen: ! this.state.isOpen })
	}
	// detect if the used clicks outside the datepicker box
	handlePageClick(evt) {		
		const area = ReactDOM.findDOMNode(this.refs.area)	    
		if (!area.contains(evt.target)) {
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
		this.props.onSelect( exportDay )
	}


	render() {		
		const { placeholder, id } = this.props
		const { isOpen, disabled, dateString, selectedDay } = this.state
		const initialMonth = selectedDay == undefined ? this.getDate( this.props.initialMonth ) : selectedDay
		const hasDate = dateString != 0 && dateString != undefined		
		const isPlaceholderTop = hasDate
		
		const componentClassName = utils.composeClassNames([
			'input-datepicker__component',
			'component',
			'component__borders',
			'component__background',
			isOpen && 'input-datepicker__component--open component__borders--open component__background--open',
			disabled && 'input-datepicker--disabled component--disabled'
		])
		return (
			<div className='input-datepicker'>
				<div className={ componentClassName }>
					<div 
						id={ id }
						className='input-datepicker__content'
						onClick={ this.handleOpenClick }							
					>
						{ typeof placeholder === 'string' && 
							<label className={`input-datepicker__placeholder ${isOpen || hasDate ? 'top' :''}`}> { placeholder } </label> 
						}
						
						<div className='input-datepicker__value'> 
							{ hasDate ? moment( dateString ).format('MMM Do YYYY, HH:mm:ss') : '' }
						</div>
						
						<div className='input-datepicker-icon'> 
							<Icon size={16} name='calendar-small' />
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
							{ this.props.hasTime &&
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

const TimePicker = ({ hour, minute, second, onHourChange, onMinuteChange, onSecondChange, disabled }) => (
	<div className='timepicker-position'>		
		<TimeInput name='Hours'  limit={23} selected={hour} onChange={onHourChange} disabled={disabled}/>
		<TimeInput name='Minutes' limit={59} selected={minute} onChange={onMinuteChange} disabled={disabled}/>			
		<TimeInput name='Seconds' limit={59} selected={second} onChange={onSecondChange} disabled={disabled}/>			
	</div>
)

////////////////////////////////////////////////


class TimeInput extends React.Component{
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

	onChangeValue(e){
		const value = parseInt( e.target.value )
		this.props.onChange(value)
	}

	render(){
		const { name, limit, selected, onChange, disabled } = this.props		
		return (
			<div className='timepicker-item-box'>
				<div className='placeholder'> { name } </div>
				<input 
					disabled = { disabled }
					type='number'
					className='timepicker-select'
					onFocus={ (e) => e.target.select() }				
					onChange={ this.onChangeValue }				
					value={ this.state.shown }
					min={ 0 }
					max={ limit }
				/>		
			</div>
		)
	}
}
