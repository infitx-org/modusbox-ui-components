import React, { PropTypes } from 'react'
import RadioGroup from '../../components/RadioGroup'

const options = [
	{
		label: 'value1',
		value: 'value1'
	},
	{
		label: 'value2',
		value: 'value2',
		disabled: true
	},
	{
		label: 'value3',
		value: 'value3'
	},
	{
		label: 'value4',
		value: 'value4'
	},
	{
		label: 'value5',
		value: 'value5'
	}
]
const TestRadioGroup = () => (
	<div>
		<div style={{padding: '10px', border: '1px solid #ccc'}}>
			<RadioGroup
				id='x'
				label='my RadioGroup'
				value='value1'
				options={ options }
			/>			
			<RadioGroup
				id='x3'
				label='Click me'
				value='value4'
				options={ options }
			/>
			<RadioGroup
				id='x4'
				label='Events (console)'
				onChange={ () => alert() }
				options={ options }
				value='value5'
			/>
			<RadioGroup
				id='x5'
				label='Disabled'			
				disabled
				value='value1'
				options={ options }
			/>			
		</div>
	</div>
)

export default TestRadioGroup