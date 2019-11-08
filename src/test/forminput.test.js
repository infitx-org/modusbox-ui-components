import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import FormInput from '../components/FormInputs';

//   name: undefined,
//   onClick: undefined,
//   onInlineButtonClick: undefined,
//   transformUpdate: undefined, <<<< should become onTransformUpdate ?

//   type: 'text',
//   validation: undefined,
//   options: undefined,
//   transformValue: undefined, <<<<
//   allowEmpty: false,
//   subgroup: undefined <<<<< ,
//   autofocus: false,
//   format: undefined,
//   dateFormat: undefined,
//   parseFileAsText: undefined,
//   fileType: undefined,
//   fileName: undefined,

//   className: undefined,
//   style: undefined,
//   elementWidth: undefined,
//   rowWidth: '100%',

it('renders the forminput with all sub components', () => {
  const wrapper = shallow(<FormInput type="text" label="test-label" value="test-value" />);
  expect(wrapper.find('Label').exists()).toBe(true);
  expect(wrapper.find('TextField').exists()).toBe(true);
  expect(wrapper.find('InfoMessage').exists()).toBe(true);
  expect(wrapper.find('LockedIcon').exists()).toBe(true);
});

it('does not render anything if hidden prop is true', () => {
  const wrapper = shallow(<FormInput type="text" label="test-label" value="test-value" hidden />);
  expect(wrapper.find('Label').exists()).toBe(false);
  expect(wrapper.find('TextField').exists()).toBe(false);
  expect(wrapper.find('InfoMessage').exists()).toBe(false);
  expect(wrapper.find('LockedIcon').exists()).toBe(false);
});

it('renders the label prop', () => {
  const wrapper = mount(<FormInput type="text" label="test-label" value="test-value" />);
  expect(wrapper.find('Label').text()).toBe('test-label');
});

it('renders the value prop', () => {
  const wrapper = mount(<FormInput type="text" value="test-value" />);
  expect(wrapper.find('TextField').prop('value')).toBe('test-value');
});

it('renders the required prop in the input if value is unset', () => {
  const wrapper = mount(<FormInput type="text" value={undefined} required />);
  expect(wrapper.find('TextField').prop('required')).toBe(true);
});

it('does not render the required in the input prop if value is set', () => {
  const wrapper = mount(<FormInput type="text" value="test" required />);
  expect(wrapper.find('TextField').prop('required')).toBe(false);
});

it('renders the required prop in the label if value is unset', () => {
  const wrapper = mount(<FormInput type="text" label="test-label" value={undefined} required />);
  expect(wrapper.find('Label').prop('required')).toBe(true);
});

it('does not render the required/complete in the label prop if value is set', () => {
  const wrapper = mount(<FormInput type="text" label="test-label" value="test" required />);
  expect(wrapper.find('Label').prop('required')).toBe(true);
  expect(wrapper.find('Label').prop('complete')).toBe(true);
});

it('renders the invalid prop if errorVisibility prop is unset', () => {
  const wrapper = mount(<FormInput type="text" label="test-label" invalid />);
  expect(wrapper.find('TextField').prop('invalid')).toBe(true);
});

it('renders the invalid prop if errorVisibility prop is true', () => {
  const wrapper = mount(<FormInput type="text" label="test-label" errorVisibility invalid />);
  expect(wrapper.find('TextField').prop('invalid')).toBe(true);
});

it('does not render the invalid prop if errorVisibility is true', () => {
  const wrapper = mount(
    <FormInput type="text" label="test-label" errorVisibility={false} invalid />,
  );
  expect(wrapper.find('TextField').prop('invalid')).toBe(false);
});

it('renders the disabled prop in the input', () => {
  const wrapper = mount(<FormInput type="text" value={undefined} disabled />);
  expect(wrapper.find('TextField').prop('disabled')).toBe(true);
});

it('renders the disabled prop in the input when pending', () => {
  const wrapper = mount(<FormInput type="text" value={undefined} pending />);
  expect(wrapper.find('TextField').prop('disabled')).toBe(true);
});

it('renders the pending prop in the input', () => {
  const wrapper = mount(<FormInput type="text" value={undefined} pending />);
  expect(wrapper.find('TextField').prop('pending')).toBe(true);
});

it('renders the locked prop if the lockedVisibility prop is true', () => {
  const wrapper = mount(<FormInput type="text" message="test-message" messageVisibility />);
  expect(wrapper.find('InfoMessage').text()).toBe('test-message');
});

it('does not render the message prop if the messageVisibility prop is unset', () => {
  const wrapper = mount(<FormInput type="text" message="test-message" />);
  expect(wrapper.find('InfoMessage').text()).not.toBe('test-message');
});

it('does not render the message prop if the messageVisibility prop is false', () => {
  const wrapper = mount(<FormInput type="text" message="test-message" messageVisibility={false} />);
  expect(wrapper.find('InfoMessage').text()).not.toBe('test-message');
});

it('renders the locked icon if locked prop is true', () => {
  const wrapper = mount(<FormInput type="text" locked />);
  expect(
    wrapper
      .find('LockedIcon')
      .find('Icon')
      .exists(),
  ).toBe(true);
});

it('does not render the locked icon if locked prop is unset', () => {
  const wrapper = mount(<FormInput type="text" locked={false} />);
  expect(
    wrapper
      .find('LockedIcon')
      .find('Icon')
      .exists(),
  ).toBe(false);
});

it('does not render the locked icon if locked prop is false', () => {
  const wrapper = mount(<FormInput type="text" locked={false} />);
  expect(
    wrapper
      .find('LockedIcon')
      .find('Icon')
      .exists(),
  ).toBe(false);
});

it('renders the inline button', () => {
  const wrapper = mount(<FormInput type="text" inlineButtonLabel="inline" />);
  expect(wrapper.find('InlineButton').exists()).toBe(true);
  expect(wrapper.find('InlineButton').prop('label')).toBe('inline');
});

it('triggers the onChange', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<FormInput type="text" onChange={mockEvent} />);
  wrapper.find('input[type="text"]').simulate('change');
  expect(mockEvent).toHaveBeenCalled();
});

// it('triggers the onClick on the picker only', () => {
//   const mockEvent = jest.fn();
//   const wrapper = mount(<FormInput type="picker" onClick={mockEvent} />);
//   wrapper.find('.input-textfield__content').simulate('click');
//   expect(mockEvent).toHaveBeenCalled();
// });

it('triggers the onInlineButtonClick on the inline button', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<FormInput type="text" onInlineButtonClick={mockEvent} />);
  wrapper.find('InlineButton').simulate('click');
  expect(mockEvent).toHaveBeenCalled();
});
