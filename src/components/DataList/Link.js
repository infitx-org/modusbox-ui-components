import React, { Component } from 'react';
import Icon from '../Icon';
import './Link.scss';

class Link extends Component {
	constructor(props) {
		super(props);
		this.state = { isIconVisible: false };
		this.showIcon = this.showIcon.bind(this);
		this.hideIcon = this.hideIcon.bind(this);

		this.onClick = this.onClick.bind(this);
	}
	// mount and unmount
	componentDidMount() {
		this.refs.link.addEventListener('mouseenter', this.showIcon);
		this.refs.link.addEventListener('mouseleave', this.hideIcon);
	}
	componentWillUnmount() {
		this.refs.link.removeEventListener('mouseenter', this.showIcon);
		this.refs.link.removeEventListener('mouseleave', this.hideIcon);
	}
	showIcon() {
		this.setState({ isIconVisible: true });
	}
	hideIcon() {
		this.setState({ isIconVisible: false });
	}

	onClick(evt) {
		this.props.onClick(evt);
	}

	render() {
		const text =
			this.props.value != undefined ? this.props.value.toString() : undefined;
		return (
			<div ref="link" className="datalist-link" onClick={this.onClick}>
				<div className="link-box">
					<span className="link-text-box">{text || this.props.children} </span>
				</div>
				{this.state.isIconVisible && (
					<div className="link-icon-box">
						<Icon name="open" size={16} fill="#00A3E0" />
					</div>
				)}
			</div>
		);
	}
}

export default Link;
