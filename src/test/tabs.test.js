import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { Tab, Tabs, TabList, TabPanel, TabPanels } from '../components/Tabs';

const TabComponents = (
  <Tabs id="test-tabs" flex>
    <TabList>
      <Tab>Tab1</Tab>
      <Tab>Tab2</Tab>
      <Tab>Tab3</Tab>
      <Tab disabled>Tab4</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>TabPanel1</TabPanel>
      <TabPanel>TabPanel2</TabPanel>
      <TabPanel>TabPanel3</TabPanel>
      <TabPanel>TabPanel4</TabPanel>
    </TabPanels>
  </Tabs>
);

it('renders the tabs', () => {
  const wrapper = mount(TabComponents);
  expect(wrapper.find('.element-tabs')).toBeTruthy();
});

it('renderd the prop id', () => {
  const wrapper = mount(TabComponents);
  expect(wrapper.find('#test-tabs')).toBeTruthy();
});

it('renderd the prop flex', () => {
  const wrapper = mount(TabComponents);
  expect(wrapper.find('.element-tabs--flexible')).toBeTruthy();
});

it('renders all the tab items', () => {
  const wrapper = mount(TabComponents);
  expect(wrapper.find(Tab)).toHaveLength(4);
});

it('renders only 1 tabpanel', () => {
  const wrapper = mount(TabComponents);
  expect(wrapper.find(TabPanel)).toHaveLength(1);
});

it('renders the first tabpanel content', () => {
  const wrapper = mount(TabComponents);
  expect(wrapper.find(TabPanel).text()).toBe('TabPanel1');
});

it('renders the first tabpanel content', () => {
  const wrapper = mount(TabComponents);
  expect(wrapper.find(TabPanel).text()).toBe('TabPanel1');
});

it('renders the second tabpanel content when second tab is clicked', () => {
  const wrapper = mount(TabComponents);
  wrapper
    .find(Tab)
    .at(1)
    .simulate('click');
  expect(wrapper.find(TabPanel).text()).toBe('TabPanel2');
});

it('does not renders the tabpanel of a disabled tab when clicked', () => {
  const wrapper = mount(TabComponents);
  wrapper
    .find(Tab)
    .at(3)
    .simulate('click');
  expect(wrapper.find(TabPanel).text()).not.toBe('TabPanel4');
});

it('triggers onSelect when clicking a different tab', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(
    <Tabs onSelect={mockEvent}>
      <TabList>
        <Tab>Tab1</Tab>
        <Tab>Tab2</Tab>
      </TabList>
    </Tabs>,
  );
  wrapper
    .find(Tab)
    .at(1)
    .simulate('click');
  expect(mockEvent).toHaveBeenCalled();
});

it('does not trigger onSelect when clicking a disabled tab', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(
    <Tabs onSelect={mockEvent}>
      <TabList>
        <Tab>Tab1</Tab>
        <Tab disabled>Tab2</Tab>
      </TabList>
    </Tabs>,
  );
  wrapper
    .find(Tab)
    .at(1)
    .simulate('click');
  expect(mockEvent).not.toHaveBeenCalled();
});

it('does not trigger onSelect when clicking the currently selected tab', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(
    <Tabs onSelect={mockEvent}>
      <TabList>
        <Tab>Tab1</Tab>
        <Tab>Tab2</Tab>
      </TabList>
    </Tabs>,
  );
  wrapper
    .find(Tab)
    .at(0)
    .simulate('click');
  expect(mockEvent).not.toHaveBeenCalled();
});

// Snapshot

it('renders the checkbox correctly when multiple props are set', () => {
  const wrapper = shallow(TabComponents);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
