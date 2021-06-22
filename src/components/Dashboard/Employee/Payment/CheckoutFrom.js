import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutFrom = ({ handelPayment }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(null);

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setPaymentError(error.message);
            setPaymentSuccess(null);
        }
        else {
            setPaymentSuccess(paymentMethod.id);
            setPaymentError(null);
            handelPayment(paymentMethod.id);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <div className="pt-3 d-flex justify-content-end">
                    <button className="btn btn-success" style={{padding: '10px 30px'}} type="submit" disabled={!stripe}>Pay</button>
                </div>
            </form>
            {
                paymentError && <p>{paymentError}</p>
            }
            {
                paymentSuccess && <p>Your Payment Successful</p>
            }
        </div>
    );
};

export default CheckoutFrom;