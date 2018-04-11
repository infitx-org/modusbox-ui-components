import React from 'react';
import PropTypes from 'prop-types';
import Column from '../../components/Column';
import Row from '../../components/Row';

const Block = () => <div style={{ background: '#ddd', margin: '5px', height: '20px', width: '20px' }} />;
const BlockBig = () => <div style={{ background: '#eee', margin: '5px', height: '40px', width: '40px' }} />;

const rowStyle = { border: '1px solid #ccc' };

const jcs = ['left', 'center', 'right'];
const ais = ['top', 'center', 'bottom'];

const Items = jcs.reduce(
	(p, jc, i) => [
		...p,
		...ais.map((ai, j) => (
			<div key={i * ais.length + j} style={{width: '100%'}}>
				<span>
					{' '}
					{jc} {ai}{' '}
				</span>
				<Row style={rowStyle} align={`${jc} ${ai}`}>
					<Block />
					<BlockBig />
					<Block />
					<BlockBig />
				</Row>
			</div>
		)),
	],
	[]
);

const TestRow = () => (
	<Row style={{ padding: 10, border: '1px solid #ccc' }}>
		<Column align="center space-between">
			{Items}				
		</Column>		
	</Row>
);

export default TestRow;
