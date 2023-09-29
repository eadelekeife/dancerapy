import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Skeleton, notification, Input, Divider, Modal, Table, Tabs, Spin, Checkbox } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import AppRoute from "../utils/routes";
import OwlCarousel from 'react-owl-carousel';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/footer";
import { DateTime } from 'luxon';
import { Controller, useForm } from "react-hook-form";
import Nav from "../components/nav";
import AllAppRoutes from "../utils/routes";

import Logo from "../assets/images/logo.jpg";
import Empty from "../assets/images/auth/empty.svg";
import _1 from "../assets/images/content/_1.avif";
import _2 from "../assets/images/content/_2.avif";
import VideoBanner from "../assets/images/homepage/95.jpg";
import VideoBannerMobile from "../assets/images/homepage/96.jpg";
import ArrowLeft from "../assets/images/arrow-left.svg";
import axiosCall from "../utils/axiosCall";
import { _fetch_app_videos } from "../utils/axiosroutes";

import { ReactComponent as Headphones } from "../assets/images/icons/filter-icons/headphones-t.svg";
import { ReactComponent as Eye } from "../assets/images/icons/filter-icons/eye-t.svg";
import { ReactComponent as Gear } from "../assets/images/icons/filter-icons/gear-t.svg";
import { ReactComponent as LockOpened } from "../assets/images/icons/filter-icons/lock-opened-t.svg";
import { ReactComponent as Lock } from "../assets/images/icons/filter-icons/lock-t.svg";
import { ReactComponent as Microphones } from "../assets/images/icons/filter-icons/microphone-t.svg";
import { ReactComponent as Rocket } from "../assets/images/icons/filter-icons/rocket-t.svg";
import { ReactComponent as Star } from "../assets/images/icons/filter-icons/star-t.svg";
import { ReactComponent as Focus } from "../assets/images/icons/filter-icons/focus-t.svg";
import { ReactComponent as Clock } from "../assets/images/icons/filter-icons/clock-t.svg";
import { ReactComponent as GearAlt } from "../assets/images/icons/filter-icons/gear-alt-t.svg";

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

    const [fixedNav, setFixed] = useState(false);

    const { handleSubmit, control, setValue } = useForm({});
    const [currentNav, setCurrentNav] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videoBox, setVideoBox] = useState([]);
    const [filteredVideos, setFilteredVideos] = useState([]);
    const [searchVideoDisplay, setSearchVideoDisplay] = useState(false);
    const [searchedVideos, setSearchedVideo] = useState([]);
    const [loadingSearchButton, setLoadingSearchButton] = useState(false);
    const [showTrends, setShowTrends] = useState(true);
    const [showFitness, setShowFitness] = useState(true);
    const [searchKey, setSearchKey] = useState('');
    const [filteredTrendsVideos, setFilteredTrendsVideos] = useState([]);

    const [userPlans, setUserPlans] = useState([]);
    const [loadingVideos, setLoadingVideos] = useState(true);
    const [userData] = useState(props.auth.isAuthenticated ? props.auth.userDetails : '');
    const [currentVideo, setCurrentVideo] = useState({});
    const [currFilter, setCurrFilter] = useState('all');
    const [trendVideos, setTrendVideos] = useState([]);
    const [fitnessVideos, setFitnessVideos] = useState([]);
    const [filterTag, setFilterTag] = useState('all');

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        stagePadding: 20,
        margin: 20
    };

    const fetchUserVideosData = async () => {
        try {
            let videoTempData = await _fetch_app_videos();
            if (videoTempData.data.statusMessage === "success") {
                // setVideoBox(videoTempData.data.message);
                let trends = [];
                let fitness = [];
                videoTempData.data.message.forEach(video => {
                    if (video.videoCategory.name === "Dance Trends") {
                        trends.push(video);
                    } else {
                        fitness.push(video);
                    }
                })
                setTrendVideos(trends);
                setFilteredTrendsVideos(trends);
                setFitnessVideos(fitness);
                setFilteredVideos(fitness);
                setVideoBox(fitness);
                setLoadingVideos(false);
            } else {
                setLoadingVideos(false);
                openNotificationWithIcon('error', userPlans.data.summary);
            }
        } catch (err) {
            setLoadingVideos(false);
            openNotificationWithIcon('error', 'An error occurred while fetching data. Please reload to try again');
        }
    }

    const responsive = {
        0: {
            items: 2,
            nav: false,
            margin: 10,
            stagePadding: 15,
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

    const updateCurrentVideo = e => {
        setCurrentVideo(e);
        // setOpenVideoPurchaseModal(true);
    }

    useEffect(() => {
        fetchUserVideosData();
    }, [])

    let skeleton = [];
    for (let i = 0; i < 12; i++) {
        skeleton.push(
            <div>
                <Skeleton.Image active />
                <div style={{ marginTop: 10 }}></div>
                <Skeleton.Button style={{ width: '100%' }} active />
            </div>
        )
    }

    const filterVideos = filter => {
        setCurrFilter(filter);
        if (filter === "all") {
            setShowTrends(true);
            setShowFitness(true);
            setFilterTag('all');
            setFilteredVideos(videoBox);
            setFilteredTrendsVideos(trendVideos);
        } else if (filter === "free") {
            let newVideoBox = [];
            let newTrendBox = [];
            videoBox.filter(videos => {
                if (videos.amount === 0) newVideoBox.push(videos);
            })
            trendVideos.filter(videos => {
                if (videos.amount === 0) newTrendBox.push(videos);
            })
            setFilterTag('Free Videos');
            setShowTrends(true);
            setShowFitness(true);
            setFilteredVideos(newVideoBox);
            setFilteredTrendsVideos(newTrendBox);
        } else if (filter === "paid") {
            let newVideoBox = [];
            let newTrendBox = [];
            videoBox.filter(videos => {
                if (videos.amount !== 0) newVideoBox.push(videos);
            })
            trendVideos.filter(videos => {
                if (videos.amount !== 0) newTrendBox.push(videos);
            })
            setShowTrends(true);
            setShowFitness(true);
            setFilterTag('Paid Videos');
            setFilteredVideos(newVideoBox);
            setFilteredTrendsVideos(newTrendBox);
        } else if (filter === "trends") {
            let newVideoBox = [];
            videoBox.filter(videos => {
                if (videos.videoCategory.name === "Dance Trends") newVideoBox.push(videos);
            })
            setShowTrends(true);
            setShowFitness(false);
            setFilterTag('Dance Trends');
            setFilteredVideos(newVideoBox);
            setFilteredTrendsVideos(trendVideos);
        } else if (filter === "choreography") {
            let newVideoBox = [];
            videoBox.filter(videos => {
                if (videos.videoCategory.name === "Dance Choreographies") newVideoBox.push(videos);
            })
            setShowTrends(false);
            setShowFitness(true);
            setFilterTag('Choreographies');
            setFilteredVideos(newVideoBox);
            setFilteredTrendsVideos(trendVideos);
        } else if (filter === "blast") {
            let newVideoBox = [];
            videoBox.filter(videos => {
                if (videos.videoCategory.name === "10 mins Dance Blast") newVideoBox.push(videos);
            })
            setShowTrends(false);
            setShowFitness(true);
            setFilterTag('10 mins Dance Blast');
            setFilteredVideos(newVideoBox);
            setFilteredTrendsVideos(trendVideos);
        } else if (filter === "fitness") {
            let newVideoBox = [];
            videoBox.filter(videos => {
                if (videos.videoCategory.name !== "Dance Trends") newVideoBox.push(videos);
            })
            setShowTrends(false);
            setShowFitness(true);
            setFilterTag('Fitness Videos');
            setFilteredVideos(newVideoBox);
            setFilteredTrendsVideos(trendVideos);
        } else if (filter === "short") {
            let newVideoBox = [];
            videoBox.filter(videos => {
                if (+videos.videoLength.split(':')[0] < 3) newVideoBox.push(videos);
            })
            setShowTrends(true);
            setShowFitness(false);
            setFilterTag('Short Videos');
            setFilteredVideos(newVideoBox);
            setFilteredTrendsVideos(trendVideos);
        } else if (filter === "beginner") {
            setFilteredVideos(videoBox);
            setShowTrends(true);
            setShowFitness(true);
            setFilterTag('Beginners');
            setFilteredTrendsVideos(trendVideos);
        } else if (filter === "african") {
            setFilteredVideos(videoBox);
            setShowTrends(true);
            setShowFitness(true);
            setFilterTag('African Music');
            setFilteredTrendsVideos(trendVideos);
        } else if (filter === "hiphop") {
            setFilteredVideos(videoBox);
            setShowTrends(true);
            setShowFitness(true);
            setFilterTag('Hip Hop Songs');
            setFilteredTrendsVideos(trendVideos);
        } else if (filter === "long") {
            let newVideoBox = [];
            videoBox.filter(videos => {
                if (+videos.videoLength.split(':')[0] > 7) newVideoBox.push(videos);
            })
            setShowTrends(false);
            setShowFitness(true);
            setFilteredVideos(newVideoBox);
            setFilterTag('Long Videos');
            setFilteredTrendsVideos(trendVideos);
        }
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

    const onChange = () => { }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const offset = window.scrollY;
            if (offset > 200) {
                setFixed(true);
            }
            else {
                setFixed(false);
            }
        })
    }, [])

    return (
        <div className="only-videos-display">
            <Nav pageFixedNav={true} />
            {/* <div className="extensive-contain">
                <div className="extensive-bg">
                    <div className={`nav-block ${fixedNav ? 'fixed' : ''}`}>
                        <div className="nav-block-sect">
                            <div className="logo">
                                <Link to="/">
                                    <img src={Logo} alt="dancerapy logo" />
                                </Link>
                            </div>
                            <ul>
                                <li>
                                    <Link to={AllAppRoutes.appVideos}>Fitness Videos</Link>
                                </li>
                                <li>
                                    <Link to={AllAppRoutes.about_us}>Who We Are</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="desktop-onl">
                            <ul>
                                <li>
                                    <Link to={AllAppRoutes.contact_us}>Contact Us</Link>
                                </li>
                                <li>
                                    <Link to={AllAppRoutes.our_team}>Our Team</Link>
                                </li>
                                <li>
                                    <Link to={AllAppRoutes.merch}>Merchandise</Link>
                                </li>
                                {
                                    props.auth.isAuthenticated ?
                                        <React.Fragment>
                                            <li className="bg-auth" style={{ textAlign: 'center' }}>
                                                <Link activeClassName="active-nav"
                                                    to="/dash" className="bg-auth">
                                                    <span className="active-user">
                                                        Hi, {props.auth.userDetails.firstName} {props.auth.userDetails.lastName}</span>
                                                </Link>
                                            </li>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <li>
                                                <Link to={AllAppRoutes.sign_in}>Log In</Link>
                                            </li>
                                            <li className="bg-auth">
                                                <Link to={AllAppRoutes.sign_up}>Create Account</Link>
                                            </li>
                                        </React.Fragment>
                                }
                            </ul>
                        </div>
                    </div>
                    <div>
                        <p>Home — Explore our resources</p>
                        <h2>Exclusive dance fitness videos that help you achieve your fitness goals</h2>
                    </div>
                </div>
            </div> */}
            {/* <div>
                <div className="extensive-contain"> */}
            {/* <div className="video-div main-video-display"> */}
            <div className="side-filter">
                <div className="contain">
                    <div className="extensive-grid-filter">
                        <div className="extensive-grid-body">
                            <h4>FILTER BY:</h4>
                            <div className="main-video-content-list">
                                <ul>
                                    <li
                                        onClick={() => filterVideos("all")}
                                        className={`${currFilter === "all" ? "active-bar" : ''}`}>
                                        <Link><Focus /> All Videos</Link>
                                    </li>
                                    <li
                                        onClick={() => filterVideos("free")}
                                        className={`${currFilter === "free" ? "active-bar" : ''}`}>
                                        <Link><LockOpened /> Free Videos</Link>
                                    </li>
                                    <li
                                        onClick={() => filterVideos("paid")}
                                        className={`${currFilter === "paid" ? "active-bar" : ''}`}>
                                        <Link><Lock /> Paid Videos</Link>
                                    </li>
                                    <li
                                        onClick={() => filterVideos("trends")}
                                        className={`${currFilter === "trends" ? "active-bar" : ''}`}>
                                        <Link><Headphones /> Dance Trends</Link>
                                    </li>
                                    <li
                                        onClick={() => filterVideos("choreography")}
                                        className={`${currFilter === "choreography" ? "active-bar" : ''}`}>
                                        <Link><Eye /> Dance Choreographies</Link>
                                    </li>
                                    <li
                                        onClick={() => filterVideos("blast")}
                                        className={`${currFilter === "blast" ? "active-bar" : ''}`}>
                                        <Link><Microphones /> Dance Blast</Link>
                                    </li>
                                    {/* <li
                                        onClick={() => filterVideos("long")}
                                        className={`${currFilter === "long" ? "active-bar" : ''}`}>
                                        <Link><Gear /> 10 min Videos</Link>
                                    </li> */}
                                    <li
                                        onClick={() => filterVideos("fitness")}
                                        className={`${currFilter === "fitness" ? "active-bar" : ''}`}>
                                        <Link><GearAlt /> Fitness Videos</Link>
                                    </li>
                                    {/* <li
                                        onClick={() => filterVideos("short")}
                                        className={`${currFilter === "short" ? "active-bar" : ''}`}>
                                        <Link><Clock /> Short Videos</Link>
                                    </li> */}
                                    {/* <li
                                        onClick={() => filterVideos("beginner")}
                                        className={`${currFilter === "beginner" ? "active-bar" : ''}`}>
                                        <Link><Rocket /> Beginner</Link>
                                    </li> */}
                                    {/* <li
                                        onClick={() => filterVideos("african")}
                                        className={`${currFilter === "african" ? "active-bar" : ''}`}>
                                        <Link><Star /> African Dance</Link>
                                    </li> */}
                                    {/* <li
                            onClick={() => filterVideos("hiphop")}
                            className={`${currFilter === "hiphop" ? "active-bar" : ''}`}>
                            <Link>Hip Hop</Link>
                        </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-vid-content">
                <div className="extensive-video-display-gri main-video-content-display">
                    <div>
                        <div className="videos-display main-video-content">
                            <div className="contain">
                                <div className="main-content-banner">
                                    <div className="desktop-only">
                                        <img src={VideoBanner} alt="video banner" />
                                    </div>
                                    <div className="mobile-only">
                                        <img src={VideoBannerMobile} alt="video banner" />
                                    </div>
                                </div>
                                {
                                    !loadingVideos ?
                                        <div>
                                            <div>
                                                {showTrends ?
                                                    filteredTrendsVideos.length ?
                                                        <div>
                                                            <h4 className="page-tile">{filterTag === "all" ? "Dance Trend Videos" : filterTag}</h4>
                                                            <div>

                                                                <OwlCarousel className="owl-theme" lazyLoad={true}
                                                                    responsive={responsive} autoPlay={true}
                                                                    responsiveClass={true} loop={true} margin={10}>
                                                                    {
                                                                        filteredTrendsVideos.map((productPlans, index) => (
                                                                            <div className="card-display" key={index}>
                                                                                <Link to={`/profile/video/play/${productPlans._id}/${productPlans.title}`}>
                                                                                    <div class='item'>
                                                                                        <img src={productPlans.poster} alt={productPlans.title} />
                                                                                        {
                                                                                            productPlans?.amount !== 0 ?
                                                                                                <div className="card-header-fee">
                                                                                                    <div className="card-header-cover">
                                                                                                        <ion-icon name="lock-closed-outline"></ion-icon>
                                                                                                    </div>
                                                                                                </div>
                                                                                                : ''
                                                                                        }
                                                                                    </div>
                                                                                </Link>
                                                                            </div>
                                                                        ))}
                                                                </OwlCarousel>
                                                            </div>
                                                        </div>
                                                        : ''
                                                    : ''
                                                }
                                            </div>
                                            <div className="mt_5">
                                                {showFitness ?
                                                    <>
                                                        <h4 className="page-tile">{filterTag === "all" ? "Fitness Videos" : filterTag}</h4>
                                                        <div className="grid-4">
                                                            {
                                                                filteredVideos.map((productPlans, index) => (
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
                                                                                                            <ion-icon name="lock-closed-outline"></ion-icon>
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
                                                    </> : ""
                                                }
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
            {/* </div>
            </div> */}
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
            <div className="mobile-only">
                <div className="mt_5"></div>
                <Footer noMargin={true} />
            </div>
        </div>
    )
}

const mapStateToProps = store => {
    return { auth: store.auth }
}

export default connect(mapStateToProps)(VideosPage);