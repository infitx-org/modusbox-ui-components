import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import './ScrollBar.scss'

class ScrollBar extends React.Component {
	constructor( props ){
		super( props )
		this.setPosition = this.setPosition.bind(this)
		this.fadeMovingHandle = this.fadeMovingHandle.bind(this)
		this.onMouseDown = this.onMouseDown.bind(this)
		this.onMouseMove = this.onMouseMove.bind(this)
		this.onMouseUp = this.onMouseUp.bind(this)
		
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
		window.addEventListener('mousemove', this.onMouseMove);
		window.addEventListener('mouseup', this.onMouseUp);
	}
	componentWillUnmount(){
		this._isMounted = false
		window.removeEventListener('mousemove', this.onMouseMove );
		window.removeEventListener('mouseup', this.onMouseUp );
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
		const { tracker } = this.refs 
		const { height } = tracker ? ReactDOM.findDOMNode( tracker ).getBoundingClientRect() : positions		
		const { contentHeight, scrollTop, offset } = positions
		const totalContentHeight = offset + contentHeight
		const viewToContentRatio = ( positions.height / totalContentHeight )
		this.viewToContentRatio = viewToContentRatio
		const barHeight =  viewToContentRatio * height
		const realBaHeight = ( height / totalContentHeight ) * height
		const showScrollbar = viewToContentRatio < 1 
		const translate = showScrollbar ? ( scrollTop / ( totalContentHeight - height ) ) * ( height - realBaHeight ) : 0
		const isMoving = true		
				
		this.setState({ showScrollbar, barHeight, translate, isMoving, height })		
		this.fadeMovingHandle()
	}

	onMouseDown( e ){		
		this._originMouseY = e.nativeEvent.offsetY
		this._dragging = true
	}
	onMouseMove( e ){		
		if( this._dragging ){
			const { top, height }= ReactDOM.findDOMNode( this.refs.tracker ).getBoundingClientRect()
			const mousePosY = e.pageY - top
			if( typeof this.props.onDrag === 'function' ){
				const diff = mousePosY - this._originMouseY
				const max = Math.round( height - this.state.barHeight )
				const ratio = ( diff > max ) ? 1 : diff < 0 ? 0 : diff / max
				this.props.onDrag( ratio )				
			}			
		}
	}
	onMouseUp( e ){
		this._dragging = false 		
	}
	render(){
		const { showTrack, trackStyle, handleStyle } = this.props
		const { showScrollbar, barHeight, translate, isMoving, height } = this.state
		const trackStyles = {
			...trackStyle
		}
		const handleStyles = {
			height: `${Math.round(barHeight)}px`,
			transform: `translate3d(0,${Math.round(translate)}px,0)`,
			...handleStyle
		}

		if( ! showScrollbar ){			
			return null
		}

		return (
			<Tracker ref='tracker'  style={ trackStyles }>
				 <div
				 	onMouseDown={ this.onMouseDown }
				 	className={`${isMoving ? 'moving' : ''} scrollbar-handle`}
				 	style={ handleStyles }
				 />
			</Tracker>
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



class Tracker extends React.Component {
	constructor(props){
		super(props)			
	}
	render(){
		return <div className={`scrollbar ${this.props.showTrack ? 'track-visible' : ''}`} style={ this.props.style }>
		 	{this.props.children}
		 </div>
	}
}

export default ScrollBar