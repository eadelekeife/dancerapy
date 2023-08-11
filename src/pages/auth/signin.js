import React, { useEffect, useState } from "react";

import { Link } from 'react-router-dom';
import { Input, Spin, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { connect } from 'react-redux';
import { loginUser } from '../../utils/reducers/auth';

import SignInImage from "../../assets/images/mini/signup.jpeg";

import Nav from "../../components/nav";
import Footer from "../../components/footer";

const SignInPage = props => {

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

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };

    useEffect(() => {
        if (localStorage.getItem('new-account')) {
            openNotificationWithIcon('success', 'Account created successfully! Please log in to continue.');
            localStorage.removeItem('new-account');
        }
        if (props.auth.isAuthenticated) {
            window.location = "/videos";
        }
        if (props.loginError.loginError.length) {
            setErrorMessage(props.loginError.loginError);
            setLoadingData(false);
        }
    }, [props.auth, props.loginError]);

    const signInUser = async e => {
        setLoadingData(true);
        setErrorMessage('');
        let { emailAddress, password } = e;
        props.loginUser({
            emailAddress, password
        });
        // try {
        //     let signinNewUser = await props.loginUser({
        //         emailAddress, password
        //     });
        // } catch (err) {

        // }
    }

    return (
        <div>
            <Nav />
            <div className="auth-display">
                <div className="grid-2">
                    <div>
                        <div className="form_detail contain">
                            <div className="first-display">
                                <h3 style={{ margin: 0, padding: 0 }}>Sign in to your account</h3>
                                <p>Enter your email address and password to sign in to your account</p>
                            </div>
                            {
                                errorMessage ?
                                    <p className="errorMessage">{errorMessage}</p> : ''
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
                                        <button className="btn-red" disabled>
                                            <Spin indicator={antIcon} /></button>
                                        :
                                        <button className="btn-red">Sign in now</button>
                                }
                                <p className="no-margin">Forgot Password? <Link to="/resetsendmail">Reset Password here</Link></p>
                                <p>No account yet? <Link to="/signup">Sign up here</Link></p>
                                {/* <Divider orientation="left">Or</Divider>
                                <Link to="/signin"
                                    className="margin-bottom">Have an account already? Sign in here</Link> */}
                            </form>
                        </div>
                    </div>
                    <div className="auth-image-bg">
                        <div>
                            <img src={SignInImage} alt="people dancing" />
                            <div className="bg-dark">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer noMargin={true} />
        </div>
    )
}

const mapStateToProps = state => {
    return { auth: state.auth, loginError: state.loginError }
}

export default connect(mapStateToProps, { loginUser })(SignInPage);