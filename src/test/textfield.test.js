import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import Button from '../components/Button';
import { InvalidIcon, Loader, Placeholder, ValidationWrapper } from '../components/Common';
import Icon from '../components/Icon';
import TextField from '../components/TextField';

it('renders the textfield', () => {
  const wrapper = shallow(<TextField />);
  expect(wrapper.find('div.input-textfield__component')).toHaveLength(1);
});

it('renders the textfield value', () => {
  const wrapper = shallow(<TextField value="test-value" />);
  expect(wrapper.find('input').prop('value')).toBe('test-value');
});

it('renders the placeholder', () => {
  const wrapper = shallow(<TextField placeholder="test-textfield" />);
  expect(wrapper.find(Placeholder)).toHaveLength(1);
  expect(wrapper.find(Placeholder).prop('label')).toBe('test-textfield');
});

it('renders the validation wrapper', () => {
  const wrapper = shallow(<TextField placeholder="test-Select" />);
  expect(wrapper.find(ValidationWrapper)).toHaveLength(1);
});

it('applies the prop className', () => {
  const wrapper = shallow(<TextField className="test" />);
  expect(wrapper.find('.test')).toHaveLength(1);
});

it('renders the prop id', () => {
  const wrapper = shallow(<TextField id="testTextFieldId" />);
  expect(wrapper.find('#testTextFieldId')).toHaveLength(1);
});

it('renders the disabled state', () => {
  const wrapper = shallow(<TextField disabled />);
  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('disabled')).toBe(true);
});

it('renders the icon', () => {
  const wrapper = mount(<TextField icon="deploy" />);
  expect(wrapper.find(Icon).prop('name')).toBe('deploy');
});

it('renders the pending state', () => {
  const wrapper = shallow(<TextField pending />);
  expect(wrapper.find(Loader)).toHaveLength(1);
});

it('renders the invalid state', () => {
  const wrapper = shallow(<TextField invalid />);
  expect(wrapper.find(InvalidIcon)).toHaveLength(1);
});

it('renders the required state', () => {
  const wrapper = shallow(<TextField required />);
  expect(wrapper.find('.mb-input--required')).toHaveLength(1);
});

it('renders the large, medium, small sizes', () => {
  const sizes = {
    large: 'l',
    medium: 'm',
    small: 's',
  };
  Object.entries(sizes).forEach(([name, size]) => {
    const wrapper = shallow(<TextField size={size} />);
    const className = `mb-input--${name}`;
    expect(wrapper.find('.mb-input').hasClass(className)).toBeTruthy();
  });
});

it('renders the password kind and clicks the toggle icon', () => {
  const wrapper = mount(<TextField type="password" />);
  expect(wrapper.find(Icon)).toHaveLength(1);
  expect(wrapper.find(Icon).prop('name')).toBe('toggle-visible');
  expect(wrapper.find('input').prop('type')).toBe('password');
  wrapper.find(Icon).simulate('click');
  expect(wrapper.find(Icon).prop('name')).toBe('toggle-invisible');
  expect(wrapper.find('input').prop('type')).toBe('text');
});

it('renders the number kind', () => {
  const wrapper = mount(<TextField type="number" />);
  expect(wrapper.find('input').prop('type')).toBe('number');
});

it('renders the inner button', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<TextField onButtonClick={mockEvent} buttonText="inner-button-text" />);
  expect(wrapper.find(Button).text()).toBe('inner-button-text');
});

it('renders the inner button disabled', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(
    <TextField onButtonClick={mockEvent} buttonText="inner-button-text" buttonDisabled />,
  );
  expect(wrapper.find(Button).prop('disabled')).toBe(true);
});

it('renders the inner button with kind', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(
    <TextField onButtonClick={mockEvent} buttonText="inner-button-text" buttonKind="secondary" />,
  );
  expect(wrapper.find(Button).prop('kind')).toBe('secondary');
});

it('renders and clicks the inner button', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<TextField onButtonClick={mockEvent} buttonText="inner-button-text" />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find(Button).simulate('click');
  expect(mockEvent).toHaveBeenCalled();
});

it('triggers onfocus when focused', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<TextField onFocus={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('input').simulate('focus');
  expect(mockEvent).toHaveBeenCalled();
});

it('triggers onBlur when blurred', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<TextField onBlur={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('input').simulate('blur');
  expect(mockEvent).toHaveBeenCalled();
});

it('triggers onChange when changed', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<TextField onChange={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('input').simulate('change', { target: {value : 'test'}});
  expect(mockEvent).toHaveBeenCalledWith('test');
});

it('triggers onChange with a number value when prop type is number', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<TextField onChange={mockEvent} type="number" />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('input').simulate('change', { target: { value: '12' } });
  expect(mockEvent).toHaveBeenCalledWith(12);
});

describe('tests the textfield cards', () => {

  it('identifies the cardable cards of a given value automatically', () => {
    const wrapper = mount(<TextField value="[test]value" tokenDelimiters="[]" />);
    const tokens = wrapper.state('tokens');
    const [token] = tokens;
    expect(tokens).toHaveLength(1);
    expect(token.isCardable).toBe(true);
    expect(token.isPartiallyCardable).toBe(false);
    expect(token.word).toBe('[test]');
  });

  it('identifies the partially cards of a given value automatically', () => {
    const wrapper = mount(<TextField value="[partial[test]value" tokenDelimiters="[]" />);
    const tokens = wrapper.state('tokens');
    const [partial, token] = tokens;
    expect(tokens).toHaveLength(2);
    expect(partial.isCardable).toBe(false);
    expect(partial.isPartiallyCardable).toBe(true);
    expect(partial.word).toBe('[partial');
    expect(token.isCardable).toBe(true);
    expect(token.isPartiallyCardable).toBe(false);
    expect(token.word).toBe('[test]');
  });

  it('identifies the escaped cards of a given value automatically', () => {
    const wrapper = mount(<TextField value="\[test]value" tokenDelimiters="[]" />);
    const tokens = wrapper.state('tokens');
    expect(tokens).toHaveLength(0);
  });

  it('renders the ValueTokens components', () => {
    const tokensResult = [
      {
        value: 'test',
        available: true,
        replaced: 'I was a value',
      },
      {
        value: 'missing',
        available: false,
        replaced: '',
      },
    ];
    const wrapper = mount(
      <TextField value="[test][missing]foobar" tokenDelimiters="[]" tokens={tokensResult} />,
    );
    const ValueTokens = wrapper.find('ValueToken');
    const Test = ValueTokens.at(0);
    const Missing = ValueTokens.at(1);

    expect(ValueTokens).toHaveLength(2);
    expect(Test.prop('isCardable')).toBe(true);
    expect(Test.prop('isInvalid')).toBe(false);
    expect(Test.prop('isSelected')).toBe(false);
    expect(Test.prop('word')).toBe('[test]');
    expect(Missing.prop('isCardable')).toBe(true);
    expect(Missing.prop('isInvalid')).toBe(true);
    expect(Missing.prop('isSelected')).toBe(false);
    expect(Missing.prop('word')).toBe('[missing]');
  });
});

// Snapshot
it('renders the textfield correctly when multiple props are set', () => {
  const wrapper = shallow(<TextField value="test-value" id="test-id" />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
