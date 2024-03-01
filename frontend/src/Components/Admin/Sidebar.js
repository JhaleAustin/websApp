import React, { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, Link } from 'react-router-dom';

const Sidebar = () => {
  const [isProcessDropdownOpen, setIsProcessDropdownOpen] = useState(false);
  const [isDocumentationDropdownOpen, setIsDocumentationDropdownOpen] = useState(false);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);

  const toggleProcessDropdown = () => {
    setIsProcessDropdownOpen(!isProcessDropdownOpen);
    setIsDocumentationDropdownOpen(false);
  };

  const toggleDocumentationDropdown = () => {
    setIsDocumentationDropdownOpen(!isDocumentationDropdownOpen);
    setIsProcessDropdownOpen(false);
  };


  const toggleHomeDropdown = () => {
    setIsHomeDropdownOpen(!isHomeDropdownOpen);
    setIsProcessDropdownOpen(false);
  };

  return (
     <CDBSidebar backgroundColor="#abc32f" textColor="black" 
      style={{ boxShadow: "5px 0px 15px rgba(0, 0, 0, 0.2)",
                boxShadowColor: "#164006" ,
                // height: "100vh", 
                overflow: "scroll initial",
                position: "fixed"
                }}>
        {/* <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        </CDBSidebarHeader> */}
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu style={{ backgroundColor: "#abc32f", color: "white" }}>
            <Link to="/" className="sidebar__content__logo">
              <img class="slogo" src="/images/logo.png"></img>
            </Link>
            
            <NavLink exact to="/admin/process" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa-solid fa-seedling">
                PROCESS
              </CDBSidebarMenuItem>
            </NavLink>

          <NavLink activeClassName="activeClicked">
            <CDBSidebarMenuItem onClick={toggleDocumentationDropdown} icon="fa-solid fa-cloud">
              DOCUMENTATION
            </CDBSidebarMenuItem>
            {isDocumentationDropdownOpen && (
              <div style={{ paddingLeft: '20px', marginTop: '10px' }}>

                <NavLink exact to="/admin/documentationList" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="fa-solid fa-table">DOCUMENTATION</CDBSidebarMenuItem>
                </NavLink>

              </div>
            )}
          </NavLink>


          <NavLink activeClassName="activeClicked">
            <CDBSidebarMenuItem onClick={toggleHomeDropdown} icon="fa-solid fa-info">
              INFORMATIONS
            </CDBSidebarMenuItem>
            {isHomeDropdownOpen && (
              <div style={{ paddingLeft: '20px', marginTop: '10px' }}>
                <NavLink exact to="/admin/peanutshell" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="fa-solid fa-table">PEANUT SHELLS</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/admin/mulching" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="fa-solid fa-table">MULCHING</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/admin/peanutshellmulching" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="fa-solid fa-table">PEANUT SHELLS MULCHING</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/admin/benefit" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="fa-solid fa-table">BENEFITS</CDBSidebarMenuItem>
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