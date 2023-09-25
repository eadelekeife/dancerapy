import "./dashboard.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Skeleton, notification, Table, Divider, Collapse, Tabs, Modal } from 'antd';
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

import PieChart from "../../components/piechart";
import ModalDisplay from "../../components/referral-modal";
import UserBalance from "../../components/balance-cover";
import Footer from "../../components/footer";
import { _fetch_all_user_video_views } from "../../utils/axiosroutes";

const VideoViewsAnalytics = props => {

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
    const [allVideoViews, setAllVideoViews] = useState([]);
    const [referralModal, setReferralModal] = useState(false);
    const [categoryViews, setCategoryViews] = useState([]);
    const [colorBox] = useState(['#F09468', '#599EEA', '#FAB70A', '#844FF6', '#0FB77A']);

    let fetchAllUserVideoViews = async () => {
        try {
            let videoViews = await _fetch_all_user_video_views();
            if (videoViews.data.statusMessage === "success") {
                setLoadingData(false);
                let videoCatData = [{}];
                const newArr = [];
                let catBox = [];
                videoViews.data.message.videoCat.forEach((category, index) => {
                    let obj = {
                        name: category.name,
                        value: 0,
                        color: colorBox[index]
                    }
                    catBox.push(obj);
                });

                videoViews.data.message.videoData.filter(videoViews => {
                    if (videoViews.half) {
                        newArr.push(videoViews);
                        catBox.forEach(category => {
                            if (videoViews.video.videoCategory.name === category.name) {
                                category.value += 1;
                            }
                        })
                    }
                })
                setCategoryViews(catBox);
                setAllVideoViews(newArr);
            } else {
                setLoadingData(false);
                openNotificationWithIcon('error', videoViews.data.summary);
            }
            setErrorOccurred(false);
        } catch (err) {
            console.log(err)
            setLoadingData(false);
            setErrorOccurred(false);
            openNotificationWithIcon('error', 'An error occurred while fetching all video views. Please reload page to try again.');
        }
    }

    useEffect(() => {
        // axiosCall.get(`/fetchuserproductplans/${userData.id}`)
        //     .then(userPlans => {
        //         if (userPlans.data.statusMessage === "success") {
        //             setLoadingData(false);
        //             setUserPlans(userPlans.data.message);
        //         } else {
        //             setLoadingData(false);
        //             setErrorOccurred(true);
        //             openNotificationWithIcon('error', userPlans.data.summary);
        //         }
        //     })
        //     .catch(err => {
        //         setErrorOccurred(true);
        //         setLoadingData(false)
        //     })
        fetchAllUserVideoViews();
    }, [])
    let skeleton = [];
    for (let i = 0; i < 6; i++) {
        skeleton.push(<Skeleton active />)
    }
    const viewsColumn = [
        {
            title: '',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Category',
            dataIndex: 'videoCategory',
        },
        {
            title: 'View Date',
            className: 'column-money',
            dataIndex: 'date',
        },
        {
            title: 'Time',
            dataIndex: 'time',
        },
    ];
    const viewsData = allVideoViews.map((video, index) => {
        return {
            key: index,
            id: <p>{index + 1}</p>,
            name: <p>{video?.video?.title}</p>,
            videoCategory: <p>{video?.video?.videoCategory?.name}</p>,
            date: <p>{DateTime.fromISO(video.createdAt).toLocaleString(DateTime.DATE_HUGE)}</p>,
            time: <p>{DateTime.fromISO(video.createdAt).toLocaleString(DateTime.TIME_WITH_SECONDS)}</p>,

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
                                                allVideoViews.length ?
                                                    <div>
                                                        <div>
                                                            <div className="white-dash-data side mobile-only">
                                                                <h5 className="white-dash-title">Category Views Estimate</h5>
                                                                <div className="grid-2 pie-block-cover">
                                                                    <PieChart categoryData={categoryViews} colorBox={colorBox} />
                                                                    <div>
                                                                        {
                                                                            categoryViews.map((cat, index) => (
                                                                                <div className="pie-block" key={index}>
                                                                                    <div
                                                                                        style={{ background: cat.color }}
                                                                                        className="pie-key red-bg"></div>
                                                                                    <p>{cat.name}</p>
                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="white-dash-data side">
                                                                <div className="desktop-only">
                                                                    <Table
                                                                        columns={viewsColumn}
                                                                        dataSource={viewsData}
                                                                        bordered
                                                                        title={null}
                                                                        footer={null}
                                                                    />
                                                                </div>
                                                                <div className="mobile-only">
                                                                    <div>
                                                                        {allVideoViews.map((video, index) => (
                                                                            <Collapse defaultActiveKey={[0]}>
                                                                                <Collapse.Panel showArrow={false} key={index} header={<p style={{ display: 'inline' }}>{video?.video?.title} watched
                                                                                    on {DateTime.fromISO(video.createdAt).toLocaleString(DateTime.DATE_HUGE)}</p>}>
                                                                                    <div>
                                                                                        <ul className="mobile-list-flex">
                                                                                            <li><span>Video Title:</span><span>{video?.video?.title}</span></li>
                                                                                            <li>
                                                                                                <span>Category:</span><span>{video?.video?.videoCategory?.name}</span>
                                                                                            </li>
                                                                                            <li><span>Date:</span><span>{DateTime.fromISO(video.createdAt).toLocaleString(DateTime.DATE_HUGE)}</span></li>
                                                                                            <li><span>Time:</span><span>{DateTime.fromISO(video.createdAt).toLocaleString(DateTime.TIME_WITH_SECONDS)}</span></li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </Collapse.Panel>
                                                                            </Collapse>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
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
                                                            <h4>No views yet</h4>
                                                            <p>When you buy a video and watch, your views history would appear here</p>
                                                            {/* <p>When you make a purchase, your spend transactions would appear here</p> */}
                                                            <Link to={AppRoute.profileVideos} className="btn-red">View All Videos</Link>
                                                        </div>
                                                    </div>
                                    }
                                </div>
                                <div>
                                    <div className="white-dash-data side">
                                        <ModalDisplay />
                                    </div>
                                    <div className="white-dash-data side desktop-only">
                                        <h5 className="white-dash-title">Category Views Estimate</h5>
                                        <div className="grid-2 pie-block-cover">
                                            <PieChart categoryData={categoryViews} colorBox={colorBox} />
                                            <div>
                                                {
                                                    categoryViews.map((cat, index) => (
                                                        <div className="pie-block" key={index}>
                                                            <div
                                                                style={{ background: cat.color }}
                                                                className="pie-key red-bg"></div>
                                                            <p>{cat.name}</p>
                                                        </div>
                                                    ))
                                                }
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
        </div >
    )
}

const mapStateToProps = state => {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(VideoViewsAnalytics);