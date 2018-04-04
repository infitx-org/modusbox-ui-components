import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Tooltip.scss';

class Tooltip extends PureComponent {
	constructor(props) {
		super(props);
		this.prepareTooltip = this.prepareTooltip.bind(this);
		this.showTooltip = this.showTooltip.bind(this);
		this.hideTooltip = this.hideTooltip.bind(this);
	}
	componentDidMount() {
		this.prepareTooltip();
	}
	componentDidUpdate() {
		this.prepareTooltip();
	}
	componentWillUnmount() {
		if (this.hasTooltip) {
			this.box.removeEventListener('mouseenter', this.showTooltip);
			this.box.removeEventListener('mouseleave', this.hideTooltip);
		}
	}
	prepareTooltip() {
		if (this.content) {
			const { scrollWidth, offsetWidth } = this.content;
			if (scrollWidth > offsetWidth) {
				this.box.addEventListener('mouseenter', this.showTooltip);
				this.box.addEventListener('mouseleave', this.hideTooltip);
				this.hasTooltip = true;
			}
		}
	}
	showTooltip() {
		const { left, right, top, height } = this.box.getBoundingClientRect();
		this.viewer.style.bottom = height;
		this.viewer.style.display = 'block';
	}
	hideTooltip() {
		this.viewer.style.display = 'none';
	}

	render() {
		const { style, children, content } = this.props;
		return (
			<div className="element-tooltip" style={style} ref={box => (this.box = box)}>
				<div className="element-tooltip__content" ref={content => (this.content = content)}>
					{children}
				</div>
				<span className="element-tooltip__viewer" ref={viewer => (this.viewer = viewer)}>
					{children}
				</span>
			</div>
		);
	}
}

export default Tooltip;
