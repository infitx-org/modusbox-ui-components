import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './Tooltip.scss';

const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

class Tooltip extends PureComponent {
	static getPosition(box, target, position) {
		let top;
		let left;
		const { innerWidth } = window;
		const boxRect = box.getBoundingClientRect();
		const tooltipRect = target.getBoundingClientRect();

		const leftCenteredByY = boxRect.left + ((boxRect.width - tooltipRect.width) / 2);
		const topCenteredByX = boxRect.top + ((boxRect.height - tooltipRect.height) / 2);

		// Calculate tooltip position, it should be centered on top of the box
		if (position === 'top') {
			top = boxRect.top - tooltipRect.height - 10;
			left = leftCenteredByY;
		} else if (position === 'bottom') {
			top = boxRect.top + boxRect.height + 10;
			left = leftCenteredByY;
		} else if (position === 'left') {
			top = topCenteredByX;
			left = boxRect.left - tooltipRect.width - 10;
		} else if (position === 'right') {
			top = topCenteredByX;
			left = boxRect.left + boxRect.width + 10;
		}

		if (left < 10) {
			left = 10;
		}
		if (left + tooltipRect.width > (innerWidth - 10)) {
			left = innerWidth - 10 - tooltipRect.width;
		}
		if (top < 10) {
			top = top + boxRect.height + 10;
		}
		return { left, top };
	}
	constructor(props) {
		super(props);
		this.showTooltip = this.showTooltip.bind(this);
		this.hideTooltip = this.hideTooltip.bind(this);
		this.delayShowTooltip = this.delayShowTooltip.bind(this);
		this.delayHideTooltip = this.delayHideTooltip.bind(this);
	}
	componentDidMount() {
		this.box.addEventListener('mouseenter', this.delayShowTooltip);
		this.box.addEventListener('mouseleave', this.delayHideTooltip);
		this._mounted = true;
	}
	componentDidUpdate() {}
	componentWillUnmount() {
		this._mounted = false;
		this.hideTooltip(true);
		this.box.removeEventListener('mouseenter', this.delayShowTooltip);
		this.box.removeEventListener('mouseleave', this.delayHideTooltip);
	}
	delayShowTooltip(){
		this._isHoveringTooltip = true;
		clearTimeout( this.tooltipTimeout )
		this.tooltipTimeout = setTimeout( this.showTooltip, 200 );
	}
	delayHideTooltip(){
		this._isHoveringTooltip = false;
		clearTimeout( this.tooltipTimeout )
		this.tooltipTimeout = setTimeout( this.hideTooltip, 200 );
	}
	showTooltip() {
		if(this._isHoveringTooltip === false){
			return;
		}
		if (this.box === undefined) {
			return;
		}
		if(this._hasMountedTooltip === true){
			return;
		}
		const {
			content, label, position, children,
		} = this.props;
		const { scrollWidth, offsetWidth } = this.box;
		const shouldShowTooltip = scrollWidth > offsetWidth || label !== undefined || content !== undefined;

		if (!shouldShowTooltip) {
			return;
		}

		let cmp = <span>{children}</span>;
		let defaultAppearance = true;
		if (content) {
			cmp = content;
			defaultAppearance = false;
		} else if (label) {
			cmp = <span>{label}</span>;
		}

		this._div = document.createElement('div');
		this._div.className = 'element-tooltip__viewer';
		if (defaultAppearance === true) {
			this._div.className += ' element-tooltip__viewer--default';
		}
		this._target = document.body.appendChild(this._div);
		this._component = renderSubtreeIntoContainer(this, cmp, this._target);

		// Get By Position
		const { top, left } = Tooltip.getPosition(this.box, this._target, position);

		// Apply final updates to the tooltip itself
		this._target.style.top = top;
		this._target.style.left = left;
		this._target.className += ' element-tooltip__viewer--fade-in';

		this._hasMountedTooltip = true;
	}
	hideTooltip(force = false) {
		if(this._isHoveringTooltip === true && force === false){
			return;
		}
		if (this._hasMountedTooltip) {
			ReactDOM.unmountComponentAtNode(this._target);
			document.body.removeChild(this._target);
			this._target = null;
			this._component = null;
			this._hasMountedTooltip = false;
		}
	}

	render() {
		const { style, children } = this.props;
		return (
			<div
				className="element-tooltip"
				style={style}
				ref={(box) => {
					this.box = box;
				}}
			>
				{children}
			</div>
		);
	}
}

Tooltip.propTypes = {
	content: PropTypes.node,
	children: PropTypes.node,
	style: PropTypes.shape(),
	label: PropTypes.string,
	position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
};
Tooltip.defaultProps = {
	content: undefined,
	children: null,
	style: {},
	label: undefined,
	position: 'top',
};

export default Tooltip;
