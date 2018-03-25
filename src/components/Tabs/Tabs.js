import React, { PropTypes } from 'react'

import * as utils from '../../utils/common'
import keyCodes from '../../utils/keyCodes'

import './Tabs.scss' 

class TabList extends React.PureComponent {
	render(){
		return children
	}
}
class Tabs extends React.PureComponent {	
	constructor(props){
		super(props)

		const { selected, children } = this.props
		const items = this.getTabs( children )		
		
		this.state = {
			selected: Math.max( 0, typeof selected === 'string' ? items.indexOf( selected ) : selected != undefined ? selected : 0 ),
			focused: undefined
		}	

		this.onSelect = this.onSelect.bind(this)	
		this.onFocus = this.onFocus.bind(this)
		this.onBlur = this.onBlur.bind(this)

		this.getTabListAndTabPanels = this.getTabListAndTabPanels.bind(this)
		this.getTabs = this.getTabs.bind(this)
		this.getPanels = this.getPanels.bind(this)

		this.testKey = this.testKey.bind(this)
		this.selectSiblingTab = this.selectSiblingTab.bind(this)
	} 	
	componentWillReceiveProps(nextProps){
		
		const { children } = nextProps
		let { selected } = this.state
		if( nextProps.selected != this.props.selected ){
			selected = nextProps.selected
		}
		
		const subElements = Array.isArray( children ) ? children : [ children ]		
		const tabs = subElements[0].props.children.filter( child => child.type === Tab )

		const { hidden, disabled } = tabs[ selected ].props
		if( hidden || disabled ){
			selected = 0			
		}

		this.setState({ selected })		
	}

	getTabListAndTabPanels(){
		const items = this.props.children
		const subElements = Array.isArray( items ) ? items : [ items ]				
		const [ tabList, tabPanels ] = subElements
		return [ tabList, tabPanels ]
	}
	getTabs(){		
		const [ tabList ] = this.getTabListAndTabPanels()
		return tabList.props.children.filter( child => child.type === Tab )
	}
	getPanels(){
		const [ tabList, tabPanels ] = this.getTabListAndTabPanels()
		const panels = tabPanels ? tabPanels.props.children : []
		return panels.filter( child => child.type === TabPanel )
	}
	onSelect( evt, index ){
		this.setState({ selected: index, focused: index })

		this.refs.btn.focus()
		
		if( typeof this.props.onSelect === 'function' ){
			this.props.onSelect( index )
		}		
	}
	onFocus( e ){
		e.preventDefault()
		e.stopPropagation()
		if( this.state.focused === undefined ){
			this.setState( state => ({ focused: state.selected }) )
		}
		return 
	}
	onBlur( blurred ){
		this.setState({ focused: undefined })
	}
	testKey( e ){		
		const { keyCode, shiftKey } = e.nativeEvent
		if( keyCode === keyCodes.KEY_TAB ){
			e.preventDefault()
			this.setState({ focused: undefined })						
			utils.focusNextFocusableElement( this.refs.btn, ! shiftKey );
			return
		}
		if( keyCode === keyCodes.KEY_LEFT ){
			e.preventDefault()
			this.selectSiblingTab( false )
			return
		}
		if( keyCode === keyCodes.KEY_RIGHT ){
			e.preventDefault()
			this.selectSiblingTab( true )
			return
		}
	}	
	selectSiblingTab( next ){
		const { selected } = this.state
		const tabs = this.getTabs( this.props.children )
		let nextIndex = selected	
		while( true ){
			nextIndex += next ? 1 : -1
			if( nextIndex == tabs.length || nextIndex < 0 ){
				break
			}
			if( ! tabs[ nextIndex ].props.disabled ){
				this.setState({ selected: nextIndex, focused: nextIndex })
				break
			}
		}

	}
	render(){
		const { selected } = this.state
		const { children } = this.props		
		const [ tabList ] = this.getTabListAndTabPanels()
		
		const tabs = this.getTabs( children )
		.map( ( child, index ) => React.cloneElement( child, { ...child.props, onSelect: this.onSelect } ) )

		const panels = this.getPanels( children )		
		const SelectedPanel = (panels.length >= selected + 1) ? panels[ selected ] : null

		const { width } = tabList.props.style || {}
		const growTab = width != undefined
		
		return (
			<div className='element-tabs'>
				<input 
					ref='btn'
					type='button'
					className='element-tabs__tab-item-input'
					onFocus={ this.onFocus }
					onBlur={ this.onBlur }
					onKeyDown={ this.testKey }
				/>
				<div className='element-tabs__tab-items' style={ tabList.props.style }> 
					{ tabs.map( (item, index) => (
						<Tab 
							key={ index }
							index={ index }
							selected={ this.state.selected === index }
							focused={ this.state.focused === index }
							onSelect={ item.props.onSelect }
							hidden={ item.props.hidden }
							disabled={ item.props.disabled }
							text={ item.props.children }
							style={ item.props.style }
							flex={ growTab }
						/>
					)) }

				</div>
				{ SelectedPanel && <div className='element-tabs__tab__content'>
					{ SelectedPanel }
				</div>
				}
			</div>
		)
	}
}

const TabPanels = ({ children }) => { children }

const TabPanel = ({ children }) => <div className='element-tabs__tab__panel'>{ children }</div>

class Tab extends React.PureComponent{
	constructor( props ){
		super(props)
		this.onClick = this.onClick.bind(this)		
	}
	onClick( evt ){
		if( ! this.props.disabled ){
			this.props.onSelect( evt, this.props.index )			
		}
	}
	render(){
		const { selected, focused, onSelect, index, text, disabled, hidden, flex, style } = this.props
	
		if( hidden ){
			return null
		}	
		const className = utils.composeClassNames([
			'element-tabs__tab-item',
			focused && 'element-tabs__tab-item--focused',
			selected && 'element-tabs__tab-item--selected',
			disabled && 'element-tabs__tab-item--disabled',
			flex && 'fill-width'
		])

		return (
			<div
				onClick={ this.onClick }
				className={ className }
				style={ style }				
			>				
				{ text }
			</div>
		)
	}
}


export { Tab, Tabs, TabList, TabPanel, TabPanels }