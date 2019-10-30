import React from 'react';
import { hot } from 'react-hot-loader/root';
import Menu, { MenuItem } from '../components/Menu';
import ScrollBox from '../components/ScrollBox';
import DataList from '../components/DataList';
import Button from '../components/Button';
import * as ComponentViews from './All';
import WrappedNavbar from './All/ComponentNavbar';
import '../assets/styles/index.scss';
import './index.scss';

const componentMappings = Object.keys(ComponentViews).map(view => ({
  name: view.substring(9), // 'Remove the prefix "component"
  view,
}));
const viewNames = componentMappings.map(c => c.name);

const MenuItems = componentMappings.map(({ name }) => (
  <MenuItem key={name} path={`/${name}`} label={name}>
    {name}
  </MenuItem>
));

const Views = {};

componentMappings.forEach(({ view, name }) => {
  const CMP = ComponentViews[view];
  if (name.includes('DataList') || name.includes('ContentReader')) {
    Views[name] = <CMP />;
  } else {
    Views[name] = (
      <ScrollBox>
        <CMP />
      </ScrollBox>
    );
  }
});

const columns = [
  {
    label: 'prop',
    key: 'prop',
  },
  {
    label: 'type',
    key: 'type',
  },
  {
    label: 'value',
    key: 'value',
  },
];
const Block = ({ title, children }) => (
  <div className="header__block__container">
    <div className="header__block__title">{title}</div>
    <div className="header__block__props">{children}</div>
  </div>
);

class Header extends React.Component {
  static getValueType(value) {
    return Object.prototype.toString
      .call(value)
      .split(' ')[1]
      .slice(0, -1);
  }
  constructor(props) {
    super(props);
    this.getComponentProps = this.getComponentProps.bind(this);
    this.state = {
      open: true,
    };
  }
  getComponentProps() {
    const name = this.props.component;
    let allExportedOnes = {};

    try {
      // eslint-disable-next-line
      const LibComponents = require(`../components/${name}/index.js`);

      if (LibComponents.default) {
        allExportedOnes = [LibComponents.default];
      } else {
        allExportedOnes = Object.values(LibComponents);
      }

      return allExportedOnes.reduce((prev, component) => {
        const props = Object.entries(component.defaultProps).map(([prop, value]) => {
          return {
            prop,
            type: Header.getValueType(value),
            value: JSON.stringify(value),
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
      return null;
    }
  }
  render() {
    return (
      <div id="view__header" className={this.state.open && 'view__header--open'}>
        <div id="view__header__title-row">
          <div id="view__header__title">{this.props.component}</div>
          <Button
            size="s"
            label="show props"
            onClick={() => this.setState({ open: !this.state.open })}
          />
        </div>
        {this.state.open && (
          <div id="view__header__props">
            <ScrollBox><div>{this.getComponentProps()}</div></ScrollBox>
          </div>
        )}
      </div>
    );
  }
}

class Examples extends React.Component {
  constructor(props) {
    super(props);
    this.onSelectTab = this.onSelectTab.bind(this);

    const selectedTab = window.localStorage.getItem('tab');
    let tab;
    if (viewNames.includes(selectedTab)) {
      tab = selectedTab;
    } else {
      tab = `${viewNames[0]}`;
    }

    this.state = {
      tab,
    };
  }
  onSelectTab(tab) {
    const viewName = tab.substring(1);
    window.localStorage.setItem('tab', viewName);
    this.setState({ tab: viewName });
  }

  render() {
    return (
      <div id="navbar">
        <WrappedNavbar />
        <div id="content">
          <div id="menu">
            <ScrollBox flex>
              <Menu path="/" pathname={`/${this.state.tab}`} onChange={this.onSelectTab}>
                {MenuItems}
              </Menu>
            </ScrollBox>
          </div>
          <div id="view">
            <Header component={this.state.tab} />
            <div id="view__content">{Views[this.state.tab]}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(Examples);
