import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Select from '../components/Select';
import Options from '../components/Select/Options';

import { Loader, Placeholder, Validation } from '../components/Common';

const options = new Array(100).fill().map((item, index) => ({
  label: `label-${index}`,
  value: `value-${index}`,
}));

const toSelectOptions = items => items.map(item => ({ value: `${item}`, label: `${item}`}));

it('renders the Select', () => {
  const wrapper = shallow(<Select />);
  expect(wrapper.find('div.input-select')).toHaveLength(1);
});

it('renders the Select label for given value when option exists', () => {
  const wrapper = shallow(<Select selected="value-1" options={options} />);
  expect(wrapper.find('input[type="text"]').prop('value')).toBe('label-1');
});

it('renders empty label for given value when option does not exists', () => {
  const wrapper = shallow(<Select selected="value-1000" options={options} />);
  expect(wrapper.find('input[type="text"]').prop('value')).toBe('');
});

it('renders the placeholder', () => {
  const wrapper = shallow(<Select placeholder="test-Select" />);
  expect(wrapper.find(Placeholder)).toHaveLength(1);
  expect(wrapper.find(Placeholder).prop('label')).toBe('test-Select');
});

it('applies the prop className', () => {
  const wrapper = shallow(<Select className="test" />);
  expect(wrapper.find('.test')).toHaveLength(1);
});

it('renders the prop id', () => {
  const wrapper = shallow(<Select id="testSelectId" />);
  expect(wrapper.find('#testSelectId')).toHaveLength(1);
});

it('renders the disabled state', () => {
  const wrapper = shallow(<Select disabled />);
  expect(wrapper.find('input[type="text"]').prop('disabled')).toBe(true);
});

it('renders the pending state', () => {
  const wrapper = shallow(<Select pending />);
  expect(wrapper.find(Loader)).toHaveLength(1);
});

it('renders the invalid state', () => {
  const wrapper = shallow(<Select invalid />);
  expect(wrapper.find(Validation)).toHaveLength(1);
});

it('renders the required state', () => {
  const wrapper = shallow(<Select required />);
  expect(wrapper.find('.mb-input--required')).toHaveLength(1);
});

it('renders the large, medium, small sizes', () => {
  const sizes = {
    large: 'l',
    medium: 'm',
    small: 's',
  };
  Object.entries(sizes).forEach(([name, size]) => {
    const wrapper = shallow(<Select size={size} />);
    const className = `mb-input--${name}`;
    expect(wrapper.find('.mb-input').hasClass(className)).toBeTruthy();
  });
});

it('renders the correct size for the clear option', () => {
  const sizes = {
    large: 'l',
    medium: 'm',
    small: 's',
  };
  Object.entries(sizes).forEach(([name, size]) => {
    const mockEvent = jest.fn();
    const wrapper = mount(
      <Select
        onClear={mockEvent}
        size={size}
        options={[{ label: 'l', value: 'x' }]}
        selected="x"
      />,
    );
    wrapper.find('input[type="text"]').simulate('click');
    const className = `input-select__options-item--${name}`;
    expect(wrapper.find('.input-select__options-item--clear').hasClass(className)).toBeTruthy();
  });
});

it('sorts the options by value ascending', () => {
  const reverseOptions = [...options].reverse();
  const wrapper = mount(<Select selected="value-1" options={reverseOptions} sortBy="value" />);
  expect(wrapper.state().options[0]).toBe(options[0]);
});

it('sorts the options by value descending', () => {
  const wrapper = mount(<Select selected="value-1" options={options} sortBy="value" sortAsc={false} />);
  const lastOption = options[ options.length - 1];
  expect(wrapper.state().options[0]).toBe(lastOption);
});

it('sorts the options by label', () => {
  const unsortedOptions = toSelectOptions([1,9,2,8,5]);
  const wrapper = mount(<Select selected="value-1" options={unsortedOptions} sortBy="label" />);
  expect(wrapper.state().options[0].label).toBe('1');
});

it('sorts the options by disabled', () => {
  const unsortedOptions = toSelectOptions([1,9,2,8,5]);
  unsortedOptions[2].disabled = true;
  unsortedOptions[4].disabled = true;
  const wrapper = mount(<Select selected="value-1" options={unsortedOptions} sortBy="disabled" />);
  expect(wrapper.state().options[0].disabled).toBe(true);
  expect(wrapper.state().options[1].disabled).toBe(true);
});

it('renders the options when focused', () => {
  const wrapper = mount(<Select options={options} />);
  wrapper.find('input[type="text"]').simulate('click');
  expect(wrapper.find(Options)).toHaveLength(1);
  expect(wrapper.find('.input-select__options-item')).toHaveLength(100);
});

it('selects a value when clicking an option', () => {
  const wrapper = mount(<Select options={options} />);
  wrapper.find('input[type="text"]').simulate('click');
  wrapper
    .find('.input-select__options-item')
    .at(50)
    .simulate('click');
  expect(wrapper.find('input[type="text"]').prop('value')).toBe('label-50');
});

