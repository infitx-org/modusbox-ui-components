/* eslint no-alert: "off" */
/* eslint no-console: "off" */
import React from 'react';
import Checkbox from '../../components/Checkbox';
import Column from '../../components/Column';
import Row from '../../components/Row';

class CheckboxWithDelay extends React.Component {
  constructor() {
    super();
    this.state = { checked: false };
  }
  componentDidMount() {
    setInterval(() => this.setState({ checked: !this.state.checked }), 1000);
  }
  render() {
    return <Checkbox checked={this.state.checked} />;
  }
}
const TestCheckbox = () => (
  <div>
    <Row style={{ padding: 10, margin: '5px 0px', border: '1px solid #ccc' }} align="left center">
      <Checkbox id="x" label="my Checkbox" checked={false} />
      <Checkbox id="x1" label="my checkbox semi-checked" checked semi />
      <Checkbox id="x2" label="other checkbox semi-checked" checked={false} semi />
      <Checkbox
        id="x3"
        label="Events"
        onChange={value => {
          console.log('onChange', value);
        }}
        onFocus={e => {
          console.log('onFocus', e);
        }}
        onBlur={e => {
          console.log('onBlur', e);
        }}
      />
    </Row>
    <Column style={{ padding: 10, margin: '5px 0px', border: '1px solid #ccc' }}>
      <Checkbox id="x4" label="my Checkbox" checked={false} />
      <Checkbox id="x5" label="my checkbox semi-checked" checked semi />
      <Checkbox id="x6" label="other checkbox semi-checked" checked={false} semi />
    </Column>
    <Column style={{ padding: 10, margin: '5px 0px', border: '1px solid #ccc' }}>
      <Checkbox id="x7" label="Click me" checked round />
      <Checkbox id="x8" label="onChange event" onChange={() => alert()} />
      <Checkbox id="x9" disabled label="I am disabled" />
      <Checkbox id="x10" disabled checked label="I am disabled checked" />
      <Checkbox id="x11" label="Round Corners" round />
    </Column>
    <Column style={{ padding: 10, margin: '5px 0px', border: '1px solid #ccc' }}>
      <Checkbox id="test-checkbox-1" label="Test checkbox 1" checked />
      <Checkbox id="test-checkbox-2" label="Test checkbox 2" />
      <Checkbox id="test-checkbox-3" label="Test checkbox 3" disabled />
      <Checkbox id="test-checkbox-4" label="Test checkbox 4" />
    </Column>
    <Column style={{ padding: 10, margin: '5px 0px', border: '1px solid #ccc' }}>
      <CheckboxWithDelay />
    </Column>
  </div>
);

export default TestCheckbox;
