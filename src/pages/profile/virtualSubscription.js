import "./profile.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppRoute from "../../utils/routes";

import Footer from "../../components/footer";
import Nav from "../../components/nav";
import { Controller, useForm } from 'react-hook-form';
import { Input, Spin, Modal, Divider, Skeleton, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axiosCall from '../../utils/axiosCall';

import VideoPlans from "./product-plans";

// This imports the functional component from the previous sample.

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import SideNav from "./side_nav";

import ZoomLogo from "../../assets/images/content/zoom.jpg";
import Empty from "../../assets/images/auth/empty.svg";
import _1 from "../../assets/images/content/_1.avif";
import _2 from "../../assets/images/content/_2.avif";

const Profile = () => {

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

    useEffect(() => {
        axiosCall.get(`/user/virtual-plans`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(userPlans => {
                if (userPlans.data.statusMessage === "success") {
                    if (userPlans.data.message.activeSubscription) {
                        setLoadingData(false);
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
        <div className="profile-page">
            <div className="profile-content">
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
                                <h3 className="profile_title">Past Live Classes</h3>
                                <Divider style={{ margin: '0px 0px' }} />
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
                                                    <div>
                                                        {
                                                            userPlans.map((productPlans, index) => (
                                                                <div key={index}>
                                                                    <div className={`${index === 0 ? "mt-3" : ""}`}></div>
                                                                    <div className="training_group">
                                                                        <div className="training_inside_group">
                                                                            <div className="training_inside_img">
                                                                                <img src={ZoomLogo} alt="logo of zoom" />
                                                                            </div>
                                                                            <div className="training_inside_div">
                                                                                <p className="unimportant">Password: {productPlans.password}</p>
                                                                                <h4 className="plan_title">{productPlans.title}</h4>
                                                                                <ul className="physical_plans_list">
                                                                                    <li>&bull; Cardio</li>
                                                                                    <li>&bull; Flexibility</li>
                                                                                    <li>&bull; Muscle Toning</li>
                                                                                    <li>&bull; Interval Training</li>
                                                                                    <li>&bull; Muscle Memory</li>
                                                                                    <li>&bull; Mind and Body Coordination</li>
                                                                                </ul>
                                                                                {/* <ul className="physical_plans_list">
                                                                                    <li><ion-icon name="language-outline"></ion-icon> English</li>
                                                                                    <li><ion-icon name="heart-outline"></ion-icon> 0 reviews</li>
                                                                                    <li><ion-icon name="alarm-outline"></ion-icon> 1 hour</li>
                                                                                </ul> */}
                                                                            </div>
                                                                        </div>
                                                                        <div className="training_side_cover">
                                                                            <div>
                                                                                {/* <img src={Cart} alt="Cart" /> */}
                                                                            </div>
                                                                            <div>
                                                                                <a
                                                                                    href={productPlans.link}
                                                                                    target="_blank"
                                                                                    style={{
                                                                                        padding: '12px 25px', fontSize: '1.4rem',
                                                                                        textDecoration: 'none'
                                                                                    }}
                                                                                    className="btn-red">Take Class</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <Divider />
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    :
                                                    <div>
                                                        <div className="empty_div">
                                                            <div>
                                                                <img src={Empty} alt="empty" />
                                                                <p>There are no videos yet</p>
                                                                {/* <p>You have not placed any orders yet</p> */}
                                                                <Link to={AppRoute.products} className="btn-red">View Plans</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                :
                                                <div>
                                                    <div className="product-display empty_div">
                                                        <div>
                                                            <img src={Empty} alt="empty" />
                                                            <p>Oops! Your subscription may have expired. Kindly renew to recover access</p>
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
            </div>
            <Footer />
        </div >
    )
}

export default Profile;