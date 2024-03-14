import React, { useState, useEffect } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { logout, getUser } from '../../utils/helpers'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = () => {
  const [isProcessDropdownOpen, setIsProcessDropdownOpen] = useState(false);
  const [isDocumentationDropdownOpen, setIsDocumentationDropdownOpen] = useState(false);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const [user, setUser] = useState({})
  const navigate = useNavigate();

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

  const logoutUser = async () => {
    try {
        await axios.get(`${process.env.REACT_APP_API}/api/v1/logout`)
        setUser(null)
        logout(() => navigate('/login'))
    } catch (error) {
        toast.error(error.response.data.message)
    }
  }

  const logoutHandler = () => {
    logoutUser();
    navigate('/login')
    toast.success('LOG OUT');
}
    useEffect(() => {
      setUser(getUser())
    }, [])


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

            <NavLink exact to="/dashboard" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="fas fa-tachometer-alt"> {/* Assuming 'fa-tachometer-alt' is the icon for dashboard */}
              DASHBOARD
            </CDBSidebarMenuItem>
          </NavLink>

            <NavLink exact to="/admin/forum" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa-regular fa-newspaper">
                FORUM
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/admin/analysis" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa-solid fa-chart-line">
                ANALYSIS
              </CDBSidebarMenuItem>
            </NavLink>
            
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

                <NavLink exact to="/admin/withmulch" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="fa-solid fa-table">WITH MULCH</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/admin/withoutmulch" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="fa-solid fa-table">WITHOUT MULCH</CDBSidebarMenuItem>
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
        <Link to="/logout" className="sideBLogOut">
          <button className="btn btn__login" onClick={logoutHandler}> 
           <i className="fas fa-sign-out-alt fa-flip-horizontal"></i> 
          </button>
        </Link>
      </CDBSidebar>
  );
};

export default Sidebar;