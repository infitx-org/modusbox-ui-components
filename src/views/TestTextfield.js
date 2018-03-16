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
				placeholder='4'
				value='text'
			/>
			<TextField
				placeholder='Icon'
				icon='close-small'			
			/>
			<TextField
				placeholder='Events'				
				onChange={ () => console.log('onChange') }
				onClick={ () => console.log('onClick') }
				onKeyPress={ () => console.log('onKeyPress') }
				onEnter={ () => console.log('onEnter') }
				onBlur={ () => console.log('onBlur') }
				onFocus={ () => console.log('onFocus') }
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