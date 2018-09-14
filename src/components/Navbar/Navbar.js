import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';

import * as utils from '../../utils/common';

import Icon from '../Icon';
import ScrollBox from '../ScrollBox';
import Modal from '../Modal';
import Spinner from '../Spinner';
import logo from './PortXLogoSmall.png';
import '../../icons/modusbox/cloud.svg';
import '../../icons/modusbox/business-group.svg';
import '../../icons/mule/user-small.svg';

import './Navbar.scss';

export default class ModusBoxNav extends PureComponent {
  render() {
    const { props } = this;
    return (
      <div className="Navbar">
        <LeftNav />
        <RightNav {...props} />
      </div>
    );
  }
}

ModusBoxNav.defaultProps = {
  companyOnly: false,
  user: {},
  companies: [],
  organizations: [],
  isLoadingOrganizations: false,
  activeCompanyId: undefined,
  activeOrganizationId: undefined,
  activeEnvironmentId: undefined,
  onCompanyChange: undefined,
  onOrganizationChange: undefined,
  onEnvironmentChange: undefined,
  onSignout: undefined,
};

ModusBoxNav.propTypes = {
  companyOnly: PropTypes.bool,
  user: PropTypes.shape(),
  companies: PropTypes.arrayOf(PropTypes.shape()),
  organizations: PropTypes.arrayOf(PropTypes.shape()),
  isLoadingOrganizations: PropTypes.bool,
  activeCompanyId: PropTypes.string,
  activeOrganizationId: PropTypes.string,
  activeEnvironmentId: PropTypes.string,
  onCompanyChange: PropTypes.func,
  onOrganizationChange: PropTypes.func,
  onEnvironmentChange: PropTypes.func,
  onSignout: PropTypes.func,
};

const PROD = 'PROD';
const VertBar = () => <div className="Navbar__vertbar" />;

const LeftNav = () => (
  <div className="Navbar__left">
    <div className="Navbar__logo-box">
      <img className="Title--Icon" src={logo} alt="logo" />
    </div>

    <div className="Title-Bar">
      <div className="Title-Text">PortX</div>
    </div>
  </div>
);

