import React, { PropTypes } from 'react'
import Column from '../../components/Column'
import Row from '../../components/Row'

const Block = () => <div style={{ background:'#ddd', margin:'5px', height:'20px', width: '20px'}} />
const BlockBig = () => <div style={{ background:'#eee', margin:'5px', height:'40px', width: '40px'}} />

const rowStyle = {border: '1px solid #ccc'}


const jcs = ['top', 'center', 'bottom']
const ais = ['left', 'center', 'right']

const Items = jcs.reduce( ( p, jc, i ) => ([ ...p, ...ais.map( ( ai, j ) => (
	<div key={ i * ais.length + j } >
		<span> { jc } { ai } </span>
		<Row style={ rowStyle } align={`${jc} ${ai}`}>
			<Block/>
			<BlockBig/>
			<Block/>
			<BlockBig/>
		</Row>
	</div>	
)) ]), [] )


const TestRow = () => (
	<div>		
		<div style={{padding:10, border: '1px solid #ccc'}}>		
			<Column align='center space-between'>
				{ Items }				
			</Column>
		</div>		
	</div>
)

export default TestRow