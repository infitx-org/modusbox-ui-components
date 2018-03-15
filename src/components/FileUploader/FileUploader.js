import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import * as utils from '../../utils/common'

import Spinner from '../Spinner'

import './FileUploader.css'

class FileUploader extends Component { 
	constructor( props ){
		super( props )

		this.onClickFileUploader = this.onClickFileUploader.bind(this)				
		this.onCloseFileUploader = this.onCloseFileUploader.bind(this)
		this.leaveFileUploader = this.leaveFileUploader.bind(this)
		this.onEnterFileUploader = this.onEnterFileUploader.bind(this)
		this.onPageClick = this.onPageClick.bind(this)
		this.onButtonClick = this.onButtonClick.bind(this)
		this.onRemoveButtonClick = this.onRemoveButtonClick.bind(this)		
		this.onChangeFile = this.onChangeFile.bind(this)
		this.onKeyDown = this.onKeyDown.bind(this)		

		const { fileName } = this.props
		this.state = {
			isOpen: false,
			fileContent: undefined,
			fileName,
			filter: undefined
		}		
	}

	componentWillReceiveProps(nextProps, nextState){
		const changes = {}
		const { fileName } = nextProps
		
		if( fileName !== this.props.fileName ){						
			changes.fileName = fileName
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

	onCloseFileUploader(){		
		this.setState({ isOpen: false })
	}
	leaveFileUploader( goNext = true ){			
		this.refs.fileuploader.blur();		

		if( document.activeElement == document.body ){
			const inputs = document.querySelectorAll('input:not([disabled])')			
			const inputList = Array.prototype.slice.call( inputs )			
			const nextIndex = inputList.indexOf( this.refs.fileuploader ) + ( goNext ? 1 : -1 )						
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
		this.onCloseFileUploader()
		

	}
	onEnterFileUploader(){				
		this.setState({ isOpen: true })				
		if( this.state.disabled ){
			this.leaveFileUploader()
			return
		}
	}
	onClickFileUploader(){
		const isOpen = ! this.state.isOpen		
		this.setState({ isOpen })				
		if( isOpen === true ){
			this.refs.fileuploader.focus();
		}
	}
	onButtonClick(){
		this.refs.fileuploader.click()
	}
	onRemoveButtonClick(){
		this.refs.fileuploader.value = ''
		this.setState({
			fileContent: undefined,
			fileName: undefined
		})
		if( typeof this.props.onChange === 'function' ){
			this.props.onChange( undefined )
		}
	}

	onKeyDown(evt){		
		if( ! this.state.isOpen ){
			return 
		}		
		if( evt.nativeEvent.keyCode === 9 ){
			evt.preventDefault()			
			evt.stopPropagation()			
			this.leaveFileUploader( ! evt.nativeEvent.shiftKey )			
			return
		}

		if( evt.nativeEvent.keyCode === 13 ){
			this.onButtonClick()
		}
		
	}
	onPageClick(evt) {		
	
		if( ! this.state.isOpen ){
			return 
		}
		const isClickWithinTextFieldBox = ReactDOM.findDOMNode(this.refs.area).contains(evt.target)		
	    if ( ! isClickWithinTextFieldBox ){
	    	this.onCloseFileUploader()	    		
	   }
	}
	async onChangeFile(evt){
		
		const readAsText = ( file ) => {
			const reader = new FileReader()
			return new Promise((resolve, reject) => {
				reader.onload = event => resolve(event.target.result)
				reader.onerror = error => reject(error)
				reader.readAsText(file)
			})
		}

		const [ file ] = evt.target.files		
		if( file == undefined ){
			return
		}

		const fileContent = this.props.parseFileAsText ? await readAsText( file ) : file		
		this.setState({
			fileContent,
			fileName: file.name
		})
	
		if( typeof this.props.onChange === 'function' ){
			this.props.onChange( fileContent )
		}
	}
	

	render(){
		const { id, placeholder, fileType, style, required, invalid, pending, disabled } = this.props 
		const { isOpen, fileName } = this.state
		const inputValue = fileName || ''
		const isPlaceholderTop = isOpen || fileName || placeholder

		const componentClassName = utils.composeClassNames([
			'input-fileuploader__component',
			'component',
			'component__borders',
			'component__background',
			isOpen && 'component--open component__borders--open component__background--open',
			disabled && 'component--disabled component__borders--disabled component__background--disabled',
			pending && 'component--pending component__borders--pending component__background--pending',
			invalid && 'component--invalid component__borders--invalid component__background--invalid',
			required && fileName == undefined && 'component--required component__borders--required component__background--required',
		])

		const placeholderClassName = utils.composeClassNames([
			'component__placeholder',
			isPlaceholderTop && 'component__placeholder--active'
		])
		
		return (
			<div className='input-fileuploader' style={ style }>
				<div id={id} className={ componentClassName } onClick={ this.onClickFileUploader} ref='area'>
					<div className='input-fileuploader-box'>
						
						{ typeof placeholder === 'string' && 
							<label className={ placeholderClassName }> { placeholder } </label> 
						}
						
						<div className='input-fileuploader__content'>												
							<input 
								className='input-fileuploader__input'
								type='file'
								accept={ fileType }
								onFocus={ this.onEnterFileUploader }
								onChange={ this.onChangeFile }								
								disabled={ disabled }							
								ref='fileuploader'								
								onKeyDown={ this.onKeyDown }
								id={ `${id}-file` }
							/>
							{ fileName 
								? <div className='input-fileuploader__filename'> { fileName } </div>
								: <div className='input-fileuploader__filename missing'> No File Choosen </div>
							}

							{ pending 
								? <div className='input-fileuploader__icon'> <Spinner size={16}/> </div>
								: fileName 
						 		?
						 		<button
									className={`input-fileuploader__button-remove ${isOpen ? 'has-focus' : ''}`}
									onClick={ this.onRemoveButtonClick }								
									tabIndex='-1'
								>
									Remove
								</button> 
						 		:
								<button
									className={`input-fileuploader__button ${isOpen ? 'has-focus' : ''}`}
									onClick={ this.onButtonClick }								
									tabIndex='-1'
								>
									Choose File 
								</button>
							} 
						</div>						
						
					</div>
				</div>				

			</div>
		)
	}
}

FileUploader.propTypes = {
	style: PropTypes.object,
	id: PropTypes.string,
	fileType: PropTypes.string,
	parseFileAsText: PropTypes.bool,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	pending: PropTypes.bool,
	disabled: PropTypes.bool,
	invalid: PropTypes.bool,
	required: PropTypes.bool
}

FileUploader.defaultProps = {
	style: {},	
	id: undefined,
	fileType: undefined,
	parseFileAsText: false,
	onChange: undefined,
	placeholder: undefined,	
	pending: false,
	disabled: false,
	invalid: false,
	required: false
}



export default FileUploader