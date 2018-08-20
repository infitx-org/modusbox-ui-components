import React from 'react';

import Icon from '../Icon';
import Spinner from '../Spinner';

import './Boxes.scss';


const Pending = () => (
  <div className="element-datalist__pending-box">
    <Spinner size="s" className="loading-spinner" />
  </div>
);

const ErrorMessage = () => (
  <div className="element-datalist__error-box">
    <Icon size={50} name="settings" fill="#ccc" />
    <span style={{ color: '#ccc', fontSize: 20, marginLeft: 10 }}>Service Unavailable</span>
  </div>
);

const NoData = ({ label }) => (
  <div className="element-datalist__nodata-box">
    <Icon name="dashboard" size={40} fill="#ccc" />
    <span style={{ color: '#ccc', fontSize: 20, marginLeft: 10 }}>No {label}s were found</span>
  </div>
);

export {
  Pending,
  ErrorMessage,
  NoData,
};
