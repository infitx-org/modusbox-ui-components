import React, { PropTypes } from 'react'
import { Tab, Tabs, TabList, TabPanel, TabPanels } from '../components/Tabs'

const TestTabs = () => (
	<div>
		<div style={{padding:10}}>
			<Tabs>
				<TabList style={{width:'500px'}}>
					<Tab>Tab 1</Tab>
					<Tab>Tab 2</Tab>
					<Tab>Tab 3</Tab>
					<Tab disabled={ true }>Tab 4 ( disabled )</Tab>
				</TabList>
				<TabPanels>
					<TabPanel> Tab Content 1 </TabPanel>
					<TabPanel> Tab Content 2 </TabPanel>
					<TabPanel> Tab Content 3 </TabPanel>
					<TabPanel> Tab Content 4 </TabPanel>
				</TabPanels>
			</Tabs>
		</div>

		<div style={{padding:10}}>
			<Tabs>
				<TabList style={{width:'500px'}}>
					<Tab>Tab 1</Tab>
					<Tab>Tab 2</Tab>
					<Tab style={{width:'200px'}}>Tab 3 fixed width</Tab>
					<Tab disabled={ true }>Tab 4 ( disabled )</Tab>
				</TabList>
				<TabPanels>
					<TabPanel> Tab Content 1 </TabPanel>
					<TabPanel> Tab Content 2 </TabPanel>
					<TabPanel> Tab Content 3 </TabPanel>
					<TabPanel> Tab Content 4 </TabPanel>
				</TabPanels>
			</Tabs>
		</div>
		<div style={{padding:10}}>
			<Tabs>
				<TabList>
					<Tab>Tab 1</Tab>
					<Tab>Tab 2</Tab>
					<Tab>Tab 3</Tab>
					<Tab disabled={ true }>Tab 4 ( disabled )</Tab>
				</TabList>
				<TabPanels>
					<TabPanel> Tab Content 1 </TabPanel>
					<TabPanel> Tab Content 2 </TabPanel>
					<TabPanel> Tab Content 3 </TabPanel>
					<TabPanel> Tab Content 4 </TabPanel>
				</TabPanels>
			</Tabs>
		</div>
		
	</div>
)

export default TestTabs