import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import FileUploader from '../components/FileUploader';
import { Loader, Placeholder, ValidationWrapper, InvalidIcon } from '../components/Common';

it('renders the fileuploader', () => {
  const wrapper = shallow(<FileUploader />);
  expect(wrapper.find('div.input-fileuploader__component')).toHaveLength(1);
});

it('renders the filuploader value', () => {
  const wrapper = shallow(<FileUploader />);
  expect(wrapper.find('.input-fileuploader__filename').text()).toBe('No File Choosen');
});

it('renders the placeholder', () => {
  const wrapper = shallow(<FileUploader placeholder="test-fileuploader" />);
  expect(wrapper.find(Placeholder)).toHaveLength(1);
  expect(wrapper.find(Placeholder).prop('label')).toBe('test-fileuploader');
});

it('renders the validation wrapper', () => {
  const wrapper = shallow(<FileUploader placeholder="test-Select" />);
  expect(wrapper.find(ValidationWrapper)).toHaveLength(1);
});

it('applies the prop className', () => {
  const wrapper = shallow(<FileUploader className="test" />);
  expect(wrapper.find('.test')).toHaveLength(1);
});

it('renders the prop id', () => {
  const wrapper = shallow(<FileUploader id="testFileUploaderId" />);
  expect(wrapper.find('#testFileUploaderId')).toHaveLength(1);
});

it('renders the disabled state', () => {
  const wrapper = shallow(<FileUploader disabled />);
  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('disabled')).toBe(true);
});

it('renders the pending state', () => {
  const wrapper = shallow(<FileUploader pending />);
  expect(wrapper.find(Loader)).toHaveLength(1);
});

it('renders the invalid state', () => {
  const wrapper = shallow(<FileUploader invalid />);
  expect(wrapper.find(InvalidIcon)).toHaveLength(1);
});

it('renders the required state', () => {
  const wrapper = shallow(<FileUploader required />);
  expect(wrapper.find('.mb-input--required')).toHaveLength(1);
});

it('renders the large, medium, small sizes', () => {
  const sizes = {
    large: 'l',
    medium: 'm',
    small: 's',
  };
  Object.entries(sizes).forEach(([name, size]) => {
    const wrapper = shallow(<FileUploader size={size} />);
    const className = `mb-input--${name}`;
    expect(wrapper.find('.mb-input').hasClass(className)).toBeTruthy();
  });
});

// Events

it('renders the add button as "active" when focused', () => {
  const wrapper = mount(<FileUploader />);
  expect(
    wrapper
      .find('button.input-fileuploader__button-add')
      .hasClass('mb-input__inner-button--active'),
  ).toBe(false);
  wrapper.find('input').simulate('focus');
  expect(
    wrapper
      .find('button.input-fileuploader__button-add')
      .hasClass('mb-input__inner-button--active'),
  ).toBe(true);
});

// Snapshot

it('renders the fileuploader correctly when multiple props are set', () => {
  const wrapper = shallow(<FileUploader id="test-id" />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
