import React from 'react'

class Icon extends React.Component {
	constructor(props){
		super(props)
	}

	render(){
		const { style, size, name, fill, stroke, spin } = this.props
		const svgStyle = { 
			height: size,
			width: size,
			fill,
			stroke					
		}
		return (
			<svg style={ svgStyle }>
				<use xlinkHref={`#${name}`} />
			</svg>
		)
	}
}

Icon.defaultProps = {
	size: 20,
	name: undefined,
	fill: '#000',
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