/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ id, isSelected, halfChecked, onChange }) => (
  <div>
    <input
      type="checkbox"
      id={id}
      className={`element-datalist__checkbox ${halfChecked && 'half-checked'}`}
      checked={isSelected}
      onChange={e => {
        e.stopPropagation();
        e.nativeEvent.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        onChange();
      }}
      onClick={e => {
        e.stopPropagation();
      }}
    />
    <label htmlFor={id} onClick={e => e.stopPropagation()} />
  </div>
);

Checkbox.propTypes = {
  id: PropTypes.string,
  isSelected: PropTypes.bool,
  halfChecked: PropTypes.bool,
  onChange: PropTypes.func,
};
export default Checkbox;
