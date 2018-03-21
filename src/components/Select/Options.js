import React, { PureComponent, Component, PropTypes } from 'react'

import * as utils from '../../utils/common'

import ScrollBox from '../ScrollBox'
import Icon from '../Icon'

import './Options.scss'

class Options extends PureComponent { 
	constructor( props ){
		super( props )

		this.onClickOption = this.onClickOption.bind(this)		
		this.state = {
			highlighted: this.props.highlighted,
			options: this.props.options,
			selected: this.props.selected,
			filter: this.props.filter
		}
	}

	componentWillReceiveProps(nextProps, nextState){
		const changes = {}
		const { options, selected, filter, highlighted } = nextProps
		this.setState({ options, selected, filter, highlighted })		
	}
	onClickOption( item ){		
		this.props.onSelect( item )
	}
	render(){
		const { options, selected, highlighted } = this.state		
		const { maxHeight } = this.props
		return (
			<div className='input-select__options-wrapper'>				
				<ScrollBox style={{ maxHeight: maxHeight }} handleStyle={{borderRadius:'3px'}} trackStyle={{top:'2px', bottom:'2px', right:'4px', width:'5px'}} showTrack={false}>
					<div>
						{ options.map( (item, index) => {
							const isSelected = selected === item.value					
							return (
								<Option
									highlighted={ highlighted === index }
									label={ item.label }
									value={ item.value }
									icon={ item.icon }
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
		const { label, icon, selected, disabled, highlighted } = this.props
		const optionsClassNames = utils.composeClassNames([
			'input-select__options-item',
			selected && 'selected',
			disabled && 'disabled',
			highlighted && 'highlighted'
		])
		
		return (
		 	<div 
		 		className={ optionsClassNames }
		 		onClick={ this.onClick }		 		
		 	>
		 		{ icon && 
		 			<Icon 
			 			className='input-select__options-item__icon'
			 			name={icon}
			 			size={16}			 		
			 		/>
			 	}
		 		{ label }
		 	</div>
		 )
	}
}



export default Options