import React, { PropTypes } from 'react'
import FileUploader from '../inputs/FileUploader'

const TestFileUploader = () => (
	<div>		
		<div style={{padding:10, margin:'5px 0px', border: '1px solid #ccc'}}>
			<FileUploader				
				id='x'
				placeholder='1'			
				style={{width:'200px'}}
			/>
			<FileUploader				
				id='x1'
				placeholder='text'
				parseFileAsText
				fileType='.txt'
				onChange={console.log}
			/>
			<FileUploader
				id='x2'
				placeholder='2'
				disabled
			/>
			
		</div>		
	</div>
)

export default TestFileUploader