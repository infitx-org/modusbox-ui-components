import React, { PropTypes } from 'react';

import ModalPortal from './ModalPortal';
import ModalBackground from './ModalBackground';

/**
 * This is a shorthand that combines the portal and background, because it is
 * not often that I use one without the other. I have separated them out in
 * the source code so that one can build other combinations of Background and
 * Portal.
 */
export default class ModalContainer extends React.Component {
	
	render(){
		const {
			props: {
				children,
				...otherProps,
			}
		} = this;
				
		return (
			<ModalPortal {...otherProps}>
				<ModalBackground {...otherProps}>
					{children}
				</ModalBackground>
			</ModalPortal>
		)
	}
}