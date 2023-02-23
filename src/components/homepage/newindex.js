import "./homepage.css";

import React from "react";

import { Divider } from "antd";

import VideoJS from '../profile/videoplayer';

import Nav from "../../utils/nav";
import Footer from "../../utils/footer-sec";

import { Input } from 'antd';
import { Controller, useForm } from "react-hook-form";

import { Link } from "react-router-dom";
import AppRoute from "../../utils/routes";

import Instructor from "../../assets/images/homepage/instructor_hero.jpg";
import Schools from "../../assets/images/homepage/link2.jpeg";
import Insta4 from "../../assets/images/content/event4.jpg";

import _1 from '../../assets/images/companies/access.webp';
import _2 from '../../assets/images/companies/shell.png';
import _3 from '../../assets/images/companies/terra.png';
import _4 from '../../assets/images/companies/corona.png';
import _6 from '../../assets/images/companies/dansol.png';
import _7 from '../../assets/images/companies/gtco.png';
import _8 from '../../assets/images/companies/mtn.png';

import { ReactComponent as Cabify } from "./run.svg";
import { ReactComponent as Mailchimp } from "./mailchimp.svg";

const AboutUs = () => {

    const playerRef = React.useRef(null);

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
    const videoJsOptions = {
        autoplay: false,
        muted: false,
        controls: false,
        responsive: false,
        playsinline: true,
        fluid: false,
        sources: [{
            src: 'https://lagostheatrevideos.s3.amazonaws.com/intro.mp4',
            type: 'video/mp4'
        }]
    };
    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            VideoJS.log('player is waiting');
        });

        player.on('dispose', () => {
            VideoJS.log('player will dispose');
        });
    };
    const playVideo = (player) => {
        playerRef.current = player;
        playerRef.playsinline(true);
        playerRef.play();
    }
    const { handleSubmit, control } = useForm({});
    return (
        <div className="new-homepage about_us">
            <Nav />
            <div className="dance-redesign-props-display">
                <div className="dance-redesign-props-img-cover">
                    <VideoJS playsinline={false} options={videoJsOptions} onReady={handlePlayerReady}
                        onClick={playVideo} />
                    {/* <ReactPlayer
                        playsinline={false}
                        url="https://lagostheatrevideos.s3.amazonaws.com/intro.mp4"
                        playing={true} controls={true} /> */}
                </div>
                <div className="contain">
                    <div className="block"></div>
                    <h4>Get ready for your workout with our Dancerapy fitness series</h4>
                    <p>
                        Dancerapy is a fitness and lifestyle brand invested in reintroducing dance as a choice
                        therapy for healthy living. As a movement, Dancerapy personalizes the idea of dance
                        as a culture towards achieving wholeness in health and fitness.
                    </p>
                    <button className="btn_red">Meet the Loom team</button>
                </div>
            </div>
            <div
                className="dance-props-sect mt-5">
                <div className="grid_2">
                    <div className="dance-hero-cover">
                        <div className="first-display">
                            <div className="contain">
                                <h3>Professional Fitness <br />Dance Trainings</h3>
                            </div>
                            <Divider style={{ margin: '10px 0px' }} />
                            <div className="contain">
                                <p>Our dance trainings offers expert instruction, comprehensive training, performance
                                    opportunities, networking, and personal growth. Whether you're a beginner or an
                                    experienced dancer, our professional dance trainings can help you achieve your goals
                                    and take your dance career to the next level.
                                </p>
                            </div>
                        </div>
                        <div className="contain">
                            <div className="grid_2">
                                <div className="dance-props-summary">
                                    <h2>10+</h2>
                                    <p>instructors</p>
                                </div>
                                <div className="dance-props-summary">
                                    <h2>15+</h2>
                                    <p>dance plans</p>
                                </div>
                                <div className="dance-props-summary">
                                    <h2>2009</h2>
                                    <p>established</p>
                                </div>
                                <div className="dance-props-summary">
                                    <h2>365m</h2>
                                    <p>transactions</p>
                                </div>
                            </div>
                            {/* <ul>
                                <li>
                                    <img style={{ width: '100%', height: '100%' }} src={Instructor} alt="Instructor" />
                                    <h5>Profession Fitness Dance Trainings</h5>
                                    <p>We’ve been skillfully weaving together the strands of strategic digital marketing since
                                        2009. Loom helps all kinds of ambitious businesses to improve their digital presence.</p>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                    <div>
                        <div className="contain">
                            <Mailchimp />
                        </div>
                    </div>
                </div>
            </div>
            <div className="dance-redesign-text-display mt-5">
                <div className="contain">
                    <div className="first-displa">
                        <div className="grid_2">
                            <h2>Building Healthy Connections through Dance. Keep Fit, Lose Weight, Learn Dance.</h2>
                            <p>We believe that everyone can benefit from dancing, and we're committed to helping
                                our clients achieve their dance goals. Join us and let's dance!</p>
                        </div>
                    </div>
                    <div className="grid_3">
                        <div>
                            <img src={Instructor} alt="Instructor" />
                            <h4>Become an Instructor</h4>
                            <p>This is a career empowerment system aimed at equipping you with the
                                tools required for sustainable growth and income as a dance instructor in simple ways.
                            </p>
                            <Link to={AppRoute.instructor}>Learn More <ion-icon name="arrow-forward-circle-outline"></ion-icon></Link>
                        </div>
                        <div>
                            <img src={Schools} alt="Instructor" />
                            <h4>Corporate Events and Schools</h4>
                            <p>
                                Dancerapy’s long-term vision is to inspire our community with
                                non-competitive dance education and many performance
                                opportunities. See some examples and processes.
                            </p>
                            <Link to={AppRoute.schools}>Learn More <ion-icon name="arrow-forward-circle-outline"></ion-icon></Link>
                        </div>
                        <div>
                            <img src={Insta4} alt="event" />
                            <h4>React out to us</h4>
                            <p>
                                We have an efficient support team ready to take your calls and respond 
                                to all of the messages you might have on our processes. Learn more about what we do
                            </p>
                            <Link to={AppRoute.contact}>Learn More <ion-icon name="arrow-forward-circle-outline"></ion-icon></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="final-props mt-5">
                <div className="contain">
                    <div>
                        <div className="first-display">
                            <h2>Easy to follow Dance fitness routines</h2>
                            <p>Every routine that is part of our service has been created with simplicity in
                                mind. Our instructors are experienced professionals who have years of
                                experience teaching a variety of dance styles. We also offer flexible
                                scheduling options to fit your busy schedules.
                            </p>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <Cabify />
                                    <h5>Personalized dance plans</h5>
                                    <p>We work with clients to create a customized dance plan based on their goals and
                                        interests. Our instructors will assess you and create a plan that is
                                        tailored to your needs.</p>
                                </li>
                                <li>
                                    <Cabify />
                                    <h5>Expert dance instruction</h5>
                                    <p>Our experienced instructors who have years of experience will provide you with
                                        expert instruction, feedback, and support as you work towards your goals.
                                    </p>
                                </li>
                                <li>
                                    <Cabify />
                                    <h5>Fun and engaging classes</h5>
                                    <p>Our dance classes are designed to be fun and engaging. We want you to enjoy your dance
                                        journey and feel motivated to continue working on your fitness goals.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="final-cover mt-5">
                <div className="contain">
                    <h5>OUR PHYSICAL CLASSES</h5>
                    <h3>We are available in different locations across the country to meet your fitness needs.</h3>
                    <Link to={AppRoute.trainings} className="btn_red">See our locations</Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AboutUs;