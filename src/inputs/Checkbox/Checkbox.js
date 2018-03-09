import React, { PropTypes } from 'react'
import './Checkbox.css'

class Checkbox extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			checked: this.props.checked
		}
		this.onChange = this.onChange.bind(this)
		this.preventDefault = this.preventDefault.bind(this)
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
		
		if( typeof this.props.onChange === 'function' ){
			this.props.onChange( checked )
		}
	}
	render(){	 	
	 	const { checked } = this.state
	 	const { semi, id, label, disabled, round } = this.props

		return (
			<div className={`input-checkbox-wrapper`}>
				<input				
					type='checkbox'
					id={id}
					className={`input-checkbox ${ semi ? 'semi-checked' : ''}`}
					checked={ checked && semi != true }	
					onChange={ this.preventDefault }
					disabled={ disabled }												
				/>
				
				<label htmlFor={ id } onClick={ this.onChange } className={`${round ? 'round' : ''}`} > { label }</label>

				{/* label && 
					<span
						className={`input-checkbox-label ${disabled ? 'disabled' : ''}`} 
						onClick={ this.onChange }
					>
						{ label } 
					</span>
				*/}
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