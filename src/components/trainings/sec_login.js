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

    const signInValidator = yup.object().shape({
        emailAddress: yup.string().email('Email is not valid').required('Email field can not be empty'),
        signinpassword: yup.string().min(6,'Password field must have 6 or more characters').required('Password field can not be empty')
    })

    const { handleSubmit: handleSignInSubmit, control: controlSignIn, formState: { errors: signInErrors } } = useForm({
        resolver: yupResolver(signInValidator)
    });

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            window.location = "/profile";
        }
        if (props.loginError.loginError.length) {
            setErrorMessage(props.loginError.loginError);
            setLoadingData(false);
        }
    }, [props.auth, props.loginError]);
    const signIn = e => {
        setLoadingData(true);
        setErrorMessage('');
        let { emailAddress, password } = e;
        props.loginUser({
            emailAddress, password
        });
    }

    return (
        <div>
            <div className="form form_page">
                <div className="form_detail">
                    <div>
                        <h3>Sign In to your Account</h3>
                        <p className="form_text">Dancerapy is a dance and fitness program that infuses tenets of
                            various African styles. It’s fun. It’s easy. It’s effective.</p>
                    </div>
                    {
                        errorMessage ?
                            <p className="errorMessage">{errorMessage}</p> : ''
                    }
                    <form onSubmit={handleSignInSubmit(signIn)}>
                        <div className="form-group">
                            <label htmlFor="emailAddress">Email address</label>
                            <Controller name="emailAddress" control={controlSignIn} defaultValue=""
                                render={({ field }) => {
                                    return (
                                        <Input style={{ height: '5rem' }} type="email" {...field}
                                            name="emailAddress" />
                                    )
                                }} />
                            {signInErrors.emailAddress && <p className="errorMessage">{signInErrors.emailAddress.message}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Controller name="signinpassword" control={controlSignIn} defaultValue=""
                                render={({ field }) => {
                                    return (
                                        <Input.Password type="password"
                                            {...field}
                                            style={{ height: '5rem' }}
                                            name="signinpassword" />
                                    )
                                }} />
                            {signInErrors.signinpassword && <p className="errorMessage">{signInErrors.signinpassword.message}</p>}
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
                            className="link">No account yet? <Link
                                onClick={e => {
                                    e.preventDefault();
                                    props.changeForm('signup');
                                }}
                                to="">Create an account here</Link></p>
                    </form>
                </div>
            </div>
        </div >
    )
}

const mapStateToProps = store => {
    return { auth: store.auth, loginError: store.loginError }
}

export default connect(mapStateToProps, { loginUserFromPlan, loginUser })(SignUp);