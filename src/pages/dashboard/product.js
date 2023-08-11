import "./dashboard.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Skeleton, notification, Table, Divider, Collapse } from 'antd';
import AppRoute from "../../utils/routes";
import { DateTime } from 'luxon';

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


const VideosPage = props => {

    const { Panel } = Collapse;
    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };
    const [userPlans, setUserPlans] = useState([]);
    const [loadingdata, setLoadingData] = useState(true);
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [userData] = useState(props.auth.isAuthenticated ? props.auth.userDetails : '');

    useEffect(() => {
        axiosCall.get(`/fetchuserproductplans/${userData.id}`)
            .then(userPlans => {
                if (userPlans.data.statusMessage === "success") {
                    setLoadingData(false);
                    setUserPlans(userPlans.data.message);
                } else {
                    setLoadingData(false);
                    setErrorOccurred(true);
                    openNotificationWithIcon('error', userPlans.data.summary);
                }
            })
            .catch(err => {
                setErrorOccurred(true);
                setLoadingData(false)
            })
    }, [])
    let skeleton = [];
    for (let i = 0; i < 6; i++) {
        skeleton.push(<Skeleton active />)
    }
    const columns = [
        {
            title: '',
            dataIndex: 'id',
        },
        // {
        //     title: 'Name',
        //     dataIndex: 'name',
        // },
        {
            title: 'Purchase Date',
            className: 'column-money',
            dataIndex: 'date',
            // align: 'right',
        },
        {
            title: 'Expiry Date',
            dataIndex: 'expiry',
        },
        {
            title: 'Transaction Id',
            dataIndex: 'transactionId',
        },
    ];
    const data = userPlans.map((plan, index) => {
        return {
            key: index,
            id: <p>{index + 1}</p>,
            name: <p>{plan.productPlan.title}</p>,
            date: <p>{DateTime.fromISO(plan.createdAt).toLocaleString(DateTime.DATE_HUGE)}</p>,
            // expiry: <p>DateTime.fromFormat(plan.expiryDate).toLocaleString(DateTime.DATE_HUGE)</p>,
            expiry: <p>{DateTime.fromFormat(plan.expiryDate.split(' ')[0], 'yyyy-MM-dd').toLocaleString(DateTime.DATE_HUGE)}</p>,
            transactionId: <p>{plan.transactionId}</p>
        }
    });
    return (
        <div>
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
                                                <div className="center_align_message">
                                                    <div>
                                                        <h3>Oops!</h3>
                                                        <p>An error occurred while we were trying to fetch data. Please reload page to
                                                            try again.</p>
                                                    </div>
                                                </div>
                                                :
                                                userPlans.length ?
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
                                                                    {userPlans.map((plan, index) => {
                                                                        return (
                                                                            <Collapse defaultActiveKey={['1']} key={index}>
                                                                                <Panel key={index + 1}
                                                                                    header={`${plan.productPlan.title} purchased on ${DateTime.fromISO(plan.createdAt).toLocaleString(DateTime.DATE_HUGE)}`}>
                                                                                    <ul className="transactionHistory">
                                                                                        <li>
                                                                                            <span>Name:</span>
                                                                                            <span>{plan.productPlan.title}</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span>Date:</span>
                                                                                            <span>{DateTime.fromISO(plan.createdAt).toLocaleString(DateTime.DATE_HUGE)}</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span>Expiry Date:</span>
                                                                                            <span>{DateTime.fromFormat(plan.expiryDate.split(' ')[0], 'yyyy-MM-dd').toLocaleString(DateTime.DATE_HUGE)}</span>
                                                                                        </li>
                                                                                        <li>
                                                                                            <span>Transaction Id:</span>
                                                                                            <span>{plan.transactionId}</span>
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
                                                    :
                                                    <div className="product-display empty_div_product mt-4">
                                                        <div>
                                                            <div className="empty_div_square">

                                                            </div>
                                                            <h4>No spend activities yet</h4>
                                                            <p>When you make a purchase, your spend transactions would appear here</p>
                                                            <Link to={AppRoute.merch} className="btn-red">View Merchandise</Link>
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
        </div>
    )
}

const mapStateToProps = state => {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(VideosPage);