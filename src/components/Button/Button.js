import React, { PropTypes } from 'react'
import * as utils from '../../utils/common'

import Icon from '../Icon'

import './Button.scss'

class Button extends React.PureComponent {

	constructor(props){
		super(props)
		this.onClick = this.onClick.bind(this)		
		this.testKey = this.testKey.bind(this)		
	}

	componentWillReceiveProps( nextProps ){		
	}

	onClick( e ){		
		if( this.props.disabled ) return 		
		if( typeof this.props.onClick === 'function' ){
			this.props.onClick( e )
		}
	}
	testKey(e){
		if( e.nativeEvent.keyCode === 9 ){
			e.preventDefault()			
			utils.focusNextFocusableElement( this.refs.input, ! e.nativeEvent.shiftKey );			
			return
		}

		if( e.nativeEvent.keyCode === 13 ){
			e.preventDefault()			
			this.onClick( e )
			return
		}
	}
	render(){	 	
	 	
	 	const { id, style, kind, label, icon, disabled, pending } = this.props	 	
	 	const classNames = utils.composeClassNames([
			'input-button__input',			
			kind === 'primary' && 'input-button__input--primary',
			kind === 'secondary' && 'input-button__input--secondary',
			kind === 'tertiary' && 'input-button__input--tertiary',			
			disabled && 'component--disabled input-button__input--disabled',
			pending && 'component--pending input-button__input--pending'			
		])

		return (			
			<button
				ref='input'
				id={id}
				className={ classNames }
				onKeyDown={ this.testKey }					
				onClick={ this.onClick }
				disabled={ disabled }					
			>	
				<div className='input-button__content'>
					{ icon && <Icon name={ icon } size={15} style={{marginRight:'5px'}}/> }
					{ label && <span>{ label }</span> }
				</div>
			</button>							
		)
	}
}
Button.propTypes = {
	id: PropTypes.string,
	style: PropTypes.string,
	kind: PropTypes.string,
	label: PropTypes.string,
	icon: PropTypes.string,
	disabled: PropTypes.bool,
	pending: PropTypes.bool,
	onClick: PropTypes.func
}
Button.defaultProps = {
	id: undefined,
	style: undefined,
	kind: 'primary',
	label: undefined,
	icon: undefined,
	disabled: false,
	pending: false,
	onClick: undefined
}
export default Button