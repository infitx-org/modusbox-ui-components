import React, { PropTypes } from 'react';

import * as utils from '../../utils/common';

import ScrollBar from './ScrollBar';

import './ScrollBox.scss';

class ScrollBox extends React.PureComponent {
	constructor(props) {
		super(props);
		this.handleResize = this.handleResize.bind(this);
		this.updateScrollbar = this.updateScrollbar.bind(this);
		this.updateContentSize = this.updateContentSize.bind(this);
		this.onDrag = this.onDrag.bind(this);
	}
	componentDidMount() {
		this.updateScrollbar();
		this.updateContentSize();

		window.addEventListener('resize', this.handleResize);
		this.refs.contentBox.addEventListener('scroll', this.updateScrollbar);
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
		this.refs.contentBox.removeEventListener('scroll', this.updateScrollbar);
	}

	componentDidUpdate() {
		this.updateScrollbar();
		this.updateContentSize();
	}
	handleResize() {
		this.updateScrollbar();
		this.updateContentSize();
	}
	updateScrollbar() {
		const { scrollTop } = this.refs.contentBox;
		const { height } = this.refs.contentBox.getBoundingClientRect();
		const contentHeight = this.refs.content.childNodes[0].getBoundingClientRect()
			.height;
		const offset = 0;
		if (this.refs.scrollbar) {
			this.refs.scrollbar.setPosition({
				scrollTop,
				offset,
				contentHeight,
				height,
			});
		}
	}
	updateContentSize() {
		const { width } = this.refs.contentBox.getBoundingClientRect();
		this.refs.content.style.width = width - 20;
	}
	onDrag(ratio) {
		const { height } = this.refs.content.getBoundingClientRect();
		const boxHeight = this.refs.contentBox.getBoundingClientRect().height;

		const scrollTop = ratio * (height - boxHeight);
		this.refs.contentBox.scrollTop = scrollTop;
	}
	render() {
		const {
			showTrack,
			handleStyle,
			trackStyle,
			style,
			children,
			flex,
		} = this.props;

		const wrapperClassName = utils.composeClassNames([
			'element-scrollbox__wrapper',
			flex && 'flexible',
		]);
		const contentBoxClassName = utils.composeClassNames([
			'element-scrollbox__content-box',
			flex && 'flexible',
		]);
		const contentClassName = utils.composeClassNames([
			'element-scrollbox__content',
			flex && 'flexible',
		]);

		return (
			<div className={wrapperClassName} style={style}>
				<div ref="contentBox" className={contentBoxClassName}>
					<div ref="content" className={contentClassName}>
						{children}
					</div>
				</div>

				<ScrollBar
					ref="scrollbar"
					trackStyle={trackStyle}
					handleStyle={handleStyle}
					showTrack={showTrack}
					onDrag={this.onDrag}
				/>
			</div>
		);
	}
}
ScrollBox.propTypes = {
	flex: React.PropTypes.bool,
	style: React.PropTypes.object,
	trackerStyle: React.PropTypes.object,
	handleStyle: React.PropTypes.object,
	showTrack: React.PropTypes.bool,
};
ScrollBox.defaultProps = {
	flex: false,
	style: {},
	trackerStyle: {},
	handleStyle: {},
	showTrack: false,
};
export default ScrollBox;
