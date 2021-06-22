import { faList, faPlus, faSignOutAlt, faTasks, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';

const Sidebar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEmployee, setIsEmployee] = useState(false);
    const [isJobSeeker, setIsJobSeeker] = useState(false);
    const [isBookedUser, setIsBookedUser] = useState('block');

    useEffect(() => {
        fetch('http://localhost:5000/isAdmin', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => setIsAdmin(data))
    }, [loggedInUser.email]);

    useEffect(() => {

        fetch('http://localhost:5000/isEmployee', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => setIsEmployee(data))
    }, [loggedInUser.email]);

    useEffect(() => {
        fetch('http://localhost:5000/isJobSeeker', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => setIsJobSeeker(data))
    }, [loggedInUser.email]);

    useEffect(() => {
        fetch('http://localhost:5000/isBookedUser?email=' + loggedInUser.email)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setIsBookedUser('block')
                }
                else {
                    setIsBookedUser('none')
                }
            })
    }, [loggedInUser.email]);

    const textColor = { color: '#3A3056' };

    return (
        <div className="container">
            <div className="pb-5">
                <Link className="nav-link text-uppercase fs-5 text-dark" to="/"><b>Job Portal</b></Link>
            </div>
            {isAdmin &&
                <div>
                    <Link style={textColor} className="nav-link" to="/dashboard/addService"><FontAwesomeIcon icon={faPlus} /> Add Service</Link>
                    <Link style={textColor} className="nav-link" to="/dashboard/manageService"><FontAwesomeIcon icon={faTasks} /> Manage Service</Link>
                    <Link style={textColor} className="nav-link" to="/dashboard/addAdmin"><FontAwesomeIcon icon={faUserPlus} /> Make Admin</Link>
                    <Link style={textColor} className="nav-link" to="/dashboard/jobList"><FontAwesomeIcon icon={faList} /> Job List</Link>
                    <span className="ps-2"><button style={{ border: 'none', backgroundColor: 'white' }} onClick={() => setLoggedInUser({})}><FontAwesomeIcon icon={faSignOutAlt} /><span className="ps-1">Logout</span></button></span>
                </div>
            }
            {isEmployee &&
                <div>
                    <div style={{ display: isBookedUser }}>
                        <Link style={textColor} className="nav-link" to="/dashboard/addJobPost"><FontAwesomeIcon icon={faPlus} /> Add Job Post</Link>
                        <Link style={textColor} className="nav-link" to="/dashboard/jobPostList"><FontAwesomeIcon icon={faList} /> Job Post List</Link>
                        <Link style={textColor} className="nav-link" to="/dashboard/jobCandidate"><FontAwesomeIcon icon={faList} /> Job Candidate</Link>
                    </div>
                    <span className="ps-2"><button style={{ border: 'none', backgroundColor: 'white' }} onClick={() => setLoggedInUser({})}><FontAwesomeIcon icon={faSignOutAlt} /><span className="ps-1">Logout</span></button></span>
                </div>
            }
            {isJobSeeker &&
                <div>
                    <Link style={textColor} className="nav-link" to="/dashboard/applyJobList"><FontAwesomeIcon icon={faList} /> Apply Job List</Link>
                    <span className="ps-2"><button style={{ border: 'none', backgroundColor: 'white' }} onClick={() => setLoggedInUser({})}><FontAwesomeIcon icon={faSignOutAlt} /><span className="ps-1">Logout</span></button></span>
                </div>
            }
        </div>
    );
};

export default Sidebar;