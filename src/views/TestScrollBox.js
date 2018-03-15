import React, { PropTypes } from 'react'
import ScrollBox from '../components/ScrollBox'


const Content = ({ color }) => ( 
	<div style={{background:'#fc9', height: '300px', color }} >
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget sollicitudin lacus. Maecenas a sem libero. Curabitur ullamcorper, ex et tincidunt hendrerit, metus enim faucibus purus, sed euismod urna augue nec diam. Nullam tempor diam purus, id viverra nisi finibus id. Donec faucibus egestas odio, eu semper velit ornare finibus. Suspendisse pharetra, est efficitur condimentum ultricies, risus libero ullamcorper neque, et fermentum sem neque tristique tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam lacinia ante vel enim suscipit luctus. Quisque erat tellus, ullamcorper non fringilla vel, sodales ac ipsum. Aliquam erat volutpat.
		Mauris interdum massa vel ultrices laoreet. Mauris nec risus vitae magna efficitur sollicitudin sit amet eget enim. Pellentesque eu cursus erat. Vestibulum ut erat vel ipsum blandit ultrices nec ac leo. Ut quis euismod arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam iaculis arcu tortor, eget fermentum eros viverra non. Sed non gravida sapien. Vivamus sit amet libero in quam aliquam pellentesque. Quisque ultrices consequat dignissim. Aenean condimentum arcu a neque suscipit euismod. Duis malesuada convallis augue id maximus. In imperdiet odio quis nibh dapibus, quis dapibus diam venenatis. Sed sem risus, imperdiet eu dolor vel, malesuada auctor diam.
		Pellentesque consectetur vestibulum dui facilisis rutrum. Fusce vel mi et purus varius mattis. Pellentesque cursus felis convallis, cursus orci in, venenatis justo. Donec mollis commodo tellus at viverra. Vivamus molestie lectus vitae fermentum imperdiet. Duis condimentum tincidunt massa. Aliquam scelerisque leo sit amet hendrerit rutrum. Pellentesque libero orci, ullamcorper a tincidunt vel, lobortis a enim. Phasellus faucibus congue augue quis pellentesque. Aenean feugiat lacus quis nisl vehicula, vitae interdum urna tempus. Aliquam erat volutpat. Aliquam cursus congue ante, sit amet euismod metus imperdiet ac. Suspendisse in risus magna.
		Duis interdum faucibus tellus at blandit. Nam euismod sodales molestie. Maecenas urna odio, elementum eu est a, scelerisque consectetur neque. Cras quis diam pulvinar, porttitor odio et, elementum massa. Donec turpis erat, pharetra non laoreet vitae, porta eu elit. Pellentesque scelerisque leo eu erat condimentum egestas. Donec ac nibh suscipit, auctor mauris sit amet, venenatis dui. Phasellus sed tincidunt sapien. Nullam iaculis cursus sapien, quis tempus lorem tempor vel. In commodo augue ex, a maximus nisl elementum luctus.
		Etiam suscipit tortor diam, a vulputate turpis feugiat id. Aenean venenatis aliquet mauris, vel tempus lectus viverra a. Quisque tempor maximus augue. Curabitur pulvinar erat ac venenatis malesuada. Nunc vitae tincidunt leo, sit amet viverra ligula. Etiam at iaculis eros, non vulputate lacus. Mauris est ex, varius at interdum ut, accumsan a eros. Pellentesque in lectus quis quam varius placerat vehicula molestie mi.
	</div>
)

const TestScrollBox = () => (
	<div>		
		
		<div style={{height:'100%'}}>			
			<ScrollBox style={{height:'100%'}}>
				<Content color='white'/>
			</ScrollBox>
		</div>

		{/*<div style={{padding:10, margin:'5px 0px', border: '1px solid #ccc'}}>			
			<ScrollBox style={{height:'200px'}}>
				<Content color='red' />
			</ScrollBox>
		</div>

		<div style={{padding:10, margin:'5px 0px', border: '1px solid #ccc' }}>			
			<ScrollBox style={{maxHeight:'100px'}}>
				<Content color='white' />
			</ScrollBox>
		</div>	*/}
	</div>
)

export default TestScrollBox