class RightNav extends PureComponent {
  static nestOrganizations(organizations) {
    const organizationsById = organizations.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.id]: curr,
      }),
      {},
    );

    const nestedOrganizations = organizations.reduce((prev, curr) => {
      const parentId = curr.parent;
      if (!parentId) {
        return [...prev, curr];
      }
      const parent = organizationsById[parentId];
      if (!parent.subOrganizations) {
        parent.subOrganizations = [];
      }
      parent.subOrganizations.push(curr);
      return prev;
    }, []);
    return nestedOrganizations;
  }
  constructor(props) {
    super(props);

    this.toggleBox = this.toggleBox.bind(this);
    this.toggleCompanyBox = this.toggleCompanyBox.bind(this);
    this.toggleOrganizationsBox = this.toggleOrganizationsBox.bind(this);
    this.toggleUserBox = this.toggleUserBox.bind(this);
    this.toggleEnvironmentsBox = this.toggleEnvironmentsBox.bind(this);

    this.onSelectCompany = this.onSelectCompany.bind(this);
    this.onSelectEnvironment = this.onSelectEnvironment.bind(this);

    this.onCompanyFilterChange = this.onCompanyFilterChange.bind(this);
    this.onOrganizationFilterChange = this.onOrganizationFilterChange.bind(this);
    this.onEnvironmentFilterChange = this.onEnvironmentFilterChange.bind(this);

    const { organizations, activeCompanyId, activeEnvironmentId } = this.props;
    let nestedOrganizations = [];
    if (organizations) {
      nestedOrganizations = RightNav.nestOrganizations(organizations);
    }

    this.state = {
      companyOnly: this.props.companyOnly || false,
      nestedOrganizations,

      // Box selections
      isCompanyBoxVisible: false,
      isOrganizationsBoxVisible: false,
      isEnvironmentsBoxVisible: false,
      isUserBoxVisible: false,

      companyFilter: '',
      organizationFilter: '',
      environmentFilter: '',

      // Forcing Modals
      activeCompanyId,
      activeEnvironmentId,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { organizations, activeCompanyId, activeEnvironmentId } = nextProps;
    if (organizations !== this.props.organizations) {
      this.setState({ nestedOrganizations: RightNav.nestOrganizations(organizations) });
    }

    if (activeCompanyId !== this.state.activeCompanyId) {
      this.setState({ activeCompanyId });
    }

    if (activeEnvironmentId !== this.state.activeEnvironmentId) {
      this.setState({ activeEnvironmentId });
    }
  }
  onCompanyFilterChange(evt) {
    const { value } = evt.target;
    this.setState({
      companyFilter: value,
    });
  }
  onOrganizationFilterChange(evt) {
    const { value } = evt.target;
    this.setState({
      organizationFilter: value,
    });
  }
  onEnvironmentFilterChange(evt) {
    const { value } = evt.target;
    this.setState({
      environmentFilter: value,
    });
  }
  onSelectCompany(company) {
    this.setState({
      isCompanyBoxVisible: false,
      activeCompanyId: company.id,
      activeEnvironmentId: undefined,
    });
    this.props.onCompanyChange(company);
  }
  onSelectEnvironment(environment) {
    this.setState({
      isOrganizationsBoxVisible: false,
      isEnvironmentsBoxVisible: false,
      activeEnvironmentId: environment.id,
    });
    this.props.onEnvironmentChange(environment);
  }
  toggleBox(box) {
    const props = {
      company: 'isCompanyBoxVisible',
      organization: 'isOrganizationsBoxVisible',
      environment: 'isEnvironmentsBoxVisible',
      user: 'isUserBoxVisible',
    };

    const stateProps = {
      isCompanyBoxVisible: false,
      isOrganizationsBoxVisible: false,
      isEnvironmentsBoxVisible: false,
      isUserBoxVisible: false,
    };
    const propName = props[box];
    stateProps[propName] = !this.state[propName];
    this.setState({
      ...stateProps,
      companyFilter: '',
      organizationFilter: '',
      environmentFilter: '',
    });
  }
  toggleCompanyBox() {
    this.toggleBox('company');
  }
  toggleOrganizationsBox() {
    this.toggleBox('organization');
  }
  toggleEnvironmentsBox() {
    this.toggleBox('environment');
  }
  toggleUserBox() {
    this.toggleBox('user');
  }
  render() {
    const {
      companyOnly,
      user,
      companies,
      organizations,
      onSignout,
      isLoadingOrganizations,
    } = this.props;

    const {
      isCompanyBoxVisible,
      isOrganizationsBoxVisible,
      isEnvironmentsBoxVisible,
      isUserBoxVisible,

      activeCompanyId,
      activeEnvironmentId,

      nestedOrganizations,

      companyFilter,
      organizationFilter,
      environmentFilter,
    } = this.state;

    const activeCompany = find(companies, { id: activeCompanyId });
    const findActiveEnvironmentParentOrganization = organization =>
      organization.environments.some(environment => environment.id === activeEnvironmentId);
    const activeOrganization = find(organizations, findActiveEnvironmentParentOrganization);

    let activeEnvironment;
    if (activeOrganization) {
      activeEnvironment = find(activeOrganization.environments, {
        id: activeEnvironmentId,
      });
    }

    const cannotFindCompany = companies.length && !activeCompany;
    const isCompanyModalVisible = !activeCompanyId || cannotFindCompany;
    const isOrganizationModalVisible =
      !companyOnly && !isCompanyModalVisible && !activeEnvironmentId;

    // Filtered items
    const lowerCaseNameIncludes = tester => item => item.name.toLowerCase().includes(tester);

    const companyFilterFunc = lowerCaseNameIncludes(companyFilter.toLowerCase());
    const organizationFilterFunc = lowerCaseNameIncludes(organizationFilter.toLowerCase());
    const environtmentFilterFunc = lowerCaseNameIncludes(environmentFilter.toLowerCase());

    const filterEnvironments = (prev, organization) => {
      const matchingEnvironments = organization.environments.filter(environtmentFilterFunc);

      if (matchingEnvironments.length) {
        const currentItem = matchingEnvironments.map(environment => ({
          match: 'environment',
          organization,
          environment,
        }));
        return [...prev, ...currentItem];
      }
      return prev;
    };

    const filteredEnvironmentsInOrganizations = organizations.reduce(filterEnvironments, []);

    const filteredOrganizationsInOrganizations = organizations
      .filter(organizationFilterFunc)
      .map(organization => ({ match: 'organization', organization }));

    const filteredOrganizations = [
      ...filteredEnvironmentsInOrganizations,
      ...filteredOrganizationsInOrganizations,
    ];

    const filteredCompanies = companies.filter(companyFilterFunc);

    let filteredEnvironments = [];
    if (activeOrganization) {
      // environments are available only on an active organization
      filteredEnvironments = activeOrganization.environments.filter(environtmentFilterFunc);
    }

    const organizationStructureProps = {
      isSearching: organizationFilter !== '',
      activeOrganization,
      activeEnvironment,
      onClick: this.toggleOrganizationsBox,
      isOrganizationsBoxVisible,
      organizations: nestedOrganizations,
      filteredOrganizations,
      onEnvironmentItemClick: this.onSelectEnvironment,
      onOrganizationFilterChange: this.onOrganizationFilterChange,
      organizationFilter,
    };
    const companyStructureProps = {
      activeCompany,
      onCompanyFilterChange: this.onCompanyFilterChange,
      companies: filteredCompanies,
      onClickCompanyItem: this.onSelectCompany,
      companyFilter,
    };

    return (
      <div className="Navbar__right">
        <CompanyNav
          activeCompany={activeCompany}
          isCompanyBoxVisible={isCompanyBoxVisible}
          onClick={this.toggleCompanyBox}
        >
          <CompanyStructure {...companyStructureProps} dark />
        </CompanyNav>

        {!companyOnly && (
          <div className="Navbar__right__nav">
            <VertBar />

            <OrganizationNav
              onClick={this.toggleOrganizationsBox}
              activeOrganization={activeOrganization}
              isOrganizationsBoxVisible={isOrganizationsBoxVisible}
            >
              <OrganizationStructure {...organizationStructureProps} dark />
            </OrganizationNav>

            <VertBar />

            <EnvironmentNav
              activeEnvironment={activeEnvironment}
              onClick={this.toggleEnvironmentsBox}
              isEnvironmentsBoxVisible={isEnvironmentsBoxVisible}
              environments={filteredEnvironments}
              onEnvironmentItemClick={this.onSelectEnvironment}
              onEnvironmentFilterChange={this.onEnvironmentFilterChange}
              environmentFilter={environmentFilter}
            />
          </div>
        )}

        <VertBar />

        <User
          isUserBoxVisible={isUserBoxVisible}
          username={user.username}
          onClick={this.toggleUserBox}
          onSignout={onSignout}
        />

        {isCompanyModalVisible && (
          <CompanyModal isPending={!companies.length}>
            <CompanyStructure {...companyStructureProps} />
          </CompanyModal>
        )}

        {isOrganizationModalVisible && (
          <OrganizationModal isPending={isLoadingOrganizations}>
            <OrganizationStructure {...organizationStructureProps} />
          </OrganizationModal>
        )}
      </div>
    );
  }
}

class PopupMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.setPopupPosition = this.setPopupPosition.bind(this);
  }
  componentDidMount() {
    this.setPopupPosition();
  }
  componentDidUpdate() {
    this.setPopupPosition();
  }
  setPopupPosition() {
    const { size, fillWidth } = this.props;
    const { left } = this.wrapper.getBoundingClientRect();
    const rightSpace = window.innerWidth - left;
    let leftPosition = this.props.left;
    let totalWidth = this.props.size;

    if (fillWidth) {
      totalWidth = Math.max(rightSpace, size);
      leftPosition = rightSpace - totalWidth;
    } else if (size > rightSpace) {
      leftPosition = rightSpace - size;
    }

    this.popup.style.width = `${totalWidth}px`;
    if (leftPosition) {
      this.popup.style.left = `${leftPosition}px`;
    }
  }
  render() {
    const { children } = this.props;
    return (
      <div
        className="Navbar__popup-wrapper"
        ref={(wrapper) => {
          this.wrapper = wrapper;
        }}
      >
        <div
          className="Navbar__popup"
          ref={(popup) => {
            this.popup = popup;
          }}
        >
          {children}
        </div>
      </div>
    );
  }
}

const PopupMenuScroller = ({ children }) => {
  const maxScrollboxHeight = `${window.innerHeight - 110}px`;
  return (
    <ScrollBox
      flex
      style={{ maxHeight: maxScrollboxHeight }}
      handleStyle={{ background: '#ccc' }}
      trackStyle={{
        top: '4px',
        bottom: '4px',
        right: '4px',
        width: '3px',
      }}
    >
      {children}
    </ScrollBox>
  );
};

