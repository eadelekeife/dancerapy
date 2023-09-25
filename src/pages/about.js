import "../assets/css/about.css";

import React, { useState, useEffect } from "react";
import Nav from "../components/nav";
import { notification, Skeleton } from "antd";
import { connect } from "react-redux";
import OwlCarousel from 'react-owl-carousel';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";

import { ReactComponent as ArrowRight } from "../assets/images/arrow-right.svg";
import CodeMain from "../assets/images/homepage/code_main.png";
import Hero1 from "../assets/images/homepage/main1.png";
import Hero2 from "../assets/images/homepage/main2.png";
// import Image1 from "../assets/images/product/_1.png";
// import Image2 from "../assets/images/product/_2.png";


// import VideoHero from "../assets/video/stretch.mp4";

import VideoJS from '../components/main-video-player';
import 'video.js/dist/video-js.css';

import Props1 from "../assets/images/illustrations/1_sneaker.png";
import Props2 from "../assets/images/illustrations/3_cup.png";
import Props3 from "../assets/images/illustrations/7_gift.png";
import PNGGG from "../assets/images/homepage/PNGGG.png";
import WomanSmiling from "../assets/images/homepage/93.jpg";
import WomanMealPlan from "../assets/images/homepage/94.jpg";
import AfricanCommunity from "../assets/images/homepage/DANCERAPY.png";

import { ReactComponent as PlusIcon } from "../assets/images/plus.svg";
import { ReactComponent as ColoredCircle } from "../assets/images/colored_circle.svg";
import Instructor2 from "../assets/images/team/_4.jpg";
import Instructor3 from "../assets/images/team/_5.jpg";
import Instructor4 from "../assets/images/team/_6.jpg";
import Instructor5 from "../assets/images/team/_7.jpg";

import Image1 from "../assets/images/new/new1.jpg";
import Image2 from "../assets/images/new/new8.jpg";
import Image3 from "../assets/images/new/new7.jpeg";
import Image4 from "../assets/images/new/new4.jpg";

import AllAppRoutes from "../utils/routes";
import { _fetch_app_videos } from "../utils/axiosroutes";
import Footer from "../components/footer";

