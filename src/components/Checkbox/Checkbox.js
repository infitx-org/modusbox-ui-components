import React, { PropTypes } from 'react'
import { focusNextFocusableElement } from '../../utils/common'
import './Checkbox.scss'

class Checkbox extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			checked: this.props.checked
		}
		this.onChange = this.onChange.bind(this)
		this.preventDefault = this.preventDefault.bind(this)
		this.testKey = this.testKey.bind(this)		
	}

	componentWillReceiveProps( nextProps ){
		const { checked } = nextProps
		if( checked != this.state.checked ){
			this.setState({ checked })
		}
	}

	preventDefault(e){
		e.stopPropagation();
		e.nativeEvent.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
	}
	onChange(e){		
		if( this.props.disabled ) return 
		
		this.preventDefault(e)		

		const checked = ! this.state.checked
		this.setState({ checked })
		this.refs.input.focus()
		
		if( typeof this.props.onChange === 'function' ){
			this.props.onChange( checked )
		}
	}
	testKey(e){
		if( e.nativeEvent.keyCode === 9 || e.nativeEvent.keyCode === 13 ){
			e.preventDefault()			
			focusNextFocusableElement( this.refs.input, ! e.nativeEvent.shiftKey );			
			return
		}
	}
	render(){	 	
	 	
	 	const { checked } = this.state
	 	const { semi, id, label, disabled, round } = this.props

		return (
			<div className={`input-checkbox`}>
				<input
					ref='input'
					type='checkbox'
					id={id}
					className={`input-checkbox__input ${ semi ? 'semi-checked' : ''}`}
					onKeyDown={ this.testKey }
					checked={ checked && semi != true }	
					onChange={ this.preventDefault }
					disabled={ disabled }					
				/>				
				<label
					htmlFor={ id }
					onClick={ this.onChange }
					className={`${round ? 'round' : ''}`}
				>
					{ label }
				</label>

			</div>
		)
	}
}
Checkbox.propTypes = {
	checked: PropTypes.bool,
	disabled: PropTypes.bool
}
Checkbox.defaultProps = {
	checked: false,
	disabled: false
}
export default Checkbox