const CompanyNav = ({
  activeCompany, onClick, isCompanyBoxVisible, children,
}) => {
  let name = '';
  let companyIcon = null;

  if (activeCompany) {
    ({ name } = activeCompany);
  }
  if (!activeCompany) {
    companyIcon = <Spinner size={14} />;
  } else {
    const companyItemClassName = utils.composeClassNames([
      'Navbar__company-item__icon',
      'Navbar__company-item__icon--dark',
      'Navbar__company-item__icon--large',
    ]);
    companyIcon = <div className={companyItemClassName}>{name[0]}</div>;
  }

  return (
    <div className="Navbar__company-box">
      <div className="Navbar__icon-box">{companyIcon}</div>

      <div className="Navbar__company__name" onClick={onClick} role="presentation">
        {activeCompany ? activeCompany.name : 'Loading'}
      </div>

      {isCompanyBoxVisible && <PopupMenu size={200}>{children}</PopupMenu>}
    </div>
  );
};

const CompanyStructure = ({
  companyFilter,
  onCompanyFilterChange,
  companies,
  activeCompany,
  onClickCompanyItem,
  dark,
}) => (
  <div className="Navbar__company__menu">
    <SearchBox value={companyFilter} onChange={onCompanyFilterChange} dark={dark} />
    <PopupMenuScroller>
      <Companies
        companies={companies}
        activeCompanyId={activeCompany && activeCompany.id}
        onClickCompany={onClickCompanyItem}
        dark={dark}
      />
    </PopupMenuScroller>
  </div>
);

const SearchBox = ({ value, onChange, dark }) => {
  const navbarClassName = utils.composeClassNames([
    'Navbar__search-box',
    dark && 'Navbar__search-box--dark',
  ]);

  return (
    <div className={navbarClassName}>
      <input
        autoFocus
        placeholder="Search..."
        className="Navbar__search-box__input"
        type="text"
        onChange={onChange}
        value={value}
      />
      <div className="Navbar__search-box__icon">
        <Icon name="search" size={12} />
      </div>
    </div>
  );
};

const Companies = ({
  companies, activeCompanyId, onClickCompany, dark,
}) => (
  <div>
    {companies.map(company => (
      <CompanyItem
        key={company.id}
        company={company}
        isActive={company.id === activeCompanyId}
        onClick={() => onClickCompany(company)}
        dark={dark}
      />
    ))}
  </div>
);

const CompanyItem = ({
  company, isActive, onClick, dark,
}) => {
  const { name } = company;
  const companyItemClassName = utils.composeClassNames([
    'Navbar__company-item',
    dark && 'Navbar__company-item--dark',
    isActive && 'Navbar__company-item--active',
  ]);

  const companyItemIconClassName = utils.composeClassNames([
    'Navbar__company-item__icon',
    dark && 'Navbar__company-item__icon--dark',
  ]);

  return (
    <div className={companyItemClassName} onClick={onClick} role="presentation">
      <div className={companyItemIconClassName}>{name[0]}</div>
      <div className="Navbar__company-item__name">{name}</div>
    </div>
  );
};

