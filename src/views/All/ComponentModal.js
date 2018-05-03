import React from 'react';
import Modal, { ModalTabsLayout } from '../../components/Modal';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Row from '../../components/Row';

class TestModal extends React.Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
    this.onOpen = this.onOpen.bind(this);

    this.state = {
      opened: null,
    };
  }
  onOpen(n) {
    this.setState({ opened: n });
  }
  onClose() {
    this.setState({ opened: null });
  }
  render() {
    const { opened } = this.state;
    return (
      <div>
        <Row align="space-between">
          <Button kind="primary" onClick={() => this.onOpen(0)} label="Regular" />
          <Button kind="danger" onClick={() => this.onOpen(1)} label="Danger" />
          <Button kind="warning" onClick={() => this.onOpen(2)} label="Warning" />
          <Button kind="primary" onClick={() => this.onOpen(3)} label="tabs" />
        </Row>

        <div style={{ padding: 10, margin: '5px 0px', border: '1px solid #ccc' }}>
          {opened === 0 && (
            <Modal
              primaryAction="Submit"
              onClose={() => this.onClose(0)}
              title="Primary"
              kind="primary"
              allowSubmit
              isSubmitEnabled
            >
              <span> Hello! modal 1 </span>
            </Modal>
          )}
          {opened === 1 && (
            <Modal
              primaryAction="Submit"
              onClose={() => this.onClose(1)}
              title="danger"
              kind="danger"
              allowSubmit
              isSubmitEnabled
            >
              <div style={{ height: '1000px' }}>
                <span> Hello! modal 2 </span>
                <Select options={new Array(100).fill({ label: '1', value: '2' })} />
              </div>
            </Modal>
          )}
          {opened === 2 && (
            <Modal
              primaryAction="Submit"
              onClose={() => this.onClose(2)}
              title="Warning"
              kind="warning"
              allowSubmit
              isSubmitEnabled
            >
              <span> Hello! modal 2 </span>
            </Modal>
          )}

          {opened === 3 && (
            <Modal
              primaryAction="Submit"
              onClose={() => this.onClose(2)}
              title="Warning"
              kind="warning"
              tabbed
              allowSubmit
              isSubmitEnabled
              maximise
            >
              <ModalTabsLayout items={[{ name: 'Tab1' }, { name: 'Tab2' }]} selected="Tab2">
                <div style={{ height: '12000px', background: '#999' }}>TEST TAB 1</div>
                <div style={{ height: '120px', background: '#9f9' }}>TEST TAB 2</div>
              </ModalTabsLayout>
            </Modal>
          )}
        </div>
      </div>
    );
  }
}
export default TestModal;
