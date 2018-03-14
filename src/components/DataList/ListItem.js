import React, { PropTypes } from 'react'
import isEqual from 'lodash/isEqual'

import { NotifyResize } from 'react-notify-resize'
import Icon from '../Icon'
import Row from '../Row'


import Link from './Link'
import { ArrowCell, CheckboxCell, ListItemCell, ScrollBarCell } from './Cells'

class ListItem extends React.Component{
	constructor( props ){
		super( props )

		this.onResize = this.onResize.bind( this )
		this.onClick = this.onClick.bind( this )
		this.onMultiSelect = this.onMultiSelect.bind( this )
		this.animationTimeout = false
		this.state = { animate: false }

		this.setAnimation = this.setAnimation.bind(this)
		this.removeAnimation = this.removeAnimation.bind(this)
	}	
	onResize( data ){
		this.props.onResize( data.height )
	}
	onClick(){
		this.props.onItemClick( this.props.item )
	}
	onMultiSelect(){
		this.props.onMultiSelect( this.props.item )
	}
	setAnimation(){
		this.refs.item.classList.add('fadeIn')		
	}
	removeAnimation(){
		this.refs.item.classList.remove('fadeIn')
	}
	componentWillUnmount(){
		clearTimeout( this.animationTimeout )
	}
	// handle the animating change 
	componentWillReceiveProps( nextProps ){		
		
		if( nextProps.animate === true && nextProps.animate != this.props.animate ){
			clearTimeout( this.animationTimeout )
			this.setAnimation();
			this.animationTimeout = setTimeout( () => { this.removeAnimation() }, 500)
		}
	}

	shouldComponentUpdate(nextProps, nextState) {		
		const isForced = nextProps.forceUpdate === true
		const changeItem = ! isEqual(nextProps.item, this.props.item)
		const changeAnimation = (nextState.animate != this.state.animate)
		const changeSelected = nextProps.isSelected !== this.props.isSelected		
		const changeMultiSelected = nextProps.isMultiSelected !== this.props.isMultiSelected		
		const changeScrollbarVisibility = nextProps.showScrollbar !== this.props.showScrollbar
		return ( isForced || changeSelected || changeMultiSelected || changeItem || changeScrollbarVisibility )
	}

	render(){
		const { item, isSelected, showScrollbar } = this.props
		return (
			<div ref='item' className='data-list-body-row-wrapper' style={{paddingRight: showScrollbar ? '6px' : '0px' }}>				
				<div 
					style = { this.props.rowStyle }
					onClick = { this.onClick }
					className = { ' data-list-body-row ' + ( isSelected ? 'selected' : '' ) }
				>

					{ this.props.showArrow && <ArrowCell isSelected={ isSelected } /> }

					{ this.props.showCheckbox &&
						<CheckboxCell
							show = { this.props.showMultiSelect }
							id = {this.props.index}
							isSelected = { this.props.isMultiSelected }
							style = { this.props.style.multiSelectColumn }
							onMultiSelect = { this.onMultiSelect }
						/>
					} 
											
					{
						this.props.columns.map( ( column, i ) => {

							let style = {
								...this.props.style.dataColumn,
								width: (column.width) ? column.width : this.props.style.dataColumn.width,
								...column.style
							}
							let originalColumn = this.props.originalColumns[i]
							// check if the value needs to be transformed using the "func and icon" function
							const prop = column.key
							const field = item[ prop ] 
							let value = ( field != undefined ) ? ( column.func != undefined ) ? column.func( field, item ) : field : ''
							const icon = ( column.icon != undefined ) ? column.icon( field, item ) : false							
							let cellContent = originalColumn.content && originalColumn.content(field, item, this.props.index )
							let content = false
							if( cellContent ){
								if( typeof cellContent === 'string' ){
									value = cellContent
								}
								else{
									content = cellContent
								}
							}
							let onClick
							
							if( typeof column.link === 'function' ){
								onClick = () => column.link(field,item)
								style.color = '#00A3E0'
								style.cursor = 'pointer'
								content = <Link onClick={ onClick } value={ value } />
							}							
														
							return (
								<ListItemCell 
									key={i.toString()}
									rowIndex={ this.props.index }
									cellIndex={ i }
									icon={ icon }
									value={ value } 							
									style={ style }
									content={ content }
									onClick={ onClick }
								/>
							)
						})
					}					

					{ /*this.props.showScrollbar && <ScrollBarCell />  */}
				</div>
				
				
				{ this.props.children != undefined && 
					<div className='data-list-children-row'>
						{ this.props.children }
						<NotifyResize onResize={ this.onResize }/>
					</div>
				}
				
			</div>
		)
	}

}

export default ListItem