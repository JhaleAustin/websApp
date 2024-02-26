import React, { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [isPhotosDropdownOpen, setIsPhotosDropdownOpen] = useState(false);
  const [isMaterialsDropdownOpen, setIsMaterialsDropdownOpen] = useState(false);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);

  const togglePhotosDropdown = () => {
    setIsPhotosDropdownOpen(!isPhotosDropdownOpen);
    setIsMaterialsDropdownOpen(false);
  };

  const toggleMaterialsDropdown = () => {
    setIsMaterialsDropdownOpen(!isMaterialsDropdownOpen);
    setIsPhotosDropdownOpen(false);
  };


  const toggleHomeDropdown = () => {
    setIsHomeDropdownOpen(!isHomeDropdownOpen);
    setIsPhotosDropdownOpen(false);
  };

  return (
     <CDBSidebar backgroundColor="#abc32f" textColor="#fff" >
        {/* <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        </CDBSidebarHeader> */}
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu style={{ backgroundColor: "#abc32f", color: "white" }}>
            <NavLink to="/" className="header__content__logo">
              <img class="hlogo" src="images/logo.png"></img>
           </NavLink>
            <NavLink exact to="/admin/dashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="cube" >DASHBOARD</CDBSidebarMenuItem>
            </NavLink>
            
            <NavLink activeClassName="activeClicked">
            <CDBSidebarMenuItem onClick={togglePhotosDropdown} icon="image">
              PROCESS
            </CDBSidebarMenuItem>
            {isPhotosDropdownOpen && (
              <div style={{ paddingLeft: '20px', marginTop: '10px' }}>

                <NavLink exact to="/admin/processList" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="list-alt">PROCESS LIST</CDBSidebarMenuItem>
                </NavLink>

                <NavLink link to="/admin/process" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="plus">CREATE</CDBSidebarMenuItem>
                </NavLink>

              </div>
            )}
          </NavLink>

          <NavLink activeClassName="activeClicked">
            <CDBSidebarMenuItem onClick={toggleMaterialsDropdown} icon="toolbox">
              DOCUMENTATION
            </CDBSidebarMenuItem>
            {isMaterialsDropdownOpen && (
              <div style={{ paddingLeft: '20px', marginTop: '10px' }}>

                <NavLink exact to="/admin/documentationList" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="list-alt">DOCUMENTATION LIST</CDBSidebarMenuItem>
                </NavLink>

                <NavLink exact to="/admin/documentation" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="plus">CREATE</CDBSidebarMenuItem>
                </NavLink>

              </div>
            )}
          </NavLink>



          <NavLink activeClassName="activeClicked">
            <CDBSidebarMenuItem onClick={toggleHomeDropdown} icon="toolbox">
              HOMEPAGE
            </CDBSidebarMenuItem>
            {isHomeDropdownOpen && (
              <div style={{ paddingLeft: '20px', marginTop: '10px' }}>
                <NavLink exact to="/admin/homepageList" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="list-alt">TYPES</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/admin/peanutshell" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="list-alt">PEANUT SHELLS</CDBSidebarMenuItem>
                </NavLink>

                <NavLink exact to="/admin/homepage" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="plus">CREATE TOPIC</CDBSidebarMenuItem>
                </NavLink>

              </div>
            )}
          </NavLink>
        
          
          </CDBSidebarMenu>
        </CDBSidebarContent> 
      </CDBSidebar>
  );
};

export default Sidebar;