import React, { PropTypes } from 'react'

import './ScrollBox.css'

import ScrollBar from './ScrollBar'

class ScrollBox extends React.Component {
	constructor( props ){
		super( props )
		this.updateScrollbar = this.updateScrollbar.bind(this)
	}
	componentDidMount(){
		this.updateScrollbar()
		window.addEventListener( 'resize', this.updateScrollbar )
		this.refs.content.addEventListener('scroll', this.updateScrollbar )
	}
	componentWillUnmount(){
		window.removeEventListener( 'resize', this.updateScrollbar )
		this.refs.content.removeEventListener('scroll', this.updateScrollbar )
	}
	componentDidUpdate(){
		this.updateScrollbar()
	}
	updateScrollbar(){
		const { scrollTop } = this.refs.content
		const { height } = this.refs.content.getBoundingClientRect()
		const contentHeight = this.refs.content.childNodes[0].getBoundingClientRect().height		
		const offset = 0
		
		if( this.refs.scrollbar ){
			this.refs.scrollbar.setPosition({ scrollTop, offset, contentHeight, height })
		}
	}
	render(){
		const { style, children } = this.props
		return (
			<div className='scrollbox-wrapper' style={ style } > 
				<div ref='content' className='scrollbox-content-box'>
					<div className='scrollbox-content'>{ children }</div>
				</div>

				<ScrollBar ref='scrollbar' onInit={ console.log } showTrack/>
			</div>
		)
	}
}
export default ScrollBox