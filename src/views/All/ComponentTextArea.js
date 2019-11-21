/* eslint no-console: "off" */
import React from 'react';

import Row from '../../components/Row';
import TextArea from '../../components/TextArea';
import { createOptionalValidation, validate, vd } from '../../reduxValidation';

class TextAreaWithDelay extends React.Component {
  constructor() {
    super();
    this.state = { t: '' };
  }
  componentDidMount() {
    setInterval(() => this.setState({ t: Math.random().toString() }), 1000);
  }
  render() {
    return <TextArea className="m5" type="text" placeholder="Default" value={this.state.t} />;
  }
}
class TextAreaWithValidation extends React.Component {
  constructor() {
    super();
    this.state = { value: undefined };
    this.validators = createOptionalValidation([vd.isEmail, vd.maxLength(10), vd.isNum, vd.isText]);
    this.onChange = this.onChange.bind(this);
  }
  onChange(value) {
    this.setState({ value: value !== '' ? value : undefined });
  }
  render() {
    const validationResult = validate(this.state.value, this.validators);
    return (
      <TextArea
        className="m5"
        type="text"
        placeholder="Validation"
        value={this.state.value}
        onChange={this.onChange}
        required
        invalid={!validationResult.isValid}
        invalidMessages={validationResult.messages}
      />
    );
  }
}

const TestTextArea = () => (
  <div>
    <div className="p10 b1-ccc w500">
      <TextAreaWithDelay />
      <TextAreaWithValidation />
      <TextArea className="m5" type="text" placeholder="Default" />
      <TextArea className="m5" type="password" placeholder="Password" />
      <TextArea className="m5" placeholder="Pending" pending />
      <TextArea
        className="m5"
        placeholder="Invalid"
        invalid
        invalidMessages={[
          { message: 'This is a test', active: true },
          { message: 'This is undefined', active: undefined },
          { message: 'This is invalid', active: false },
        ]}
      />
      <TextArea className="m5" placeholder="Required" required />
      <TextArea className="m5" placeholder="Disabled" disabled />
      <TextArea className="m5" placeholder="Icon" icon="close-small" />
      <TextArea /**/
        className="m5"
        placeholder="Events (console)"
        onChange={value => console.log('onChange', value)}
        onClick={() => console.log('onClick')}
        onKeyPress={() => console.log('onKeyPress')}
        onEnter={() => console.log('onEnter')}
        onBlur={() => console.log('onBlur')}
        onFocus={() => console.log('onFocus')}
      />
      <TextArea
        className="m5"
        placeholder="Button"
        onButtonClick={() => console.log('Clicked!')}
        buttonText="Press Me"
        buttonKind="primary"
      />

      <TextArea
        className="m5"
        placeholder="Disabled"
        onButtonClick={() => console.log('Clicked!')}
        buttonText="Press Me"
        disabled
      />
      <TextArea className="m5" placeholder="Required Disabled" required disabled />
      <TextArea className="m5" placeholder="Required Disabled Invalid" required disabled invalid />
    </div>

    <Row className="p10 b1-ccc" align="space-between center">
      <TextArea className="m5" placeholder="small" size="s" />
      <TextArea className="m5" placeholder="medium" size="m" />
      <TextArea className="m5" placeholder="large" size="l" />
      <TextArea className="m5" placeholder="small" size="s" pending />
      <TextArea className="m5" placeholder="medium" size="m" pending />
      <TextArea className="m5" placeholder="large" size="l" pending />
    </Row>
  </div>
);

export default TestTextArea;
