import React, { useEffect, useState } from "react";

import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Controller, useForm } from 'react-hook-form';
import { Skeleton, notification, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
// import axios from '../../utils/axiosCall';

import { Divider, Rate } from "antd";
import { PaystackButton } from 'react-paystack';
import axiosCall from "../utils/axiosCall";
import Empty from '../assets/images/empty_history.svg';
import { ReactComponent as NavigationIcon } from "../assets/images/navigation.svg";
import { ReactComponent as CheckmarkIcon } from "../assets/images/check.svg";

// import testimonialVideo from "../assets/images/content/testimonial.mp4";
import Footer from "../components/footer";
import Nav from "../components/nav";
import { connect } from "react-redux";
import AppRoute from "../utils/routes";

const PhysicalProductDetail = props => {

    const Navigate = useNavigate();
    const antIcon = (<LoadingOutlined style={{ fontSize: 24 }} spin />);
    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };
    const publicKey = process.env.REACT_APP_DANCERAPY_PAYMENT_KEY;
    const [amount, setAmount] = useState(0); // Remember, set in kobo!
    const [userData] = useState(props.auth.isAuthenticated ? props.auth.userDetails : '');
    const [loaderSpinning, setLoaderSpinning] = useState(false);
    const [activePricePlan, setActivePricePlan] = useState(1);

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
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
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
                    transId: paymentData.trxref
                }, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
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
                                        <div className="grid-2">
                                            <div className="plan_bg">
                                                <div className="plan_props_detail">
                                                    <h1>{coursePlans.title}</h1>
                                                    <p>
                                                        {coursePlans.description}
                                                    </p>
                                                    <p className="physical-location"><NavigationIcon />The Dance Place &mdash; Behind Conoil filling Station, Eric Moore Rd, Surulere</p>
                                                    <div className="grid-3">
                                                        <div
                                                            onClick={() => setActivePricePlan(1)}
                                                            className={`price-bar ${activePricePlan === 1 ? 'active' : ''}`}>
                                                            <p>Most Popular</p>
                                                            <div className="horizontal-line"></div>
                                                            <h2>NGN3,000 <span>/ month</span></h2>

                                                            <div className="select-showcase">
                                                                <div className="white-circle">
                                                                    <CheckmarkIcon />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            onClick={() => setActivePricePlan(2)}
                                                            className={`price-bar ${activePricePlan === 2 ? 'active' : ''}`}>
                                                            <p>Most Popular</p>
                                                            <div className="horizontal-line"></div>
                                                            <h2>NGN20,000 <span>/ year</span></h2>
                                                            <div className="select-showcase">
                                                                <div className="white-circle">
                                                                    <CheckmarkIcon />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* {
                                                        props.auth.isAuthenticated ?
                                                            activePlan ? <button disabled className="btn_red">You have an Active Plan</button>
                                                                :
                                                                <PaystackButton className="btn_red" {...componentProps} />
                                                            :
                                                            <Link className="btn_red" to={AppRoute.signin}>Buy Plan</Link>
                                                    } */}
                                                </div>
                                            </div>
                                            <div className="story_bg">

                                            </div>
                                        </div>
                                    </div>
                                    <div className="detail_props pt_4">
                                        <div className="contain">
                                            <div className="grid-3">
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
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="sec-testimonial-grid mt-5">
                                                <div className="plan_story_block">
                                                    <div className="block_header">
                                                        <h3>About Dance Plan</h3>
                                                    </div>
                                                    <Divider style={{ marginTop: 0, marginBottom: 0 }} />
                                                    <div className="block_body">
                                                        <div>
                                                            <div className="testimonial-body">
                                                                <div className="testimonial-avatar">

                                                                </div>
                                                                <div className="testimonial-content">
                                                                    <h5 className="testimonial-content-author">Adeleke Ifeoluwase,<span className="review-date">March 6, 2023</span></h5>
                                                                    <h3>Review on Yellow Chilli Restaurant</h3>
                                                                    <p>Yellow Chilli Restaurant is situated on the Island
                                                                        in Lagos. They boast of the finest cuisines in
                                                                        seafood and pepper soups. Their oxtail pepper soup
                                                                        was so savoury and nicely prepared with pepper to
                                                                        taste. Yellow Chilli taste Restaurant is situated on the Island
                                                                        in Lagos. They boast of the finest cuisines in
                                                                        seafood and pepper soups.</p>
                                                                </div>
                                                            </div>
                                                            <Divider />
                                                            <div className="testimonial-body">
                                                                <div className="testimonial-avatar">

                                                                </div>
                                                                <div className="testimonial-content">
                                                                    <h5 className="testimonial-content-author">Adeleke Ifeoluwase,<span className="review-date">March 6, 2023</span></h5>
                                                                    <h3>Review on Yellow Chilli Restaurant</h3>
                                                                    <p>Yellow Chilli Restaurant is situated on the Island
                                                                        in Lagos. They boast of the finest cuisines in
                                                                        seafood and pepper soups. Their oxtail pepper soup
                                                                        was so savoury and nicely prepared with pepper to
                                                                        taste. Yellow Chilli taste Restaurant is situated on the Island
                                                                        in Lagos. They boast of the finest cuisines in
                                                                        seafood and pepper soups.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div></div>
                                            </div> */}
                                        </div>
                                        <div className="pt_4">
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
                <Footer noMargin={true} />
            </Spin>
        </div>
    )
}

const mapStateToProps = store => {
    return { auth: store.auth }
}

export default connect(mapStateToProps)(PhysicalProductDetail);