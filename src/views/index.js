import React from 'react'
import TestCheckbox from './TestCheckbox'
import TestSelect from './TestSelect'
import TestTextField from './TestTextField'
import TestTabs from './TestTabs'
import TestRadio from './TestRadio'
import TestDataList from './TestDataList'
import TestScrollBox from './TestScrollBox'
import TestFileUploader from './TestFileUploader'


import { Tab, Tabs, TabList, TabPanels, TabPanel } from '../inputs/Tabs'

const Items = {
	Checkbox: TestCheckbox,
	Radio: TestRadio,
	Select: TestSelect,
	TextField: TestTextField,
	Tabs: TestTabs,
	DataList: TestDataList,
	ScrollBox: TestScrollBox,
	FileUploader: TestFileUploader
}

const Views = () => {

	const AllItemTabs = Object.keys( Items ).map( (item, i) => <Tab key={ i }> { item } </Tab> )
	const AllItemPanels = Object.keys( Items ).map( (item, i) => <TabPanel key={ i }><div > { Items[ item ]() } </div> </TabPanel> )
	
	return (
		<div style={{padding:10}}>
			<Tabs selected={ 7 }>
				<TabList style={{width:'500px'}}>{ AllItemTabs }</TabList>
				<TabPanels>{ AllItemPanels }</TabPanels>
			</Tabs>
		</div>
	)

}
export default Views