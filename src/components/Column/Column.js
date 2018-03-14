import React, { PropTypes } from 'react'

class Column extends React.Component {
	render(){
		const { align, grow, shrink, basis, className, style, children } = this.props		
		const [ alignItems, justifyContent ] = align.split(' ')
		const styles = {
			'display': 'flex',
    		'flex-flow': 'column nowrap',
			'flex-direction': 'row',
			'flex-grow': grow,
			'flex-shrink': shrink,
			'flex-basis': basis,
			'align-items': alignItems,
			'justify-content': justifyContent,
			...style
		}
		return (
			<div className={ className } style={ styles }>{children}</div>
		)
	}
}

	

Column.propTypes = {
	align: PropTypes.string,
	grow: PropTypes.string,
	shrink: PropTypes.string,
	basis: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.object
}
Column.defaultProps = {
	align: '',
	grow: undefined,
	shrink: undefined,
	basis: 'auto',
	className: undefined,
	style: undefined
}
export default Column