const Homepage = props => {

    const playerRef = React.useRef(null);
    const [videoBox, setVideoBox] = useState([]);
    const [loadingdata, setLoadingData] = useState(true);
    const [minRandomFilter, setMinRandomFilter] = useState(0);
    const responsive = {
        0: {
            items: 1,
            nav: false,
            margin: 10,
            stagePadding: 50,
            loop: true
        },
        600: {
            items: 3,
            nav: false,
            margin: 20,
            stagePadding: 50,
            loop: true
        },
        1000: {
            items: 6,
            nav: false,
            margin: 10,
            stagePadding: 20,
            loop: true
        }
    }
    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };

    const fetchUserVideosData = async () => {
        try {
            let videoTempData = await _fetch_app_videos();
            if (videoTempData.data.statusMessage === "success") {
                setVideoBox(videoTempData.data.message);
                setLoadingData(false);
                let fitness = [];
                videoTempData.data.message.forEach(video => {
                    if (video.videoCategory.name !== "Dance Trends") {
                        fitness.push(video);
                    }
                })
                setVideoBox(fitness);
                let videoLength = fitness.length;
                let minRandom = Math.trunc(Math.random() * (videoLength - 8));
                setMinRandomFilter(minRandom);
            } else {
                setLoadingData(false);
                openNotificationWithIcon('error', videoTempData.data.summary);
            }
        } catch (err) {
            setLoadingData(false);
            openNotificationWithIcon('error', 'An error occurred while fetching data. Please reload to try again');
        }
    }

    useEffect(() => {
        // fetchUserVideosData();
    }, [])
    let skeleton = [];
    for (let i = 0; i < 8; i++) {
        skeleton.push(<span>
            <Skeleton.Image active={true} />
            <Skeleton.Input style={{ marginTop: 10 }} active={true} />
        </span>)
    }

    // const videoJsOptions = {
    //     autoplay: true,
    //     controls: false,
    //     playsinline: false,
    //     responsive: true,
    //     fluid: true,
    //     sources: [{
    //         src: VideoHero,
    //         type: 'video/mp4'
    //     }]
    // };
    const handlePlayerReady = (player) => {
        playerRef.current = player;
    };
    return (
        <div className="real-homepage about-us-page">
            <Nav />
            <div className="hero-section">
                <div className="contain">
                    <div className="grid-2">
                        <div>
                            <h2>Experience the transformative power of dance with us.</h2>
                            <p>
                                Dancerapy is a fitness and lifestyle brand invested in reintroducing dance as a choice
                                therapy for healthy living. As a movement, Dancerapy personalizes the idea of dance as
                                a culture towards achieving wholeness in health and fitness.
                            </p>
                            <div className="btn-flex">
                                <div>
                                    <Link
                                        to={AllAppRoutes.contact_us}
                                        className="btn-yellow">Reach out to us <ArrowRight /></Link>
                                </div>
                                <div>
                                    <Link to={AllAppRoutes.corporate} className="btn-blank">See how we impact</Link>
                                </div>
                            </div>
                            {/* <button className="btn-yellow">Get started</button> */}
                        </div>
                        <div>
                            <img src={PNGGG} alt="PNGGG" />
                            {/* <VideoJS options={videoJsOptions} playsinline controls={false} onReady={handlePlayerReady} /> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="dance-props-sect about-sub-props first-div">
                <div className="contain">
                    <div className="grid-2">
                        <div>
                            <h3>Unleash Your Inner Beat, Dance to Your Own Rhythm</h3>
                        </div>
                        <div>
                            <p>Dancerapy’s long-term vision is to inspire our community with non-competitive dance
                                education and many performance opportunities. We have 3 centers spread out across
                                Lagos coupled with our numerous online training
                                sessions to fit your schedule.</p>
                        </div>
                    </div>
                    <div className="sec-grid-2">
                        <div className="video-message-bg desktop-only">
                            <h3>Keep Fit, Lose Weight, Learn Dance.</h3>
                            <p>With a commitment to artistic excellence, we aim to be a driving force in
                                the evolution of dance, fostering creativity, collaboration, and personal
                                growth within our company and the broader dance community</p>
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
                                {/* <V */}
                                <div className="video-control-panel">
                                    <ion-icon name="play-circle-outline"></ion-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="about-sub-message">
                <div className="contain">
                    <div className="about-flex">
                        <div>
                            <h2>Our mission is to ensure that <span>dance fitness</span> becomes a lifestyle for <span>millions of people</span> around the world.</h2>
                            <div className="btn-array">
                                <button className="btn-default">Fun and Engaging Classes</button>
                                <button className="btn-default">Keep Fit</button>
                                <button className="btn-default">Loose Weight</button>
                                <button className="btn-default">Personalized Dance Plans</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="desktop-only">
                    <div className="img-data-flex">
                        <div>
                            <div className='img-block'>
                                <img src={Image1} alt="dance students smiling" />
                            </div>
                        </div>
                        <div>
                            <div className='img-block'>
                                <img src={Image2} alt="dance students smiling" />
                            </div>
                        </div>
                        <div>
                            <div className='img-block'>
                                <img src={Image3} alt="dance students smiling" />
                            </div>
                        </div>
                        <div>
                            <div className='img-block'>
                                <img src={Image4} alt="dance students smiling" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mobile-only">
                    <OwlCarousel className="owl-theme" lazyLoad={true}
                        responsive={responsive}
                        responsiveClass={true} loop={true} margin={20} nav>
                        <div class='item'>
                            <div className='img-block'>
                                <img src={Image1} alt="dance students smiling" />
                            </div>
                        </div>
                        <div class='item'>
                            <div className='img-block'>
                                <img src={Image2} alt="dance students smiling" />
                            </div>
                        </div>
                        <div class='item'>
                            <div className='img-block'>
                                <img src={Image3} alt="dance students smiling" />
                            </div>
                        </div>
                        <div className='item'>
                            <div className='img-block'>
                                <img src={Image4} alt="dance students smiling" />
                            </div>
                        </div>
                    </OwlCarousel>
                </div>
            </div>
            <div className="about-hero-sec">
                <div className="testimonial">
                    <div className="contain">
                        <div>
                            <h1>&ldquo;I've always been intimidated by dance workouts, but this app has made it so accessible
                                and enjoyable. The instructors break down the moves step by step, and the app's interface
                                is user-friendly. I've gained confidence, improved my fitness, and discovered a new passion
                                for dancing. I can't thank this app enough!&rdquo;</h1>
                        </div>
                        <div className="testimonial-author-sect">
                            <div>
                                <div className="avatar">

                                </div>
                            </div>
                            <div>
                                <h3 className="dance-author-name">Adeleke Ifeoluwase</h3>
                                <p className="dance-author-role">Dance Student</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dance-props-sect sec-homepage-extra-desc">
                <div>
                    <div className="team">
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
            </div>
            <Footer noMargin={true} />
        </div>
    )
}

const mapStateToProps = store => {
    return { auth: store.auth }
}

export default connect(mapStateToProps)(Homepage);