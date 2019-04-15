/* eslint no-console: "off" */
import React from 'react';

import Row from '../../components/Row';
import DatePicker from '../../components/DatePicker';

class DatePickerWithDelay extends React.Component {
  constructor() {
    super();
    this.state = { value: '' };
  }
  componentDidMount() {
    setInterval(() => this.setState({ value: 1524000000000 + Math.random() * 102400000 }), 1000);
  }
  render() {
    return (
      <DatePicker
        className="m5"
        value={this.state.value}
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
    );
  }
}

const TestDatePicker = () => (
  <div>
    <div className="p10 b1-ccc">
      <DatePickerWithDelay />
      <DatePicker className="m5" placeholder="Default" format="x" onSelect={console.log} />
      <DatePicker
        className="m5"
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
      <DatePicker className="m5" placeholder="Pending" format="x" onSelect={console.log} pending />
      <DatePicker
        className="m5"
        placeholder="Invalid"
        format="x"
        onSelect={console.log}
        invalid
        invalidMessages={[
          { message: 'This is a test', active: true },
          { message: 'This is undefined', active: undefined },
          { message: 'This is invalid', active: false },
        ]}
      />
      <DatePicker
        className="m5"
        placeholder="Required"
        format="x"
        onSelect={console.log}
        required
      />

      <DatePicker
        className="m5"
        placeholder="Required"
        format="x"
        onSelect={console.log}
        disabled
      />
      <DatePicker className="m5" placeholder="Required" format="x" onSelect={console.log} />
      <DatePicker className="m5" placeholder="Required" format="x" onSelect={console.log} />
      <DatePicker className="m5" placeholder="Required" format="x" onSelect={console.log} />
      <DatePicker className="m5" placeholder="Required" format="x" onSelect={console.log} />
      <DatePicker className="m5" placeholder="Required" format="x" onSelect={console.log} />
      <DatePicker
        className="m5"
        placeholder="Events"
        onSelect={value => console.log('onSelect', value)}
        onClick={() => console.log('onClick')}
        onBlur={e => console.log('onBlur', e)}
        onFocus={e => console.log('onFocus', e.target)}
      />
    </div>
    <Row className="p10 b1-ccc" align="space-between center">
      <DatePicker className="m5" placeholder="small" size="s" />
      <DatePicker className="m5" placeholder="medium" size="m" />
      <DatePicker className="m5" placeholder="large" size="l" />
      <DatePicker className="m5" placeholder="small" size="s" pending />
      <DatePicker className="m5" placeholder="medium" size="m" pending />
      <DatePicker className="m5" placeholder="large" size="l" pending />
    </Row>
  </div>
);

export default TestDatePicker;
