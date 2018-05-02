import React from 'react';
import Icon from '../../components/Icon';

import '../../icons/index';

const modusboxIcons = [
  'business-processes',
  'transmissions',
  'transactions',
  'errors',
  'documents',
  'toggle-visible',
  'toggle-invisible',
  'transaction-child',
  'transaction-parent',
  'transaction-standalone',
  'onhold',
  'inactive',
  'double-arrow',
  'arrow',
  'warning-sign',
  'dash',
  'saved',
  'editing',
  'magic-wand',
  'settings',
];

const mulesoftIcons = [
  'access-manager-color',
  'access-manager-greyscale',
  'admin-color',
  'admin-greyscale',
  'alert-not-active-small',
  'alert-not-active',
  'alert-small',
  'alert',
  'api-analytics-color',
  'api-analytics-greyscale',
  'api-color',
  'api-designer-color',
  'api-designer-greyscale',
  'api-greyscale',
  'api-manager-color',
  'api-manager-greyscale',
  'api-notebook-color',
  'api-notebook-greyscale',
  'api-portal-color',
  'api-portal-greyscale',
  'application-color',
  'application-greyscale',
  'application-small',
  'application',
  'arrow-down-small',
  'arrow-up-small',
  'back-small',
  'back',
  'businessgroup-small',
  'calendar-small',
  'calendar',
  'check-all-small',
  'check-small',
  'check',
  'circle-plus-small',
  'close-small',
  'close',
  'cloud-extender-color',
  'cloud-extender-greyscale',
  'cloud-small',
  'cloudhub-color',
  'cloudhub-greyscale',
  'cloudhub-small',
  'cloudhub',
  'cluster-small',
  'cluster',
  'code-small',
  'code',
  'connector-devkit-color',
  'connector-devkit-greyscale',
  'connectors-color',
  'connectors-greyscale',
  'contextmenu',
  'copy-to-clipboard-small',
  'copy-to-clipboard',
  'dashboard',
  'data-gateway-color',
  'data-gateway-greyscale',
  'data-loader-color',
  'data-loader-greyscale',
  'data-weave-color',
  'data-weave-greyscale',
  'debug-small',
  'deploy-medium',
  'deploy-small',
  'design-center-color',
  'design-center-greyscale',
  'destination-small',
  'destination',
  'detail-pane',
  'documentation-medium',
  'documentation-small',
  'documentation',
  'download-center-small',
  'download-small',
  'download',
  'duplicate-small',
  'duplicate',
  'edit-modal-small',
  'edit-small',
  'edit',
  'encrypted-small',
  'encrypted',
  'environment-small',
  'exchange-logo-empty',
  'exchange-logo-filled',
  'exchange-small',
  'exchange',
  'filter-small',
  'filter',
  'forum-small',
  'forward-small',
  'github',
  'grid',
  'hybrid-cloud-color',
  'hybrid-small',
  'id-small',
  'id',
  'info-small',
  'info',
  'key-small',
  'key',
  'link-small',
  'link',
  'list',
  'location-small',
  'lock-small',
  'lock',
  'mail-small',
  'manage-center-color',
  'manage-center-greyscale',
  'manage-medium',
  'manage',
  'message-pull',
  'message-purge',
  'message-push',
  'message-queue-color',
  'message-queue-greyscale',
  'message-small',
  'message',
  'monitor-medium',
  'more-small',
  'monitor',
  'mule',
  'mulesoft-logo',
  'notification-small',
  'on-prem-small',
  'open',
  'partner-manager-color',
  'pin-small',
  'partner-manager-greyscale',
  'pin',
  'platform-services-color',
  'platform-services-greyscale',
  'playground-color',
  'playground-greyscale',
  'plus-medium',
  'plus-small',
  'queue-small',
  'plus',
  'queue',
  'redo-small',
  'redo',
  'refresh-small',
  'refresh',
  'runtime-manager-color',
  'runtime-manager-greyscale',
  'runtime-services-color',
  'search-small',
  'runtime-services-greyscale',
  'search',
  'server-group',
  'server-group-small',
  'server-small',
  'server',
  'settings-greyscale',
  'settings-color',
  'settings-small',
  'settings',
  'sign-in',
  'share-small',
  'sign-out',
  'spinner',
  'studio-example-small',
  'star-circle',
  'studio-color',
  'studio-example',
  'studio-greyscale',
  'studio-project-small',
  'studio-project',
  'studio-template',
  'studio-template-small',
  'support-portal-small',
  'support-small',
  'support',
  'tag-small',
  'talk-small',
  'talk',
  'test-1_',
  'time-small',
  'time',
  'timer',
  'training-small',
  'trash-small',
  'trash',
  'undo-small',
  'undo',
  'unlock-small',
  'upload-small',
  'upload',
  'user-small',
  'user',
  'walkthrough-small',
  'warning-small',
  'warning',
  'xchange-color',
  'xchange-greyscale',
];

const Block = ({ icon }) => (
  <div
    style={{
      height: '140px',
      width: '140px',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div style={{ flex: '0 0 auto', justifyContent: 'center', display: 'flex' }}>
      <Icon
        size={40}
        fill="#999"
        name={icon}
        style={{ display: 'flex' }}
        tooltip={icon}
      />
    </div>
    <div
      style={{
        flex: '0 0 auto',
        justifyContent: 'center',
        display: 'flex',
        fontSize: '11px',
      }}
    >
      {' '}
      {icon}{' '}
    </div>
  </div>
);

const IconBox = ({ icons }) => (
  <div
    style={{
      margin: '5px 0px',
      border: '1px solid #ccc',
      display: 'flex',
      flexWrap: 'wrap',
    }}
  >
    {icons.map(icon => <Block key={icon} icon={icon} />)}
  </div>
);

const TestIcon = () => (
  <div style={{ padding: '10px' }}>
    <h3> Modusbox </h3>
    <IconBox icons={modusboxIcons} />

    <h3> Mulesoft </h3>
    <IconBox icons={mulesoftIcons} />
  </div>
);
export default TestIcon;
