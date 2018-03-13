import React, { PropTypes } from 'react'

import './ScrollBar.css'

class ScrollBar extends React.Component {
	constructor( props ){
		super( props )
		this.setPosition = this.setPosition.bind(this)
		this.fadeMovingHandle = this.fadeMovingHandle.bind(this)
		
		this.originalState = { 
			showScrollbar: false,
			barHeight: '0%',
			translate: 0,
			isMoving: false,
			height: '100%'
		}
		this.state = { ...this.originalState }
		this.movingTimeout = false
	}
	componentDidMount(){
		this._isMounted = true
	}
	componentWillUnmount(){
		this._isMounted = false
	}
	fadeMovingHandle(){
		clearTimeout( this.movingTimeout )

		this.movingTimeout = setTimeout( () => {
			if( this._isMounted ){
				this.setState({ isMoving: false })
			}
		}, 500)
	}
	setPosition(positions){		
		const { height, contentHeight, scrollTop, offset } = positions
		const barHeight = ( height ) / ( offset + contentHeight ) * 100 
		const showScrollbar = ( barHeight < 100 )		
		const translate = ( scrollTop / ( offset + contentHeight ) ) * height
		const isMoving = true		

		this.setState({ showScrollbar, barHeight, translate, isMoving, height })
		
		this.fadeMovingHandle()
	}

	render(){
		const { showTrack } = this.props
		const { showScrollbar, barHeight, translate, isMoving, height } = this.state
		const trackerStyle = {
			height
		}
		const handleStyle = {
			height: `${barHeight}%`,
			transform: `translate3d(0,${translate}px,0)`,
			...this.props.style
		}

		if( ! showScrollbar ){			
			return <div />
		}

		return (
			<div className={`scrollbar ${showTrack ? 'track-visible' : ''}`} style={ trackerStyle }>
				 <div className={`${isMoving ? 'moving' : ''} scrollbar-handle`} style={ handleStyle }/>
			</div>
		)
	}
}
ScrollBar.propTypes = {
	showTrack: React.PropTypes.bool,
	style: React.PropTypes.object
}
ScrollBar.defaultProps = {
	showTrack: true,
	style: {}
}

export default ScrollBar