import React, { PropTypes } from 'react'
import Row from '../../components/Row'



// placeContent: 'flex-start',
// align: 'center',
// grow: undefined,
// shrink: undefined,
// basis: 'auto',
// className: undefined,
// style: undefined

const Block = () => <div style={{ background:'#ddd', margin:'5px', height:'50px', width: '50px'}} />
const BlockBig = () => <div style={{ background:'#eee', margin:'5px', height:'150px', width: '150px'}} />

const rowStyle = {border: '1px solid #ccc'}
const TestRow = () => (
	<div>		
		<div style={{padding:10, border: '1px solid #ccc'}}>
		

			<span> default ( center, flex-start ) </span>
			<Row style={ rowStyle }>
				<Block/>
				<BlockBig/>
				<Block/>
				<BlockBig/>
			</Row>

			<span> Align top </span>
			<Row style={ rowStyle } align='top'>
				<Block/>
				<BlockBig/>
				<Block/>
				<BlockBig/>
			</Row>

			<span> Align center, left </span>
			<Row style={ rowStyle } align='center left'>
				<Block/>
				<BlockBig/>
				<Block/>
				<BlockBig/>
			</Row>

			<span> Align bottom, left </span>
			<Row style={ rowStyle } align='bottom left'>
				<Block/>
				<BlockBig/>
				<Block/>
				<BlockBig/>
			</Row>

			<span> Align top, center </span>
			<Row style={ rowStyle } align='top center'>
				<Block/>
				<BlockBig/>
				<Block/>
				<BlockBig/>
			</Row>

			<span> Align center, center </span>
			<Row style={ rowStyle } align='center center'>
				<Block/>
				<BlockBig/>
				<Block/>
				<BlockBig/>
			</Row>

			<span> Align bottom, center </span>
			<Row style={ rowStyle } align='bottom center'>
				<Block/>
				<BlockBig/>
				<Block/>
				<BlockBig/>
			</Row>

			<span> Align top, right </span>
			<Row style={ rowStyle } align='top right'>
				<Block/>
				<BlockBig/>
				<Block/>
				<BlockBig/>
			</Row>

			<span> Align center, right </span>
			<Row style={ rowStyle } align='center right'>
				<Block/>
				<BlockBig/>
				<Block/>
				<BlockBig/>
			</Row>

			<span> Align bottom, right </span>
			<Row style={ rowStyle } align='bottom right'>
				<Block/>
				<BlockBig/>
				<Block/>
				<BlockBig/>
			</Row>

			<span> Wrap </span>
			<Row style={ rowStyle } wrap>
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
		
			</Row>

		</div>		
	</div>
)

export default TestRow