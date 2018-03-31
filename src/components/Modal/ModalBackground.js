import React, { PropTypes } from 'react';

import Row from '../Row';
import Button from '../Button';
import ScrollBox from '../ScrollBox';

import './Modal.scss';

export default class ModalBackground extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onClickOverlay = this.onClickOverlay.bind(this);

		this.onClose = this.onClose.bind(this);
		this.onUndo = this.onUndo.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			isSubmitPending: this.props.isSubmitPending,
		};
	}
	componentWillLeave(callback) {
		callback();
	}
	componentDidMount() {
		this._isMounted = true;
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	onClose() {
		if (typeof this.props.onClose === 'function') {
			this.props.onClose();
		}
	}
	onUndo() {
		if (typeof this.props.onUndo === 'function') {
			this.props.onUndo();
		}
	}
	onCancel() {
		if (typeof this.props.onCancel === 'function') {
			this.props.onCancel();
		}
	}
	onSubmit() {
		if (typeof this.props.onSubmit === 'function') {
			this.props.onSubmit();
		}
	}
	getChild() {
		const child = React.Children.only(this.props.children);
		return React.cloneElement(child, {});
	}
	onClickOverlay() {
		if (
			this.props.allowClose &&
			this.props.isCloseEnabled &&
			!this.state.isSubmitPending
		) {
			this.onClose();
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.isSubmitPending != this.state.isSubmitPending)
			if (nextProps.isSubmitPending === false) {
				if (this._isMounted) {
					this.setState({ isSubmitPending: false });
				}
			} else {
				this.setState({ isSubmitPending: true });
			}
	}
	render() {
		const width = `${this.props.width || '800px'}`;
		const maxHeight = this.props.maximise
			? 'auto'
			: `calc(100% - ${60 * this.props.modalIndex + 70}px)`;
		const bottom = this.props.maximise ? '20px' : undefined;
		const modalStyle = {
			top: 50 + 60 * this.props.modalIndex,
			bottom,
			maxHeight,
			width,
			left: '50%',
			marginLeft: `-${parseInt(width) / 2}px`,
		};
		const customStyle = {
			background:
				this.props.modalIndex > 0 ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.7)',
		};

		const isSubmitDisabled =
			!this.props.isSubmitEnabled || this.state.isSubmitPending;
		const isCloseDisabled =
			!this.props.isCloseEnabled || this.state.isSubmitPending;
		return (
			<div className="element-modal">
				<div
					className="element-modal__overlay"
					style={customStyle}
					onClick={this.onClickOverlay}
				/>
				<div
					className={`element-modal__container ${this.props.type}`}
					style={modalStyle}
				>
					<div className="element-modal__header">
						<div className="element-modal__header-title">
							{this.props.title}
						</div>
					</div>

					<div
						className={`element-modal__body ${
							this.props.tabbed ? 'has-tabs' : ''
						} ${this.props.alignItems ? 'align-items' : ''}`}
					>
						<ScrollBox>
							<div style={{ padding: '20px' }}>{this.getChild()}</div>
						</ScrollBox>
					</div>

					<div className="element-modal__footer">
						<div className="element-modal__footer-left">
							{this.props.allowClose && (
								<Button
									onClick={this.onClose}
									label="Close"
									icon="close-small"
									kind="danger"
									noFill
									disabled={isCloseDisabled}
								/>
							)}
						</div>
						<div className="element-modal__footer-right">
							{this.props.allowCancel && (
								<Button
									onClick={this.onCancel}
									disabled={!this.props.isCancelEnabled}
									label="Cancel"
									icon="close-small"
									kind="secondary"
								/>
							)}
							{this.props.allowUndo && (
								<Button
									onClick={this.onUndo}
									disabled={
										!this.props.isUndoEnabled || this.state.isSubmitPending
									}
									label="Undo"
									icon="trash-small"
									kind="secondary"
								/>
							)}
							{this.props.allowSubmit && (
								<Button
									id={this.props.submitButtonId}
									isLoading={this.state.isSubmitPending}
									icon="check-small"
									disabled={isSubmitDisabled}
									onClick={this.onSubmit}
									label={this.props.primaryAction}
									className={`element-modal__submit ${this.props.type} ${
										isSubmitDisabled ? 'disabled' : ''
									}`}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ModalBackground.defaultProps = {
	type: 'regular',
	isSubmitPending: false,
	isCloseEnabled: true,
	isSubmitEnabled: undefined,
	isUndoEnabled: undefined,
	allowSubmit: undefined,
	allowUndo: undefined,
	allowClose: true,
	onClose: undefined,
	onUndo: undefined,
	onCancel: undefined,
	onSubmit: undefined,
	primaryAction: 'Submit',
	maximise: false,
	tabbed: false,
	alignItems: false,
};

ModalBackground.PropTypes = {
	type: React.PropTypes.oneOf(['danger', 'warning', 'regular']),
	isSubmitPending: React.PropTypes.bool,
	isCloseEnabled: React.PropTypes.bool,
	isSubmitEnabled: React.PropTypes.bool,
	isUndoEnabled: React.PropTypes.bool,
	allowClose: React.PropTypes.bool,
	allowSubmit: React.PropTypes.bool,
	allowUndo: React.PropTypes.bool,
	onClose: React.PropTypes.func.isRequired,
	onUndo: React.PropTypes.func,
	onCancel: React.PropTypes.func,
	onSubmit: React.PropTypes.func,
	primaryAction: React.PropTypes.string.isRequired,
	maximise: React.PropTypes.bool,
	tabbed: React.PropTypes.bool,
	alignItems: React.PropTypes.bool,
};
