import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from './Search'
import axios from 'axios'
import { logout, getUser } from '../../utils/helpers'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Header() {
  const [user, setUser] = useState({})
  const navigate = useNavigate();

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
    toast.success('LOG OUT', {
        position: toast.POSITION.BOTTOM_RIGHT
    });
}
    useEffect(() => {
      setUser(getUser())
    }, [])

  return (
    <Fragment>
    <header className="header">
      <div className="header__content">
        <Link to="/" className="header__content__logo">
          <img class="hlogo" src="images/logo.png"></img>

        </Link>
        
        <nav className="header__content__nav">
            {/* <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
              <Search />
            </div> */}
        {user ? (
          <ul>
            <li>
            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
              <Link to="/" style={{ textDecoration: 'none' }} >
                <span id="profile" className="ml-3">ABOUT</span>       
              </Link>
            </div>
            </li>
            <li>
              <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                <Link to="/process" style={{ textDecoration: 'none' }} >
                  <span id="cart" className="ml-3">PROCESS</span>
                </Link>
              </div>
            </li>
            <li>
              
              <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                <Link to="/documentation" style={{ textDecoration: 'none' }} >
                  <span id="myOrders" className="ml-3">DOCUMENTATION</span>
                </Link>
              </div>
              
            </li>
            <li>
              
              <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                <Link to="/analysis" style={{ textDecoration: 'none' }} >
                  <span id="myOrders" className="ml-3">ANALYSIS</span>
                </Link>
              </div>
              
            </li>
            <li>
            {user && user.role === 'admin' && (
              <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                <Link to="/admin/documentation" style={{ textDecoration: 'none' }} >
                  <span id="dashboard" className="ml-3">DASHBOARD</span>
                </Link>
              </div>
              )}
            </li>
          </ul>
          ) : ([])}
          </nav>
          <div className="header__content__buttons">
            
            {user ? ( // Show login button if not authenticated
              <Link to="/logout">
              <button className="btn btn__login" onClick={logoutHandler}> <i className="fas fa-sign-out-alt"></i> </button>
            </Link>
              ) : (
                
                <Link to="/login">
                <button className="btn btn__login">LOGIN</button>
              </Link>
              
              )}
          </div>
      </div>
    </header>
    </Fragment>
  );
}

export default Header;
