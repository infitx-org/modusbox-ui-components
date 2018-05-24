/* eslint no-console: "off" */
import React from 'react';
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
        hideIcon
        disabledDays={undefined}
      />
      <DatePicker placeholder="Pending" format="x" onSelect={console.log} pending />
      <DatePicker
        placeholder="Invalid"
        format="x"
        onSelect={console.log}
        invalid
        invalidMessages={[
          { text: 'This is a test', active: true },
          { text: 'This is invalid', active: false },
        ]}
      />
      <DatePicker placeholder="Required" format="x" onSelect={console.log} required />

      <DatePicker placeholder="Required" format="x" onSelect={console.log} disabled />
      <DatePicker placeholder="Required" format="x" onSelect={console.log} />
      <DatePicker placeholder="Required" format="x" onSelect={console.log} />
      <DatePicker placeholder="Required" format="x" onSelect={console.log} />
      <DatePicker placeholder="Required" format="x" onSelect={console.log} />
      <DatePicker placeholder="Required" format="x" onSelect={console.log} />
      <DatePicker
        placeholder="Events"
        onSelect={value => console.log('onSelect', value)}
        onClick={() => console.log('onClick')}
        onBlur={e => console.log('onBlur', e)}
        onFocus={e => console.log('onFocus', e.target)}
      />
    </div>
  </div>
);

export default TestDatePicker;
