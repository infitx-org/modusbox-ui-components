import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from '../../components/DatePicker';

const TestDatePicker = () => (
	<div>
		<div style={{ padding: '10px', border: '1px solid #ccc' }}>
			<DatePicker placeholder="Default" format="x" onSelect={console.log} />
			<DatePicker
			value={1524002400000}
				placeholder="Default with time"
				format="x"
				onSelect={console.log}
				defaultHour={0}
				defaultMinute={0}
				defaultSecond={0}
				withTime
				disabledDays={undefined}
			/>
			<DatePicker placeholder="Pending" format="x" onSelect={console.log} pending />
			<DatePicker placeholder="Invalid" format="x" onSelect={console.log} invalid />
			<DatePicker placeholder="Required" format="x" onSelect={console.log} required />
			<DatePicker placeholder="Required" format="x" onSelect={console.log} disabled />
		</div>
	</div>
);

export default TestDatePicker;
