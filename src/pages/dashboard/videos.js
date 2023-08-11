import "./dashboard.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
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

    const fetchUserVideosData = async () => {
        try {
            let videoTempData = await _fetch_app_videos();
            if (videoTempData.data.statusMessage === "success") {
                setVideoBox(videoTempData.data.message);
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
        // axiosCall.get(`/user/online-subscription`, {
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem('token')}`
        //     }
        // })
        //     .then(userPlans => {
        //         console.log(userPlans)
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
        //                 setUserPlans(userPlans.data.message.virtualClassLinks);
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
                            <div className="tag-block">
                                <button className="tab active">All</button>
                                <button className="tab">Dance Trends</button>
                                <button className="tab">10 Mins Dance Blast</button>
                                <button className="tab">Dancerapy Choreographies</button>
                            </div>
                            <div className="grid-4">
                                {
                                    filter === "all" ?
                                        videoBox.map((productPlans, index) => (
                                            <div key={index}>
                                                {/* <Link to={`${AppRoute.profileVideoToPlay}?videoName=${productPlans.title}&videoId=${productPlans.id}`}> */}
                                                <div
                                                    onClick={e => updateCurrentVideo(productPlans)}>
                                                    <div className="">
                                                        <div className="card-display">
                                                            <div className="card-header">
                                                                {/* <img src={productPlans.poster} alt={productPlans.name} /> */}
                                                                {
                                                                    (index % 2 === 1) ?
                                                                        <img src={Image1} alt="_1" />
                                                                        :
                                                                        <img src={Image2} alt="_1" />
                                                                }
                                                                {/* <img src={Image1} alt="_1" /> */}
                                                                <div className="card-header-fee">
                                                                    <div className="card-header-cover">
                                                                        <ion-icon name="lock-closed-outline"></ion-icon>
                                                                    </div>
                                                                    {/* <div className="card-header-cover">
                                                                        <ion-icon name="lock-closed-outline"></ion-icon>
                                                                    </div> */}
                                                                </div>
                                                                <div className="card-overlay">
                                                                </div>
                                                            </div>
                                                            <div className="card-body">
                                                                <div className="card-body-header">
                                                                    <p>Dance Trends</p>
                                                                    <p>02:20 mins</p>
                                                                </div>
                                                                <h4 className="card-body-title">{productPlans.title}</h4>
                                                                {/* <div className="inline_video_flex">
                                                                                                <p>{productPlans.videoCategory.name}</p>
                                                                                                <p>{productPlans.videoLength}mins</p>
                                                                                            </div> */}
                                                                <div className="card-body-footer noMargin={true}">
                                                                    <p>Adeleke Ifeoluwase</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* </Link> */}
                                            </div>
                                        ))
                                        :
                                        videoBox.map((productPlans, index) => (
                                            filter === productPlans.videoCategory.name ?
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
                                                </div> : ''
                                        ))
                                }
                            </div>
                            {/* <div className="white-dash-gri">
                                <div>
                                    <div className="white-dash-data">
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
                                                    <div className="center_align_messag product-display empty_div_product">
                                                        <div>
                                                            <div className="empty_div_square">

                                                            </div>
                                                            <h4>Oops!</h4>
                                                            <p>An error occurred while we were trying to fetch data. Please reload page to
                                                                try again.</p>
                                                        </div>
                                                    </div>
                                                    :
                                                    videoBox.length ?
                                                        !searchVideoDisplay ?
                                                            <div className="plan_video_display">
                                                                <div className="video-calendar-block">
                                                                    <div className="grid-flex">
                                                                        <button
                                                                            onClick={() => setIsModalOpen(true)}
                                                                            className="flex-btn btn-red">See Dance Calendar <span>| <ion-icon name="calendar-outline"></ion-icon></span></button>
                                                                        <div>
                                                                            <form autoComplete="off" onSubmit={handleSubmit(findVideoByName)}>
                                                                                <div>
                                                                                    <Controller name="videoName" defaultValue="" control={control}
                                                                                        render={({ field }) => (
                                                                                            <Input autoComplete="off" {...field} type="text" style={{ height: '5rem' }} />
                                                                                        )}
                                                                                    />
                                                                                </div>
                                                                                {
                                                                                    !loadingSearchButton ?
                                                                                        <button
                                                                                            style={{ cursor: 'pointer' }}
                                                                                        >Find Video</button>
                                                                                        :
                                                                                        <button disabled><Spin indicator={antIcon} /></button>
                                                                                }
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>
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
                                                                <div className="grid-4">
                                                                    {
                                                                        filter === "all" ?
                                                                            videoBox.map((productPlans, index) => (
                                                                                <div key={index}>
                                                                                    <div
                                                                                        onClick={e => updateCurrentVideo(productPlans)}>
                                                                                        <div className="">
                                                                                            <div className="card-display">
                                                                                                <div className="card-header">
                                                                                                    {
                                                                                                        (index % 2 === 1) ?
                                                                                                            <img src={Image1} alt="_1" />
                                                                                                            :
                                                                                                            <img src={Image2} alt="_1" />
                                                                                                    }
                                                                                                    <div className="card-header-fee">
                                                                                                        <div className="card-header-cover">
                                                                                                            <ion-icon name="lock-closed-outline"></ion-icon>
                                                                                                        </div>
                                                                                                        <div className="card-header-cover">
                                                                                                            <ion-icon name="lock-closed-outline"></ion-icon>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="card-body">
                                                                                                    <div className="card-body-header">
                                                                                                        <p>Dance Trends</p>
                                                                                                        <p>02:20 mins</p>
                                                                                                    </div>
                                                                                                    <h4 className="card-body-title">{productPlans.title}</h4>
                                                                                                    <div className="card-body-footer noMargin={true}">
                                                                                                        <p>Adeleke Ifeoluwase</p>
                                                                                                    </div>
                                                                                                    <div className="card-overlay">
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ))
                                                                            :
                                                                            videoBox.map((productPlans, index) => (
                                                                                filter === productPlans.videoCategory.name ?
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
                                                                                    </div> : ''
                                                                            ))
                                                                    }
                                                                </div>
                                                            </div>
                                                            :
                                                            <React.Fragment>
                                                                <div className="search-display">
                                                                    <button
                                                                        onClick={() => goBacktoMainVideos()}
                                                                        className="btn_border_black"><img src={ArrowLeft} alt="Arrow left" />Go back</button>
                                                                    <h4 className="search-title">"{searchKey}"</h4>
                                                                    {
                                                                        searchedVideos.length ?
                                                                            <div className="plan_video_display">
                                                                                <div className="grid-4">
                                                                                    {searchedVideos.map((productPlans, index) => (
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
                                                                            <div className="search_empty_div">
                                                                                <div>
                                                                                    <img src={Empty} alt="empty" />
                                                                                    <p>Videos not found</p>
                                                                                </div>
                                                                            </div>
                                                                    }
                                                                </div>
                                                            </React.Fragment>
                                                        :
                                                        <div>
                                                            <div className="empty_div">
                                                                <div>
                                                                    <img src={Empty} alt="empty" />
                                                                    <p>There are no videos yet</p>
                                                                    <Link to={AppRoute.products} className="btn_red">View Plans</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                        }
                                    </div>
                                </div>
                            </div> */}
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