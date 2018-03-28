import React from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'

import cm from 'codemirror'
console.log( )
require('codemirror/mode/javascript/javascript')

class Source extends React.Component {
	constructor(props){
		super(props)
		this.load = this.load.bind(this)
		this.state = { content: 'Loading' }
	}
	componentWillReceiveProps(){
		this.load()
	}
	componentDidMount(){
		this.load()
	}
	async load(){
		let source = ''
		try{
			const response = await fetch( '/cmp/' + this.props.name )
			source = await response.text()			
		}
		catch(e){
			source = e.toString()
		}
		this.setState({ content: source })
    	this.codeMirror = cm.fromTextArea(this.refs.editor, {
	    	mode: 'javascript',
	        lineNumbers: false,
	        lineWrapping: true,
	        smartIndent: false,  // javascript mode does bad things with jsx indents
	        matchBrackets: true,        	        
	        viewportMargin: Infinity,
	        dragDrop: false,
	        readOnly: this.props.readOnly
    	})
	}
	render(){
		return <div style={{ background:'#fff', fontSize:'12px', padding:'10px'}}>
			<textarea 
				ref='editor'
				autoComplete='off'
				onChange={console.log}
				value={ this.state.content }			
			/>
		</div>
	}
}
export default Source