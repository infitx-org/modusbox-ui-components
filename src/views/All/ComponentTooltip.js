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
        <Tooltip
          custom
          content={<div style={{ background: '#9c3', padding: '30px' }}>ciao</div>}
        >
          custom tooltip
        </Tooltip>
      </Column>
      <Column style={columnStyle}>
        <Tooltip label="boh..."> label prop </Tooltip>
      </Column>
      <Column style={columnStyle}>
        <Ticker odd="LongLongLongLongLong" even="short" />
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

class Ticker extends Component {
  constructor() {
    super();
    this.startTickering = this.startTickering.bind(this);
    this.stopTickering = this.stopTickering.bind(this);
    this.state = {
      tickers: 0,
    };
  }
  componentDidMount() {
    this.startTickering();
  }
  componetWillUnmount() {
    this.stopTickering();
  }
  startTickering() {
    this._interval = setInterval(() => {
      this.setState({ tickers: (this.state.tickers + 1) % 2 });
    }, 3000);
  }
  stopTickering() {
    clearInterval(this._interval);
  }
  render() {
    const { tickers } = this.state;
    const { odd, even } = this.props;
    return <div><Tooltip style={style}>{tickers ? odd : even}</Tooltip></div>;
  }
}
export default TestTooltip;
