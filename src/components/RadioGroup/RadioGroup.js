import React, { PropTypes } from 'react'

import * as utils from '../../utils/common'
import keyCodes from '../../utils/keyCodes'

import './RadioGroup.scss'

class RadioGroup extends React.PureComponent {

	constructor(props){
		super(props)
		this.state = {
			value: this.props.value
		}
		this.onFocus = this.onFocus.bind(this)
		this.onBlur = this.onBlur.bind(this)
		this.onChange = this.onChange.bind(this)
		this.testKey = this.testKey.bind(this)

		this.selectSiblingRadio = this.selectSiblingRadio.bind(this)
		this.preventDefault = this.preventDefault.bind(this)
	}

	componentWillReceiveProps( nextProps ){
		const { value } = nextProps
		if( value != this.state.value ){
			this.setState({ value })
		}
	}

	preventDefault(e){
		e.stopPropagation();
		e.nativeEvent.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
	}
	onChange(e, value, disabled){		
		if( this.props.disabled || disabled ) return 
		
		//this.preventDefault(e)		
		this.setState({ value, focused: value })
		this.refs.btn.focus()
		
		if( typeof this.props.onChange === 'function' ){
			this.props.onChange( value )
		}
	}
	onFocus( e ){
		e.preventDefault()
		e.stopPropagation()
		if( this.state.focused === undefined ){
			this.setState( state => ({ focused: state.value }) )
		}
		return 
	}
	onBlur( e ){
		this.setState({ focused: undefined })
	}
	testKey( e ){		
		const { keyCode, shiftKey } = e.nativeEvent
		if( keyCode === keyCodes.KEY_TAB ){
			e.preventDefault()
			this.setState({ focused: undefined })						
			utils.focusNextFocusableElement( this.refs.btn, ! shiftKey );
			return
		}
		if( keyCode === keyCodes.KEY_LEFT ){
			e.preventDefault()
			this.selectSiblingRadio( false )
			return
		}
		if( keyCode === keyCodes.KEY_RIGHT ){
			e.preventDefault()
			this.selectSiblingRadio( true )
			return
		}
	}
	selectSiblingRadio( next ){
		const { value } = this.state		
		const { options } = this.props
		let nextIndex = options.map( o => o.value ).indexOf( value ) || 0	
		
		while( true ){
			nextIndex += next ? 1 : -1
			if( nextIndex == options.length || nextIndex < 0 ){
				break
			}			
			if( ! options[ nextIndex ].disabled ){
				console.log( options[ nextIndex ] )
				const { value } = options[ nextIndex ]
				this.setState({ value, focused: value })
				break
			}
		}

	}
	render(){	 	
	 	const { value, focused } = this.state
	 	const { id, label, disabled, round, options } = this.props
	 	const name = this.props.name || 'default-radio-name'

		return (
			<div className='input input-radio'>
				<input 
					ref='btn'
					type='button'
					className='input__holder'
					onFocus={ this.onFocus }
					onBlur={ this.onBlur }
					onKeyDown={ this.testKey }
					disabled={ disabled }
				/>
				{ label && <span>{ label }</span> }
				{ options.map( ( option, idx ) => (
					<Radio
						key={ idx } 				
						id={ `${id}-${idx}` }
						name={`${name}-${idx}` }
						onClick={ this.onChange }
						onChange={ this.preventDefault }
						checked={ value === option.value }
						focused={ focused === option.value }
						label={ option.label }
						value={ option.value }
						disabled={ option.disabled || disabled }						
					/>
				))}				
			</div>
		)
	}
}

const Radio = ({ id, onClick, onChange, checked, label, focused, value, disabled }) => {
	return (
		<div className='input-radio__option'>
			<div								
				name={ name }
				id={id}
				className={`input-radio__input ${checked ? 'checked' : ''} ${disabled ? 'disabled' :''} ${focused ? 'focused' : '' }`}
				value={ value }
				onChange={ onChange }
				onClick={ (e) => onClick(e, value, disabled) }				
			/>			
			<label htmlFor={ id } onClick={ (e) => onClick(e, value, disabled) }><span>{ label }</span></label>
		</div>
	)
}

RadioGroup.propTypes = {
	options: PropTypes.arrayOf( React.PropTypes.object ).isRequired,
	value: PropTypes.string,
	disabled: PropTypes.bool
}
RadioGroup.defaultProps = {
	options: [],
	value: false,
	disabled: false
}
export default RadioGroup