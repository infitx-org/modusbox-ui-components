import React, { PureComponent, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import find from 'lodash/find'

import * as utils from '../../utils/common'
import keyCodes from '../../utils/keyCodes'

import Button from '../Button'
import Icon from '../Icon'
import { Loader, Placeholder } from '../Common'

import './TextField.scss'

class TextField extends PureComponent { 
	constructor( props ){
		super( props )

		// Events 
		this.onShowPasswordClick = this.onShowPasswordClick.bind(this)
		this.onPageClick = this.onPageClick.bind(this)	
		this.onTextFieldClick = this.onTextFieldClick.bind(this)
		this.onButtonClick = this.onButtonClick.bind(this)

		// Wrapper events
		this.onClick = this.onClick.bind(this)
		this.onChange = this.onChange.bind(this)
		this.onKeyPress = this.onKeyPress.bind(this)		
		this.onBlur = this.onBlur.bind(this)
		this.onFocus = this.onFocus.bind(this)

		// Internal lifecycle methods
		this.setValue = this.setValue.bind(this)
		this.closeTextField = this.closeTextField.bind(this)
		this.leaveTextField = this.leaveTextField.bind(this)
		this.enterTextField = this.enterTextField.bind(this)
		this.testKey = this.testKey.bind(this)		

		const { value } = this.props
		this.state = {
			isOpen: false,
			isPasswordVisible: false,
			value,
		}		
	}

	componentWillReceiveProps(nextProps, nextState){
		const changes = {}
		const { value, disabled } = nextProps
		
		if( value !== this.props.value ){						
			changes.value = value			
		}
		if( disabled !== this.props.disabled ){			
			changes.isOpen = false
		}
		
		if( Object.keys(changes).length > 0 ){
			this.setState( changes )
		}
	}
	componentDidMount() {
		window.addEventListener( 'mouseup', this.onPageClick, false );
	}
	componentWillUnmount() {
		window.removeEventListener( 'mouseup', this.onPageClick, false );
	}

	closeTextField(){		
		this.setState({ isOpen: false })
	}
	leaveTextField( next ){				
		this.closeTextField()		
		utils.focusNextFocusableElement( this.refs.input, next );
	}
	enterTextField(){		
		
		if( this.props.disabled ){
			this.leaveTextField()
			return
		}		
		this.setState({ isOpen: true })
	}
	testKey( e ){		
		const { keyCode, shiftKey } = e.nativeEvent
		if( keyCode === keyCodes.KEY_TAB ){
			e.preventDefault()
			this.leaveTextField( ! shiftKey )
			return
		}
		if( keyCode === keyCodes.KEY_RETURN ){
			if( this.props.buttonText ){
				this.onButtonClick( e )
			}
			else{
				e.preventDefault()
				this.leaveTextField( ! shiftKey )
				return
			}
		}
	}
	setValue( e ){		
		const value = e.target.value
		if( this.state.value != value ){
			this.setState({ value })			
		}
	}	
	onTextFieldClick( e ){		
		this.refs.input.click()		
	}
	onButtonClick( e ){
		e.stopPropagation()
		if( typeof this.props.onButtonClick === 'function'){
			this.props.onButtonClick( e )
		}
	}
	onClick( e ){
		if( typeof this.props.onClick === 'function'){
			this.props.onClick( e )
		}		
		if( this.state.isOpen === true ){
			return
		}
		this.refs.input.focus()
		this.setState({ isOpen: true })		
	}
	onChange( e ){
		if( typeof this.props.onChange === 'function'){
			this.props.onChange( e )
		}
		this.setValue( e )
	}
	onKeyPress( e ){
		if( typeof this.props.onKeyPress === 'function'){
			this.props.onKeyPress( e )
		}
	}
	onBlur( e ){		
		if( typeof this.props.onBlur === 'function'){
			this.props.onBlur( e )
		}		
		this.closeTextField()
	}
	onFocus( e ){
		if( typeof this.props.onFocus === 'function'){
			this.props.onFocus( e )
		}
		this.enterTextField( e )
	}

	onPageClick(evt) {		
	
		if( ! this.state.isOpen ){
			return 
		}
		const isClickWithinTextFieldBox = ReactDOM.findDOMNode(this.refs.area).contains(evt.target)		
	    if ( ! isClickWithinTextFieldBox ){
	    	this.closeTextField()	    	
			this.refs.input.blur();		
	   }
	}
	onShowPasswordClick( e ){
		e.stopPropagation()
		this.setState({ isPasswordVisible: ! this.state.isPasswordVisible })
	}

	render(){
		
		const { id, type, style, placeholder, buttonText, icon, disabled, pending, required, invalid } = this.props 
		const { isOpen, value, isPasswordVisible } = this.state		
		const isPlaceholderActive = isOpen || value 
		
		const componentClassName = utils.composeClassNames([
			'input-textfield__component',
			'component',
			'component__borders',
			'component__background',
			isOpen && 'component--open component__borders--open component__background--open',
			disabled && 'component--disabled component__borders--disabled component__background--disabled',
			pending && 'component--pending component__borders--pending component__background--pending',
			invalid && 'component--invalid component__borders--invalid component__background--invalid',
			required && ( value === undefined || value === '' ) && 'component--required component__borders--required component__background--required',
		])

		const placeholderClassName = utils.composeClassNames([
			'component__placeholder',
			isPlaceholderActive && 'component__placeholder--active'
		])
		
		return (
			<div className='input-textfield component__box' style={ style }>
				<div id={id} className={ componentClassName } onClick={ this.onTextFieldClick } ref='area'>
					<div className='component__content input-textfield__content'>
						
						<Placeholder label={ placeholder } active={ isPlaceholderActive }/>
						<div className='input-textfield__input-content'>						
							<input 
								ref='input'
								type={ type === 'password' ? isPasswordVisible ? 'text' : 'password' : type }								
								onClick={ this.onClick }
								onChange={ this.onChange }
								onKeyDown={ this.testKey }
								onKeyPress={ this.onKeyPress }
								onBlur={ this.onBlur }
								onFocus={ this.onFocus }
								value={ value || '' }
								disabled={ disabled }
								className='input-textfield__input'
							/>
							{ buttonText &&
								<Button									
									className={`component__inner-button input-textfield__button ${isOpen ? 'component__inner-button--active' : ''}`}
									onClick={ this.onButtonClick }								
									tabIndex='-1'
									label={ buttonText }
									disabled={ disabled }
								/>
							}
							<Loader visible={ pending } />
							
							{ type == 'password' &&
								<div className='component__inner-icon input-textfield__icon'>
									<EyeIcon open={ isPasswordVisible } onClick={ this.onShowPasswordClick } /> 
								</div>
							}	
						 	{ icon && 
						 		<div className='component__inner-icon input-textfield__icon'>
									<Icon size={16} name={ icon } /> 
								</div>
							}													 	
						</div>												
					</div>
				</div>				
			</div>
		)
	}
}

const EyeIcon = ({ open, onClick }) => (
	<Icon 
		onClick={ onClick }
		name={ open ? 'toggle-invisible' : 'toggle-visible' }
		size={16}
		fill={ open ? '#999' : '#39f' }		
	/>
)

TextField.propTypes = {
	style: PropTypes.object,
	type: PropTypes.oneOf(['text','password']),
	id: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	buttonText: PropTypes.string,
	onButtonClick: PropTypes.func,
	onChange: PropTypes.func,
	onKeyPress: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
	icon: PropTypes.string,
	pending: PropTypes.bool,
	required: PropTypes.bool,
	invalid: PropTypes.bool,
	disabled: PropTypes.bool
}

TextField.defaultProps = {
	type: 'text',
	id: undefined,
	style: {},	
	placeholder: undefined,	
	value: undefined,
	buttonText: undefined,
	onButtonClick: undefined,
	onChange: undefined,
	onKeyPress: undefined,
	onBlur: undefined,
	onFocus: undefined,
	icon: undefined,
	pending: false,
	required: false,
	invalid: false, 
	disabled: false
}



export default TextField