import React, { PropTypes } from 'react'
import './Tabs.css' 

class TabList extends React.Component {
	render(){
		return children
	}
}
class Tabs extends React.Component {	
	constructor(props){
		super(props)

		const { selected } = this.props
		this.state = {
			selected: Math.max( 0, typeof selected === 'string' ? items.indexOf( selected ) : selected != undefined ? selected : 0 )
		}	
		this.onSelect = this.onSelect.bind(this)	
	} 
	componentWillReceiveProps(nextProps){
		
		const { children } = nextProps
		const subElements = Array.isArray( children ) ? children : [ children ]		
		const tabs = subElements[0].props.children.filter( child => child.type === Tab )

		let selected = this.state.selected
		if( nextProps.selected != this.props.selected ){
			selected = nextProps.selected
		}
		
		const { hidden, disabled } = tabs[ selected ].props		

		if( hidden || disabled ){
			selected = 0			
		}

		this.setState({ selected })
		
	}
	onSelect( evt, index ){
		this.setState({ selected: index })
		
		if( typeof this.props.onSelect === 'function' ){
			this.props.onSelect( evt, index )
		}
		
		
	}
	render(){
		const { selected } = this.state
		const { children } = this.props		
		const subElements = Array.isArray( children ) ? children : [ children ]		
		
		const [ tabList, tabPanels ] = subElements
		const tabs = tabList.props.children
		.filter( child => child.type === Tab )
		.map( (child,index) => React.cloneElement( child, {...child.props, onSelect: this.onSelect } ) )
		
		const panels = tabPanels ? tabPanels.props.children : []

		const Panels = panels.filter( child => child.type === TabPanel )
		const SelectedPanel = (panels.length >= selected + 1) ? Panels[ selected ] : null

		const { width } = tabList.props.style || {}
		const growTab = width != undefined
		
		return (
			<div className='tabs'>
				<div className='tab-items' style={ tabList.props.style }> 
					{ tabs.map( (item, index) => (
						<Tab 
							key={ index }
							index={ index }
							selected={ this.state.selected === index }
							onSelect={ item.props.onSelect }
							hidden={ item.props.hidden }
							disabled={ item.props.disabled }
							text={ item.props.children }
							style={ item.props.style }
							flex={ growTab }
						/>
					)) }

				</div>
				{ SelectedPanel && <div className='tab-content'>
					{ SelectedPanel }
				</div>
				}
			</div>
		)
	}
}

const TabPanels = ({ children }) => { children }
const TabPanel = ({ children }) => <div className='tab-panel'>{ children }</div>

const Tab = ({ selected, onSelect, index, text, disabled, hidden, flex, style }) => {
	if( hidden ){
		return null
	}
	return (
		<div
			onClick={ (evt) => { disabled ? null : onSelect(evt, index) } }
			className={`tab-item ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''} ${flex ? 'fill-width' : ''}`}			
			style={ style }
		>
			{ text }
		</div>
	)
}


export { Tab, Tabs, TabList, TabPanel, TabPanels }