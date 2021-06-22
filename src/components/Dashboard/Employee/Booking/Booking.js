import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../../App';
import Payment from '../Payment/Payment';

const Booking = () => {
    const { id } = useParams();
    const [service, setService] = useState({});
    const [bookingData, setbookingData] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [show, setShow] = useState('block');

    useEffect(() => {
        fetch(`https://salty-oasis-92410.herokuapp.com/service/${id}`)
            .then(res => res.json())
            .then(data => setService(data))
    }, [id]);

    const onSubmit = (data) => {
        data.name = loggedInUser.displayName;
        data.email = loggedInUser.email;
        data.type = service.type;
        data.price = service.price;
        data.time = service.time;
        setbookingData(data);
    }

    const handelPaymentSuccess = paymentId => {
        const email = loggedInUser.email;
        const bookingDetails = {
            email,
            bookingData,
            paymentId,
            orderTime: new Date()
        };

        fetch('https://salty-oasis-92410.herokuapp.com/addBooking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingDetails)
        })
            .then(res => res.json())
            .then(result => {
                if(result){
                    setShow('none');
                }
            })
    }

    const headingColor = { color: '#3A4256' };

    return (
        <div className="ps-4 pb-5">
            <div style={{ display: show }}>
                <div style={{ display: bookingData ? 'none' : 'block' }}>
                    <h4 className="pt-3 pb-5" style={headingColor}>Booking</h4>
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
                                    <label htmlFor="type" className="pb-2">Service Type</label>
                                    <input type="text" name="type" defaultValue={service.type} id="type" className="form-control" />
                                </div>

                                <div className="form-group pb-3">
                                    <label htmlFor="time" className="pb-2">Time</label>
                                    <input type="text" name="time" defaultValue={service.time} id="time" className="form-control" />
                                </div>

                                <div className="form-group pb-3">
                                    <label htmlFor="phone" className="pb-2">Phone Number</label>
                                    <input type="text" name="phone" placeholder="Phone Number" aria-invalid={errors.phone ? "true" : "false"} {...register('phone', { required: true })} id="phone" className="form-control" />
                                    {errors.phone && (<span role="alert" className="text-danger"> This field is required </span>)}
                                </div>

                                <div className="form-group pb-3 d-flex justify-content-between">
                                    <span>Your service charged will be {service.price} taka</span>
                                    <input type="submit" name="submit" className="btn btn-primary" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div style={{ display: bookingData ? 'block' : 'none' }}>
                    <h4 className="pt-3 pb-5" style={headingColor}>Payment</h4>
                    <div className="card" style={{ width: '95%' }}>
                        <div className="card-body">
                            <div className="form-group pb-3">
                                <label htmlFor="" className="pb-3">Payment</label>
                                <Payment handelPayment={handelPaymentSuccess}></Payment>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;