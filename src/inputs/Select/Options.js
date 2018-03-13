import React, { PureComponent, Component, PropTypes } from 'react'
import ScrollBox from '../ScrollBox'
import { find } from 'lodash'

import './Options.css'

class Options extends Component { 
	constructor( props ){
		super( props )

		this.onClickOption = this.onClickOption.bind(this)
		this.filterOptions = this.filterOptions.bind(this)
		this.state = {
			options: this.props.options,
			selected: this.props.selected,
			filter: this.props.filter
		}
	}

	componentWillReceiveProps(nextProps, nextState){
		const changes = {}
		const { options, selected, filter } = nextProps
		
		if( selected !== this.props.selected ){
			changes.selected = selected
		}
		if( options !== this.props.options ){
			changes.options = options
		}
		if( filter !== this.props.filter ){
			changes.filter = filter
		}
		
		// apply only the necessary changes 
		if( Object.keys(changes).length > 0 ){
			this.setState( changes )
		}

	}
	onClickOption( item ){		
		this.props.onSelect( item )
	}
	filterOptions(){
		const { options, filter } = this.state		
		if( filter == undefined || filter == '' ){ 
			return options
		}
		return options.filter( item => item.label.includes( filter ) )
	}
	render(){
		const { options, selected } = this.state
		const filteredOptions = this.filterOptions()
		return (
			<div className='options-wrapper'>				
				<ScrollBox style={{maxHeight:'240px'}} trackerStyle={{marginLeft: '-4px', width:'5px', borderRadius:'3px'}} showTrack={false}>
					<div>
						{ filteredOptions.map( (item, index) => {
							const isSelected = selected === item.value					
							return (
								<Option
									label={ item.label }
									value={ item.value }
									disabled={ item.disabled === true }
									key={ index }
									selected={ isSelected }
									onClick={ () => this.onClickOption( item ) }
								/>
							)
						})}
					</div>
				</ScrollBox>
				

			</div>
		)
	}
}
Options.propTypes = {
	options: PropTypes.arrayOf( 
		PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.string,
		})
	)
}
Options.defaultProps = {
	options: []
}


class Option extends PureComponent {
	constructor(props){
		super(props)
		this.onClick = this.onClick.bind(this)
	}
	onClick(){
		if( this.props.disabled ) return 
		this.props.onClick()
	}
	render(){
		 return (
		 	<div 
		 		className={`option-item ${this.props.selected ? 'selected' :''} ${this.props.disabled ? 'disabled' :''}`}
		 		onClick={ this.onClick }		 		
		 	>
		 		{ this.props.label }
		 	</div>
		 )
	}
}



export default Options