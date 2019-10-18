import React from 'react';
import { hot } from 'react-hot-loader/root';
import Menu, { MenuItem } from '../components/Menu';
import ScrollBox from '../components/ScrollBox';
import Heading from '../components/Heading';
import * as ComponentViews from './All';
import WrappedNavbar from './All/ComponentNavbar';
import '../assets/styles/index.scss';
import './index.css';


const componentMappings = Object.keys(ComponentViews).map(view => ({
  name: view.substring(9), // 'Remove the prefix "component"
  view,
}));
const viewNames = componentMappings.map(c => c.name);

const MenuItems = componentMappings.map(({ name }) => (
  <MenuItem key={name} path={`/${name}`} label={name}>{name}</MenuItem>
));

const Views = {}

componentMappings.forEach(({ view, name }) => {
  const CMP = ComponentViews[view]
  if (name.includes('DataList') || name.includes('ContentReader')) {
    Views[name] = <CMP />;
  } else {
    Views[name] = (
      <ScrollBox>
        <CMP />
      </ScrollBox>
    )
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

            <div id="view__header">
              <Heading size='2'>{this.state.tab}</Heading>
            </div>
            <div id="view__content">
              {Views[this.state.tab]}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(Examples);
