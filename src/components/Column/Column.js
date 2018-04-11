import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const mapFlexToProperty = (property) => {
	const flexMappers = {
		top: 'flex-start',
		bottom: 'flex-end',
		left: 'flex-start',
		right: 'flex-end',
	};
	return property ? flexMappers[property] || property : undefined;
};
class Column extends PureComponent {
	render() {
		const {
			align, wrap, grow, shrink, basis, className, style, children,
		} = this.props;
		const [alignItems, justifyContent] = align.split(' ');
		const styles = {
			display: 'flex',
			flexDirection: 'column',
			flexWrap: wrap ? 'wrap' : '',
			flexGrow: grow,
			flexShrink: shrink,
			flexBasis: basis,
			alignItems: mapFlexToProperty(alignItems),
			justifyContent: mapFlexToProperty(justifyContent),
			...style,
		};
		return (
			<div className={className} style={styles}>
				{children}
			</div>
		);
	}
}

Column.propTypes = {
	align: PropTypes.string,
	wrap: PropTypes.bool,
	grow: PropTypes.string,
	shrink: PropTypes.string,
	basis: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.shape(),
	children: PropTypes.node,
};
Column.defaultProps = {
	align: 'left top',
	wrap: false,
	grow: 1,
	shrink: undefined,
	basis: 'auto',
	className: undefined,
	style: undefined,
	children: undefined,
};
export default Column;
