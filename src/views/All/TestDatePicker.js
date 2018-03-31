import React, { PropTypes } from 'react';
import DatePicker from '../../components/DatePicker';

const TestDatePicker = () => (
	<div>
		<div style={{ padding: '10px', border: '1px solid #ccc' }}>
			<DatePicker
				placeholder="Default"
				exportFormat="x"
				onSelect={console.log}
			/>
			<DatePicker
				placeholder="Default with time"
				exportFormat="x"
				onSelect={console.log}
				defaultHour={0}
				defaultMinute={0}
				defaultSecond={0}
				withTime
			/>
			<DatePicker
				placeholder="Pending"
				exportFormat="x"
				onSelect={console.log}
				pending
			/>
			<DatePicker
				placeholder="Invalid"
				exportFormat="x"
				onSelect={console.log}
				invalid
			/>
			<DatePicker
				placeholder="Required"
				exportFormat="x"
				onSelect={console.log}
				required
			/>
			<DatePicker
				placeholder="Required"
				exportFormat="x"
				onSelect={console.log}
				disabled
			/>
		</div>
	</div>
);

export default TestDatePicker;
