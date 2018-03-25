import React, { PureComponent, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import * as utils from '../../utils/common'
import Spinner from '../Spinner'

const Loader = ({ visible = true }) => {
	if( ! visible ){
		return null
	}
	return (
		<div className='component__inner-icon'>
			<Spinner size={16} /> 
		</div>
	)
}

const Placeholder = ({ label, active }) => {
	if( ! label === 'string' ){
		return null
	}

	const placeholderClassName = utils.composeClassNames([
		'component__placeholder',
		active && 'component__placeholder--active'
	])

	return (
		<label className={ placeholderClassName }>
			{ label }
		</label> 
	)
}

export { Loader, Placeholder }