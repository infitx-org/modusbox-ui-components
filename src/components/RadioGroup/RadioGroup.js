import React, { PropTypes } from 'react'
import './RadioGroup.css'

class RadioGroup extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			value: this.props.value
		}
		this.onChange = this.onChange.bind(this)
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
		
		this.preventDefault(e)		
		this.setState({ value })
		
		if( typeof this.props.onChange === 'function' ){
			this.props.onChange( value )
		}
	}
	render(){	 	
	 	const { value } = this.state
	 	const { id, label, disabled, round, options } = this.props
	 	const name = this.props.name || 'defaul-radio-name'

		return (
			<div className={`input-radio-wrapper`}>
				{ label && <span>{ label }</span> }
				{ options.map( ( option, idx ) => (
					<Radio
						key={ idx } 				
						id={ `${id}-${idx}` }
						name={`${name}-${idx}` }
						onClick={ this.onChange }
						onChange={ this.preventDefault }
						checked={ value === option.value }
						label={ option.label }
						value={ option.value }
						disabled={ option.disabled || disabled }
					/>
				))}				
			</div>
		)
	}
}

const Radio = ({ id, onClick, onChange, checked, label, value, disabled }) => {
	return (
		<div className='input-radio-option'>
			<input				
				type='radio'
				name={ name }
				id={id}
				className={`input-radio`}
				value={ value }
				checked={ checked }	
				onChange={ onChange }
				disabled={ disabled }												
			/>			
			<label htmlFor={ id } onClick={ (e) => onClick(e, value, disabled) }> <span>{ label }</span></label>
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