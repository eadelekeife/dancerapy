import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import TopBar from "../top-bar";
import Footer from "../../../components/footer";
import AllAppRoutes from "../../../utils/routes";

const FundWalletSuccess = () => {
    const [topupAmount] = useState(localStorage.getItem('topupAmount'));
    const [userWalletBalance] = useState(localStorage.getItem('userWalletBalance'));
    useEffect(() => {
        localStorage.removeItem('topupAmount');
        localStorage.removeItem('userWalletBalance');
    }, [])
    return (
        <div>
            <TopBar />
            <div className="grey-bg dashboard">
                <div className="grey-center">
                    <div className="sucess-gif"></div>
                    <h2>Fund Wallet Successful</h2>
                    {/* <h4>Top-Up Successful</h4> */}
                    <p>Your top-up of <span className="currency">NGN</span>{topupAmount} was
                        successful and your new wallet balance is <span className="currency">NGN</span>{userWalletBalance}. Invite a friend to
                        Dancerapy and earn 0.25% on all their transactions. This is a total of all the
                        assets you have in your portfolio</p>
                    <Link to={AllAppRoutes.profileTransactionHistory}>View Transaction History</Link>
                </div>
            </div>
            <Footer noMargin={true} />
        </div>
    )
}

export default FundWalletSuccess;