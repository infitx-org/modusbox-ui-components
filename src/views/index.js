import React from 'react'

import { Tab, Tabs, TabList, TabPanels, TabPanel } from '../components/Tabs'
import Select from '../components/Select'
import ScrollBox from '../components/ScrollBox'

const TestViews = require('./All')
const ComponentMappings = Object.keys( TestViews ).map( view => ({ name: view.substring(4), view }) )


const AllItemTabs = ComponentMappings.map( ({name}, i) => <Tab key={ i }> { name } </Tab> )
const AllItemPanels = ComponentMappings.map( ({ view, name }, i) => {
	const View = TestViews[ view ]	
	if( name === 'DataList' ){
		return <TabPanel key={ i }><View /></TabPanel>
	}
	return <TabPanel key={ i }><ScrollBox><View /></ScrollBox></TabPanel>
})
const selectedTab = parseInt( window.localStorage.getItem('tab') || 0 )
const selected = selectedTab !== undefined ? selectedTab : ComponentMappings.length - 1
const onSelectTab = ( idx ) => window.localStorage.setItem('tab', idx);  

class Views extends React.Component {

	constructor(props){
		super(props)				
		this.onChange = this.onChange.bind(this)
		this.state = { selected: 'default' }
	}	

	onChange(value){
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
						value={ this.state.selected }
						placeholder='Select StyleSheet'						
						onChange={ this.onChange }
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