const OrganizationNav = ({
  onClick, activeOrganization, isOrganizationsBoxVisible, children,
}) => {
  let organizationIcon = <Icon name="business-group" fill="#fff" size={16} />;
  if (!activeOrganization) {
    organizationIcon = <Spinner size={14} />;
  }

  return (
    <div className="Navbar__organization-box">
      <div className="Navbar__icon-box">{organizationIcon}</div>

      <div className="Navbar__organization__name" onClick={onClick} role="presentation">
        {activeOrganization ? activeOrganization.name : 'Loading'}
      </div>

      {isOrganizationsBoxVisible && (
        <PopupMenu size={400} fillWidth>
          {children}
        </PopupMenu>
      )}
    </div>
  );
};

const OrganizationStructure = ({
  isSearching,
  filteredOrganizations,
  onEnvironmentItemClick,
  activeEnvironment = {},
  organizations,
  organizationFilter,
  onOrganizationFilterChange,
  dark,
}) => {
  const OrganizationContent = () => {
    if (isSearching) {
      return (
        <FilteredOrganizations
          dark={dark}
          items={filteredOrganizations}
          onSelectEnvironment={onEnvironmentItemClick}
          activeEnvironment={activeEnvironment}
        />
      );
    }
    return (
      <Organizations
        dark={dark}
        activeEnvironment={activeEnvironment}
        organizations={organizations}
        onSelectEnvironment={onEnvironmentItemClick}
      />
    );
  };
  return (
    <div className="Navbar__organization__menu">
      <SearchBox value={organizationFilter} onChange={onOrganizationFilterChange} dark={dark} />
      <PopupMenuScroller>
        <OrganizationContent />
      </PopupMenuScroller>
    </div>
  );
};

const FilteredOrganizations = ({
  items, onSelectEnvironment, activeEnvironment, dark,
}) => (
  <div>
    {items.map((item) => {
      if (item.match === 'environment') {
        return (
          <EnvironmentSearchItem
            key={item.environment.id}
            item={item}
            onSelectEnvironment={() => onSelectEnvironment(item.environment)}
            isActive={item.environment.id === activeEnvironment.id}
            dark={dark}
          />
        );
      }
      return (
        <NestedOrganization
          key={item.organization.id}
          activeEnvironmentId={activeEnvironment.id}
          organization={item.organization}
          onSelectEnvironment={onSelectEnvironment}
          indent={1}
          dark={dark}
          isExpanded={false}
        />
      );
    })}
  </div>
);

const EnvironmentSearchItem = ({
  item, onSelectEnvironment, isActive, dark,
}) => {
  const searchItemClassName = utils.composeClassNames([
    'Navbar__search-item',
    dark && 'Navbar__search-item--dark',
    isActive && 'Navbar__search-item--active',
  ]);

  const searchItemIconClassName = utils.composeClassNames([
    'Navbar__search-item__icon',
    dark && 'Navbar__search-item__icon--dark',
  ]);

  const searchItemEnvironmentClassName = utils.composeClassNames([
    'Navbar__search-item__environment',
    isActive && 'Navbar__search-item__environment--active',
  ]);
  const searchItemOrganizationClassName = utils.composeClassNames([
    'Navbar__search-item__organization',
    dark && 'Navbar__search-item__organization',
  ]);

  let environmentIconColor = '#4fc7e7';
  if (item.environment.type !== PROD) {
    environmentIconColor = dark ? '#fff' : '#ccc';
  }

  return (
    <div className={searchItemClassName} onClick={onSelectEnvironment} role="presentation">
      <div className={searchItemIconClassName}>
        <Icon name="business-group" size={16} />
      </div>
      <div className={searchItemOrganizationClassName}>{item.organization.name}</div>
      <div className="Navbar__search-item__separator">:</div>
      <div className="Navbar__search-item__icon">
        <Icon name="cloud" size={16} fill={environmentIconColor} />
      </div>
      <div className={searchItemEnvironmentClassName}>{item.environment.name}</div>
    </div>
  );
};

