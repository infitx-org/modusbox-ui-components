import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../components/Icon';
import Row from '../../components/Row';
import Column from '../../components/Column';
import Tooltip from '../../components/Tooltip';

const TestButton = () => (
	<Column style={{ padding: '10px' }}>
		<Row style={{ padding: '10px', border: '1px solid #ccc' }} align="center space-between">
			<Tooltip style={{ width: '100px' }}> Very loooooooooooooong content... </Tooltip>
		</Row>
		<Row style={{ padding: '10px', border: '1px solid #ccc' }} align="center space-between">
			<Tooltip style={{ width: '100px' }}> Very loooooooooooooong content... </Tooltip>
		</Row>
		<Row style={{ padding: '10px', border: '1px solid #ccc' }} align="center space-between">
			<Tooltip style={{ width: '100px' }}> Very loooooooooooooong content... </Tooltip>
		</Row>
		<Row style={{ padding: '10px', border: '1px solid #ccc' }} align="center space-between">
			<Tooltip style={{ width: '100px' }}>
				<Row>
					<Icon name="close-small" size={16} /> Very loooooooooooooong content...
				</Row>
			</Tooltip>
		</Row>
		<Row style={{ padding: '10px', border: '1px solid #ccc' }} align="center space-between">
			<Tooltip style={{ width: '100px' }}> Very loooooooooooooong content... </Tooltip>
		</Row>
	</Column>
);

export default TestButton;
