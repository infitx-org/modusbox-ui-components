import React, { PropTypes, Component } from 'react';
import Notification from 'rc-notification';
import styles from './Toast.css';

/* initialized Toast Lib */
let notification;
Notification.newInstance({
	style: { bottom: 0, right: '20px' },
}, (n) => { notification = n; });

let toastCount = 0;
const now = Date.now();
function toastUID() {
	toastCount += 1;
	return `anypoint_toast_${now}_${toastCount}`;
}
function close(key) {
	notification.removeNotice(key);
}
const noOp = () => {};

/**
 Toast is used to diplay quick notifications to the user in the corners of the screen
 */
export default class Toast extends Component {
	static show(config) {
		const text = (config.title) ? config.title : '';
		const toastKey = (config.key) ? config.key : toastUID();
		const toastKind = (config.kind) ? config.kind : 'custom';
		const toastDuration = (config.duration) ? config.duration : 4;
		const toastOnClose = (config.onClose) ? config.onClose : noOp;
		const toastStyle = (config.style) ? config.style : {};
		const closeable = (config.closeable) ? close.bind(null, toastKey) : noOp;

		const toastContent = (
			<span id={toastKey} onClick={closeable} role="presentation">
				<Toast title={text} kind={toastKind}>
					{config.element}
				</Toast>
			</span>
		);

		const toastConfig = {
			key: toastKey,
			content: toastContent,
			style: toastStyle,
			duration: toastDuration,
			onClose: toastOnClose,
		};
		notification.notice(toastConfig);
		if (config.onOpen) {
			config.onOpen(toastKey);
		}
	}

	static remove(key) {
		notification.removeNotice(key);
	}

	getClassNames() {
		const { kind, className } = this.props;
		const classProp = className || '';
		const toastPadding = (kind === 'custom') ? styles.noPadding : styles.padding;
		const toastClass = `anypoint-toast ${styles[`toast-${kind}`]}`;
		return `${styles.toast} ${toastClass} ${classProp} ${toastPadding}`;
	}
	render() {
		const { children, title } = this.props;
		const classes = this.getClassNames();
		return (
			<div className={classes}>
				<div if={title} className={styles.title}>
					{title}
				</div>
				<div if={children} className={styles.custom}>
					{children}
				</div>
			</div>
		);
	}
}


Toast.propsTypes = {
	closeable: PropTypes.bool,
	kind: PropTypes.oneOf(['success', 'error', 'info', 'custom']),
	title: PropTypes.string,
	children: PropTypes.any,
	className: PropTypes.string,
};
