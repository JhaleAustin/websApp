import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../Layout/Loader' 
import MetaData from '../Layout/MetaData'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {authenticate} from '../../utils/helpers'
import { getUser } from '../../utils/helpers';

    const Login = () => {
        
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [loading, setLoading] = useState(false)
        const navigate = useNavigate()
    
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
            authenticate(data, () => navigate("/forum"));
        } catch (error) {
            console.log('Server response:', error.response);
    
            if (error)
            {
                toast.error("INVALID USER OR PASSWORD")
            } else {
                toast.error("INVALID USER OR PASSWORD")
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
                                    <img class="logo" src="images/logo.png"></img>
                                    <form onSubmit={submitHandler}>
                                        <div class="field">
                                            <span class="fa fa-envelope"></span>
                                                <input placeholder=" EMAIL OR PHONE"
                                                    type="email"
                                                    id="email_field"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}/>
                                        </div>
                                        <div class="field space">
                                            <span class="fa fa-lock"></span>
                                            <input required placeholder=" PASSWORD"
                                                    type="password"
                                                    id="password_field"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}/>
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