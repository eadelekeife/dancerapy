import "./homepage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useEffect, useState } from "react";

import { Divider, Modal } from "antd";

import VideoJS from '../profile/videoplayer';

import Nav from "../../utils/nav";
import Footer from "../../utils/footer-sec";

import { Input } from 'antd';
import { Controller, useForm } from "react-hook-form";
import { connect } from 'react-redux';
import Slider from "react-slick";

import { Link } from "react-router-dom";
import AppRoute from "../../utils/routes";
import SecSignIn from "../auth/signin-popup";

import AboutImage from "../../assets/images/homepage/instructor.jpg";
import VideoScreenshot from "../../assets/images/homepage/screenshot_homepage-min.png";

import _1 from '../../assets/images/companies/access.webp';
import _2 from '../../assets/images/companies/shell.png';
import _3 from '../../assets/images/companies/terra.png';
import _4 from '../../assets/images/companies/corona.png';
import _6 from '../../assets/images/companies/dansol.png';
import _7 from '../../assets/images/companies/gtco.png';
import _8 from '../../assets/images/companies/mtn.png';


import Annual from "../../assets/images/homepage/annual.jpeg";
import Flash from "../../assets/images/homepage/flash.jpeg";
import Zoom from "../../assets/images/homepage/zoom.jpg";
import Physical from "../../assets/images/homepage/physical.jpeg";

import Insta1 from "../../assets/images/content/event_1.jpg";
import Insta2 from "../../assets/images/content/event3.jpg";
import Insta3 from "../../assets/images/content/testi.jpg";
import Insta4 from "../../assets/images/content/event4.jpg";

import { ReactComponent as Cabify } from "./run.svg";
import { ReactComponent as Mailchimp } from "./mailchimp.svg";

const AboutUs = props => {

    const playerRef = React.useRef(null);
    const videoElement = React.useRef();

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
    // const playVideo = (player) => {
    //     playerRef.current = player;
    //     playerRef.playsinline(true);
    //     playerRef.play();
    // }
    const { handleSubmit, control } = useForm({});
    const [buttonDisplay, setButtonDisplay] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!props.auth.isAuthenticated) {
            setTimeout(() => {
                setIsModalOpen(true);
            }, 6000)
        }
    }, [])

    const playVideo = () => {
        let video = videoElement.current;
        video.play();
        setButtonDisplay(true);
    }

    return (
        <div className="new-homepage about_us">
            <Nav />
            <div className="dance-redesign-props-display">
                <div className="dance-redesign-props-img-cover">
                    {/* <VideoJS playsinline={false} options={videoJsOptions} onReady={handlePlayerReady}
                        onClick={playVideo} /> */}

                    <video
                        poster={VideoScreenshot}
                        ref={videoElement}
                        src="https://lagostheatrevideos.s3.amazonaws.com/intro.mp4"
                        // src="https://lagostheatrevideos.s3.amazonaws.com/home.mp4"
                        playsInline loop />
                    <div className="black_overlay">
                    </div>
                    <div className="hero_section_div">
                        <button style={{ display: buttonDisplay ? 'none' : 'block' }} onClick={() => playVideo()}>
                            <ion-icon name="play-circle-outline"></ion-icon></button>
                        <Link
                            to="/products/detail?productName=Dancerapy%20Club%20Annual%20Online%20Subscription&productId=8">Start Dancing Today <ion-icon name="arrow-forward-outline"></ion-icon></Link>
                    </div>
                    {/* <ReactPlayer
                        playsinline={false}
                        url="https://lagostheatrevideos.s3.amazonaws.com/intro.mp4"
                        playing={true} controls={true} /> */}
                </div>
            </div>
            <div className="dance-redesign-props-data">
                <div className="flex-display">
                    <div className="blur_me">
                        <div className="show_homepage_content pt-5">
                            <div className="contain">
                                <div>
                                    <div className="grid_2">
                                        <h2>Building Healthy Connections through Dance. Keep Fit, Lose Weight, Learn Dance.</h2>
                                        <p>We believe that everyone can benefit from dancing, and we're committed to helping
                                            our clients achieve their dance goals. Join us and let's dance!</p>
                                    </div>
                                    <div className="desktop-only">
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
                                    <div className="mobile-only">
                                        <div className="inner-contai">
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
                            </div>
                        </div>
                    </div>
                    <div className="whiten_me">
                    </div>
                </div>
            </div>
            <div className="mt-5 instructor-cover">
                <div className="contain">
                    <div className="instructor">
                        <div className="contain">
                            <div className="grid_2">
                                <div className="text-cover">
                                    <h4>Get ready for your workout with our Dancerapy fitness series</h4>
                                    <p className="desktop-onl">
                                        Dancerapy is a fitness and lifestyle brand invested in reintroducing dance as
                                        a choice therapy for healthy living. As a movement, Dancerapy personalizes
                                        the idea of dance as a culture towards achieving wholeness in health and
                                        fitness. Let Dancerapy help ignite the connections and
                                        build team bonding spirit within your organization.
                                    </p>
                                    <Link to={AppRoute.marathon} className="btn_border_black">See how we impact companies</Link>
                                </div>
                                <div>
                                    <div className="video-cover">
                                        <img src={AboutImage} alt="about image" />
                                        {/* <ReactPlayer
                                            width="100%" height="100%"
                                            playsinline={true} style={{ background: 'black' }}
                                            url="https://lagostheatrevideos.s3.amazonaws.com/intro.mp4"
                                            playing={false} controls={true} /> */}
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
            {/* <div className="final-cover mt-5">
                <div className="contain">
                    <h5>OUR PHYSICAL CLASSES</h5>
                    <h3>We are available in different locations across the country to meet your fitness needs.</h3>
                    <Link to={AppRoute.trainings} className="btn_red">See our locations</Link>
                </div>
            </div> */}
            <Modal title={null} footer={null} open={isModalOpen} className="products-cart"
                onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
                <div className="auth-display">
                    <SecSignIn />
                </div>
            </Modal>
            <Footer margin={true} />
        </div>
    )
}

const mapStateToProps = state => {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(AboutUs);