import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import loremIpsum from 'lorem-ipsum';
import ScrollBox from '../../components/ScrollBox';

const Content = ({ color }) => (
  <div
    style={{
      background: '#fc9',
      height: '400px',
      padding: '20px',
      fontSize: '12px',
      color,
    }}
  >
    {loremIpsum({
      count: 1,
      units: 'paragraphs',
      paragraphLowerBound: 10,
      paragraphUpperBound: 20,
    })}
  </div>
);

const TestScrollBox = () => (
  <div style={{ padding: '10px' }}>
    <ScrollBox style={{ height: '100px', marginBottom: '10px' }}>
      <Content color="white" />
    </ScrollBox>

    <ScrollBox style={{ height: '200px', marginBottom: '10px' }}>
      <Content color="red" />
    </ScrollBox>

    <ScrollBox style={{ height: '300px', marginBottom: '10px' }}>
      <Content color="white" />
    </ScrollBox>
  </div>
);

export default TestScrollBox;
