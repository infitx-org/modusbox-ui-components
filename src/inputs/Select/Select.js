import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { find } from 'lodash'
import { focusNextFocusableElement } from '../../utils/common'
import Icon from '../Icon'

import './Select.css'


import Options from './Options'
class Select extends Component { 
	constructor( props ){
		super( props )

		this.onClickSelect = this.onClickSelect.bind(this)
		this.onSelectOption = this.onSelectOption.bind(this)
		this.onPageClick = this.onPageClick.bind(this)
		this.onSelectFilter = this.onSelectFilter.bind(this)

		this.setValue = this.setValue.bind(this)
		this.closeSelect = this.closeSelect.bind(this)
		this.leaveSelect = this.leaveSelect.bind(this)
		this.enterSelect = this.enterSelect.bind(this)
		this.testTabKey = this.testTabKey.bind(this)
		this.applyFilter = this.applyFilter.bind(this)

		const { options, selected, pending, disabled } = this.props
		const selectedItem = find( options, { value: selected })
		const selectedLabel = selectedItem ? selectedItem.label : undefined
		this.state = {
			isOpen: false,
			options,
			selectedLabel,
			selectedValue: selected,
			pending,
			disabled,
			filter: undefined
		}
		this.has_focus = false
	}

	componentWillReceiveProps(nextProps, nextState){
		const changes = {}
		const { options, selected, pending, disabled } = nextProps
		
		if( selected !== this.props.selected ){
			const selectedItem = find( options, { value: selected })
			const selectedLabel = selectedItem ? selectedItem.label : undefined
			changes.selectedValue = selected
			changes.selectedLabel = selectedLabel
			this.setValue( selectedLabel )
		}

		if( options !== this.props.options ){
			changes.options = options
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
	closeSelect(){
		this.has_focus = false
		this.setState({ isOpen: false, filter: undefined })
	}
	leaveSelect( next){		
		
		this.closeSelect()
		focusNextFocusableElement( this.refs.filter, next )
		
	}
	enterSelect(){		
		this.has_focus = true
		this.setState({ isOpen: true })
	}
	testTabKey(e){
		if( e.nativeEvent.keyCode === 9 ){
			e.preventDefault()
			this.leaveSelect( ! e.nativeEvent.shiftKey )
			return
		}
	}
	applyFilter(e){
		if( ! this.has_focus ){
			return 
		}
		const { value } = this.refs.filter
		this.setState({ filter: value })
		if( value === '' ){
			this.setState({
				selectedLabel: undefined,
				selectedValue: undefined
			})
		}
	}


	// when clicking on the page 
	onPageClick(evt) {		
	
		if( ! this.state.isOpen ){
			return 
		}
		const isClickWithinSelectBox = ReactDOM.findDOMNode(this.refs.area).contains(evt.target)
		const isClickWithinOptionsBox = this.refs.options ? ReactDOM.findDOMNode(this.refs.options).contains(evt.target) : false
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
	onSelectOption( item ){
		
		const selectedItem = find( this.state.options, { value: item.value })
		const selectedLabel = selectedItem ? selectedItem.label : undefined
		//this.setValue( selectedLabel )
		this.setState({
			selectedValue: item.value,
			selectedLabel,			
		})
		this.closeSelect()
		
	}

	render(){
		const { id, placeholder } = this.props 
		const { isOpen, options, selectedLabel, selectedValue, pending, disabled, filter } = this.state
		const inputValue = filter || selectedLabel || ''
		const isPlaceholderTop = isOpen || selectedLabel 
		
		return (
			<div className='select-wrapper'>
				<div id={id} className={`select-component ${isOpen ? 'open' : '' } ${disabled ? 'disabled' : '' } `} onClick={ this.onClickSelect } ref='area'>
					<div className='select-box'>
						
						{ typeof placeholder === 'string' && 
							<label className={`select-placeholder ${isPlaceholderTop ? 'top' :''}`}> { placeholder } </label> 
						}
						
						<div className='select-input-content-box'>						
							<input 
								className={`select-input-filter ${filter ? 'has-filter' : ''}`}
								type='text'
								ref='filter'
								onKeyDown={ this.testTabKey }
								onChange={ this.applyFilter }
								onFocus={ this.enterSelect }
								onClick={ this.enterSelect }
								value={ inputValue }
								disabled={ disabled }
							/>
							
							<div className='select-input-icon'>
								{ pending ? <PendingIcon /> : <ArrowIcon isOpen={isOpen} /> }
						 	</div>
						</div>						
						
					</div>
				</div>
				
				<div className='options-position'>
					{ isOpen && 
						<Options
							ref='options' 
							options={ options }
							selected={ selectedValue }
							onSelect={ this.onSelectOption }
							filter={ filter }
						/>
					}
				</div>

			</div>
		)
	}
}

const PendingIcon = () => (
	<Icon 
		name='spinner'
		style={{marginTop: '-2px'}}
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
	pending: PropTypes.bool,
	disabled: PropTypes.bool,
}

Select.defaultProps = {
	id: 'select',
	style: {},	
	placeholder: undefined,
	options: [],
	selected: undefined,
	pending: false,
	disabled: false
}



export default Select