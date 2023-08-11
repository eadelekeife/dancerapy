import "./profile.css";

import React, { useState } from "react";

import Nav from "../../components/nav";
import Footer from "../../components/footer";
import { Controller, useForm } from 'react-hook-form';
import { Input, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from '../../utils/axiosCall';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import SideNav from "./side_nav";

import Empty from "../../assets/images/auth/empty.svg";
import _1 from "../../assets/images/content/_1.avif";
import _2 from "../../assets/images/content/_2.avif";

const Profile = () => {
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
    const signUp = () => {
        console.log('hit me')
    }
    return (
        <div>
            <Nav />
            <div className="profile_div">
                <div className="profile_to_left">
                    <div className="">
                        <div className="profile_nav">
                            <SideNav />
                        </div>
                    </div>
                </div>
                <div className="profile_to_right">
                    <div className="contain">
                        <div>
                            <h3 className="profile_title">Account Information</h3>
                            <div className="empty_div">
                                <div>
                                    <img src={Empty} alt="empty" />
                                    <h3>An empty space...</h3>
                                    <p>You have not placed any orders yet</p>
                                    <button className="btn_green">View Plans</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile;