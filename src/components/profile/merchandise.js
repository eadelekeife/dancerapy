import "./profile.css";

import React, { useState } from "react";

import Nav from "../../utils/nav";
import Footer from "../../utils/footer";
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import axios from '../../utils/axiosCall';

import SideNav from "./side_nav";

import Empty from "../../assets/images/auth/empty.svg";
import _1 from "../../assets/images/content/_1.avif";
import _2 from "../../assets/images/content/_2.avif";
import AppRoute from "../../utils/routes";

const Profile = () => {
    const [loadingData, setLoadingData] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;

    return (
        <div>
            <Nav />
            <div className="profile_div main_info">
                <div className="profile_to_left">
                    <div className="profile_nav">
                        <SideNav />
                    </div>
                </div>
                <div className="profile_to_right">
                    <div className="contain">
                        <div className="profile-data-display">
                            <h3 className="profile_title">Merchandise Orders</h3>
                            <div className="empty_div">
                                <div>
                                    <img src={Empty} alt="empty" />
                                    <p>You have not placed any orders yet</p>
                                    <Link to={AppRoute.merch} className="btn_red">View Plans</Link>
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