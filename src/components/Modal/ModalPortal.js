import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

// Render into subtree is necessary for parent contexts to transfer over
// For example, for react-router
const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer

export default class ModalPortal extends React.PureComponent {
	componentDidMount(){		
		// Create a div and append it to the body
		// Mount a component on that div			
		this._div = document.createElement('div')
		if( this.props.id ){
			this._div.id = this.props.id
		}
		this._div.className = 'element-modal__box'		
		
		const modalIndex = document.querySelectorAll('.element-modal__box').length
		const childrenWithIndex = React.cloneElement(this.props.children, { modalIndex })
		this._modalIndex = modalIndex
		this._target = document.body.appendChild(this._div)				
		this._component = renderSubtreeIntoContainer(this, childrenWithIndex, this._target)		
	}
	componentDidUpdate(){
				
		// When the child component updates, we have to make sure the content rendered to the DOM is updated too
		const childrenWithIndex = React.cloneElement(this.props.children, { modalIndex: this._modalIndex })
		this._component = renderSubtreeIntoContainer(this, childrenWithIndex, this._target)
	}
	componentWillUnmount(){		
		
		const done = () => {					
			// Remove the node and clean up after the target
			ReactDOM.unmountComponentAtNode(this._target)
			document.body.removeChild(this._target)
			this._target = null
			this._component = null
		}

		// A similar API to react-transition-group
		if (typeof this._component.componentWillUnmount == 'function') {
			this._component.componentWillUnmount(done)
		}		
		if (typeof this._component.componentWillLeave == 'function') {
			this._component.componentWillLeave(done)			
		} else {			
			done()
		}

	}
	
	// This doesn't actually return anything to render
	render(){ return null } 
}