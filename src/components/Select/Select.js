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
		this.getMaxHeight = this.getMaxHeight.bind(this)
		
		this.closeSelect = this.closeSelect.bind(this)
		this.leaveSelect = this.leaveSelect.bind(this)
		this.enterSelect = this.enterSelect.bind(this)
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
	enterSelect(){		
		this.setState({ isOpen: true })
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
				this.setState({ isOpen: true })
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
				isOpen: true,
				selectedLabel: undefined,
				value: undefined
			})
		}
	}
	highlightNextOption( next = true ){		
		const { highlightedOption, options } = this.state
		let currentHightlightedOption = highlightedOption
		let nextHighlightedOption = -1

		const getNextEnabledOption = () => {
			let option = ( currentHightlightedOption + ( next ? 1 : - 1 ) ) % options.length
			if( option < 0 ){
				option = options.length - 1
			}
			currentHightlightedOption = option
			if( this.state.options[ option ].disabled ){
				return -1
			}
			return option
		}
		
		while( nextHighlightedOption === -1 ){
			nextHighlightedOption = getNextEnabledOption()			
		}

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
		this.setState({ isOpen })
		if( isOpen === true ){
			this.onSelectFilter()
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

	getMaxHeight(){		
		const dims = ReactDOM.findDOMNode( this.refs['options-position'] ).getBoundingClientRect()
		console.log( dims )
		return 260
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
			<div className='input-select component__box' style={ style }>
				<div id={id} className={ componentClassName } onClick={ this.onClickSelect } ref='area'>
					<div className='component__content input-select__content'>
						
						<Placeholder label={ placeholder } active={ isPlaceholderActive }/>
						
						<div className='input-select__input-content'>						
							<input 
								className={`input-select__filter ${filter ? 'has-filter' : ''}`}
								type='text'
								ref='filter'
								onKeyDown={ this.testKey }
								onChange={ this.applyFilter }
								onFocus={ this.enterSelect }
								onClick={ this.enterSelect }
								value={ inputValue }
								disabled={ disabled }
							/>
							
							{ filter && 
								<div className='component__inner-icon select-input__icon'>
									<Icon name='search-small' size={16} />
								</div>
							}

							<Loader visible={ pending } />

							<div className='component__inner-icon select-input__icon'>
								<ArrowIcon isOpen={ isOpen } />
						 	</div>
						</div>						
						
					</div>
				</div>
				
				<div className='input-select__options' ref='options-position'>
					{ isOpen && 
						<Options
							ref='options' 
							options={ this.filterOptions() }							
							maxHeight={ this.getMaxHeight() }
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

const ArrowIcon = ({ isOpen }) => (
	<Icon 
		name='arrow'
		style={{marginTop:'2px', transform: `rotateZ(${ isOpen ? '270' : '90'}deg)` }}
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