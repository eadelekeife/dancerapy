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

const OurTeam = () => {
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
        <div className="contact">
            <Nav />
            <div className="plan_bg">
                <h3>Our Team</h3>
            </div>
            <div className="mt_5 contain">
                <div className="grid-5">
                    <div className="">
                        <div className="team_img_cover team_card _1">
                            <div
                                className="site_bg_overlay">
                                <div>
                                    <p>
                                        Bimbo Obafunwa is the CEO of Corporate Dance World (Africa’s leading dance agency)
                                        Founder of The Dancerapy Club
                                        Director of The Dancedeal Training foundation (2009 till date)
                                        Winner of Celebrity Takes 2 season 1
                                        Dance director for Maltina Dance All (2007 – 2016)
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="team_member_name">Bimbo Obafunwa David</h4>
                            <p className="team_member_role">Artistic Director / Administrator</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="team_img_cover team_card _11">
                            <div
                                className="site_bg_overlay">
                                <div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="team_member_name">Bukola Obafunwa</h4>
                            <p className="team_member_role">Senior Product/Business Development Manager</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="team_img_cover team_card _2">
                            {/* <img src={_1} alt="_1" /> */}
                            <div className="site_bg_overlay">
                                <ion-icon name="logo-instagram"></ion-icon>
                            </div>
                        </div>
                        <div>
                            <h4 className="team_member_name">Olajumoke Sidiku Raliat</h4>
                            <p className="team_member_role">Executive Assistant</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="team_img_cover team_card _3">
                            {/* <img src={_1} alt="_1" /> */}
                            <div className="site_bg_overlay">
                                <ion-icon name="logo-instagram"></ion-icon>
                            </div>
                        </div>
                        <div>
                            <h4 className="team_member_name">Opemipo Ade Akingboye</h4>
                            <p className="team_member_role">Healthcare Consultant / Dancerapy Physician</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="team_img_cover team_card _4">
                            {/* <img src={_1} alt="_1" /> */}
                            <div className="site_bg_overlay">
                                <ion-icon name="logo-instagram"></ion-icon>
                            </div>
                        </div>
                        <div>
                            <h4 className="team_member_name">Michael Ayomikun Olanrewaju</h4>
                            <p className="team_member_role">Dancerapy Instructor</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="team_img_cover team_card _5">
                            {/* <img src={_1} alt="_1" /> */}
                            <div className="site_bg_overlay">
                                <ion-icon name="logo-instagram"></ion-icon>
                            </div>
                        </div>
                        <div>
                            <h4 className="team_member_name">Joseph Ogbor</h4>
                            <p className="team_member_role">Dancerapy Instructor</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="team_img_cover team_card _6">
                            {/* <img src={_1} alt="_1" /> */}
                            <div className="site_bg_overlay">
                                <ion-icon name="logo-instagram"></ion-icon>
                            </div>
                        </div>
                        <div>
                            <h4 className="team_member_name">Charles Ekwem</h4>
                            <p className="team_member_role">Dancerapy Instructor</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="team_img_cover team_card _7">
                            {/* <img src={_1} alt="_1" /> */}
                            <div className="site_bg_overlay">
                                <ion-icon name="logo-instagram"></ion-icon>
                            </div>
                        </div>
                        <div>
                            <h4 className="team_member_name">Anietienabasi Udoh</h4>
                            <p className="team_member_role">Dancerapy Instructor</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="team_img_cover team_card _8">
                            {/* <img src={_1} alt="_1" /> */}
                            <div className="site_bg_overlay">
                                <ion-icon name="logo-instagram"></ion-icon>
                            </div>
                        </div>
                        <div>
                            <h4 className="team_member_name">Jeremiah Balogun</h4>
                            <p className="team_member_role">Dancerapy Instructor</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="team_img_cover team_card _9">
                            {/* <img src={_1} alt="_1" /> */}
                            <div className="site_bg_overlay">
                                <ion-icon name="logo-instagram"></ion-icon>
                            </div>
                        </div>
                        <div>
                            <h4 className="team_member_name">Aniebet Emmanuel</h4>
                            <p className="team_member_role">Dancerapy Instructor</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer margin={true} />
        </div>
    )
}

export default OurTeam;