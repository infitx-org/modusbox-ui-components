import React, { PropTypes } from 'react'
import Spinner from '../components/Spinner'

const Svg = () => (
	<div>
		<style>
		</style>
		<div style={{padding:10, margin:'5px 0px', border: '1px solid #ccc'}}>
		
			<Spinner size={ 10 }/>
			<Spinner size={ 20 }/>
			<Spinner size={ 30 }/>
			<Spinner size={ 40 }/>
			<Spinner size={ 50 }/>
			<Spinner size={ 60 }/>


			<Spinner size={ 100 }/>




		</div>
		<div style={{height: '100px', width: '100px', border: '1px solid #ccc'}}>
			<Spinner size={ 50 } center/>
		</div>
	</div>
)

export default Svg

