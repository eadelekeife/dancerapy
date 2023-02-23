import "./mini.css";
import "./_1.css";

import React from "react";

import AboutHero from "../../assets/images/homepage/home_hero.jpeg";

import Award from "../../assets/images/content/award.svg";
import Eye from "../../assets/images/content/eye.svg";
import Target from "../../assets/images/content/target.svg";

import Nav from "../../utils/nav";
import Footer from "../../utils/footer";
import { ReactComponent as Wave } from "../../assets/images/wave-yellow.svg";

const AboutUs = () => {
    return (
        <div className="about_us">
            <Nav />
            <div className="about_hero">
                <div className="grid_2">
                    <div className="about_hero_content">
                        <h2>Building Healthy <br /> Connections through Dance.</h2>
                        <p>
                            Dancerapy is a fitness and lifestyle brand invested in reintroducing dance as a choice
                            therapy for healthy living. As a movement, Dancerapy personalizes the idea of dance as
                            a culture towards achieving wholeness in health and fitness. Let Dancerapy help ignite
                            the connections and build team bonding spirit within your organization.
                        </p>
                        {/* <p>We are an essential partnership link between produce growers and commercial purchasers
                            from coast to coast. So bring it on. We are an essential partnership link between
                            produce growers. We are an essential partnership link between produce growers and
                            commercial purchasers from coast to coast. </p> */}
                    </div>
                    <div className="about-redesign-img-cover">
                        <img src={AboutHero} alt="about image" />
                        <div className="mobile-only">
                            <Wave className="wave-image" />
                        </div>
                    </div>
                </div>
                {/* <div className="bg-flow">
                    <About />
                </div> */}
            </div>
            <div className="black-content">
                <div className="scroll-container">
                    <div className="scroll-text">
                        <p><ion-icon name="checkmark-circle-outline"></ion-icon> Keep fit</p>
                        <p><ion-icon name="checkmark-circle-outline"></ion-icon> Loose Weight</p>
                        <p><ion-icon name="checkmark-circle-outline"></ion-icon> Learn dance steps</p>
                        <p><ion-icon name="checkmark-circle-outline"></ion-icon> Fun and engaging classes</p>
                        <p><ion-icon name="checkmark-circle-outline"></ion-icon> Personalized dance plans</p>
                        <p><ion-icon name="checkmark-circle-outline"></ion-icon> Expert dance instruction</p>
                        <p><ion-icon name="checkmark-circle-outline"></ion-icon> Superb customer support</p>
                        <p><ion-icon name="checkmark-circle-outline"></ion-icon> Networking opportunities</p>
                    </div>
                </div>
            </div>
            <div className="about_hero_text mt-5">
                <div className="contain">
                    <h5>OUR PLAN</h5>
                    <h3>Keep Fit, Lose Weight, Learn Dance.</h3>
                    <p className="edit">
                        Dancerapy’s long-term vision is to inspire our community with non-competitive dance
                        education and many performance opportunities. We have 3 centers spread out across
                        Lagos to make it easy for you to find us coupled with our numerous online training
                        sessions to fit your schedule.
                    </p>
                    {/* <p className="edit">
                        As we grew, we vowed to not only protect our customers from dehydration but create the
                        most effective, science-backed lineup of wellness products. When assembled, these
                        heroes empower you to live your best life. Onwards and upwards.
                    </p> */}
                    <div className="grid_3">
                        <div>
                            <div className="about_hero_text_image">
                                <img src={Eye} alt="john" />
                            </div>
                            <h5 className="hero-text-header">Our Vision Statement</h5>
                            <p>
                                To ensure that dance fitness becomes a lifestyle for everyone, millions of
                                people around the world thereby increasing life expectancy by 15 – 20%.
                            </p>
                        </div>
                        <div>
                            <div className="about_hero_text_image">
                                <img src={Target} alt="john" />
                            </div>
                            <h5 className="hero-text-header">Our Mission Statement</h5>
                            <p>
                                MISSION STATEMENT: We want to ensure that people have access to DANCERAPY worldwide
                                through our S.T.U.N.D (Studio Next Door Program)
                            </p>
                        </div>
                        <div>
                            <div className="about_hero_text_image">
                                <img src={Award} alt="john" />
                            </div>
                            <h5 className="hero-text-header">Our Long-term Vision</h5>
                            <p>
                                To inspire our community with non-competitive dance education and offer
                                many opportunities in a facility that will develop an appreciation of the fine arts.
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
                        <div className="">
                            <div className="team_img_cover team_card _10">
                                {/* <img src={_1} alt="_1" /> */}
                                <div className="site_bg_overlay">
                                    <ion-icon name="logo-instagram"></ion-icon>
                                </div>
                            </div>
                            <div>
                                <h4 className="team_member_name">Anozie Malachi</h4>
                                <p className="team_member_role">Dancerapy Instructor</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer margin={true} />
        </div>
    )
}

export default AboutUs;