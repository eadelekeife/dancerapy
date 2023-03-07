
import React, { useEffect, useState } from "react";

import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Controller, useForm } from 'react-hook-form';
import { Skeleton, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from '../../utils/axiosCall';
import VideoJS from './videoplayer';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Divider, Rate } from "antd";
import ReactPlayer from 'react-player/lazy';
import { Player, ControlBar } from 'video-react';
import { PaystackButton } from 'react-paystack';
import axiosCall from "../../utils/axiosCall";

import Empty from "../../assets/images/auth/empty.svg";
// import Testimonial from "../../assets/videos/testimonial.mp4";
import Footer from "../../utils/footer";
import Nav from "../../utils/nav";

import { connect } from "react-redux";
import AppRoute from "../../utils/routes";

const ProfileVideoToPlay = props => {

    const playerRef = React.useRef(null);
    const Navigate = useNavigate();
    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };
    const publicKey = "pk_test_6001cfe393365d476119a4e494f32bcb1290cfea"
    const [amount, setAmount] = useState(0); // Remember, set in kobo!
    const [userData] = useState(props.auth.isAuthenticated ? props.auth.userDetails : '');
    const [loaderSpinning, setLoaderSpinning] = useState(false);

    const [activePlan, setActivePlan] = useState(false);
    const [searchParams] = useSearchParams();
    const [productPlans, setProductPlans] = useState({});
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);

    // videos display
    const videoElement = React.useRef();


    const [userPlans, setUserPlans] = useState([]);
    const [loadingdata, setLoadingData] = useState(true);
    const [userActiveSubscription, setUserActiveSubscription] = useState(false);
    const [categoryBox, setCategoryBox] = useState([]);
    const [filter, setFilter] = useState('all');
    const [buttonDisplay, setButtonDisplay] = useState(false);

    useEffect(() => {
        let videoId = searchParams.get('videoId');
        setProductPlans({});
        setFetchingData(true);
        setButtonDisplay(false);
        setUserPlans([]);
        axiosCall.get(`/video/${videoId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(productPlans => {
                if (productPlans.data.statusMessage === "success") {
                    setErrorOccurred(false);
                    setFetchingData(false);
                    setProductPlans(productPlans.data.message.virtualClassLinks);
                } else {
                    setErrorOccurred(true);
                    setFetchingData(false);
                    openNotificationWithIcon('error', productPlans.data.summary);
                }
            })
            .catch(err => {
                setErrorOccurred(true);
                setFetchingData(false);
                openNotificationWithIcon('error', 'An error occurred while fetching product plans. Please reload page to try again')
            })
    }, [searchParams.get('videoId')])

    let skeleton = [];
    for (let i = 0; i < 6; i++) {
        skeleton.push(<Skeleton active />)
    }

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
    }, [searchParams.get('videoId')])
    for (let i = 0; i < 6; i++) {
        skeleton.push(<Skeleton active />)
    }

    const playVideo = () => {
        let video = videoElement.current;
        setButtonDisplay(true);
        video.play();
    }

    const pauseVideo = () => {
        let video = videoElement.current;
        setButtonDisplay(false);
        video.pause();
    }

    const fullScreenVideo = () => {
        let video = videoElement.current;
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    }

    return (
        <div>
            <Nav />
            {
                fetchingData ?
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
                        <div>
                            <div className="main_video plan_group">
                                <video
                                    ref={videoElement}
                                    src={productPlans.videoLink}
                                    playsInline loop />
                                <div className="hero_section_div">
                                    {
                                        !buttonDisplay ?
                                            <button onClick={() => playVideo()}>
                                                <ion-icon name="play-circle-outline"></ion-icon></button>
                                            : ''
                                    }
                                </div>
                                <div className="video-player-information">
                                    <div className="video-player-controls">
                                        <button onClick={() => playVideo()}>
                                            <ion-icon
                                                style={{ color: !buttonDisplay ? '#000' : 'grey' }}
                                                name="play-circle-outline"></ion-icon></button>
                                        <button onClick={() => pauseVideo()}>
                                            <ion-icon
                                                style={{ color: buttonDisplay ? '#000' : 'grey' }}
                                                name="pause-circle-outline"></ion-icon>
                                        </button>
                                        <button onClick={() => fullScreenVideo()}>
                                            <ion-icon name="expand-outline"></ion-icon>
                                        </button>
                                        <button onClick={() => fullScreenVideo()}>
                                            <ion-icon
                                                style={{ color: productPlans.description.length ? '#000' : 'grey' }}
                                                name="information-circle-outline"></ion-icon>
                                        </button>
                                    </div>
                                    <div>
                                        <p>{productPlans.title}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="detail_props trending_videos pt-3">
                                <div className="contain">
                                    <div className="profile-data-display">
                                        <h3 className="other_profile_title">Trending dance styles</h3>
                                        {/* <Divider style={{ margin: 0 }} /> */}
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
                                                            <div className="other-dance-styles plan_video_display">
                                                                <div className="grid_4">
                                                                    {
                                                                        userPlans.slice(0, 8).map((productPlans, index) => (
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
                                <div className="pt-4">

                                </div>
                            </div>
                        </div>
            }
            <Footer />
        </div>
    )
}

const mapStateToProps = store => {
    return { auth: store.auth }
}

export default connect(mapStateToProps)(ProfileVideoToPlay);