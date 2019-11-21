import React from 'react';

import Button from '../../components/Button';
import MessageBox from '../../components/MessageBox';

const Wrapped = props => (
  <div className="m5">
    <MessageBox {...props} />
  </div>
);

const TestMessageBox = () => (
  <div style={{ padding: 10 }}>
    All kinds regular
    <Wrapped message="Default" kind="default" />
    <Wrapped message="Primary" kind="primary" />
    <Wrapped message="Secondary" kind="secondary" />
    <Wrapped message="Tertiary" kind="tertiary" />
    <Wrapped message="Success" kind="success" />
    <Wrapped message="Danger" kind="danger" />
    <Wrapped message="Warning" kind="warning" />
    <Wrapped message="Dark" kind="dark" />
    <Wrapped message="Light" kind="light" />
    All kinds with icon
    <Wrapped icon="deploy-small" message="Default" kind="default" />
    <Wrapped icon="deploy-small" message="Primary" kind="primary" />
    <Wrapped icon="deploy-small" message="Secondary" kind="secondary" />
    <Wrapped icon="deploy-small" message="Tertiary" kind="tertiary" />
    <Wrapped icon="deploy-small" message="Success" kind="success" />
    <Wrapped icon="deploy-small" message="Danger" kind="danger" />
    <Wrapped icon="deploy-small" message="Warning" kind="warning" />
    <Wrapped icon="deploy-small" message="Dark" kind="dark" />
    <Wrapped icon="deploy-small" message="Light" kind="light" />
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
      <Button label="I am a child" style={{ marginLeft: 10 }} />
      <Button label="I am a child" style={{ marginLeft: 10 }} />
    </Wrapped>
    Wrapped into each other
    <Wrapped>
      <Wrapped center message="Font Size 20" size={20} fontSize={20} icon="deploy-small" />
      <Wrapped center message="Font Size 20" size={20} fontSize={20} icon="deploy-small" />
      <Wrapped center message="Font Size 20" size={20} fontSize={20} icon="deploy-small" />
    </Wrapped>
    Sizes
    <Wrapped message="Font Size 10" size={20} fontSize={10} icon="deploy-small" />
    <Wrapped message="Font Size 20" size={20} fontSize={20} icon="deploy-small" />
    <Wrapped message="Font Size 30" size={20} fontSize={30} icon="deploy-small" />
    <Wrapped message="Icon Size 10" size={10} fontSize={20} icon="deploy-small" />
    <Wrapped message="Icon Size 20" size={20} fontSize={20} icon="deploy-small" />
    <Wrapped message="Icon Size 30" size={30} fontSize={20} icon="deploy-small" />
    <Wrapped message="Font and Icon Size 10" size={10} fontSize={10} icon="deploy-small" />
    <Wrapped message="Font and Icon Size 20" size={20} fontSize={20} icon="deploy-small" />
    <Wrapped message="Font and Icon Size 30" size={30} fontSize={30} icon="deploy-small" />
  </div>
);

export default TestMessageBox;
