import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ContentReader from '../components/ContentReader';

// Shallow render, no sub-components ( still available children html)
const jsonObject = [{ name: 'test-name', value: 'test-value' }];
const jsonString = JSON.stringify(jsonObject);
const xmlString = `<note><to>Tove</to><from>Jani</from><xyz>test</xyz><body>test</body></note>`;
const shellString = `$ echo $EDITOR
                      vim
                      $ git checkout master
                      Switched to branch 'master'
                      Your branch is up-to-date with 'origin/master'.
                      $ git push
                      Everything up-to-date
                      `;

it('renders the component', () => {
  const wrapper = mount(<ContentReader data={jsonString} />);
  expect(wrapper.find('.content-reader').exists()).toBe(true);
});

it('generates the correct line count', () => {
  const wrapper = mount(<ContentReader data={jsonString} />);
  expect(wrapper.find('.content-reader__lines__line-n')).toHaveLength(6);
});

it('applies the correct json className', async () => {
  const wrapper = mount(<ContentReader data={jsonString} />);
  const classNames = wrapper
    .find('.content-reader__content')
    .find('code')
    .getDOMNode()
    .className
    .split(' ');

  expect(classNames.includes('hljs')).toBe(true);
  expect(classNames.includes('json')).toBe(true);
});

it('applies the correct xml className', async () => {
  const wrapper = mount(<ContentReader data={xmlString} />);
  const classNames = wrapper
    .find('.content-reader__content')
    .find('code')
    .getDOMNode()
    .className
    .split(' ');

  expect(classNames.includes('hljs')).toBe(true);
  expect(classNames.includes('xml')).toBe(true);
});

it('applies the correct shell className', async () => {
  const wrapper = mount(<ContentReader data={shellString} />);
  const classNames = wrapper
    .find('.content-reader__content')
    .find('code')
    .getDOMNode()
    .className
    .split(' ');

  expect(classNames.includes('hljs')).toBe(true);
  expect(classNames.includes('shell')).toBe(true);
});


it('renders the ContentReader correctly when multiple props are set', () => {
  const wrapper = mount(<ContentReader data={shellString} />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
