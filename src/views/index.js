import React from 'react';
import { Tab, Tabs, TabList, TabPanels, TabPanel } from '../components/Tabs';
import Select from '../components/Select';
import ScrollBox from '../components/ScrollBox';
import Row from '../components/Row';
import * as ComponentViews from './All';
import WrappedNavbar from './All/ComponentNavbar';

const componentMappings = Object.keys(ComponentViews).map(view => ({
  name: view.substring(9), // 'Remove the prefix "component"
  view,
}));

const AllItemTabs = componentMappings.map(({ name }) => <Tab key={name}> {name} </Tab>);
const AllItemPanels = componentMappings.map(({ view, name }) => {
  const View = ComponentViews[view];
  if (name === 'DataList') {
    return (
      <TabPanel key={name}>
        <View />
      </TabPanel>
    );
  }
  return (
    <TabPanel key={name}>
      <ScrollBox>
        <View />
      </ScrollBox>
    </TabPanel>
  );
});

class Views extends React.Component {
  static onChangeStyle(style) {
    window.location.href = `http://localhost:9090/${style}.html`;
  }

  constructor(props) {
    super(props);
    this.onSelectTab = this.onSelectTab.bind(this);
    const selectedTab = parseInt(window.localStorage.getItem('tab') || 0, 10);
    const tab = selectedTab !== undefined ? selectedTab : componentMappings.length - 1;

    this.state = {
      tab,
    };
  }
  onSelectTab(e, tab) {
    window.localStorage.setItem('tab', tab);
    this.setState({ tab });
  }

  render() {
    const options = ['mulesoft', 'modusbox'].map(value => ({ label: value, value }));
    return (
      <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <WrappedNavbar />
        <div
          style={{
            position: 'absolute',
            top: '55px',
            width: '100%',
            bottom: '0px',
          }}
        >
          <div style={{ margin: '10px' }}>
            <Row>
              <Row>
                <Select
                  selected={this.state.style}
                  placeholder="Select StyleSheet"
                  onChange={Views.onChangeStyle}
                  options={options}
                />
              </Row>
            </Row>
          </div>
          <div
            style={{
              position: 'absolute',
              top: 60,
              bottom: 0,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Tabs selected={this.state.tab} onSelect={this.onSelectTab} flex id="main-tabs">
              <TabList>{AllItemTabs}</TabList>
              <TabPanels>{AllItemPanels}</TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default Views;
