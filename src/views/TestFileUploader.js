import React, { PropTypes } from 'react'
import FileUploader from '../components/FileUploader'

const TestFileUploader = () => (
	<div>		
		<div style={{padding:10, margin:'5px 0px', border: '1px solid #ccc'}}>
			<FileUploader				
				placeholder='Default'
			/>
			<FileUploader				
				placeholder='Only .txt file type'
				parseFileAsText
				fileType='.txt'
				onChange={console.log}
			/>
			<FileUploader
				placeholder='Pending'
				pending
			/>
			<FileUploader
				placeholder='Disabled'
				disabled
			/>
			<FileUploader
				placeholder='Invalid'
				invalid
			/>
			<FileUploader
				placeholder='Required'
				required
			/>
			
		</div>		
	</div>
)

export default TestFileUploader