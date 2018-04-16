import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import * as utils from '../../utils/common';

import Icon from '../Icon';
import Button from '../Button';
import ScrollBox from '../ScrollBox';

import ModalTabsLayout from './ModalTabsLayout';
import './Modal.scss';

export default class ModalBackground extends PureComponent {
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
	componentDidMount() {
		this._isMounted = true;
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.isSubmitPending !== this.state.isSubmitPending) {
			if (nextProps.isSubmitPending === false) {
				if (this._isMounted) {
					this.setState({ isSubmitPending: false });
				}
			} else {
				this.setState({ isSubmitPending: true });
			}
		}
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
	onClickOverlay() {
		if (this.props.allowClose && this.props.isCloseEnabled && !this.state.isSubmitPending) {
			this.onClose();
		}
	}
	getChild() {
		const child = React.Children.only(this.props.children);
		return React.cloneElement(child, {});
	}

	render() {
		const width = `${this.props.width || '800px'}`;
		const maxHeight = this.props.maximise ? 'auto' : `calc(100% - ${60 * this.props.modalIndex + 70}px)`;
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
			background: this.props.modalIndex > 0 ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.7)',
		};

		const isSubmitDisabled = !this.props.isSubmitEnabled || this.state.isSubmitPending;
		const isCloseDisabled = !this.props.isCloseEnabled || this.state.isSubmitPending;

		const child = this.getChild();
		const hasTabs = child.type === ModalTabsLayout;
		let content = child;
		if (!hasTabs) {
			content = (
				<ScrollBox>
					<div style={{ padding: '20px' }}>{child}</div>
				</ScrollBox>
			);
		}
		const bodyClassName = utils.composeClassNames([
			'element-modal__body',
			hasTabs && 'element-modal__body--tabbed',
		]);

		return (
			<div className="element element-modal">
				<div
					className="element-modal__overlay"
					style={customStyle}
					onClick={this.onClickOverlay}
					role="presentation"
				/>
				<div className={`element-modal__container ${this.props.kind}`} style={modalStyle}>
					<div className="element-modal__header">
						<div className="element-modal__header-title">{this.props.title}</div>
						<div className='element-modal__header-close'>
							{this.props.allowClose && (
									<Icon
										onClick={this.onClose}
										name="close-small"
										size={24}									
										disabled={isCloseDisabled}
									/>
								)
							}
						</div>

					</div>

					<div className={bodyClassName}>
						{content}
					</div>

					<div className="element-modal__footer">
						<div className="element-modal__footer-left">							
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
									disabled={!this.props.isUndoEnabled || this.state.isSubmitPending}
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
									kind={this.props.kind}
									className={`element-modal__submit ${isSubmitDisabled ? 'disabled' : ''}`}
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
	kind: 'primary',
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
	children: undefined,
	width: '600',
	modalIndex: 0,
	title: '',
	allowCancel: false,
	isCancelEnabled: false,
	submitButtonId: '',
};

ModalBackground.propTypes = {
	kind: PropTypes.oneOf(['danger', 'warning', 'primary']),
	isSubmitPending: PropTypes.bool,
	isCloseEnabled: PropTypes.bool,
	isSubmitEnabled: PropTypes.bool,
	isUndoEnabled: PropTypes.bool,
	allowClose: PropTypes.bool,
	allowSubmit: PropTypes.bool,
	allowUndo: PropTypes.bool,
	onClose: PropTypes.func,
	onUndo: PropTypes.func,
	onCancel: PropTypes.func,
	onSubmit: PropTypes.func,
	primaryAction: PropTypes.string,
	maximise: PropTypes.bool,
	children: PropTypes.node,
	width: PropTypes.string,
	modalIndex: PropTypes.number,
	title: PropTypes.string,
	allowCancel: PropTypes.bool,
	isCancelEnabled: PropTypes.bool,
	submitButtonId: PropTypes.string,
};
