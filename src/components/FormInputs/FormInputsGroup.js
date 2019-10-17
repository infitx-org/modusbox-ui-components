import React from 'react';

// eslint-disable-next-line
import FormInputs from './FormInputs';

const FormInputsGroup = ({ disabled = undefined, style, className, children }) => {
  // add the properties to the children and overwrite the ones given directly to the children
  const addPropsToFormInputs = element => {
    if (element === null) {
      return element;
    }
    if (element.type !== FormInputs) {
      return element;
    }

    const props = {
      ...element.props,
      disabled,
    };
    return React.cloneElement(element, props);
  };
  return (
    <div style={style} className={`full-width ${className}`}>
      {React.Children.map(children, addPropsToFormInputs)}
    </div>
  );
};

export default FormInputsGroup;