const Organizations = ({
  dark, activeEnvironment, organizations, onSelectEnvironment,
}) => (
  <div>
    {organizations.map(organization => (
      <NestedOrganization
        key={organization.id}
        activeEnvironmentId={activeEnvironment.id}
        organization={organization}
        onSelectEnvironment={onSelectEnvironment}
        dark={dark}
      />
    ))}
  </div>
);

class NestedOrganization extends PureComponent {
  constructor(props) {
    super(props);
    this.expand = this.expand.bind(this);
    const { isExpanded } = this.props;
    this.state = {
      isExpanded: typeof isExpanded !== 'undefined' ? isExpanded : true,
    };
  }
  expand(indentLevel) {
    if (!indentLevel) {
      // root organization does not toggle expand
      return;
    }

    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  }
  render() {
    const {
      activeEnvironmentId, organization, onSelectEnvironment, dark,
    } = this.props;
    let { indent } = this.props;
    if (!indent) {
      indent = 0;
    }
    const sortByEnvironmentType = (curr) => {
      // make pre-production to appear before production environments
      if (curr.type === PROD) {
        return 1;
      }
      return -1;
    };

    let subOrganizations = null;
    let environments = null;
    if (organization.subOrganizations) {
      subOrganizations = organization.subOrganizations.map(subOrganization => (
        <NestedOrganization
          key={subOrganization.id}
          activeEnvironmentId={activeEnvironmentId}
          organization={subOrganization}
          onSelectEnvironment={onSelectEnvironment}
          indent={indent + 1}
          dark={dark}
        />
      ));
    }

    if (organization.environments) {
      environments = organization.environments
        .sort(sortByEnvironmentType)
        .map(environment => (
          <NestedItem
            isActive={activeEnvironmentId === environment.id}
            dark={dark}
            key={environment.id}
            item={environment}
            onClick={() => onSelectEnvironment(environment)}
            indent={indent + 1}
            icon="cloud-small"
            isEnvironment
          />
        ));
    }

    return (
      <div key={organization.id}>
        <NestedItem
          dark={dark}
          item={organization}
          onClick={() => this.expand(indent)}
          isExpanded={this.state.isExpanded}
          indent={indent}
          icon="alert"
        />
        {this.state.isExpanded && (
          <div>
            {environments}
            {subOrganizations}
          </div>
        )}
      </div>
    );
  }
}

class NestedItem extends PureComponent {
  render() {
    const {
      item, isActive, indent, isEnvironment, dark, isExpanded, onClick,
    } = this.props;
    const { name } = item;
    const indentation = Math.max(0, indent - 1) * 35;
    const type = isEnvironment ? 'environment' : 'organization';
    const groupItemClassName = utils.composeClassNames([
      `Navbar__${type}-item`,
      isActive && `Navbar__${type}-item--active`,
      dark && `Navbar__${type}-item--dark`,
    ]);
    const arrowClassName = utils.composeClassNames([
      'Navbar__organization-item__expand-icon',
      'Navbar__organization-item__expand-icon--dark',
      isExpanded && 'Navbar__organization-item__expand-icon--rotate',
    ]);

    let itemIconColor = '#ccc';
    if (isEnvironment) {
      if (dark) {
        itemIconColor = '#fff';
      }
    }
    if (item.type === PROD) {
      itemIconColor = '#4fc7e7';
    }

    return (
      <div
        className={groupItemClassName}
        onClick={onClick}
        role="presentation"
        style={{ paddingLeft: `${10 + indentation}px` }}
      >
        {indent > 0 && (
          <div className="Navbar__organization-item__icon-box">
            {!isEnvironment && <Icon name="arrow" size={10} className={arrowClassName} />}
          </div>
        )}
        <div className="Navbar__organization-item__icon-box">
          <Icon name={isEnvironment ? 'cloud' : 'business-group'} size={16} fill={itemIconColor} />
        </div>
        <div className="Navbar__organization-item__name">{name}</div>
      </div>
    );
  }
}

