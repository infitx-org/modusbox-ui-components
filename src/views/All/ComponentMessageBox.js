import React from 'react';

import Button from '../../components/Button';
import MessageBox from '../../components/MessageBox';
import Row from '../../components/Row';

const Wrapped = props => (
  <div className="m5">
    <MessageBox {...props} />
  </div>
);

const TestMessageBox = () => (
  <div style={{ padding: 10 }}>
    Simple
    <Wrapped message="A Default MessageBox, when not wrapped in flexbox, will take 100% width" kind="default" />
    All kinds regular
    <Row wrap>
      <Wrapped message="Default" kind="default" />
      <Wrapped message="Primary" kind="primary" />
      <Wrapped message="Secondary" kind="secondary" />
      <Wrapped message="Tertiary" kind="tertiary" />
      <Wrapped message="Success" kind="success" />
      <Wrapped message="Danger" kind="danger" />
      <Wrapped message="Warning" kind="warning" />
      <Wrapped message="Dark" kind="dark" />
      <Wrapped message="Light" kind="light" />
    </Row>
    All kinds with icon
    <Row wrap>
      <Wrapped icon="deploy-small" message="Default" kind="default" />
      <Wrapped icon="deploy-small" message="Primary" kind="primary" />
      <Wrapped icon="deploy-small" message="Secondary" kind="secondary" />
      <Wrapped icon="deploy-small" message="Tertiary" kind="tertiary" />
      <Wrapped icon="deploy-small" message="Success" kind="success" />
      <Wrapped icon="deploy-small" message="Danger" kind="danger" />
      <Wrapped icon="deploy-small" message="Warning" kind="warning" />
      <Wrapped icon="deploy-small" message="Dark" kind="dark" />
      <Wrapped icon="deploy-small" message="Light" kind="light" />
    </Row>
    All kinds active icon
    <Row wrap>
      <Wrapped active icon="deploy-small" message="Default" kind="default" />
      <Wrapped active icon="deploy-small" message="Primary" kind="primary" />
      <Wrapped active icon="deploy-small" message="Secondary" kind="secondary" />
      <Wrapped active icon="deploy-small" message="Tertiary" kind="tertiary" />
      <Wrapped active icon="deploy-small" message="Success" kind="success" />
      <Wrapped active icon="deploy-small" message="Danger" kind="danger" />
      <Wrapped active icon="deploy-small" message="Warning" kind="warning" />
      <Wrapped active icon="deploy-small" message="Dark" kind="dark" />
      <Wrapped active icon="deploy-small" message="Light" kind="light" />
    </Row>
    Centered
    <Wrapped center message="Font Size 20" size={20} fontSize={20} icon="deploy-small" />
    Messages
    <Wrapped
      message={['first line', 'second line', 'third line']}
      size={20}
      fontSize={20}
      icon="deploy-small"
    />
    Children
    <Wrapped>
      <Button label="I am a child" style={{ marginLeft: 10 }} />
    </Wrapped>
    Fill Icon
    <Wrapped message="Filling the icon" icon="deploy-small" fill="#f00" />
    Sizes
    <Row wrap>
      <Wrapped message="Font Size 10" size={20} fontSize={10} icon="deploy-small" />
      <Wrapped message="Font Size 20" size={20} fontSize={20} icon="deploy-small" />
      <Wrapped message="Font Size 30" size={20} fontSize={30} icon="deploy-small" />
      <Wrapped message="Icon Size 10" size={10} fontSize={20} icon="deploy-small" />
      <Wrapped message="Icon Size 20" size={20} fontSize={20} icon="deploy-small" />
      <Wrapped message="Icon Size 30" size={30} fontSize={20} icon="deploy-small" />
      <Wrapped message="Font and Icon Size 10" size={10} fontSize={10} icon="deploy-small" />
      <Wrapped message="Font and Icon Size 20" size={20} fontSize={20} icon="deploy-small" />
      <Wrapped message="Font and Icon Size 30" size={30} fontSize={30} icon="deploy-small" />
    </Row>

    Active Sizes
    <Row wrap>
      <Wrapped active message="Font Size 10" size={20} fontSize={10} icon="deploy-small" />
      <Wrapped active message="Font Size 20" size={20} fontSize={20} icon="deploy-small" />
      <Wrapped active message="Font Size 30" size={20} fontSize={30} icon="deploy-small" />
      <Wrapped active message="Icon Size 10" size={10} fontSize={20} icon="deploy-small" />
      <Wrapped active message="Icon Size 20" size={20} fontSize={20} icon="deploy-small" />
      <Wrapped active message="Icon Size 30" size={30} fontSize={20} icon="deploy-small" />
      <Wrapped active message="Font and Icon Size 10" size={10} fontSize={10} icon="deploy-small" />
      <Wrapped active message="Font and Icon Size 20" size={20} fontSize={20} icon="deploy-small" />
      <Wrapped active message="Font and Icon Size 30" size={30} fontSize={30} icon="deploy-small" />
    </Row>


    Wrapped into each other
    <Wrapped icon="deploy-small" size={50}>
      <Wrapped center message="Font Size 10" size={10} fontSize={10} icon="deploy-small" />
      <Wrapped center message="Font Size 20" size={20} fontSize={20} icon="deploy-small" />
      <Wrapped center message="Font Size 20" size={30} fontSize={30} icon="deploy-small" />
    </Wrapped>
  </div>
);

export default TestMessageBox;
