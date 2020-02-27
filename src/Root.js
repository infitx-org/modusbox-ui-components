import './assets/main.css';
import './assets/styles/vars/fonts.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import Views from './views';

const Root = () => (
  <div id="root">
    <Views />
  </div>
);

ReactDOM.render(<Root />, document.getElementById('root'));
