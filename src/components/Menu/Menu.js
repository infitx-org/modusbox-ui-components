/* eslint-disable */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import * as utils from '../../utils/common';
import Icon from '../Icon';
import './Menu.scss';
import '../../icons/mule/back-small.svg';

const menuConfig = () => ({
  Default: {
    routeMatch: '/',
    showEnviroment: true,
    childrenMatch: true,
    sections: [
      {
        filters: { isNewPartner: true },
        items: [
          {
            link: '/tracking',
            label: 'Transaction Monitoring',
            isNewPartner: true,
            filters: { isNewPartner: true },
          },
          {
            link: '/partners',
            label: 'Partner Configuration',
            isNewPartner: true,
            filters: { isNewPartner: true },
          },
          {
            link: '/administration/environments',
            label: 'Administration',
            match: false,
            isNewPartner: true,
            filters: { isNewPartner: true },
          },
        ],
      },
    ],
  },
  TradingPartners: {
    routeMatch: '/partners',
    showEnviroment: false,
    childrenMatch: true,
    previous: {
      disableOnSubmit: true,
      link: '/partners',
      label: 'Partners',
      icon: 'back-small',
    },
    sections: [
      {
        name: 'GENERAL',
        filters: { isNewPartner: true },
        items: [
          {
            link: '/partners/partner/contacts',
            label: 'Company Information',
            filters: { isNewPartner: true },
          },
          {
            link: '/partners/partner/identifiers',
            label: 'Identifiers',
            filters: { isNewPartner: false },
          },
          {
            link: '/partners/partner/status',
            label: 'Availability',
            filters: { isNewPartner: false },
          },
          /* {
						link: '/partners/partner/as2Certificate',
						label: 'Certificate',
						filters:{ isNewPartner: false }
					},
					*/ {
            link: '/partners/partner/certificates',
            label: 'Certificates',
            filters: { isNewPartner: false },
          },
        ],
      },
      {
        name: 'FORMAT DEFAULTS',
        filters: { isNewPartner: false },
        items: [
          {
            link: '/partners/partner/x12',
            label: 'X12',
          },
          {
            link: '/partners/partner/edifact',
            label: 'EDIFACT',
          },
          {
            link: '/partners/partner/csv',
            label: 'CSV',
          },
          /* {
						link: '/partners/partner/hl7',
						label: 'HL7'
					},
					{
						link: '/partners/partner/homeOrgRosettaNet',
						label:'RosettaNet',
						className: 'side-menu-link-indent',
						filters:{ isNormalPartner: false, isHomeOrg: true }
					},
					{
						link: '/partners/partner/partnerRosettaNet',
						label:'RosettaNet',
						className: 'side-menu-link-indent',
						filters:{ isNormalPartner: true, isHomeOrg: false }
					} */
        ],
      },
      {
        name: 'CONFIGURATION',
        filters: { isNewPartner: false },
        items: [
          {
            link: '/partners/partner/transactionDesigns',
            label: 'Transaction Designer',
            filters: { isNewPartner: true },
          },
          {
            link: '/partners/partner/documentDefinitions',
            label: 'Document Types',
          },
          {
            link: '/partners/partner/endpoints',
            label: 'Endpoints',
          },
          {
            link: '/partners/partner/maps',
            label: 'Maps',
          },
          {
            link: '/partners/partner/channels',
            label: 'Channels',
          },
          {
            link: '/partners/partner/routes',
            label: 'Routes',
          },
          {
            link: '/partners/partner/conversationDefinitions',
            label: 'Partner Conversations',
          },
          {
            link: '/partners/partner/rosettaNetPIPs',
            label: 'RosettaNet PIPs',
          },
          {
            link: '/partners/partner/rosettaNetAgreements',
            label: 'RosettaNet Agreements',
            filters: { isHomeOrg: false },
          },
        ],
      },
    ],
  },
  Administration: {
    routeMatch: '/administration',
    showEnviroment: false,
    childrenMatch: true,
    previous: {
      disableOnSubmit: true,
      link: '/',
      label: 'Main Menu',
      icon: 'back-small',
    },
    sections: [
      {
        name: 'Administration',
        filters: { isNewPartner: true },
        items: [
          {
            link: '/administration/environments',
            label: 'Environments',
          },
          {
            link: '/administration/errorCodes',
            label: 'Error Codes',
          },
          {
            link: '/administration/securityConfig',
            label: 'Security',
            permissions: ['manageHomeOrg'],
          },
          {
            link: '/administration/lookupTablesAdmin',
            label: 'Lookups Admin',
          },
          {
            link: '/administration/lookupTables',
            label: 'Lookups Data Entry',
          },
          {
            link: '/administration/typeManager/identifierTypes',
            label: 'Type Manager',
            match: false,
          },
          {
            link: '/administration/archiving',
            label: 'Archive Transaction Data',
            match: false,
          },
        ],
      },
    ],
  },
  TransactionDesigner: {
    routeMatch: '/partners/partner/transactionDesigns/designer',
    showEnviroment: false,
    childrenMatch: false,
    previous: {
      disableOnSubmit: true,
      link: '/partners/partner/transactionDesigns',
      label: 'Transaction Designs',
      icon: 'back-small',
    },
  },
  PartnerWindow: {
    routeMatch: '/partners/partner/status/partner',
    showEnviroment: false,
    childrenMatch: false,
    previous: {
      disableOnSubmit: true,
      link: '/partners/partner/status',
      label: 'On Hold / Inactive',
      icon: 'back-small',
    },
  },
  TransactionWindow: {
    routeMatch: '/partners/partner/status/transaction',
    showEnviroment: false,
    childrenMatch: false,
    previous: {
      disableOnSubmit: true,
      link: '/partners/partner/status',
      label: 'On Hold / Inactive',
      icon: 'back-small',
    },
  },
  ErrorCodes: {
    routeMatch: '/administration/errorCodes/errorCode',
    showEnviroment: false,
    childrenMatch: false,
    previous: {
      disableOnSubmit: true,
      link: '/administration/errorCodes',
      label: 'Error Codes',
      icon: 'back-small',
    },
  },
  LookupTables: {
    routeMatch: '/administration/lookupTables/lookupTable',
    showEnviroment: false,
    childrenMatch: false,
    previous: {
      disableOnSubmit: true,
      link: '/administration/lookupTables',
      label: 'Lookups Data Entry',
      icon: 'back-small',
    },
  },
  LookupTablesAdmin: {
    routeMatch: '/administration/lookupTablesAdmin/lookupTableAdmin',
    showEnviroment: false,
    childrenMatch: false,
    previous: {
      disableOnSubmit: true,
      link: '/administration/lookupTablesAdmin',
      label: 'Lookup Admin',
      icon: 'back-small',
    },
  },
  TypeManager: {
    routeMatch: '/administration/typeManager',
    showEnviroment: false,
    childrenMatch: true,
    previous: {
      disableOnSubmit: true,
      link: '/administration/environments',
      label: 'Administration',
      icon: 'back-small',
    },
    sections: [
      {
        items: [
          {
            link: '/administration/typeManager/identifierTypes',
            label: 'Identifier Types',
          },
          {
            link: '/administration/typeManager/propertyTypes',
            label: 'Property Types',
          },
        ],
      },
    ],
  },
  Archiving: {
    routeMatch: '/administration/archiving',
    showEnviroment: false,
    childrenMatch: false,
    previous: {
      disableOnSubmit: true,
      link: '/administration',
      label: 'Administration',
      icon: 'back-small',
    },
  },
  Identifier: {
    routeMatch: '/partners/partner/identifiers/identifier',
    showEnviroment: false,
    childrenMatch: false,
    previous: {
      disableOnSubmit: true,
      link: '/partners/partner/identifiers',
      label: 'Identifiers',
      icon: 'back-small',
    },
  },
  Certificate: {
    routeMatch: '/partners/partner/certificates/certificate',
    showEnviroment: false,
    childrenMatch: false,
    previous: {
      disableOnSubmit: true,
      link: '/partners/partner/certificates',
      label: 'Certificates',
      icon: 'back-small',
    },
  },
  RosettaNetPIP: {
    routeMatch: '/partners/partner/rosettaNetPIPs/rosettaNetPIP',
    showEnviroment: false,
    childrenMatch: false,
    previous: {
      disableOnSubmit: true,
      link: '/partners/partner/rosettaNetPIPs',
      label: 'RosettaNet PIPs',
      icon: 'back-small',
    },
  },
  RosettaNetAgreement: {
    routeMatch: '/partners/partner/rosettaNetAgreements/rosettaNetAgreement',
    showEnviroment: false,
    childrenMatch: false,
    previous: {
      disableOnSubmit: true,
      link: '/partners/partner/rosettaNetAgreements',
      label: 'RosettaNet Agreements',
      icon: 'back-small',
    },
  },
  DocumentDefinition: {
    routeMatch: '/partners/partner/documentDefinitions/documentDefinition',
    showEnviroment: false,
    childrenMatch: false,
    previous: {
      disableOnSubmit: true,
      link: '/partners/partner/documentDefinitions',
      label: 'Document Types',
      icon: 'back-small',
    },
  },
  Endpoint: {
    routeMatch: '/partners/partner/endpoints/endpoint',
    showEnviroment: false,
    childrenMatch: false,
    previous: {
      disableOnSubmit: true,
      link: '/partners/partner/endpoints',
      label: 'Endpoints',
      icon: 'back-small',
    },
  },
  ReusableConfiguration: {
    routeMatch: '/partners/partner/endpoints/reusableConfiguration',
    showEnviroment: false,
    childrenMatch: false,
    previous: {
      disableOnSubmit: true,
      link: '/partners/partner/endpoints',
      label: 'Endpoints',
      icon: 'back-small',
    },
  },
  Map: {
    routeMatch: '/partners/partner/maps/map',
    showEnviroment: false,
    childrenMatch: false,
    previous: {
      disableOnSubmit: true,
      link: '/partners/partner/maps',
      label: 'Maps',
      icon: 'back-small',
    },
  },
  Channel: {
    routeMatch: '/partners/partner/channels/channel',
    showEnviroment: false,
    childrenMatch: false,
    previous: {
      disableOnSubmit: true,
      link: '/partners/partner/channels',
      label: 'Channels',
      icon: 'back-small',
    },
  },
  Route: {
    routeMatch: '/partners/partner/routes/route',
    showEnviroment: false,
    childrenMatch: false,
    previous: {
      disableOnSubmit: true,
      link: '/partners/partner/routes',
      label: 'Routes',
      icon: 'back-small',
    },
  },
  ConversationDefinition: {
    routeMatch: '/partners/partner/conversationDefinitions/conversationDefinition',
    showEnviroment: false,
    childrenMatch: false,
    previous: {
      disableOnSubmit: true,
      link: '/partners/partner/conversationDefinitions',
      label: 'Partner Conversations',
      icon: 'back-small',
    },
  },
  ConversationDefinitionStep: {
    routeMatch:
      '/partners/partner/conversationDefinitions/conversationDefinition/conversationDefinitionStep',
    showEnviroment: false,
    childrenMatch: false,
    previous: {
      disableOnSubmit: true,
      link: '/partners/partner/conversationDefinitions/conversationDefinition',
      label: 'Partner Conversation',
      icon: 'back-small',
    },
  },
});


