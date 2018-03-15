import React, { PureComponent, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import find from 'lodash/find'

import * as utils from '../../utils/common'
import keyCodes from '../../utils/keyCodes'

import Icon from '../Icon'
import Spinner from '../Spinner'

import '../default.css'
import './TextField.css'

class TextField extends PureComponent { 
	constructor( props ){
		super( props )

		this.onClickTextField = this.onClickTextField.bind(this)		
		this.onPageClick = this.onPageClick.bind(this)	

		this.setValue = this.setValue.bind(this)
		this.closeTextField = this.closeTextField.bind(this)
		this.leaveTextField = this.leaveTextField.bind(this)
		this.enterTextField = this.enterTextField.bind(this)
		this.testKey = this.testKey.bind(this)		
		this.onShowPasswordClick = this.onShowPasswordClick.bind(this)

		const { value } = this.props
		this.state = {
			isOpen: false,
			isPasswordVisible: false,
			value,
		}
		this.has_focus = false
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
		this.has_focus = false
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
		this.has_focus = true
		this.setState({ isOpen: true })
	}
	testKey(e){		
		const { keyCode, shiftKey } = e.nativeEvent
		if( keyCode === keyCodes.KEY_TAB || keyCode === keyCodes.KEY_RETURN ){
			e.preventDefault()
			this.leaveTextField( ! shiftKey )
			return
		}
	}
	setValue( evt ){		
		const value = evt.target.value
		if( this.state.value != value ){
			this.setState({ value })
			if( typeof this.props.onChange === 'function'){
				this.props.onChange( value )
			}
		}
	}

	onShowPasswordClick(e){
		e.stopPropagation()
		this.setState({ isPasswordVisible: ! this.state.isPasswordVisible })
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

	onClickTextField(){
		const isOpen = ! this.state.isOpen
		this.setState({ isOpen })
		if( isOpen === true ){
			this.refs.input.focus();			
		}
	}

	render(){
		
		const { id, type, placeholder, disabled, pending, required, invalid } = this.props 
		const { isOpen, value, isPasswordVisible } = this.state
		const inputValue = value || ''
		const isPlaceholderTop = isOpen || value 
		
		const componentClassName = utils.composeClassNames([
			'input-textfield__component',
			'component',
			'component__borders',
			'component__background',
			isOpen && 'component--open component__borders--open component__background--open',
			disabled && 'component--disabled component__borders--disabled component__background--disabled',
			pending && 'component--pending component__borders--pending component__background--pending',
			invalid && 'component--invalid component__borders--invalid component__background--invalid',
			required && 'component--required component__borders--required component__background--required',
		])

		const placeholderClassName = utils.composeClassNames([
			'component__placeholder',
			isPlaceholderTop && 'component__placeholder--active'
		])
		
		return (
			<div className='input-textfield'>
				<div id={id} className={ componentClassName } onClick={ this.onClickTextField } ref='area'>
					<div className='input-textfield__content'>
						
						{ typeof placeholder === 'string' && 
							<label className={ placeholderClassName }> { placeholder } </label> 
						}
						<div className='input-textfield__input-content'>						
							<input 
								ref='input'
								type={ type === 'password' ? isPasswordVisible ? 'text' : 'password' : type }
								onKeyDown={ this.testKey }
								onChange={ this.setValue }
								onFocus={ this.enterTextField }
								onClick={ this.enterTextField }
								value={ inputValue }
								disabled={ disabled }
								className='input-textfield__input'
							/>							
							<div className='input-textfield__icon'>
								{ pending 
									? <Spinner size={16} /> 
									: type == 'password' 
									? <EyeIcon open={ isPasswordVisible } onClick={ this.onShowPasswordClick } /> 
									: null
								}
							
						 	</div>
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
		fill='#333'		
	/>
)

TextField.propTypes = {
	type: PropTypes.oneOf(['text','password']),
	id: PropTypes.string,
	style: PropTypes.object,
	placeholder: PropTypes.string,
	value: PropTypes.string,
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
	pending: false,
	required: false,
	invalid: false, 
	disabled: false
}



export default TextField