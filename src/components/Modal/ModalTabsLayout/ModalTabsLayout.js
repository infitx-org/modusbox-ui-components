import React, { PropTypes } from 'react'
import isEqual from 'lodash/isEqual'
import { ScrollBar } from '../../ScrollBox'
import './ModalTabsLayout.css' 

class ModalTabsLayout extends React.PureComponent {
	constructor(props){
		super(props)

		const { items, selected } = this.props
		const itemIndex = typeof selected === 'string' ? items.map( item => item.name ).indexOf( selected ) : typeof selected === 'undefined' ? 0 : selected
		this.state = {
			items,
			selected: Math.max( 0, itemIndex )
		}			
		this.onSelect = this.onSelect.bind(this)	
		this.updateScrollbar = this.updateScrollbar.bind(this)
	} 
	componentDidMount(){
		window.addEventListener( 'resize', this.updateScrollbar )
		this.refs.wrapper.addEventListener( 'scroll', this.updateScrollbar )		
		this.updateScrollbar()
	}
	componentWillUnmount(){
		window.removeEventListener( 'resize', this.updateScrollbar )
		this.refs.wrapper.removeEventListener( 'scroll', this.updateScrollbar )			
	}
	componentWillReceiveProps(nextProps){
		const { items } = nextProps
		if( ! isEqual( this.props.items, items ) ){
			this.setState({ items })
		}
	}
	componentDidUpdate(){	
		this.updateScrollbar()
	}
	updateScrollbar(){	
		if( ! this.refs.wrapper ){
			return
		}
		const { scrollTop } = this.refs.wrapper
		const { height } = this.refs.wrapper.getBoundingClientRect()		
		const rowsHeight = this.refs.wrapper.childNodes[0].getBoundingClientRect().height
		const offset = 0
		if( this.refs.scrollbar ){
			this.refs.scrollbar.setPosition({ scrollTop, offset, rowsHeight, height })
		}
	}
	onSelect( index, disabled = false ){				
		if( disabled ){
			return
		}
		this.setState({ selected: index })
	}	

	render(){
		const { items, selected } = this.state
		const { children } = this.props
		const { flex } = items[ selected ]		

		return (
			<div className='modal-tab-layout'>

				<ModalTabs items={ items } selected={ selected } onSelect={ this.onSelect }/>
				<div className='modal-tab-content-wrapper'>
					<div ref='wrapper' className={`modal-tab-content ${flex ? 'flexible' : ''}`}>
						{ children[ selected ] }
					</div>
					<ScrollBar ref='scrollbar' onInit={this.updateScrollbar}/>
				</div>
			</div>
		)
	}
}

const ModalTabs = ({ items, selected, onSelect }) => {
	
	return (
		<div className='modal-tab-items'>
			{ 
				items.map( (item, index) => (
					<div		
						key={ index }				
						onClick={ () => onSelect(index, item.disabled) }
						className={`modal-tab-item ${index === selected ? 'selected' : '' } ${item.disabled ? 'disabled' : '' } `}
					>
						{ item.name }
					</div>
				))
			}
		</div>
	)
}


export default ModalTabsLayout