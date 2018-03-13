const focusNextFocusableElement = ( current, next = true ) => {
	current.blur();		
	const selector = 'input:not([disabled])'
	if( document.activeElement == document.body ){
		const inputs = document.querySelectorAll( selector )			
		const inputList = Array.prototype.slice.call( inputs )			
		const nextIndex = inputList.indexOf( current ) + ( next ? 1 : -1 )						
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



const composeClassNames = ( items ) => items.filter( item => item !== true && item !== false && item !== undefined ).join(' ')
export { focusNextFocusableElement, composeClassNames }