import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Input, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from '../../utils/axiosCall';
import { Link } from 'react-router-dom';

import { loginUserFromPlan, loginUser } from '../../utils/reducers/auth';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const SignUp = props => {

    const [loadingData, setLoadingData] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formContent, setFormContent] = useState('signup');

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
        axios.post('/signup-from-plan', {
            firstName, lastName, emailAddress, password
        })
            .then(async userData => {
                if (userData.data.statusMessage === "success") {
                    await props.loginUserFromPlan(userData.data.message);
                    props.newFunct();
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
            <div className="form form_page">
                <div className="form_detail">
                    <div>
                        <h3>Create Account</h3>
                        <p className="form_text">Dancerapy is a dance and fitness program that infuses tenets of
                            various African styles. It’s fun. It’s easy. It’s effective.</p>
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
                        <div style={{ marginTop: 30, display: 'block', marginBottom: 20 }}>
                            {
                                loadingData
                                    ?
                                    <button className="btn_red full">
                                        <span style={{ marginRight: '10px' }}>Creating Account. Please wait...</span>
                                        <Spin indicator={antIcon} /></button>
                                    :
                                    <button className="btn_red full">Create Account</button>
                            }
                        </div>
                        <p
                            style={{ marginBottom: 0 }}
                            className="link">Have an account already? <Link
                                onClick={e => {
                                    e.preventDefault();
                                    props.changeForm('signin');
                                }}
                                to="">Sign In here</Link></p>
                    </form>
                </div>
                :
            </div>
        </div >
    )
}

const mapStateToProps = store => {
    return { auth: store.auth, loginError: store.loginError }
}

export default connect(mapStateToProps, { loginUserFromPlan, loginUser })(SignUp);