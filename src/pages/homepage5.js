import "../assets/css/homepage.css";

import React from "react";
import Nav from "../components/nav";
import { Divider } from "antd";

import VideoJS from '../components/video-player';
import OwlCarousel from 'react-owl-carousel';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import YoungMan from "../assets/images/youngin.png";
import Footer from "../components/footer";

// import MTNImage from "../assets/images/team/_4.jpg";
import AccessImage from '../assets/images/companies/access.webp';
import ShellImage from '../assets/images/companies/shell.png';
import TerraImage from '../assets/images/companies/terra.png';
import CoronaImage from '../assets/images/companies/corona.png';
import DansolImage from '../assets/images/companies/dansol.png';
import GtcoImage from '../assets/images/companies/gtco.png';
import MtnImage from '../assets/images/companies/mtn.png';

import { ReactComponent as Company1 } from "../assets/images/a-company/_1.svg";
import { ReactComponent as Company2 } from "../assets/images/a-company/_2.svg";
import { ReactComponent as Company3 } from "../assets/images/a-company/_3.svg";
import { ReactComponent as Company4 } from "../assets/images/a-company/_4.svg";
import { ReactComponent as Company5 } from "../assets/images/a-company/_5.svg";

import Grid1 from "../assets/images/a-company/grid1.jpg";
import Grid2 from "../assets/images/a-company/grid2.jpg";
import Grid3 from "../assets/images/a-company/grid3.jpg";

import { ReactComponent as PlusIcon } from "../assets/images/plus.svg";
import Instructor2 from "../assets/images/team/_4.jpg";
import Instructor3 from "../assets/images/team/_5.jpg";
import Instructor4 from "../assets/images/team/_6.jpg";
import Instructor5 from "../assets/images/team/_7.jpg";
import Instructor6 from "../assets/images/team/_8.jpg";

import Test1 from "../assets/images/content/testi.jpg";
import Test2 from "../assets/images/content/event_1.jpg";
import Test3 from "../assets/images/content/signup.jpeg";

import School1 from "../assets/images/a-company/clatallahassee1.jpg";
import School2 from "../assets/images/a-company/clatallahassee2.jpg";
import School3 from "../assets/images/a-company/clatallahassee3.jpg";
import School4 from "../assets/images/a-company/clatallahassee4.jpg";


import ResponsiveImage from "../assets/images/illustrations/responsive.png";

import AboutHero from "../assets/images/content/about_hero.jpg";
import HomepageImg from "../assets/images/a-company/homepage-accordion-goals-en-3x.webp";
import DeviceImg from "../assets/images/a-company/device-pile.png"
import { ReactComponent as ExternalLink } from "../assets/images/external-link.svg";
import CorporateHero from "../assets/images/content/event4.jpg";
import InstructorHero from "../assets/images/content/event3.jpg";
import AllAppRoutes from "../utils/routes";
import { Link } from "react-router-dom";
// import OfficePeople from "../assets/images/homepage/office.jpg";

