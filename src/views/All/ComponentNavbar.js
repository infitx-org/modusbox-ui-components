import React from 'react';
import find from 'lodash/find';
import Navbar from '../../components/Navbar';

/* eslint-disable */
const userJson = `{"name":"Ivan","username":"Ivan","lastname":"Annovazzi","userId":"e1ffc1df-0ec7-46cc-91c3-552bc629ecd5"}`;
const companiesJson = `{"companies":[{"id":"d3cdb892-8691-4cdc-ab23-674cab7e3446","name":"company1"},{"id":"851df841-3381-422a-b4c4-f1339f5ae95a","name":"Evil Corp"},{"id":"ce36255f-d736-4457-beab-a6f6386c732a","name":"Avis"},{"id":"570a6371-048f-4d70-806b-ba7d6bf05cf3","name":"company4"}]}`;
const organizationsJson = `{"organizations":[{"id":"18a8d391-597b-499e-9ef7-a5c568fecb03","name":"myOrganization-1","company":"d3cdb892-8691-4cdc-ab23-674cab7e3446","parent":null,"environments":[{"id":"8f9a44d6-50ee-4e25-a197-3d6ef2edba1a","name":"myEnvironment-1","company":"d3cdb892-8691-4cdc-ab23-674cab7e3446","parent":"18a8d391-597b-499e-9ef7-a5c568fecb03","type":"PROD"},{"id":"c1c08921-f9e7-4963-b1b7-98925355f17c","name":"myEnvironment-2","company":"d3cdb892-8691-4cdc-ab23-674cab7e3446","parent":"18a8d391-597b-499e-9ef7-a5c568fecb03","type":"PRE-PROD"}]},{"id":"69ae2675-04de-4200-836e-3afdf1ea8eb1","name":"myOrganization-2","company":"d3cdb892-8691-4cdc-ab23-674cab7e3446","parent":"18a8d391-597b-499e-9ef7-a5c568fecb03","environments":[{"id":"9c947ef8-66af-4c62-b07b-91f7096f04b5","name":"myEnvironment-3","company":"d3cdb892-8691-4cdc-ab23-674cab7e3446","parent":"69ae2675-04de-4200-836e-3afdf1ea8eb1","type":"PRE-PROD"},{"id":"ae7e22bb-1a7b-4366-aaa7-c68cbedbb7cb","name":"myEnvironment-4","company":"d3cdb892-8691-4cdc-ab23-674cab7e3446","parent":"69ae2675-04de-4200-836e-3afdf1ea8eb1","type":"PRE-PROD"}]},{"id":"6a7bfaec-5888-4a62-bccf-fddf39fc4cad","name":"mySubOrganization-1","company":"d3cdb892-8691-4cdc-ab23-674cab7e3446","parent":"18a8d391-597b-499e-9ef7-a5c568fecb03","environments":[{"id":"a7fcb297-b8ff-4529-aaf3-e58bfaa344ca","name":"myEnvironment-5","company":"d3cdb892-8691-4cdc-ab23-674cab7e3446","parent":"6a7bfaec-5888-4a62-bccf-fddf39fc4cad","type":"PROD"},{"id":"3883a5bf-6d70-4e3b-8aac-ece30776cf53","name":"myEnvironment-6","company":"d3cdb892-8691-4cdc-ab23-674cab7e3446","parent":"6a7bfaec-5888-4a62-bccf-fddf39fc4cad","type":"PRE-PROD"}]},{"id":"68e9912e-71ba-479b-b70a-418137d0e0a7","name":"mySubOrganization-1-1","company":"d3cdb892-8691-4cdc-ab23-674cab7e3446","parent":"6a7bfaec-5888-4a62-bccf-fddf39fc4cad","environments":[{"id":"3bda6d99-c4db-432e-9364-936cd4cb811c","name":"myEnvironment-7","company":"d3cdb892-8691-4cdc-ab23-674cab7e3446","parent":"68e9912e-71ba-479b-b70a-418137d0e0a7","type":"PROD"},{"id":"abc98ef6-517d-4901-aedc-ae1c41840250","name":"myEnvironment-8","company":"d3cdb892-8691-4cdc-ab23-674cab7e3446","parent":"68e9912e-71ba-479b-b70a-418137d0e0a7","type":"PROD"}]}]}`;

const user = JSON.parse(userJson);
const companies = JSON.parse(companiesJson).companies;
const organizations = JSON.parse(organizationsJson).organizations;

const logNavbarEvents = console.log;

const getCompanies = async () => new Promise(resolve => setTimeout(() => resolve(companies), 1000));

const getOrganizations = async companyId =>
  new Promise(resolve => {
    const availableOrganizations = organizations.filter(
      organization => organization.company === companyId,
    );
    setTimeout(() => resolve(availableOrganizations), 2500);
  });
/* eslint-enable */

class NavbarWrapper extends React.Component {
  static changeOrganization(organization) {
    localStorage.setItem('organizationId', organization.id);
  }
  static changeEnvironment(environment) {
    localStorage.setItem('environmentId', environment.id);
  }
  constructor(props) {
    super(props);
    this.changeCompany = this.changeCompany.bind(this);
    this.setCompany = this.setCompany.bind(this);
    this.signout = this.signout.bind(this);
    this.loadCompanies = this.loadCompanies.bind(this);
    this.loadOrganizations = this.loadOrganizations.bind(this);
    const activeCompanyId = localStorage.getItem('companyId');
    const activeOrganizationId = localStorage.getItem('organizationId');
    const activeEnvironmentId = localStorage.getItem('environmentId');

    this.state = {
      companies: undefined,
      organizations: undefined,
      isOrganizationPending: false,
      activeCompanyId,
      activeOrganizationId,
      activeEnvironmentId,
    };
  }
  componentDidMount() {
    this.loadCompanies();
  }
  setCompany(company) {
    localStorage.setItem('companyId', company.id);
    this.setState({
      activeCompanyId: company.id,
    });

    this.loadOrganizations(company);
  }
  async loadCompanies() {
    const availableCompanies = await getCompanies();
    this.setState({ companies: availableCompanies });
    const activeCompany = find(availableCompanies, { id: this.state.activeCompanyId });
    if (activeCompany) {
      this.setCompany(activeCompany);
    }
  }
  async loadOrganizations(company) {
    this.setState({
      isOrganizationPending: true,
    });

    const availableOrganizations = await getOrganizations(company.id);

    this.setState({
      organizations: availableOrganizations,
      isOrganizationPending: false,
    });
  }
  changeCompany(company) {
    this.setCompany(company);
    localStorage.removeItem('environmentId');
  }
  signout() {
    localStorage.removeItem('environmentId');
    localStorage.removeItem('companyId');
    this.setState({
      activeCompanyId: undefined,
      activeOrganizationId: undefined,
      activeEnvironmentId: undefined,
      organizations: [],
    });
  }

  render() {
    return (
      <Navbar
        user={user}
        companies={this.state.companies}
        organizations={this.state.organizations}
        isLoadingOrganizations={this.state.isOrganizationPending}
        activeCompanyId={this.state.activeCompanyId}
        activeOrganizationId={this.state.activeOrganizationId}
        activeEnvironmentId={this.state.activeEnvironmentId}
        onCompanyChange={this.changeCompany}
        onOrganizationChange={NavbarWrapper.changeOrganization}
        onEnvironmentChange={NavbarWrapper.changeEnvironment}
        onSignout={this.signout}
      />
    );
  }
}

export default NavbarWrapper;
