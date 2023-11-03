import React, { useState, useEffect } from "react";
import Nav from "../components/nav";
import { notification, Skeleton } from "antd";
import { connect } from "react-redux";
import OwlCarousel from 'react-owl-carousel';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";

import { ReactComponent as ArrowRight } from "../assets/images/arrow-right.svg";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


import 'video.js/dist/video-js.css';

// import GTCoLogo from "../assets/images/companies/gtco.png";
// import MTNLogo from "../assets/images/companies/mtn.png";
// import ShellLogo from "../assets/images/companies/shell.png";
// import AccessLogo from "../assets/images/companies/access.webp";

import Props1 from "../assets/images/illustrations/1_sneaker.png";
import Props2 from "../assets/images/illustrations/3_cup.png";
import Props3 from "../assets/images/illustrations/7_gift.png";
import WomanSmiling from "../assets/images/homepage/93.jpg";
import WomanMealPlan from "../assets/images/homepage/94.jpg";
import AfricanCommunity from "../assets/images/homepage/DANCERAPY.png";

import { ReactComponent as ColoredCircle } from "../assets/images/colored_circle.svg";

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
                setLoadingData(false);
            } else {
                // setLoadingData(false);
                openNotificationWithIcon('error', videoTempData.data.summary);
            }
        } catch (err) {
            // setLoadingData(false);
            openNotificationWithIcon('error', 'An error occurred while fetching data. Please reload to try again');
        }
    }

    useEffect(() => {
        fetchUserVideosData();
    }, [])
    let skeleton = [];
    for (let i = 0; i < 8; i++) {
        skeleton.push(<span>
            <Skeleton.Image active={true} />
            <Skeleton.Input style={{ marginTop: 10 }} active={true} />
        </span>)
    }

    const breakpoints = {
        0: {
            slidesPerView: 1.3
        },
        600: {
            slidesPerView: 4.2
        },
        1000: {
            slidesPerView: 5.2
        }
    }

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        muted: false,
        playsinline: false,
        responsive: true,
        fluid: true,
        sources: [{
            src: "https://dancevideos.s3.amazonaws.com/september-2023/STRETCH+AND+CALM+WITH+CHAKRAPINK.mp4",
            type: 'video/mp4'
        }]
    };
    const handlePlayerReady = (player) => {
        playerRef.current = player;
    };
    return (
        <div className="real-homepage homepage-content">
            <Nav />
            <div className="hero-section">
                <div className="contain">
                    <div className="grid-2">
                        <div>
                            <h2>Dancerapy: Keep Fit, Loose Weight, Learn Dance</h2>
                            {/* <h2>Experience the transformative power of dance with us.</h2> */}
                            <p>Are you ready to transform your fitness routine into an exhilarating dance
                                party? Look no further. Dive into a world of energetic rhythms and dynamic
                                choreography designed to make every workout session feel like a celebration.</p>
                            {/* <button className="btn-yellow">Get started</button> */}
                            {/* <Link className="btn-yellow"
                                style={{ fontFamily: 'Gilroy Bold', textDecoration: 'none' }}
                                to={AllAppRoutes.sign_up}>Get Started</Link> */}
                            <div className="btn-flex">
                                <Link
                                    to={AllAppRoutes.sign_in}
                                    className="btn-yellow curve">Get Started <ArrowRight /></Link>
                                <Link to={AllAppRoutes.corporate} className="btn-blank">See how we impact</Link>
                            </div>
                        </div>
                        <div>
                            <div className="as">
                                <video loop muted autoPlay controls="true">
                                    <source src="https://dancevideos.s3.amazonaws.com/september-2023/STRETCH+AND+CALM+WITH+CHAKRAPINK.mp4"></source>
                                </video>
                            </div>
                            <div className="companies-tab">
                                <div className="company-1"></div>
                                <div className="company-1"></div>
                                <div className="company-1"></div>
                                <div className="company-1"></div>
                                <div className="company-1"></div>
                            </div>
                            {/* <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                            <VideoJS options={videoJsOptions} playsinline onReady={handlePlayerReady} /> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="video-display-sect">
                <div className="contain">
                    <div className="center-div">
                        <h2>Building Healthy Connections through Dance.</h2>
                        <div className="btn-array">
                            <button className="btn-default">Weight Loss</button>
                            <button className="btn-default">Burn Calories</button>
                            <button className="btn-default">Empowerment</button>
                            <button className="btn-default">Cardio</button>
                            <button className="btn-default">Enhanced Flexibility</button>
                            <button className="btn-default">Muscle Strength</button>
                            <button className="btn-default">Versatility</button>
                            <button className="btn-default">Self Confidence</button>
                            <button className="btn-default">Muscle Toning</button>
                            <button className="btn-default">Improved Coordination</button>
                            <button className="btn-default">Community Feeling</button>
                        </div>
                    </div>
                    <div className="desktop-only">
                        {
                            loadingdata ?
                                <div className="grid-4">
                                    {skeleton.map((placeHolder, index) => (
                                        <div key={index}>
                                            {placeHolder}
                                        </div>
                                    ))}
                                </div> :
                                <div className="grid-4">
                                    {
                                        videoBox.length ?
                                            videoBox.slice(minRandomFilter, +minRandomFilter + 8).map((productPlans, index) => (
                                                <div className="card-display" key={index}>
                                                    <Link to={props.auth.isAuthenticated ?
                                                        `/profile/video/play/${productPlans._id}/${productPlans.title}` : `/signin?auth_redirect=/profile/video/play/${productPlans._id}/${productPlans.title}`}>
                                                        <div>
                                                            <div className="card-header">
                                                                <img src={productPlans.poster} alt={productPlans.name} />
                                                                <div className="card-header-fee">
                                                                    {
                                                                        productPlans.amount !== 0 ?
                                                                            <div className="card-header-cover">
                                                                                <ion-icon name="lock-closed-outline"></ion-icon>
                                                                            </div>
                                                                            : ''
                                                                    }
                                                                </div>
                                                                <div className="card-overlay">
                                                                </div>
                                                            </div>
                                                            <div className="card-body">
                                                                <div className="card-body-header">
                                                                    <p>{productPlans?.videoCategory?.name}</p>
                                                                    <p>{productPlans.videoLength}</p>
                                                                </div>
                                                                <div className="card-body-title-cover">
                                                                    <h4 className="card-body-title">{productPlans.title}</h4>
                                                                </div>
                                                                <div className="card-body-footer noMargin={true}">
                                                                    {/* <p>Adeleke Ifeoluwase</p> */}
                                                                    <p>{productPlans.instructorName}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))
                                            :
                                            skeleton.map((placeHolder, index) => (
                                                <div key={index}>
                                                    {placeHolder}
                                                </div>
                                            ))
                                    }
                                </div>
                        }
                    </div>
                    <div className="mobile-only">
                        {
                            !loadingdata ?
                                <Swiper
                                    spaceBetween={5} slidesPerView={4.2} centeredSlides={true}
                                    loop={true} breakpoints={breakpoints}>
                                    {/* <SwiperSlide>Slide 1</SwiperSlide> */}
                                    {videoBox.slice(minRandomFilter, +minRandomFilter + 8).map((productPlans, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="card-display item" key={index}>
                                                <Link to={props.auth.isAuthenticated ?
                                                    `/profile/video/play/${productPlans._id}/${productPlans.title}` : `/signin?auth_redirect=/profile/video/play/${productPlans._id}/${productPlans.title}`}>
                                                    <div>
                                                        <div className="card-header">
                                                            <img src={productPlans.poster} alt={productPlans.name} />
                                                            <div className="card-header-fee">
                                                                {
                                                                    productPlans.amount !== 0 ?
                                                                        <div className="card-header-cover">
                                                                            <ion-icon name="lock-closed-outline"></ion-icon>
                                                                        </div>
                                                                        : ''
                                                                }
                                                            </div>
                                                            <div className="card-overlay">
                                                            </div>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="card-body-header">
                                                                <p>{productPlans?.videoCategory?.name}</p>
                                                                <p>{productPlans.videoLength}</p>
                                                            </div>
                                                            <div className="card-body-title-cover">
                                                                <h4 className="card-body-title">{productPlans.title}</h4>
                                                            </div>
                                                            <div className="card-body-footer noMargin={true}">
                                                                <p>Adeleke Ifeoluwase</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper> :
                                <Swiper
                                    spaceBetween={5} slidesPerView={4.2} centeredSlides={true}
                                    loop={true} breakpoints={breakpoints}>
                                    {skeleton.map((skeletonCheck, index) => (
                                        <SwiperSlide key={index}>
                                            <div key={index}>
                                                {skeletonCheck}
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                        }
                    </div>
                </div>
            </div>
            <div className="dance-props-sect colored first-div">
                <div className="contain">
                    <div className="grid-2">
                        <div>
                            <h3>We are a vibrant African-themed dance fitness workout platform</h3>
                            <p>Led by passionate instructors who are not only skilled dancers but also dedicated
                                fitness enthusiasts, our classes are designed to get your heart racing, your body
                                moving, and your spirits soaring. </p>
                            <p className="desktop-only">Come discover the power of rhythm, the magic of movement, and the unity of culture
                                on our African-themed dance fitness platform. Unleash your inner dancer, groove to
                                the beat, and embark on a journey that will invigorate your body, refresh your mind, and
                                uplift your soul.</p>
                        </div>
                        <div className="ash desktop-only">
                            <img src={AfricanCommunity} alt="vibrant african community" />
                        </div>
                    </div>
                    <div className="mt_5">
                        <div className="first-container">
                            <h3 className="desktop-only">We are not just your average fitness platform</h3>
                        </div>
                        <div className="grid-3">
                            <div>
                                <img src={Props1} alt="" />
                                <h5>Expert-led fitness videos</h5>
                                <p>We offer carefully curated workout calendars designed by fitness experts to maximize results
                                    and keep users motivated throughout their fitness journey.</p>
                            </div>
                            <div>
                                <img src={Props2} alt="" />
                                <h5>Personalized African meal plans.</h5>
                                <p>Our users have access to meal plans designed and curated by nutrition and culinary
                                    experts specializing in African cuisine to complement fitness sessions.</p>
                            </div>
                            <div>
                                <img src={Props3} alt="" />
                                <h5>Complete Health Checkup</h5>
                                <p>Conducted by qualified healthcare professionals, Users have access to a thorough medical
                                    checkup, providing with valuable insights into overall health and well-being.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dance-props-sect sec-homepage-extra-desc">
                <div className="contain">
                    <div className="grid-2 grid-first-outline adjust">
                        <div>
                            <div>
                                <h2>Easy to follow fitness steps for beginners and experts</h2>
                                <p>Our online dance fitness streaming app is your ultimate destination for both beginners
                                    and experts looking to elevate their fitness routine through the power of dance. Whether
                                    you're just starting or already a seasoned dancer, our easy-to-follow fitness steps will
                                    keep you moving, sweating, and having a blast!</p>
                                <div className="grid-2">
                                    <p><ColoredCircle />Killer Soundtracks</p>
                                    <p><ColoredCircle />Access from anywhere</p>
                                    <p><ColoredCircle />Engaging Choreography</p>
                                    <p className="desktop-only"><ColoredCircle />Supportive Community</p>
                                    <p className="desktop-only"><ColoredCircle />Full-Body Workout</p>
                                    <p className="desktop-only"><ColoredCircle />Learn at your pace</p>
                                </div>
                                <div className="button-grid">
                                    <Link style={{ textDecoration: 'none' }} to="/signup" className="btn-yellow curve">Get Started <ArrowRight /></Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <img src={WomanSmiling} alt="woman smiling" />
                        </div>
                    </div>
                    <div className="grid-2 grid-first-outline pt_5">
                        <div>
                            <img src={WomanMealPlan} alt="woman smiling" />
                        </div>
                        <div>
                            <div>
                                <h2>Elevate Your Dance Fitness Results with Personalized Meal Plans!</h2>
                                <p>We believe that a balanced and nourishing diet is the perfect partner to your dance
                                    fitness journey. Our personalized African meal plans are tailored to complement your workout
                                    routine, helping you achieve your fitness goals and sustain your energy levels.</p>
                                <div className="grid-2">
                                    <p><ColoredCircle />Simplicity and Convenience</p>
                                    <p><ColoredCircle />Continuous Adaptation</p>
                                    <p><ColoredCircle />Chef-Approved Recipes</p>
                                    <p className="desktop-only"><ColoredCircle />Empower your organization</p>
                                    <p className="desktop-only"><ColoredCircle />Tailored Nutrition</p>
                                    <p className="desktop-only"><ColoredCircle />Authentic African Cuisine</p>
                                </div>
                                <div className="button-grid">
                                    <Link style={{ textDecoration: 'none' }} to="/signup" className="btn-yellow curve">Get Started <ArrowRight /></Link>
                                </div>
                                {/* <div className="button-grid">
                                    <Link style={{ textDecoration: 'none' }} to="/signup" className="btn-red">Get Started</Link>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="final-cover">
                <div className="contain">
                    <h5>OUR PHYSICAL CLASSES</h5>
                    <h3>We are available in different locations across Lagos to meet your fitness needs.</h3>
                    <Link to={AllAppRoutes.trainings} className="btn-yellow">See our locations</Link>
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