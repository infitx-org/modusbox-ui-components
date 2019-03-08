/* eslint no-console: "off" */
import React from 'react';

import Row from '../../components/Row';
import TextField from '../../components/TextField';
import Checkbox from '../../components/Checkbox';

class TextFieldWithDelay extends React.Component {
  constructor() {
    super();
    this.state = { t: '' };
  }
  componentDidMount() {
    setInterval(() => this.setState({ t: Math.random().toString() }), 1000);
  }
  render() {
    return <TextField className="m5" type="text" placeholder="Default" value={this.state.t} />
  }
}

const TestTextField = () => (
  <div>
    <div className="p10 b1-ccc">
      <TextFieldWithDelay />
      <TextField className="m5" type="text" placeholder="Default" />
      <TextField className="m5" type="password" placeholder="Password" />
      <TextField className="m5" placeholder="Pending" pending />
      <TextField
        className="m5"
        placeholder="Invalid"
        invalid
        invalidMessages={[
          { message: 'This is a test', active: true },
          { message: 'This is undefined', active: undefined },
          { message: 'This is invalid', active: false },
        ]}
      />
      <TextField className="m5" placeholder="Required" required />
      <TextField className="m5" placeholder="Disabled" disabled />
      <TextField className="m5" type="password" placeholder="4" value="text" />
      <TextField className="m5" placeholder="Icon" icon="close-small" />
      <TextField
        className="m5"
        placeholder="Events (console)"
        onChange={value => console.log('onChange', value)}
        onClick={() => console.log('onClick')}
        onKeyPress={() => console.log('onKeyPress')}
        onEnter={() => console.log('onEnter')}
        onBlur={() => console.log('onBlur')}
        onFocus={() => console.log('onFocus')}
      />
      <TextField
        className="m5"
        placeholder="Button"
        onButtonClick={() => console.log('Clicked!')}
        buttonText="Press Me"
        buttonKind="primary"
      />
      <TextField
        className="m5"
        placeholder="Button"
        onButtonClick={() => console.log('Clicked!')}
        buttonText="Press Me"
        buttonKind="secondary"
      />
      <TextField
        className="m5"
        placeholder="Button"
        onButtonClick={() => console.log('Clicked!')}
        buttonText="Press Me"
        buttonKind="danger"
      />
      <TextField
        className="m5"
        placeholder="Disabled"
        onButtonClick={() => console.log('Clicked!')}
        buttonText="Press Me"
        disabled
      />
    </div>
    <div className="p10 b1-ccc">
      <InvalidToggle />
    </div>
    <div className="p10 b1-ccc">
      <TextField className="m5" type="password" placeholder="Password pending" pending />
      <TextField className="m5" placeholder="Required Disabled" required disabled />
      <TextField className="m5" placeholder="Required Disabled Invalid" required disabled invalid />
    </div>
    <Row className="p10 b1-ccc" align="space-between center">
      <TextField className="m5" placeholder="small" size="s" />
      <TextField className="m5" placeholder="medium" size="m" />
      <TextField className="m5" placeholder="large" size="l" />
      <TextField className="m5" placeholder="small" size="s" pending />
      <TextField className="m5" placeholder="medium" size="m" pending />
      <TextField className="m5" placeholder="large" size="l" pending />
    </Row>
  </div>
);

class InvalidToggle extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isToggled: false,
    };
  }
  toggle() {
    this.setState({
      isToggled: !this.state.isToggled,
    });
  }
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <Checkbox onChange={this.toggle} label="Invalid" />
        <TextField
          onChange={this.toggle}
          placeholder="Invalid"
          invalid={this.state.isToggled}
          invalidMessages={[
            { message: 'This is a test', active: true },
            { message: 'This is invalid', active: false },
          ]}
        />
      </div>
    );
  }
}
export default TestTextField;
