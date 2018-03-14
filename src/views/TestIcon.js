import React, { PropTypes } from 'react'
import Icon from '../components/Icon'

import '../icons/index.js'

const icons = [
	'business-processes',
	'transmissions',
	'transactions',
	'errors',
	'documents',
	'toggle-visible',
	'toggle-invisible',
	'transaction-child',
	'transaction-parent',
	'transaction-standalone',
	'onhold',
	'inactive',
	'double-arrow',
	'arrow',
	'warning-sign',
	'dash',
	'saved',
	'editing',
	'magic-wand',
	'settings',

	// mulesoft 
	'access-manager-color',
	'undo',
	'unlock-small',
	'upload-small',
	'upload',
	'user-small',
	'user',
	'walkthrough-small',
	'warning-small',
	'warning',
	'xchange-color',
	'xchange-greyscale'
]


const Block = ({ icon }) => (
	<div style={{ height: '140px', width: '140px', border: '1px solid #eee', justifyContent:'center', display:'flex', flexDirection:'column'}}>
		<div style={{flex:'0 0 auto', justifyContent:'center', display:'flex'}}>
			<Icon 
				size={40}
				fill='#999'
				name={ icon }
				style={{display:'flex'}}
			/>
		</div>
		<div style={{flex:'0 0 auto', justifyContent:'center', display:'flex', fontSize:'13px'}}> { icon } </div>
	</div>
)

const TestIcon = () => (	
		<div style={{padding:10, margin:'5px 0px', border: '1px solid #ccc', display:'flex', flexWrap:'wrap'}}>
			{ icons.map( (icon,i) => <Block key={i} icon={ icon }/>	) }
		</div>
)

export default TestIcon