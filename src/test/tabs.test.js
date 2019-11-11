import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '../components/Tabs';

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

it('does not renders the tabpanel when disabled by default disabled', () => {
  const wrapper = mount(
    <Tabs id="test-tabs" flex>
      <TabList>
        <Tab disabled>Tab1</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>TabPanel1</TabPanel>
      </TabPanels>
    </Tabs>,
  );
  expect(wrapper.find(TabPanel).exists()).toBe(false);
});

it('does not renders the tab as selected when it is the only one and disabled', () => {
  const wrapper = mount(
    <Tabs id="test-tabs" flex>
      <TabList>
        <Tab disabled>Tab1</Tab>
      </TabList>
    </Tabs>,
  );
  expect(wrapper.find(Tab).exists()).toBe(true);
  expect(wrapper.find(Tab).prop('disabled')).toBe(true);
  expect(wrapper.find(Tab).prop('selected')).toBe(false);
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
