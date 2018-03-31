import React, { PropTypes } from 'react';

const Checkbox = ({ id, isSelected, halfChecked, onChange }) => (
	<div>
		<input
			type="checkbox"
			id={id}
			className={`datalist-checkbox ${halfChecked && 'half-checked'}`}
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
export default Checkbox;
