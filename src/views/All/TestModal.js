import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../components/Modal';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Row from '../../components/Row';

class TestModal extends React.Component {
	constructor(props) {
		super(props);

		this.onClose = this.onClose.bind(this);
		this.onOpen = this.onOpen.bind(this);

		this.state = {
			modals: [false, false, false],
		};
	}
	onOpen(n) {
		const { modals } = this.state;
		const opened = [...modals];
		opened[n] = true;
		this.setState({ modals: opened });
	}
	onClose(n) {
		const { modals } = this.state;
		const opened = [...modals];
		opened[n] = false;
		this.setState({ modals: opened });
	}
	render() {
		const { modals } = this.state;
		const [first, second, third] = modals;
		return (
			<div>
				<Row align="space-between">
					<Button kind="primary" onClick={() => this.onOpen(0)} label="Regular" />
					<Button kind="danger" onClick={() => this.onOpen(1)} label="Danger" />
					<Button kind="warning" onClick={() => this.onOpen(2)} label="Warning" />
				</Row>

				<div style={{ padding: 10, margin: '5px 0px', border: '1px solid #ccc' }}>
					{first && (
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
					{second && (
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
					{third && (
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
				</div>
			</div>
		);
	}
}
export default TestModal;
