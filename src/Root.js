import React from 'react';
import ReactDOM from 'react-dom';

import Views from './views';
import './assets/main.css';
import './assets/views.css';
import './assets/styles/vars/fonts.scss';
import './assets/styles/themes/modusbox.scss';

const Root = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      display: 'flex',
    }}
  >
    <Views />
  </div>
);

ReactDOM.render(<Root />, document.getElementById('root'));
