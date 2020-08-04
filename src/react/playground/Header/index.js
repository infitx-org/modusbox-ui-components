import './index.scss';

import PropTypes from 'prop-types';
import React from 'react';
import * as utils from 'utils/common';

import ControlIcon from '../../components/ControlIcon';
import DataList from '../../components/DataList';
import MessageBox from '../../components/MessageBox';
import ScrollBox from '../../components/ScrollBox';

const PROPTYPES = {
  STRING: 'String',
  NUMBER: 'Number',
  BOOL: 'Boolean',
  OOT: 'One Ot types',
  FUNC: 'Function',
  OBJECT: 'Shape / Object',
};

const columns = [
  {
    label: 'prop',
    key: 'prop',
  },
  {
    label: 'type',
    key: 'type',
    className: 'proptype__prop__type',
  },
  {
    label: 'value',
    key: 'value',
    func: (value, prop) => <PropValue type={prop.type}>{value}</PropValue>,
  },
];

const PropValue = ({ type, children }) => (
  <span
    className={utils.composeClassNames([
      'proptype__prop__value',
      type === PROPTYPES.STRING && 'proptype__prop__value--string',
      type === PROPTYPES.NUMBER && 'proptype__prop__value--number',
      type === PROPTYPES.BOOL && 'proptype__prop__value--bool',
      type === PROPTYPES.OOT && 'proptype__prop__value--oot',
      type === PROPTYPES.OBJECT && 'proptype__prop__value--object',
      type === PROPTYPES.FUNC && 'proptype__prop__value--func',
      children === undefined && 'proptype__prop__value--undefined',
    ])}
  >
    {`${children}`}
  </span>
);

const Block = ({ title, children }) => (
  <div className="header__block__container">
    <div className="header__block__title">{title}</div>
    <div className="header__block__props">{children}</div>
  </div>
);

class Header extends React.Component {
  static getValueType(propType, value) {
    if (propType === PropTypes.string) {
      return PROPTYPES.STRING;
    } else if (propType === PropTypes.number) {
      return PROPTYPES.NUMBER;
    } else if (propType === PropTypes.bool) {
      return PROPTYPES.BOOL;
    } else if (propType === PropTypes.func) {
      return PROPTYPES.FUNC;
    } else if (propType.name === PropTypes.shape().name) {
      return PROPTYPES.OBJECT;
    }

    return Object.prototype.toString
      .call(value)
      .split(' ')[1]
      .slice(0, -1);
  }
  constructor(props) {
    super(props);
    this.getComponentProps = this.getComponentProps.bind(this);
    this.state = {
      open: false,
    };
  }
  getComponentProps() {
    const name = this.props.component;
    let allExportedOnes = {};

    try {
      // eslint-disable-next-line
      const LibComponents = require(`../../components/${name}/index.js`);

      if (LibComponents.default) {
        allExportedOnes = [LibComponents.default];
      } else {
        allExportedOnes = Object.values(LibComponents);
      }

      return allExportedOnes.reduce((prev, component) => {
        const props = Object.entries(component.propTypes).map(([prop, value]) => {
          const defaultValue = component.defaultProps[prop];
          return {
            prop,
            type: Header.getValueType(component.propTypes[prop], value),
            value: JSON.stringify(defaultValue) || undefined,
          };
        });
        return [
          ...prev,
          <Block key={component.name} title={component.name}>
            <DataList columns={columns} list={props} />
          </Block>,
        ];
      }, []);
    } catch (e) {
      return (
        <div id="playground__header__error">
          <MessageBox kind="danger">{e.toString()}</MessageBox>
        </div>
      );
    }
  }
  render() {
    return (
      <div id="playground__header">
        <div id="playground__header__title-row">
          <ControlIcon
            kind={this.state.open ? 'default' : 'secondary'}
            icon={this.state.open ? 'close-small' : 'toggle-visible'}
            size={30}
            onClick={() => this.setState({ open: !this.state.open })}
          />
          <div id="playground__header__title">{this.props.component}</div>
        </div>
        {this.state.open && (
          <ScrollBox>
            <div id="playground__header__props">{this.getComponentProps()}</div>
          </ScrollBox>
        )}
      </div>
    );
  }
}

export default Header;