const Homepage = () => {
    const responsive = {
        0: {
            items: 1,
            nav: false,
            margin: 20,
            autoPlay: true,
            stagePadding: 50,
            loop: true
        },
        600: {
            items: 3,
            nav: false,
            margin: 20,
            autoPlay: true,
            stagePadding: 50,
            loop: true
        },
        1000: {
            items: 1,
            nav: false,
            margin: 40,
            stagePadding: 80,
            autoPlay: true,
            loop: true
        }
    }
    const videoJsOptions = {
        autoplay: true,
        controls: false,
        responsive: true,
        loop: true,
        fluid: true,
        sources: [{
            src: "https://lagostheatrevideos.s3.amazonaws.com/intro.mp4",
            type: 'video/mp4'
        }]
    };

    const handlePlayerReady = (player) => {
        // playerRef.current = player;
    };
    return (
        <div className="homepage">
            <Nav />
            <div className="hero-sect">
                {/* <div className="grid-2"> */}
                <div>
                    <div className="first-hero-section">
                        <div className="white-text-bg">
                            {/* <VideoJS options={videoJsOptions}
                                onReady={handlePlayerReady} />
                            <div className="contain">
                                <div>
                                    <div className="text-cover">
                                        <h1>OWN YOUR STRENGTH, OWN YOU</h1>
                                        <button>START YOUR JOURNEY</button>
                                    </div>
                                    <div className="welcome-video-bg">

                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="second-hero-sect">
                            {/* <img src={YoungMan} alt="young man smiling" /> */}
                            <div className="second-hero-bottom-tag">
                                <div className="third-hero-bottom-tag">

                                </div>
                            </div>
                            {/* <div className="first-hero-top-tag">
                            </div>
                            <div className="third-hero-bottom-tag">

                            </div> */}
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>
            <div className="dancerapy-props">
                <div className="contain">
                    <div>
                        <h2>We’re meeting the academic and nurturing needs of today’s busy families</h2>
                    </div>
                    <div className="grid-3">
                        <div>
                            <h5>01</h5>
                            <h4>Highly Trained Teachers</h4>
                            <p>We take the best of traditional schooling and homeschooling to create a unique educational
                                model that gives parents the ability to be involved in an academic program with their
                                children and still enjoy a high level of support.</p>
                        </div>
                        <div>
                            <h5>01</h5>
                            <h4>Highly Trained Teachers</h4>
                            <p>We take the best of traditional schooling and homeschooling to create a unique educational
                                model that gives parents the ability to be involved in an academic program with their
                                children and still enjoy a high level of support.</p>
                        </div>
                        <div>
                            <h5>01</h5>
                            <h4>Highly Trained Teachers</h4>
                            <p>We take the best of traditional schooling and homeschooling to create a unique educational
                                model that gives parents the ability to be involved in an academic program with their
                                children and still enjoy a high level of support.</p>
                        </div>
                        <div>
                            <h5>01</h5>
                            <h4>Highly Trained Teachers</h4>
                            <p>We take the best of traditional schooling and homeschooling to create a unique educational
                                model that gives parents the ability to be involved in an academic program with their
                                children and still enjoy a high level of support.</p>
                        </div>
                        <div>
                            <h5>01</h5>
                            <h4>Highly Trained Teachers</h4>
                            <p>We take the best of traditional schooling and homeschooling to create a unique educational
                                model that gives parents the ability to be involved in an academic program with their
                                children and still enjoy a high level of support.</p>
                        </div>
                        <div>
                            <h5>01</h5>
                            <h4>Highly Trained Teachers</h4>
                            <p>We take the best of traditional schooling and homeschooling to create a unique educational
                                model that gives parents the ability to be involved in an academic program with their
                                children and still enjoy a high level of support.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt_5">
                <div className="contain">
                    <div className="black-bg">
                        <ion-icon name="play-circle-outline"></ion-icon>
                    </div>
                </div>
            </div>
            <div className="dancerapy-props pt_5">
                <div className="contain">
                    <div>
                        <h2>We’re meeting the academic and nurturing needs of today’s busy families</h2>
                    </div>
                    <div className="grid-3">
                        <div>
                            <h5>01</h5>
                            <h4>Highly Trained Teachers</h4>
                            <p>We take the best of traditional schooling and homeschooling to create a unique educational
                                model that gives parents the ability to be involved in an academic program with their
                                children and still enjoy a high level of support.</p>
                        </div>
                        <div>
                            <h5>01</h5>
                            <h4>Highly Trained Teachers</h4>
                            <p>We take the best of traditional schooling and homeschooling to create a unique educational
                                model that gives parents the ability to be involved in an academic program with their
                                children and still enjoy a high level of support.</p>
                        </div>
                        <div>
                            <h5>01</h5>
                            <h4>Highly Trained Teachers</h4>
                            <p>We take the best of traditional schooling and homeschooling to create a unique educational
                                model that gives parents the ability to be involved in an academic program with their
                                children and still enjoy a high level of support.</p>
                        </div>
                        <div>
                            <h5>01</h5>
                            <h4>Highly Trained Teachers</h4>
                            <p>We take the best of traditional schooling and homeschooling to create a unique educational
                                model that gives parents the ability to be involved in an academic program with their
                                children and still enjoy a high level of support.</p>
                        </div>
                        <div>
                            <h5>01</h5>
                            <h4>Highly Trained Teachers</h4>
                            <p>We take the best of traditional schooling and homeschooling to create a unique educational
                                model that gives parents the ability to be involved in an academic program with their
                                children and still enjoy a high level of support.</p>
                        </div>
                        <div>
                            <h5>01</h5>
                            <h4>Highly Trained Teachers</h4>
                            <p>We take the best of traditional schooling and homeschooling to create a unique educational
                                model that gives parents the ability to be involved in an academic program with their
                                children and still enjoy a high level of support.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="white-sect">

            </div>
            <Footer noMargin={true} />
        </div >
    )
}

export default Homepage;