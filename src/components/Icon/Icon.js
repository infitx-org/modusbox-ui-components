import React from 'react'
import * as utils from '../../utils/common'

import './Icon.css'

class Icon extends React.PureComponent {
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
		const { className, style, size, name, fill, stroke, spin } = this.props
		const svgStyle = { 
			height: `${size}px`,
			width: `${size}px`,
			fill,
			stroke					
		}
		const componentClassName = utils.composeClassNames([
			'icon',
			spin && 'spin',
			className
		])
		return (
			<svg style={ svgStyle } onClick={ this.onClick } className={ `icon ${spin ? 'spin' : ''}`}>
				<use xlinkHref={`#${name}`} />
			</svg>
		)
	}
}

Icon.defaultProps = {
	className: undefined,
	size: 20,
	name: undefined,
	fill: '#999',	
	stroke: undefined,
	spin: false
}

Icon.propTypes = {
	className: React.PropTypes.string,
	size: React.PropTypes.number,
	name: React.PropTypes.string,
	fill: React.PropTypes.string,
	stroke: React.PropTypes.string,
	spin: React.PropTypes.bool
}
export default Icon