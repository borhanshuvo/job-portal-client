import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../App';

const ApplyJobList = () => {
    const [lists, setLists] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:5000/applyJobPostList?email=' + loggedInUser.email)
            .then(res => res.json())
            .then(data => setLists(data))
    }, [loggedInUser.email]);

    const headingColor = { color: '#3A4256' };

    return (
        <div className="ps4">
            <h4 className="pt-3 pb-4 ps-2" style={headingColor}>Job List</h4>
            <div className="container">
                <div className="table-responsive">
                    <table className="table text-center table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">Company Name</th>
                                <th scope="col">Company Email</th>
                                <th scope="col">Manager Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lists.map(list => (
                                    <tr key={list._id}>
                                        <td>{list.companyName}</td>
                                        <td>{list.companyEmail}</td>
                                        <td>{list.employeeEmail}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ApplyJobList;