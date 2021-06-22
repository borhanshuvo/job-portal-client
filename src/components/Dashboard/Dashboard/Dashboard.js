import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import MakeAdmin from '../Admin/MakeAdmin/MakeAdmin';
import Sidebar from '../Sidebar/Sidebar';
import AddService from '../Admin/AddService/AddService';
import { UserContext } from '../../../App';
import ManageService from '../Admin/ManageService/ManageService';
import Service from '../Service/Service';
import Booking from '../Employee/Booking/Booking';
import AddJobPost from '../Employee/AddJobPost/AddJobPost';
import JobPostList from '../Employee/JobPostList/JobPostList';
import JobList from '../Admin/JobList/JobList';
import ApplyJob from '../JobSeeker/ApplyJob/ApplyJob';
import ApplyJobList from '../JobSeeker/ApplyJobList/ApplyJobList';
import JobCandidate from '../Employee/JobCandidate/JobCandidate';

const Dashboard = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEmployee, setIsEmployee] = useState(false);
    const [isJobSeeker, setIsJobSeeker] = useState(false);
    const [isBookedUser, setIsBookedUser] = useState('none');

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
                    setIsBookedUser('none')
                }
                else {
                    setIsBookedUser('block')
                }
            })
    }, [loggedInUser.email]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    <Switch>

                        {isAdmin &&
                            <div>

                                <Route path="/dashboard/addService">
                                    <AddService />
                                </Route>

                                <Route path='/dashboard/addAdmin'>
                                    <MakeAdmin />
                                </Route>

                                <Route path="/dashboard/manageService">
                                    <ManageService />
                                </Route>

                                <Route path="/dashboard/jobList">
                                    <JobList />
                                </Route>

                            </div>
                        }
                        {isEmployee &&
                            <div>

                                <div style={{ display: isBookedUser }}>
                                    <Service />
                                </div>

                                <Route path="/dashboard/book/:id">
                                    <Booking />
                                </Route>

                                <Route path="/dashboard/addJobPost">
                                    <AddJobPost />
                                </Route>

                                <Route path="/dashboard/jobPostList">
                                    <JobPostList />
                                </Route>

                                <Route path="/dashboard/jobCandidate">
                                    <JobCandidate />
                                </Route>

                            </div>
                        }
                        {isJobSeeker &&
                            <div>

                                <Route path="/dashboard/applyJob/:id">
                                    <ApplyJob />
                                </Route>

                                <Route path="/dashboard/applyJobList">
                                    <ApplyJobList />
                                </Route>

                            </div>
                        }

                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;