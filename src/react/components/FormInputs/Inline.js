import React from 'react';

import FormInput from './FormInput';

const FORMINPUT_TYPE = (<FormInput />).type;

const Inline = props => {
  const rowWidth = (10 + 400) / props.children.length;
  const elementWidth = rowWidth - 10;

  // add the properties to the children
  // overwrite the ones give to the children directly
  // combine 'disabled' between parent and child
  const addPropsToFormInput = element => {
    let newProps = {};
    if (element.type === FORMINPUT_TYPE) {
      const { data, options, validation, subgroup, update } = props;
      // select the current value and current validation for easier manipulation
      // link data  and validation to original object or to the subgruop when specified
      let componentValue = data[element.props.name];
      let componentOptions = options[element.props.name];
      let componentValidation = validation[element.props.name];

      // when passing subgroup all the properties are nested under that `subgroup` object prop
      // since it is a nested object, we firsst need to check the first level really exists
      // in some case options are not available
      if (subgroup) {
        componentValue = data[subgroup] ? data[subgroup][element.props.name] : undefined;
        componentOptions = options[subgroup] ? options[subgroup][element.props.name] : undefined;
        componentValidation = validation[subgroup]
          ? validation[subgroup][element.props.name]
          : undefined;
      }

      const matchedProps = {
        value: componentValue,
        options: componentOptions,
        validation: componentValidation,
      };
      newProps = {
        rowWidth,
        elementWidth,
        subgroup,
        update,
        ...matchedProps,
        ...element.props,
      };
    } else {
      newProps = {
        ...props,
        rowWidth,
        elementWidth,
        ...element.props,
        children: undefined,
      };
    }

    return React.cloneElement(element, newProps);
  };

  return (
    <div>
      {props.label && <label style={{ marginLeft: 10 }}> {props.label} </label>}
      <div style={{ display: 'flex' }}>
        {React.Children.map(props.children, addPropsToFormInput)}
      </div>
    </div>
  );
};

export default Inline;
