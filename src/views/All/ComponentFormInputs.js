import React, { Component } from 'react';
import Heading from '../../components/Heading';
import FormInput, { FormInputs } from '../../components/FormInputs';
/* eslint-disable */

const model = {
  name: undefined,
  lastname: 'test-lastname',
  sex: 'unisex',
  age: 42,
};

const validation = undefined;
const ages = new Array(100).fill(0).map((_, index) => ({ label: index, value: index }));
const sexes = [
  {
    label: 'male',
    value: 'male',
  },
  {
    label: 'female',
    value: 'female',
  },
  {
    label: 'unisex',
    value: 'unisex',
  },
];

class Wrapped extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      model,
      validation,
    };
  }
  onChange(change) {
    console.log(change);
    this.setState({
      model: {
        ...this.state.model,
        [change.prop]: change.value,
      },
    });
  }
  render() {
    return (
      <div>
        <Heading>Wrapped</Heading>
        <FormInputs
          onChange={this.onChange}
          data={this.state.model}
          validation={this.state.validation}
          title="Form inputs title"
        >
          <FormInput type="text" label="name" name="name" required />
          <FormInput type="text" label="lastname" name="lastname" required />
          <FormInput type="select" label="age" name="age" options={ages} />
          <FormInput type="radio" label="sex" name="sex" options={sexes} />
        </FormInputs>
      </div>
    );
  }
}

class Unwrapped extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      model,
      validation,
    };
  }
  onChange(field) {
    return value => {
      console.log(value);
      this.setState({
        model: {
          ...this.state.model,
          [field]: value,
        },
      });
    };
  }
  render() {
    return (
      <div>
        <Heading>Non Wrapped</Heading>
        <FormInput
          onChange={this.onChange('name')}
          value={this.state.model.name}
          type="text"
          label="name"
          name="name"
          required
        />
        <FormInput
          onChange={this.onChange('lastname')}
          value={this.state.model.lastname}
          type="text"
          label="lastname"
          name="lastname"
          required
          disabled
        />
        <FormInput
          onChange={this.onChange('age')}
          value={this.state.model.age}
          type="select"
          label="age"
          name="age"
          options={ages}
        />
        <FormInput
          onChange={this.onChange('sex')}
          value={this.state.model.sex}
          type="radio"
          label="sex"
          name="sex"
          options={sexes}
        />
      </div>
    );
  }
}

const View = () => (
  <div className="p10">
    <Wrapped />
    <Unwrapped />
  </div>
);
export default View;
