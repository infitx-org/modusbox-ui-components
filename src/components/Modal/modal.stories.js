/* eslint no-console: "off" */
import React, { useState } from 'react';

import Button from '../Button';
import Modal, { ModalTabsLayout } from './index';
import Row from '../Row';
import Select from '../Select';
import TextField from '../TextField';

export default {
  title: 'Modal',
  component: Modal,
};

class ModalOpener extends React.Component {
  constructor(props) {
    super(props);

    this.onCloseClick = this.onCloseClick.bind(this);
    this.onOpenClick = this.onOpenClick.bind(this);

    this.state = {
      opened: false,
    };
  }
  onOpenClick() {
    this.setState({ opened: true });
  }
  onCloseClick() {
    this.setState({ opened: false });
  }
  render() {
    const [child] = React.Children.toArray(this.props.children);
    return (
      <div>
        <Button label="Open Modal" onClick={this.onOpenClick} />
        {this.state.opened &&
          React.cloneElement(child, { ...child.props, onClose: this.onCloseClick })}
      </div>
    );
  }
}

export const Regular = () => (
  <ModalOpener>
    <Modal title="Regular">
      <span>Modal Content</span>
    </Modal>
  </ModalOpener>
);

export const Primary = () => (
  <ModalOpener>
    <Modal title="Primary" kind="primary">
      <span>Modal Content</span>
    </Modal>
  </ModalOpener>
);

export const Warning = () => (
  <ModalOpener>
    <Modal title="Warning" kind="warning">
      <span>Modal Content</span>
    </Modal>
  </ModalOpener>
);

export const Danger = () => (
  <ModalOpener>
    <Modal title="Danger" kind="danger">
      <span>Modal Content</span>
    </Modal>
  </ModalOpener>
);

export const WithoutClose = () => (
  <ModalOpener>
    <Modal title="Without Close Button" allowClose={false}>
      <span>
        Since the modal itself does not have a close button on the header and the footer,
        <br />
        you cannot close!
      </span>
    </Modal>
  </ModalOpener>
);

export const WithSubmit = () => (
  <ModalOpener>
    <Modal title="With Submit Button" allowSubmit isSubmitEnabled onSubmit={console.log}>
      <span>You can press the submit button</span>
    </Modal>
  </ModalOpener>
);

export const WithCancel = () => (
  <ModalOpener>
    <Modal title="With Cancel Button" allowCancel isCancelEnabled onCancel={console.log}>
      <span>You can press the cancel button</span>
    </Modal>
  </ModalOpener>
);

export const WithUndo = () => (
  <ModalOpener>
    <Modal title="Without Close Button" allowUndo isUndoEnabled onUndo={console.log}>
      <span>You can press the close button</span>
    </Modal>
  </ModalOpener>
);

export const WithoutFooter = () => (
  <ModalOpener>
    <Modal title="Without Footer" noFooter>
      <span>footer is missing!</span>
    </Modal>
  </ModalOpener>
);

export const WithTabs = () => (
  <ModalOpener>
    <Modal
      primaryAction="Submit"
      onClose={() => this.onClose(3)}
      title="Warning"
      kind="warning"
      tabbed
      allowSubmit
      isSubmitEnabled
      maximise
    >
      <ModalTabsLayout items={[{ name: 'Tab1' }, { name: 'Tab2' }]} selected="Tab2">
        <div style={{ height: '12000px', background: '#999' }}>
          TEST TAB 1<Select options={new Array(100).fill({ label: '1', value: '2' })} />
        </div>
        <div style={{ height: '120px', background: '#9f9' }}>
          TEST TAB 2<Select options={new Array(100).fill({ label: '1', value: '2' })} />
        </div>
      </ModalTabsLayout>
    </Modal>
  </ModalOpener>
);

export const Nested = () => (
  <ModalOpener>
    <Modal title="Parent">
      <ModalOpener>
        <Modal title="Child">
          <ModalOpener>
            <Modal title="Grand Child">Grand Child</Modal>
          </ModalOpener>
        </Modal>
      </ModalOpener>
    </Modal>
  </ModalOpener>
);
