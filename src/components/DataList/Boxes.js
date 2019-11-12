import './Boxes.scss';

import React from 'react';

import Icon from '../Icon';
import Spinner from '../Spinner';

const Pending = () => (
  <div className="el-datalist__pending-box">
    <Spinner size="s" className="loading-spinner" />
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="el-datalist__error-box">
    <Icon size={50} name="settings" fill="#ccc" />
    <span style={{ color: '#ccc', fontSize: 20, marginLeft: 10 }}>{message}</span>
  </div>
);

const NoData = ({ message }) => (
  <div className="el-datalist__nodata-box">
    <Icon name="dashboard" size={40} fill="#ccc" />
    <span style={{ color: '#ccc', fontSize: 20, marginLeft: 10 }}>{message}</span>
  </div>
);

export { Pending, ErrorMessage, NoData };
