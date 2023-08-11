import "../assets/css/about.css";

import React from "react";
import Nav from "../components/nav";
import Footer from "../components/footer";

const AboutUs = () => {
    return (
        <div>
            <Nav />
            <div className="about-hero">
                <div className="contain">
                    <div className="about-hero-text">
                        <h2><span>Unlimited design</span> for fast-moving enticing product teams</h2>
                        <p>Definitely beginner friendly, and of great benefit to those may love dancing, but
                            have never trained in any discipline. unox 1 has given me an edge and
                            it serves as a great conversation starter, i absolutely love it!</p>
                        <button className="btn-red">Sign up as an Instructor</button>
                    </div>
                    <div className="video-bg">

                    </div>
                    {/* <div className="icon-bar"> */}
                    <ion-icon class="about-icon about-icon-1" name="medal-outline"></ion-icon>
                    <ion-icon class="about-icon about-icon-2" name="pulse-outline"></ion-icon>
                    <ion-icon class="about-icon about-icon-3" name="reload-circle-outline"></ion-icon>
                    <ion-icon class="about-icon about-icon-4" name="rocket-outline"></ion-icon>
                    {/* </div> */}
                </div>
            </div>
            <div className="about-story mt_5">
                <div className="contain">
                    <div className="pink-bg">
                        <h3>Building Healthy Connections through Dance. Keep Fit, Lose <br /> Weight, Learn Dance. Unlimited
                            requests have never trained.</h3>
                        <p className="first-story">Definitely beginner friendly, and of great benefit to those may love dancing, but
                            have never trained in any discipline. unox 1 has given me an edge and
                            it serves as a great conversation starter, I absolutely love it! Definitely
                            beginner friendly, and of great benefit to those may love dancing, but
                            have never trained in any discipline. unox 1 has given me an edge and
                            it serves as a great conversation starter, I absolutely love it!</p>
                        <p>This is a career empowerment system aimed at equipping you with the tools required for
                            sustainable growth and income as a Dancerapy Instructor. The Dance Instructor Family comes
                            with a lot of benefits ranging from further trainings to free publicity. Definitely
                            beginner friendly, and of great benefit to those may love dancing, but
                            have never trained in any discipline.</p>
                    </div>
                </div>
            </div>
            <div className="about-how-to mt_5">
                <div className="contain">
                    <div className="first-sect">
                        <h3>Do something you love <br /> and get paid for it.</h3>
                        <p>This is a career empowerment system aimed at equipping you with the tools required for
                            sustainable growth and income as a Dancerapy Instructor. The Dance Instructor Family comes
                            with a lot of benefits ranging from further trainings to free publicity</p>
                    </div>
                    <div className="grid-3">
                        <div>
                            <div className="icon-cover">
                                <ion-icon name="body-outline"></ion-icon>
                            </div>
                            <h4>Building Healthy Connections</h4>
                            <p>Definitely beginner friendly, and of great benefit to those may love dancing, but
                                have never trained in any discipline.  unox 1 has given me an edge.</p>
                        </div>
                        <div>
                            <div className="icon-cover">
                                <ion-icon name="barbell-outline"></ion-icon>
                            </div>
                            <h4>Building Healthy Connections</h4>
                            <p>Definitely beginner friendly, and of great benefit to those may love dancing, but
                                have never trained in any discipline.  unox 1 has given me an edge.</p>
                        </div>
                        <div>
                            <div className="icon-cover">
                                <ion-icon name="ribbon-outline"></ion-icon>
                            </div>
                            <h4>Building Healthy Connections</h4>
                            <p>Definitely beginner friendly, and of great benefit to those may love dancing, but
                                have never trained in any discipline.  unox 1 has given me an edge.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="team mt_5">
                    <div className="contain">
                        <h3 className="page-title">Meet our Team</h3>
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
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AboutUs;