import React, { Component } from 'react';

import FormInput, { FormInputs } from '../../components/FormInputs';
import Heading from '../../components/Heading';
import { createValidation, toValidationResult, vd } from '../../reduxValidation';

const description = {
  name: 'Describes the user name given at birth',
  lastname: 'Describes the user lastname inherited by the parents',
  description: 'Describes what is the main social role of the user',
  sex: 'Describes wheter the user is male or female',
  age: 'Describes how long the user has lived on this planet',
};

const url = {
  name: 'https://www.modusbox.com',
  lastname: 'https://www.modusbox.com',
  description: 'https://www.modusbox.com',
  sex: 'https://www.modusbox.com',
  age: 'https://www.modusbox.com',
};

const model = {
  name: undefined,
  lastname: 'test-lastname',
  description: 'The quick brown fox jumps over the lazy dog\n and find a friend for life',
  sex: 'unisex',
  age: 42,
};

const validation = {
  name: createValidation([vd.isRequired, vd.maxLength(10)]),
  lastname: createValidation([vd.isRequired, vd.maxLength(10)]),
  description: createValidation([vd.isRequired, vd.maxLength(10)]),
  sex: createValidation([vd.isRequired]),
  age: createValidation([vd.isRequired, vd.isNum]),
};

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
    };
  }
  onChange(change) {
    this.setState({
      model: {
        ...this.state.model,
        [change.prop]: change.value,
      },
    });
  }
  render() {
    const validationResult = toValidationResult(this.state.model, validation);
    return (
      <div>
        {JSON.stringify(validationResult)}
        <Heading>Wrapped</Heading>
        <FormInputs
          onChange={this.onChange}
          data={this.state.model}
          validation={validationResult}
          title="Form inputs title"
          description={description}
          url={url}
        >
          <FormInput type="text" label="name" name="name" />
          <FormInput type="text" label="lastname" name="lastname" />
          <FormInput type="area" label="description" name="description" />
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
    this.onChangeSize = this.onChangeSize.bind(this);
    this.state = {
      size: 'l',
      model,
    };
  }
  onChange(field) {
    return value => {
      this.setState({
        model: {
          ...this.state.model,
          [field]: value,
        },
      });
    };
  }
  onChangeSize(size) {
    this.setState({
      size,
    });
  }
  render() {
    const validationResult = toValidationResult(this.state.model, validation);
    return (
      <div>
        <Heading>Non Wrapped</Heading>
        <FormInput
          onChange={this.onChangeSize}
          value={this.state.size}
          type="radio"
          options={[
            { label: 's', value: 's' },
            { label: 'm', value: 'm' },
            { label: 'l', value: 'l' },
          ]}
          label="size"
        />
        <FormInput
          size={this.state.size}
          onChange={this.onChange('name')}
          value={this.state.model.name}
          validation={validationResult.fields.name}
          type="text"
          label="name"
          description={description.name}
          url={url.name}
          name="name"
        />
        <FormInput
          size={this.state.size}
          onChange={this.onChange('lastname')}
          value={this.state.model.lastname}
          validation={validationResult.fields.lastname}
          type="text"
          label="lastname"
          description={description.lastname}
          url={url.lastname}
          name="lastname"
        />
        <FormInput
          size={this.state.size}
          onChange={this.onChange('description')}
          value={this.state.model.description}
          validation={validationResult.fields.description}
          type="area"
          label="description"
          description={description.description}
          url={url.description}
          name="description"
        />
        <FormInput
          size={this.state.size}
          onChange={this.onChange('age')}
          value={this.state.model.age}
          validation={validationResult.fields.age}
          type="select"
          label="age"
          description={description.age}
          url={url.age}
          name="age"
          options={ages}
        />
        <FormInput
          onChange={this.onChange('sex')}
          value={this.state.model.sex}
          validation={validationResult.fields.sex}
          type="radio"
          label="sex"
          description={description.sex}
          url={url.sex}
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
