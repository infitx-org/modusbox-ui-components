/* eslint no-console: "off" */
import React from 'react';

import { Tab, TabList, TabPanel, TabPanels, Tabs } from './Tabs';
import Column from '../Column';

export default {
  title: 'Tabs',
  component: Tabs,
};

export const Default = () => (
  <div>
    <Tabs>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel> Tab Content 1 </TabPanel>
        <TabPanel> Tab Content 2 </TabPanel>
        <TabPanel> Tab Content 3 </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
);

export const WithTabDisabled = () => (
  <div>
    <Tabs>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
        <Tab disabled>Tab 4 disabled</Tab>
      </TabList>
      <TabPanels>
        <TabPanel> Tab Content 1 </TabPanel>
        <TabPanel> Tab Content 2 </TabPanel>
        <TabPanel> Tab Content 3 </TabPanel>
        <TabPanel> Tab Content 4 </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
);

export const WithTabStyle = () => (
  <div>
    <Tabs>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab style={{ width: '300px', background: '#def', fontWeight: 'bold' }}>Tab 3 Styled</Tab>
        <Tab>Tab 4</Tab>
      </TabList>
      <TabPanels>
        <TabPanel> Tab Content 1 </TabPanel>
        <TabPanel> Tab Content 2 </TabPanel>
        <TabPanel> Tab Content 3 </TabPanel>
        <TabPanel> Tab Content 4 </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
);

const flexTabPanelStyle = {
  background: '#def',
  alignItems: 'center',
  justifyContent: 'center',
};

export const Flexible = () => (
  <Column style={{ height: '200px', background: '#f8f8f8' }}>
    <Tabs flex>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel style={flexTabPanelStyle}> Tab Content 1 </TabPanel>
        <TabPanel style={flexTabPanelStyle}> Tab Content 2 </TabPanel>
        <TabPanel style={flexTabPanelStyle}> Tab Content 3 </TabPanel>
      </TabPanels>
    </Tabs>
  </Column>
);

export const SingleTabFlexible = () => (
  <Column style={{ height: '200px', background: '#f8f8f8' }}>
    <Tabs>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel flex style={flexTabPanelStyle}>
          {' '}
          Flexible Tab Content 1{' '}
        </TabPanel>
        <TabPanel style={flexTabPanelStyle}> Tab Content 2 </TabPanel>
        <TabPanel style={flexTabPanelStyle}> Tab Content 3 </TabPanel>
      </TabPanels>
    </Tabs>
  </Column>
);
