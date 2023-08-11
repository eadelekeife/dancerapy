import React, { useEffect, useState } from "react";

import { Link } from 'react-router-dom';
import { Input, Spin, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import SignInImage from "../../assets/images/mini/signup.jpeg";

import Nav from "../../components/nav";
import Footer from "../../components/footer";
import { _signup_new_user } from "../../utils/axiosroutes";

const SignUpPage = () => {

    const [loadingData, setLoadingData] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;
    const validator = yup.object().shape({
        emailAddress: yup.string().email('Email is not valid').required('Email field can not be empty'),
        password: yup.string().min(6).required('Password field can not be empty')
    })

    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValue: {
            emailAddress: "",
            password: "",
        },
        resolver: yupResolver(validator)
    });

    const signUpUser = async e => {
        setLoadingData(true);
        setErrorMessage('');
        try {
            let newUser = await _signup_new_user(e);
            if (newUser.data.statusMessage === "success") {
                localStorage.setItem('new-account', true);
                window.location = `/verify-account`;
            } else {
                setLoadingData(false);
                setErrorMessage(newUser.data.summary);
            }
        } catch (err) {
            setLoadingData(false);
            setErrorMessage('An error occurred while saving data. Please try again.');
        }
    }

    return (
        <div>
            <Nav />
            <div className="auth-display">
                <div className="grid-2">
                    <div>
                        <div className="form_detail contain">
                            <div className="first-display">
                                <h3 style={{ margin: 0, padding: 0 }}>Create a free account</h3>
                                <p>Enter the following details to create a free account and get access to videos</p>
                            </div>
                            {
                                errorMessage ?
                                    <p className="errorMessage">{errorMessage}</p> : ''
                            }
                            <form onSubmit={handleSubmit(signUpUser)}>
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
                                <div className="form_flex">
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
                                                    <Input style={{ height: '5rem' }} type="text" {...field}
                                                        name="phoneNumber" />
                                                )
                                            }} />
                                        {errors.phoneNumber && <p className="errorMessage">{errors.phoneNumber.message}</p>}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Controller name="password" control={control}
                                        render={({ field }) => {
                                            return (
                                                <Input.Password type="password" style={{ height: '5rem' }} {...field}
                                                    name="password" />
                                            )
                                        }} />
                                    {errors.password && <p className="errorMessage">{errors.password.message}</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="referral">Referral Code</label>
                                    <Controller name="referral" control={control}
                                        render={({ field }) => {
                                            return (
                                                <Input type="text" style={{ height: '5rem' }} {...field}
                                                    name="referral" />
                                            )
                                        }} />
                                    {errors.referral && <p className="errorMessage">{errors.referral.message}</p>}
                                </div>
                                {
                                    loadingData
                                        ?
                                        <button className="btn-red" disabled>
                                            <Spin indicator={antIcon} /></button>
                                        :
                                        <button className="btn-red">Create account now</button>
                                }
                                <p>No account yet? <Link to="/signin">Sign in here</Link></p>
                                {/* <Divider orientation="left">Or</Divider>
                                <Link to="/signin"
                                    className="margin-bottom">Have an account already? Sign in here</Link> */}
                            </form>
                        </div>
                    </div>
                    <div className="auth-image-bg">
                        <div>
                            <img src={SignInImage} alt="people dancing" />
                            <div className="bg_dark">

                            </div>
                            <div className="signup-text">
                                <div className="signup-text-cover">
                                    <h3>Turn up the fun and burn the calories anytime in the comfort of your home</h3>
                                    <p>Our mix of low-impact movement and unique equipment offers intense sculpting—minus
                                        the drain of traditional workouts. Our mix of low-impact movement and unique
                                        equipment offers intense sculpting.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer noMargin={true} />
        </div>
    )
}

export default SignUpPage;