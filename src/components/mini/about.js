import "./mini.css";

import React from "react";

import AboutImage from "../../assets/images/homepage/about.webp";
import John from "../../assets/images/homepage/john.webp";
import { ReactComponent as About } from "./mini.svg";

import Nav from "../../utils/nav";
import Footer from "../../utils/footer";

const AboutUs = () => {
    return (
        <div className="about_us">
            <Nav />
            <div className="about_hero">
                <div className="grid_2">
                    <div className="about_hero_content">
                        <h2>Bring us your toughest challenges.</h2>
                        <p>We are an essential partnership link between produce growers and commercial purchasers
                            from coast to coast. So bring it on. We are an essential partnership link between
                            produce growers. We are an essential partnership link between produce growers and
                            commercial purchasers from coast to coast. </p>
                    </div>
                    <div>
                        <img src={AboutImage} alt="about image" />
                    </div>
                </div>
                <div className="bg-flow">
                    <About />
                </div>
            </div>
            <div className="black-content">
                <div>
                    <p>Member-only Perks</p>
                    <p>20% on every order</p>
                    <p>Free Shipping</p>
                    <p>Custom plans</p>
                    <p>Member-only Perks</p>
                    <p>Free Shipping</p>
                    <p>Custom plans</p>
                    <p>Member-only Perks</p>
                </div>
            </div>
            <div className="about_hero_text mt-5">
                <div className="contain">
                    <h5>OUR PROMISE</h5>
                    <h3>Never Be Thirsty Again</h3>
                    <p className="edit">
                        As we grew, we vowed to not only protect our customers from dehydration but create the
                        most effective, science-backed lineup of wellness products. When assembled, these
                        heroes empower you to live your best life. Onwards and upwards.
                    </p>
                    <div className="grid_3">
                        <div>
                            <img src={John} alt="john" />
                            <h5 className="hero-text-header">Mrs Onyinye</h5>
                            <p>
                                As we grew, we vowed to not only protect our customers from dehydration but
                                create the most effective, science-backed lineup of wellness products.
                            </p>
                        </div>
                        <div>
                            <img src={John} alt="john" />
                            <h5 className="hero-text-header">Mrs Onyinye</h5>
                            <p>
                                As we grew, we vowed to not only protect our customers from dehydration but
                                create the most effective, science-backed lineup of wellness products.
                            </p>
                        </div>
                        <div>
                            <img src={John} alt="john" />
                            <h5 className="hero-text-header">Mrs Onyinye</h5>
                            <p>
                                As we grew, we vowed to not only protect our customers from dehydration but
                                create the most effective, science-backed lineup of wellness products.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="team-bg mt-5">

            </div>
            <div className="team mt-5">
                <div className="contain">
                    <h3>Meet our Team</h3>
                    <div className="grid_5">
                        <div className="">
                            <div className="team_img_cover team_card _1">
                                {/* <img src={_1} alt="_1" /> */}
                            </div>
                            <div>
                                <h4 className="team_member_name">Obafunwa Bimbo</h4>
                                <p className="team_member_role">Talent Manager</p>
                            </div>
                        </div>
                        <div className="">
                            <div className="team_img_cover team_card _2">
                                {/* <img src={_1} alt="_1" /> */}
                            </div>
                            <div>
                                <h4 className="team_member_name">Obafunwa Bimbo</h4>
                                <p className="team_member_role">Talent Manager</p>
                            </div>
                        </div>
                        <div className="">
                            <div className="team_img_cover team_card _3">
                                {/* <img src={_1} alt="_1" /> */}
                            </div>
                            <div>
                                <h4 className="team_member_name">Obafunwa Bimbo</h4>
                                <p className="team_member_role">Talent Manager</p>
                            </div>
                        </div>
                        <div className="">
                            <div className="team_img_cover team_card _4">
                                {/* <img src={_1} alt="_1" /> */}
                            </div>
                            <div>
                                <h4 className="team_member_name">Obafunwa Bimbo</h4>
                                <p className="team_member_role">Talent Manager</p>
                            </div>
                        </div>
                        <div className="">
                            <div className="team_img_cover team_card _5">
                                {/* <img src={_1} alt="_1" /> */}
                            </div>
                            <div>
                                <h4 className="team_member_name">Obafunwa Bimbo</h4>
                                <p className="team_member_role">Talent Manager</p>
                            </div>
                        </div>
                        <div className="">
                            <div className="team_img_cover team_card _6">
                                {/* <img src={_1} alt="_1" /> */}
                            </div>
                            <div>
                                <h4 className="team_member_name">Obafunwa Bimbo</h4>
                                <p className="team_member_role">Talent Manager</p>
                            </div>
                        </div>
                        <div className="">
                            <div className="team_img_cover team_card _7">
                                {/* <img src={_1} alt="_1" /> */}
                            </div>
                            <div>
                                <h4 className="team_member_name">Obafunwa Bimbo</h4>
                                <p className="team_member_role">Talent Manager</p>
                            </div>
                        </div>
                        <div className="">
                            <div className="team_img_cover team_card _8">
                                {/* <img src={_1} alt="_1" /> */}
                            </div>
                            <div>
                                <h4 className="team_member_name">Obafunwa Bimbo</h4>
                                <p className="team_member_role">Talent Manager</p>
                            </div>
                        </div>
                        <div className="">
                            <div className="team_img_cover team_card _9">
                                {/* <img src={_1} alt="_1" /> */}
                            </div>
                            <div>
                                <h4 className="team_member_name">Obafunwa Bimbo</h4>
                                <p className="team_member_role">Talent Manager</p>
                            </div>
                        </div>
                        <div className="">
                            <div className="team_img_cover team_card _10">
                                {/* <img src={_1} alt="_1" /> */}
                            </div>
                            <div>
                                <h4 className="team_member_name">Obafunwa Bimbo</h4>
                                <p className="team_member_role">Talent Manager</p>
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