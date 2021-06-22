import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../App';

const JobCandidate = () => {
    const [candidates, setCandidates] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:5000/jobCandidate?email=' + loggedInUser.email)
            .then(res => res.json())
            .then(data => setCandidates(data))
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
                                <th scope="col">Candidate Name</th>
                                <th scope="col">Candidate Email</th>
                                <th scope="col">Candidate Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                candidates.map(candidate => (
                                    <tr key={candidate._id}>
                                        <td>{candidate.displayName}</td>
                                        <td>{candidate.email}</td>
                                        <td>{candidate.phone}</td>
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

export default JobCandidate;