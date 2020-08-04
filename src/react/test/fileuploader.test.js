import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import { InvalidIcon, Loader, Placeholder, ValidationWrapper } from '../components/Common';
import FileUploader from '../components/FileUploader';

it('renders the fileuploader', () => {
  const wrapper = shallow(<FileUploader />);
  expect(wrapper.find('div.input-fileuploader__component')).toHaveLength(1);
});

it('renders the filuploader value', () => {
  const wrapper = shallow(<FileUploader />);
  expect(wrapper.find('.input-fileuploader__filename').text()).toBe('No File Chosen');
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

// Snapshot

it('renders the fileuploader correctly when multiple props are set', () => {
  const wrapper = shallow(<FileUploader id="test-id" />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
