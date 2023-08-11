import "./profile.css";

import React, { useState } from "react";

import Nav from "../../utils/nav";
import Footer from "../../utils/footer";
import { Controller, useForm } from 'react-hook-form';
import { Input, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from '../../utils/axiosCall';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import SideNav from "./side_nav";

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
                            <h3>Saved Classes</h3>
                            <div>
                                <div>
                                    <form>
                                        <div className="flex_form">
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
                                    </form>
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