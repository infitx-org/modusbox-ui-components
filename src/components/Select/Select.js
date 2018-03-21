import React, { PureComponent, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import find from 'lodash/find'

import * as utils from '../../utils/common'
import keyCodes from '../../utils/keyCodes'

import Icon from '../Icon'
import { Loader, Placeholder } from '../Common'

import Options from './Options'

import './Select.scss'

class Select extends PureComponent { 
	constructor( props ){
		super( props )

		this.onClickSelect = this.onClickSelect.bind(this)
		this.onSelectOption = this.onSelectOption.bind(this)
		this.onPageClick = this.onPageClick.bind(this)
		this.onSelectFilter = this.onSelectFilter.bind(this)

		// Internal lifecycle methods
		this.setValue = this.setValue.bind(this)
		
		this.closeSelect = this.closeSelect.bind(this)
		this.leaveSelect = this.leaveSelect.bind(this)
		this.openSelect = this.openSelect.bind(this)
		this.testKey = this.testKey.bind(this)
		this.applyFilter = this.applyFilter.bind(this)
		this.filterOptions = this.filterOptions.bind(this)
		this.highlightNextOption = this.highlightNextOption.bind(this)

		const { options, value } = this.props		
		const selectedItem = find( options, { value })
		const selectedLabel = selectedItem ? selectedItem.label : undefined
		this.state = {
			isOpen: false,
			highlightedOption: 0,
			options,
			selectedLabel,
			value,
			filter: undefined
		}		
	}
	componentWillReceiveProps(nextProps, nextState){
		const changes = {}
		const { options, value, pending, disabled } = nextProps
		
		if( value !== this.props.value ){
			const selectedItem = find( options, { value })
			const selectedLabel = selectedItem ? selectedItem.label : undefined
			changes.value = value
			changes.selectedLabel = selectedLabel
			this.setValue( selectedLabel )
		}
		if( options !== this.props.options ){
			changes.options = options
		}
		if( disabled !== this.props.disabled ){			
			changes.isOpen = false
			changes.highlightedOption = 0
			changes.filter = undefined
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
	closeSelect(){		
		this.setState({ isOpen: false, filter: undefined, highlightedOption: 0 })
	}
	leaveSelect( next){		
		
		this.closeSelect()
		utils.focusNextFocusableElement( this.refs.filter, next )
		
	}
	openSelect(){		
		this.setState({ isOpen: true })

		const getParentOverflow = ( elem ) => {
			const { overflowY } = window.getComputedStyle( elem.parentNode )
			if( overflowY === "hidden" ){				
				return elem.parentNode
			}
			if( overflowY === "scroll" ){				
				return elem
			}
			if( elem.parentNode === document.body ){
				return document.body
			}
			return getParentOverflow( elem.parentNode )
		}

		
		const wrapper = getParentOverflow( ReactDOM.findDOMNode( this.refs['options-position'] ) )
		const wrapperRect = wrapper.getBoundingClientRect()		
		const { top } = ReactDOM.findDOMNode( this.refs['options-position'] ).getBoundingClientRect()		
		const realTop = top - wrapperRect.top
		const realHeight = wrapperRect.height		
		const maxLowerHeight = realHeight - realTop - 10
		const maxUpperHeight = realTop - 10
		const optionsHeight = Math.min( 240, this.state.options.length * 30 )

		this.reverse = maxLowerHeight > optionsHeight ? false : maxLowerHeight < maxUpperHeight
		this.maxHeight = Math.min( 240, Math.max( maxLowerHeight, maxUpperHeight ) )				

	}
	testKey( e ){
		
		const { keyCode, shiftKey } = e.nativeEvent

		if( keyCode === keyCodes.KEY_TAB ){
			e.preventDefault()
			this.leaveSelect( ! shiftKey )
			return
		}		
		if( keyCode === keyCodes.KEY_UP || keyCode === keyCodes.KEY_DOWN ){
			e.preventDefault()
			this.highlightNextOption( keyCode === keyCodes.KEY_DOWN )
		}
		if( keyCode === keyCodes.KEY_RETURN ){
			e.preventDefault()
			if( this.state.isOpen ){
				const options = this.filterOptions()			
				this.onSelectOption( options[ this.state.highlightedOption ] )
			}
			else{
				this.openSelect()
			}
		}
	}
	applyFilter( e ){
		/*if( ! this.state.isOpen ){
			return 
		}*/
		const { value } = this.refs.filter
		this.setState({ filter: value })
		if( value === '' ){
			this.setState({				
				selectedLabel: undefined,
				value: undefined
			})			
			this.openSelect()
		}
	}
	highlightNextOption( next = true ){		
		const { highlightedOption, options } = this.state
		// const items = this.reverse ? [...options].reverse() : options
		const items = options
		let currentHightlightedOption = highlightedOption
		let nextHighlightedOption = -1

		const getNextEnabledOption = () => {
			let option = ( currentHightlightedOption + ( next ? 1 : - 1 ) ) % items.length
			if( option < 0 ){
				option = items.length - 1
			}
			currentHightlightedOption = option
			if( items[ option ].disabled ){
				return -1
			}
			return option
		}
		
		while( nextHighlightedOption === -1 ){
			nextHighlightedOption = getNextEnabledOption()			
		}
		ReactDOM.findDOMNode(this.refs.options.refs.items).childNodes[nextHighlightedOption].focus()
		this.refs.filter.focus();		
		this.setState({ highlightedOption: nextHighlightedOption })
	}

	// when clicking on the page 
	onPageClick( e ) {		
	
		if( ! this.state.isOpen ){
			return 
		}
		const isClickWithinSelectBox = ReactDOM.findDOMNode(this.refs.area).contains(e.target)
		const isClickWithinOptionsBox = this.refs.options ? ReactDOM.findDOMNode(this.refs.options).contains(e.target) : false
	    if ( ! isClickWithinSelectBox && ! isClickWithinOptionsBox ){
	    	this.closeSelect()	    	
			this.refs.filter.blur();
	   }
	}

	// when opening the list of options...
	onClickSelect(){
		const isOpen = ! this.state.isOpen
		if( isOpen === true ){
			this.onSelectFilter()
			this.setState({ isOpen })
		}
		else{
			this.closeSelect()
		}
	}

	onSelectFilter(){		
		this.refs.filter.focus();
	}

	// when selecting the options item itself
	onSelectOption({ value } = {}){		
		if( value == undefined ){
			return
		}
		const selectedItem = find( this.state.options, { value })
		const selectedLabel = selectedItem ? selectedItem.label : undefined
		this.setState({
			filter: undefined,
			value: value,
			selectedLabel,			
		})
		this.setState({ isOpen: false })
		if( typeof this.props.onChange === 'function' ){
			this.props.onChange( value )
		}
	}
	filterOptions(){
		const { options, filter } = this.state		
		if( filter == undefined || filter == '' ){ 
			return options
		}
		return options.filter( item => item.label.includes( filter ) )
	}

	render(){
		
		const { id, style, placeholder, pending, disabled, invalid, required } = this.props 
		const { isOpen, selectedLabel, value, filter, highlightedOption } = this.state
		
		const inputValue = filter || selectedLabel || ''
		const isPlaceholderActive = isOpen || selectedLabel 

		const componentClassName = utils.composeClassNames([
			'input-select__component',
			'component',
			'component__borders',
			'component__background',
			isOpen && 'component--open component__borders--open component__background--open',
			disabled && 'component--disabled component__borders--disabled component__background--disabled',
			pending && 'component--pending component__borders--pending component__background--pending',
			invalid && 'component--invalid component__borders--invalid component__background--invalid',
			required && ( selectedLabel === undefined ) && 'component--required component__borders--required component__background--required',
		])

		return (
			<div id={id} className='input-select component__box' style={ style }>
				<div className={ componentClassName } onClick={ this.onClickSelect } ref='area'>
					<div className='component__content input-select__content'>
						
						<Placeholder label={ placeholder } active={ isPlaceholderActive }/>
						
						<div className='input-select__input-content'>						
							<input 
								className={`input-select__filter ${filter ? 'has-filter' : ''}`}
								type='text'
								ref='filter'
								onKeyDown={ this.testKey }
								onChange={ this.applyFilter }
								onFocus={ this.openSelect }
								onClick={ this.openSelect }
								value={ inputValue }
								disabled={ disabled }
							/>
							
							{ filter && 
								<div className='component__inner-icon input-select-input__icon'>
									<Icon name='search-small' size={16} />
								</div>
							}

							<Loader visible={ pending } />

							<div className='component__inner-icon input-select-input__icon'>
								<Indicator isOpen={ isOpen } />
						 	</div>
						</div>						
						
					</div>
				</div>
				
				<div className='input-select__options' ref='options-position'>
					{ isOpen && 
						<Options
							ref='options' 
							options={ this.filterOptions() }							
							maxHeight={ this.maxHeight || 0 }
							reverse={ this.reverse }
							selected={ value }
							highlighted={ highlightedOption }
							onSelect={ this.onSelectOption }							
						/>
					}
				</div>

			</div>
		)
	}
}

const Indicator = ({ isOpen }) => (
	<Icon 
		className='input-select__indicator'
		name='arrow'
		style={{ marginTop:'2px', transform: `rotateZ(${ isOpen ? '270' : '90'}deg)` }}
		size={10}
		fill='rgba(0,0,0,0.5)'
	/>
)

Select.propTypes = {
	id: PropTypes.string,
	style: PropTypes.object,
	placeholder: PropTypes.string,
	options: PropTypes.arrayOf( 
		PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.string,
		})
	),
	selected: PropTypes.oneOf([ PropTypes.string, PropTypes.number, PropTypes.bool ]),
	pending: PropTypes.bool,
	required: PropTypes.bool,
	invalid: PropTypes.bool,
	disabled: PropTypes.bool
}

Select.defaultProps = {
	id: 'select',
	style: {},	
	placeholder: undefined,
	options: [],
	selected: undefined,
	pending: false,
	required: false,
	invalid: false, 
	disabled: false
}



export default Select