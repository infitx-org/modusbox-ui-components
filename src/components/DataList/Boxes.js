import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../Spinner';
import Icon from '../Icon';
import Row from '../Row';
import Column from '../Column';

const SpinnerBox = ({ id = 'element-datalist__pending-box' }) => (
	<Row id={`${id}`} align="center center" className="loading-box">
		<Spinner size="s" className="loading-spinner" />
	</Row>
);

SpinnerBox.propTypes = {
	id: PropTypes.string,
};

const ErrorBox = ({ id = 'element-datalist__error-box' }) => (
	<Column id={`${id}`} className="element-datalist__error-box">
		<Icon size={50} name="settings" fill="#ccc" />
		<span style={{ color: '#ccc', fontSize: 20, marginLeft: 10 }}>Service Unavailable</span>
	</Column>
);

ErrorBox.propTypes = {
	id: PropTypes.string,
};

const NoDataBox = ({ message }) => (
	<Column className="element-datalist__message-box">
		<Icon name="dashboard" size={40} fill="#ccc" />
		<span style={{ color: '#ccc', fontSize: 20, marginLeft: 10 }}>{message}</span>
	</Column>
);

NoDataBox.propTypes = {
	message: PropTypes.string,
};

export { SpinnerBox, ErrorBox, NoDataBox };
