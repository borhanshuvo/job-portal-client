import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";

import Navbar from '../../Navbar/Navbar';
import { UserContext } from '../../../App';
import infoEmoji from '../../../images/info-emoji.svg'
import './Login.css';

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [users, setUsers] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('none');
    const [show, setShow] = useState('block');
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: '/' } };

    fetch('http://localhost:5000/usersList')
        .then(res => res.json())
        .then(data => setUsers(data));

    const onSubmitLogin = (data, event) => {
        users.forEach(user => {
            if ((user.email === data.email) && (user.password === data.password)) {
                const signedInUser = {
                    displayName: user.name,
                    email: user.email,
                    password: user.password,
                    user_type: user.user_type
                }
                setLoggedInUser(signedInUser);
                history.replace(from);
            }
            else {
                setError('block');
            }
        });

        event.target.reset();
    }

    const onSubmitRegistration = (data, event) => {

        data.created = new Date();

        fetch('http://localhost:5000/addUser', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    event.target.reset();
                }
            })
            .catch(error => {

            })
    };

    return (
        <div>
            <Navbar />
            <div className="container pt-5 mt-5 pb-5">
                <div className="row mt-5">
                    <div className="login-style">
                        {!newUser ? (
                            <div>
                                <div style={{ display: show }} className="card pb-2">
                                    <div className="d-flex justify-content-between pb-2">
                                        <strong><img src={infoEmoji} className="rounded me-2" alt="" />Important Information</strong>
                                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => setShow('none')}></button>
                                    </div>
                                    <div className="text-center">
                                        <span>For Admin <br /> Gmail: borhan@gmail.com <br /> Password: 12345678</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-center">Login</h4>
                                    <form onSubmit={handleSubmit(onSubmitLogin)}>

                                        <div className="form-group pb-3">
                                            <label htmlFor="email" className="pb-2">Email</label>
                                            <input type="email" name="email" placeholder="e.g example@example.com" aria-invalid={errors.email ? "true" : "false"} {...register('email', { required: true })} id="email" className="form-control" autoComplete="off" />
                                            {errors.email && (<span role="alert" className="text-danger"> Email required </span>)}
                                        </div>

                                        <div className="form-group pb-3">
                                            <label htmlFor="password" className="pb-2">Password</label>
                                            <input type="password" name="password" placeholder="e.g At least 8 character" aria-invalid={errors.password ? "true" : "false"} {...register('password', { required: true, minLength: 8 })} id="password" className="form-control" autoComplete="off" />
                                            {errors.password && (<span role="alert" className="text-danger"> Password required & must contain at least 8 character </span>)}
                                        </div>

                                        <br />

                                        <div className="form-group pb-3 text-center" style={{ display: error }}>
                                            <span style={{ color: 'red' }}>Email or Password In-Correct</span>
                                        </div>

                                        <div className="form-group pb-3">
                                            <input type="submit" name="submitLogin" className="btn btn-primary form-control" />
                                        </div>

                                    </form>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h4 className="text-center">Registration</h4>
                                <form onSubmit={handleSubmit(onSubmitRegistration)}>

                                    <div className="form-group pb-3">
                                        <label htmlFor="user_type" className="pb-2">Role</label>
                                        <select name="user_type" id="user_type" {...register("user_type")} className="form-control">
                                            <option value="job_seeker">Job Seeker</option>
                                            <option value="employee">Employee</option>
                                        </select>
                                    </div>

                                    <div className="form-group pb-3">
                                        <label htmlFor="name" className="pb-2">Name</label>
                                        <input type="text" name="name" placeholder="Enter Your Name" aria-invalid={errors.name ? "true" : "false"} {...register('name', { required: true })} id="name" className="form-control" autoComplete="off" />
                                        {errors.name && (<span role="alert" className="text-danger"> Name required </span>)}
                                    </div>

                                    <div className="form-group pb-3">
                                        <label htmlFor="email" className="pb-2">Email</label>
                                        <input type="email" name="email" placeholder="e.g example@example.com" aria-invalid={errors.email ? "true" : "false"} {...register('email', { required: true })} id="email" className="form-control" autoComplete="off" />
                                        {errors.email && (<span role="alert" className="text-danger"> Email required </span>)}
                                    </div>

                                    <div className="form-group pb-3">
                                        <label htmlFor="password" className="pb-2">Password</label>
                                        <input type="password" name="password" placeholder="e.g At least 8 character" aria-invalid={errors.password ? "true" : "false"} {...register('password', { required: true, minLength: 8 })} id="password" className="form-control" autoComplete="off" />
                                        {errors.password && (<span role="alert" className="text-danger"> Password required & must contain at least 8 character </span>)}
                                    </div>

                                    <br />

                                    <div className="form-group pb-3">
                                        <input type="submit" name="submitRegistration" className="btn btn-primary form-control" />
                                    </div>

                                </form>
                            </div>
                        )}

                        <br />
                        <p className="text-center">{newUser ? 'Already have an Account?' : "Don't have account?"}<button name="newUser" onClick={() => setNewUser(!newUser)} style={{ border: "none", backgroundColor: "white", color: "blue" }}>{newUser ? 'Login' : 'Create a new Account'}</button></p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Login;