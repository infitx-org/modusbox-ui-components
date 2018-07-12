import React, { Component } from 'react';

import Icon from '../../components/Icon';
import Row from '../../components/Row';
import Column from '../../components/Column';
import Tooltip from '../../components/Tooltip';

const style = { width: '100px' };
const rowStyle = { padding: '10px', border: '1px solid #ccc' };
const columnStyle = { padding: '10px', border: '1px solid #ccc' };

const TestTooltip = () => (
  <Column style={{ padding: '10px' }}>
    <Row style={rowStyle} align="center space-between">
      <Column style={columnStyle}>
        <Tooltip style={style}> Default usage - applying style(100px width) </Tooltip>
      </Column>
      <Column style={columnStyle}>
        <Tooltip style={style} delay={2000}> Delay prop - applying style(100px width)  </Tooltip>
      </Column>
    </Row>
    <Row style={{ padding: '10px', border: '1px solid #ccc' }} align="center space-between">
      <Column style={columnStyle}>
        <Flicker>
          <Tooltip
            custom
            content={<div style={{ background: '#9c3', padding: '30px' }}>ciao</div>}
          >
            custom prop
          </Tooltip>
        </Flicker>
      </Column>
      <Column style={columnStyle}>
        <Tooltip label="boh..."> label prop </Tooltip>
      </Column>
      <Column style={columnStyle}>
        <Flicker><Tooltip label="boh..."> Flickering </Tooltip></Flicker>
      </Column>
      <Column style={columnStyle}>
        <Tooltip style={style}> custom tooltip style (100px width) </Tooltip>
      </Column>
    </Row>


    <Row>
      <Column style={columnStyle} align="center space-between">
        <Tooltip style={style} position="left">
          {`${Array(10).fill('super').join(' ')} long content with style(100px width)`}
        </Tooltip>
      </Column>

      <Column style={columnStyle} align="center space-between">
        <Tooltip style={style}>
          <Row align="left">
            <Icon name="close-small" size={16} /> Icon to be rendered
          </Row>
        </Tooltip>
      </Column>
    </Row>

    <Row style={rowStyle}>

      <Column style={columnStyle} align="center">
        <Tooltip style={style} position="right">
          RIGHT POSITIONED
        </Tooltip>
      </Column>

      <Column style={columnStyle} align="center">
        <Tooltip style={style} position="left">
          LEFT POSITIONED
        </Tooltip>
      </Column>

      <Column style={columnStyle} align="center">
        <Tooltip style={style} position="top">
          TOP POSITIONED
        </Tooltip>
      </Column>

      <Column style={columnStyle} align="center">
        <Tooltip style={style} position="bottom">
          BOTTOM POSITIONED
        </Tooltip>
      </Column>
    </Row>
  </Column>
);

class Flicker extends Component {
  constructor() {
    super();
    this.startFlickering = this.startFlickering.bind(this);
    this.stopFlickering = this.stopFlickering.bind(this);
    this.state = {
      flickers: 0,
    };
  }
  componentDidMount() {
    this.startFlickering();
  }
  componetWillUnmount() {
    this.stopFlickering();
  }
  startFlickering() {
    this._interval = setInterval(() => {
      this.setState({ flickers: this.state.flickers + 1 });
    }, 1000);
  }
  stopFlickering() {
    clearInterval(this._interval);
  }
  render() {
    return <div>{this.state.flickers}{this.props.children}</div>;
  }
}
export default TestTooltip;
