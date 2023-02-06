import React, { useEffect, useState } from "react";

import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Controller, useForm } from 'react-hook-form';
import { Skeleton, notification, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from '../../utils/axiosCall';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Divider, Rate } from "antd";
import ReactPlayer from 'react-player/lazy';
import { Player, ControlBar } from 'video-react';
import { PaystackButton } from 'react-paystack';
import axiosCall from "../../utils/axiosCall";
import Empty from '../../assets/images/empty_history.svg';

// import testimonialVideo from "../../assets/images/content/testimonial.mp4";
import Footer from "../../utils/footer";
import Nav from "../../utils/sec-nav";
import { connect } from "react-redux";
import AppRoute from "../../utils/routes";

const PlanDetail = props => {

    const Navigate = useNavigate();
    const antIcon = (<LoadingOutlined style={{ fontSize: 24 }} spin />);
    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };
    const publicKey = "pk_test_6001cfe393365d476119a4e494f32bcb1290cfea";
    const [amount, setAmount] = useState(0); // Remember, set in kobo!
    const [userData] = useState(props.auth.isAuthenticated ? props.auth.userDetails : '');
    const [loaderSpinning, setLoaderSpinning] = useState(false);

    const [searchParams] = useSearchParams();
    const [coursePlans, setCoursePlans] = useState({});
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);
    const [activePlan, setActivePlan] = useState(false);
    const [productNotFound, setProductNotFound] = useState(false);

    useEffect(() => {
        let productId = searchParams.get('productId');
        axiosCall.get(`/fetchcourseplan/${productId}`)
            .then(coursePlans => {
                if (coursePlans.data.statusMessage === "success") {
                    if (coursePlans.data.message === null) {
                        setProductNotFound(true);
                    } else {
                        setCoursePlans(coursePlans.data.message);
                        let planAmount = coursePlans.data.message.discount ? ((coursePlans.data.message.discount * coursePlans.data.message.price) / 100) : coursePlans.data.message.price;
                        setAmount(`${planAmount}00`);
                    }
                    setErrorOccurred(false);
                    setFetchingData(false);
                } else {
                    setErrorOccurred(true);
                    setFetchingData(false);
                    openNotificationWithIcon('error', coursePlans.data.summary);
                }
            })
            .catch(err => {
                console.log(err)
                setErrorOccurred(true);
                setFetchingData(false);
                openNotificationWithIcon('error', 'An error occurred while fetching product plans. Please reload page to try again')
            })
        if (props.auth.isAuthenticated) {
            axiosCall.post('/checkcoursepurchase', {
                coursePlanId: productId,
                userId: userData.id,
            })
                .then(coursePlans => {
                    if (coursePlans.data.statusMessage === "success") {
                        if (coursePlans.data.message) {
                            setActivePlan(true)
                        }
                    } else {
                        openNotificationWithIcon('error', coursePlans.data.summary);
                    }
                })
                .catch(err => {
                    openNotificationWithIcon('error', 'An error occurred while checking product plans. Please reload page to try again')
                })
        }
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
                axiosCall.post(`/buycourseplan`, {
                    coursePlanId: coursePlans.id,
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
    return (
        <div>
            <Spin indicator={antIcon} spinning={loaderSpinning}>
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
                            !productNotFound ?
                                <div>
                                    <div className="plan_group">
                                        <div className="grid_2">
                                            <div className="plan_bg">
                                                <div className="plan_props_detail">
                                                    <h1>{coursePlans.title}</h1>
                                                    <p>
                                                        {coursePlans.description}
                                                    </p>
                                                    <div className="course_prop">
                                                        <ul>
                                                            <li><ion-icon name="calendar-outline"></ion-icon> Last updated: 08/08/2022</li>
                                                            <li><ion-icon name="language-outline"></ion-icon> English</li>
                                                            <li><ion-icon name="videocam-outline"></ion-icon> 80+ videos</li>
                                                        </ul>
                                                    </div>
                                                    {
                                                        props.auth.isAuthenticated ?
                                                            activePlan ? <button disabled className="btn_red">You have an Active Plan</button>
                                                                :
                                                                <PaystackButton className="btn_red" {...componentProps} />
                                                            :
                                                            <Link className="btn_red" to={AppRoute.signin}>Buy Plan</Link>
                                                    }
                                                </div>
                                            </div>
                                            <div className="story_bg">

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
                                                                <span className="second_span"><Rate disabled defaultValue={5} /></span></li>
                                                            <li className="course_fitness_props">
                                                                <span className="first_span">Cardio</span>
                                                                <span className="second_span"></span><Rate disabled defaultValue={5} /></li>
                                                            <li className="course_fitness_props">
                                                                <span className="first_span">Muscle Toning</span>
                                                                <span className="second_span"><Rate disabled defaultValue={5} /></span></li>
                                                            <li className="course_fitness_props">
                                                                <span className="first_span">Interval Training</span>
                                                                <span className="second_span"><Rate disabled defaultValue={5} /></span></li>
                                                            <li className="course_fitness_props">
                                                                <span className="first_span">Muscle Memory</span>
                                                                <span className="second_span"><Rate disabled defaultValue={5} /></span></li>
                                                            <li className="course_fitness_props">
                                                                <span className="first_span">Mind and Body Coordination</span>
                                                                <span className="second_span"><Rate disabled defaultValue={5} /></span></li>
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
                                                            <video
                                                                src="https://lagostheatrevideos.s3.amazonaws.com/testimonial.mp4"
                                                                autoPlay={false} style={{ background: 'black' }} playsInline={true} controls />
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
                                :
                                <div className="center_align_message">
                                    <div>
                                        <img src={Empty} alt="empty" />
                                        <p>An error occurred while we were trying to fetch data. Please return to previous
                                            page to try again.</p>
                                    </div>
                                </div>
                }
                <Footer />
            </Spin>
        </div>
    )
}

const mapStateToProps = store => {
    return { auth: store.auth }
}

export default connect(mapStateToProps)(PlanDetail);