import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Navbar from '../components/Navbar';

const userJson = `{
  "name": "Ivan",
  "username": "Ivan",
  "lastname": "Annovazzi",
  "userId": "e1ffc1df-0ec7-46cc-91c3-552bc629ecd5"
}`;
const companiesJson = `{
  "companies": [
    {
      "id": "d3cdb892-8691-4cdc-ab23-674cab7e3446",
      "name": "company1"
    },
    {
      "id": "aacdb892-8691-4cdc-ab23-674cab7e34aa",
      "name": "company2"
    }
  ]
}`;
const organizationsJson = `{
  "organizations": [
    {
      "id": "18a8d391-597b-499e-9ef7-a5c568fecb03",
      "name": "organization1",
      "company": "d3cdb892-8691-4cdc-ab23-674cab7e3446",
      "parent": null,
      "environments": [
        {
          "id": "8f9a44d6-50ee-4e25-a197-3d6ef2edba1a",
          "name": "environment1",
          "company": "d3cdb892-8691-4cdc-ab23-674cab7e3446",
          "parent": "18a8d391-597b-499e-9ef7-a5c568fecb03",
          "type": "PROD"
        },
        {
          "id": "c1c08921-f9e7-4963-b1b7-98925355f17c",
          "name": "environment2",
          "company": "d3cdb892-8691-4cdc-ab23-674cab7e3446",
          "parent": "18a8d391-597b-499e-9ef7-a5c568fecb03",
          "type": "PRE-PROD"
        }
      ]
    },
    {
      "id": "69ae2675-04de-4200-836e-3afdf1ea8eb1",
      "name": "organization2",
      "company": "d3cdb892-8691-4cdc-ab23-674cab7e3446",
      "parent": "18a8d391-597b-499e-9ef7-a5c568fecb03",
      "environments": [
        {
          "id": "9c947ef8-66af-4c62-b07b-91f7096f04b5",
          "name": "environment3",
          "company": "d3cdb892-8691-4cdc-ab23-674cab7e3446",
          "parent": "69ae2675-04de-4200-836e-3afdf1ea8eb1",
          "type": "PRE-PROD"
        },
        {
          "id": "ae7e22bb-1a7b-4366-aaa7-c68cbedbb7cb",
          "name": "environment4",
          "company": "d3cdb892-8691-4cdc-ab23-674cab7e3446",
          "parent": "69ae2675-04de-4200-836e-3afdf1ea8eb1",
          "type": "PRE-PROD"
        }
      ]
    }
  ]
}`;

const user = JSON.parse(userJson);
const { companies } = JSON.parse(companiesJson);
const { organizations } = JSON.parse(organizationsJson);
const activeCompanyId = companies[0].id;
const activeOrganizationId = organizations[0].id;
const activeEnvironmentId = organizations[0].environments[0].id;

it('renders Navbar', () => {
  const wrapper = mount(<Navbar />);
  expect(wrapper.find('.Navbar')).toHaveLength(1);
  expect(wrapper.find('.Navbar__left')).toHaveLength(1);
  expect(wrapper.find('.Navbar__right')).toHaveLength(1);
});

it('renders the Navbar company popup when clicking on the company name', () => {
  const wrapper = mount(
    <Navbar
      user={user}
      companies={companies}
      organizations={organizations}
      isLoadingOrganizations={false}
      activeCompanyId={activeCompanyId}
      activeOrganizationId={activeOrganizationId}
      activeEnvironmentId={activeEnvironmentId}
    />,
  );
  wrapper.find('.Navbar__company__name').simulate('click');
  expect(
    wrapper
      .find('.Navbar__company-box')
      .find('.Navbar__popup')
      .exists(),
  ).toBe(true);
});

it('renders the Navbar organization popup when clicking on the organization name', () => {
  const wrapper = mount(
    <Navbar
      user={user}
      companies={companies}
      organizations={organizations}
      isLoadingOrganizations={false}
      activeCompanyId={activeCompanyId}
      activeOrganizationId={activeOrganizationId}
      activeEnvironmentId={activeEnvironmentId}
    />,
  );
  wrapper.find('.Navbar__organization__name').simulate('click');
  expect(
    wrapper
      .find('.Navbar__organization-box')
      .find('.Navbar__popup')
      .exists(),
  ).toBe(true);
});

