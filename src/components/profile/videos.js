import "./profile.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Skeleton, notification, Input, Divider, Modal, Table, Tabs } from 'antd';
import AppRoute from "../../utils/routes";
import Footer from "../../utils/footer";
import { DateTime } from 'luxon';
import { Controller, useForm } from "react-hook-form";
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

    const { handleSubmit, control } = useForm({});
    const [currentNav, setCurrentNav] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);


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

    // calendar

    // month 1
    const week1month1 = [
        {
            key: '1',
            day: 'Day 1',
            name: 'Fit Test (Dance Pop-up African)',
        },
        {
            key: '2',
            day: 'Day 2',
            name: 'Dance Blast 1 + Core & Abs with Aniergy x 2',
        },
        {
            key: '3',
            day: 'Day 3',
            name: 'Dance Blast 1 + Diastasis Recti with Davinci x 2',
        },
        {
            key: '4',
            day: 'Day 4',
            name: 'Dance Blast 1 + Core & Abs with Aniergy x 2',
        },
        {
            key: '5',
            day: 'Day 5',
            name: 'Dance Blast 1 + Diastasis Recti with Davinci x 2',
        },
        {
            key: '6',
            day: 'Day 6',
            name: 'Dance Blast 1 + Core & Abs with Aniergy + Dance Choreography 1',
        },
        {
            key: '7',
            day: 'Day 7',
            name: 'Rest',
        },
    ];
    const week2month1 = [
        {
            key: '1',
            day: 'Day 1',
            name: 'Dance Blast 2 + Toned arms and legs with Charlie Brown x 2',
        },
        {
            key: '2',
            day: 'Day 2',
            name: 'Dance Blast 2 + Core & Abs with BJMIAH x 2',
        },
        {
            key: '3',
            day: 'Day 3',
            name: 'Dance Blast 2 + Toned arms and legs with Charlie Brown x 2',
        },
        {
            key: '4',
            day: 'Day 4',
            name: 'Dance Blast 2 + Core & Abs with BJMIAH x 2',
        },
        {
            key: '5',
            day: 'Day 5',
            name: 'Dance Blast 2 + Toned arms and legs with Charlie Brown x 2',
        },
        {
            key: '6',
            day: 'Day 6',
            name: 'Dance Blast 2 + Core & Abs with BJMIAH + Dance Choreography 1',
        },
        {
            key: '7',
            day: 'Day 7',
            name: 'Rest',
        },
    ];
    const week3month1 = [
        {
            key: '1',
            day: 'Day 1',
            name: 'Fit Test (Dance Pop-up African)',
        },
        {
            key: '2',
            day: 'Day 2',
            name: 'Dance Blast 1 + Diastasis Recti with Davinci x 2',
        },
        {
            key: '3',
            day: 'Day 3',
            name: 'Dance Blast 1 + Core & Abs with Aniergy x 2',
        },
        {
            key: '4',
            day: 'Day 4',
            name: 'Dance Blast 1 + Diastasis Recti with Davinci x 2',
        },
        {
            key: '5',
            day: 'Day 5',
            name: 'Dance Blast 1 + Core & Abs with Aniergy x 2',
        },
        {
            key: '6',
            day: 'Day 6',
            name: 'Dance Blast 1 + Diastasis Recti with Davinci + Dance Choreography 1',
        },
        {
            key: '7',
            day: 'Day 7',
            name: 'Rest',
        },
    ];
    const week4month1 = [
        {
            key: '1',
            day: 'Day 1',
            name: 'Dance Blast 2 + Core & Abs with BJMIAH x 2',
        },
        {
            key: '2',
            day: 'Day 2',
            name: 'Dance Blast 2 + Toned arms and legs with Charlie Brown x 2',
        },
        {
            key: '3',
            day: 'Day 3',
            name: 'Dance Blast 2 + Core & Abs with BJMIAH x 2',
        },
        {
            key: '4',
            day: 'Day 4',
            name: 'Dance Blast 2 + Toned arms and legs with Charlie Brown x 2',
        },
        {
            key: '5',
            day: 'Day 5',
            name: 'Dance Blast 2 + Core & Abs with BJMIAH x 2',
        },
        {
            key: '6',
            day: 'Day 6',
            name: 'Dance Blast 2 + Toned arms and legs with Charlie Brown + Dance Choreography 1',
        },
        {
            key: '7',
            day: 'Day 7',
            name: 'Rest',
        },
    ];

    // month 2
    const week1month2 = [
        {
            key: '1',
            day: 'Day 1',
            name: 'Fit Test (Dance Pop-up African)',
        },
        {
            key: '2',
            day: 'Day 2',
            name: 'Dance Blast 3 + Stretch, Core and Abs with Aniergy x 2',
        },
        {
            key: '3',
            day: 'Day 3',
            name: 'Dance Blast 3 + Toned arms with Davinci x 2',
        },
        {
            key: '4',
            day: 'Day 4',
            name: 'Dance Blast 3 + Stretch, Core and Abs with Aniergy x 2',
        },
        {
            key: '5',
            day: 'Day 5',
            name: 'Dance Blast 3 + Toned arms with Davinci x 2',
        },
        {
            key: '6',
            day: 'Day 6',
            name: 'Dance Blast 3 + Stretch, Core and Abs with Aniergy + Dance Choreography 2',
        },
        {
            key: '7',
            day: 'Day 7',
            name: 'Rest',
        },
    ];
    const week2month2 = [
        {
            key: '1',
            day: 'Day 1',
            name: 'Dance Blast 4 + Core & Abs with Aniergy x 2',
        },
        {
            key: '2',
            day: 'Day 2',
            name: 'Dance Blast 4 + Toned arms and legs with Charlie Brown x 2',
        },
        {
            key: '3',
            day: 'Day 3',
            name: 'Dance Blast 4 + Core & Abs with Aniergy x 2',
        },
        {
            key: '4',
            day: 'Day 4',
            name: 'Dance Blast 4 + Diastasis Recti with Davinci x 2',
        },
        {
            key: '5',
            day: 'Day 5',
            name: 'Dance Blast 2 + Toned arms and legs with Charlie Brown x 2',
        },
        {
            key: '6',
            day: 'Day 6',
            name: 'Dance Blast 2 + Core & Abs with Aniergy + Dance Choreography 2',
        },
        {
            key: '7',
            day: 'Day 7',
            name: 'Rest',
        },
    ];
    const week3month2 = [
        {
            key: '1',
            day: 'Day 1',
            name: 'Fit Test (Dance Pop-up African) x 2',
        },
        {
            key: '2',
            day: 'Day 2',
            name: 'Dance Blast 3 + Toned arms with Davinci x 2',
        },
        {
            key: '3',
            day: 'Day 3',
            name: 'Dance Blast 3 + Stretch, Core and Abs with Aniergy x 2',
        },
        {
            key: '4',
            day: 'Day 4',
            name: 'Dance Blast 3 + Toned arms with Davinci x 2',
        },
        {
            key: '5',
            day: 'Day 5',
            name: 'Dance Blast 3 + Stretch, Core and Abs with Aniergy x 2',
        },
        {
            key: '6',
            day: 'Day 6',
            name: 'Dance Blast 3 + Toned arms with Davinci + Dance Choreography 2',
        },
        {
            key: '7',
            day: 'Day 7',
            name: 'Rest',
        },
    ];
    const week4month2 = [
        {
            key: '1',
            day: 'Day 1',
            name: 'Dance Blast 4 + Core & Abs with BJMIAH x 2',
        },
        {
            key: '2',
            day: 'Day 2',
            name: 'Dance Blast 4 + Diastasis Recti with Davinci x 2',
        },
        {
            key: '3',
            day: 'Day 3',
            name: 'Dance Blast 4 + Core & Abs with BJMIAH x 2',
        },
        {
            key: '4',
            day: 'Day 4',
            name: 'Dance Blast 4 + Diastasis Recti with Davinci x 2',
        },
        {
            key: '5',
            day: 'Day 5',
            name: 'Dance Blast 4 + Core & Abs with BJMIAH x 2',
        },
        {
            key: '6',
            day: 'Day 6',
            name: 'Dance Blast 4 + Diastasis Recti with Davinci + Dance Choreography 2',
        },
        {
            key: '7',
            day: 'Day 7',
            name: 'Rest',
        },
    ];

    // month 3
    const week1month3 = [
        {
            key: '1',
            day: 'Day 1',
            name: 'Fit Test (Dance Pop-up African) x 2',
        },
        {
            key: '2',
            day: 'Day 2',
            name: 'Dance Blast 1 + Core and Abs with Aniergy x 2',
        },
        {
            key: '3',
            day: 'Day 3',
            name: 'Dance Blast 1 + Diastasis Recti with Davinci x 2',
        },
        {
            key: '4',
            day: 'Day 4',
            name: 'Dance Blast 1 + Core and Abs with BJMIAH x 2',
        },
        {
            key: '5',
            day: 'Day 5',
            name: 'Dance Blast 1 + Toned arms and legs with Charlie Brown x 2',
        },
        {
            key: '6',
            day: 'Day 6',
            name: 'Dance Blast 1 + Stretch, Core and Abs with Aniergy + Dance Choreography 3',
        },
        {
            key: '7',
            day: 'Day 7',
            name: 'Rest',
        },
    ];
    const week2month3 = [
        {
            key: '1',
            day: 'Day 1',
            name: 'Dance Blast 2 + Toned arms with Davinci x 2',
        },
        {
            key: '2',
            day: 'Day 2',
            name: 'Dance Blast 2 + Stretch, Core and Abs with Aniergy x 2',
        },
        {
            key: '3',
            day: 'Day 3',
            name: 'Dance Blast 2 + Core & Abs with BJMIAH x 2',
        },
        {
            key: '4',
            day: 'Day 4',
            name: 'Dance Blast 2 + Diastasis Recti with Davinci x 2',
        },
        {
            key: '5',
            day: 'Day 5',
            name: 'Dance Blast 2 + Toned arms and legs with Charlie Brown x 2',
        },
        {
            key: '6',
            day: 'Day 6',
            name: 'Dance Blast 2 + Core & Abs with Aniergy + Dance Choreography 3',
        },
        {
            key: '7',
            day: 'Day 7',
            name: 'Rest',
        },
    ];
    const week3month3 = [
        {
            key: '1',
            day: 'Day 1',
            name: 'Fit Test (Dance Pop-up African) x 3',
        },
        {
            key: '2',
            day: 'Day 2',
            name: 'Dance Blast 3 + Core and Abs with Aniergy x 2',
        },
        {
            key: '3',
            day: 'Day 3',
            name: 'Dance Blast 3 + Diastasis Recti with Davinci x 2',
        },
        {
            key: '4',
            day: 'Day 4',
            name: 'Dance Blast 3 + Core and Abs with BJMIAH x 2',
        },
        {
            key: '5',
            day: 'Day 5',
            name: 'Dance Blast 3 + Toned arms and legs with Charlie Brown x 2',
        },
        {
            key: '6',
            day: 'Day 6',
            name: 'Dance Blast 3 + Stretch, Core and Abs with Aniergy + Dance Choreography 3',
        },
        {
            key: '7',
            day: 'Day 7',
            name: 'Rest',
        },
    ];
    const week4month3 = [
        {
            key: '1',
            day: 'Day 1',
            name: 'Dance Blast 4 + Toned arms with Davinci x 2',
        },
        {
            key: '2',
            day: 'Day 2',
            name: 'Dance Blast 4 + Core & Abs with BJMIAH x 2',
        },
        {
            key: '3',
            day: 'Day 3',
            name: 'Dance Blast 4 + Diastasis Recti with Davinci x 2',
        },
        {
            key: '4',
            day: 'Day 4',
            name: 'Dance Blast 4 + Toned arms and Legs with Charlie Brown x 2',
        },
        {
            key: '5',
            day: 'Day 5',
            name: 'Dance Blast 4 + Core & Abs with Aniergy + Dance Choreography 3',
        },
        {
            key: '6',
            day: 'Day 6',
            name: 'Fit Test (Dance Pop up African) x 3',
        },
        {
            key: '7',
            day: 'Day 7',
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
    const findVideoByName = (videoName) => {
        let newVideoBox = userPlans.filter(video => {
            if (video.title.toLowerCase().includes(videoName.toLowerCase())) {
                return video;
            }
        });
        console.log(newVideoBox);
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
                                                    <div className="video-calendar-block">
                                                        <div className="grid_flex">
                                                            <button
                                                                onClick={() => setIsModalOpen(true)}
                                                                className="btn_red">See Calendar <span>| <ion-icon name="calendar-outline"></ion-icon></span></button>
                                                            <div>
                                                                <form onSubmit={handleSubmit(findVideoByName)}>
                                                                    <div>
                                                                        <Controller name="email" defaultValue="" control={control}
                                                                            render={({ field }) => (
                                                                                <Input {...field} style={{ height: '4rem' }} />
                                                                            )}
                                                                        />
                                                                    </div>
                                                                    <button>Find Video</button>
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
                                                                                    {/* <img src={productPlans.poster} alt={productPlans.name} /> */}
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
                                                <div>
                                                    <h1>Dancerapy Products and Services</h1>
                                                    <div className="grid_3">
                                                        <div className="dancerapy-products">
                                                            <div className="text-block">
                                                                <h2>Annual Online Subscription</h2>
                                                                <p>Join The Dancerapy Club Today and have access to over 30 Dance Fitness
                                                                    Videos, Dance Choreophgries, Dance Trends and lots more monthly.</p>
                                                                <Link to="/products/detail?productName=Dancerapy%20Club%20Annual%20Online%20Subscription&productId=1">See More <ion-icon name="arrow-forward-outline"></ion-icon></Link>
                                                            </div>
                                                            <div className="chow-1"></div>
                                                        </div>
                                                        <div className="dancerapy-products">
                                                            <div className="text-block">
                                                                <h2>Dance in a Flash</h2>
                                                                <p>Join The Dancerapy Club Today and have access to over 30 Dance Fitness
                                                                    Videos, Dance Choreophgries, Dance Trends and lots more monthly.</p>
                                                                <Link to="/products/detail?productName=Dance%20in%20a%20Flash%20-%20Delivered%20to%20your%20Doorstep&productId=2">See More <ion-icon name="arrow-forward-outline"></ion-icon></Link>
                                                            </div>
                                                            <div className="chow-2"></div>
                                                        </div>
                                                        <div className="dancerapy-products">
                                                            <div className="text-block">
                                                                <h2>Dancerapy live on Zoom</h2>
                                                                <p>Join The Dancerapy Club Today and have access to over 30 Dance Fitness
                                                                    Videos, Dance Choreophgries, Dance Trends and lots more monthly.</p>
                                                                <Link to="/products/detail?productName=Join%20Dancerapy%20live%20on%20Zoom&productId=3">See More <ion-icon name="arrow-forward-outline"></ion-icon></Link>
                                                            </div>
                                                            <div className="chow-3"></div>
                                                        </div>
                                                        <div className="dancerapy-products">
                                                            <div className="text-block">
                                                                <h2>Dancerapy Physical class</h2>
                                                                <p>Join The Dancerapy Club Today and have access to over 30 Dance Fitness
                                                                    Videos, Dance Choreophgries, Dance Trends and lots more monthly.</p>
                                                                <Link to="/products/detail?productName=Join%20Dancerapy%20Physical%20Class&productId=4">See More <ion-icon name="arrow-forward-outline"></ion-icon></Link>
                                                            </div>
                                                            <div className="chow-1"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Modal title={null} footer={null} open={isModalOpen} className="products-cart"
                onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
                <div>
                    <Tabs type="card">
                        <Tabs.TabPane tab="Month 1" key="1">
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
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Month 2" key="2">
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
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Month 3" key="3">
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
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </Modal>
            <Footer />
        </div>
    )
}

const mapStateToProps = store => {
    return { auth: store.auth }
}

export default connect(mapStateToProps)(VirtualSubcriptions);