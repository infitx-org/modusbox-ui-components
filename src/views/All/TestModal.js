import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../components/Modal';
import Select from '../../components/Select';
import Button from '../../components/Button';

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
				<Button onClick={() => this.onOpen(0)} label="1" />
				<Button onClick={() => this.onOpen(1)} label="2" />
				<Button onClick={() => this.onOpen(2)} label="3" />

				<div style={{ padding: 10, margin: '5px 0px', border: '1px solid #ccc' }}>
					{first && (
						<Modal primaryAction="Hey" onClose={() => this.onClose(0)} title="test">
							<span> Hello! modal 1 </span>
						</Modal>
					)}
					{second && (
						<Modal primaryAction="Hey" onClose={() => this.onClose(1)}>
							<span> Hello! modal 2 </span>
						</Modal>
					)}
					{third && (
						<Modal primaryAction="Hey" onClose={() => this.onClose(2)}>
							<div style={{ height: '1000px' }}>
								<span> Hello! modal 2 </span>
								<Select options={new Array(100).fill({ label: '1', value: '2' })} />
							</div>
						</Modal>
					)}
				</div>
			</div>
		);
	}
}
export default TestModal;
