import "./profile.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Skeleton, notification, Table, Divider, Collapse } from 'antd';
import AppRoute from "../../utils/routes";
import Footer from "../../components/footer";
import Nav from "../../components/nav";
import { DateTime } from 'luxon';

import VideoPlans from "./product-plans";

import SideNav from "./side_nav";

import Empty from "../../assets/images/auth/empty.svg";
import _1 from "../../assets/images/content/_1.avif";
import _2 from "../../assets/images/content/_2.avif";
import axiosCall from "../../utils/axiosCall";

const Profile = props => {
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
            // render: (text) => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            // render: (text) => <a>{text}</a>,
        },
        {
            title: 'Puchase Date',
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
            <Nav />
            <div className="profile_div main_info">
                <div className="profile_to_left">
                    <div className="">
                        <div className="profile_nav">
                            <SideNav />
                        </div>
                    </div>
                </div>
                <div className="profile_to_right">
                    <div className="contain">
                        <div className="profile-data-display">
                            <h3 className="profile_title">Product Orders</h3>
                            <Divider style={{ margin: '10px 0px' }} />
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
                                            <div>
                                                <div className="product-display empty_div">
                                                    <div>
                                                        <img src={Empty} alt="empty" />
                                                        <p>You have not placed any orders yet</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <VideoPlans />
                                                </div>
                                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

const mapStateToProps = store => {
    return { auth: store.auth }
}

export default connect(mapStateToProps)(Profile);