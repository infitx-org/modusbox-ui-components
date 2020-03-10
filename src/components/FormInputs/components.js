import './FormInput.scss';
import '../../icons/mule/forum-small.svg';

import React, { PureComponent } from 'react';

import * as utils from '../../utils/common';
import Button from '../Button';
import Icon from '../Icon';
import Tooltip from '../Tooltip';


export const FieldInfoOverlay = ({ assignRef, title, description, url, required }) => (
  <div className="forminput__field-info" ref={assignRef}>
    <div className="forminput__field-info__title-container">
      <div className="forminput__field-info__title">{title}</div>
      {required && (
        <React.Fragment>
          <div className="forminput__field-info__required-icon">
            <Icon size={20} name="info-small" className="forminput__label-icon" fill="#333" />
          </div>
          <div className="forminput__field-info__required-label"> required </div>
        </React.Fragment>
      )}
    </div>
    <div className="forminput__field-info__content">
      <p>{description}</p>
    </div>
    {url && (
      <div className="forminput__field-info__url">
        <a href={url}>{url}</a>
      </div>
    )}
  </div>
);

export class FieldInfo extends PureComponent {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.closeIfClickingOutside = this.closeIfClickingOutside.bind(this);
    this.state = {
      open: false,
    };
  }
  componentWillUnmount() {
    this.close();
  }
  onClick() {
    if (this.state.open) {
      this.close();
    } else {
      this.open();
    }
  }
  open() {
    this.area = React.createRef();
    this.setState(
      {
        open: true,
      },
      () => {
        document.addEventListener('click', this.closeIfClickingOutside);
      },
    );
  }
  close() {
    this.setState(
      {
        open: false,
      },
      () => {
        this.area = null;
        document.removeEventListener('click', this.closeIfClickingOutside);
      },
    );
  }
  closeIfClickingOutside(evt) {
    if (!this.area.current) {
      return;
    }
    if (!this.area.current.contains(evt.target)) {
      this.close();
    }
  }
  render() {
    const { iconSize, title, required, description, url } = this.props;
    let content = null;
    if (this.state.open) {
      content = (
        <FieldInfoOverlay
          assignRef={this.area}
          title={title}
          description={description}
          url={url}
          required={required}
        />
      );
    }
    const fieldInfoClassName = utils.composeClassNames([
      'forminput__field-info__icon',
      this.state.open && 'forminput__field-info__icon--active',
    ]);

    return (
      <Tooltip
        forceVisibility={this.state.open}
        showOnHover={false}
        content={content}
        custom
        position="right"
        align="start"
      >
        <Icon
          name="forum-small"
          onClick={this.onClick}
          size={iconSize}
          className={fieldInfoClassName}
        />
      </Tooltip>
    );
  }
}

export const Label = ({ size, label, required, complete, description, url }) => {
  if (!label) {
    return null;
  }

  const className = utils.composeClassNames([
    'forminput__label-box',
    size === 's' && 'forminput__label-box--small',
    size === 'm' && 'forminput__label-box--medium',
    size === 'l' && 'forminput__label-box--large',
  ]);
  const iconSizes = {
    s: 11,
    m: 12,
    l: 14,
  };
  const iconSize = iconSizes[size];
  return (
    <div className={className}>
      {required && (
        <Icon
          size={iconSize}
          name="info-small"
          className="forminput__label-icon"
          fill={complete ? '#39f' : '#f93'}
          tooltip={complete ? '' : 'This is a required field'}
        />
      )}
      <label>{label}</label>
      {description && (
        <FieldInfo
          iconSize={iconSize}
          title={label}
          description={description}
          url={url}
          required={required}
        />
      )}
    </div>
  );
};

export const InlineButton = ({ visible, isLocked, isDisabled, onClick, label }) => {
  if (!visible || isLocked || isDisabled) {
    return null;
  }

  return (
    <Button
      size="m"
      noFill
      kind="secondary"
      className="forminput__inline-button"
      onClick={onClick}
      disabled={isDisabled}
      label={label}
    />
  );
};

export const LockedIcon = ({ locked }) => {
  if (!locked) {
    return null;
  }
  return (
    <div className="forminput__inline-icon">
      <Icon
        name="lock-small"
        size={20}
        fill="#999"
        style={{ marginLeft: '10px' }}
        tooltip="this field is locked"
      />
    </div>
  );
};

export const InfoMessage = ({ message }) => (
  <div className="forminput__input-message">{message && <Tooltip>{message}</Tooltip>}</div>
);
