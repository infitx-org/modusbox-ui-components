import React, { Component } from 'react';

import Row from '../../components/Row';
import Toast from '../../components/Toast';
import Button from '../../components/Button';

function showErrorToast() {
  Toast.show({
    kind: 'error',
    title: 'show me error toast',
  });
}
function showInfoToast() {
  Toast.show({
    kind: 'info',
    title: 'show me info toast',
  });
}
function showCloseableInfoToast() {
  Toast.show({
    kind: 'info',
    closeable: true,
    title: 'show me closeable info toast',
  });
}
function showSuccessToast() {
  Toast.show({
    element: <Toast title="Success Toast!" kind="success" />,
  });
}
function showCustomToast() {
  Toast.show({
    element: (
      <div>
        <span>This is a custom Toast!</span>
        <img
          width="200"
          height="160"
          alt="Toast!"
          // eslint-disable-next-line max-len
          src="https://www.ahealthiermichigan.org/wp-content/uploads/2014/09/Transform-toast-into-breakfast.jpg"
        />
      </div>
    ),
  });
}
export default class TestToast extends Component {
  render() {
    const buttonStyle = { margin: '5px' };
    return (
      <Row align="left">
        <Button
          style={buttonStyle}
          label="Info Toast"
          kind="primary"
          onClick={showInfoToast}
        />
        <Button
          style={buttonStyle}
          label="Closeable Info Toast"
          kind="secondary"
          onClick={showCloseableInfoToast}
        />
        <Button
          style={buttonStyle}
          label="Error Toast"
          kind="danger"
          onClick={showErrorToast}
        />
        <Button
          style={buttonStyle}
          label="Success Toast"
          kind="secondary"
          onClick={showSuccessToast}
        />
        <Button
          style={buttonStyle}
          label="Custom Toast"
          kind="warning"
          onClick={showCustomToast}
        />
      </Row>
    );
  }
}
