import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../../components/TextField';

const TestTextField = () => (
	<div>
		<div style={{ padding: '10px', border: '1px solid #ccc' }}>			
			<TextField type="text" placeholder="Default" />
			<TextField type="password" placeholder="Password" />
			<TextField placeholder="Pending" pending/>
			<TextField placeholder="Invalid" invalid />
			<TextField placeholder="Required" required />
			<TextField placeholder="Disabled" disabled />
			<TextField type="password" placeholder="4" value="text" />
			<TextField placeholder="Icon" icon="close-small" />
			<TextField
				placeholder="Events (console)"
				onChange={(value) => console.log('onChange', value)}
				onClick={() => console.log('onClick')}
				onKeyPress={() => console.log('onKeyPress')}
				onEnter={() => console.log('onEnter')}
				onBlur={() => console.log('onBlur')}
				onFocus={() => console.log('onFocus')}				
			/>
			<TextField placeholder="Button" onButtonClick={() => console.log('Clicked!')} buttonText="Press Me" buttonKind='primary'/>
			<TextField placeholder="Button" onButtonClick={() => console.log('Clicked!')} buttonText="Press Me" buttonKind='secondary'/>
			<TextField placeholder="Button" onButtonClick={() => console.log('Clicked!')} buttonText="Press Me" buttonKind='danger'/>
			<TextField placeholder="Disabled" onButtonClick={() => console.log('Clicked!')} buttonText="Press Me" disabled />
		</div>
		<div style={{ padding: '10px', border: '1px solid #ccc' }}>
			<TextField type="password" placeholder="Password pending" pending />
			<TextField placeholder="Required Disabled" required disabled />
			<TextField placeholder="Required Disabled Invalid" required disabled invalid />
		</div>
		<div style={{ padding: '10px', border: '1px solid #ccc' }}>				
				<TextField id='test-textfield-1' />
				<TextField id='test-textfield-2' pending/>
				<TextField id='test-textfield-3' disabled/>			
			</div>
	</div>
);

export default TestTextField;
