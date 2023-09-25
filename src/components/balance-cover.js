import React, { useEffect, useState } from "react";

import { notification } from "antd";

import { Link } from "react-router-dom";
import AllAppRoutes from "../utils/routes";
import { _fetch_user_wallet } from "../utils/axiosroutes";

const UserBalance = () => {
    const [userWalletData, setUserWalletData] = useState({});
    const [loadingWalletData, setLoadingWalletData] = useState(true);

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };
    const fetchUserWalletBalance = async e => {
        try {
            let userWallet = await _fetch_user_wallet();
            if (userWallet.data.statusMessage === "success") {
                setUserWalletData(userWallet.data.message);
                setLoadingWalletData(false);
            } else {
                openNotificationWithIcon('error', 'An error occurred while fetching wallet data. Please try again');
            }
        } catch (err) {
            console.log(err)
            openNotificationWithIcon('error', 'An error occurred while fetching wallet data. Please try again');
        }
    }

    useEffect(() => {
        fetchUserWalletBalance();
    }, [])

    return (
        <div>
            <h5 className="white-dash-title">Available balance</h5>
            <h2 className="balance-display"><span>NGN </span>{!loadingWalletData ? ((+userWalletData?.balance)?.toFixed(2).split('.')[0]) : '-'}.<span>{userWalletData?.balance ? ((+userWalletData?.balance)?.toFixed(2).split('.')[1]) : '00'}</span></h2>
            <p className="white-dash-desc">This is a total of all the assets you have in your portfolio</p>
            <Link className="btn-default" to={AllAppRoutes.videoViewsAnalytics}>View Transaction History</Link>
        </div>
    )
}
export default UserBalance;