import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../../App';
import swal from 'sweetalert';
import toast from 'react-hot-toast';

const AddJobPost = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const onSubmit = (data, e) => {
        data.displayName = loggedInUser.displayName;
        data.email = loggedInUser.email;
        data.status = 'in-active'
        const loading = toast.loading('Please wait...!');

        fetch('https://job-portal-015.herokuapp.com/addJobPost', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    e.target.reset();
                    return swal("Post Added", "Post has been added successful.", "success");
                }
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
            .catch(error => {
                toast.dismiss(loading);
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
    }

    const headingColor = { color: '#3A4256' };

    return (
        <div className="pb-5">
            <h4 className="pt-3 pb-3" style={headingColor}>Add Job Post</h4>
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
                            <input type="text" name="companyName" placeholder="Company Name" aria-invalid={errors.companyName ? "true" : "false"} {...register('companyName', { required: true })} id="companyName" className="form-control" autoComplete="off" />
                            {errors.companyName && (<span role="alert" className="text-danger"> Company Name required </span>)}
                        </div>

                        <div className="form-group pb-3">
                            <label htmlFor="companyEmail" className="pb-2">Company Email</label>
                            <input type="email" name="companyEmail" placeholder="e.g example@example.com" aria-invalid={errors.companyEmail ? "true" : "false"} {...register('companyEmail', { required: true })} id="companyEmail" className="form-control" autoComplete="off" />
                            {errors.companyEmail && (<span role="alert" className="text-danger">Company Email required </span>)}
                        </div>

                        <div className="form-group pb-3">
                            <label htmlFor="vacancy" className="pb-2">Vacancy Number</label>
                            <input type="text" name="vacancy" placeholder="Vacancy Number" aria-invalid={errors.vacancy ? "true" : "false"} {...register('vacancy', { required: true })} id="vacancy" className="form-control" autoComplete="off" />
                            {errors.vacancy && (<span role="alert" className="text-danger"> Vacancy Number Required </span>)}
                        </div>

                        <div className="form-group pb-3">
                            <label htmlFor="description" className="pb-2">Job Description</label>
                            <input type="text" name="description" placeholder="Job Description" aria-invalid={errors.description ? "true" : "false"} {...register('description', { required: true })} id="description" className="form-control" autoComplete="off" />
                            {errors.description && (<span role="alert" className="text-danger"> Job Description Required </span>)}
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

export default AddJobPost;