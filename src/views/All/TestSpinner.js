import React, { PropTypes } from 'react'
import Spinner from '../../components/Spinner'
import Row from '../../components/Row'

const Svg = () => (
	<div>
		<Row>			
			<Spinner color='#c33' />
			<Spinner color='#3c3' />
			<Spinner color='#33c' />
			<Spinner color='#cc3' />
			<Spinner color='#3cc' />
		</Row>			
		<Row>
			<Spinner size='s'/>
			<Spinner size='m'/>
			<Spinner size='l'/>
		</Row>
		<Row>
			<Spinner size={ 10 }/>
			<Spinner size={ 20 }/>
			<Spinner size={ 30 }/>
			<Spinner size={ 40 }/>
			<Spinner size={ 50 }/>
			<Spinner size={ 60 }/>			
			<Spinner size={ 100 }/>
		</Row>
		<div style={{height: '100px', width: '100px', border: '1px solid #ccc'}}>
			<Spinner size={ 50 } center/>
		</div>
	</div>
)

export default Svg

