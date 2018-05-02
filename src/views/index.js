import React from 'react';

import { Tab, Tabs, TabList, TabPanels, TabPanel } from '../components/Tabs';
import Select from '../components/Select';
import ScrollBox from '../components/ScrollBox';
import Row from '../components/Row';
import * as ComponentViews from './All';

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
  constructor(props) {
    super(props);
    this.onChangeStyle = this.onChangeStyle.bind(this);
    this.onSelectTab = this.onSelectTab.bind(this);

    const selectedTab = parseInt(window.localStorage.getItem('tab') || 0, 10);
    const tab = selectedTab !== undefined ? selectedTab : componentMappings.length - 1;
    const style = window.localStorage.getItem('style') || 'mulesoft';
    this.state = {
      tab,
      style,
    };
  }
  componentDidMount() {
    // the style file needs to be imported dynamically.
    // Since this a SCSS file, it needs to be parsed and properly loaded with Webpack
    // so it cannot be just imported via a link tag and eventually replaced
    // eslint-disable-next-line global-require, import/no-dynamic-require
    require(`../assets/styles/${this.state.style}.scss`);
  }

  onChangeStyle(style) {
    this.setState({ style });
    window.localStorage.setItem('style', style);
    // When changing the file we need to reload the page in order to remove the previous style file
    window.location.reload();
  }

  onSelectTab(e, tab) {
    window.localStorage.setItem('tab', tab);
    this.setState({ tab });
  }

  render() {
    const options = ['mulesoft', 'modusbox'].map(value => ({ label: value, value }));
    return (
      <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <div style={{ margin: '10px' }}>
          <Row>
            <Row>
              <Select
                selected={this.state.style}
                placeholder="Select StyleSheet"
                onChange={this.onChangeStyle}
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
    );
  }
}

export default Views;
