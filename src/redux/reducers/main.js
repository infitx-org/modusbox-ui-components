import { handleActions } from 'redux-actions'

const initialState = {
	counter: 0
}


const administration = handleActions({
	
	['TEST']: (state, action) => ({
		...state,
		counter: state.counter + 1 		
	})	

}, initialState)


export default administration