import './auth.css';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Input, Spin, notification } from 'antd';
import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { loginUser } from '../../utils/reducers/auth';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AppRoute from '../../utils/routes';

const SignIn = props => {

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };

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

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            window.location = AppRoute.profile;
        }
        if (props.loginError.loginError.length) {
            setErrorMessage(props.loginError.loginError);
            setLoadingData(false);
        }
    }, [props.auth, props.loginError]);
    const signInUser = e => {
        setLoadingData(true);
        setErrorMessage('');
        let { emailAddress, password } = e;
        props.loginUser({
            emailAddress, password
        });
    }

    return (
        <div>
            <div className="form_detail">
                <div>
                    <h3>Sign in to your account</h3>
                </div>
                {
                    errorMessage ?
                        <p className="error-message">{errorMessage}</p> : ''
                }
                <form onSubmit={handleSubmit(signInUser)}>
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
                            <button disabled>
                                <Spin indicator={antIcon} /></button>
                            :
                            <button>Sign in now</button>
                    }
                    <p className="no-margin">Forgot Password? <Link to="/signin">Reset Password here</Link></p>
                    <p>No account yet? <Link to="/signup">Sign up here</Link></p>
                    {/* <Divider orientation="left">Or</Divider>
                <Link to="/signin"
                    className="margin-bottom">Have an account already? Sign in here</Link> */}
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return { auth: state.auth, loginError: state.loginError }
}

export default connect(mapStateToProps, { loginUser })(SignIn);