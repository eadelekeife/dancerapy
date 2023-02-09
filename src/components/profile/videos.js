import "./profile.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Skeleton, notification, Table, Divider } from 'antd';
import AppRoute from "../../utils/routes";
import Footer from "../../utils/footer";
import { DateTime } from 'luxon';
import Nav from "../../utils/nav";

import SideNav from "./side_nav";

import Empty from "../../assets/images/auth/empty.svg";
import _1 from "../../assets/images/content/_1.avif";
import _2 from "../../assets/images/content/_2.avif";
import axiosCall from "../../utils/axiosCall";

const VirtualSubcriptions = props => {
    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };
    const [userPlans, setUserPlans] = useState([]);
    const [loadingdata, setLoadingData] = useState(true);
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [userActiveSubscription, setUserActiveSubscription] = useState(false);
    const [categoryBox, setCategoryBox] = useState([]);
    const [userData] = useState(props.auth.isAuthenticated ? props.auth.userDetails : '');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        if (localStorage.getItem('purchaseSuccessful')) {
            openNotificationWithIcon('success', 'Transaction completed successfully. Please check your mail for further information');
            localStorage.removeItem('purchaseSuccessful');
        }
        axiosCall.get(`/user/online-subscription`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(userPlans => {
                if (userPlans.data.statusMessage === "success") {
                    if (userPlans.data.message.activeSubscription) {
                        setLoadingData(false);
                        let categoryBox = [];
                        userPlans.data.message.virtualClassLinks.map(category => {
                            if (!categoryBox.includes(category.videoCategory.name)) {
                                categoryBox.push(category.videoCategory.name);
                            }
                        })
                        setCategoryBox(categoryBox);
                        setUserPlans(userPlans.data.message.virtualClassLinks);
                        setUserActiveSubscription(true);
                    } else {
                        setLoadingData(false);
                        setUserActiveSubscription(false);
                    }
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
    return (
        <div>
            <Nav />
            <div className="profile_div main_info">
                <div className="profile_to_left">
                    <div className="profile_nav">
                        <SideNav />
                    </div>
                </div>
                <div className="profile_to_right">
                    <div className="contain">
                        <div className="profile-data-display">
                            <h3 className="profile_title">Your Videos</h3>
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
                                        userActiveSubscription ?
                                            userPlans.length ?
                                                <div className="plan_video_display">
                                                    <div className="categoryDisplay">
                                                        <div
                                                            onClick={() => setFilter('all')}
                                                            className="">
                                                            <p className={`tag ${filter === 'all' ? 'active' : ''}`}>All</p>
                                                        </div>
                                                        {
                                                            categoryBox.map((category, index) => (
                                                                <div key={index}>
                                                                    <div
                                                                        onClick={() => setFilter(category)}
                                                                        className="">
                                                                        <p
                                                                            className={`tag ${filter === category ? 'active' : ''}`}>{category}</p>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    <div className="grid_3">
                                                        {
                                                            filter === "all" ?
                                                                userPlans.map((productPlans, index) => (
                                                                    <div key={index}>
                                                                        <Link to={`${AppRoute.profileVideoToPlay}?videoName=${productPlans.title}&videoId=${productPlans.id}`}>
                                                                            <div className="">
                                                                                <div className="video-poster">
                                                                                    <img src={productPlans.poster} alt={productPlans.name} />
                                                                                    <h4>{productPlans.title}</h4>
                                                                                </div>
                                                                                <div className="inline_video_flex">
                                                                                    <p>{productPlans.videoCategory.name}</p>
                                                                                    <p>{productPlans.videoLength}mins</p>
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                ))
                                                                :
                                                                userPlans.map((productPlans, index) => (
                                                                    filter === productPlans.videoCategory.name ?
                                                                        <div key={index}>
                                                                            <Link to={`${AppRoute.profileVideoToPlay}?videoName=${productPlans.title}&videoId=${productPlans.id}`}>
                                                                                <div className="">
                                                                                    <img src={productPlans.poster} alt={productPlans.name} />
                                                                                    <h4>{productPlans.title}</h4>
                                                                                    <div className="inline_video_flex">
                                                                                        <p>{productPlans.videoCategory.name}</p>
                                                                                        <p>{productPlans.videoLength}mins</p>
                                                                                    </div>
                                                                                </div>
                                                                            </Link>
                                                                        </div> : ''
                                                                ))
                                                        }
                                                    </div>
                                                </div>
                                                :
                                                <div>
                                                    <div className="empty_div">
                                                        <div>
                                                            <img src={Empty} alt="empty" />
                                                            <p>There are no videos yet</p>
                                                            {/* <p>You have not placed any orders yet</p> */}
                                                            <Link to={AppRoute.products} className="btn_red">View Plans</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            :
                                            <div>
                                                <div className="empty_div">
                                                    <div>
                                                        <img src={Empty} alt="empty" />
                                                        <p>Oops! Your subscription may have expired. Kindly renew to recover access</p>
                                                        {/* <p>You have not placed any orders yet</p> */}
                                                        <Link to={AppRoute.products} className="btn_red">View Plans</Link>
                                                    </div>
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

export default connect(mapStateToProps)(VirtualSubcriptions);