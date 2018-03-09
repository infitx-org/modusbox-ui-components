import React, { PropTypes } from 'react'
import TextField from '../inputs/TextField'

const TestTextField = () => (
	<div>		
		<div style={{padding:10, margin:'5px 0px', border: '1px solid #ccc'}}>
			<TextField
				type='text'
				id='x'
				placeholder='1'
				pending
			/>
			<TextField
				type='password'
				id='x'
				placeholder='2'
				disabled
			/>
			<TextField
				id='x'
				placeholder='3'
				pending
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
				id='x'
				placeholder='5'				
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