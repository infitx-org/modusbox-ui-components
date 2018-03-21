import React from 'react'

import Select from '../components/Select'
import ScrollBox from '../components/ScrollBox'

import TestButton from './All/TestButton'
import TestCheckbox from './All/TestCheckbox'
import TestSelect from './All/TestSelect'
import TestTextField from './All/TestTextField'
import TestTabs from './All/TestTabs'
import TestRadio from './All/TestRadio'
import TestDataList from './All/TestDataList'
import TestScrollBox from './All/TestScrollBox'
import TestFileUploader from './All/TestFileUploader'
import TestDatePicker from './All/TestDatePicker'
import TestIcon from './All/TestIcon'
import TestSpinner from './All/TestSpinner'


import { Tab, Tabs, TabList, TabPanels, TabPanel } from '../components/Tabs'

const Items = {
	Button: TestButton,
	Checkbox: TestCheckbox,
	Radio: TestRadio,
	Select: TestSelect,
	TextField: TestTextField,
	Tabs: TestTabs,
	DataList: TestDataList,
	ScrollBox: TestScrollBox,
	FileUploader: TestFileUploader,
	DatePicker: TestDatePicker,
	Icon: TestIcon,
	Spinner: TestSpinner
}

const ItemKeys = Object.keys( Items )
const AllItemTabs = ItemKeys.map( (item, i) => <Tab key={ i }> { item } </Tab> )
const AllItemPanels = Object.keys( Items ).map( (item, i) => <TabPanel key={ i }><ScrollBox flex>{ Items[ item ]() }</ScrollBox></TabPanel> )
const selectedTab = parseInt( window.localStorage.getItem('tab') || 0 )
const selected = selectedTab || Object.keys( Items ).length - 1
const onSelectTab = ( idx ) => window.localStorage.setItem('tab', idx);  

class Views extends React.Component {

	constructor(props){
		super(props)				
		this.state = { selected: 'default' }
	}	

	static onChange(value){
		this.setState({ selected: value })
	}
	
	render(){
		const options = [
			{ label:'default', value:'default'},
			{ label:'custom', value:'custom'},
		]
		require('../assets/styles/' + this.state.selected + '.scss')

		return (
			<div style={{width:'100%', height:'100%', overflow:'hidden', flexDirection: 'column', display:'flex'}}>
				<div style={{margin: '10px'}}>
					<Select
						placeholder='Select StyleSheet'
						value={ this.state.selected }
						onChange={this.onChange }
						options={ options }
					/>
				</div>
				<Tabs selected={ selected } onSelect={ onSelectTab }>
					<TabList>{ AllItemTabs }</TabList>
					<TabPanels>{ AllItemPanels }</TabPanels>
				</Tabs>
			</div>
		)
	}
}



export default Views