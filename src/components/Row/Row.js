import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

const mapFlexToProperty = property => {
  const flexMappers = {
    top: 'flex-start',
    bottom: 'flex-end',
    left: 'flex-start',
    right: 'flex-end',
    spaceBetween: 'space-between',
  };
  return property ? flexMappers[property] || property : undefined;
};
class Row extends PureComponent {
  render() {
    const { align, wrap, grow, shrink, basis, className, style, children } = this.props;
    const [justifyContent, alignItems] = align.split(' ');
    const styles = {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: wrap ? 'wrap' : '',
      flexGrow: grow,
      flexShrink: shrink,
      flexBasis: basis,
      alignItems: mapFlexToProperty(alignItems || 'center'),
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
  style: PropTypes.shape(),
  children: PropTypes.node,
};
Row.defaultProps = {
  align: 'space-between center',
  wrap: false,
  grow: undefined,
  shrink: undefined,
  basis: 'auto',
  className: undefined,
  style: undefined,
  children: undefined,
};
export default Row;
