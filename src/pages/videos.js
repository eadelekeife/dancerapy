import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Skeleton, notification, Input, Divider, Modal, Table, Tabs, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import AppRoute from "../utils/routes";
import Footer from "../components/footer";
import { DateTime } from 'luxon';
import { Controller, useForm } from "react-hook-form";
import Nav from "../components/nav";

import Empty from "../assets/images/auth/empty.svg";
import _1 from "../assets/images/content/_1.avif";
import _2 from "../assets/images/content/_2.avif";
import ArrowLeft from "../assets/images/arrow-left.svg";
import axiosCall from "../utils/axiosCall";
import { _fetch_app_videos } from "../utils/axiosroutes";

import LockImage from "../assets/images/illustrations/Lock.png";
import Image1 from "../assets/images/product/_1.png";
import Image2 from "../assets/images/product/_2.png";
import axios from "axios";

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
    const [videoBox, setVideoBox] = useState([]);
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
    const [openVideoPurchaseModal, setOpenVideoPurchaseModal] = useState(false);
    const [currentVideo, setCurrentVideo] = useState({});

    const fetchUserVideosData = async () => {
        try {
            let videoTempData = await _fetch_app_videos();
            if (videoTempData.data.statusMessage === "success") {
                setVideoBox(videoTempData.data.message);
                console.log(videoTempData)
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

    const updateCurrentVideo = e => {
        setCurrentVideo(e);
        setOpenVideoPurchaseModal(true);
    }

    useEffect(() => {
        fetchUserVideosData();
    }, [])

    let skeleton = [];
    for (let i = 0; i < 6; i++) {
        skeleton.push(<Skeleton active />)
    }

    // calendar

    // month 1
    const week1month1 = [
        {
            key: '1',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 1</span>,
            name: 'Fit Test (Dance Pop-up African)',
        },
        {
            key: '2',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 2</span>,
            name: 'Dance Blast 1 + Core & Abs with Aniergy x 2',
        },
        {
            key: '3',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 3</span>,
            name: 'Dance Blast 1 + Diastasis Recti with Davinci x 2',
        },
        {
            key: '4',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 4</span>,
            name: 'Dance Blast 1 + Core & Abs with Aniergy x 2',
        },
        {
            key: '5',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 5</span>,
            name: 'Dance Blast 1 + Diastasis Recti with Davinci x 2',
        },
        {
            key: '6',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 6</span>,
            name: 'Dance Blast 1 + Core & Abs with Aniergy + Dance Choreography 1',
        },
        {
            key: '7',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 7</span>,
            name: 'Rest',
        },
    ];
    const week2month1 = [
        {
            key: '1',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 1</span>,
            name: 'Dance Blast 2 + Toned arms and legs with Charlie Brown x 2',
        },
        {
            key: '2',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 2</span>,
            name: 'Dance Blast 2 + Core & Abs with BJMIAH x 2',
        },
        {
            key: '3',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 3</span>,
            name: 'Dance Blast 2 + Toned arms and legs with Charlie Brown x 2',
        },
        {
            key: '4',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 4</span>,
            name: 'Dance Blast 2 + Core & Abs with BJMIAH x 2',
        },
        {
            key: '5',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 5</span>,
            name: 'Dance Blast 2 + Toned arms and legs with Charlie Brown x 2',
        },
        {
            key: '6',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 6</span>,
            name: 'Dance Blast 2 + Core & Abs with BJMIAH + Dance Choreography 1',
        },
        {
            key: '7',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 7</span>,
            name: 'Rest',
        },
    ];
    const week3month1 = [
        {
            key: '1',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 1</span>,
            name: 'Fit Test (Dance Pop-up African)',
        },
        {
            key: '2',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 2</span>,
            name: 'Dance Blast 1 + Diastasis Recti with Davinci x 2',
        },
        {
            key: '3',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 3</span>,
            name: 'Dance Blast 1 + Core & Abs with Aniergy x 2',
        },
        {
            key: '4',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 4</span>,
            name: 'Dance Blast 1 + Diastasis Recti with Davinci x 2',
        },
        {
            key: '5',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 5</span>,
            name: 'Dance Blast 1 + Core & Abs with Aniergy x 2',
        },
        {
            key: '6',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 6</span>,
            name: 'Dance Blast 1 + Diastasis Recti with Davinci + Dance Choreography 1',
        },
        {
            key: '7',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 7</span>,
            name: 'Rest',
        },
    ];
    const week4month1 = [
        {
            key: '1',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 1</span>,
            name: 'Dance Blast 2 + Core & Abs with BJMIAH x 2',
        },
        {
            key: '2',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 2</span>,
            name: 'Dance Blast 2 + Toned arms and legs with Charlie Brown x 2',
        },
        {
            key: '3',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 3</span>,
            name: 'Dance Blast 2 + Core & Abs with BJMIAH x 2',
        },
        {
            key: '4',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 4</span>,
            name: 'Dance Blast 2 + Toned arms and legs with Charlie Brown x 2',
        },
        {
            key: '5',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 5</span>,
            name: 'Dance Blast 2 + Core & Abs with BJMIAH x 2',
        },
        {
            key: '6',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 6</span>,
            name: 'Dance Blast 2 + Toned arms and legs with Charlie Brown + Dance Choreography 1',
        },
        {
            key: '7',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 7</span>,
            name: 'Rest',
        },
    ];

    // month 2
    const week1month2 = [
        {
            key: '1',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 1</span>,
            name: 'Fit Test (Dance Pop-up African)',
        },
        {
            key: '2',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 2</span>,
            name: 'Dance Blast 3 + Stretch, Core and Abs with Aniergy x 2',
        },
        {
            key: '3',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 3</span>,
            name: 'Dance Blast 3 + Toned arms with Davinci x 2',
        },
        {
            key: '4',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 4</span>,
            name: 'Dance Blast 3 + Stretch, Core and Abs with Aniergy x 2',
        },
        {
            key: '5',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 5</span>,
            name: 'Dance Blast 3 + Toned arms with Davinci x 2',
        },
        {
            key: '6',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 6</span>,
            name: 'Dance Blast 3 + Stretch, Core and Abs with Aniergy + Dance Choreography 2',
        },
        {
            key: '7',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 7</span>,
            name: 'Rest',
        },
    ];
    const week2month2 = [
        {
            key: '1',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 1</span>,
            name: 'Dance Blast 4 + Core & Abs with Aniergy x 2',
        },
        {
            key: '2',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 2</span>,
            name: 'Dance Blast 4 + Toned arms and legs with Charlie Brown x 2',
        },
        {
            key: '3',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 3</span>,
            name: 'Dance Blast 4 + Core & Abs with Aniergy x 2',
        },
        {
            key: '4',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 4</span>,
            name: 'Dance Blast 4 + Diastasis Recti with Davinci x 2',
        },
        {
            key: '5',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 5</span>,
            name: 'Dance Blast 2 + Toned arms and legs with Charlie Brown x 2',
        },
        {
            key: '6',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 6</span>,
            name: 'Dance Blast 2 + Core & Abs with Aniergy + Dance Choreography 2',
        },
        {
            key: '7',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 7</span>,
            name: 'Rest',
        },
    ];
    const week3month2 = [
        {
            key: '1',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 1</span>,
            name: 'Fit Test (Dance Pop-up African) x 2',
        },
        {
            key: '2',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 2</span>,
            name: 'Dance Blast 3 + Toned arms with Davinci x 2',
        },
        {
            key: '3',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 3</span>,
            name: 'Dance Blast 3 + Stretch, Core and Abs with Aniergy x 2',
        },
        {
            key: '4',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 4</span>,
            name: 'Dance Blast 3 + Toned arms with Davinci x 2',
        },
        {
            key: '5',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 5</span>,
            name: 'Dance Blast 3 + Stretch, Core and Abs with Aniergy x 2',
        },
        {
            key: '6',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 6</span>,
            name: 'Dance Blast 3 + Toned arms with Davinci + Dance Choreography 2',
        },
        {
            key: '7',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 7</span>,
            name: 'Rest',
        },
    ];
    const week4month2 = [
        {
            key: '1',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 1</span>,
            name: 'Dance Blast 4 + Core & Abs with BJMIAH x 2',
        },
        {
            key: '2',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 2</span>,
            name: 'Dance Blast 4 + Diastasis Recti with Davinci x 2',
        },
        {
            key: '3',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 3</span>,
            name: 'Dance Blast 4 + Core & Abs with BJMIAH x 2',
        },
        {
            key: '4',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 4</span>,
            name: 'Dance Blast 4 + Diastasis Recti with Davinci x 2',
        },
        {
            key: '5',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 5</span>,
            name: 'Dance Blast 4 + Core & Abs with BJMIAH x 2',
        },
        {
            key: '6',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 6</span>,
            name: 'Dance Blast 4 + Diastasis Recti with Davinci + Dance Choreography 2',
        },
        {
            key: '7',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 7</span>,
            name: 'Rest',
        },
    ];

    // month 3
    const week1month3 = [
        {
            key: '1',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 1</span>,
            name: 'Fit Test (Dance Pop-up African) x 2',
        },
        {
            key: '2',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 2</span>,
            name: 'Dance Blast 1 + Core and Abs with Aniergy x 2',
        },
        {
            key: '3',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 3</span>,
            name: 'Dance Blast 1 + Diastasis Recti with Davinci x 2',
        },
        {
            key: '4',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 4</span>,
            name: 'Dance Blast 1 + Core and Abs with BJMIAH x 2',
        },
        {
            key: '5',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 5</span>,
            name: 'Dance Blast 1 + Toned arms and legs with Charlie Brown x 2',
        },
        {
            key: '6',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 6</span>,
            name: 'Dance Blast 1 + Stretch, Core and Abs with Aniergy + Dance Choreography 3',
        },
        {
            key: '7',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 7</span>,
            name: 'Rest',
        },
    ];
    const week2month3 = [
        {
            key: '1',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 1</span>,
            name: 'Dance Blast 2 + Toned arms with Davinci x 2',
        },
        {
            key: '2',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 2</span>,
            name: 'Dance Blast 2 + Stretch, Core and Abs with Aniergy x 2',
        },
        {
            key: '3',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 3</span>,
            name: 'Dance Blast 2 + Core & Abs with BJMIAH x 2',
        },
        {
            key: '4',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 4</span>,
            name: 'Dance Blast 2 + Diastasis Recti with Davinci x 2',
        },
        {
            key: '5',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 5</span>,
            name: 'Dance Blast 2 + Toned arms and legs with Charlie Brown x 2',
        },
        {
            key: '6',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 6</span>,
            name: 'Dance Blast 2 + Core & Abs with Aniergy + Dance Choreography 3',
        },
        {
            key: '7',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 7</span>,
            name: 'Rest',
        },
    ];
    const week3month3 = [
        {
            key: '1',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 1</span>,
            name: 'Fit Test (Dance Pop-up African) x 3',
        },
        {
            key: '2',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 2</span>,
            name: 'Dance Blast 3 + Core and Abs with Aniergy x 2',
        },
        {
            key: '3',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 3</span>,
            name: 'Dance Blast 3 + Diastasis Recti with Davinci x 2',
        },
        {
            key: '4',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 4</span>,
            name: 'Dance Blast 3 + Core and Abs with BJMIAH x 2',
        },
        {
            key: '5',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 5</span>,
            name: 'Dance Blast 3 + Toned arms and legs with Charlie Brown x 2',
        },
        {
            key: '6',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 6</span>,
            name: 'Dance Blast 3 + Stretch, Core and Abs with Aniergy + Dance Choreography 3',
        },
        {
            key: '7',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 7</span>,
            name: 'Rest',
        },
    ];
    const week4month3 = [
        {
            key: '1',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 1</span>,
            name: 'Dance Blast 4 + Toned arms with Davinci x 2',
        },
        {
            key: '2',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 2</span>,
            name: 'Dance Blast 4 + Core & Abs with BJMIAH x 2',
        },
        {
            key: '3',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 3</span>,
            name: 'Dance Blast 4 + Diastasis Recti with Davinci x 2',
        },
        {
            key: '4',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 4</span>,
            name: 'Dance Blast 4 + Toned arms and Legs with Charlie Brown x 2',
        },
        {
            key: '5',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 5</span>,
            name: 'Dance Blast 4 + Core & Abs with Aniergy + Dance Choreography 3',
        },
        {
            key: '6',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 6</span>,
            name: 'Fit Test (Dance Pop up African) x 3',
        },
        {
            key: '7',
            day: <span><span style={{ display: 'inline-block' }} className="desktop-only">Day</span> 7</span>,
            name: 'Rest',
        },
    ];


    const columns = [
        {
            title: 'Day',
            dataIndex: 'day',
            key: 'day',
        },
        {
            title: 'Video Name',
            dataIndex: 'name',
            key: 'name',
        }
    ];


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
            <Nav />
            <div className="main_info videos-specific-page">
                <div className="">
                    <div className="contai">
                        <div className="profile-data-display">
                            <div className="main-video-display pt_5 pb_5">
                                <div className="contain">
                                    <div className="main-video-content-display">
                                        <div className="main-video-content-list">
                                            <ul>
                                                <li className="active-bar">
                                                    <Link>All Videos</Link>
                                                </li>
                                                <li className="">
                                                    <Link>Free Videos</Link>
                                                </li>
                                                <li className="">
                                                    <Link>Paid Videos</Link>
                                                </li>
                                                <li>
                                                    <Link>Dance Trends</Link>
                                                </li>
                                                <li>
                                                    <Link>Dance Choreographies</Link>
                                                </li>
                                                <li>
                                                    <Link>Dance Blast</Link>
                                                </li>
                                                <li>
                                                    <Link>Recent Videos</Link>
                                                </li>
                                                <li>
                                                    <Link>Fitness Videos</Link>
                                                </li>
                                                <li>
                                                    <Link>Short Videos</Link>
                                                </li>
                                                <li>
                                                    <Link>Beginner</Link>
                                                </li>
                                                <li>
                                                    <Link>African Dance</Link>
                                                </li>
                                                <li>
                                                    <Link>Free Videos</Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="main-video-content">
                                            <div className="main-content-banner">

                                            </div>
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
                                                {/* <button>Social Interaction</button> */}
                                                {/* <button>Weight Loss</button>
                                                <button>Weight Loss</button>
                                                <button>Weight Loss</button>
                                                <button>Weight Loss</button>
                                                <button>Weight Loss</button>
                                                <button>Weight Loss</button>
                                                <button>Weight Loss</button>
                                                <button>Weight Loss</button>
                                                <button>Weight Loss</button>
                                                <button>Weight Loss</button>
                                                <button>Weight Loss</button>
                                                <button>Weight Loss</button>
                                                <button>Weight Loss</button> */}
                                            </div>
                                            <div className="grid-3">
                                                {
                                                    filter === "all" ?
                                                        videoBox.map((productPlans, index) => (
                                                            <div key={index}>
                                                                <Link to={props.auth.isAuthenticated ?
                                                                    `/profile/video/play/${productPlans._id}/${productPlans.title}` : `/signin?auth_redirect=/profile/video/play/${productPlans._id}/${productPlans.title}`}>
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
                                                                                        {
                                                                                            productPlans.amount !== 0 ?
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
                                                                </Link>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal title={null} footer={null} open={isModalOpen} className="video-calendar" size="large"
                onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
                <div>
                    <Tabs type="card">
                        <Tabs.TabPane tab="Month 1" key="1">
                            <div className="inner-fragment">
                                <Tabs type="card">
                                    <Tabs.TabPane tab="Week 1" key="1">
                                        <Table dataSource={week1month1} columns={columns} bordered />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Week 2" key="2">
                                        <Table dataSource={week2month1} columns={columns} bordered />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Week 3" key="3">
                                        <Table dataSource={week3month1} columns={columns} bordered />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Week 4" key="4">
                                        <Table dataSource={week4month1} columns={columns} bordered />
                                    </Tabs.TabPane>
                                </Tabs>
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Month 2" key="2">
                            <div className="inner-fragment">
                                <Tabs type="card">
                                    <Tabs.TabPane tab="Week 1" key="1">
                                        <Table dataSource={week1month2} columns={columns} bordered />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Week 2" key="2">
                                        <Table dataSource={week2month2} columns={columns} bordered />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Week 3" key="3">
                                        <Table dataSource={week3month2} columns={columns} bordered />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Week 4" key="4">
                                        <Table dataSource={week4month2} columns={columns} bordered />
                                    </Tabs.TabPane>
                                </Tabs>
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Month 3" key="3">
                            <div className="inner-fragment">
                                <Tabs type="card">
                                    <Tabs.TabPane tab="Week 1" key="1">
                                        <Table dataSource={week1month3} columns={columns} bordered />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Week 2" key="2">
                                        <Table dataSource={week2month3} columns={columns} bordered />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Week 3" key="3">
                                        <Table dataSource={week3month3} columns={columns} bordered />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Week 4" key="4">
                                        <Table dataSource={week4month3} columns={columns} bordered />
                                    </Tabs.TabPane>
                                </Tabs>
                            </div>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </Modal>
            <Footer noMargin={true} />
        </div>
    )
}

const mapStateToProps = store => {
    return { auth: store.auth }
}

export default connect(mapStateToProps)(VideosPage);