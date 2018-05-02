import React from 'react';
import Column from '../../components/Column';
import Heading from '../../components/Heading';

const TestHeading = () => (
  <div>
    <Column style={{ padding: 10, margin: '5px 0px', border: '1px solid #ccc' }}>
      <Heading size="1"> Size 1 </Heading>
      <Heading size="2"> Size 2 </Heading>
      <Heading size="3"> Size 3 </Heading>
      <Heading size="4"> Size 4 </Heading>
      <Heading size="5"> Size 5 </Heading>
      <Heading size="6"> Size 6 </Heading>
    </Column>
  </div>
);

export default TestHeading;
