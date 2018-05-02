import React, { Component } from 'react';

import Column from '../../components/Column';
import Toast from '../../components/Toast';
import Button from '../../components/Button';

export default class TestToast extends Component {
  static showErrorToast() {
    Toast.show({
      kind: 'error',
      title: 'show me error toast',
    });
  }
  static showInfoToast() {
    Toast.show({
      kind: 'info',
      title: 'show me info toast',
    });
  }
  static showCloseableInfoToast() {
    Toast.show({
      kind: 'info',
      closeable: true,
      title: 'show me closeable info toast',
    });
  }
  static showSuccessToast() {
    Toast.show({
      element: <Toast title="Success Toast!" kind="success" />,
    });
  }
  static customFunction() {
    // eslint-disable-next-line no-console
    console.log('alert');
  }
  showCustomToast() {
    Toast.show({
      element: (
        <Column align="center" style={{ background: '#CACBCC', padding: 20, width: 400 }}>
          <span>MMMMMMMM</span>
          <img
            width="200"
            height="160"
            alt="Toast!"
            // eslint-disable-next-line max-len
            src="https://www.ahealthiermichigan.org/wp-content/uploads/2014/09/Transform-toast-into-breakfast.jpg"
          />
          <Button style={{ marginTop: 10 }} onClick={this.customFunction}>
            Gimme the Toast!
          </Button>
        </Column>
      ),
    });
  }
  render() {
    return (
      <Column align="left space-around" height="300">
        <Button label="Click to Show Info Toast" kind="secondary" onClick={this.showInfoToast} />
        <Button
          label="Click to Show Closeable Info Toast"
          kind="secondary"
          onClick={this.showCloseableInfoToast}
        />
        <Button label="Click to Show Error Toast" kind="danger" onClick={this.showErrorToast} />
        <Button
          label="Click to Show Success Toast"
          kind="secondary"
          onClick={this.showSuccessToast}
        />
        <Button label="Click to Show Custom Toast" kind="primary" onClick={this.showCustomToast} />
      </Column>
    );
  }
}
