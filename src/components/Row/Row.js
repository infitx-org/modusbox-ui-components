import React, { PropTypes } from 'react'

class Row extends React.Component {
	render(){
		const { placeContent, align, grow, shrink, basis, className, style, children } = this.props		
		const [ alignItems, justifyContent ] = align.split(' ')
		const styles = {
			'display': 'flex',
    		'flexFlow': 'row nowrap',
			'flexDirection': 'row',
			'placeContent': placeContent,
    		'alignItems': 'center',
			'flexGrow': grow,
			'flexShrink': shrink,
			'flexBasis': basis,
			'alignItems': alignItems,
			'justifyContent': justifyContent,
			...style
		}
		return (
			<div className={ className } style={ styles }>{children}</div>
		)
	}
}

	

Row.propTypes = {
	placeContent: PropTypes.string,
	align: PropTypes.string,
	grow: PropTypes.string,
	shrink: PropTypes.string,
	basis: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.object
}
Row.defaultProps = {
	placeContent: 'flex-start',
	align: 'center',
	grow: undefined,
	shrink: undefined,
	basis: 'auto',
	className: undefined,
	style: undefined
}
export default Row