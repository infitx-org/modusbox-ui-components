import React, { PropTypes } from 'react'
import DataList from '../../components/DataList'

const columns = ['a','b','c','d','e']
const list1 = new Array(100).fill(0).map( (row, rowi) => columns.reduce( (p,c,i) => ({ ...p, [`${c}`]: `${i + rowi *  columns.length }` }), {}) )

const icon = () => () => ({name:'close-small', color: '#39c', size: parseInt( Math.random() * 16 + 4 ) })
const columns1 = [
	{ label: 'a', key: 'a',  icon: icon() },
	{ label: 'b', key: 'b',  icon: icon() },
	{ label: 'c', key: 'c',  icon: icon() },
	{ label: 'd', key: 'd',  icon: icon() },
	{ label: 'e', key: 'e',  icon: icon() }
]



const TestDataList = () => (
	<div>
		<div style={{padding:10, margin:'5px 0px', border: '1px solid #ccc'}}>
			<DataList
				id='1'
				columns={ columns1 }
				list={ list1 }
				selected={ 'a' }
				height='400'	
				paging			
			/>
		</div>
	</div>
)

export default TestDataList