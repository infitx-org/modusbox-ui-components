import React from 'react';
import PropTypes from 'prop-types';

import { Tab, Tabs, TabList, TabPanels, TabPanel } from '../../components/Tabs';
import DataList from '../../components/DataList';

const columns = ['a', 'b', 'c', 'd', 'e'];
const list1 = new Array(150)
	.fill(0)
	.map((row, rowi) =>
		columns.reduce(
			(p, c, i) => ({ ...p, [`${c}`]: `${i + rowi * columns.length} test test test test test test test test tests` }),
			{}
		)
	);

const icon = () => ({ name: 'close-small', color: '#39c', size: 16 });
const columns1 = [
	{ label: 'a', key: 'a', icon },
	{ label: 'b', key: 'b', icon },
	{ label: 'c', key: 'c', icon },
	{ label: 'd', key: 'd', icon },
	{ label: 'e', key: 'e', icon },
];

const TestDataList = () => (
	<div
		style={{
			padding: '10px',
			margin: '5px 0px',
			border: '1px solid #ccc',
			flex: '2 1 auto',
			display: 'flex',
			flex: '2 1 auto',
		}}
	>
		<Tabs flex>
			<TabList>
				<Tab>1</Tab>
				<Tab>2</Tab>
				<Tab>3</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>					
						<DataList
							id="1"
							columns={columns1}
							list={list1}
							selected={'a'}
							paging
							multiSelect={ true }
							multiSelected={[]}
							onMultiSelect={ console.log }							
						/>					
				</TabPanel>
				<TabPanel>
					<DataList id="2" columns={columns1} list={list1.concat(list1)} selected={'a'} paging />
				</TabPanel>
				<TabPanel>
					<div> hey</div>
					<div> hey</div>
					<div> hey</div>
				</TabPanel>
			</TabPanels>
		</Tabs>
	</div>
);

export default TestDataList;
