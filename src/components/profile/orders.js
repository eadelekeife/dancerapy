import "./profile.css";

import React from "react";

import Footer from "../../utils/footer";
import Nav from "../../utils/nav";

import SideNav from "./side_nav";

import Empty from "../../assets/images/auth/empty.svg";
import _1 from "../../assets/images/content/_1.avif";
import _2 from "../../assets/images/content/_2.avif";

const Profile = () => {
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
                            <h3 className="profile_title">Plan Orders</h3>
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