import React, { useEffect, useState } from "react";

import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Input, Spin, notification, Avatar } from 'antd';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { connect } from 'react-redux';
import { loginUser } from '../../utils/reducers/auth';

import SignInImage from "../../assets/images/mini/signup.jpeg";

import Nav from "../../components/nav";
import Footer from "../../components/footer";
import AllAppRoutes from "../../utils/routes";

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
            <div className="auth-display account-verification verification-only">
                <div className="mobile-only">
                    <div className="auth-image-bg">
                        <div>
                            <h2>Ready to Dance Your Way to Fitness? Join our community of fitness enthusiasts
                                and dance lovers.</h2>
                            <Avatar.Group>
                                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                                <Avatar
                                    style={{
                                        backgroundColor: '#f56a00',
                                    }}
                                >
                                    K
                                </Avatar>
                                <Avatar
                                    style={{
                                        backgroundColor: '#87d068',
                                    }}
                                    icon={<UserOutlined />}
                                />
                                <Avatar
                                    style={{
                                        backgroundColor: '#1677ff',
                                    }}
                                    icon={<AntDesignOutlined />}
                                />
                            </Avatar.Group>
                        </div>
                    </div>
                </div>
                <div className="auth-display-center">
                    <div className="message-div">
                        <ion-icon name="ellipse-outline"></ion-icon>
                        <h4>Verify Your Email Address</h4>
                        <p>Your account has been created successfully. To complete your registration and gain full access
                            to our fitness videos, please check your email for a verification code. Your dance adventure awaits!</p>
                        <Link to={AllAppRoutes.appVideos}>See all videos</Link>
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