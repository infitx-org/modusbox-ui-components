import React, { PropTypes } from 'react'
import Button from '../../components/Button'



const TestButton = () => (
	<div>		
		<div style={{padding:10, border: '1px solid #ccc', alignItems:'center', display: 'flex'}}>
			<Button
				label='Primary'
				kind='primary'				
			/>
			<Button
				label='Secondary'
				kind='secondary'				
			/>
			<Button
				label='Tertiary'
				kind='tertiary'				
			/>
			<Button
				label='Danger'
				kind='danger'				
			/>
			<Button
				label='Disabled'
				disabled
			/>
			<Button
				label='Pending'
				pending		
			/>
			<Button
				label='Events'
				onClick={ console.log }
			/>
			<Button
				label='Icon'
				icon='deploy-small'
			/>
			<Button
				label='No Fill'
				icon='deploy-small'
				noFill
			/>		
			<Button
				label='No Fill'				
				icon='deploy-small'
				noFill
				kind='secondary'				
			/>		
			<Button
				label='No Fill'
				icon='deploy-small'
				noFill
				kind='tertiary'				
			/>		
			<Button
				label='No Fill'
				icon='deploy-small'
				noFill
				kind='danger'				
			/>		

		</div>
	</div>
)

export default TestButton