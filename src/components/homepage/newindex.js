import "./homepage.css";

import React from "react";
import Slider from "react-slick";

import { Divider, Rate } from "antd";

import AboutImage from "../../assets/images/homepage/about.webp";
import John from "../../assets/images/homepage/john.webp";
import { ReactComponent as Mailchimp } from "./_3.svg";
import { ReactComponent as About } from "../../assets/images/mini.svg";
import { ReactComponent as ArrowSvg } from '../../assets/images/arrow.svg';
import { ReactComponent as ImageBlock1 } from '../../assets/images/homepage/imageblock1.svg';

import Nav from "../../utils/nav";
import Footer from "../../utils/footer-sec";

import { Input } from 'antd';
import { Controller, useForm } from "react-hook-form";

import { Link } from "react-router-dom";
import AppRoute from "../../utils/routes";
import ReactPlayer from 'react-player';

import Block1 from '../../assets/images/homepage/header.jpg';
import Block2 from '../../assets/images/homepage/header1.jpg';
import Block3 from '../../assets/images/homepage/header2.jpg';

import Annual from "../../assets/images/homepage/annual.jpeg";
import Flash from "../../assets/images/homepage/flash.jpeg";
import Zoom from "../../assets/images/homepage/zoom.jpg";
import Physical from "../../assets/images/homepage/physical.jpeg";
import Instructor from "../../assets/images/homepage/instructor_hero.jpg";
import Schools from "../../assets/images/homepage/link2.jpeg";
import Community from "../../assets/images/homepage/community.jpg";

import Insta1 from "../../assets/images/content/event_1.jpg";
import Insta2 from "../../assets/images/content/event3.jpg";
import Insta3 from "../../assets/images/content/testi.jpg";
import Insta4 from "../../assets/images/content/event4.jpg";

import _1 from '../../assets/images/companies/access.webp';
import _2 from '../../assets/images/companies/shell.png';
import _3 from '../../assets/images/companies/terra.png';
import _4 from '../../assets/images/companies/corona.png';
import _6 from '../../assets/images/companies/dansol.png';
import _7 from '../../assets/images/companies/gtco.png';
import _8 from '../../assets/images/companies/mtn.png';

import Loom1 from '../../assets/images/homepage/loom1.jpg';
import Ready from '../../assets/images/homepage/ready.webp';

import { ReactComponent as Wave } from "./wave.svg";
import { ReactComponent as Cabify } from "./run.svg";

