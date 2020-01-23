import React from 'react';

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '../../../components/Tabs';

import ComplexDataList from './ComplexDataList';
import NonCheckableDataList from './NonCheckableDataList';
import CheckableDataList from './CheckableDataList';
import ModalDataList from './ModalDataList';
import TestDataList from './TestDataList';

const ExportableTestDataList = () => (
  <Tabs flex  selected={4}>
    <TabList style={{ width: '500px' }}>
      <Tab>Complex multi props</Tab>
      <Tab>Modal</Tab>
      <Tab>Checkable</Tab>
      <Tab>Non Checkable</Tab>
      <Tab>Test</Tab>
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
      <TabPanel>
        <TestDataList />
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export default ExportableTestDataList;
