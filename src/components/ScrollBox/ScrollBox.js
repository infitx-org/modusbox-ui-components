import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import * as utils from '../../utils/common';

import ScrollBar from './ScrollBar';

import './ScrollBox.scss';

class ScrollBox extends PureComponent {
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
		this.contentBox.addEventListener('scroll', this.updateScrollbar);
	}
	componentDidUpdate() {
		this.updateScrollbar();
		this.updateContentSize();
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
		this.contentBox.removeEventListener('scroll', this.updateScrollbar);
	}
	onDrag(ratio) {
		const { height } = this.content.getBoundingClientRect();
		const boxHeight = this.contentBox.getBoundingClientRect().height;

		const scrollTop = ratio * (height - boxHeight);
		this.contentBox.scrollTop = scrollTop;
	}
	handleResize() {
		this.updateScrollbar();
		this.updateContentSize();
	}
	updateScrollbar() {
		const { scrollTop } = this.contentBox;
		const { height } = this.contentBox.getBoundingClientRect();
		const contentHeight = this.content.childNodes[0].getBoundingClientRect().height;
		const offset = 0;
		if (this.scrollbar) {
			this.scrollbar.setPosition({
				scrollTop,
				offset,
				contentHeight,
				height,
			});
		}
	}
	updateContentSize() {
		const { width } = this.wrapper.getBoundingClientRect();
		this.content.style.width = width;
	}
	render() {
		const {
			showTrack, handleStyle, trackStyle, style, children, flex,
		} = this.props;

		const wrapperClassName = utils.composeClassNames(['element-scrollbox__wrapper', flex && 'flexible']);
		const contentBoxClassName = utils.composeClassNames(['element-scrollbox__content-box', flex && 'flexible']);
		const contentClassName = utils.composeClassNames(['element-scrollbox__content', flex && 'flexible']);

		return (
			<div ref={(wrapper) => { this.wrapper = wrapper; }}className={wrapperClassName} style={style}>
				<div ref={(contentBox) => { this.contentBox = contentBox; }} className={contentBoxClassName}>
					<div ref={(content) => { this.content = content; }} className={contentClassName}>
						{children}
					</div>
				</div>

				<ScrollBar
					ref={(scrollbar) => { this.scrollbar = scrollbar; }}
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
	flex: PropTypes.bool,
	style: PropTypes.shape(),
	trackStyle: PropTypes.shape(),
	handleStyle: PropTypes.shape(),
	showTrack: PropTypes.bool,
	children: PropTypes.node,
};
ScrollBox.defaultProps = {
	flex: false,
	style: {},
	trackStyle: {},
	handleStyle: {},
	showTrack: false,
	children: undefined,
};
export default ScrollBox;
