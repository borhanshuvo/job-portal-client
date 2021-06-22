import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';
import Navbar from '../../Navbar/Navbar';

const Home = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [allJobPost, setAllJobPost] = useState([]);
    const active = 'active';
    const history = useHistory();

    useEffect(() => {
        fetch('http://localhost:5000/jobPostLists?status' + active)
            .then(res => res.json())
            .then(data => {
                setAllJobPost(data);
            });
    }, []);

    const applyId = (id) => {
        const url = `dashboard/applyJob/${id}`;
        history.push(url);
    }

    return (
        <div>
            <Navbar />
            {loggedInUser.email &&
                <div className="container pt-5 mt-5">
                    <div className="row">
                        {
                            allJobPost.map(post =>
                                <div className="col-md-12 pb-5">
                                    <div className="card">
                                        <div className="card-body text-center">
                                            <h4 className="card-title">{post.companyName}</h4>
                                            <p className="card-text">Company Email : {post.companyEmail}</p>
                                            <p className="card-text">Job Description : {post.description}</p>
                                            <p className="card-text">Vacancy : {post.vacancy}</p>
                                        </div>
                                        <div className="card-footer text-center">
                                            <button className="btn btn-primary" onClick={() => applyId(post._id)}>Apply Now</button>
                                        </div>
                                    </div>
                                </div>
                                )
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default Home;