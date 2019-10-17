import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Heading from '../Heading';

import FormInput from './FormInput';
import Inline from './Inline';

const FORMINPUT_TYPE = <FormInput />.type;
const INLINE_TYPE = <Inline />.type;

// wrapper for data, onChange, validation, options
export const FormInputs = ({
  inline = false,
  data,
  onChange,
  validation,
  options,
  disabledFields = [],
  hiddenFields = [],
  title,
  subgroup,
  disabled,
  width,
  style = {},
  children,
}) => {
  let elementWidth = 400;
  let rowWidth = '100%';

  if (width === '100%') {
    elementWidth = '100%';
    rowWidth = '100%';
  }

  if (inline) {
    rowWidth = (10 + 400) / children.length;
    elementWidth = rowWidth - 10;
  }

  const wrapperStyle = {
    marginBottom: 20,
    display: inline ? 'flex' : 'block',
    width,
    ...style,
  };

  const forceDisabled = disabled === true;

  // add the properties to the Form Component children.
  // overwrite the ones give to the children directly
  // combine 'disabled' between parent and child
  const addPropsToFormInputOrInline = element => {
    if (element == null) {
      return element;
    }
    if (element.type !== FORMINPUT_TYPE && element.type !== INLINE_TYPE) {
      return element;
    }
    let props;
    if (element.type === FORMINPUT_TYPE) {
      const { name } = element.props;
      // select the current value and current validation for easier manipulation
      // link data  and validation to original object or to the subgruop when specified
      let componentValue = data[name];
      let componentOptions = options[name];
      let componentValidation = get(validation, `fields[${name}]`);
      const componentonChange = onChange;

      // when passing subgroup all the properties are nested under that `subgroup` object prop
      // since it is a nested object, we firsst need to check the first level really exists
      // in some case options are not available
      if (subgroup) {
        componentValue = data[subgroup] ? data[subgroup][name] : undefined;
        componentOptions = options[subgroup] ? options[subgroup][name] : undefined;
        componentValidation = validation[subgroup] ? validation[subgroup][name] : undefined;
        componentValidation = get(validation, `fields[${subgroup}].fields[${name}]`);
      }
      const matchedProps = {
        value: element.props.value || componentValue,
        options: element.props.options || componentOptions,
        validation: element.props.validation || componentValidation,
        onChange: element.props.onChange || componentonChange,
        subgroup: element.props.subgroup || subgroup,
      };

      // perform the presence test in a nested object
      const includesNested = (subgroup, array, name) =>
        array.includes(name) ||
        (subgroup && array.some(item => item[subgroup] && item[subgroup].includes(name)));

      const lockedByParent = includesNested(subgroup, disabledFields, name);
      const hiddenByParent = includesNested(subgroup, hiddenFields, name);
      const hidden = element.props.hidden || hiddenByParent;
      const locked = element.props.locked || lockedByParent;
      const disabled = forceDisabled || element.props.disabled || locked;

      props = {
        rowWidth,
        elementWidth,
        ...element.props,
        ...matchedProps,
        disabled,
        locked,
        hidden,
      };
    } else {
      props = {
        rowWidth,
        elementWidth,
        data,
        subgroup,
        onChange,
        validation,
        options,
        ...element.props,
        disabled,
      };
    }
    return React.cloneElement(element, props);
  };

  // Map the props to the children and remove the whole section if all the children should be hidden
  const mappedChildren = React.Children.map(children, addPropsToFormInputOrInline);
  if (mappedChildren.every(child => child.props.hidden)) {
    return null;
  }
  return (
    <div style={wrapperStyle}>
      {title && <Heading size="4"> {title} </Heading>}
      {mappedChildren}
    </div>
  );
};

FormInputs.defaultProps = {
  data: {},
  onChange: undefined,
  options: {},
  validation: {},
  disabledFields: [],
  hiddenFields: [],
  title: undefined,
  subgroup: undefined,
};

FormInputs.propTypes = {
  data: PropTypes.shape(),
  onChange: PropTypes.func,
  validation: PropTypes.shape(),
  options: PropTypes.shape(),
  disabledFields: PropTypes.arrayOf(PropTypes.string),
  hiddenFields: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  subgroup: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
};

export default FormInputs;
