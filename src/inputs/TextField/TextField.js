import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { find } from 'lodash'
import Icon from '../Icon'

import './TextField.css'

class TextField extends Component { 
	constructor( props ){
		super( props )

		this.onClickTextField = this.onClickTextField.bind(this)		
		this.onPageClick = this.onPageClick.bind(this)	

		this.setValue = this.setValue.bind(this)
		this.closeTextField = this.closeTextField.bind(this)
		this.leaveTextField = this.leaveTextField.bind(this)
		this.enterTextField = this.enterTextField.bind(this)
		this.testTabKey = this.testTabKey.bind(this)		
		this.onShowPasswordClick = this.onShowPasswordClick.bind(this)

		const { value, pending, disabled } = this.props
		this.state = {
			isOpen: false,
			isPasswordVisible: false,
			value,
			pending,
			disabled
		}
		this.has_focus = false
	}

	componentWillReceiveProps(nextProps, nextState){
		const changes = {}
		const { value, pending, disabled } = nextProps
		
		if( value !== this.props.value ){						
			changes.value = value			
		}

		if( pending !== this.props.pending ){
			changes.pending = pending
		}
		if( disabled !== this.props.disabled ){
			changes.disabled = disabled
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
	leaveTextField( goNext = true ){		
		
		this.closeTextField()
		this.refs.input.blur();		

		if( document.activeElement == document.body ){
			const inputs = document.querySelectorAll('input:not([disabled])')			
			const inputList = Array.prototype.slice.call( inputs )			
			const nextIndex = inputList.indexOf( this.refs.input ) + ( goNext ? 1 : -1 )						
			if( nextIndex < 0 ){
				inputList[ inputList.length + nextIndex ].focus()
			}
			else if( nextIndex >= inputList.length ){					
				inputList[ nextIndex % inputList.length ].focus()
			}
			else{
				inputList[ nextIndex ].focus()
			}
		}
		

	}
	enterTextField(){		
		
		if( this.state.disabled ){
			this.leaveTextField()
			return
		}
		this.has_focus = true
		this.setState({ isOpen: true })
	}
	testTabKey(e){
		if( e.nativeEvent.keyCode === 9 || e.nativeEvent.keyCode === 13 ){
			e.preventDefault()
			this.leaveTextField( ! e.nativeEvent.shiftKey )
			return
		}
	}
	setValue( value ){
		this.refs.input.value = value
		if( this.state.value != value ){
			this.setState({ value })
			this.props.onChange( value )
		}
	}

	onShowPasswordClick(e){
		e.stopPropagation()
		this.setState({ isPasswordVisible: ! this.state.isPasswordVisible })
	}

	// when clicking on the page 
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

	// when opening the list of options...
	onClickTextField(){
		const isOpen = ! this.state.isOpen
		this.setState({ isOpen })
		if( isOpen === true ){
			this.refs.input.focus();			
		}
	}

	render(){
		const { id, type, placeholder } = this.props 
		const { isOpen, value, pending, disabled } = this.state
		const inputValue = value || ''
		const isPlaceholderTop = isOpen || value 
		
		return (
			<div className='input-textfield-wrapper'>
				<div id={id} className={`input-textfield-component ${isOpen ? 'open' : '' } ${disabled ? 'disabled' : '' } `} onClick={ this.onClickTextField } ref='area'>
					<div className='input-textfield-content-box'>
						
						{ typeof placeholder === 'string' && 
							<label className={`input-textfield-placeholder ${isPlaceholderTop ? 'top' :''}`}> { placeholder } </label> 
						}
						
						<div className='input-textfield-input-content-box'>						
							<input 
								className='input-textfield-input-value'
								type='text'
								ref='input'
								onKeyDown={ this.testTabKey }
								onChange={ this.setValue }
								onFocus={ this.enterTextField }
								onClick={ this.enterTextField }
								value={ inputValue }
								disabled={ disabled }
								type={ type === 'password' ? this.state.isPasswordVisible ? 'text' : 'password' : type }
							/>
							
							<div className='input-textfield-input-icon'>
								{ type == 'password' ? <EyeIcon onClick={ this.onShowPasswordClick } /> : null }
								{ pending ? <PendingIcon /> : null }
							
						 	</div>
						</div>						
						
					</div>
				</div>				

			</div>
		)
	}
}

const EyeIcon = ({ onClick }) => (
	<Icon 
		onClick={ onClick }
		name='toggle-visible'
		size={16}
		fill='#39f'		
	/>
)
const PendingIcon = () => (
	<Icon 
		name='spinner'		
		size={16}
		fill='#39f'
		spin
	/>
)
const ArrowIcon = ({ isOpen }) => (
	<Icon 
		name='arrow-down-small'
		style={{transform: `rotateZ(${ isOpen ? '180' : '0'}deg)` }}
		size={20}
		fill='#666'
	/>
)

TextField.propTypes = {
	type: PropTypes.oneOf(['text','password']),
	id: PropTypes.string,
	style: PropTypes.object,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	pending: PropTypes.bool,
	disabled: PropTypes.bool,
}

TextField.defaultProps = {
	type: 'text',
	id: undefined,
	style: {},	
	placeholder: undefined,	
	value: undefined,
	pending: false,
	disabled: false
}



export default TextField