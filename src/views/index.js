import React from 'react'

import { Tab, Tabs, TabList, TabPanels, TabPanel } from '../components/Tabs'
import Select from '../components/Select'
import ScrollBox from '../components/ScrollBox'
import Row from '../components/Row'
import Column from '../components/Column'
import Checkbox from '../components/Checkbox'

import Source from './Source'
const TestViews = require('./All')
const ComponentMappings = Object.keys( TestViews ).map( view => ({ name: view.substring(4), view }) )


const AllItemTabs = ComponentMappings.map( ({name}, i) => <Tab key={ i }> { name } </Tab> )
const AllItemPanels = ComponentMappings.map( ({ view, name }, i) => {
	const View = TestViews[ view ]	
	const Content = () => (
		<Column grow='1' align='top'>		
			<View />				
		</Column>
	)	
	if( name === 'DataList' ){
		return <TabPanel key={ i }><Content /></TabPanel>
	}
	return <TabPanel key={ i }><ScrollBox><Content /></ScrollBox></TabPanel>
})

class Views extends React.Component {

	constructor(props){
		super(props)				
		this.onChangeStyle = this.onChangeStyle.bind(this)
		this.onCodeToggle = this.onCodeToggle.bind(this)
		this.onSelectTab = this.onSelectTab.bind(this)

		const selectedTab = parseInt( window.localStorage.getItem('tab') || 0 )
		const tab = selectedTab !== undefined ? selectedTab : ComponentMappings.length - 1

		this.state = { 
			tab, 
			style: 'default',
			code: false
		}
	}	
	onCodeToggle( code ){
		this.setState({ code })
	}
	onChangeStyle( style ){
		this.setState({ style })
	}
	onSelectTab( tab ){
		window.localStorage.setItem( 'tab', tab );  
		this.setState({ tab })
	}
	
	render(){
		const options = [
			{ label:'default', value:'default'},
			{ label:'custom', value:'custom'},
		]
		require('../assets/styles/' + this.state.style + '.scss')

		return (
			<Column style={{width:'100%', height:'100%', overflow:'hidden'}}>
				<div style={{margin: '10px'}}>
					<Row>
						<Select
							value={ this.state.style }
							placeholder='Select StyleSheet'						
							onChange={ this.onChangeStyle }
							options={ options }						
						/>
					
						<Checkbox 
							label='Code'
							checked={ this.state.code }
							onChange={ this.onCodeToggle }
						/>
					</Row>
				</div>
				<Column grow='1'>
					<Tabs selected={ this.state.tab } onSelect={ this.onSelectTab }>
						<TabList>{ AllItemTabs }</TabList>
						<TabPanels>{ AllItemPanels }</TabPanels>
					</Tabs>					
					{ this.state.code && 
						<div style={{position: 'absolute', top: '100', right:'20', boxShadow: '0px 1px 2px rgba(0,0,0,0.4)'}}>
							<Source name={ ComponentMappings[ this.state.tab ].view }/>
						</div>
					}
				</Column>


			</Column>
		)
	}
}



export default Views