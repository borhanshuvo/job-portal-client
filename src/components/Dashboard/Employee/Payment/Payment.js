import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutFrom from './CheckoutFrom';
const stripePromise = loadStripe('pk_test_51IhB9yDp3FUTIRVR83UvR6Lpgka7doBXMATzhKyLejsX2BcLUh0YrbBXyqgjuYJgs5vsTEw0i9WExlzwPw6cGQfy006YNbCvqD');

const Payment = ({handelPayment}) => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutFrom handelPayment={handelPayment}></CheckoutFrom>
            </Elements>
        </div>
    );
};

export default Payment;