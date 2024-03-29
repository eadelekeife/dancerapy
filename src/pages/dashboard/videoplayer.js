
import React, { useEffect, useState } from "react";

import { useSearchParams, useNavigate, Link, useParams } from "react-router-dom";
import { Skeleton, notification, Popover, Modal, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from '../../utils/axiosCall';
// import VideoJS from './videoplayer';
// import videojs from 'video.js';
import VideoJS from '../../components/main-video-player';
import 'video.js/dist/video-js.css';
import NumberFormat from 'react-number-format';
import { Divider, Rate } from "antd";

import Image1 from "../../assets/images/product/_1.png";
import Image2 from "../../assets/images/product/_2.png";

import LockImage from "../../assets/images/illustrations/Lock.png";
import Empty from "../../assets/images/auth/empty.svg";
import Footer from "../../components/footer";
import Nav from "../../components/nav";

import { connect } from "react-redux";
import AppRoute from "../../utils/routes";
import { usePaystackPayment } from 'react-paystack';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { _add_video_to_cart, _buy_single_video, _buy_single_video_with_tokens, _cancel_user_subscription, _complete_user_subscription, _complete_user_subscription_with_wallet, _fetch_subscription_plans, _find_video_by_id, _initiate_user_subscription, _initiate_user_subscription_with_wallet, _update_video_data, _update_video_full_data, _update_video_half_data } from "../../utils/axiosroutes";
import AllAppRoutes from "../../utils/routes";

const ProfileVideoToPlay = props => {

    const playerRef = React.useRef(null);
    const videoControlRef = React.useRef(null);
    const fundWalletPaystackButton = React.useRef(null);
    const Navigate = useNavigate();
    const navigate = useNavigate();
    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };
    const [amount, setAmount] = useState(0); // Remember, set in kobo!
    const [userData] = useState(props.auth.isAuthenticated ? props.auth.userDetails : '');
    const spinnerIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;
    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;
    const [loaderSpinning, setLoaderSpinning] = useState(false);

    const [activePlan, setActivePlan] = useState(false);
    const { videoId } = useParams();
    const [subscriptionPlans, setSubscriptionPlans] = useState([]);
    const [selectedSubscriptionPackage, setSelectedSubscriptionPackage] = useState({});
    const [activeSubPackage, setActiveSubPackage] = useState(0);
    const [videoData, setVideoData] = useState({});
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);

    // videos display
    const videoElement = React.useRef();

    const [userPlans, setUserPlans] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [userActiveSubscription, setUserActiveSubscription] = useState(false);
    const [categoryBox, setCategoryBox] = useState([]);
    const [filter, setFilter] = useState('all');
    const [userWalletData, setUserWalletData] = useState({});
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
                setVideoPurchased(videoData.data.message.activeSubscription);
                setVideoData(videoData.data.message.videoData);
                setUserWalletData(videoData.data.message.userWalletBalance);
                let categoryLength = videoData.data.message.videoData.videoCategory?.videos.length;
                let minRandom = Math.trunc(Math.random() * (categoryLength - 4));
                setMinRandomFilter(minRandom);
                if (!videoData.data.message.activeSubscription) setOpenVideoPurchaseModal(true);
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
    const fetchSubscriptionData = async () => {
        setLoadingData(true);
        try {
            let subPlans = await _fetch_subscription_plans();
            if (subPlans.data.statusMessage === "success") {
                setSubscriptionPlans(subPlans.data.message);
                let planIndex;
                subPlans.data.message.find((plan, index) => {
                    if (plan.duration === 12) planIndex = index
                })
                setActiveSubPackage(planIndex);
                setLoadingData(false);
                setSelectedSubscriptionPackage(subPlans.data.message[planIndex]);
                // setOpenVideoPurchaseModal(true);
            } else {
                openNotificationWithIcon('error', subPlans.data.summary);
            }
        } catch (err) {
            openNotificationWithIcon('error', 'An error occurred while fetching subscription plans. Please reload page to try again');
        }
    }
    useEffect(() => {
        localStorage.setItem('videoViewsNum', 0);
        findUserVideo(videoId);
        fetchSubscriptionData();
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
                let redLink = `/profile/video/play/${videoData._id}/${videoData.title}`;
                localStorage.setItem('redLink', redLink);
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
                let redLink = `/profile/video/play/${videoData._id}/${videoData.title}`;
                localStorage.setItem('redLink', redLink);
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
                localStorage.setItem('cartQuantity', videoCart.data.message.length);
                openNotificationWithIcon('success', 'Video added to cart successfully');
                Navigate('/videos');
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


    // subscription

    const initiateUserSubscription = async e => {
        setLoadingData(true);
        try {
            let initiateSubscription = await _initiate_user_subscription({
                subscriptionPackageId: selectedSubscriptionPackage._id,
                amount: selectedSubscriptionPackage.amount,
                couponDiscount: 0
            });
            if (initiateSubscription.data.statusMessage === "success") {
                localStorage.setItem('subscriptionInitializationKey', initiateSubscription.data.message)
                fundWalletPaystackButton.current.click();
                setOpenVideoPurchaseModal(false);
            } else {
                setLoadingData(false);
                openNotificationWithIcon('error', initiateSubscription?.data?.summary);
            }
        } catch (err) {
            setLoadingData(false);
            openNotificationWithIcon('error', 'An error occurred while completing transaction. Please try again');
        }
    }

    const completeUserSubscription = async paymentData => {
        setOpenVideoPurchaseModal(false);
        if (paymentData?.status === "successful") {
            setLoaderSpinning(true)
            try {
                let userPaymentData = {
                    subscriptionPackageId: selectedSubscriptionPackage._id,
                    subscriptionId: localStorage.getItem('subscriptionInitializationKey'),
                    // transactionKey: paymentData?.trxref,
                    transactionKey: paymentData?.tx_ref,
                };
                let completeUserSubscription = await _complete_user_subscription(userPaymentData);
                if (completeUserSubscription.data.statusMessage === "success") {
                    localStorage.removeItem('subscriptionInitializationKey');
                    localStorage.setItem('subscriptionAmount', completeUserSubscription.data.message.amount);
                    localStorage.setItem('subscriptionDuration', completeUserSubscription.data.message.duration);
                    localStorage.setItem('subscriptionDurationTitle', completeUserSubscription.data.message.name);
                    navigate(AllAppRoutes.profileSubscriptionSuccess);
                } else {
                    setLoadingData(false);
                    openNotificationWithIcon('error', completeUserSubscription?.data?.summary);
                }
            } catch (err) {
                setLoadingData(false);
                openNotificationWithIcon('error', 'An error occurred while completing your subscription. Please try again or reach out to us if your account has been debited.');
            }
        } else {
            openNotificationWithIcon('error', 'We could not process payment. Please try again.');
        }
    }

    const cancelUserSubscription = async () => {
        setLoadingData(true);
        try {
            let subscribeUser = await _cancel_user_subscription({
                transactionKey: (new Date()).getTime().toString(),
                subscriptionId: localStorage.getItem('subscriptionInitializationKey')
            });
            if (subscribeUser.data.statusMessage === "success") {
                setLoadingData(false);
                localStorage.removeItem('subscriptionInitializationKey');
                openNotificationWithIcon('error', 'Transaction cancelled');
                navigate('/videos');
            } else {
                setLoadingData(false);
                openNotificationWithIcon('error', 'Transaction cancelled');
                navigate('/videos');
            }
        } catch (err) {
            setLoadingData(false);
            openNotificationWithIcon('error', 'Transaction cancelled');
            navigate('/videos');
        }
    }

    const completeUserSubscriptionWithWallet = async paymentData => {
        setOpenVideoPurchaseModal(false);
        setLoaderSpinning(true)
        try {
            let userPaymentData = {
                subscriptionPackageId: selectedSubscriptionPackage._id,
                subscriptionId: paymentData,
                transactionKey: (new Date()).getTime().toString(),
            };
            let completeUserSubscription = await _complete_user_subscription_with_wallet(userPaymentData);
            if (completeUserSubscription.data.statusMessage === "success") {
                localStorage.removeItem('subscriptionInitializationKey');
                localStorage.setItem('subscriptionAmount', completeUserSubscription.data.message.amount);
                localStorage.setItem('subscriptionDuration', completeUserSubscription.data.message.duration);
                localStorage.setItem('subscriptionDurationTitle', completeUserSubscription.data.message.name);
                navigate(AllAppRoutes.profileSubscriptionSuccess);
            } else {
                setLoadingData(false);
                setOpenVideoPurchaseModal(true)
                openNotificationWithIcon('error', completeUserSubscription?.data?.summary);
            }
        } catch (err) {
            console.log(err)
            setLoadingData(false);
            setOpenVideoPurchaseModal(true)
            openNotificationWithIcon('error', 'An error occurred while completing your subscription. Please try again or reach out to us if your account has been debited.');
        }
    }

    const initiateUserSubscriptionWithWallet = async e => {
        setLoadingData(true);
        try {
            let initiateSubscription = await _initiate_user_subscription_with_wallet({
                subscriptionPackageId: selectedSubscriptionPackage._id,
                amount: selectedSubscriptionPackage.amount,
                couponDiscount: 0
            });
            if (initiateSubscription.data.statusMessage === "success") {
                localStorage.setItem('subscriptionInitializationKey', initiateSubscription.data.message)
                // fundWalletPaystackButton.current.click();
                completeUserSubscriptionWithWallet(initiateSubscription.data.message);
                setOpenVideoPurchaseModal(false);
            } else {
                setLoadingData(false);
                setOpenVideoPurchaseModal(true)
                openNotificationWithIcon('error', initiateSubscription?.data?.summary);
            }
        } catch (err) {
            setLoadingData(false);
            setOpenVideoPurchaseModal(true)
            openNotificationWithIcon('error', 'An error occurred while completing transaction. Please try again');
        }
    }

    const onSuccessUserSubscription = (reference) => completeUserSubscription(reference);
    const onCloseUserSubscription = (reference) => cancelUserSubscription(reference);

    const paystackSubConfig = {
        reference: (new Date()).getTime().toString(),
        email: userData.emailAddress,
        amount: +selectedSubscriptionPackage.amount + '00', //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: process.env.REACT_APP_DANCERAPY_PAYMENT_KEY,
    };

    const flutterwaveSubConfig = {
        public_key: process.env.REACT_APP_FLUTTERWAVE_PAYMENT_KEY,
        tx_ref: (new Date()).getTime().toString(),
        amount: +selectedSubscriptionPackage.amount,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: userData.emailAddress,
            phone_number: userData.phoneNumber,
            name: `${userData.firstName} ${userData.lastName}`,
        },
        customizations: {
            title: 'Dancerapy Subscription',
            description: '',
            logo: 'https://danceimages.s3.amazonaws.com/logo.jpg',
        },
    };

    const initializeSubscriptionPayment = usePaystackPayment(paystackSubConfig);
    const handleSubscriptionPayment = useFlutterwave(flutterwaveSubConfig);

    return (
        <div className="extra-videos-detail-display">
            <Spin spinning={loadingData} indicator={spinnerIcon}>
                <Nav />
                <div className="extra-video-single-display">
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
                                                <h2>{videoData.title}</h2>
                                                <div className="specific-dance-detail">
                                                    <p>&mdash; {videoData.instructorName}</p>
                                                    <p>&mdash; {videoData.videoLength}</p>
                                                    <p>&mdash; {videoData?.videoCategory?.name}</p>
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
                                                    <div className="extra-unnecessary-data">
                                                        <div className="grid-2">
                                                            <div className="video-sect-story">
                                                                <h4>Video Summary</h4>
                                                                <div className="video-sect-story-description">
                                                                    <p dangerouslySetInnerHTML={{ __html: videoData.videoDescription }}></p>
                                                                </div>
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
                                                        <h3>{videoData.instructorName}</h3>
                                                        <p>Dance Instrutor</p>
                                                    </div>
                                                </div>
                                                <Divider />
                                                <div dangerouslySetInnerHTML={{ __html: videoData.videoDescription }}>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="side-banner-tab">
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
                                    </div>
                                    <div className="detail_prop trending_videos mt_5">
                                        <div className="contain">
                                            <div className="profile-data-display">
                                                <h3 className="other_profile_title">Trending dance videos</h3>
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
                                                                        videoData?.videoCategory?.videos.slice(minRandomFilter, +minRandomFilter + 4).map((otherVideosData, index) => (
                                                                            <div key={index}>
                                                                                <Link to={props.auth.isAuthenticated ?
                                                                                    `/profile/video/play/${otherVideosData?._id}/${otherVideosData?.title}` : `/signin?auth_redirect=/profile/video/play/${otherVideosData?._id}/${otherVideosData?.title}`}>
                                                                                    <div className="">
                                                                                        <div className="card-display">
                                                                                            <div className="card-header">
                                                                                                <img src={otherVideosData.poster} alt={otherVideosData.name} />
                                                                                                <div className="card-header-fee">
                                                                                                    {
                                                                                                        otherVideosData?.amount !== 0 ?
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
                                                                                                    <p>{videoData?.videoCategory?.name}</p>
                                                                                                    <p>{otherVideosData.videoLength}</p>
                                                                                                </div>
                                                                                                <h4 className="card-body-title">{otherVideosData?.title}</h4>
                                                                                                <div className="card-body-footer noMargin={true}">
                                                                                                    <p>{otherVideosData.instructorName}</p>
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
                                    </div>
                                </div>
                    }
                </div>
                <Footer />
                <Modal open={openVideoPurchaseModal} className="paymentModal video-player-payment" footer={null}
                    maskClosable={false} onCancel={() => setOpenVideoPurchaseModal(false)}>
                    <div className="referral-story">
                        <div className="center-div checkout-button">
                            <div>
                                <div>
                                    <img src={LockImage} alt="locked video" />
                                </div>
                                {/* <h3>Payment Required</h3>
                            {
                                (+videoData.amount > +userWalletData.balance) && (+videoData.amount > +userWalletData.tokens) ?
                                    <div>
                                        <p>This video costs <span className="currency">NGN</span>{videoData.amount} to access. You currently have {userWalletData.tokens} tokens
                                            and <span className="currency">NGN</span><NumberFormat value={(+userWalletData?.balance).toFixed(2)} displayType="text" thousandSeparator={true} /> in your wallet. Please
                                            fund wallet to buy video.</p>
                                        <div>
                                            <Link className="btn-red" to={AllAppRoutes.profilePlanOrders}>Fund Wallet</Link>

                                            <button
                                                onClick={() => addVideoToCart()}
                                                className="btn-default">Add to Cart to Buy Later</button>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <p>This video costs <span className="currency">NGN</span>{videoData.amount} to access. You currently have {userWalletData.tokens} tokens
                                            and <span className="currency">NGN</span><NumberFormat value={(+userWalletData?.balance).toFixed(2)} displayType="text" thousandSeparator={true} /> in your wallet. Please click below
                                            to buy video.</p>
                                        <div className="btn-gri btn-block">
                                            {
                                                +videoData.amount <= +userWalletData.balance ?
                                                    <button
                                                        onClick={() => completeVideoPurchaseWithWalletBalance()}
                                                        className="btn-red">Buy with Wallet Balance</button> : ""
                                            }
                                            {
                                                +videoData.amount <= +userWalletData.tokens ?
                                                    <button
                                                        onClick={() => completeVideoPurchaseWithTokens()}
                                                        className="btn-red-border">Buy with Tokens</button> : ""
                                            }
                                            <button
                                                onClick={() => addVideoToCart()}
                                                className="btn-default">Add to Cart to Buy Later</button>
                                        </div>
                                    </div>
                            } */}
                                <h3>Subscription Required</h3>
                                <p>This is an exclusive video and requires an active subscription to access. Please subscribe to
                                    continue.
                                </p>
                                <div className="grid-3">
                                    {
                                        subscriptionPlans.map((subPlans, index) => (
                                            <div key={index}
                                                onClick={() => {
                                                    setSelectedSubscriptionPackage(subPlans)
                                                    setActiveSubPackage(index)
                                                }}
                                                className={`sub-card ${activeSubPackage === index ? 'active' : ''}`}>
                                                <div className="subscription-card">
                                                    <h3><span className="currency">NGN </span>
                                                        <NumberFormat thousandSeparator={true}
                                                            prefix={''} displayType="text"
                                                            className="numeric" value={subPlans.amount.toFixed(2)} /></h3>
                                                    <p>{subPlans.name}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="mt-5"></div>
                                {
                                    !loadingData ?
                                        <button
                                            onClick={() => initiateUserSubscription()}
                                            className="btn-red curve full_width">Subscribe with Card</button>
                                        :
                                        <button disabled
                                            className="btn-red curve full_width"><Spin indicator={antIcon} /></button>
                                }
                                <div className="mt-3"></div>
                                {
                                    !loadingData ?
                                        <button
                                            onClick={() => initiateUserSubscriptionWithWallet()}
                                            className="btn-border-red curve full_width">Subscribe with Wallet Balance</button>
                                        :
                                        <button disabled
                                            className="btn-border-red curve full_width"><Spin indicator={antIcon} /></button>
                                }
                                <Link className="btn-default"
                                    style={{ marginTop: 5, display: 'block', textDecoration: 'none' }}
                                    to={AllAppRoutes.appVideos}>See all videos</Link>
                            </div>
                        </div>
                    </div>
                </Modal>
                {/* <button ref={fundWalletPaystackButton} className="paystack-button" onClick={() => {
                    initializeSubscriptionPayment(onSuccessUserSubscription, onCloseUserSubscription)
                }}>Paystack Hooks Implementation</button> */}

                <button ref={fundWalletPaystackButton} className="paystack-button" onClick={() => {
                    // initializeSubscriptionPayment(onSuccessUserSubscription, onCloseUserSubscription)
                    handleSubscriptionPayment({
                        callback: (response) => {
                            // console.log(response);
                            // onSuccess();
                            completeUserSubscription(response);
                            closePaymentModal() // this will close the modal programmatically
                        },
                        onClose: () => cancelUserSubscription(),
                    });
                }}>Paystack Hooks Implementation</button>
            </Spin>
        </div >
    )
}

const mapStateToProps = store => {
    return { auth: store.auth }
}

export default connect(mapStateToProps)(ProfileVideoToPlay);