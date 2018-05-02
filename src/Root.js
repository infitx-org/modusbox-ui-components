import React from 'react';
import ReactDOM from 'react-dom';

import Views from './views';
import './assets/main.css';

if (window.location.pathname.indexOf('mulesoft') > -1) {
  // eslint-disable-next-line
  require('./assets/styles/themes/mulesoft.scss');
} else {
  // eslint-disable-next-line
  require('./assets/styles/themes/modusbox.scss');
}

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
