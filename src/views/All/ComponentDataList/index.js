import React from 'react';

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '../../../components/Tabs';

import ComplexDataList from './ComplexDataList';
import NonCheckableDataList from './NonCheckableDataList';
import CheckableDataList from './CheckableDataList';
import ModalDataList from './ModalDataList';


const TestDataList = () => (
  <Tabs flex>
    <TabList style={{ width: '500px' }}>
      <Tab>Complex multi props</Tab>
      <Tab>Modal</Tab>
      <Tab>Checkable</Tab>
      <Tab>Non Checkable</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <ComplexDataList />
      </TabPanel>
      <TabPanel>
        <ModalDataList />
      </TabPanel>
      <TabPanel>
        <CheckableDataList />
      </TabPanel>
      <TabPanel>
        <NonCheckableDataList />
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export default TestDataList;
