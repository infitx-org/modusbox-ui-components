import React from 'react';

import Column from '../Column';
import Heading from './Heading';

export default {
  title: 'Heading',
  component: Heading,
};

export const Sizes = () => (
  <div>
    <Column>
      <Heading size="1"> Size 1 </Heading>
      <Heading size="2"> Size 2 </Heading>
      <Heading size="3"> Size 3 </Heading>
      <Heading size="4"> Size 4 </Heading>
      <Heading size="5"> Size 5 </Heading>
      <Heading size="6"> Size 6 </Heading>
    </Column>
  </div>
);
