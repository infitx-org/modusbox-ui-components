import React from 'react';
import Modal, { ModalTabsLayout } from '../../components/Modal';
import TextField from '../../components/TextField';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Row from '../../components/Row';

class TestModal extends React.Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
    this.onOpen = this.onOpen.bind(this);

    this.state = {
      opened: [],
      counter: 0,
    };
    setInterval(() => {
      this.setState({ counter: this.state.counter + 1 });
    }, 1000);
  }
  onOpen(n) {
    this.setState({ opened: this.state.opened.concat(n) });
  }
  onClose(n) {
    this.setState({ opened: this.state.opened.filter(prevN => prevN !== n) });
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
          <Button kind="primary" onClick={() => this.onOpen(4)} label="multi" />
          <Button kind="primary" onClick={() => this.onOpen(6)} label="noFooter" />
        </Row>

        <div style={{ padding: 10, margin: '5px 0px', border: '1px solid #ccc' }}>
          {opened.includes(0) && (
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
          {opened.includes(1) && (
            <Modal
              primaryAction="Submit"
              onClose={() => this.onClose(1)}
              title="danger"
              kind="danger"
              allowSubmit
              isSubmitEnabled
            >
              <div style={{ height: '100px' }}>
                <span> Hello! modal 2 </span>
                <Select options={new Array(100).fill({ label: '1', value: '2' })} />
                <TextField placeholder="Test me" />
              </div>
            </Modal>
          )}
          {opened.includes(2) && (
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

          {opened.includes(3) && (
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
          )}

          {opened.includes(4) && (
            <Modal
              primaryAction="Submit"
              onClose={() => this.onClose(4)}
              title="Warning"
              kind="warning"
              allowSubmit
              isSubmitEnabled
            >
              <div>
                <Button kind="primary" onClick={() => this.onOpen(5)} label="multi" />
                {this.state.counter}
              </div>
            </Modal>
          )}
          {opened.includes(5) && (
            <Modal
              primaryAction="Submit"
              onClose={() => this.onClose(5)}
              title="SubModal"
              kind="warning"
              allowSubmit
              isSubmitEnabled
            >
              <div>I am the submodal!</div>
              <div>I am the submodal!</div>
              {this.state.counter}
            </Modal>
          )}
          {opened.includes(6) && (
            <Modal
              primaryAction="Submit"
              onClose={() => this.onClose(6)}
              title="Modal with no footer"
              kind="primary"
              allowSubmit
              isSubmitEnabled
              noFooter
            >
              <div>I am the submodal!</div>
              <div>I am the submodal!</div>
            </Modal>
          )}
        </div>
      </div>
    );
  }
}
export default TestModal;
