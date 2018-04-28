import React from 'react';

import { Tab, Tabs, TabList, TabPanels, TabPanel } from '../components/Tabs';
import Select from '../components/Select';
import ScrollBox from '../components/ScrollBox';
import Row from '../components/Row';
import * as TestViews from './All';

const ComponentMappings = Object.keys(TestViews).map(view => ({
  name: view.substring(4),
  view,
}));

const AllItemTabs = ComponentMappings.map(({ name }, i) => <Tab key={i}> {name} </Tab>);
const AllItemPanels = ComponentMappings.map(({ view, name }, i) => {
  const View = TestViews[view];
  if (name === 'DataList') {
    return (
      <TabPanel key={i}>
        <View />
      </TabPanel>
    );
  }
  return (
    <TabPanel key={i}>
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
    const tab = selectedTab !== undefined ? selectedTab : ComponentMappings.length - 1;
    this.state = {
      tab,
      style: 'default',
    };
  }

  onChangeStyle(style) {
    this.setState({ style });
  }

  onSelectTab(e, tab) {
    window.localStorage.setItem('tab', tab);
    this.setState({ tab });
  }

  render() {
    const options = [{ label: 'default', value: 'default' }, { label: 'custom', value: 'custom' }];
    // FIXME: There has got to be a better way than this
    require('../assets/styles/' + this.state.style + '.scss');

    return (
      <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <div style={{ margin: '10px' }}>
          <Row>
            <Row>
              <Select
                value={this.state.style}
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
