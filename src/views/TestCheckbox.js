import React, { PropTypes } from 'react'
import Checkbox from '../inputs/Checkbox'

const TestCheckbox = () => (
	<div>
		<div style={{padding:10, margin:'5px 0px', border: '1px solid #ccc'}}>
			<Checkbox
				id='x'
				label='my Checkbox'
				checked={ false }				
			/>
			<Checkbox
				id='x1'
				label='my checkbox semi-checked'
				checked={ true }				
				semi={ true }
			/>
			<Checkbox
				id='x2'
				label='other checkbox semi-checked'
				checked={ false }
				semi={ true }			
			/>
		</div>
		<div style={{padding:10, margin:'5px 0px', border: '1px solid #ccc'}}>
			<Checkbox
				id='x3'
				label='Click me'
				checked={ true }
				round
			/>
			<Checkbox
				id='x4'
				label='onChange event'
				onChange={ () => alert() }								
			/>
			<Checkbox
				id='x5'			
				disabled
				label='I am disabled'
			/>
			<Checkbox
				id='x6'			
				disabled
				checked={ true }
				label='I am disabled checked'
			/>
			<Checkbox
				id='x7'
				label='Round Corners'
				round
			/>
		</div>
	</div>
)

export default TestCheckbox