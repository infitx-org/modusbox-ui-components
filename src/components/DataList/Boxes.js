import React from 'react';
import PropTypes from 'prop-types';

const SpinnerBox = ({ id = 'element-datalist__pending-box' }) => (
	<div id={`${id}`} style={{ width: '100%' }}>
		<Row align="center center" className="loading-box">
			<Icon size={16} className="loading-spinner" name="warning-sign" />
			{/*<Spinner size='s' className='loading-spinner'/>*/}
		</Row>
	</div>
);

const ErrorBox = ({ id = 'element-datalist__error-box', message }) => (
	<div id={`${id}`} className="element-datalist__error-box">
		<Icon size={50} name="settings" fill="#ccc" />
		<span style={{ color: '#ccc', fontSize: 20, marginLeft: 10 }}> Service Unavailable </span>
	</div>
);

const NoDataBox = ({ message }) => (
	<div className="element-datalist__message-box">
		<Icon name="dashboard" size={40} fill="#ccc" />
		<span style={{ color: '#ccc', fontSize: 20, marginLeft: 10 }}>{message}</span>
	</div>
);


export { SpinnerBox, ErrorBox, NoDataBox }