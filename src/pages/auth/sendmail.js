import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';

import { Link } from 'react-router-dom';
import { Input, Spin, notification } from 'antd';
import { loginUser } from '../../utils/reducers/auth';
import * as yup from 'yup';
import { LoadingOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';

import axios from '../../utils/axiosCall';
import Nav from '../../components/nav';
import Footer from '../../components/footer';

const SendMail = props => {

    const antIcon = (<LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />);
    const [errorMessage, setErrorMessage] = useState('');
    const [sendingMessage, setSendingMessage] = useState(false);

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: 'Reset link sent',
            description: message
        });
    };

    const validator = yup.object().shape({
        emailAddress: yup.string().email('Email is not valid').required('Email field can not be empty'),
    })

    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        defaultValue: {
            emailAddress: ""
        },
        resolver: yupResolver(validator)
    });
    const submitMe = e => {
        setErrorMessage('');
        setSendingMessage(true);
        axios.post('/sendrecoveryemail', {
            emailAddress: e.emailAddress
        })
            .then(data => {
                if (data.data.statusMessage === "success") {
                    openNotificationWithIcon('success', `If an account exists for ${e.emailAddress}, you will receive password reset instructions.`);
                    setValue('emailAddress', '');
                    setSendingMessage(false);
                } else {
                    setErrorMessage('Could not send mail. Please try again');
                    setSendingMessage(false);
                }
            })
            .catch(err => {
                setErrorMessage('Could not send mail. Please try again');
                setSendingMessage(false);
            })
        // let { emailAddress, password } = e;
    }
    return (
        <div>
            <Nav border={true} />
            <div className="auth-display account-verification">
                <div className="auth-display-center">
                    <div className="real_form_boxes">
                        <div className="form_detail contain">
                            <div>
                                <h3>Reset Password</h3>
                                <p>Enter your email address and we will send you a link to reset your password</p>
                            </div>
                            {
                                errorMessage ?
                                    <p className="error-message">{errorMessage}</p> : ''
                            }
                            <form onSubmit={handleSubmit(submitMe)}>
                                <div className="form-group">
                                    <label htmlFor="emailAddress" style={{ width: '100%' }}>Email address</label>
                                    <Controller control={control} defaultValue="" name="emailAddress"
                                        render={({ field }) => (
                                            <Input {...field} id="emailAddress" style={{ width: '100%', height: '5rem' }}
                                                type="email" />
                                        )
                                        } />
                                    {errors.emailAddress && <p className="errorMessage">{errors.emailAddress.message}</p>}
                                </div>
                                <div style={{ marginTop: '1%' }}></div>
                                {
                                    !sendingMessage
                                        ?
                                        <button id="submit-form" className="btn-accent"
                                            style={{ width: '100%', borderRadius: '3px' }} type="submit">Reset Password</button>
                                        :
                                        <button id="submit-form" className="btn-accent" disabled={true}
                                            style={{ width: '100%', borderRadius: '3px' }} type="submit">
                                            <Spin indicator={antIcon} /></button>
                                }
                            </form>
                            <div className="auth_links">
                                <p>Have an account already? <Link to="/signin">Sign In Here</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="full_image_background">
                        {/* <img src={WomanPicture} alt="woman" /> */}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}


const mapStateToProps = state => {
    return { auth: state.auth, loginError: state.loginError }
}

export default connect(mapStateToProps, { loginUser })(SendMail);