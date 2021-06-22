import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../App';

const JobPostList = () => {

    const headingColor = { color: '#3A4256' };
    const [posts, setPosts] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('https://salty-oasis-92410.herokuapp.com/jobPostList?email='+loggedInUser.email)
            .then(res => res.json())
            .then(data => setPosts(data))
    }, [loggedInUser.email]);

    return (
        <div className="ps-4">
            <h4 className="pt-3 pb-5 ps-2" style={headingColor}>Job Post List</h4>
            <div className="container">
                <div className="row">
                    {
                        posts.map(post =>
                            <div key={post._id} className="col-md-6 pb-3 ps-0">
                                <div className="card" style={{width: '60%'}}>
                                    <div className="card-header d-flex justify-content-between">
                                        <span style={{ padding: '5px' }}>Status</span>
                                        <span className="bg-primary text-white" style={{ padding: '5px' }}>{post.status}</span>
                                    </div>
                                    <div className="card-body text-center">
                                        <h5>{post.companyName}</h5>
                                        <small>{post.companyEmail}</small><br/>
                                        <small>Vacancy : {post.vacancy}</small><br />
                                        <small>{post.description}</small>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {posts.length === 0 &&
                        <div>
                            <h6 className="pt-5 text-center">You haven't booked any services yet.</h6>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default JobPostList;