it('renders the clear option', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<Select onClear={mockEvent} options={options} />);

  wrapper.find('input[type="text"]').simulate('click');
  const clearOptionBeforeSelection = wrapper.find('.input-select__options-item--clear');

  wrapper
    .find('.input-select__options-item')
    .at(50)
    .simulate('click');

  wrapper.find('input[type="text"]').simulate('click');
  const clearOptionAfterSelection = wrapper.find('.input-select__options-item--clear');

  expect(clearOptionBeforeSelection.exists()).toEqual(false);
  expect(clearOptionAfterSelection.exists()).toEqual(true);
});

it('clears the selected option when clear option is clicked', () => {
  const clearMockEvent = jest.fn();
  const wrapper = mount(<Select onClear={clearMockEvent} options={options} />);

  wrapper.find('input[type="text"]').simulate('click');
  wrapper
    .find('.input-select__options-item')
    .at(50)
    .simulate('click');

  const selectedValueBeforeClear = wrapper.find('input[type="text"]').prop('value');

  wrapper.find('input[type="text"]').simulate('click');
  wrapper.find('.input-select__options-item--clear').simulate('click');

  const selectedValueAfterClear = wrapper.find('input[type="text"]').prop('value');

  expect(selectedValueBeforeClear).toBe('label-50');
  expect(selectedValueAfterClear).toBe('');
  expect(clearMockEvent).toHaveBeenCalled();
});

it('triggers onFocus when focused', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<Select onFocus={mockEvent} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('input[type="text"]').simulate('focus');
  expect(mockEvent).toHaveBeenCalled();
});

it('triggers onBlur when selecting a value', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<Select onBlur={mockEvent} options={options} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('input[type="text"]').simulate('click');
  wrapper
    .find('.input-select__options-item')
    .at(50)
    .simulate('click');
  expect(mockEvent).toHaveBeenCalled();
});

it('triggers onChange when selecting value', () => {
  const mockEvent = jest.fn();
  const wrapper = mount(<Select onChange={mockEvent} options={options} />);
  expect(mockEvent).not.toHaveBeenCalled();
  wrapper.find('input[type="text"]').simulate('click');
  wrapper
    .find('.input-select__options-item')
    .at(50)
    .simulate('click');
  expect(mockEvent).toHaveBeenCalledWith('value-50');
});

it('automatically highlights the selected option', () => {
  const mockEvent = jest.fn();
  const selected = options[2].value;
  const wrapper = mount(<Select onChange={mockEvent} options={options} selected={selected} />);
  expect(wrapper.state('highlightedOption')).toEqual(selected);
});

it('renders the highlighted option properly', () => {
  const selectedOption = options[2];
  const wrapper = mount(<Select options={options} selected={selectedOption.value} />);
  wrapper.find('input[type="text"]').simulate('click');
  const option = wrapper.find('.input-select__options-item--highlighted');
  expect(option.text()).toEqual(selectedOption.label);
});

it('highlights the next option when pressing arrow down', () => {
  const mockEvent = jest.fn();
  const selected = options[2].value;
  const next = options[3].value;
  const wrapper = mount(<Select onChange={mockEvent} options={options} selected={selected} />);
  wrapper.find('input[type="text"]').simulate('click');
  wrapper.find('input[type="text"]').simulate('keydown', { keyCode: 40 });
  expect(wrapper.state('highlightedOption')).toEqual(next);
});

it('highlights the previous option when pressing arrow up', () => {
  const mockEvent = jest.fn();
  const selected = options[2].value;
  const prev = options[1].value;
  const wrapper = mount(<Select onChange={mockEvent} options={options} selected={selected} />);
  wrapper.find('input[type="text"]').simulate('click');
  wrapper.find('input[type="text"]').simulate('keydown', { keyCode: 38 });
  expect(wrapper.state('highlightedOption')).toEqual(prev);
});

describe('Tests highlighiting with filtering', () => {
  let wrapper;
  const testOptions = [11, 22, 23, 24, 25].map(v => ({
    label: v.toString(),
    value: v,
    disabled: v % 2 === 0,
  }));

  beforeEach(() => {
    const mockEvent = jest.fn();
    wrapper = mount(<Select onChange={mockEvent} options={testOptions} />);
    wrapper.find('input[type="text"]').simulate('click');
  });

  it('highlights the correct option when pressing arrow down once', () => {
    wrapper.find('input[type="text"]').simulate('keydown', { keyCode: 40 });
    expect(wrapper.state('highlightedOption')).toEqual(11);
  });

  it('highlights the last available option when pressing arrow up once on filtered items', () => {
    wrapper.find('input[type="text"]').simulate('keydown', { keyCode: 38 });
    expect(wrapper.state('highlightedOption')).toEqual(25);
  });

  it('highlights the next available option when pressing arrow down once on filtered items', () => {
    wrapper
      .find('input[type="text"]')
      .simulate('change', { target: { value: '2' } })
      .simulate('keydown', { keyCode: 40 });
    expect(wrapper.state('highlightedOption')).toEqual(23);
  });

  it('highlights the previous available option when pressing arrow up twice on filtered items', () => {
    wrapper
      .find('input[type="text"]')
      .simulate('change', { target: { value: '2' } })
      .simulate('keydown', { keyCode: 38 })
      .simulate('keydown', { keyCode: 38 });
    expect(wrapper.state('highlightedOption')).toEqual(23);
  });

});

it('renders the Select correctly when multiple props are set', () => {
  const wrapper = shallow(<Select value="value-1" id="test-id" options={options} />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
