import React, { PropTypes } from 'react'
import Column from '../../components/Column'
import Row from '../../components/Row'




// placeContent: 'flex-start',
// align: 'center',
// gcolumn: undefined,
// shrink: undefined,
// basis: 'auto',
// className: undefined,
// style: undefined

const Block = () => <div style={{ background:'#ddd', margin:'5px', height:'50px', width: '50px'}} />
const BlockBig = () => <div style={{ background:'#eee', margin:'5px', height:'100px', width: '100px'}} />

const columnStyle = {border: '1px solid #ccc', height:'100%'}


const jcs = ['top', 'center', 'bottom']
const ais = ['left', 'center', 'right']

const Items = jcs.reduce( ( p, jc ) => ([ ...p, ...ais.map( ai => (
	<Row>
		<div>
			<span> { jc } { ai } </span>
			<Column style={ columnStyle } align={`${jc} ${ai}`}>
				<Block/>
				<BlockBig/>
				<Block/>
				<BlockBig/>
			</Column>
		</div>
	</Row>
)) ]), [] )

console.log(Items)
const TestColumn = () => (
	<div>		
		<div style={{padding:10, border: '1px solid #ccc'}}>
		

			<Row align='center space-between'>
				{ Items }				
			</Row>
			
			{/*<Column style={ columnStyle } wrap>
				<Block/>
				<BlockBig/>
				<Block/>
				<BlockBig/>
				<Block/>
				<BlockBig/>
				<Block/>
				<BlockBig/>
				<Block/>
				<BlockBig/>
				<Block/>
				<BlockBig/>
				<Block/>
				<BlockBig/>
				<Block/>
				<BlockBig/>
				<Block/>
				<BlockBig/>
		
			</Column>*/}

		</div>		
	</div>
)

export default TestColumn