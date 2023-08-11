import "./profile.css";

import React from "react";

import Footer from "../../components/footer";

import SideNav from "./side_nav";

import Empty from "../../assets/images/auth/empty.svg";
import _1 from "../../assets/images/content/_1.avif";
import _2 from "../../assets/images/content/_2.avif";

const Profile = () => {
    return (
        <div>
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
                        <h3>Plan Reviews</h3>
                        <div className="empty_div">
                            <div>
                                <img src={Empty} alt="empty" />
                                <p>Oops! Your subscription may have expired. Kindly renew to recover access</p>
                                <button className="btn_green">View Plans</button>
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