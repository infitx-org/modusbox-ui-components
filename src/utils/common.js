const focusNextFocusableElement = ( currentElement, next = true ) => {
	currentElement.blur();

	const { body, activeElement } = document
	const forceFocusNextElement = activeElement === currentElement || activeElement === body	
		
	if( forceFocusNextElement ){
		const selector = 'input:not([disabled]),button:not([disabled]):not(.component__inner-button)'
		const inputs = document.querySelectorAll( selector )							
		const inputList = Array.prototype.slice.call( inputs )			
		const nextIndex = inputList.indexOf( currentElement ) + ( next ? 1 : -1 )		
		if( nextIndex < 0 ){
			inputList[ inputList.length + nextIndex ].focus()
		}
		else if( nextIndex >= inputList.length ){					
			inputList[ nextIndex % inputList.length ].focus()
		}
		else{
			inputList[ nextIndex ].focus()
		}
	}
	return 
}

const composeClassNames = ( items ) => {
	return items.filter( item => {
		return item !== true && 
		item !== false && 
		item !== undefined &&
		item !== null
	}).join(' ')
}

export {
	focusNextFocusableElement,
	composeClassNames,
}