import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './Tooltip.scss';

const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

class Tooltip extends PureComponent {
	constructor(props) {
		super(props);
		this.showTooltip = this.showTooltip.bind(this);
		this.hideTooltip = this.hideTooltip.bind(this);
	}
	componentDidMount() {
		this.box.addEventListener('mouseenter', this.showTooltip);
		this.box.addEventListener('mouseleave', this.hideTooltip);
	}
	componentDidUpdate() {
	}
	componentWillUnmount() {
		this.box.removeEventListener('mouseenter', this.showTooltip);
		this.box.removeEventListener('mouseleave', this.hideTooltip);
	}
	showTooltip() {
		if (this.box) {
			const { scrollWidth, offsetWidth } = this.box;

			if (scrollWidth > offsetWidth) {
				this.hasTooltip = true;

				const { left, top } = this.box.getBoundingClientRect();

				const tooltipTop = (top - 40);

				const CMP = () => (<span>{this.props.children}</span>);
				this._div = document.createElement('div');
				this._div.className = 'element-tooltip__viewer';
				this._div.style.top = tooltipTop;
				this._div.style.left = left;
				this._target = document.body.appendChild(this._div);
				this._component = renderSubtreeIntoContainer(this, <CMP />, this._target);
			}
		}
	}
	hideTooltip() {
		if (this.hasTooltip) {
			ReactDOM.unmountComponentAtNode(this._target);
			document.body.removeChild(this._target);
			this._target = null;
			this._component = null;
		}
	}

	render() {
		const { style, children } = this.props;
		return (
			<span className="element-tooltip" style={style} ref={(box) => { this.box = box; }}>
				{children}
			</span>
		);
	}
}

Tooltip.propTypes = {
	children: PropTypes.node,
	style: PropTypes.shape(),
};
Tooltip.defaultProps = {
	children: null,
	style: {},
};

export default Tooltip;
