import "./instructors.css";

import React, { useState } from "react";

import { Input, Divider, Rate, Collapse, Select, Modal, Spin, notification } from 'antd';
import { UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import axiosCall from "../../utils/axiosCall";

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import AppRoute from '../../utils/routes';

import InstructorImg from "../../assets/images/homepage/link1.jpeg";
import _1 from '../../assets/images/companies/access.webp';
import _2 from '../../assets/images/companies/shell.png';
import _3 from '../../assets/images/companies/terra.png';
import _4 from '../../assets/images/companies/corona.png';
import _6 from '../../assets/images/companies/dansol.png';
import _7 from '../../assets/images/companies/gtco.png';
import _8 from '../../assets/images/companies/mtn.png';

import Footer from "../../utils/footer";
import Nav from "../../utils/nav";

const Homepage = () => {
    const { Panel } = Collapse;
    const { Option } = Select;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [spinning, setSpinning] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };

    const signupValidator = yup.object().shape({
        emailAddress: yup.string().email('Please enter a valid email address').required('Please enter your email address'),
        phoneNumber: yup.string().required('Please enter your phone number'),
        firstName: yup.string().required('Please enter your first name'),
        lastName: yup.string().required('Please enter your last name')
    })

    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(signupValidator)
    });

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const registerInstructor = e => {
        let { firstName, lastName, emailAddress, phoneNumber } = e;
        setLoadingData(true);
        setErrorMessage('');
        axiosCall.post('/save-instructor-data', {
            firstName, lastName, emailAddress, phoneNumber
        })
            .then(instructorResponse => {
                if (instructorResponse.data.statusMessage === "success") {
                    setValue('firstName', '');
                    setValue('lastName', '');
                    setValue('emailAddress', '');
                    setValue('phoneNumber', '');
                    setLoadingData(false);
                    setIsModalOpen(false);
                    openNotificationWithIcon('success', 'Registration successful. Please give us some time to get back to you.');
                } else {
                    setLoadingData(false);
                    setErrorMessage('An error occurred while saving data. Please try again');
                }
            })
            .catch(err => {
                setLoadingData(false);
                setErrorMessage('An error occurred while saving data. Please try again');
            })
    }
    return (
        <div className="instructors_page">
            <Nav />
            <div>
                <div className="instructor_hero">
                    <div className="grid_2_bias">
                        <div>
                            <div className="container">
                                <h2>Do something you love and get paid for it</h2>
                                <button onClick={() => setIsModalOpen(true)}>Register Now</button>
                            </div>
                        </div>
                        <div>
                            <img src={InstructorImg} alt="instructor img" />
                        </div>
                    </div>
                </div>
                <div className="instructor_how_to">
                    <div className="container">
                        <div>
                            <div className="grid_2">
                                <div>
                                    <h3 className="tile_header">How to become a Dancerapy Instructor.</h3>
                                </div>
                            </div>
                            <div className="mt-3 grid_3">
                                <div className="instructor_props_text">
                                    <p className="count">01</p>
                                    <h3>Sign Up!</h3>
                                    <p>
                                        Sign up and register your details, select your preferred training method &mdash;
                                        in-person, online or private training.
                                    </p>
                                </div>
                                <div className="instructor_props_text">
                                    <p className="count">02</p>
                                    <h3>Training / Get your Certificate</h3>
                                    <p>
                                        Training to span for a period of 6 months. After training, you showcase /audition for
                                        management. Certificates will be issued after training.
                                    </p>
                                </div>
                                <div className="instructor_props_text">
                                    <p className="count">03</p>
                                    <h3>Become a Dancerapy Instructor</h3>
                                    <p>
                                        When you have successfully completed your training and are certified, you can now
                                        handle classes. Enjoy!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="instructor_div_bg">
                    <div className="white_instructor_prop">
                        <h2>DANCERAPY INSTRUCTOR FAMILY (DIF)</h2>
                        <p>This is a career empowerment system aimed at equipping you with the tools required for
                            sustainable growth and income as a Dancerapy Instructor.</p>
                        <Divider><p className="divider_message">What you get with Dancerapy</p></Divider>
                        <div>
                            <ul>
                                <li>
                                    <ion-icon name="checkmark-circle-outline"></ion-icon>Access to new choreographies
                                </li>
                                <li>
                                    <ion-icon name="checkmark-circle-outline"></ion-icon>Access to Dancerapy choreographies and playlist
                                </li>
                                <li>
                                    <ion-icon name="checkmark-circle-outline"></ion-icon>Free feature on publicity channels
                                </li>
                                <li>
                                    <ion-icon name="checkmark-circle-outline"></ion-icon>Access to free graphic designs for classes
                                </li>
                                <li>
                                    <ion-icon name="checkmark-circle-outline"></ion-icon>Free feature on Dancerapy platforms
                                </li>
                                <li>
                                    <ion-icon name="checkmark-circle-outline"></ion-icon>Provision of Dancerapy merchandise
                                </li>
                                <li>
                                    <ion-icon name="checkmark-circle-outline"></ion-icon>Access to larger client base
                                </li>
                                <li>
                                    <ion-icon name="checkmark-circle-outline"></ion-icon>Zoom (free training class)
                                </li>
                                <li>
                                    <ion-icon name="checkmark-circle-outline"></ion-icon>Invoicing
                                </li>
                                <li>
                                    <ion-icon name="checkmark-circle-outline"></ion-icon>
                                    Two free trainings and subsequent discounts
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="gray_bg">

                </div>
                <div className="mt-5 instructor_testimonials">
                    <div className="container">
                        <div className="center_div">
                            <div>
                                <h3 className="tile_header">What our Clients are saying about Us</h3>
                                <ul>
                                    <li><img src={_1} alt="" /></li>
                                    <li><img src={_2} alt="" /></li>
                                    <li><img src={_3} alt="" /></li>
                                    <li><img src={_4} alt="" /></li>
                                    <li><img src={_6} alt="" /></li>
                                    <li><img src={_7} alt="" /></li>
                                    <li><img src={_8} alt="" /></li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-3 grid_3">
                            <div className="instructor_message_div">
                                <Rate disabled defaultValue={5} />
                                <p className="instructor_message">
                                    Dancerapy is intense, fun, energetic and all the great words. If you are not a
                                    dancerapy member, you are missing out big time. Shake your body, burn those
                                    calories in a FUN way!
                                </p>
                                <div>
                                    <p className="instructor_name">Chiamaka Obuekwe</p>
                                </div>
                            </div>
                            <div className="instructor_message_div">
                                <Rate disabled defaultValue={5} />
                                <p className="instructor_message">
                                    With Dancerapy, i lost 8kg in four(4) months! It is always great fun during
                                    Dancerapy sessions. You can dance your way to fitness, it is not a fluke.
                                </p>
                                <div>
                                    <p className="instructor_name">Mrs Onyinye</p>
                                </div>
                            </div>
                            <div className="instructor_message_div">
                                <Rate disabled defaultValue={5} />
                                <p className="instructor_message">
                                    Fun and energetic class, amazing instructors, great
                                    engagements, beautiful members all of this and more to expect from a
                                    Dancerapy session.
                                </p>
                                <div>
                                    <p className="instructor_name">Olajumoke</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal title={null} footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <h3>Register as an Instructor</h3>
                </div>
                {
                    errorMessage ?
                        <p className="errorMessage">{errorMessage}</p> : ''
                }
                <form className="mt-5" onSubmit={handleSubmit(registerInstructor)}>
                    <div className="form_flex">
                        <div className="form-group space">
                            <label htmlFor="firstName">First name</label>
                            <Controller name="firstName" control={control}
                                render={({ field }) => {
                                    return (
                                        <Input style={{ height: '5rem' }} type="text" {...field}
                                            name="firstName" />
                                    )
                                }} />
                            {errors.firstName && <p className="errorMessage">{errors.firstName.message}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last name</label>
                            <Controller name="lastName" control={control}
                                render={({ field }) => {
                                    return (
                                        <Input style={{ height: '5rem' }} type="text" {...field}
                                            name="lastName" />
                                    )
                                }} />
                            {errors.lastName && <p className="errorMessage">{errors.lastName.message}</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="emailAddress">Email address</label>
                        <Controller name="emailAddress" control={control}
                            render={({ field }) => {
                                return (
                                    <Input style={{ height: '5rem' }} type="email" {...field}
                                        name="emailAddress" />
                                )
                            }} />
                        {errors.emailAddress && <p className="errorMessage">{errors.emailAddress.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone number</label>
                        <Controller name="phoneNumber" control={control}
                            render={({ field }) => {
                                return (
                                    <Input type="tel" style={{ height: '5rem' }} {...field}
                                        name="phoneNumber" />
                                )
                            }} />
                        {errors.phoneNumber && <p className="errorMessage">{errors.phoneNumber.message}</p>}
                    </div>
                    <div className="mt-5"></div>
                    {
                        loadingData
                            ?
                            <button className="btn_red">
                                <span style={{ marginRight: '10px' }}>Registering ... Please wait</span>
                                <Spin indicator={antIcon} /></button>
                            :
                            <button className="btn_red">Register</button>
                    }
                    {/* <p className="link">Have an account already? <Link to={AppRoute.signin}>Sign In here</Link></p> */}
                </form>
            </Modal>
            <Footer margin={true} />
        </div>
    )
}

export default Homepage;