import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const JobList = () => {
    const headingColor = { color: '#3A4256' };
    const { handleSubmit } = useForm();
    const [jobPosts, setJobPosts] = useState([]);
    const [loadData, setLoadData] = useState({});
    const [newStatus, setNewStatus] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/allJobPostList')
            .then(res => res.json())
            .then(data => {
                setJobPosts(data);
            });
    }, []);

    const handelLoadBooking = (id) => {
        fetch(`http://localhost:5000/jobPostDataById/${id}`)
            .then(res => res.json())
            .then(data => {
                setLoadData(data);
            });
    }

    const handelChange = (e) => {
        e.target.name = e.target.value;
        setNewStatus(e.target.name);
    }

    const onSubmit = (data) => {
        const id = loadData._id;
        const status = newStatus;
        const bookingStatus = { status };

        fetch(`http://localhost:5000/update/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingStatus)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    setLoadData({});
                }
            })

    }
    
    return (
        <div>
            {loadData.email &&
                <div className="ps-3">
                    <h4 className="pt-3 pb-5 ps-3" style={headingColor}>Edit Status</h4>
                    <div className="card" style={{ width: '95%' }}>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group pb-3">
                                    <label htmlFor="" className="pb-2">Status</label>
                                    <select name="status" className="form-control" onChange={handelChange}>
                                        <option className="form-control" value={loadData.status}>{loadData.status}</option>
                                        <option className="form-control" value="active">Active</option>
                                        <option className="form-control" value="in-active">In-Active</option>
                                    </select>
                                </div>

                                <div className="form-group pb-3">
                                    <input type="submit" name="submit" value="Save Changes" className="btn btn-primary" />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            }
            <div className="ps-3">
                <h4 className="pt-3 pb-5 ps-3" style={headingColor}>Job Post List</h4>
                <div className="container">
                    <div class="table-responsive">
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Employee Name</th>
                                    <th scope="col">Company Name</th>
                                    <th scope="col">Company Email</th>
                                    <th scope="col">Job Description</th>
                                    <th scope="col">Job Vacancy</th>
                                    <th scope="col">Job Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    jobPosts.map(jobPost => (
                                        <tr key={jobPost._id}>
                                            <td>{jobPost.displayName}</td>
                                            <td>{jobPost.companyName}</td>
                                            <td>{jobPost.companyEmail}</td>
                                            <td>{jobPost.description}</td>
                                            <td>{jobPost.vacancy}</td>
                                            <td>{jobPost.status}</td>
                                            <td><button style={{ border: 'none' }} onClick={() => handelLoadBooking(jobPost._id)}>EDIT</button></td>
                                        </tr>
                                    ))
                                }
                                {jobPosts.length === 0 &&
                                    <div>
                                        <h6 className="pt-5 text-center">Job Post List Empty</h6>
                                    </div>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobList;