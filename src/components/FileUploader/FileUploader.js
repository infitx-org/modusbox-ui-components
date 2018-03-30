import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import * as utils from '../../utils/common'
import keyCodes from '../../utils/keyCodes'

import { Loader, Placeholder } from '../Common'
import Button from '../Button'

import '../../icons/mule/upload-small.svg'
import '../../icons/mule/close-small.svg'

import './FileUploader.scss'

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
		const { fileName, disabled } = nextProps
		
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
	leaveFileUploader( next = true ){		
		utils.focusNextFocusableElement( this.refs.fileuploader, next );			
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

	onKeyDown( e ){	
		if( ! this.state.isOpen ){
			return 
		}		
		const { keyCode, shiftKey } = e.nativeEvent
		if( e.nativeEvent.keyCode === keyCodes.KEY_TAB ){
			e.preventDefault()			
			e.stopPropagation()						
			this.leaveFileUploader( ! e.nativeEvent.shiftKey )			
			return
		}

		if( e.nativeEvent.keyCode === keyCodes.KEY_RETURN ){			
			e.preventDefault()
			this.onButtonClick()			
		}
		
	}
	onPageClick( e ) {		
	
		if( ! this.state.isOpen ){
			return 
		}
		const isClickWithinTextFieldBox = ReactDOM.findDOMNode(this.refs.area).contains(e.target)		
	    if ( ! isClickWithinTextFieldBox ){
	    	this.onCloseFileUploader()	    		
	   }
	}
	async onChangeFile( e ){
		const readAsText = ( file ) => {
			const reader = new FileReader()
			return new Promise((resolve, reject) => {
				reader.onload = event => resolve(event.target.result)
				reader.onerror = error => reject(error)
				reader.readAsText(file)
			})
		}
		const readAsBase64 = ( file ) => {
			const reader = new FileReader()
			return new Promise((resolve, reject) => {
				reader.readAsDataURL(file);
				reader.onload = event => resolve(event.target.result)
				reader.onerror = error => reject(error)
			})
		}

		const [ file ] = e.target.files		
		if( file == undefined ){
			return
		}

		const { parseFileAs } = this.props
		const fileContent = parseFileAs === 'text'
		? await readAsText( file ) 
		: parseFileAs === 'base64'
		? await readAsBase64( file )
		: file
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
		const isPlaceholderActive = isOpen || fileName || placeholder

		const componentClassName = utils.composeClassNames([
			'input-fileuploader__component',
			'modus-input',
			'modus-input__borders',
			'modus-input__background',
			isOpen && 'modus-input--open modus-input__borders--open modus-input__background--open',
			disabled && 'modus-input--disabled modus-input__borders--disabled modus-input__background--disabled',
			pending && 'modus-input--pending modus-input__borders--pending modus-input__background--pending',
			invalid && 'modus-input--invalid modus-input__borders--invalid modus-input__background--invalid',
			required && fileName == undefined && 'modus-input--required modus-input__borders--required modus-input__background--required',
		])

		return (
			<div className='input-fileuploader modus-input__box' style={ style }>
				<div id={id} className={ componentClassName } onClick={ this.onClickFileUploader} ref='area'>
					<div className='input-fileuploader-box'>
						
						<Placeholder label={ placeholder } active={ isPlaceholderActive } />
						
						<div className='modus-input__content input-fileuploader__content'>												
							<input 
								className='input-fileuploader__input'
								type='file'
								accept={ fileType }
								onFocus={ this.onEnterFileUploader }
								onChange={ this.onChangeFile }								
								disabled={ disabled }										
								ref='fileuploader'								
								onKeyDown={ this.onKeyDown }
								id={ id }
							/>
							<div className={`input-fileuploader__value ${ fileName ? '' : 'missing'}`}>
								{ fileName || 'No File Choosen' }
							</div>
							{ pending 
								? <Loader visible />
								: fileName 
						 		?
						 		<Button									
									className={`modus-input__inner-button input-fileuploader__button-remove ${isOpen ? 'modus-input__inner-button--active' : ''}`}
									onClick={ this.onRemoveButtonClick }								
									tabIndex='-1'
									icon='close-small'
									label='Remove'
									disabled={ disabled }
								/>
						 		:
								<Button
									className={`modus-input__inner-button input-fileuploader__button-add ${isOpen ? 'modus-input__inner-button--active' : ''}`}
									onClick={ this.onButtonClick }								
									tabIndex='-1'
									icon='upload-small'
									label='Choose File'
									disabled={ disabled }						
								/>
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
	parseFileAs: PropTypes.oneOf(['text','base64']),	
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
	parseFileAs: undefined,
	onChange: undefined,
	placeholder: undefined,	
	pending: false,
	disabled: false,
	invalid: false,
	required: false
}



export default FileUploader