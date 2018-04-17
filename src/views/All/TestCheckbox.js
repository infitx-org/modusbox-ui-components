import React from 'react';
import PropTypes from 'prop-types';
import Column from '../../components/Column';
import Checkbox from '../../components/Checkbox';

const TestCheckbox = () => (
	<div>
		<Column style={{ padding: 10, margin: '5px 0px', border: '1px solid #ccc' }}>
			<Checkbox id="x" label="my Checkbox" checked={false} />
			<Checkbox id="x1" label="my checkbox semi-checked" checked={true} semi={true} />
			<Checkbox id="x2" label="other checkbox semi-checked" checked={false} semi={true} />
		</Column>
		<Column style={{ padding: 10, margin: '5px 0px', border: '1px solid #ccc' }}>
			<Checkbox id="x3" label="Click me" checked={true} round />
			<Checkbox id="x4" label="onChange event" onChange={() => alert()} />
			<Checkbox id="x5" disabled label="I am disabled" />
			<Checkbox id="x6" disabled checked={true} label="I am disabled checked" />
			<Checkbox id="x7" label="Round Corners" round />
		</Column>
		<Column style={{ padding: 10, margin: '5px 0px', border: '1px solid #ccc' }}>
			<Checkbox id="test-checkbox-1" label="Test checkbox 1" checked />
			<Checkbox id="test-checkbox-2" label="Test checkbox 2" />
			<Checkbox id="test-checkbox-3" label="Test checkbox 3" disabled/>
			<Checkbox id="test-checkbox-4" label="Test checkbox 4" />
		</Column>
	</div>
);

export default TestCheckbox;
