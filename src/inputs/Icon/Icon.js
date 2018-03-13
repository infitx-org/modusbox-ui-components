import React from 'react'
import './Icon.css'

class Icon extends React.Component {
	constructor(props){
		super(props)
		this.onClick = this.onClick.bind(this)
	}

	onClick(e){
		if( typeof this.props.onClick === 'function' ){
			this.props.onClick(e)
		}
	}
	render(){
		const { style, size, name, fill, stroke, spin } = this.props
		const svgStyle = { 
			height: `${size}px`,
			width: `${size}px`,
			fill,
			stroke					
		}
		return (
			<svg style={ svgStyle } onClick={ this.onClick } className={ `icon ${spin ? 'spin' : ''}`}>
				<use xlinkHref={`#${name}`} />
			</svg>
		)
	}
}

Icon.defaultProps = {
	size: 20,
	name: undefined,
	fill: '#999',
	stroke: undefined,
	spin: false
}

Icon.propTypes = {
	size: React.PropTypes.number,
	name: React.PropTypes.string,
	fill: React.PropTypes.string,
	stroke: React.PropTypes.string,
	spin: React.PropTypes.bool
}
export default Icon