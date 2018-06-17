import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Menu, { MenuItem, MenuSection } from '../components/Menu';

const onChangeMockEvent = jest.fn();

it('renders only the menu', () => {
  const wrapper = mount(<Menu path='/' pathname='/' onChange={onChangeMockEvent} />);
  expect(wrapper.find('.element-menu')).toHaveLength(1);
});

it('renders the menu wrapper also if pathname does not match any route', () => {
  const wrapper = mount(<Menu path='/' pathname='/test' onChange={onChangeMockEvent} />);
  expect(wrapper.find('.element-menu')).toHaveLength(1);
});

it('renders the menu items if parent root matches', () => {
  const wrapper = mount(
    <Menu path='/' pathname='/' onChange={onChangeMockEvent}>
      <MenuItem path='/foo' label='foo'/>
      <MenuItem path='/bar' label='bar'/>
    </Menu>
  );
  expect(wrapper.find('.element-menu__item')).toHaveLength(2);
});

it('renders the menu items if child route matches', () => {
  const wrapper = mount(
    <Menu path='/' pathname='/foo' onChange={onChangeMockEvent}>
      <MenuItem path='/foo' label='foo'/>
      <MenuItem path='/bar' label='bar'/>
    </Menu>
  );
  expect(wrapper.find('.element-menu__item')).toHaveLength(2);
});

it('does not render the menu items if no route matches', () => {
  const wrapper = mount(
    <Menu path='/' pathname='/non-existing' onChange={onChangeMockEvent}>
      <MenuItem path='/foo' label='foo'/>
      <MenuItem path='/bar' label='bar'/>
    </Menu>
  );
  expect(wrapper.find('.element-menu__item')).toHaveLength(0);
});

it('renders the nested child when asRoot prop is set and route matches parent', () => {
  const wrapper = mount(
    <Menu path='/' pathname='/foo' onChange={onChangeMockEvent}>
      <MenuItem path='/foo' label='foo' asRoot>
        <MenuItem path='/foo/nested' label='nested'/>
      </MenuItem>
      <MenuItem path='/bar' label='bar'/>
    </Menu>
  );
  const menuItem = wrapper.find('.element-menu__item');
  expect(menuItem).toHaveLength(1);
  expect(menuItem.text()).toBe('nested');
  expect(wrapper.find('.element-menu__item')).toHaveLength(1);
});

it('renders the parent child if asRoot prop is not set and route matches parent', () => {
  const wrapper = mount(
    <Menu path='/' pathname='/foo' onChange={onChangeMockEvent}>
      <MenuItem path='/foo' label='foo'>
        <MenuItem path='/foo/nested' label='nested'/>
      </MenuItem>
      <MenuItem path='/bar' label='bar'/>
    </Menu>
  );
  const menuItems = wrapper.find('.element-menu__item');
  expect(menuItems).toHaveLength(2);
  expect(wrapper.find('.element-menu__item')).toHaveLength(2);
  expect(menuItems.at(0).text()).toBe('foo');
  expect(menuItems.at(1).text()).toBe('bar');
});

it('renders the nested child if matching if asRoot prop is not set ', () => {
  const wrapper = mount(
    <Menu path='/' pathname='/1st/2nd/3rd/4th' onChange={onChangeMockEvent}>
      <MenuItem path='/1st' label='1st Level'>
        <MenuItem path='/1st/2nd' label='2st level'>
          <MenuItem path='/1st/2nd/3rd' label='3nd level'>
            <MenuItem path='/1st/2nd/3rd/4th' label='4th level'/>
          </MenuItem>
        </MenuItem>
      </MenuItem>
    </Menu>
  );  
  
  const menuItem = wrapper.find('.element-menu__item');
  expect(menuItem).toHaveLength(1);
  expect(menuItem.text()).toBe('4th level');  
});

it('renders the menu section if parent root matches', () => {
  const wrapper = mount(
    <Menu path='/' pathname='/' onChange={onChangeMockEvent}>
      <MenuSection label='Menu Section'>
        <MenuItem path='/foo' label='foo'/>
        <MenuItem path='/bar' label='bar'/>
      </MenuSection>
    </Menu>
  );
  const menuSection = wrapper.find('.element-menu__section');
  const menuSectionLabel = menuSection.find('.element-menu__section-label');
  expect(menuSectionLabel).toHaveLength(1);  
  expect(menuSectionLabel.text()).toBe('Menu Section');
});

it('trigger onChange when clicking a menu item', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(
    <Menu path='/' pathname='/' onChange={mockEvent}>
      <MenuItem path='/foo' label='foo'/>
      <MenuItem path='/bar' label='bar'/>
    </Menu>
  );
  const menuItems = wrapper.find('.element-menu__item');  
  menuItems.at(0).simulate('click');
  expect(mockEvent).toHaveBeenCalled();
});

it('trigger onChange with correct value when clicking a menu item', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(
    <Menu path='/' pathname='/' onChange={mockEvent}>
      <MenuItem path='/foo' label='foo'/>
      <MenuItem path='/bar' label='bar'/>
    </Menu>
  );
  const menuItems = wrapper.find('.element-menu__item');  
  menuItems.at(1).simulate('click');
  expect(mockEvent).toHaveBeenCalledWith('/bar');
});