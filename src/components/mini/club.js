import "./mini.css";

import React from "react";

import Footer from "../../utils/footer";
import { Link } from "react-router-dom";

import _1 from '../../assets/images/companies/box-dark.svg';
import _2 from '../../assets/images/companies/eventbrite-dark.svg';
import _3 from '../../assets/images/companies/nasdaq-dark.svg';
import _4 from '../../assets/images/companies/netapp-dark.svg';
import _6 from '../../assets/images/companies/volkswagen-dark.svg';

import _7 from '../../assets/images/companies/box-white.png';
import _8 from '../../assets/images/companies/eventbrite-white.png';
import _9 from '../../assets/images/companies/nasdaq-white.png';
import _11 from '../../assets/images/companies/netapp-white.png';
import _12 from '../../assets/images/companies/volkswagen-white.png';
import _5 from "../../assets/images/mini/_5.mp4";
// import Teacher from "../../assets/images/homepage/teacher2.webp";
// import Empty from "../../assets/images/auth/empty.svg";

const Instructors = () => {
    return (
        <div>
            <div className="instructor_hero">

            </div>
            <div className="sabi_props mt-5">
                <div className="contain">
                    <div className="grid_2">
                        <div>
                            <h2>Everything you need to make your decision. For schools and colleges</h2>
                        </div>
                        <div>
                            <p>
                                Hosts are chefs, artists, DJs, and other experts in their fields. They make people from
                                around the world feel connected, and give access to unique places and activities that
                                can’t be found anywhere else.
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="contain">
                        <div className="grid_3">
                            <div className="instructor_props_text">
                                <p className="count">01</p>
                                <h3>Learn our quality standards</h3>
                                <p>
                                    Hosts are chefs, artists, DJs, and other experts in their fields. They make people from
                                    around the world feel connected, and give access to unique places and activities that
                                    can’t be found anywhere else.
                                </p>
                            </div>
                            <div className="instructor_props_text">
                                <p className="count">02</p>
                                <h3>Learn our quality standards</h3>
                                <p>
                                    Hosts are chefs, artists, DJs, and other experts in their fields. They make people from
                                    around the world feel connected, and give access to unique places and activities that
                                    can’t be found anywhere else.
                                </p>
                            </div>
                            <div className="instructor_props_text">
                                <p className="count">03</p>
                                <h3>Learn our quality standards</h3>
                                <p>
                                    Hosts are chefs, artists, DJs, and other experts in their fields. They make people from
                                    around the world feel connected, and give access to unique places and activities that
                                    can’t be found anywhere else.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="vid_plans mt-3">
                <div className="contain">
                    <div className="grid_2">
                        <div>
                            {/* Not Your Average Online Tutorial */}
                            <h2>Everything you need to make your decision.</h2>
                            <p>
                                Are you a college or K-12 school representative? Learn more about how you can
                                partner with Niche to connect with students and families throughout the school
                                search process. Learn more about how you can
                                partner with Niche to connect with students and families throughout the school
                                search process.
                            </p>
                        </div>
                        <div className="sec_plans_cove">
                            <div className="video_cover">
                                <video src={_5} autoPlay muted loop />
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* <div className="homepage_contain">
                            <div className="gray_bg">
                                <div>
                                    <div className="grid_2">
                                        <div className="props">
                                            <div className="grid_4">
                                                <div>
                                                    <div className="icon1">
                                                        <img src={Icon1} alt="icon1" />
                                                    </div>
                                                    <p>Tasks</p>
                                                </div>
                                                <div>
                                                    <div className="icon2">
                                                        <img src={Icon2} alt="icon1" />
                                                    </div>
                                                    <p>Scheduling</p>
                                                </div>
                                                <div>
                                                    <div className="icon3">
                                                        <img src={Icon3} alt="icon1" />
                                                    </div>
                                                    <p>Payments</p>
                                                </div>
                                                <div>
                                                    <div className="icon4">
                                                        <img src={Icon4} alt="icon1" />
                                                    </div>
                                                    <p>Insights</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h2>Tools tailored to you</h2>
                                            <p>
                                                A dashboard to give you insights, feedback on how to improve, visibility to guests
                                                from all over the world through search and filters, seamless payments, and much
                                                more.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="instructor_companies mt-3">
                <div className="contain">
                    <div className="companies">
                        <h2>Places our Instructors work</h2>
                        <ul>
                            <li><img src={_1} alt="" /></li>
                            <li><img src={_2} alt="" /></li>
                            <li><img src={_3} alt="" /></li>
                            <li><img src={_4} alt="" /></li>
                            <li><img src={_6} alt="" /></li>
                            <li><img src={_1} alt="" /></li>
                            <li><img src={_2} alt="" /></li>
                            <li><img src={_3} alt="" /></li>
                            <li><img src={_4} alt="" /></li>
                            <li><img src={_6} alt="" /></li>
                            <li><img src={_1} alt="" /></li>
                            <li><img src={_2} alt="" /></li>
                            <li><img src={_3} alt="" /></li>
                            <li><img src={_4} alt="" /></li>
                            <li><img src={_6} alt="" /></li>
                            <li><img src={_1} alt="" /></li>
                            <li><img src={_2} alt="" /></li>
                            <li><img src={_3} alt="" /></li>
                            <li><img src={_4} alt="" /></li>
                            <li><img src={_6} alt="" /></li>
                            <li><img src={_1} alt="" /></li>
                            <li><img src={_2} alt="" /></li>
                            <li><img src={_3} alt="" /></li>
                            <li><img src={_4} alt="" /></li>
                            <li><img src={_6} alt="" /></li>
                            <li><img src={_1} alt="" /></li>
                            <li><img src={_2} alt="" /></li>
                            <li><img src={_3} alt="" /></li>
                            <li><img src={_4} alt="" /></li>
                            <li><img src={_6} alt="" /></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="instructor_faqs mt-3">
                <div className="contain">
                    <h2>Questions we get asked often</h2>
                    <div className="grid_2">
                        <div className="grid_container">
                            <h3>Who can teach on DanceRapy?</h3>
                            <p>
                                DanceRapy teachers are working professionals, experts, and subject matter enthusiasts. But as
                                long as your class adheres to our Class Guidelines, it can be published on DanceRapy. There is
                                no cost to publishing a class.
                            </p>
                        </div>
                        <div className="grid_container">
                            <h3>Who can teach on DanceRapy?</h3>
                            <p>
                                DanceRapy teachers are working professionals, experts, and subject matter enthusiasts. But as
                                long as your class adheres to our Class Guidelines, it can be published on DanceRapy. There is
                                no cost to publishing a class.
                            </p>
                        </div>
                        <div className="grid_container">
                            <h3>Who can teach on DanceRapy?</h3>
                            <p>
                                DanceRapy teachers are working professionals, experts, and subject matter enthusiasts. But as
                                long as your class adheres to our Class Guidelines, it can be published on DanceRapy. There is
                                no cost to publishing a class.
                            </p>
                        </div>
                        <div className="grid_container">
                            <h3>Who can teach on DanceRapy?</h3>
                            <p>
                                DanceRapy teachers are working professionals, experts, and subject matter enthusiasts. But as
                                long as your class adheres to our Class Guidelines, it can be published on DanceRapy. There is
                                no cost to publishing a class.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Instructors;