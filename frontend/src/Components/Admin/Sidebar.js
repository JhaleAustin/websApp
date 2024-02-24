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

  const togglePhotosDropdown = () => {
    setIsPhotosDropdownOpen(!isPhotosDropdownOpen);
    setIsMaterialsDropdownOpen(false);
  };

  const toggleMaterialsDropdown = () => {
    setIsMaterialsDropdownOpen(!isMaterialsDropdownOpen);
    setIsPhotosDropdownOpen(false);
  };

  return (
     <CDBSidebar backgroundColor="#abc32f" textColor="#fff" >
        {/* <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        </CDBSidebarHeader> */}
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu style={{ backgroundColor: "#abc32f", color: "white" }}>
            <NavLink exact to="/admin/dashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="cube" >DASHBOARD</CDBSidebarMenuItem>
            </NavLink>
            
            <NavLink activeClassName="activeClicked">
            <CDBSidebarMenuItem onClick={togglePhotosDropdown} icon="image">
              PROCESS
            </CDBSidebarMenuItem>
            {isPhotosDropdownOpen && (
              <div style={{ paddingLeft: '20px', marginTop: '10px' }}>

                <NavLink exact to="/processList" activeClassName="activeClicked">
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
              DOCUMENATOIN
            </CDBSidebarMenuItem>
            {isMaterialsDropdownOpen && (
              <div style={{ paddingLeft: '20px', marginTop: '10px' }}>

                <NavLink exact to="/documentationList" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="list-alt">DOCUMENTATION LIST</CDBSidebarMenuItem>
                </NavLink>

                <NavLink exact to="/admin/documentation" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="plus">CREATE</CDBSidebarMenuItem>
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