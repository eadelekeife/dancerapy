import './auth.css';

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Input, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import axios from '../../utils/axiosCall';
import Logo from "../../assets/images/logo.jpg";

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Footer from '../../utils/footer';
import Nav from "../../utils/nav";

const SignUp = () => {

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
        axios.post('/signup', {
            firstName, lastName, emailAddress, password
        })
            .then(userData => {
                if (userData.data.statusMessage === "success") {
                    localStorage.setItem('new-account', true);
                    window.location = `/signin`;
                } else {
                    setLoadingData(false);
                    setErrorMessage(userData.data.summary);
                }
            })
            .catch(err => {
                setLoadingData(false);
                setErrorMessage('An error occurred while saving data. Please try again.');
            })
    }

    return (
        <div>
            <div className="desktop-onl">
                <Nav />
            </div>
            {/* <div className="mobile-only">
                <div className="plan_bg">
                    <h3>Create a free account</h3>
                </div>
            </div> */}
            <div className="form form_page form-redesign">
                <div className="alignbothtoside">
                    <div className="real_form_boxes">
                        <div className="form_detail contain">
                            <div>
                                <h3>Create a free account</h3>
                                <p>Enter your email address, name and password to create a new account</p>
                            </div>
                            {
                                errorMessage ?
                                    <p className="error-message">{errorMessage}</p> : ''
                            }
                            <form onSubmit={handleSubmit(signUpUser)}>
                                <div className="flex_form">
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
                                {
                                    loadingData
                                        ?
                                        <button>
                                            <Spin indicator={antIcon} /></button>
                                        :
                                        <button>Create Account</button>
                                }
                                <p>Have an account already? <Link to="/signin">Sign in here</Link></p>
                            </form>
                        </div>
                    </div>
                    <div className="full_image_background">
                        {/* <img src={WomanPicture} alt="woman" /> */}
                    </div>
                </div>
            </div>
            <div className="desktop-onl">
                <Footer />
            </div>
            {/* <div className="show-on-mobile-only">
                <Footer />
            </div> */}
        </div >
    )
}

// const mapStateToProps = store => {
//     return { auth: store.auth }
// }

// export default connect(mapStateToProps)(SignUp);

const mapStateToProps = store => {
    return { auth: store.auth }
}

export default connect(mapStateToProps)(SignUp);