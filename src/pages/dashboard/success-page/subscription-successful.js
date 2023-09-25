import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import NumberFormat from 'react-number-format';
import { DateTime } from 'luxon';

import TopBar from "../top-bar";
import Footer from "../../../components/footer";
import AllAppRoutes from "../../../utils/routes";

const SubscriptionSuccess = () => {
    const [subscriptionTitle] = useState(localStorage.getItem('subscriptionDurationTitle'));
    const [subscriptionAmount] = useState(localStorage.getItem('subscriptionAmount'));
    const [subExpiryDate] = useState(DateTime.now().plus({ months: localStorage.getItem('subscriptionDuration') }).toFormat('MMMM dd, yyyy'));
    
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!localStorage.getItem('subscriptionDurationTitle') && !localStorage.getItem('subscriptionDuration')) {
            navigate(AllAppRoutes.profile);
        } else {
            localStorage.removeItem('subscriptionDurationTitle');
            localStorage.removeItem('subscriptionDuration');
            localStorage.removeItem('subscriptionAmount');
        }
    }, [])
    return (
        <div>
            <TopBar />
            <div className="grey-bg dashboard">
                <div className="grey-center">
                    <div className="sucess-gif"></div>
                    <h2>Subscription Successful</h2>
                    <p>Your <span className="currency">NGN</span><NumberFormat thousandSeparator={true}
                        prefix={''} displayType="text" className="numeric" value={(+subscriptionAmount).toFixed(2)} /> {subscriptionTitle} has been activated successfully and it will expire
                        on {subExpiryDate}.</p>
                    <p>Invite a friend to Dancerapy and get free <span className="currency">NGN</span>300.00 in
                        your wallet to resubscribe at the end of your current subscription.</p>
                    <Link to={AllAppRoutes.profileTransactionHistory}>View Transaction History</Link>
                </div>
            </div>
            <Footer noMargin={true} />
        </div>
    )
}

export default SubscriptionSuccess;