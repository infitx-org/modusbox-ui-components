import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
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
		let height = positions.height
		if( this.refs.tracker ){			
			height = ReactDOM.findDOMNode( this.refs.tracker ).getBoundingClientRect().height
		}
		const { contentHeight, scrollTop, offset } = positions
		const totalContentHeight = offset + contentHeight

		const viewToContentRatio = ( positions.height / totalContentHeight )
		const barHeight =  viewToContentRatio * height
		const realBaHeight = ( height / totalContentHeight ) * height
		const showScrollbar = viewToContentRatio < 1 
		const translate = showScrollbar ? ( scrollTop / ( offset + contentHeight - height) ) * (height - realBaHeight) : 0
		const isMoving = true		
		this.setState({ showScrollbar, barHeight, translate, isMoving, height })
		
		this.fadeMovingHandle()
	}

	render(){
		const { showTrack, trackStyle, handleStyle } = this.props
		const { showScrollbar, barHeight, translate, isMoving, height } = this.state
		const trackStyles = {
			...trackStyle
		}
		const handleStyles = {
			height: `${barHeight}px`,
			transform: `translate3d(0,${translate}px,0)`,
			...handleStyle
		}

		if( ! showScrollbar ){			
			return null
		}

		return (
			<Tracker ref='tracker'  style={ trackStyles }>
				 <div className={`${isMoving ? 'moving' : ''} scrollbar-handle`} style={ handleStyles }/>
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