import "./dashboard.css";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Skeleton, notification, Table, Divider, Collapse, Spin } from 'antd';
import AppRoute from "../../utils/routes";
import { DateTime } from 'luxon';
import { LoadingOutlined } from '@ant-design/icons';

import VideoPlans from "../profile/product-plans";

import TopNav from "./top-bar";
import SideBar from "./side-bar";

import EmptyTransactions from "../../assets/images/illustrations/14_rhombus.png";

import Empty from "../../assets/images/auth/empty.svg";
import _1 from "../../assets/images/content/_1.avif";
import _2 from "../../assets/images/content/_2.avif";
import axiosCall from "../../utils/axiosCall";
import ModalDisplay from "../../components/referral-modal";
import TokensModal from "../../components/tokens-modal";
import UserBalance from "../../components/balance-cover";
import Footer from "../../components/footer";
import { _fetch_user_wallet_transactions } from "../../utils/axiosroutes";
import ErrorPageDisplay from "../../components/error";


const VideosPage = props => {

    const { Panel } = Collapse;
    const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;
    const Navigate = useNavigate();

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };
    const [loadingdata, setLoadingData] = useState(true);
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [userData] = useState(props.auth.isAuthenticated ? props.auth.userDetails : '');
    const [walletData, setWalletData] = useState([]);

    const fetchUserWalletPurchase = async () => {
        try {
            let userPurchase = await _fetch_user_wallet_transactions();
            if (userPurchase.data.statusMessage === "success") {
                console.log(userPurchase);
                setWalletData(userPurchase.data.message);
                setLoadingData(false);
            } else {
                setLoadingData(false);
                openNotificationWithIcon('error', 'An error occurred while fetching wallet data. Please try again');
            }
        } catch (err) {
            setLoadingData(false);
            openNotificationWithIcon('error', 'An error occurred while fetching wallet data. Please try again');
        }
    }

    useEffect(() => {
        fetchUserWalletPurchase();
    }, [])
    let skeleton = [];
    for (let i = 0; i < 2; i++) {
        skeleton.push(<Skeleton active />)
    }
    const columns = [
        {
            title: '',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Purchase Date',
            className: 'column-money',
            dataIndex: 'date'
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            align: 'right'
        },
        {
            title: 'Transaction Id',
            dataIndex: 'transactionId',
        },
    ];
    const data = walletData.map((plan, index) => {
        return {
            key: index,
            id: <p>{index + 1}</p>,
            name: <p>{plan?.ref}</p>,
            amount: <p><span className="currency">NGN</span>{(+plan?.amount).toFixed(2)}</p>,
            date: <p>{DateTime.fromISO(plan?.createdAt).toLocaleString(DateTime.DATE_HUGE)}</p>,
            transactionId: <p>{plan?.inHouseTransactionKey}</p>
        }
    });
    return (
        <div>
            <Spin indicator={antIcon} spinning={loadingdata}>
                <div className="dashboard-profile">
                    <TopNav pageTitle="Your Product Orders" />
                    <div className="dash-side-bar">
                        <SideBar />
                    </div>
                    <div className="dash-main-div">
                        <div className="contain">
                            <div className="dash-main-content">
                                <div className="white-dash-grid">
                                    <div>
                                        <div className="white-dash-data">
                                            <UserBalance />
                                        </div>
                                        <div className="white-dash-data">
                                            <div className="emptyTrans">
                                                <img src={EmptyTransactions} alt="empty transaction bar" />
                                                <h4>No Transactions Yet!</h4>
                                                <p>There are no records in the transaction history currently. When you
                                                    make a purchase, the spending transactions will be
                                                    displayed in this section.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="desktop-onl">
                                        <div className="white-dash-data side">
                                            <ModalDisplay />
                                        </div>
                                        <div className="white-dash-data side desktop-only">
                                            <TokensModal />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt_5"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mobile-only">
                    <Footer noMargin={true} />
                </div>
            </Spin >
        </div >
    )
}

const mapStateToProps = state => {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(VideosPage);