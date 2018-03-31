import React, { PropTypes } from 'react';

const mapFlexToProperty = property => {
	const flexMappers = {
		top: 'flex-start',
		bottom: 'flex-end',
		left: 'flex-start',
		right: 'flex-end',
	};
	return property ? flexMappers[property] || property : undefined;
};
class Row extends React.PureComponent {
	render() {
		const {
			align,
			wrap,
			grow,
			shrink,
			basis,
			className,
			style,
			children,
		} = this.props;
		const [alignItems, justifyContent] = align.split(' ');
		const styles = {
			display: 'flex',
			flexDirection: 'row',
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

Row.propTypes = {
	align: PropTypes.string,
	wrap: PropTypes.bool,
	grow: PropTypes.string,
	shrink: PropTypes.string,
	basis: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.object,
};
Row.defaultProps = {
	align: 'center',
	wrap: false,
	grow: undefined,
	shrink: undefined,
	basis: 'auto',
	className: undefined,
	style: undefined,
};
export default Row;