const EnvironmentNav = ({
  environments,
  activeEnvironment,
  onEnvironmentItemClick,
  onClick,
  onEnvironmentFilterChange,
  isEnvironmentsBoxVisible,
}) => {
  let environmentIcon = <Icon name="cloud" fill="#fff" size={16} />;
  if (!activeEnvironment) {
    environmentIcon = <Spinner size={14} />;
  }
  return (
    <div className="Navbar__environment-box">
      <div className="Navbar__icon-box">{environmentIcon}</div>

      <div className="Navbar__environment__name" onClick={onClick} role="presentation">
        {activeEnvironment ? activeEnvironment.name : 'Loading'}
      </div>
      {isEnvironmentsBoxVisible && (
        <PopupMenu size={300}>
          <div className="Navbar__environment__menu">
            <SearchBox onChange={onEnvironmentFilterChange} dark />
            <PopupMenuScroller>
              <Environments
                environments={environments}
                activeEnvironmentId={activeEnvironment.id}
                onClickEnvironment={onEnvironmentItemClick}
                dark
              />
            </PopupMenuScroller>
          </div>
        </PopupMenu>
      )}
    </div>
  );
};

const Environments = ({ environments, activeEnvironmentId, onClickEnvironment }) => (
  <div>
    {environments.map(environment => (
      <EnvironmentItem
        key={environment.id}
        environment={environment}
        isActive={environment.id === activeEnvironmentId}
        onClick={() => onClickEnvironment(environment)}
      />
    ))}
  </div>
);
const EnvironmentItem = ({ environment, isActive, onClick }) => {
  const { name } = environment;
  const environmentItemClassName = utils.composeClassNames([
    'Navbar__environment-item',
    'Navbar__environment-item--dark',
    isActive && 'Navbar__environment-item--active',
  ]);
  const isProd = environment.type === PROD;

  return (
    <div className={environmentItemClassName} onClick={onClick} role="presentation">
      <div className="Navbar__environment-item__icon-box">
        <Icon name="cloud" size={16} fill={isProd ? '#4fc7e7' : '#fff'} />
      </div>
      <div className="Navbar__environment-item__name">{name}</div>
    </div>
  );
};

const User = ({
  username, onClick, isUserBoxVisible, onSignout,
}) => (
  <div className="Navbar__user" onClick={onClick} role="presentation">
    <div className="Navbar__user__image-box">
      <div className="Navbar__user__image">
        <Icon size={20} name="user-small" fill="#888" />
      </div>
    </div>
    <div className="Navbar__user__username">{username}</div>

    {isUserBoxVisible && (
      <PopupMenu title={username} size={200}>
        <PopupMenuScroller>
          <UserItem label="Profile" onClick={onSignout} dark />
          <UserItem label="Sign out" onClick={onSignout} dark />
        </PopupMenuScroller>
      </PopupMenu>
    )}
  </div>
);

const UserItem = ({ label, onClick, dark }) => {
  const userItemClassName = utils.composeClassNames([
    'Navbar__user-item',
    dark && 'Navbar__user-item--dark',
  ]);
  return (
    <div className={userItemClassName} onClick={onClick} role="presentation">
      <div className="Navbar__user-item__label"> {label} </div>
    </div>
  );
};

const CompanyModal = ({ children, isPending }) => {
  const spinner = <Spinner size="s" center />;
  return (
    <Modal title="Company" allowClose={false} noFooter flex>
      {isPending ? spinner : children}
    </Modal>
  );
};

const OrganizationModal = ({ isPending, children }) => {
  const spinner = <Spinner size="s" center />;
  return (
    <Modal title="Business Group" allowClose={false} noFooter flex>
      {isPending ? spinner : children}
    </Modal>
  );
};
