
import React, { useEffect, useState } from "react";

import { useSearchParams, useNavigate, Link, useParams } from "react-router-dom";
import { Skeleton, notification, Popover, Modal, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from '../../utils/axiosCall';
// import VideoJS from './videoplayer';
// import videojs from 'video.js';
import VideoJS from '../../components/main-video-player';
import 'video.js/dist/video-js.css';

import { Divider, Rate } from "antd";

import Image1 from "../../assets/images/product/_1.png";
import Image2 from "../../assets/images/product/_2.png";

import LockImage from "../../assets/images/illustrations/Lock.png";
import Empty from "../../assets/images/auth/empty.svg";
import Footer from "../../components/footer";
import Nav from "../../components/nav";

import { connect } from "react-redux";
import AppRoute from "../../utils/routes";
import { _add_video_to_cart, _buy_single_video, _buy_single_video_with_tokens, _find_video_by_id, _update_video_data, _update_video_full_data, _update_video_half_data } from "../../utils/axiosroutes";
import AllAppRoutes from "../../utils/routes";

const ProfileVideoToPlay = props => {

    const playerRef = React.useRef(null);
    const videoControlRef = React.useRef(null);
    const Navigate = useNavigate();
    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };
    const [amount, setAmount] = useState(0); // Remember, set in kobo!
    const [userData] = useState(props.auth.isAuthenticated ? props.auth.userDetails : '');
    const [loaderSpinning, setLoaderSpinning] = useState(false);

    const [activePlan, setActivePlan] = useState(false);
    // const [searchParams} = useParams();
    const { videoId } = useParams();
    const [videoData, setVideoData] = useState({});
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
    const [minRandomFilter, setMinRandomFilter] = useState(0);
    const [videoPurchased, setVideoPurchased] = useState(false);
    const [openVideoPurchaseModal, setOpenVideoPurchaseModal] = useState(false);
    const [loadingPayment, setLoadingPayment] = useState(false);
    // const [viewsId, setViewsId] = useState(0);
    // const [halfUpdated, setHalfUpdated] = useState(false);
    // const [startUpdated, setStartUpdated] = useState(false);
    const [currentPlay, setCurrentPlay] = useState(0)

    let findUserVideo = async videoId => {
        setVideoData({});
        setFetchingData(true);
        setButtonDisplay(false);
        setUserPlans([]);
        try {
            let videoData = await _find_video_by_id(videoId);
            if (videoData.data.statusMessage === "success") {
                setErrorOccurred(false);
                setFetchingData(false);
                setVideoPurchased(videoData.data.message.videoPurchased);
                setVideoData(videoData.data.message.videoData);
                let categoryLength = videoData.data.message.videoData.videoCategory?.videos.length;
                let minRandom = Math.trunc(Math.random() * (categoryLength - 4));
                setMinRandomFilter(minRandom);
                if (!videoData.data.message.videoPurchased) setOpenVideoPurchaseModal(true);
            } else {
                setErrorOccurred(true);
                setFetchingData(false);
                openNotificationWithIcon('error', videoData.data.summary);
            }
        } catch (err) {
            console.log(err)
            setErrorOccurred(true);
            setFetchingData(false);
            openNotificationWithIcon('error', 'An error occurred while fetching product plans. Please reload page to try again')
        }
    }
    useEffect(() => {
        localStorage.setItem('videoViewsNum', 0);
        findUserVideo(videoId);
    }, [videoId])


    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            src: videoData?.videoLink,
            type: 'video/mp4'
        }]
    };


    const handlePlayerReady = (player) => {
        playerRef.current = player;
    };

    const completeVideoPurchaseWithWalletBalance = async () => {
        setLoadingPayment(true);
        let videoPurchaseData = {
            videoId: videoData._id,
            couponDiscount: 0
        }
        try {
            let videoPurchase = await _buy_single_video(videoPurchaseData);
            if (videoPurchase.data.statusMessage === "success") {
                Navigate(AllAppRoutes.profileVideoPurchaseSuccess);
            } else {
                openNotificationWithIcon('error', videoPurchase.data.summary);
            }
            setLoadingPayment(false);
        } catch (err) {
            openNotificationWithIcon('error', 'An error occurred while completing order. Please reload to try again');
            setLoadingPayment(false);
        }
    }

    const completeVideoPurchaseWithTokens = async () => {
        setLoadingPayment(true);
        let videoPurchaseData = {
            videoId: videoData._id,
            couponDiscount: 0
        }
        try {
            let videoPurchase = await _buy_single_video_with_tokens(videoPurchaseData);
            if (videoPurchase.data.statusMessage === "success") {
                Navigate(AllAppRoutes.profileVideoPurchaseSuccess);
            } else {
                openNotificationWithIcon('error', videoPurchase.data.summary);
            }
            setLoadingPayment(false);
        } catch (err) {
            setLoadingPayment(false);
            openNotificationWithIcon('error', 'An error occurred while completing order. Please reload to try again');
        }
    }

    const addVideoToCart = async () => {
        setLoadingPayment(true);
        try {
            let videoCart = await _add_video_to_cart({ videoId: videoData._id });
            if (videoCart.data.statusMessage === "success") {
                console.log('yo', videoCart.data.message.length)
                localStorage.setItem('cartQuantity', videoCart.data.message.length);
                openNotificationWithIcon('success', 'Video added to cart successfully');
            } else {
                openNotificationWithIcon('error', videoCart.data.summary);
            }
            setLoadingPayment(false);
        } catch (err) {
            openNotificationWithIcon('error', 'An error occurred while adding product to cart. Please reload page to try again.');
            setLoadingPayment(false);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('purchaseSuccessful')) {
            openNotificationWithIcon('success', 'Transaction completed successfully. Please check your mail for further information');
            localStorage.removeItem('purchaseSuccessful');
        }
        // axiosCall.get(`/user/online-subscription`, {
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem('token')}`
        //     }
        // })
        //     .then(userPlans => {
        //         if (userPlans.data.statusMessage === "success") {
        //             if (userPlans.data.message.activeSubscription) {
        //                 setLoadingData(false);
        //                 let categoryBox = [];
        //                 userPlans.data.message.virtualClassLinks.map(category => {
        //                     if (!categoryBox.includes(category.videoCategory.name)) {
        //                         categoryBox.push(category.videoCategory.name);
        //                     }
        //                 })
        //                 setCategoryBox(categoryBox);
        //                 setUserPlans(userPlans.data.message);
        //                 setUserActiveSubscription(true);
        //             } else {
        //                 setLoadingData(false);
        //                 setUserActiveSubscription(false);
        //             }
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
    }, [videoId])

    let skeleton = [];

    for (let i = 0; i < 4; i++) {
        let singleSkeleton = <div><Skeleton.Image active /><Skeleton active /></div>
        skeleton.push(singleSkeleton);
    }

    return (
        <div>
            <Nav />
            {
                fetchingData ?
                    <div className="">
                        {/* <div className="grid-4">
                            {skeleton.map((placeHolder, index) => (
                                <div className="item" key={index}>
                                    {placeHolder}
                                    <Divider />
                                </div>
                            ))}
                        </div> */}
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
                            <div className="new-video-player">
                                <div className="contain">
                                    <div className="video-story">
                                        <h2>Dance Trends - Azonto</h2>
                                        <div className="specific-dance-detail">
                                            <p>&mdash; BJ Miah</p>
                                            <p>&mdash; 02 mins</p>
                                            <p>&mdash; Dance Trends</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="video-player-sect">
                                            <div>
                                                <div className="video-cover">
                                                    <div>
                                                        {
                                                            videoPurchased ?
                                                                <VideoJS options={videoJsOptions} videoId={videoId}
                                                                    onReady={handlePlayerReady} />
                                                                :
                                                                <div className="div-poster"></div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="grid-2">
                                                    <div className="video-sect-story">
                                                        <h4>Video Summary</h4>
                                                        <p>The Yahooze dance is a Nigerian dance style that gained popularity in
                                                            the mid-2000s, particularly within the country's entertainment and music
                                                            scenes. Named after a hit song titled "Yahooze" by Nigerian musician Olu
                                                            Maintain, the dance became synonymous with a specific era of Nigerian pop culture.</p>
                                                        {/* <p>Dancerapy is a fitness and lifestyle brand invested in
                                                            reintroducing dance as a choice therapy for healthy living. As a
                                                            movement, Dancerapy personalizes the idea of dance as a culture towards
                                                            achieving wholeness in health and fitness.</p> */}
                                                    </div>
                                                    <div className="video-sect-story _2">
                                                        <h4>Video Summary</h4>
                                                        <p>Dancerapy is a fitness and lifestyle brand invested in
                                                            reintroducing dance as a choice therapy for healthy living. As a
                                                            movement, Dancerapy personalizes the idea of dance as a culture towards
                                                            achieving wholeness in health and fitness.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="contain video-extra-content mt_5">
                                <div className="grid-2">
                                    <div>
                                        <div className="avatar-sect">
                                            <div className="avatar-circle-showcase"></div>
                                            <div>
                                                <h3>BJ Miah</h3>
                                                <p>Dance Instrutor</p>
                                            </div>
                                        </div>
                                        <Divider />
                                        <div dangerouslySetInnerHTML={{ __html: videoData.videoDescription }}>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="banner-tab">
                                            <button>Weight Loss</button>
                                            <button>Burn Calories</button>
                                            <button>Empowerment</button>
                                            <button>Enhanced Flexibility</button>
                                            <button>Muscle Strength</button>
                                            <button>Cardio</button>
                                            <button>Versatility</button>
                                            <button>Self Confidence</button>
                                            <button>Muscle Toning</button>
                                            <button>Improved Coordination</button>
                                            <button>Community Feeling</button>
                                            <button>Social Interaction</button>
                                        </div>
                                        <div>
                                            <div className="grid-4 mt_4">
                                                <div className="small-card">
                                                    <ion-icon name="tv-outline"></ion-icon>
                                                    <p>Responsive</p>
                                                </div>
                                                <div className="small-card">
                                                    <ion-icon name="cellular-outline"></ion-icon>
                                                    <p>Easy to use</p>
                                                </div>
                                                <div className="small-card">
                                                    <ion-icon name="expand-outline"></ion-icon>
                                                    <p>Fullscreen</p>
                                                </div>
                                                <div className="small-card">
                                                    <ion-icon name="ticket-outline"></ion-icon>
                                                    <p>Free Tokens</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="main_video_player">
                                <div className="grid-2">
                                    <div>
                                        <div className="contain">
                                            <h3>{videoData.title}</h3>
                                            <div className="">
                                                <ul className="video-product-tag">
                                                    <p className="">
                                                        <span className="first_span">Flexibility</span>
                                                    </p>
                                                    <p className="">
                                                        <span className="first_span">Cardio</span>
                                                    </p>
                                                    <p className="">
                                                        <span className="first_span">Muscle Toning</span>
                                                    </p>
                                                    <p className="">
                                                        <span className="first_span">Interval Training</span>
                                                    </p>
                                                    <p className="">
                                                        <span className="first_span">Muscle Memory</span>
                                                    </p>
                                                    <p className="">
                                                        <span className="first_span">Mind and Body Coordination</span>
                                                    </p>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="main_video plan_group">
                                        <VideoJS options={videoJsOptions} videoId={videoId}
                                            onReady={handlePlayerReady} />
                                    </div>
                                </div>
                            </div> */}
                            <div className="detail_prop trending_videos mt_5">
                                <div className="contain">
                                    <div className="profile-data-display">
                                        <h3 className="other_profile_title">Trending dance videos</h3>
                                        {/* <Divider style={{ margin: 0 }} /> */}
                                        {
                                            fetchingData ?
                                                <div className="video-skeleton">
                                                    <div className="grid-4">
                                                        {skeleton.map((placeHolder, index) => (
                                                            <div className="item" key={index}>
                                                                {placeHolder}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                :
                                                videoData?.videoCategory?.videos.length ?
                                                    <div className="other-dance-styles plan_video_display">
                                                        <div className="grid-4">
                                                            {
                                                                videoData?.videoCategory?.videos.slice(minRandomFilter, +minRandomFilter + 4).map((videoData, index) => (
                                                                    <div key={index}>
                                                                        <Link to={props.auth.isAuthenticated ?
                                                                            `/profile/video/play/${videoData?._id}/${videoData?.title}` : `/signin?auth_redirect=/profile/video/play/${videoData?._id}/${videoData?.title}`}>
                                                                            <div className="">
                                                                                <div className="card-display">
                                                                                    <div className="card-header">
                                                                                        {/* <img src={videoData.poster} alt={videoData.name} /> */}
                                                                                        {
                                                                                            (index % 2 === 1) ?
                                                                                                <img src={Image1} alt="_1" />
                                                                                                :
                                                                                                <img src={Image2} alt="_1" />
                                                                                        }
                                                                                        {/* <img src={Image1} alt="_1" /> */}
                                                                                        <div className="card-header-fee">
                                                                                            {
                                                                                                videoData?.amount !== 0 ?
                                                                                                    <div className="card-header-cover">
                                                                                                        <ion-icon name="lock-closed-outline"></ion-icon>
                                                                                                    </div>
                                                                                                    : ''
                                                                                            }
                                                                                        </div>
                                                                                        <div className="card-overlay">
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="card-body">
                                                                                        <div className="card-body-header">
                                                                                            <p>Dance Trends</p>
                                                                                            <p>02:20 mins</p>
                                                                                        </div>
                                                                                        <h4 className="card-body-title">{videoData?.title}</h4>
                                                                                        {/* <div className="inline_video_flex">
                                                                                                <p>{videoData?.videoCategory.name}</p>
                                                                                                <p>{videoData?.videoLength}mins</p>
                                                                                            </div> */}
                                                                                        <div className="card-body-footer noMargin={true}">
                                                                                            <p>Adeleke Ifeoluwase</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div> : ''
                                        }
                                    </div>
                                </div>
                                <div className="pt-4">

                                </div>
                            </div>
                        </div>
            }
            <Footer noMargin={true} />
            <Modal open={openVideoPurchaseModal} className="paymentModal" footer={null}
                maskClosable={false} onCancel={() => setOpenVideoPurchaseModal(false)}>
                <div className="referral-story">
                    <div className="center-div">
                        <div>
                            <div>
                                <img src={LockImage} alt="locked video" />
                            </div>
                            <h3>Payment Required</h3>
                            <p>This is a paid video. Invite a friend to Dancerapy and earn 0.25% on all their transactions</p>
                            {
                                loadingPayment ?
                                    <div>
                                        <Spin />
                                    </div>
                                    :
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
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        </div >
    )
}

const mapStateToProps = store => {
    return { auth: store.auth }
}

export default connect(mapStateToProps)(ProfileVideoToPlay);