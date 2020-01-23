/* eslint-disable */
import React from 'react';
import find from 'lodash/find';
import { list, containerStyle } from './funcs';
import DataList from '../../../components/DataList';
import ControlIcon from '../../../components/ControlIcon';

class TestDataList extends React.Component {
  constructor() {
    super();
    this.state = {
      pending: false,
      items: JSON.parse(
        `[{"severity":null,"maxRetries":0,"notificationScopeId":null,"deleted":false,"code":3,"errorCategoryTypeId":null,"notificationScope":null,"errorCategoryType":null,"defaultMessage":null,"id":"f7c85e2e-f3e4-2094-1c55-b07a6d04ea06","label":"TA","updateOnly":true},{"severity":"WARNING","maxRetries":0,"notificationScopeId":null,"deleted":false,"code":13233,"errorCategoryTypeId":null,"notificationScope":null,"errorCategoryType":null,"defaultMessage":null,"id":"b3bdd246-440a-4c2e-8c3b-f20234a55a7a","label":"w13","updateOnly":false},{"severity":null,"maxRetries":0,"notificationScopeId":null,"deleted":false,"code":0,"errorCategoryTypeId":null,"notificationScope":null,"errorCategoryType":null,"defaultMessage":null,"id":"e47d1410-2bac-4b78-b68a-305ed16c5f66","label":"UNKNOWN","updateOnly":true}]`,
      ),
    };
    setTimeout(() => this.setState({ pending: true }), 2000);
    setTimeout(
      () =>
        this.setState({
          pending: false,
          items: JSON.parse(
            `[{"severity":null,"maxRetries":0,"notificationScopeId":null,"deleted":false,"code":3,"errorCategoryTypeId":null,"notificationScope":null,"errorCategoryType":null,"defaultMessage":null,"id":"f7c85e2e-f3e4-2094-1c55-b07a6d04ea06","label":"TA","updateOnly":true},{"severity":null,"maxRetries":0,"notificationScopeId":null,"deleted":false,"code":0,"errorCategoryTypeId":null,"notificationScope":null,"errorCategoryType":null,"defaultMessage":null,"id":"e47d1410-2bac-4b78-b68a-305ed16c5f66","label":"UNKNOWN","updateOnly":true}]`,
          ),
        }),
      2200,
    );
  }
  render() {
    const columns = [
      {
        label: 'Code',
        key: 'code',
        link: console.log,
      },
      {
        label: 'Label',
        key: 'label',
      },
      {
        label: 'Severity',
        key: 'severity',
      },
      {
        label: 'Notification Scope',
        key: 'notificationScopeId',
        func: value => (find([], { value }) || {}).label,
      },
      {
        label: 'Category',
        key: 'errorCategoryTypeId',
        func: value => (find([], { value }) || {}).label,
      },
      {
        label: 'Max Retries',
        key: 'maxRetries',
      },
      {
        key: 'code',
        className: 'col-40',
        func: (value, item) => {
          if (item.updateOnly) {
            return <span>UO</span>;
          }
          return (
            <ControlIcon
              onClick={console.log}
              icon="close-small"
              size={16}
              tooltip={`Delete ${item.code}`}
              kind="danger"
            />
          );
        },
        showLabel: false,
        sortable: false,
        searchable: false,
      },
    ];

    return (
      <div style={containerStyle}>
        <DataList
          columns={columns}
          list={this.state.items}
          isPending={this.state.pending}
          noData="no error codes found"
          sortColumn="Code"
          sortAsc
          hasError={false}
          errorMsg="There was an error retrieving error codes"
        />
      </div>
    );
  }
}

export default TestDataList;
