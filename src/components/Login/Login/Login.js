import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import Navbar from '../../Navbar/Navbar';
import { UserContext } from '../../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { firebaseConfig } from './firebase.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import './Login.css';
import { useForm } from "react-hook-form";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
else {
    firebase.app();
}

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [jobSeekers, setJobSeekers] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [show, setShow] = useState('block');
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: '/' } };

    const googleProvider = new firebase.auth.GoogleAuthProvider();

    const googleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, email } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    displayName: displayName,
                 email: email,
                    password: '',
                    user_type: 'employee'
                }
                setLoggedInUser(signedInUser);
                storeAuthToken();
                history.replace(from);
            })
            .catch(err => {
                const errorMessage = err.message;
                console.log(errorMessage);
            })
    }

    const storeAuthToken = () => {
        firebase
            .auth().currentUser
            .getIdToken(true)
            .then(function (idToken) {
                sessionStorage.setItem('token', idToken);
            })
            .catch(function (error) {
                // Handle error
            });
    }

    fetch('https://salty-oasis-92410.herokuapp.com/adminList')
        .then(res => res.json())
        .then(data => {
            setAdmins(data);
        });


    fetch('https://salty-oasis-92410.herokuapp.com/employeeList')
        .then(res => res.json())
        .then(data => {
            setEmployees(data);
        });

    fetch('https://salty-oasis-92410.herokuapp.com/jobSeekerList')
        .then(res => res.json())
        .then(data => {
            setJobSeekers(data);
        });

    const onSubmitLogin = (data, event) => {

        admins.forEach(admin => {
            if ((admin.email === data.email) && (admin.password === data.password)) {
                const signedInUser = {
                    isSignedIn: true,
                    displayName: admin.name,
                    email: admin.email,
                    password: admin.password,
                    user_type: admin.user_type
                }
                setLoggedInUser(signedInUser);
                history.replace(from);
            }
        });

        employees.forEach(employee => {
            if ((employee.email === data.email) && (employee.password === data.password)) {
                const signedInUser = {
                    isSignedIn: true,
                    displayName: employee.name,
                    email: employee.email,
                    password: employee.password,
                    user_type: employee.user_type
                }
                setLoggedInUser(signedInUser);
                history.replace(from);
            }
        });

        jobSeekers.forEach(jobSeeker => {
            if ((jobSeeker.email === data.email) && (jobSeeker.password === data.password)) {
                const signedInUser = {
                    isSignedIn: true,
                    displayName: jobSeeker.name,
                    email: jobSeeker.email,
                    password: jobSeeker.password,
                    user_type: jobSeeker.user_type
                }
                setLoggedInUser(signedInUser);
                history.replace(from);
            }
        });

        event.target.reset();
    }

    const onSubmitRegistration = (data, event) => {

        data.created = new Date();

        if (data.user_type === 'employee') {

            fetch('https://salty-oasis-92410.herokuapp.com/addEmployee', {
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
        }

        else if (data.user_type === 'job_seeker') {

            fetch('https://salty-oasis-92410.herokuapp.com/addJobSeeker', {
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
        }

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
                                        <strong>Important Information</strong>
                                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => setShow('none')}></button>
                                    </div>
                                    <div className="text-center">
                                        <span>For Admin: test@admin.com pass: 12345678</span>
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
                    {/* <div className="text-center mt-4 mb-5" style={{ margin: 'auto' }}>
                        <p>----------Or----------</p>
                        <button onClick={googleSignIn} style={{ borderRadius: '10px', width: '30%', border: '1px solid gray' }}>
                            <span className="pe-2"><FontAwesomeIcon style={{ color: 'blue' }} icon={faGoogle} /> </span>
                            <span>Continue with Google</span>
                        </button>
                    </div> */}
                </div>
            </div>
        </div >
    );
};

export default Login;