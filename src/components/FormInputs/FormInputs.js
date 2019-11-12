import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import Heading from '../Heading';
import FormInput from './FormInput';
import Inline from './Inline';

const FORMINPUT_TYPE = <FormInput />.type;
const INLINE_TYPE = <Inline />.type;

// wrapper for data, onChange, validation, options
class FormInputs extends PureComponent {
  static addPropsToFormInputOrInline(
    data,
    options,
    disabled,
    validation,
    subgroup,
    disabledFields,
    hiddenFields,
    _onChange,
    rowWidth,
    elementWidth,
  ) {
    return function addPropsToElement(element) {
      if (element === null) {
        return element;
      }
      if (element.type !== FORMINPUT_TYPE && element.type !== INLINE_TYPE) {
        return element;
      }

      let addProps;

      if (element.type === FORMINPUT_TYPE) {
        const { name } = element.props;

        let componentValue = data[name];
        let componentOptions = options[name];
        let componentValidation = get(validation, `fields[${name}]`);

        if (subgroup) {
          componentValue = get(data, `${subgroup}.${name}`);
          componentOptions = get(options, `${subgroup}.${name}`);
          componentValidation = get(validation, `fields[${subgroup}].fields[${name}]`);
        }

        const wrappedOnChange = value => _onChange(value, element);

        const matchedProps = {
          value: element.props.value || componentValue,
          options: element.props.options || componentOptions,
          validation: element.props.validation || componentValidation,
          onChange: element.props.onChange || wrappedOnChange,
          subgroup: element.props.subgroup || subgroup,
        };

        const lockedByParent = FormInputs.getIncludesNested(subgroup, disabledFields, name);
        const hiddenByParent = FormInputs.getIncludesNested(subgroup, hiddenFields, name);
        const hidden = element.props.hidden || hiddenByParent;
        const locked = element.props.locked || lockedByParent;
        const finalDisabled = disabled === true || element.props.disabled || locked;

        addProps = {
          rowWidth,
          elementWidth,
          ...element.props,
          ...matchedProps,
          disabled: finalDisabled,
          locked,
          hidden,
        };
      } else {
        addProps = {
          rowWidth,
          elementWidth,
          data,
          subgroup,
          onChange: _onChange,
          validation,
          options,
          ...element.props,
          disabled,
        };
      }
      return React.cloneElement(element, addProps);
    };
  }
  static getIncludesNested(subgroup, arr, name) {
    return (
      arr.includes(name) ||
      (subgroup && arr.some(item => item[subgroup] && item[subgroup].includes(name)))
    );
  }
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.getChildren = this.getChildren.bind(this);
  }
  onChange(value, element) {
    this.props.onChange({
      value,
      prop: element.props.name,
      changeBase: element.props.changeBase,
      allowEmpty: element.props.allowEmpty,
      subgroup: element.props.subgroup,
    });
  }
  getChildren() {
    const {
      data,
      options,
      disabled,
      validation,
      subgroup,
      disabledFields,
      hiddenFields,
      width,
      inline,
    } = this.props;

    let elementWidth = 400;
    let rowWidth = '100%';

    if (width === '100%') {
      elementWidth = '100%';
      rowWidth = '100%';
    }
    if (inline) {
      rowWidth = (10 + 400) / this.props.children.length;
      elementWidth = rowWidth - 10;
    }

    return React.Children.map(
      this.props.children,
      FormInputs.addPropsToFormInputOrInline(
        data,
        options,
        disabled,
        validation,
        subgroup,
        disabledFields,
        hiddenFields,
        this.onChange,
        rowWidth,
        elementWidth,
      ),
    );
  }

  render() {
    const { title, style } = this.props;

    return (
      <div style={style} className="forminputs__column">
        {title && <Heading size="4">{title}</Heading>}
        {this.getChildren()}
      </div>
    );
  }
}

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