it('renders the Navbar environment popup when clicking on the environment name', () => {
  const wrapper = mount(
    <Navbar
      user={user}
      companies={companies}
      organizations={organizations}
      isLoadingOrganizations={false}
      activeCompanyId={activeCompanyId}
      activeOrganizationId={activeOrganizationId}
      activeEnvironmentId={activeEnvironmentId}
    />,
  );
  wrapper.find('.Navbar__environment__name').simulate('click');
  expect(
    wrapper
      .find('.Navbar__environment-box')
      .find('.Navbar__popup')
      .exists(),
  ).toBe(true);
});

it('renders the Navbar user popup when clicking on the user name', () => {
  const wrapper = mount(
    <Navbar
      user={user}
      companies={companies}
      organizations={organizations}
      isLoadingOrganizations={false}
      activeCompanyId={activeCompanyId}
      activeOrganizationId={activeOrganizationId}
      activeEnvironmentId={activeEnvironmentId}
    />,
  );
  wrapper.find('.Navbar__user__username').simulate('click');
  expect(
    wrapper
      .find('.Navbar__user')
      .find('.Navbar__popup')
      .exists(),
  ).toBe(true);
});

it('filters the companies in the popup when setting the company filter', () => {
  const wrapper = mount(
    <Navbar
      user={user}
      companies={companies}
      organizations={organizations}
      isLoadingOrganizations={false}
      activeCompanyId={activeCompanyId}
      activeOrganizationId={activeOrganizationId}
      activeEnvironmentId={activeEnvironmentId}
    />,
  );
  wrapper.find('.Navbar__company__name').simulate('click');
  wrapper.find('.Navbar__search-box__input').simulate('change', { target: { value: '2' } });

  expect(wrapper.find('.Navbar__company-item')).toHaveLength(1);
  expect(
    wrapper
      .find('.Navbar__company-item__name')
      .at(0)
      .text(),
  ).toBe('company2');
});

it('filters the organizations in the popup when setting the organization filter', () => {
  const wrapper = mount(
    <Navbar
      user={user}
      companies={companies}
      organizations={organizations}
      isLoadingOrganizations={false}
      activeCompanyId={activeCompanyId}
      activeOrganizationId={activeOrganizationId}
      activeEnvironmentId={activeEnvironmentId}
    />,
  );
  wrapper.find('.Navbar__organization__name').simulate('click');
  wrapper.find('.Navbar__search-box__input').simulate('change', { target: { value: '2' } });

  expect(wrapper.find('.Navbar__organization-item')).toHaveLength(1);
  expect(
    wrapper
      .find('.Navbar__organization-item__name')
      .at(0)
      .text(),
  ).toBe('organization2');
});

it('filters the environments in the popup when setting the organization filter', () => {
  const wrapper = mount(
    <Navbar
      user={user}
      companies={companies}
      organizations={organizations}
      isLoadingOrganizations={false}
      activeCompanyId={activeCompanyId}
      activeOrganizationId={activeOrganizationId}
      activeEnvironmentId={activeEnvironmentId}
    />,
  );
  wrapper.find('.Navbar__organization__name').simulate('click');
  wrapper.find('.Navbar__search-box__input').simulate('change', { target: { value: '2' } });

  expect(wrapper.find('.Navbar__search-item')).toHaveLength(1);
  expect(
    wrapper
      .find('.Navbar__search-item')
      .at(0)
      .text(),
  ).toBe('organization1:environment2');
});

it('filters the environments in the popup when setting the environment filter', () => {
  const wrapper = mount(
    <Navbar
      user={user}
      companies={companies}
      organizations={organizations}
      isLoadingOrganizations={false}
      activeCompanyId={activeCompanyId}
      activeOrganizationId={activeOrganizationId}
      activeEnvironmentId={activeEnvironmentId}
    />,
  );
  wrapper.find('.Navbar__environment__name').simulate('click');
  wrapper.find('.Navbar__search-box__input').simulate('change', { target: { value: '2' } });

  expect(wrapper.find('.Navbar__environment-item')).toHaveLength(1);
  expect(
    wrapper
      .find('.Navbar__environment-item__name')
      .at(0)
      .text(),
  ).toBe('environment2');
});
