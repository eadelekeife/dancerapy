import "../assets/css/mini.css";

import React, { useState, useEffect } from "react";

// import { connect } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Input, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
// import axios from '../../utils/axiosCall';

import { Link } from "react-router-dom";

import locationMap from '../assets/images/mini/locationmap.jpg';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Footer from '../components/footer';
import Nav from "../components/nav";

const Contact = () => {
    const [loadingData, setLoadingData] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;

    const signupValidator = yup.object().shape({
        emailAddress: yup.string().email('Please enter a valid email address').required('Please enter your email address'),
        password: yup.string().required('Please enter your password'),
        firstName: yup.string().required('Please enter your first name'),
        lastName: yup.string().required('Please enter your last name')
    })

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(signupValidator)
    });

    const signUpUser = e => {
        setLoadingData(true);
        setErrorMessage('');
        let { firstName, lastName, emailAddress, password } = e;
        // axios.post('/signup', {
        //     firstName, lastName, emailAddress, password
        // })
        //     .then(userData => {
        //         if (userData.data.statusMessage === "success") {
        //             window.location = `/signin`;
        //         } else {
        //             setLoadingData(false);
        //             setErrorMessage(userData.data.summary);
        //         }
        //     })
        //     .catch(err => {
        //         setLoadingData(false);
        //         setErrorMessage('An error occurred while saving data. Please try again.');
        //     })
    }
    return (
        <div className="contact">
            <Nav />
            <div className="plan_bg">
                <h3>Contact Us</h3>
            </div>
            <div className="mt_5 contain">
                <div className="grid-2">
                    <div>
                        <form onSubmit={handleSubmit(signUpUser)}>
                            <div className="form-flex-2">
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
                                <label htmlFor="password">Message</label>
                                <Controller name="password" control={control}
                                    render={({ field }) => {
                                        return (
                                            <Input.TextArea type="password"
                                                rows="5"
                                                {...field}
                                                name="password" />
                                        )
                                    }} />
                                {errors.password && <p className="errorMessage">{errors.password.message}</p>}
                            </div>
                            {
                                loadingData
                                    ?
                                    <button>
                                        <span style={{ marginRight: '10px' }}>Creating Account. Please wait...</span>
                                        <Spin indicator={antIcon} /></button>
                                    :
                                    <button className="btn-red">Send us a Message</button>
                            }
                            {/* <Divider orientation="left">Or</Divider>
                                <Link to="/signin"
                                    className="margin-bottom">Have an account already? Sign in here</Link> */}
                        </form>
                    </div>
                    <div className="contact_div">
                        <div className="first_display">
                            <h3>Or you can message us directly</h3>
                            <div className="sticky_compartment">
                                <p>For general inquiries, please call 08169511139
                                </p>
                                <p>For Dancerapy online registration, please call 08023414932</p>
                                <p className="mt_3">To watch fun Dancerapy videos, kindly visit our
                                    Instagram page @dancerapy</p>
                            </div>
                            <img src={locationMap} style={{ width: 'unset' }} alt="locationMap" />
                            <div className="sticky_social">
                                <div>
                                    <ion-icon name="logo-facebook"></ion-icon>
                                    <ion-icon name="logo-twitter"></ion-icon>
                                    <ion-icon name="logo-instagram"></ion-icon>
                                    <ion-icon name="logo-youtube"></ion-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer margin={true} />
        </div>
    )
}

export default Contact;