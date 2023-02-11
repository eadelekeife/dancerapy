import "./homepage.css";

import React from "react";
import Slider from "react-slick";

import { Rate } from "antd";

import AboutImage from "../../assets/images/homepage/about.webp";
import John from "../../assets/images/homepage/john.webp";
import { ReactComponent as About } from "../../assets/images/mini.svg";
import { ReactComponent as ArrowSvg } from '../../assets/images/arrow.svg';
import { ReactComponent as ImageBlock1 } from '../../assets/images/homepage/imageblock1.svg';

import Nav from "../../utils/nav";
import Footer from "../../utils/footer";

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
    return (
        <div className="new-homepage about_us">
            <Nav />
            <div className="homepage-hero">
                <video src="https://lagostheatrevideos.s3.amazonaws.com/intro.mp4"
                    playsInline={true} style={{ background: 'black' }}
                    alt="Introduction Video" className="about_video" controls={true} loop />
                <div className="black-bg">

                </div>
            </div>
            <div className="homepage_plan">
                <div className="desktop-only">
                    <div className="flex-display">
                        <div className="blur_me">
                            <div className="show_homepage_content">
                                <div className="contain">
                                    <div>
                                        <div className="grid_4">
                                            <div >
                                                <img src={Annual} alt="_1" />
                                            </div>
                                            <div>
                                                <img src={Flash} alt="_1" />
                                            </div>
                                            <div>
                                                <img src={Zoom} alt="_1" />
                                            </div>
                                            <div>
                                                <img src={Physical} alt="_1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="whiten_me">
                        </div>
                    </div>
                </div>
                <div className="mobile-only mt-5">
                    <div>
                        <div className="first-display contain">
                            <h6>Welcome to Dancerapy</h6>
                            <h2>Easy to follow Dance Fitness Trainings</h2>
                            <Link to={AppRoute.about}>Learn more</Link>
                        </div>
                        {/* <Divider style={{ marginTop: 5, marginBottom: 10 }} /> */}
                        <div className="contain">
                            {/* <p>Easy to follow. Hard to stop! Get ready for your workout with
                                our DanceRapy fitness series. See our dance plans below.</p> */}
                            <p>Dancerapy is a dance and fitness program that infuses tenets of various African
                                styles. It’s fun. It’s easy. It’s effective. See our dance plans below.</p>
                        </div>
                    </div>
                    <div className="inner-contain">
                        <Slider {...settings}>
                            <div key={1}>
                                <img src={Annual} alt="_1" />
                            </div>
                            <div key={2}>
                                <img src={Flash} alt="_1" />
                            </div>
                            <div key={3}>
                                <img src={Zoom} alt="_1" />
                            </div>
                            <div key={4}>
                                <img src={Physical} alt="_1" />
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
            <div className="mt-5 instructor-cover">
                <div className="contain">
                    <div className="instructor">
                        <div className="contain">
                            <div className="grid_2">
                                <div>
                                    <h4>Get ready for your workout with our DanceRapy fitness series</h4>
                                    {/* <p>
                                        Our vision is to ensure that dance fitness becomes a lifestyle for
                                        everyone, millions of people around the world thereby increasing
                                        life expectancy by 15 – 20%. Let Dancerapy help ignite the connections and
                                        buuild team bonding spirit within your organization. We also have quarterly gatherings
                                        nationwide to network, connect and have fun.
                                    </p> */}

                                    <p>
                                        Dancerapy is a fitness and lifestyle brand invested in reintroducing dance as
                                        a choice therapy for healthy living. As a movement, Dancerapy personalizes
                                        the idea of dance as a culture towards achieving wholeness in health and
                                        fitness. Let Dancerapy help ignite the connections and
                                        buuild team bonding spirit within your organization.
                                    </p>
                                    <Link to={AppRoute.marathon} className="btn_border_black">See how we impact companies</Link>
                                </div>
                                <div>
                                    <div className="video-cover">
                                        <ReactPlayer
                                            width="100%" height="100%"
                                            playsinline={true} style={{ background: 'black' }}
                                            url="https://lagostheatrevideos.s3.amazonaws.com/intro.mp4"
                                            playing={false} controls={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 homepage_links">
                <div className="blur_me">
                    <div className="show_homepage_content">
                        <div className="contain">
                            <h3 className="page-title">Learn more about what we do</h3>
                            <div>
                                <div className="grid_4">
                                    <div>
                                        <img src={Insta1} alt="event" />
                                        <div>
                                            <h3>Become a Dancerapy Instructor</h3>
                                            <p>This is a career empowerment system aimed at equipping you with the
                                                tools required for sustainable growth and income.
                                            </p>
                                            <Link to={AppRoute.instructor} className="btn_border_black">Learn More</Link>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={Insta2} alt="event" />
                                        <div>
                                            <h3>Corporate Events and Schools</h3>
                                            <p>
                                                Dancerapy’s long-term vision is to inspire our community with
                                                non-competitive dance education and many performance
                                                opportunities.
                                            </p>
                                            <Link to={AppRoute.corporate} className="btn_border_black">Learn More</Link>
                                        </div>
                                    </div>
                                    <div className="desktop-only">
                                        <img src={Insta3} alt="event" />
                                        <div>
                                            <h3>Dancerapy Physical Classes</h3>
                                            <p>We have 3 centers spread out across Lagos to make it easy for you to
                                                find us coupled with our numerous training sessions to fit your
                                                schedule.</p>
                                            <Link to={AppRoute.trainings} className="btn_border_black">See our centers</Link>
                                        </div>
                                    </div>
                                    <div className="desktop-only">
                                        <img src={Insta4} alt="event" />
                                        <div>
                                            <h3>Reach out to us</h3>
                                            <p>We have an efficient support team ready to take your calls and
                                                respond to all of the messages you might have on our processes. </p>
                                            <Link to={AppRoute.contact} className="btn_border_black">Find out how</Link>
                                        </div>
                                    </div>
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