import "./dashboard.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import OwlCarousel from 'react-owl-carousel';
import { Skeleton, notification, Input, Divider, Modal, Table, Drawer, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import AppRoute from "../../utils/routes";
import Footer from "../../components/footer";
import { DateTime } from 'luxon';
import { Controller, useForm } from "react-hook-form";
import VideoPlans from "../profile/product-plans";

import TopNav from "./top-bar";
import SideBar from "./side-bar";

import Empty from "../../assets/images/auth/empty.svg";
import _1 from "../../assets/images/content/_1.avif";
import _2 from "../../assets/images/content/_2.avif";
import ArrowLeft from "../../assets/images/arrow-left.svg";
import ModalDisplay from "../../components/referral-modal";
import ReferImage from "../../assets/images/a-company/refer.png";
import axiosCall from "../../utils/axiosCall";

import LockImage from "../../assets/images/illustrations/Lock.png";
import Image1 from "../../assets/images/product/_1.png";
import Image2 from "../../assets/images/product/_2.png";

import Dash1 from "../../assets/images/illustrations/1_circle.png";
import Dash2 from "../../assets/images/illustrations/12_jug.png";
import Dash3 from "../../assets/images/illustrations/14_rhombus.png";
import Dash4 from "../../assets/images/illustrations/17_soap.png";
import { _add_video_to_cart, _buy_single_video, _buy_single_video_with_tokens, _fetch_app_videos } from "../../utils/axiosroutes";
import UserBalance from "../../components/balance-cover";
import AllAppRoutes from "../../utils/routes";

const VideosPage = props => {

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };

    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;

    const { handleSubmit, control, setValue } = useForm({});
    const [currentNav, setCurrentNav] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchVideoDisplay, setSearchVideoDisplay] = useState(false);
    const [searchedVideos, setSearchedVideo] = useState([]);
    const [loadingSearchButton, setLoadingSearchButton] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    const [userPlans, setUserPlans] = useState([]);
    const [loadingdata, setLoadingData] = useState(true);
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [userActiveSubscription, setUserActiveSubscription] = useState(false);
    const [categoryBox, setCategoryBox] = useState([]);
    const [userData] = useState(props.auth.isAuthenticated ? props.auth.userDetails : '');
    const [filter, setFilter] = useState('all');
    const [videoBox, setVideoBox] = useState([]);
    const [openVideoPurchaseModal, setOpenVideoPurchaseModal] = useState(false);
    const [currentVideo, setCurrentVideo] = useState({});
    const [trendVideos, setTrendVideos] = useState([]);
    const [fitnessVideos, setFitnessVideos] = useState([]);
    const [trendingVideos, setTrendingVideos] = useState([]);

    const fetchUserVideosData = async () => {
        try {
            let videoTempData = await _fetch_app_videos();
            if (videoTempData.data.statusMessage === "success") {
                setVideoBox(videoTempData.data.message);
                let trends = [];
                let fitness = [];
                videoTempData.data.message.forEach(video => {
                    if (video.videoCategory.name === "Dance Trends") {
                        trends.push(video);
                    } else {
                        fitness.push(video);
                    }
                })
                // let currRating = 0;
                // let topRated = '';
                // videoTempData.data.message.forEach(video => {
                //     if (+video.counter > +currRating) {
                //         currRating = video.counter;
                //         topRated = video;
                //     }
                // })
                // console.log(topRated);
                // trendingVideos
                // setTrendingVideos();
                setTrendVideos(trends);
                setFitnessVideos(fitness);
                setLoadingData(false);
            } else {
                setLoadingData(false);
                setErrorOccurred(true);
                openNotificationWithIcon('error', userPlans.data.summary);
            }
        } catch (err) {
            setErrorOccurred(true);
            setLoadingData(false);
            openNotificationWithIcon('error', 'An error occurred while fetching data. Please reload to try again');
        }
    }

    const responsive = {
        0: {
            items: 1,
            nav: false,
            margin: 10,
            stagePadding: 50,
            loop: true
        },
        600: {
            items: 3,
            nav: false,
            margin: 20,
            stagePadding: 50,
            loop: true
        },
        1000: {
            items: 4,
            nav: false,
            margin: 10,
            stagePadding: 20,
            loop: true
        }
    }

    const completeVideoPurchaseWithWalletBalance = async () => {
        let videoPurchaseData = {
            videoId: currentVideo._id,
            couponDiscount: 0
        }
        try {
            let videoPurchase = await _buy_single_video(videoPurchaseData);
            if (videoPurchase.data.statusMessage === "success") {
                console.log(videoPurchase)
            } else {
                openNotificationWithIcon('error', videoPurchase.data.summary);
            }
        } catch (err) {
            openNotificationWithIcon('error', 'An error occurred while completing order. Please reload to try again');
        }
    }

    const completeVideoPurchaseWithTokens = async () => {
        let videoPurchaseData = {
            videoId: currentVideo._id,
            couponDiscount: 0
        }
        try {
            let videoPurchase = await _buy_single_video_with_tokens(videoPurchaseData);
            if (videoPurchase.data.statusMessage === "success") {
                console.log(videoPurchase)
            } else {
                openNotificationWithIcon('error', videoPurchase.data.summary);
            }
        } catch (err) {
            openNotificationWithIcon('error', 'An error occurred while completing order. Please reload to try again');
        }
    }

    const addVideoToCart = async () => {
        try {
            let videoCart = await _add_video_to_cart({ videoId: currentVideo._id });
            if (videoCart.data.statusMessage === "success") {
                console.log('yo', videoCart.data.message.length)
                localStorage.setItem('cartQuantity', videoCart.data.message.length);
                openNotificationWithIcon('success', 'Video added to cart successfully');
            } else {
                openNotificationWithIcon('error', videoCart.data.summary);
            }
        } catch (err) {
            openNotificationWithIcon('error', 'An error occurred while adding product to cart. Please reload page to try again.');
        }
    }

    const updateCurrentVideo = e => {
        setCurrentVideo(e);
        setOpenVideoPurchaseModal(true);
    }

    useEffect(() => {
        if (localStorage.getItem('purchaseSuccessful')) {
            openNotificationWithIcon('success', 'Transaction completed successfully. Please check your mail for further information');
            localStorage.removeItem('purchaseSuccessful');
        }
        fetchUserVideosData()
    }, [])
    let skeleton = [];
    for (let i = 0; i < 6; i++) {
        skeleton.push(<Skeleton active />)
    }

    // search video
    const findVideoByName = (e) => {
        setLoadingSearchButton(true);
        let newVideoBox = userPlans.filter(video => {
            if (video.title.toLowerCase().includes(e.videoName.toLowerCase())) {
                return video;
            }
        });
        setSearchedVideo(newVideoBox);
        setTimeout(() => {
            setSearchVideoDisplay(true);
            setLoadingSearchButton(false);
            setSearchKey(e.videoName);
            setValue('videoName', '');
        }, 2000)
    }

    const goBacktoMainVideos = () => {
        setSearchKey('');
        setSearchVideoDisplay(false);
        setSearchedVideo([]);
    }

    return (
        <div>
            <div className="dashboard-profile">
                <TopNav pageTitle="Your Videos" />
                <div className="dash-side-bar">
                    <SideBar />
                </div>
                <div className="dash-main-div">
                    <div className="contain">
                        <div className="dash-main-content">
                            {/* <div className="tag-block">
                                <button className="tab active">All</button>
                                <button className="tab">Dance Trends</button>
                                <button className="tab">10 Mins Dance Blast</button>
                                <button className="tab">Dancerapy Choreographies</button>
                            </div> */}
                            <div>
                                <h4 className="page-tile">Dance Trend Videos</h4>
                                <div>
                                    {
                                        trendVideos.length ?
                                            <OwlCarousel className="owl-theme" lazyLoad={true}
                                                responsive={responsive} autoPlay={true}
                                                responsiveClass={true} loop={true} margin={10} nav>
                                                {
                                                    trendVideos.map((productPlans, index) => (
                                                        <div className="card-display" key={index}>
                                                            <Link to={`/profile/video/play/${productPlans._id}/${productPlans.title}`}>
                                                                <div class='item'>
                                                                    <img src={productPlans.poster} alt={productPlans.title} />
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    ))}
                                            </OwlCarousel>
                                            : ''
                                    }
                                </div>
                            </div>
                            <div className="mt_4">
                                <h4 className="page-tile">Fitness Videos</h4>
                                <div className="grid-4">
                                    {
                                        fitnessVideos.map((productPlans, index) => (
                                            <div className="card-display" key={index}>
                                                <Link to={`/profile/video/play/${productPlans._id}/${productPlans.title}`}>
                                                    <div>
                                                        <div className="card-header">
                                                            <img src={productPlans.poster} alt={productPlans.name} />
                                                            <div className="card-header-fee">
                                                                <div className="card-header-cover">
                                                                    <ion-icon name="lock-closed-outline"></ion-icon>
                                                                </div>
                                                            </div>
                                                            <div className="card-overlay">
                                                            </div>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="card-body-header">
                                                                <p>{productPlans?.videoCategory?.name}</p>
                                                                <p>{productPlans.videoLength}</p>
                                                            </div>
                                                            <div className="card-body-title-cover">
                                                                <h4 className="card-body-title">{productPlans.title}</h4>
                                                            </div>
                                                            <div className="card-body-footer noMargin={true}">
                                                                <p>{productPlans.instructorName}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="mt_5"></div>
                        </div>
                    </div>
                </div>
                <div className="mobile-only">
                    <Footer noMargin={true} />
                </div>
            </div>
            <Modal open={openVideoPurchaseModal} footer={null} onCancel={() => setOpenVideoPurchaseModal(false)}>
                <div className="referral-story">
                    <div className="center-div">
                        <div>
                            <div>
                                <img src={LockImage} alt="locked video" />
                            </div>
                            <h3>Payment Required</h3>
                            <p>This is a paid video. Invite a friend to Dancerapy and earn 0.25% on all their transactions</p>
                            <div className="btn-grid">
                                <button
                                    onClick={() => completeVideoPurchaseWithTokens()}
                                    className="btn-red">Buy with Tokens</button>
                                <button
                                    onClick={() => completeVideoPurchaseWithWalletBalance()}
                                    className="btn-red">Buy with Wallet Balance</button>
                                <button
                                    onClick={() => addVideoToCart()}
                                    className="btn-red">Add to Cart</button>
                                <Link to={`/profile/video/play/${currentVideo._id}/${currentVideo.title}`}
                                    // onClick={() => addVideoToCart()}
                                    className="btn-red">Play Video</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(VideosPage);