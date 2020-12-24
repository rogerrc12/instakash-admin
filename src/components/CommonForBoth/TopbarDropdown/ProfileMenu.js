import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { withRouter, Link } from "react-router-dom";

//i18n
import { withNamespaces } from "react-i18next";

const ProfileMenu = (props) => {
  const { user } = props;

  const [menu, setMenu] = useState(false);

  const toggle = () => {
    setMenu((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={toggle} className='d-inline-block'>
        <DropdownToggle className='btn header-item waves-effect' id='page-header-user-dropdown' tag='button'>
          <i className='rounded-circle header-profile-user fas fa-user-circle fa-2x' />
          <span className='d-none d-xl-inline-block ml-2 mr-1'>{user && user.userName}</span>
          <i className='mdi mdi-chevron-down d-none d-xl-inline-block'></i>
        </DropdownToggle>
        <DropdownMenu right>
          {/* <DropdownItem tag='a' href='/profile'>
            <i className='bx bx-user font-size-16 align-middle mr-1'></i>
            {props.t("Profile")}
          </DropdownItem> */}
          {/* <DropdownItem tag='a' href='/crypto-wallet'>
            <i className='bx bx-wallet font-size-16 align-middle mr-1'></i>
            {props.t("My Wallet")}
          </DropdownItem> */}
          {/* <DropdownItem tag='a' href='#'>
            <span className='badge badge-success float-right mt-1'>5</span>
            <i className='bx bx-wrench font-size-17 align-middle mr-1'></i>
            {props.t("Settings")}
          </DropdownItem> */}
          {/* <DropdownItem tag='a' href='auth-lock-screen'>
            <i className='bx bx-lock-open font-size-16 align-middle mr-1'></i>
            {props.t("Lock screen")}
          </DropdownItem> */}
          <div className='dropdown-divider'></div>
          <Link to='/logout' className='dropdown-item'>
            <i className='bx bx-power-off font-size-16 align-middle mr-1 text-danger'></i>
            <span>{props.t("Cerrar sesión")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withRouter(withNamespaces()(ProfileMenu));
