import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../../App';

const ApplyJob = () => {
    const { id } = useParams();
    const [job, setJob] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch(`http://localhost:5000/jobApply/${id}`)
            .then(res => res.json())
            .then(data => setJob(data))
    }, [id]);

    const onSubmit = (data, e) => {
        data.displayName = loggedInUser.displayName;
        data.email = loggedInUser.email;
        data.companyName = job.companyName;
        data.companyEmail = job.companyEmail;
        data.employeeEmail = job.email;

        fetch('http://localhost:5000/addApplyJobPost', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if(result){
                    e.target.reset();
                }
            })
    }
    const headingColor = { color: '#3A4256' };

    return (
        <div className="ps-4 pb-5">

            <h4 className="pt-3 pb-5" style={headingColor}>Job Apply</h4>
            <div className="card" style={{ width: '95%' }}>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-group pb-3">
                            <label htmlFor="displayName" className="pb-2">Name</label>
                            <input type="text" name="displayName" defaultValue={loggedInUser.displayName} id="displayName" className="form-control" />
                        </div>

                        <div className="form-group pb-3">
                            <label htmlFor="email" className="pb-2">Email</label>
                            <input type="email" name="email" defaultValue={loggedInUser.email} id="email" className="form-control" />
                        </div>

                        <div className="form-group pb-3">
                            <label htmlFor="companyName" className="pb-2">Company Name</label>
                            <input type="text" name="companyName" defaultValue={job.companyName} className="form-control" />
                        </div>

                        <div className="form-group pb-3">
                            <label htmlFor="companyEmail" className="pb-2">Company Email</label>
                            <input type="email" name="companyEmail" defaultValue={job.companyEmail} className="form-control" />
                        </div>

                        <div className="form-group pb-3">
                            <label htmlFor="phone" className="pb-2">Phone Number</label>
                            <input type="text" name="phone" placeholder="Phone Number" aria-invalid={errors.phone ? "true" : "false"} {...register('phone', { required: true })} id="phone" className="form-control" />
                            {errors.phone && (<span role="alert" className="text-danger"> This field is required </span>)}
                        </div>

                        <br />

                        <div className="form-group pb-3">
                            <input type="submit" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApplyJob;