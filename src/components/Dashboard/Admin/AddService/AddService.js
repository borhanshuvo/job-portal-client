import React from 'react';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import toast from 'react-hot-toast';

const AddService = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data, e) => {
        const loading = toast.loading('Please wait...!');

        fetch('http://localhost:5000/addService', {
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
                    return swal("Service Added", "Service has been added successful.", "success");
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
        <div className="ps-3">
            <h4 className="ps-2 pt-3 pb-5" style={headingColor}>Add Service</h4>
            <div className="card" style={{ width: '95%' }}>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-group pb-3">
                            <label htmlFor="type" className="pb-2">Type</label>
                            <select name="type" id="type" {...register("type")} className="form-control">
                                <option value="premium">Premium</option>
                                <option value="standard">Standard</option>
                                <option value="basic">Basic</option>
                            </select>
                        </div>

                        <div className="form-group pb-3">
                            <label htmlFor="price" className="pb-2">Price</label>
                            <input type="text" name="price" placeholder="Price" aria-invalid={errors.price ? "true" : "false"} {...register('price', { required: true })} id="price" className="form-control" autoComplete="off" />
                            {errors.price && (<span role="alert" className="text-danger"> This field is required </span>)}
                        </div>

                        <div className="form-group pb-3">
                            <label htmlFor="time" className="pb-2">Time</label>
                            <select name="time" id="time" {...register("time")} className="form-control">
                                <option value="30">30</option>
                                <option value="20">20</option>
                                <option value="10">10</option>
                            </select>
                        </div>

                        <br />

                        <div className="form-group pb-3">
                            <input type="submit" name="Submit" className="btn btn-primary" />
                        </div>

                    </form>
                </div>
            </div>
        </div >
    );
};

export default AddService;