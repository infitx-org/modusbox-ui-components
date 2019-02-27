import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Heading.scss';

function headerTag(size) {
  if (size >= 1 && size <= 6) {
    return `h${size}`;
  }
  return 'h3';
}

class Heading extends PureComponent {
  render() {
    const { size, children, style } = this.props;
    const Header = headerTag(parseInt(size, 10));
    return (
      <Header style={style} className="element">
        <span>{children}</span>
      </Header>
    );
  }
}

Heading.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.shape(),
  children: PropTypes.node,
};
Heading.defaultProps = {
  size: 3,
  style: undefined,
  children: undefined,
};

export default Heading;
