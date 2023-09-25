import "./dashboard.css";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Skeleton, notification, Table, Divider, Collapse, Spin, Tabs } from 'antd';
import AppRoute from "../../utils/routes";
import { DateTime } from 'luxon';
import { LoadingOutlined } from '@ant-design/icons';
import NumberFormat from 'react-number-format';

import VideoPlans from "../profile/product-plans";

import TopNav from "./top-bar";
import SideBar from "./side-bar";

import ZoomLogo from "../../assets/images/content/zoom.jpg";
import ReferImage from "../../assets/images/a-company/refer.png";
import ErrorImg from "../../assets/images/illustrations/18_sad_emoji.png";

import EmptyTransactions from "../../assets/images/illustrations/14_rhombus.png";

import Empty from "../../assets/images/auth/empty.svg";
import _1 from "../../assets/images/content/_1.avif";
import _2 from "../../assets/images/content/_2.avif";
import axiosCall from "../../utils/axiosCall";
import ModalDisplay from "../../components/referral-modal";
import UserBalance from "../../components/balance-cover";
import Footer from "../../components/footer";
import { _fetch_user_subscription_history, _fetch_user_wallet_transactions } from "../../utils/axiosroutes";
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
    const [subscriptionHistory, setSubscriptionHistory] = useState([]);

    const fetchUserWalletPurchase = async () => {
        try {
            let userPurchase = await _fetch_user_wallet_transactions();
            if (userPurchase.data.statusMessage === "success") {
                let completedTransactions = [];
                userPurchase.data.message.filter(transactions => {
                    if (transactions.status === "completed") {
                        completedTransactions.push(transactions);
                    }
                })
                setLoadingData(false);
                setWalletData(completedTransactions);
            } else {
                setErrorOccurred(true);
                setLoadingData(false);
                openNotificationWithIcon('error', 'An error occurred while fetching wallet data. Please try again');
            }
        } catch (err) {
            setErrorOccurred(true);
            setLoadingData(false);
            openNotificationWithIcon('error', 'An error occurred while fetching wallet data. Please try again');
        }
    }

    const fetchUserSubscriptionHistory = async () => {
        try {
            let userPurchase = await _fetch_user_subscription_history();
            if (userPurchase.data.statusMessage === "success") {
                let completedTransactions = [];
                userPurchase.data.message.filter(transactions => {
                    if (transactions.status === "completed") {
                        completedTransactions.push(transactions);
                    }
                })
                setLoadingData(false);
                setSubscriptionHistory(completedTransactions);
            } else {
                setErrorOccurred(true);
                setLoadingData(false);
                openNotificationWithIcon('error', 'An error occurred while fetching wallet data. Please try again');
            }
        } catch (err) {
            setErrorOccurred(true);
            setLoadingData(false);
            openNotificationWithIcon('error', 'An error occurred while fetching wallet data. Please try again');
        }
    }

    useEffect(() => {
        fetchUserWalletPurchase();
        fetchUserSubscriptionHistory();
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
            title: 'Ref',
            dataIndex: 'name',
        },
        {
            title: 'Purchase Date',
            className: 'column-money',
            dataIndex: 'date'
        },
        {
            title: 'Status',
            className: 'column-money',
            dataIndex: 'status'
        },
        // {
        //     title: 'Wallet Type',
        //     className: 'column-money',
        //     dataIndex: 'walletType',
        //     align: 'center'
        // },
        {
            title: 'Amount',
            dataIndex: 'amount',
            align: 'right'
        },
        {
            title: 'Wallet Balance',
            className: 'column-money',
            dataIndex: 'walletBalance',
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
            walletBalance: <p><span className="currency">NGN</span><NumberFormat value={(+plan?.walletBalance).toFixed(2)} displayType="text" thousandSeparator={true} /></p>,
            status: <p className={`record ${plan.type === "credit" ? 'bg-primary' : 'bg-danger'}`}>{plan?.type}</p>,
            walletType: <p>{plan?.walletType}</p>,
            amount: <p><span className="currency">NGN</span><NumberFormat value={(+plan?.amount).toFixed(2)} displayType="text" thousandSeparator={true} /></p>,
            date: <p>{DateTime.fromISO(plan?.createdAt).toLocaleString(DateTime.DATE_HUGE)}</p>,
            transactionId: <p>{plan?.inHouseTransactionKey}</p>
        }
    });

    const subscriptionColumns = [
        {
            title: '',
            dataIndex: 'id',
        },
        {
            title: 'Subscription Date',
            className: 'column-money',
            dataIndex: 'date'
        },
        {
            title: 'Expiration Date',
            className: 'column-money',
            dataIndex: 'expirationDate'
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            align: 'right'
        },
        {
            title: 'Payment Method',
            className: 'column-money',
            dataIndex: 'method',
        },
        {
            title: 'Transaction Id',
            dataIndex: 'transactionId',
        },
    ];
    const subscriptionData = subscriptionHistory.map((plan, index) => {
        return {
            key: index,
            id: <p>{index + 1}</p>,
            walletBalance: <p><span className="currency">NGN</span><NumberFormat value={(+plan?.walletBalance).toFixed(2)} displayType="text" thousandSeparator={true} /></p>,
            status: <p className={`record ${plan.type === "credit" ? 'bg-primary' : 'bg-danger'}`}>{plan?.type}</p>,
            method: <p>{plan?.method}</p>,
            amount: <p><span className="currency">NGN</span><NumberFormat value={(+plan?.amount).toFixed(2)} displayType="text" thousandSeparator={true} /></p>,
            expirationDate: <p>{DateTime.fromISO(plan?.expiryDate.split(' ')[0]).toLocaleString(DateTime.DATE_HUGE)}</p>,
            date: <p>{DateTime.fromISO(plan?.createdAt).toLocaleString(DateTime.DATE_HUGE)}</p>,
            transactionId: <p>{plan?.transactionId}</p>
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
                    <div className={`dash-main-div ${errorOccurred ? 'error' : ''}`}>
                        <div className="contain">
                            {
                                errorOccurred ?
                                    <div>
                                        <div className="error-card">
                                            <div>
                                                <img src={ErrorImg} alt="error image" />
                                                <h3>Something went wrong</h3>
                                                <p>An error occurred while loading transaction history. Please reload page to
                                                    try again.</p>
                                            </div>
                                            <Divider style={{ margin: 0 }} />
                                            <button onClick={() => Navigate(0)}>Reload Page</button>
                                        </div>
                                    </div>
                                    :
                                    <div className="dash-main-content">
                                        <div className="white-dash-grid">
                                            <div>
                                                <div className="white-dash-data">
                                                    <UserBalance />
                                                </div>
                                            </div>
                                            <div className="desktop-only">
                                                <div className="white-dash-data side">
                                                    <ModalDisplay />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="white-dash-data">
                                            <Tabs type="card">
                                                <Tabs.TabPane tab="Transaction History" key="1">
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
                                                            walletData.length ?
                                                                <div className="white-dash-datas">
                                                                    <h5 className="white-dash-title"></h5>
                                                                    <div className="trans-history">
                                                                        <div className="desktop-only">
                                                                            <Table
                                                                                columns={columns}
                                                                                dataSource={data}
                                                                                bordered
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
                                                                                                    header={<p><span className="currency">NGN</span>
                                                                                                        <NumberFormat value={(+plan?.amount).toFixed(2)} displayType="text" thousandSeparator={true} /> {plan.type === "credit" ? 'credited' : 'debited'} on {DateTime.fromISO(plan?.createdAt).toLocaleString(DateTime.DATE_HUGE)}</p>}>
                                                                                                    <ul className="transactionHistory">
                                                                                                        <li>
                                                                                                            <span>Ref:</span>
                                                                                                            <span>{plan.ref}</span>
                                                                                                        </li>
                                                                                                        <li>
                                                                                                            <span>Date:</span>
                                                                                                            <span>{DateTime.fromISO(plan?.createdAt).toLocaleString(DateTime.DATE_HUGE)}</span>
                                                                                                        </li>
                                                                                                        <li>
                                                                                                            <span>Status:</span>
                                                                                                            <span><p className={plan.type === "credit" ? 'bg-primary' : 'bg-danger'}>{plan?.type}</p></span>
                                                                                                        </li>
                                                                                                        <li>
                                                                                                            <span>Transaction Id:</span>
                                                                                                            <span>{plan?.inHouseTransactionKey}</span>
                                                                                                        </li>
                                                                                                        <li>
                                                                                                            <span>Wallet type:</span>
                                                                                                            <span>{plan?.walletType}</span>
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
                                                                <div className="white-dash-datad mt-5">
                                                                    <div className="emptyTrans">
                                                                        <img src={EmptyTransactions} alt="empty transaction bar" />
                                                                        <h4>No Transactions Yet!</h4>
                                                                        <p>There are no records in the transaction history currently. When
                                                                            you fund your wallet or buy a video, the
                                                                            transactions will be displayed in this section.</p>
                                                                        <Link to={AppRoute.profileVideos} className="btn-red">View All Videos</Link>
                                                                    </div>
                                                                </div>
                                                    }
                                                </Tabs.TabPane>
                                                <Tabs.TabPane tab="Subscription History" key="2">
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
                                                            subscriptionHistory.length ?
                                                                <div className="white-dash-datas">
                                                                    <h5 className="white-dash-title"></h5>
                                                                    <div className="trans-history">
                                                                        <div className="desktop-only">
                                                                            <Table
                                                                                columns={subscriptionColumns}
                                                                                dataSource={subscriptionData}
                                                                                bordered
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
                                                                                                    header={<p><span className="currency">NGN</span>
                                                                                                        <NumberFormat value={(+plan?.amount).toFixed(2)} displayType="text" thousandSeparator={true} /> {plan.type === "credit" ? 'credited' : 'debited'} on {DateTime.fromISO(plan?.createdAt).toLocaleString(DateTime.DATE_HUGE)}</p>}>
                                                                                                    <ul className="transactionHistory">
                                                                                                        <li>
                                                                                                            <span>Ref:</span>
                                                                                                            <span>{plan.ref}</span>
                                                                                                        </li>
                                                                                                        <li>
                                                                                                            <span>Date:</span>
                                                                                                            <span>{DateTime.fromISO(plan?.createdAt).toLocaleString(DateTime.DATE_HUGE)}</span>
                                                                                                        </li>
                                                                                                        <li>
                                                                                                            <span>Status:</span>
                                                                                                            <span><p className={plan.type === "credit" ? 'bg-primary' : 'bg-danger'}>{plan?.type}</p></span>
                                                                                                        </li>
                                                                                                        <li>
                                                                                                            <span>Transaction Id:</span>
                                                                                                            <span>{plan?.inHouseTransactionKey}</span>
                                                                                                        </li>
                                                                                                        <li>
                                                                                                            <span>Wallet type:</span>
                                                                                                            <span>{plan?.walletType}</span>
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
                                                                <div className="white-dash-datad mt-5">
                                                                    <div className="emptyTrans">
                                                                        <img src={EmptyTransactions} alt="empty transaction bar" />
                                                                        <h4>No Transactions Yet!</h4>
                                                                        <p>There are no records in the transaction history currently. When
                                                                            you subscribe to a plan, the
                                                                            transactions will be displayed in this section.</p>
                                                                        <Link to={AppRoute.profileVideos} className="btn-red">View All Videos</Link>
                                                                    </div>
                                                                </div>
                                                    }
                                                </Tabs.TabPane>
                                            </Tabs>
                                        </div>
                                        <div className="mt_5"></div>
                                    </div>
                            }
                            <div className="mobile-only">
                                <div className="white-dash-data side">
                                    <ModalDisplay />
                                </div>
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