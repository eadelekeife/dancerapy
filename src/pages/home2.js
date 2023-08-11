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
            items: 3,
            nav: false,
            margin: 20,
            stagePadding: 40,
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
        <div className="homepage-display">
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
                            <img src={YoungMan} alt="young man smiling" />
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

            <div className="about-sub-props mt_5">
                <div className="contain">
                    <div className="grid-2">
                        <div>
                            <h3>Take your workout to the dance <br /> floor, all from your home.</h3>
                        </div>
                        <div>
                            <p>Dancerapy is a fitness and lifestyle brand invested in reintroducing dance as
                                a choice therapy for healthy living. We believe that everyone can benefit from dancing, and
                                we're committed to helping our clients achieve their dance goals. </p>
                        </div>
                    </div>
                    <div className="sec-grid-2">
                        <div className="video-message-bg">
                            {/* <h3>Our Mission Statement</h3>
                            <p> Being a dance instructor offers opportunities for personal growth and
                                development. Teaching others requires continuous learning, refining teaching
                                techniques, and staying updated with dance styles and trends.</p> */}
                            <div className="instructor-row">
                                <div className="avatar-img">
                                    <img src={Instructor2} alt="" />
                                </div>
                                <div className="avatar-img">
                                    <img src={Instructor3} alt="" />
                                </div>
                                <div className="avatar-img">
                                    <img src={Instructor4} alt="" />
                                </div>
                                <div className="avatar-img">
                                    <img src={Instructor5} alt="" />
                                </div>
                                <div className="plus-icon">
                                    <PlusIcon />
                                </div>
                            </div>
                        </div>
                        <div className="video-sec-bg">
                            <div className="video-sec-controls">
                                <div className="video-control-panel">
                                    <ion-icon name="play-circle-outline"></ion-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sec-props mt_5">
                <div className="contain">
                    <div className="grid-4">
                        <div>
                            <img src={Grid1} alt="" />
                            <p className="props-count">01</p>
                            <h3 className="props-text-header">Unbeatable Results</h3>
                            <p className="props-message">
                                Our mix of low-impact movement and unique equipment offers intense sculpting—minus
                                the drain of traditional workouts.
                            </p>
                        </div>
                        <div>
                            <img src={Grid2} alt="" />
                            <p className="props-count">01</p>
                            <h3 className="props-text-header">Unbeatable Results</h3>
                            <p className="props-message">
                                Our mix of low-impact movement and unique equipment offers intense sculpting—minus
                                the drain of traditional workouts.
                            </p>
                        </div>
                        <div>
                            <img src={Grid3} alt="" />
                            <p className="props-count">01</p>
                            <h3 className="props-text-header">Unbeatable Results</h3>
                            <p className="props-message">
                                Our mix of low-impact movement and unique equipment offers intense sculpting—minus
                                the drain of traditional workouts.
                            </p>
                        </div>
                        <div>
                            <img src={Grid3} alt="" />
                            <p className="props-count">01</p>
                            <h3 className="props-text-header">Unbeatable Results</h3>
                            <p className="props-message">
                                Our mix of low-impact movement and unique equipment offers intense sculpting—minus
                                the drain of traditional workouts.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hero-sec-props-bg mt_5">
                <div className="contain">
                    <div className="grid-2">
                        <div className="">
                            <p className="tile-summary">Why try Dancerapy?</p>
                            <h2>Building Healthy Connections through Dance. Keep Fit, Lose Weight, Learn Dance.</h2>
                            <p>We believe that everyone can benefit from dancing, and we're committed to helping our clients
                                achieve their dance goals. Join us and let's dance!</p>
                            <div className="grid-2">
                                <div>
                                    <h4>Responsive Design</h4>
                                    <p>Regular dancing can improve your coordination, balance, and spatial awareness, leading
                                        to better posture and body control.</p>
                                    <div className="mobile-only">
                                        <ion-icon name="arrow-back-circle-outline"></ion-icon>
                                        <ion-icon name="arrow-forward-circle-outline"></ion-icon>
                                    </div>
                                </div>
                                <div className="desktop-only">
                                    <h4>Customer Support</h4>
                                    <p>Dancing - a vigorous physical activity, increases your heart rate, burns calories, and helps
                                        maintain a healthy body composition.</p>
                                </div>
                                <div className="desktop-only">
                                    <h4>Original Content</h4>
                                    <p>Dancing is a fantastic form of exercise that improves cardiovascular health, stamina, strength, and
                                        flexibility.</p>
                                </div>
                                <div className="desktop-only">
                                    <h4>User Experience</h4>
                                    <p>Whether you're dancing alone in your room or participating in a dance class, it can bring
                                        happiness and a sense of fun into your life.</p>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="fake-img-cover">

                            </div>
                            {/* <img src={HomepageImg} alt="" /> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="sec-props-copy">
                <div className="contain">
                    <div className="grid-2">
                        <div>
                            <h2>Powered by Resistance</h2>
                            <p>Our specialized equipment is designed to couple with our functional-style workouts to
                                target hard-to-hit muscles from all angles—and amplify your results. Read what different
                                people like you have to say about their experiences with Dancerapy. We believe that
                                their feedback speaks volumes about the quality of our services, dedication, and
                                commitment to excellence.</p>
                        </div>
                        <div>
                            <div className="props-copy-img">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sec-testimonial-copy">
                <div>
                    <h2>Raves from Our Members</h2>
                    <div>
                        <div className="grid-3">
                            <div>
                                <p>Our specialized equipment is designed to couple with our functional-style workouts
                                    to target hard-to-hit muscles from all angles—and amplify your results.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="testimonials-list mt_5">
                <div className="contain">
                    <p className="tile-summary">OUR USER REVIEWS</p>
                    <h3>See Reviews from members of our dance community</h3>
                    <p>Read what different people like you have to say about their experiences with Dancerapy. We
                        believe that their feedback speaks volumes about the quality of our
                        services, dedication, and commitment to excellence. </p>
                    <div className="testimonial-main-cover">
                        <div className="testimonial-main-1">

                        </div>
                        <div className="testimonial-main-1 _2">

                        </div>
                    </div>
                </div>
                <div className="mobile-onl">
                    <OwlCarousel className="owl-theme" lazyLoad={true}
                        responsive={responsive}
                        responsiveClass={true} loop={true} margin={20} nav>
                        <div class='item testimonial-carousel'>
                            <div className='text-bloc _1'>
                                <div>
                                    <h2>&quot;</h2>
                                    <p>Definitely beginner friendly, and of great benefit to those may love dancing, but
                                        have never trained in any discipline. unox 1 has given me an edge and it serves
                                        as a great conversation starter, i absolutely love it!</p>
                                    <div className="testimonial-list-author">
                                        <div className="avatar">

                                        </div>
                                        <div>
                                            <h4>Adeleke Ifeoluwase</h4>
                                            <p>Dance Student</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='item testimonial-carousel'>
                            <div className='text-bloc _2'>
                                <div>
                                    <h2>&quot;</h2>
                                    <p>Definitely beginner friendly, and of great benefit to those may love dancing, but
                                        have never trained in any discipline. unox 1 has given me an edge and it serves
                                        as a great conversation starter, i absolutely love it!</p>
                                    <div className="testimonial-list-author">
                                        <div className="avatar">

                                        </div>
                                        <div>
                                            <h4>Adeleke Ifeoluwase</h4>
                                            <p>Dance Student</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='item testimonial-carousel'>
                            <div className='text-bloc _3'>
                                <div>
                                    <h2>&quot;</h2>
                                    <p>Definitely beginner friendly, and of great benefit to those may love dancing, but
                                        have never trained in any discipline. unox 1 has given me an edge and it serves
                                        as a great conversation starter, i absolutely love it!</p>
                                    <div className="testimonial-list-author">
                                        <div className="avatar">

                                        </div>
                                        <div>
                                            <h4>Adeleke Ifeoluwase</h4>
                                            <p>Dance Student</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='item testimonial-carousel'>
                            <div className='text-bloc _4'>
                                <div>
                                    <h2>&quot;</h2>
                                    <p>Definitely beginner friendly, and of great benefit to those may love dancing, but
                                        have never trained in any discipline. unox 1 has given me an edge and it serves
                                        as a great conversation starter, i absolutely love it!</p>
                                    <div className="testimonial-list-author">
                                        <div className="avatar">

                                        </div>
                                        <div>
                                            <h4>Adeleke Ifeoluwase</h4>
                                            <p>Dance Student</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </OwlCarousel>
                </div>
            </div>
            <div className="hero-sec-props-bg mt_5">
                <div className="contain">
                    <div className="grid-2">
                        <div className="">
                            <p className="tile-summary">STREAMLINE YOUR WORK AND PROCESSES</p>
                            <h2>Checkout the many ways Dance fitness can offer you</h2>
                            {/* <h2>Try the #1 software in project and product management</h2> */}
                            {/* <h2>Prioritize revenue-driving work</h2> */}
                            <p>Definitely beginner friendly, and of great benefit to those may love dancing, but have never
                                trained in any discipline. unox 1 has given me an edge.</p>
                            <div className="grid-2">
                                <div>
                                    <h4>Coordination and Balance</h4>
                                    <p>Regular dancing can improve your coordination, balance, and spatial awareness, leading
                                        to better posture and body control.</p>
                                    <div className="mobile-only">
                                        <ion-icon name="arrow-back-circle-outline"></ion-icon>
                                        <ion-icon name="arrow-forward-circle-outline"></ion-icon>
                                    </div>
                                </div>
                                <div className="desktop-only">
                                    <h4>Weight Management</h4>
                                    <p>Dancing - a vigorous physical activity, increases your heart rate, burns calories, and helps
                                        maintain a healthy body composition.</p>
                                </div>
                                <div className="desktop-only">
                                    <h4>Physical Fitness</h4>
                                    <p>Dancing is a fantastic form of exercise that improves cardiovascular health, stamina, strength, and
                                        flexibility.</p>
                                </div>
                                <div className="desktop-only">
                                    <h4>Fun and Enjoyment</h4>
                                    <p>Whether you're dancing alone in your room or participating in a dance class, it can bring
                                        happiness and a sense of fun into your life.</p>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            {/* <img src={DeviceImg} alt="" /> */}
                            <div className="fake-img-cover">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default Homepage;
