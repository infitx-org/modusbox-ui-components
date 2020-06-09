import React from 'react';

import Button from '../Button';
import MessageBox from './MessageBox';
import Row from '../Row';
import Column from '../Column';

export default {
  title: 'MessageBox',
  component: MessageBox,
};

export const Default = () => (
  <div>
    <div className="m5">
      <MessageBox
        message="A Default MessageBox, when not wrapped in flexbox, will take 100% width"
        kind="default"
      />
    </div>
  </div>
);

export const AllKindsRegular = () => (
  <div>
    <div className="m5">
      <MessageBox message="Default" kind="default" />
    </div>
    <div className="m5">
      <MessageBox message="Primary" kind="primary" />
    </div>
    <div className="m5">
      <MessageBox message="Secondary" kind="secondary" />
    </div>
    <div className="m5">
      <MessageBox message="Tertiary" kind="tertiary" />
    </div>
    <div className="m5">
      <MessageBox message="Success" kind="success" />
    </div>
    <div className="m5">
      <MessageBox message="Danger" kind="danger" />
    </div>
    <div className="m5">
      <MessageBox message="Warning" kind="warning" />
    </div>
    <div className="m5">
      <MessageBox message="Dark" kind="dark" />
    </div>
    <div className="m5">
      <MessageBox message="Light" kind="light" />
    </div>
  </div>
);

export const AllKindsWithIcon = () => (
  <div>
    <div className="m5">
      <MessageBox icon="deploy-small" message="Default" kind="default" />
    </div>
    <div className="m5">
      <MessageBox icon="deploy-small" message="Primary" kind="primary" />
    </div>
    <div className="m5">
      <MessageBox icon="deploy-small" message="Secondary" kind="secondary" />
    </div>
    <div className="m5">
      <MessageBox icon="deploy-small" message="Tertiary" kind="tertiary" />
    </div>
    <div className="m5">
      <MessageBox icon="deploy-small" message="Success" kind="success" />
    </div>
    <div className="m5">
      <MessageBox icon="deploy-small" message="Danger" kind="danger" />
    </div>
    <div className="m5">
      <MessageBox icon="deploy-small" message="Warning" kind="warning" />
    </div>
    <div className="m5">
      <MessageBox icon="deploy-small" message="Dark" kind="dark" />
    </div>
    <div className="m5">
      <MessageBox icon="deploy-small" message="Light" kind="light" />
    </div>
  </div>
);

export const AllKindsActiveIcon = () => (
  <div>
    <div className="m5">
      <MessageBox active icon="deploy-small" message="Default" kind="default" />
    </div>
    <div className="m5">
      <MessageBox active icon="deploy-small" message="Primary" kind="primary" />
    </div>
    <div className="m5">
      <MessageBox active icon="deploy-small" message="Secondary" kind="secondary" />
    </div>
    <div className="m5">
      <MessageBox active icon="deploy-small" message="Tertiary" kind="tertiary" />
    </div>
    <div className="m5">
      <MessageBox active icon="deploy-small" message="Success" kind="success" />
    </div>
    <div className="m5">
      <MessageBox active icon="deploy-small" message="Danger" kind="danger" />
    </div>
    <div className="m5">
      <MessageBox active icon="deploy-small" message="Warning" kind="warning" />
    </div>
    <div className="m5">
      <MessageBox active icon="deploy-small" message="Dark" kind="dark" />
    </div>
    <div className="m5">
      <MessageBox active icon="deploy-small" message="Light" kind="light" />
    </div>
  </div>
);

export const Centered = () => (
  <div>
    <div className="m5">
      <MessageBox center message="Font Size 20" size={20} fontSize={20} icon="deploy-small" />
    </div>
  </div>
);

export const MultipleMessages = () => (
  <div>
    <div className="m5">
      <MessageBox
        message={['first line', 'second line', 'third line']}
        size={20}
        fontSize={20}
        icon="deploy-small"
      />
    </div>
  </div>
);

export const Children = () => (
  <div>
    <div className="m5">
      <MessageBox>
        <Button label="I am a child" style={{ marginLeft: 10 }} />
      </MessageBox>
    </div>
  </div>
);

export const FillIcon = () => (
  <div>
    <div className="m5">
      <MessageBox message="Filling the icon" icon="deploy-small" fill="#f00" />
    </div>
  </div>
);

export const Sizes = () => (
  <div>
    <div className="m5">
      <MessageBox message="Font Size 10" size={20} fontSize={10} icon="deploy-small" />
    </div>
    <div className="m5">
      <MessageBox message="Font Size 20" size={20} fontSize={20} icon="deploy-small" />
    </div>
    <div className="m5">
      <MessageBox message="Font Size 30" size={20} fontSize={30} icon="deploy-small" />
    </div>
    <div className="m5">
      <MessageBox message="Icon Size 10" size={10} fontSize={20} icon="deploy-small" />
    </div>
    <div className="m5">
      <MessageBox message="Icon Size 20" size={20} fontSize={20} icon="deploy-small" />
    </div>
    <div className="m5">
      <MessageBox message="Icon Size 30" size={30} fontSize={20} icon="deploy-small" />
    </div>
    <div className="m5">
      <MessageBox message="Font and Icon Size 10" size={10} fontSize={10} icon="deploy-small" />
    </div>
    <div className="m5">
      <MessageBox message="Font and Icon Size 20" size={20} fontSize={20} icon="deploy-small" />
    </div>
    <div className="m5">
      <MessageBox message="Font and Icon Size 30" size={30} fontSize={30} icon="deploy-small" />
    </div>
  </div>
);

export const ActiveSizes = () => (
  <div>
    <div className="m5">
      <MessageBox active message="Font Size 10" size={20} fontSize={10} icon="deploy-small" />
    </div>
    <div className="m5">
      <MessageBox active message="Font Size 20" size={20} fontSize={20} icon="deploy-small" />
    </div>
    <div className="m5">
      <MessageBox active message="Font Size 30" size={20} fontSize={30} icon="deploy-small" />
    </div>
    <div className="m5">
      <MessageBox active message="Icon Size 10" size={10} fontSize={20} icon="deploy-small" />
    </div>
    <div className="m5">
      <MessageBox active message="Icon Size 20" size={20} fontSize={20} icon="deploy-small" />
    </div>
    <div className="m5">
      <MessageBox active message="Icon Size 30" size={30} fontSize={20} icon="deploy-small" />
    </div>
    <div className="m5">
      <MessageBox
        active
        message="Font and Icon Size 10"
        size={10}
        fontSize={10}
        icon="deploy-small"
      />
    </div>
    <div className="m5">
      <MessageBox
        active
        message="Font and Icon Size 20"
        size={20}
        fontSize={20}
        icon="deploy-small"
      />
    </div>
    <div className="m5">
      <MessageBox
        active
        message="Font and Icon Size 30"
        size={30}
        fontSize={30}
        icon="deploy-small"
      />
    </div>
  </div>
);

export const WrappedIntoEachOther = () => (
  <div>
    <div className="m5">
      <MessageBox icon="deploy-small" size={50}>
        <div className="m5">
          <MessageBox center message="Font Size 10" size={10} fontSize={10} icon="deploy-small" />
        </div>
        <div className="m5">
          <MessageBox center message="Font Size 20" size={20} fontSize={20} icon="deploy-small" />
        </div>
        <div className="m5">
          <MessageBox center message="Font Size 20" size={30} fontSize={30} icon="deploy-small" />
        </div>
      </MessageBox>
    </div>
  </div>
);
