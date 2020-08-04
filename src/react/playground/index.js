import '../assets/styles/index.scss';
import './index.scss';

import React from 'react';
import { hot } from 'react-hot-loader/root';

import Menu, { MenuItem } from '../components/Menu';
import ScrollBox from '../components/ScrollBox';
import * as ComponentViews from './All';
import WrappedNavbar from './All/ComponentNavbar';
import Header from './Header';

const setNameFromView = view => ({
  name: view.substring(9), // 'Remove the prefix "component"
  view,
});
const getNameFromMapping = mapping => mapping.name;

const toMenuItem = name => (
  <MenuItem key={name} path={`/${name}`} label={name}>
    {name}
  </MenuItem>
);

const componentViews = Object.keys(ComponentViews);
const componentMappings = componentViews.map(setNameFromView);
const viewNames = componentMappings.map(getNameFromMapping);
const MenuItems = viewNames.sort().map(toMenuItem);
const Views = {};

componentMappings.forEach(({ view, name }) => {
  const CMP = ComponentViews[view];
  if (name.includes('ContentReader')) {
    Views[name] = <CMP />;
  } else {
    Views[name] = (
      <ScrollBox>
        <CMP />
      </ScrollBox>
    );
  }
});

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
