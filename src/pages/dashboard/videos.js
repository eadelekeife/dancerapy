import "./dashboard.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Skeleton, notification, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Footer from "../../components/footer";

import TopNav from "./top-bar";
import SideBar from "./side-bar";

import _1 from "../../assets/images/content/_1.avif";
import _2 from "../../assets/images/content/_2.avif";

import { ReactComponent as ArrowRight } from "../../assets/images/arrow-right.svg";
import { ReactComponent as ArrowLeft } from "../../assets/images/arrow-left-circle.svg";

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';

import LockImage from "../../assets/images/illustrations/Lock.png";

import { _add_video_to_cart, _buy_single_video, _buy_single_video_with_tokens, _check_user_access, _fetch_app_videos } from "../../utils/axiosroutes";


export const SwiperButtonNext = ({ children }) => {
    const swiper = useSwiper();
    return <button className="carousel-controller" onClick={() => swiper.slideNext()}>{children}</button>;
};

export const SwiperButtonPrev = ({ children }) => {
    const swiper = useSwiper();
    return <button className="carousel-controller" onClick={() => swiper.slidePrev()}>{children}</button>;
};

const VideosPage = props => {

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };


    const [searchVideoDisplay, setSearchVideoDisplay] = useState(false);
    const [searchedVideos, setSearchedVideo] = useState([]);
    const [loadingSearchButton, setLoadingSearchButton] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    const [userPlans, setUserPlans] = useState([]);
    const [loadingdata, setLoadingData] = useState(true);
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [userData] = useState(props.auth.isAuthenticated ? props.auth.userDetails : '');
    const [filter, setFilter] = useState('all');
    const [videoBox, setVideoBox] = useState([]);
    const [openVideoPurchaseModal, setOpenVideoPurchaseModal] = useState(false);
    const [currentVideo, setCurrentVideo] = useState({});
    const [trendVideos, setTrendVideos] = useState([]);
    const [fitnessVideos, setFitnessVideos] = useState([]);
    const [activeSub, setActveSub] = useState(false);
    const [loadingVideos, setLoadingVideos] = useState(true);

    const breakpoints = {
        0: {
            slidesPerView: 2.1
        },
        600: {
            slidesPerView: 4.2
        },
        1000: {
            slidesPerView: 5.2
        }
    }

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
                setLoadingVideos(false);
            } else {
                setErrorOccurred(true);
                openNotificationWithIcon('error', userPlans.data.summary);
            }
        } catch (err) {
            setErrorOccurred(true);
            openNotificationWithIcon('error', 'An error occurred while fetching data. Please reload to try again');
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

    const checkUserAccess = async () => {
        try {
            let userPlans = await _check_user_access();
            if (userPlans.data.statusMessage === "success") {
                setActveSub(userPlans.data.message);
            } else {
                setLoadingVideos(false);
                openNotificationWithIcon('error', userPlans.data.summary);
            }
        } catch (err) {
            setLoadingVideos(false);
            openNotificationWithIcon('error', 'An error occurred while checking user subscription history. Please reload to try again');
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
        fetchUserVideosData();
        checkUserAccess();
    }, [])
    let skeleton = [];
    for (let i = 0; i < 16; i++) {
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
            // setValue('videoName', '');
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
                            {
                                !loadingVideos ?
                                    <div>
                                        <div>
                                            {
                                                trendVideos.length ?
                                                    <div className="carousel-cover">
                                                        <h4 className="page-tile">Dance Trend Videos</h4>
                                                        <>
                                                            <Swiper
                                                                spaceBetween={5} slidesPerView={4.2} centeredSlides={true}
                                                                loop={true} breakpoints={breakpoints}>
                                                                <div className="new-swiper-box">
                                                                    <SwiperButtonPrev><ArrowLeft /></SwiperButtonPrev>
                                                                    <SwiperButtonNext><ArrowRight /></SwiperButtonNext>
                                                                </div>
                                                                {trendVideos.map((productPlans, index) => (
                                                                    <SwiperSlide key={index}>
                                                                        <div className={`card-display ${index}`} key={index} style={{ position: "relative" }}>
                                                                            <Link to={`/profile/video/play/${productPlans._id}/${productPlans.title}`}>
                                                                                <div className='item'>
                                                                                    <img src={productPlans.poster} alt={productPlans.title} />
                                                                                    {
                                                                                        productPlans?.amount !== 0 ?
                                                                                            <div className="card-header-fee">
                                                                                                <div className="card-header-cover">
                                                                                                    {
                                                                                                        activeSub ?
                                                                                                            <ion-icon name="lock-open-outline"></ion-icon>
                                                                                                            :
                                                                                                            <ion-icon name="lock-closed-outline"></ion-icon>
                                                                                                    }
                                                                                                </div>
                                                                                            </div>
                                                                                            : ''
                                                                                    }
                                                                                </div>
                                                                            </Link>
                                                                        </div>
                                                                    </SwiperSlide>
                                                                ))}
                                                            </Swiper>
                                                        </>
                                                    </div>
                                                    : ''
                                            }
                                        </div>
                                        <div className="mt_5">
                                            <>
                                                <h4 className="page-tile">Fitness Videos</h4>
                                                <div className="grid-4">
                                                    {
                                                        fitnessVideos.map((productPlans, index) => (
                                                            <div key={index}>
                                                                <Link to={props.auth.isAuthenticated ?
                                                                    `/profile/video/play/${productPlans._id}/${productPlans.title}` : `/signin?auth_redirect=/profile/video/play/${productPlans._id}/${productPlans.title}`}>
                                                                    <div
                                                                        onClick={e => updateCurrentVideo(productPlans)}>
                                                                        <div className="">
                                                                            <div className="card-display">
                                                                                <div className="card-header">
                                                                                    <img src={productPlans.poster} alt={productPlans.name} />
                                                                                    {
                                                                                        productPlans?.amount !== 0 ?
                                                                                            <div className="card-header-fee">
                                                                                                <div className="card-header-cover">
                                                                                                    {
                                                                                                        activeSub ?
                                                                                                            <ion-icon name="lock-open-outline"></ion-icon>
                                                                                                            :
                                                                                                            <ion-icon name="lock-closed-outline"></ion-icon>
                                                                                                    }
                                                                                                    {/* <ion-icon name="lock-closed-outline"></ion-icon> */}
                                                                                                </div>
                                                                                            </div>
                                                                                            : ''
                                                                                    }
                                                                                    <div className="card-overlay">
                                                                                    </div>
                                                                                </div>
                                                                                <div className="card-body">
                                                                                    <div className="card-body-header">
                                                                                        <p>{productPlans?.videoCategory?.name}</p>
                                                                                        <p className="desktop-only">{productPlans.videoLength}</p>
                                                                                    </div>
                                                                                    <div className="card-body-title-cover">
                                                                                        <h4 className="card-body-title">{productPlans.title}</h4>
                                                                                    </div>
                                                                                    <div className="card-body-footer noMargin={true}">
                                                                                        <p>{productPlans.instructorName}</p>
                                                                                        <p className="mobile-only">{productPlans.videoLength}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </>
                                        </div>
                                    </div>
                                    :
                                    <div className="grid-4">
                                        {
                                            skeleton.map((skeletonCheck, index) => (
                                                <div key={index}>
                                                    {skeletonCheck}
                                                </div>
                                            ))
                                        }
                                    </div>
                            }
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