import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { find } from 'lodash'
import { default as Icon } from '@mulesoft/anypoint-components/Icon'

import './TextField.css'

class TextField extends Component { 
	constructor( props ){
		super( props )

		this.onClickTextField = this.onClickTextField.bind(this)		
		this.onPageClick = this.onPageClick.bind(this)
		this.onTextFieldFilter = this.onTextFieldFilter.bind(this)

		this.setValue = this.setValue.bind(this)
		this.closeTextField = this.closeTextField.bind(this)
		this.leaveTextField = this.leaveTextField.bind(this)
		this.enterTextField = this.enterTextField.bind(this)
		this.testTabKey = this.testTabKey.bind(this)
		this.applyFilter = this.applyFilter.bind(this)

		const { value, pending, disabled } = this.props
		this.state = {
			isOpen: false,
			value,
			pending,
			disabled,
			filter: undefined
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

	setValue( value ){
		this.refs.filter.value = value
	} 
	closeTextField(){
		this.has_focus = false
		this.setState({ isOpen: false })
	}
	leaveTextField( goNext = true ){		
		
		this.closeTextField()
		this.refs.filter.blur();		

		if( document.activeElement == document.body ){
			const inputs = document.querySelectorAll('input:not([disabled])')			
			const inputList = Array.prototype.slice.call( inputs )			
			const nextIndex = inputList.indexOf( this.refs.filter ) + ( goNext ? 1 : -1 )						
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
		
		console.log('s')
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
	applyFilter(e){
		if( ! this.has_focus ){
			return 
		}
		this.setState({
			value: this.refs.filter.value
		})
	}


	// when clicking on the page 
	onPageClick(evt) {		
	
		if( ! this.state.isOpen ){
			return 
		}
		const isClickWithinTextFieldBox = ReactDOM.findDOMNode(this.refs.area).contains(evt.target)		
	    if ( ! isClickWithinTextFieldBox ){
	    	this.closeTextField()	    	
			this.refs.filter.blur();		
	   }
	}

	// when opening the list of options...
	onClickTextField(){
		const isOpen = ! this.state.isOpen
		this.setState({ isOpen })
		if( isOpen === true ){
			this.onTextFieldFilter()
		}
	}

	onTextFieldFilter(){		
		this.refs.filter.focus();
	}

	render(){
		const { id, type, placeholder } = this.props 
		const { isOpen, value, pending, disabled } = this.state
		const inputValue = value || ''
		const isPlaceholderTop = isOpen || value 
		
		return (
			<div className='input-textfield-wrapper'>
				<div id={id} className={`input-textfield-component ${isOpen ? 'open' : '' } ${disabled ? 'disabled' : '' } `} onClick={ this.onClickTextField } ref='area'>
					<div className='input-textfield-box'>
						
						{ typeof placeholder === 'string' && 
							<label className={`input-textfield-placeholder ${isPlaceholderTop ? 'top' :''}`}> { placeholder } </label> 
						}
						
						<div className='input-textfield-input-content-box'>						
							<input 
								className='input-textfield-input-filter'
								type='text'
								ref='filter'
								onKeyDown={ this.testTabKey }
								onChange={ this.applyFilter }
								onFocus={ this.enterTextField }
								onClick={ this.enterTextField }
								value={ inputValue }
								disabled={ disabled }
								type={ type }								
							/>
							
							<div className='input-textfield-input-icon'>
								{ type == 'password' ? <EyeIcon /> : null }
								{ pending ? <PendingIcon /> : null }
							
						 	</div>
						</div>						
						
					</div>
				</div>				

			</div>
		)
	}
}

const EyeIcon = () => (
	<Icon 
		name='settings-small'
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