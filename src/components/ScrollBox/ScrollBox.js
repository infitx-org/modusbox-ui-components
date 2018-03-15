import React, { PropTypes } from 'react'

import './ScrollBox.css'

import ScrollBar from './ScrollBar'

class ScrollBox extends React.Component {
	constructor( props ){
		super( props )
		this.updateScrollbar = this.updateScrollbar.bind(this)
		this.updateContentSize = this.updateContentSize.bind(this)
	}
	componentDidMount(){
		this.updateScrollbar()
		this.updateContentSize()
		
		window.addEventListener( 'resize', this.updateScrollbar )
		this.refs.contentBox.addEventListener('scroll', this.updateScrollbar )
	}
	componentWillUnmount(){
		window.removeEventListener( 'resize', this.updateScrollbar )
		this.refs.contentBox.removeEventListener('scroll', this.updateScrollbar )
	}
	componentDidUpdate(){
		this.updateScrollbar()
		this.updateContentSize()
	}
	updateScrollbar(){
		const { scrollTop } = this.refs.contentBox
		const { height } = this.refs.contentBox.getBoundingClientRect()
		const contentHeight = this.refs.content.childNodes[0].getBoundingClientRect().height		
		const offset = 0
		if( this.refs.scrollbar ){
			this.refs.scrollbar.setPosition({ scrollTop, offset, contentHeight, height })
		}
	}
	updateContentSize(){
		const { width } = this.refs.contentBox.getBoundingClientRect()
		this.refs.content.style.width = width - 20
	}
	render(){
		const { showTrack, handleStyle, trackStyle, style, children } = this.props
		return (
			<div className='scrollbox-wrapper' style={ style } > 
				
				<div ref='contentBox' className='scrollbox-content-box'>
					<div ref='content' className='scrollbox-content'>{ children }</div>
				</div>

				<ScrollBar 
					ref='scrollbar'
					trackStyle={ trackStyle }
					handleStyle={ handleStyle }
					showTrack={ showTrack }
				/>
			</div>
		)
	}
}
ScrollBox.propTypes = {
	style: React.PropTypes.object,
	trackerStyle: React.PropTypes.object,
	handleStyle: React.PropTypes.object,
	showTrack: React.PropTypes.bool
}
ScrollBox.defaultProps = {	
	style: {},
	trackerStyle: {},
	handleStyle: {},
	showTrack: false
}
export default ScrollBox