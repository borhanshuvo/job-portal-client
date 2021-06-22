import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './Service.css';

const Service = () => {
    const [services, setServices] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetch('https://salty-oasis-92410.herokuapp.com/serviceList')
            .then(res => res.json())
            .then(data => {
                setServices(data);
            })
    }, []);

    const serviceId = (id) => {
        history.push(`dashboard/book/${id}`);
    }

    const headingColor = { color: '#3A4256' };
    const textColor = { color: '#3A3056' };

    return (
        <div className="container pt-5 pb-5">
            <div className="row pt-5 pb-5">
                <h6 className="text-center pb-3" style={headingColor}>Select Any One Package</h6>
                {
                    services.map(service =>
                        <div key={service._id} className="col-md-4 pb-3">
                            <div className="card card-style">
                                <div className="card-body text-center style={{ height: '200px' }}">
                                    <h3 className="card-title text-uppercase pb-3" style={headingColor}>{service.type}</h3>
                                    <p className="card-text" style={textColor}>{service.time} Hours per month</p>
                                    <p style={textColor}>Price : <b>{service.price} Taka</b></p>
                                    <button className="btn btn-primary" onClick={() => serviceId(service._id)}>Book Now</button>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default Service;