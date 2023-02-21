
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

import locationMap from "../../assets/images/mini/locationmap.jpg";
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
    useEffect(() => {
        let videoId = searchParams.get('videoId');
        // video/:videoId
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
    }, [])
    const componentProps = {
        email: userData.emailAddress,
        amount,
        metadata: {
            name: userData.firstName + ' ' + userData.lastName,
            phone: userData?.phoneNumber,
        },
        publicKey,
        text: "Buy Plan",
        onSuccess: (paymentData) => {
            if (paymentData.status === "success") {
                setLoaderSpinning(true)
                axiosCall.post(`/buyproduct`, {
                    productPlanId: productPlans.id,
                    userId: userData.id,
                    transId: paymentData.trxref
                })
                    .then(coursePlans => {
                        if (coursePlans.data.statusMessage === "success") {
                            Navigate(AppRoute.plansuccess);
                        } else {
                            openNotificationWithIcon('error', coursePlans.data.summary);
                            setLoaderSpinning(false);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        openNotificationWithIcon('error', 'An error occurred while completing product purchase. Please try again')
                        setLoaderSpinning(false);
                    })
            }
        },
        // alert("Thanks for doing business with us! Come back soon!!"),
        onClose: () => openNotificationWithIcon('error', 'Transaction cancelled'),
    }
    let skeleton = [];
    for (let i = 0; i < 6; i++) {
        skeleton.push(<Skeleton active />)
    }
    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            src: productPlans.videoLink,
            type: 'video/mp4'
        }]
    };
    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            VideoJS.log('player is waiting');
        });

        player.on('dispose', () => {
            VideoJS.log('player will dispose');
        });
    };
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
                            <div className="plan_group">
                                <div className="grid_2">
                                    <div className="plan_bg">
                                        <div className="plan_props_detail">
                                            <h1>{productPlans.title}</h1>
                                            <p>
                                                Join The Dancerapy Club Today and have access to over 30 Dance
                                                Fitness Videos, Dance Choreophgries, Dance Trends and lots more monthly.
                                            </p>
                                            <div className="course_prop">
                                                <ul>
                                                    <li><ion-icon name="calendar-outline"></ion-icon> Last updated: 08/08/2022</li>
                                                    <li><ion-icon name="language-outline"></ion-icon> English</li>
                                                    <li><ion-icon name="videocam-outline"></ion-icon> 80+ videos</li>
                                                </ul>
                                            </div>
                                            <Link className="btn_red" to={AppRoute.merch}>Buy Merchandise</Link>
                                        </div>
                                    </div>
                                    <div data-vjs-player>
                                        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                                    </div>
                                </div>
                            </div>
                            <div className="detail_props pt-3">
                                <div className="contain">
                                    <div className="grid_3">
                                        <div className="plan_story_block">
                                            <div className="block_header">
                                                <h3>About Dancerapy</h3>
                                            </div>
                                            <Divider style={{ marginTop: 0, marginBottom: 0 }} />
                                            <div className="block_body">
                                                <div>
                                                    <h4>Our Mission Statement</h4>
                                                    <p>
                                                        To ensure that people have access to
                                                        DANCERAPY worldwide through our S.T.U.N.D (Studio Next Door Program)
                                                    </p>
                                                </div>
                                                <div>
                                                    <h4>Our Vision Statement</h4>
                                                    <p>
                                                        To ensure that dance fitness becomes a lifestyle for
                                                        everyone, millions of people around the world thereby increasing life
                                                        expectancy by 15 – 20%.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="plan_story_block">
                                            <div className="block_header">
                                                <h3>About Dance Plan</h3>
                                            </div>
                                            <Divider style={{ marginTop: 0, marginBottom: 0 }} />
                                            <div className="block_body">
                                                <ul>
                                                    <li className="course_fitness_props">
                                                        <span className="first_span">Flexibility</span>
                                                        <span className="second_span"><Rate allowHalf defaultValue={5} /></span></li>
                                                    <li className="course_fitness_props">
                                                        <span className="first_span">Cardio</span>
                                                        <span className="second_span"></span><Rate allowHalf defaultValue={5} /></li>
                                                    <li className="course_fitness_props">
                                                        <span className="first_span">Muscle Toning</span>
                                                        <span className="second_span"><Rate allowHalf defaultValue={5} /></span></li>
                                                    <li className="course_fitness_props">
                                                        <span className="first_span">Interval Training</span>
                                                        <span className="second_span"><Rate allowHalf defaultValue={5} /></span></li>
                                                    <li className="course_fitness_props">
                                                        <span className="first_span">Muscle Memory</span>
                                                        <span className="second_span"><Rate allowHalf defaultValue={5} /></span></li>
                                                    <li className="course_fitness_props">
                                                        <span className="first_span">Mind and Body Coordination</span>
                                                        <span className="second_span"><Rate allowHalf defaultValue={5} /></span></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="plan_story_block">
                                            <div className="block_header">
                                                <h3>Dance Testimonials</h3>
                                            </div>
                                            <Divider style={{ marginTop: 0, marginBottom: 0 }} />
                                            <div className="block_body">
                                                <div className="black_div">
                                                    <video src="https://lagostheatrevideos.s3.amazonaws.com/testimonial.mp4" controls />
                                                </div>
                                                {/* <ul style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <li><ion-icon name="call-outline"></ion-icon>: +234 803 432 6227</li>
                                                    <li><ion-icon name="mail-outline"></ion-icon>: info@dancerapy.com</li>
                                                </ul> */}
                                            </div>
                                        </div>
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