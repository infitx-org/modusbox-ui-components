import React, { PropTypes } from 'react'
import TextField from '../components/TextField'

const TestTextField = () => (
	<div>		
		<div style={{padding:10, margin:'5px 0px', border: '1px solid #ccc'}}>
			<TextField
				type='text'
				placeholder='Default'
			/>
			<TextField
				type='password'
				placeholder='Password'				
			/>
			<TextField
				placeholder='Pending'
				pending
			/>
			<TextField		
				placeholder='Invalid'				
				invalid
			/>
			<TextField		
				placeholder='Required'
				required				
			/>
			<TextField		
				placeholder='Disabled'
				disabled				
			/>
			<TextField
				type='password'
				id='x'
				placeholder='4'
				value='text'
			/>
		</div>
		<div style={{padding:10, margin:'5px 0px', border: '1px solid #ccc'}}>
			<TextField
				type='password'
				placeholder='Password pending'				
				pending
			/>
			<TextField
				id='x'
				placeholder='6'				
				disabled
			/>
			<TextField
				id='x'
				placeholder='7'				
			/>
		</div>
		
	</div>
)

export default TestTextField