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
            <div>
                <div className="contain">
                    <div className="black-bg">
                        <ion-icon name="play-circle-outline"></ion-icon>
                    </div>
                </div>
            </div>
            <div className="sec-hero">
                <div className="contain">
                    <div>
                        <div className="sec-hero-text">
                            <h2>We’re meeting the academic and nurturing needs of today’s busy families</h2>
                            <p>We take the best of traditional schooling and homeschooling to create a unique educational
                                model that gives parents the ability to be involved in an academic program with their
                                children and still enjoy a high level of support.</p>
                        </div>
                    </div>
                    <div className="grid-4">
                        <img src={School1} alt="school1" />
                        <img src={School2} alt="school1" className="drop" />
                        <img src={School3} alt="school1" className="drop" />
                        <img src={School4} alt="school1" />
                    </div>
                </div>
            </div>
            <div className="new-hero-sect">
                <div className="contain">
                    <div className="grid-2">
                        <div>
                            {/* <h2>Get certified by our team of experts and handle classes</h2> */}
                            <h2>Take your workout to the dance <br /> floor, all from your home.</h2>
                        </div>
                        <div>
                            <p>Dancerapy is a fitness and lifestyle brand invested in reintroducing dance as
                                a choice therapy for healthy living. We believe that everyone can benefit from
                                dancing, and we're committed to helping our clients achieve their dance goals. </p>
                        </div>
                    </div>
                    <div className="grid-3">
                        <div className="new-hero-block">
                            <img src={Test1} alt="" />
                            <div className="new-text-block">
                                <h4>Loose Weight</h4>
                                <p>Our trainings can be an effective tool for weight management. The combination of
                                    cardio exercises and calorie-burning movements in dance routines helps burn
                                    calories, aiding in weight loss or weight maintenance.</p>
                            </div>
                        </div>
                        <div className="new-hero-block">
                            <img src={Test2} alt="" />
                            <div className="new-text-block">
                                <h4>Relief Stress</h4>
                                <p>Dancing is a great stress reliever. The music, rhythm, and movement release
                                    endorphins, which are known as "feel-good" hormones, promoting relaxation, reducing
                                    stress levels, and boosting mood.</p>
                                {/* <p>The continuous movement and varying intensities of our dance routines gradually improve
                                    your body's ability to sustain physical activity for longer periods.</p> */}
                            </div>
                        </div>
                        <div className="new-hero-block">
                            <img src={Test3} alt="" />
                            <div className="new-text-block">
                                <h4>Full-Body Workout</h4>
                                <p>Our trainings engage multiple muscle groups simultaneously, providing a comprehensive
                                    full-body workout. It helps tone and strengthen muscles, improve flexibility, and
                                    enhance overall body coordination.</p>
                                {/* <p> Being a dance instructor offers opportunities for personal growth and
                                    development. Teaching others requires continuous learning, refining teaching
                                    techniques, and staying updated with dance styles and trends.</p> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="new-hero-ideo-block">
                    <div className="contain">
                        <div className="grid-2">
                            <div>
                                {/* <h2>Get certified by our team of experts and handle classes</h2> */}
                                <h2>Checkout the many benefits our <br /> Dance fitness plans can offer you</h2>
                            </div>
                            <div>
                                <p> Being a dance instructor offers opportunities for personal growth and
                                    development. Teaching others requires continuous learning, refining teaching
                                    techniques, and staying updated with dance styles and trends.</p>
                            </div>
                        </div>
                        <div className="black-bg">
                            <ion-icon name="play-circle-outline"></ion-icon>
                        </div>
                    </div>
                </div>
            </div>
            <div className="white-sect">

            </div>
            <div className="new-hero-sect testimonial-cut">
                <div className="contain">
                    <h2>See how we impact companies</h2>
                </div>
                <div className="company-testimonial">
                    <div className="grid-4">
                        <div className="company-grid-testimonial-block left">
                            <img src={AccessImage} alt="" />
                        </div>
                        <div className="company-grid-testimonial-block">
                            <img src={MtnImage} alt="" />
                        </div>
                        <div className="company-grid-testimonial-block">
                            <img src={GtcoImage} alt="" />
                        </div>
                        <div className="company-grid-testimonial-block">
                            <img src={TerraImage} alt="" />
                        </div>
                        <div className="company-grid-testimonial-block bottom left">
                            <img src={CoronaImage} alt="" />
                        </div>
                        <div className="company-grid-testimonial-block bottom">
                            <img src={DansolImage} alt="" />
                        </div>
                        <div className="company-grid-testimonial-block bottom">
                            <img src={ShellImage} alt="" />
                        </div>
                        <div className="company-grid-testimonial-block bottom">
                            <img src={AccessImage} alt="" />
                        </div>
                    </div>
                </div>
                <div className="person-testimonial">
                    <div className="contain">
                        <h2>Trusted by People like you</h2>
                        <OwlCarousel className="owl-theme" lazyLoad={true}
                            responsive={responsive}
                            responsiveClass={true} loop={true} margin={20} nav>
                            <div class='item'>
                                <div className="grid-2-bias">
                                    <div className="person-picture">

                                    </div>
                                    <div className="text-bg">
                                        <p>&ldquo;Being a dance instructor offers opportunities for personal growth and
                                            development. Teaching others requires continuous learning, refining teaching
                                            techniques, and staying updated with dance styles and trends. Being a dance instructor offers opportunities for personal growth and
                                            development.&rdquo;</p>

                                        <p className="testi-author">Adeleke Ifeoluwase, Dance Student</p>
                                    </div>
                                </div>
                            </div>
                        </OwlCarousel>
                    </div>
                </div>
            </div>
            <div className="white-sect last">

            </div>
            <Footer noMargin={true} />
        </div >
    )
}

export default Homepage;