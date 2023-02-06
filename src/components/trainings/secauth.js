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

import Footer from '../../utils/footer';
import Nav from "../../utils/nav";
import AppRoute from '../../utils/routes';
import Secsignup from './secsignup';
import Sec_login from './sec_login';

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

    const signInValidator = yup.object().shape({
        emailAddress: yup.string().email('Email is not valid').required('Email field can not be empty'),
        // password: yup.string().min(6).required('Password field can not be empty')
    })

    const { handleSubmit: handleSignInSubmit, control: controlSignIn, formState: { errors: signInErrors } } = useForm({
        resolver: yupResolver(signInValidator)
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
        console.log(e)
        // setLoadingData(true);
        // setErrorMessage('');
        // let { emailAddress, password } = e;
        // props.loginUser({
        //     emailAddress, password
        // });
    }

    const changeFormContent = e => {
        setFormContent(e);
    }

    return (
        <div>
            <div className="form form_page">
                {
                    formContent === "signup" ?
                        <Secsignup changeForm={changeFormContent} />
                        :
                        <Sec_login changeForm={changeFormContent} />
                }
            </div>
        </div >
    )
}

const mapStateToProps = store => {
    return { auth: store.auth, loginError: store.loginError }
}

export default connect(mapStateToProps, { loginUserFromPlan, loginUser })(SignUp);