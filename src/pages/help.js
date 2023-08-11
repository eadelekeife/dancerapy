import "../assets/css/mini.css";

import React, { useState, useEffect } from "react";

// import { connect } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Input, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
// import axios from '../../utils/axiosCall';

import { Link } from "react-router-dom";

import locationMap from '../assets/images/mini/locationmap.jpg';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Footer from '../components/footer';
import Nav from "../components/nav";

const HelpPage = () => {
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
        // axios.post('/signup', {
        //     firstName, lastName, emailAddress, password
        // })
        //     .then(userData => {
        //         if (userData.data.statusMessage === "success") {
        //             window.location = `/signin`;
        //         } else {
        //             setLoadingData(false);
        //             setErrorMessage(userData.data.summary);
        //         }
        //     })
        //     .catch(err => {
        //         setLoadingData(false);
        //         setErrorMessage('An error occurred while saving data. Please try again.');
        //     })
    }
    return (
        <div className="contact help-page">
            <Nav />
            <div className="plan_bg">
                <h3>Guide</h3>
            </div>
            <div className="mt_5 container">
                <div className="grid-3">
                    <Link to="/">Frequently Asked Questions</Link>
                    <Link to="/">About Us</Link>
                    <Link to="/">Our Privacy Policies</Link>
                    <Link to="/">Contact Us</Link>
                    <Link to="/">Our Dance Instructors</Link>
                    <Link to="/">Fitness Videos</Link>
                    <Link to="/">Meal Plans</Link>
                    <Link to="/">Healthcare Plans</Link>
                    <Link to="/">Create a free account</Link>
                    <Link to="/">Merchandise</Link>
                    <Link to="/">Dancerapy and Corporates</Link>
                    <Link to="/">Become an Instructor</Link>
                </div>
            </div>
            <Footer margin={true} />
        </div>
    )
}

export default HelpPage;