/* eslint no-console: "off" */
/* eslint-disable */
import React, { PureComponent } from 'react';
import Row from '../../components/Row';
import TextField from '../../components/TextField';
import Checkbox from '../../components/Checkbox';
import Button from '../../components/Button';
import Menu, { MenuItem, MenuSection } from '../../components/Menu';

const Menus = ({ pathname, onChange, disabled, hidden }) => (
  <Menu path="/" pathname={pathname} onChange={onChange}>
    <MenuItem path="/tracking" label="Tracking" hidden={hidden}/>
    <MenuItem path="/partners" label="Partners" disabled={disabled}>

      <MenuSection label="User Info">
        <MenuItem path="/partners/partner/contacts" label="Contacts" />
        <MenuItem path="/partners/partner/identifiers" label="Identifiers" disabled={disabled} />                      

      </MenuSection>
      
      <MenuSection label="Format Defaults">        
        <MenuItem path="/partners/partner/csv" label="CSV" />
        <MenuItem path="/partners/partner/edifact" label="EDIFACT" />              
        <MenuItem path="/partners/partner/x12" label="X12" />        
      </MenuSection>

      <MenuSection label="Configuration">      
        <MenuItem path="/partners/partner/documentDefinitions" label="Document Definitions">
          <MenuItem path="/partners/partner/documentDefinitions/documentDefinition" to="/partners/partner/documentDefinitions" label="Document Definitions" back/>
        </MenuItem>      
      </MenuSection>

    </MenuItem>
    
    <MenuItem path="/administration" label="administration" exact disabled={disabled}>
      <MenuItem to="/" label="Administration" back />
      <MenuItem path="/administration/errorcodes" label="Error Codes">
        <MenuItem path="/administration/errorcodes/errorCode" to="/administration/errorcodes" label="Error Code" back/>
      </MenuItem>
    </MenuItem>
  </Menu>
);

class MenuTester extends PureComponent {
  constructor() {
    super();
    this.onChangePath = this.onChangePath.bind(this);
    this.onMenuChange = this.onMenuChange.bind(this);
    this.onChangeDisabled = this.onChangeDisabled.bind(this);
    this.onChangeHidden = this.onChangeHidden.bind(this);
    this.state = {
      pathname: '/',       
      disabled: false,
      hidden: false
    };
  }
  onMenuChange(pathname) {
    if (pathname !== this.state.pathname) {
      this.setState({ pathname });
    }
  }
  onChangePath(pathname) {
    if (pathname !== this.state.pathname) {
      this.setState({ pathname });
    }
  }
  onChangeDisabled(){
    this.setState({
      disabled: !this.state.disabled
    })
  }
  onChangeHidden(){
    this.setState({
      hidden: !this.state.hidden
    })
  }
  render() {
    const style = {margin:'5px'};
    return (
      <div>
        <Row align='left'>
          <TextField
            onChange={this.onChangePath}
            value={this.state.pathname}
            style={{ ...style, width: '400px' }}
          />
          <Button
            onClick={()=>this.onChangePath('/partners/partner/contacts')}
            label='Go To Contacts'
            style={style}
          />
        </Row>
        <Row align='left'>
          <Checkbox
            onChange={this.onChangeDisabled}
            checked={this.state.disabled}
            label='Disable'
            style={style}
          />

          <Checkbox
            onChange={this.onChangeHidden}
            checked={this.state.hidden}
            label='Hide'
            style={style}
          />
        </Row>
        <div style={{width: '200px'}}>
          <Menus
            pathname={this.state.pathname}
            onChange={this.onMenuChange}
            disabled={this.state.disabled}
            hidden={this.state.hidden}
          />
        </div>
      </div>
    );
  }
}

const TestMenu = () => (
  <div>
    <div style={{ padding: '10px', border: '1px solid #ccc' }}>
      <MenuTester />
    </div>
  </div>
);

export default TestMenu;
/* eslint-enable */
