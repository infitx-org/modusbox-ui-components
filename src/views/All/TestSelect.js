import React, { PropTypes } from 'react'
import Select from '../../components/Select'

const options = [
	{
		label: 'test',
		value:'z'
	},
	{
		label: 'test11231231312313123',
		value:'z1',
		icon: 'close-small'
	},
	{
		label: 'test2',
		value:'z2'
	},
	{
		label: 'test3',
		value:'z3'
	},
	{
		label: 'disabled',
		value: 'disabled',
		disabled: true

	},
	{
		label: 'test4',
		value:'z4'
	},
	{
		label: 'test5',
		value:'z5'
	},
	{
		label: 'disabled2',
		value: 'disabled2',
		disabled: true

	}
]

const TestSelect = () => (
	<div>		
		<div style={{padding:10, border: '1px solid #ccc'}}>
			<Select
				placeholder='Default'
				options={ options }				
			/>
			<Select
				placeholder='Pending'
				options={ options }		
				pending		
			/>
			<Select
				placeholder='Invalid'
				options={ options }
				invalid
			/>
			<Select
				placeholder='Required'
				options={ options }
				required
			/>
			<Select
				placeholder='Disabled'
				options={ options }
				disabled
			/>
			<Select
				placeholder='OnChange'
				options={ options }
				onChange={ console.log }
			/>
		</div>
		<div style={{padding:10, border: '1px solid #ccc'}}>
			<Select
				id='x'
				placeholder='placeholder'
				options={ options }
				pending
			/>
			<Select
				id='x'
				placeholder='placeholder'
				options={ options }
				disabled
			/>
			<Select
				id='x'
				placeholder='placeholder'
				options={ options }
			/>
		</div>
		
	</div>
)

export default TestSelect