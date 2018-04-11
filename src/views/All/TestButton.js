import React from 'react';
import PropTypes from 'prop-types';

import Row from '../../components/Row';
import Column from '../../components/Column';
import Button from '../../components/Button';

const TestButton = () => (
	<Column style={{ padding: '10px' }}>
		All kinds
		<Row style={{ padding: '10px', border: '1px solid #ccc' }} align="center space-between">
			<Button label="Primary" kind="primary" />
			<Button label="Secondary" kind="secondary" />
			<Button label="Tertiary" kind="tertiary" />
			<Button label="Danger" kind="danger" />
			<Button label="Warning" kind="warning" />
			<Button label="Dark" kind="dark" />			
			<Button label="Events" onClick={console.log} />
			<Button label="Icon" icon="deploy-small" />
			<Button label="No Fill" icon="deploy-small" noFill />
			<Button label="No Fill" icon="deploy-small" noFill kind="secondary" />
			<Button label="No Fill" icon="deploy-small" noFill kind="tertiary" />
			<Button label="No Fill" icon="deploy-small" noFill kind="danger" />
			<Button label="No Fill" icon="deploy-small" noFill kind="warning" />
			<Button label="No Fill" icon="deploy-small" noFill kind="dark" />
		</Row>
		Pending
		<Row style={{ padding: '10px', border: '1px solid #ccc' }} align="center space-between">
			<Button label="Primary" kind="primary" pending />
			<Button label="Secondary" kind="secondary" pending />
			<Button label="Tertiary" kind="tertiary" pending />
			<Button label="Danger" kind="danger" pending />
			<Button label="Warning" kind="warning" pending />
			<Button label="Dark" kind="dark" pending />
			<Button label="Disabled" disabled pending />
			<Button label="Icon" icon="deploy-small" pending />
			<Button label="No Fill" icon="deploy-small" noFill pending />
			<Button label="No Fill" icon="deploy-small" noFill kind="secondary" pending />
			<Button label="No Fill" icon="deploy-small" noFill kind="tertiary" pending />
			<Button label="No Fill" icon="deploy-small" noFill kind="danger" pending />
			<Button label="No Fill" icon="deploy-small" noFill kind="warning" pending />
			<Button label="No Fill" icon="deploy-small" noFill kind="dark" pending />
		</Row>
		Disabled
		<Row style={{ padding: '10px', border: '1px solid #ccc' }} align="center space-between">
			<Button label="Primary" kind="primary" disabled />
			<Button label="Secondary" kind="secondary" disabled />
			<Button label="Tertiary" kind="tertiary" disabled />
			<Button label="Danger" kind="danger" disabled />
			<Button label="Warning" kind="warning" disabled />
			<Button label="Dark" kind="dark" disabled />
			<Button label="Pending" pending disabled />
			<Button label="Icon" icon="deploy-small" disabled />
			<Button label="No Fill" icon="deploy-small" noFill disabled />
			<Button label="No Fill" icon="deploy-small" noFill kind="secondary" disabled />
			<Button label="No Fill" icon="deploy-small" noFill kind="tertiary" disabled />
			<Button label="No Fill" icon="deploy-small" noFill kind="danger" disabled />
		</Row>
	</Column>
);

export default TestButton;
