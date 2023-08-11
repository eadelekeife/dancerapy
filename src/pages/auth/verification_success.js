import React, { useEffect, useState } from "react";

import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
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
import AllAppRoutes from "../../utils/routes";
import { _verify_new_user } from "../../utils/axiosroutes";

const SignInPage = props => {

    const [loadingData, setLoadingData] = useState(true);
    const [errorOccurred, setErrorOccurred] = useState('');
    const urlParams = useParams();

    const antIcon = <LoadingOutlined style={{ fontSize: 35 }} spin />;
    const Navigate = useNavigate();

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };

    const verifyUserAccount = async userToken => {
        try {
            let verifyUser = await _verify_new_user(userToken);
            if (verifyUser.data.statusMessage === "success") {
                setLoadingData(false);
                setErrorOccurred(false);
            } else {
                setLoadingData(false);
                setErrorOccurred(true);
                openNotificationWithIcon('error', verifyUser.data.summary);
            }
        } catch (err) {
            setErrorOccurred(true);
            setLoadingData(false);
            openNotificationWithIcon('error', 'An error occurred while verifying user. Please reload page to try again');
        }
    }
    useEffect(() => {
        let userToken = urlParams.verificationId;
        verifyUserAccount(userToken);
    }, [urlParams.verificationId]);

    return (
        <Spin spinning={loadingData} indicator={antIcon}>
            <div>
                <Nav />
                <div className="auth-display account-verification">
                    {
                        !loadingData ?
                            !errorOccurred ?
                                <div className="auth-display-center">
                                    <div className="message-div">
                                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                                        <h4>Account Verified! Let's Dance 🎉</h4>
                                        <p>Great news! Your account verification is complete. You're now ready to groove and sweat with us
                                            on Dancerapy. Let's dance our way to fitness together!</p>
                                        <Link to={AllAppRoutes.sign_in}>Sign in to continue</Link>
                                    </div>
                                </div>
                                :
                                <div className="auth-display-center">
                                    <div className="message-div">
                                        <ion-icon name="close-circle-outline"></ion-icon>
                                        <h4></h4>
                                        <p>Your account verification process has encountered an issue and could not be completed
                                            successfully. Please reload page to try again.</p>
                                        <button
                                            onClick={() => Navigate(0)}
                                            to={AllAppRoutes.sign_in}>Reload Page</button>
                                    </div>
                                </div>
                            :
                            <div></div>
                    }
                </div>
                <Footer noMargin={true} />
            </div>
        </Spin>
    )
}

const mapStateToProps = state => {
    return { auth: state.auth, loginError: state.loginError }
}

export default connect(mapStateToProps, { loginUser })(SignInPage);