const Link = () => <div> Link </div>;
// Section Filters
const RouterMenu = ({
  environment,
  location,
  permissions,
  isHomeOrg,
  isExistingPartner,
  isPartnerSubmitPending,
}) => {
  const filters = [
    {
      name: 'isNewPartner',
      apply: !isExistingPartner,
      match: true,
    },
    {
      name: 'isProduction',
      apply: environment ? environment.isProduction : false,
      match: true,
    },
  ];

  const visibilityFilter = item =>
    filters.filter(filter => filter.apply).every((filter) => {
      const { name, match } = filter;
      if (!item.filters) {
        return true;
      }
      const itemFilterValue = item.filters[name];
      if (typeof itemFilterValue === 'undefined') {
        return true;
      }
      return item.filters[name] === match;
    });

  const permissionsFilter = item =>
    (item.permissions
      ? item.permissions.every(permission => permissions[permission] === true)
      : true);

  let locationString = location.pathname;
  if (locationString.endsWith('/')) {
    locationString = locationString.slice(0, -1);
  }

  const isActive = link => locationString === link;
  const menuData = menuConfig();

  const menus = Object.keys(menuData);
  let selectedMenu = menuData.Default;

  for (let i = 0; i < menus.length && i >= 0; i += 1) {
    const menuName = menus[i];
    const menu = menuData[menuName];
    let isMenuActive = isActive(menu.routeMatch);

    if (!isMenuActive && menu.childrenMatch === true && menu.sections !== undefined) {
      isMenuActive = menu.sections.some(section =>
        section.items.some(item => isActive(item.link) && item.match !== false));
    }
    if (isMenuActive) {
      selectedMenu = menu;
      break;
    }
  }

  return (
    <div id="side-menu">
      <div id="menu-wrapper">


        {/* PREVIOUS MENU */}

        <PreviousMenu data={selectedMenu.previous} pending={isPartnerSubmitPending} />

        {/* CURRENT MENU */}
        {selectedMenu.sections !== undefined &&
          selectedMenu.sections.filter(visibilityFilter).map((section, i) => (
            <div className="side-menu-section" key={i.toString()}>
              <div className="side-menu-section-title"> {section.name} </div>
              <div className="side-menu-section-links">
                {section.items
                  .filter(permissionsFilter)
                  .filter(visibilityFilter)
                  .map((item, j) => {
                    const linkClassNames = ['side-menu-link', 'padded'];
                    if (item.link === location.pathname) {
                      linkClassNames.push('active');
                    }
                    if (item.className) {
                      linkClassNames.push(item.className);
                    }

                    return item.link ? (
                      <div className={linkClassNames.join(' ')} key={j.toString()}>
                        <Link to={item.link} activeClassName="active">
                          {' '}
                          {item.label}{' '}
                        </Link>
                        {item.card && <div className="side-menu-section-card"> {item.card} </div>}
                      </div>
                    ) : (
                      <span className="side-menu-section-title" key={j.toString()}>
                        {' '}
                        {item.label}{' '}
                      </span>
                    );
                  })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const PreviousMenu = ({ data, pending }) => {
  if (data) {
    const isDisabled = data.disableOnSubmit && pending;
    return (
      <div className="side-menu-previous-box">
        <div className="side-menu-link">
          {isDisabled ? (
            <span
              style={{
                fontSize: 12,
                color: '#999',
                display: 'flex',
                height: '28px',
                alignItems: 'center',
              }}
            >
              <div className="side-menu-icon-box">
                {data.icon && <Icon className="icon" fill="#999" name="arrow" size={10} />}
              </div>
              {data.label}
            </span>
          ) : (
            <Link to={data.link}>
              <div className="side-menu-icon-box">
                {data.icon && <Icon className="icon" fill="#666" name="arrow" size={10} />}
              </div>
              {data.label}
            </Link>
          )}
        </div>
      </div>
    );
  }
  return <div />;
};


const bindOnClickToElement = onClick => element => React.cloneElement(element, {
  ...element.props, 
  onClick
});

const bindPathnameToElement = pathname => element => React.cloneElement(element, {
  ...element.props, 
  pathname
});

const setActiveProp = pathname => element => {
  if (element.props.path === pathname) {
    return React.cloneElement(element, {
      ...element.props, 
      active: true
    });
  }
  return element;
}



class Menu extends PureComponent {
  static isMenuSection(element) { return element.type === MenuSection }
  static isMenuItem(element) { return element.type === MenuItem }
  static flattenMenuSections(items){
    return items.reduce( (prevItems, currentItem) => [
      ...prevItems,
      ...( Menu.isMenuSection(currentItem)
        ? Menu.flattenMenuSections(React.Children.toArray(currentItem.props.children))
        : [currentItem]
      )
    ], []);
  }
  constructor(){
    super();
    this.getActiveRoot = this.getActiveRoot.bind(this);
  }  
  getActiveRoot(rootNode){
    const { pathname } = this.props;
    if(rootNode.props.path === pathname){
      return rootNode;
    }
    
    // Flatten MenuSections in order not to have nested children when detecting active menu
    const items = Menu.flattenMenuSections(React.Children.toArray(rootNode.props.children))

    let activeRoot = null;
    for (let i=0; i < items.length && activeRoot === null; i++) {
      const node = items[i];
      const { path, label, exact, children} = node.props;
      const hasChildren = children !== undefined;
      const matchesPath = path === pathname;  
      
      if(Menu.isMenuItem(node)){
        if(path === pathname){
          // exact prop is meant to be used when menu has child elements
          // and we dp not want to render the parent element
          if(exact === true){
            activeRoot = node;            
          } else {
            activeRoot = rootNode;
          }
        } else {
          if(hasChildren){
            activeRoot = this.getActiveRoot(node);
          }
        }
      }        
    }
    return activeRoot;
  }

  render(){
    const { pathname, onChange, children } = this.props;    
    const activeRoot = this.getActiveRoot(this);
    if(activeRoot === null){
      return null;
    }
    const menuComponents = React.Children
      .toArray(activeRoot.props.children)
      .filter( element => Menu.isMenuItem(element) || Menu.isMenuSection(element) )
      .map( bindOnClickToElement(onChange) )
      .map( bindPathnameToElement(pathname) )
      .map( setActiveProp(pathname) )
    return menuComponents;
  }
}

const MenuSection = ({ pathname, label, children, onClick }) => {
  const menuItems = React.Children
    .toArray(children)
    .filter( element => Menu.isMenuItem(element) )
    .map( bindOnClickToElement(onClick) )
    .map( setActiveProp(pathname) );

  return (
    <div className='element-menu__section'>
      <div classNAme='element-menu__section-label'> {label} </div>
      {menuItems}
    </div>
  );
}

class MenuItem extends PureComponent {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(){
    if(!this.props.disabled){      
      this.props.onClick(this.props.to || this.props.path);
    }
  }
  render(){
    const { path, label, disabled, hidden, active, back } = this.props
    if(hidden){
      return null;
    }
    let BackIcon = null;
    if (back) {
      BackIcon = <Icon name='arrow' size={14} fill='#999' />;
    }

    const classNames = utils.composeClassNames([
      'mb-element',
      'element-menu__item',
      active && 'element-menu__item--active',
      disabled && 'element-menu__item--disabled'
    ]);

    return (
      <div
        className={classNames}
        onClick={this.onClick}
        role="presentation"
      >
        {BackIcon}
        {label} - ({path})
      </div>
    );
  }
};

export default Menu;
export { MenuItem, MenuSection };

/* eslint-enable */
