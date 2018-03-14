import React, { PropTypes } from 'react'
import DatePicker from '../components/DatePicker'

const TestDatePicker = () => (
	<div>
		<div style={{padding:10, margin:'5px 0px', border: '1px solid #ccc'}}>
			<DatePicker
				id='filter_date_from'
				exportFormat = 'x'
				onSelect={ console.log }
				value={ undefined }
				placeholder='Date Time'
				defaultHour={ 0 }
				defaultMinute={ 0 }
				defaultSecond={ 0 }
				hasTime
			/>
			<DatePicker
				id='filter_date_from'
				exportFormat = 'x'
				onSelect={ console.log }
				value={ undefined }
				placeholder='Date only'				
			/>
		</div>
	</div>
)

export default TestDatePicker