import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Loader from '../Layout/Loader' 
import MetaData from '../Layout/MetaData'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {authenticate} from '../../utils/helpers'
import { getUser } from '../../utils/helpers';

import Modal from 'react-modal' // Replace with your modal library

const clientID = "526985758798-b5jsd5g1grsqi5k3g49vka6r1dmu29b2.apps.googleusercontent.com";

    const Login = () => {
        
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [loading, setLoading] = useState(false)
        const navigate = useNavigate()
        let location = useLocation();
        const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : ''
        const [showModal, setShowModal] = useState(false);
    const [profile, setProfile] = useState(null);

    const login = async (email, password) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
    
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/login`, { email, password }, config);
    
            // If the request is successful, proceed with authentication
            const data = response.data;
            authenticate(data, () => navigate("/"));
        } catch (error) {
            console.log('Server response:', error.response);
    
            if (error.response && error.response.status === 400 && error.response.data.errors) {
                // If the server returns validation errors, display them to the user
                const validationErrors = error.response.data.errors;
                validationErrors.forEach(errorMessage => {
                    toast.error(errorMessage, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                });
            } else {
                // For other errors, show a generic message
                toast.error("INVALID USER OR PASSWORD", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
    };

    
    const submitHandler = (e) => {
        e.preventDefault();   
        login(email, password)
    }


    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Login'} />
                    <div className="l-row wrapper">
                        <div className="l-col-10 col-lg-5">
                            <div class="bg-img">
                                <div class="l-content">
                                    <header>LOGIN FORM</header>
                                    <form onSubmit={submitHandler}>
                                        <div class="field">
                                            <span class="fa fa-envelope"></span>
                                                <input placeholder="EMAIL OR PHONE"
                                                    type="email"
                                                    id="email_field"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}/>
                                        </div>
                                        <div class="field space">
                                            <span class="fa fa-lock"></span>
                                            <input required placeholder="PASSWORD"
                                                    type="password"
                                                    id="password_field"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}/>
                                        </div>
                                        <div class="pass">
                                            <a href="/password/forgot">FORGOT PASSWORD?</a>
                                        </div>
                                        <div className="field">
                                            <button id="login_button" type="submit">LOGIN</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Login