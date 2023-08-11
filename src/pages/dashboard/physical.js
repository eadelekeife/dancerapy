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

import ZoomLogo from "../../assets/images/content/zoom.jpg";
import ReferImage from "../../assets/images/a-company/refer.png";

import Empty from "../../assets/images/auth/empty.svg";
import _1 from "../../assets/images/content/_1.avif";
import _2 from "../../assets/images/content/_2.avif";
import axiosCall from "../../utils/axiosCall";
import ModalDisplay from "../../components/referral-modal";
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
                                        {
                                            loadingdata ?
                                                <div>
                                                    {skeleton.map((placeHolder, index) => (
                                                        <div className="item" key={index}>
                                                            {placeHolder}
                                                            <Divider />
                                                        </div>
                                                    ))}
                                                </div>
                                                :
                                                errorOccurred ?
                                                    <ErrorPageDisplay link={<button
                                                        onClick={() => Navigate(0)}
                                                        className="btn-red">Click here to reload page</button>} />
                                                    :
                                                    walletData.length ?
                                                        <div className="white-dash-data">
                                                            <h5 className="white-dash-title">Transaction History</h5>
                                                            <div>
                                                                <div className="desktop-only">
                                                                    <Table
                                                                        columns={columns}
                                                                        dataSource={data}
                                                                        bordered
                                                                        title={null}
                                                                        footer={null}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <div className="mobile-only">
                                                                        <div className="mt-5">
                                                                            {walletData.map((plan, index) => {
                                                                                return (
                                                                                    <Collapse defaultActiveKey={['1']} key={index}>
                                                                                        <Panel key={index + 1}
                                                                                            header={`${plan.productPlan?.title} purchased on ${DateTime.fromISO(plan?.createdAt).toLocaleString(DateTime.DATE_HUGE)}`}>
                                                                                            <ul className="transactionHistory">
                                                                                                <li>
                                                                                                    <span>Name:</span>
                                                                                                    <span>{plan.productPlan?.title}</span>
                                                                                                </li>
                                                                                                <li>
                                                                                                    <span>Date:</span>
                                                                                                    <span>{DateTime.fromISO(plan?.createdAt).toLocaleString(DateTime.DATE_HUGE)}</span>
                                                                                                </li>
                                                                                                <li>
                                                                                                    <span>Expiry Date:</span>
                                                                                                    {/* <span>{DateTime.fromFormat(plan?.expiryDate.split(' ')[0], 'yyyy-MM-dd').toLocaleString(DateTime.DATE_HUGE)}</span> */}
                                                                                                </li>
                                                                                                <li>
                                                                                                    <span>Transaction Id:</span>
                                                                                                    <span>{plan?.transactionId}</span>
                                                                                                </li>
                                                                                            </ul>
                                                                                        </Panel>
                                                                                    </Collapse>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="product-display empty_div_product mt-4">
                                                            <div>
                                                                <div className="empty_div_square">
                                                                </div>
                                                                <h4>No activity yet</h4>
                                                                <p>When you buy a video, your transaction history would appear here</p>
                                                                <Link to={AppRoute.profileVideos} className="btn-red">View All Videos</Link>
                                                            </div>
                                                        </div>
                                        }
                                    </div>
                                    <div>
                                        <div className="white-dash-data side">
                                            <ModalDisplay />
                                        </div>
                                        <div className="white-dash-data side">
                                            <div className="grid-2">
                                                <div>
                                                    <img src={ReferImage} alt="" />
                                                </div>
                                                <div>
                                                    <p>Earn extra income</p>
                                                    <h4>Invite a friend to Dancerapy and earn 0.25% on all their transactions</h4>
                                                </div>
                                            </div>
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