const AboutUs = () => {

    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        centerPadding: '30px',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: false,
                    centerMode: true,
                    focusOnSelect: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    centerMode: true,
                    focusOnSelect: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    focusOnSelect: true
                }
            }
        ]
    }
    const { handleSubmit, control } = useForm({});
    return (
        <div className="new-homepage about_us">
            <Nav />
            <div className="dance-redesign-props-display">
                <div className="dance-redesign-props-img-cover">
                    <img src={Loom1} alt="loom 1" />
                    <Wave className="wave-image" />
                </div>
                <div className="contain">
                    <div className="block"></div>
                    <h4>For over ten years.</h4>
                    <p>We’ve been skillfully weaving together the strands of strategic digital marketing since
                        2009. Loom helps all kinds of ambitious businesses to improve their digital presence and
                        make digital work for them commercially. Find out more about who we are.</p>
                    <button className="btn_red">Meet the Loom team</button>
                </div>
            </div>
            <div
                // className="dance-redesign-hero">
                className="dance-props-sect mt-5">
                <div className="">
                    <div className="dance-hero-cover">
                        <div className="first-display">
                            <div className="contain">
                                <h3>Profession Fitness Dance Trainings</h3>
                            </div>
                            <hr />
                            <div className="contain">
                                <p>We’ve been skillfully weaving together the strands of strategic digital marketing since
                                    2009. Loom helps all kinds of ambitious businesses to improve their digital presence and
                                    make digital work for them commercially. Find out more about who we are.</p>
                            </div>
                        </div>
                        <div className="contain">
                            <ul>
                                <li>
                                    <h5>Profession Fitness Dance Trainings</h5>
                                    <p>We’ve been skillfully weaving together the strands of strategic digital marketing since
                                        2009. Loom helps all kinds of ambitious businesses to improve their digital presence.</p>
                                </li>
                                <li>
                                    <h5>Profession Fitness Dance Trainings</h5>
                                    <p>We’ve been skillfully weaving together the strands of strategic digital marketing since
                                        2009. Loom helps all kinds of ambitious businesses to improve their digital presence.</p>
                                </li>
                                <li>
                                    <h5>Profession Fitness Dance Trainings</h5>
                                    <p>We’ve been skillfully weaving together the strands of strategic digital marketing since
                                        2009. Loom helps all kinds of ambitious businesses to improve their digital presence.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dance-redesign-text-display mt-5">
                <div className="contain">
                    {/* <h3>Integrated <br /> Digital Marketing</h3> */}
                    {/* <p>We’ve been skillfully weaving together the strands of strategic digital marketing since
                        2009. Loom helps all kinds of ambitious businesses to improve their digital presence and
                        make digital work for them commercially. Find out more about who we are.</p> */}
                    <div>
                        <Divider />
                        <img src={Instructor} alt="Instructor" />
                        <p>We’ve been skillfully weaving together the strands of strategic digital marketing since
                            2009. Loom helps all kinds of ambitious businesses to improve their digital presence and
                            make digital work for them commercially. Find out more about who we are.</p>
                        <button>How we weave channels together</button>
                    </div>
                    <div>
                        <Divider />
                        <img src={Schools} alt="Instructor" />
                        <p>We’ve been skillfully weaving together the strands of strategic digital marketing since
                            2009. Loom helps all kinds of ambitious businesses to improve their digital presence and
                            make digital work for them commercially. Find out more about who we are.</p>
                        <button>How we weave channels together</button>
                    </div>
                </div>
            </div>
            <div
                style={{ display: 'none' }}
                className="dance-redesign-props-display mt-5">
                <div className="dance-redesign-props-img-cover">
                    <img src={Loom1} alt="loom 1" />
                    <Wave className="wave-image" />
                </div>
                <div className="contain">
                    <div className="block"></div>
                    <h4>For over ten years.</h4>
                    <p>We’ve been skillfully weaving together the strands of strategic digital marketing since
                        2009. Loom helps all kinds of ambitious businesses to improve their digital presence and
                        make digital work for them commercially. Find out more about who we are.</p>
                    <button className="btn_red">Meet the Loom team</button>
                </div>
            </div>
            <div className="final-props mt-5">
                <div className="contain">
                    <div>
                        <h2>Your safety, our commitment</h2>
                        <p>Every detail that is part of our service has been created with your safety in mind. We’ve been
                            skillfully weaving together the strands of strategic digital marketing since
                            2009. Loom helps all kinds of ambitious businesses to improve their digital presence.</p>
                        <div>
                            <ul>
                                <li>
                                    <Cabify />
                                    <h5>COVID-19 Protection</h5>
                                    <p>We’ve been skillfully weaving together the strands of strategic digital marketing since
                                        2009. Loom helps all kinds of ambitious businesses to improve their digital presence.</p>
                                </li>
                                <li>
                                    <Cabify />
                                    <h5>COVID-19 Protection</h5>
                                    <p>We’ve been skillfully weaving together the strands of strategic digital marketing since
                                        2009. Loom helps all kinds of ambitious businesses to improve their digital presence.</p>
                                </li>
                                <li>
                                    <Cabify />
                                    <h5>COVID-19 Protection</h5>
                                    <p>We’ve been skillfully weaving together the strands of strategic digital marketing since
                                        2009. Loom helps all kinds of ambitious businesses to improve their digital presence.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="final-cover mt-5">
                <div className="contain">
                    <h5>CABIFY IN YOUR CITY</h5>
                    <h3>We are available in 8 countries and more than 40 cities worldwide</h3>
                    <button>Learn more about us</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AboutUs;