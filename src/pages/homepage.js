import "../assets/css/homepage.css";

import React, { useEffect, useState } from "react";
import Nav from "../components/nav";
import { notification, Skeleton } from "antd";
import { connect } from "react-redux";

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

// import Hero1 from "../assets/images/a-company/_1.webp";
import Hero1 from "../assets/images/homepage/main1.png";
import Hero2 from "../assets/images/homepage/main2.png";
import Image1 from "../assets/images/product/_1.png";
import Image2 from "../assets/images/product/_2.png";
// import Props1 from "../assets/images/illustrations/1_sneaker.png";
// import Props2 from "../assets/images/illustrations/3_cup.png";
// import Props3 from "../assets/images/illustrations/7_gift.png";
// import Props4 from "../assets/images/illustrations/9_sketchbook.png";
import Props1 from "../assets/images/homepage/home1.jpg";
import Props2 from "../assets/images/homepage/home1.jpg";
import Props3 from "../assets/images/homepage/home1.jpg";
import Props4 from "../assets/images/homepage/home1.jpg";

import { ReactComponent as ColoredCircle } from "../assets/images/colored_circle.svg";


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
import { _fetch_app_videos } from "../utils/axiosroutes";
// import OfficePeople from "../assets/images/homepage/office.jpg";

const Homepage = props => {
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
    const secResponsive = {
        0: {
            items: 1,
            nav: false,
            margin: 10,
            stagePadding: 60,
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
                let videoLength = videoTempData.data.message.length;
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
        fetchUserVideosData()
    }, [])

    const handlePlayerReady = (player) => {
        // playerRef.current = player;
    };
    // let skeleton = [];
    // for (let i = 0; i < 6; i++) {
    //     skeleton.push(<div>
    //         <Skeleton.Image active={true} />
    //         <Skeleton active />
    //     </div>)
    // }
    let skeleton = [];
    for (let i = 0; i < 8; i++) {
        skeleton.push(<span>
            <Skeleton.Image active={true} />
            <Skeleton.Input style={{ marginTop: 10 }} active={true} />
        </span>)
    }
    return (
        <div className="homepage">
            <Nav />
            <div className="hero-sect">
                <div>
                    <div className="first-hero-section">
                        <div className="white-text-bg">
                        </div>
                        <div className="second-hero-sect">
                            <div className="second-hero-bottom-tag">
                                <div className="third-hero-bottom-tag">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="sec-homepage-hero">
                <div className="contain">
                    <div className="grid-2">
                        <div>
                            <h2>The Magic of African Dance.</h2>
                            <h2>Fitness that Transcends Borders!</h2>
                            <p>Dancerapy is a fitness and lifestyle brand invested in reintroducing dance as a choice
                                therapy for healthy living. As a movement, Dancerapy personalizes the idea of dance
                                as a culture towards achieving wholeness in health and fitness.</p>
                            <div className="button-grid">
                                <button>Request a demo</button>
                                <button className="impact">See how we impact</button>
                            </div>
                        </div>
                        <div>
                            <img src={Hero1} alt="" />
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <div className="sec-homepage-rolling-text">
                <div className="scroll-container">
                    <div className="scroll-text">
                        <OwlCarousel className="owl-theme" lazyLoad={true}
                            responsive={secResponsive} autoPlay={true}
                            responsiveClass={true} loop={true} margin={20} nav>
                            <div className="item">
                                <p>Access to new Choreographies</p>
                            </div>
                            <div className="item">
                                <p>Provision of Dancerapy merchandise</p>
                            </div>
                            <div className="item">
                                <p>Access to larger client base</p>
                            </div>
                            <div className="item">
                                <p>Fun and Engaging Classes</p>
                            </div>
                            <div className="item">
                                <p>Keep Fit</p>
                            </div>
                        </OwlCarousel>
                    </div>
                </div>
            </div> */}
            <div className="sec-homepage-props mt_5">
                <div className="contain">
                    <div className="main-content">
                        <h2>Keep Fit, Lose Weight, Learn Dance.</h2>
                        {/* <h2>Evidence-based outcomes</h2> */}
                        <p>We are a vibrant African-themed dance fitness workout platform, where the rhythmic
                            beats of Africa and the energy of dance come together for an exhilarating fitness experience!</p>
                    </div>
                    <div className="grid-3">
                        <div className="sec-props-detail">
                            <img src={Props1} alt="" />
                            <div className="sec-text-detail">
                                <h4>Dance fitness videos with specially curated calender</h4>
                                <p>We offer carefully curated workout calendars designed to maximize results
                                    and keep users motivated throughout their fitness journey. Fitness routines
                                    that are enjoyable and engaging.</p>
                            </div>
                        </div>
                        <div className="sec-props-detail">
                            <img src={Props2} alt="" />
                            <div className="sec-text-detail">
                                <h4>Personalized African meal plans with Exclusive recipes.</h4>
                                <p>Meal plans designed and curated by nutrition and culinary experts specializing in African
                                    cuisine. Users can trust in the knowledge and expertise behind each recipe and meal.</p>
                            </div>
                        </div>
                        <div className="sec-props-detail">
                            <img src={Props3} alt="" />
                            <div className="sec-text-detail">
                                <h4>Expert backed lifestyle advice to amplify fitness workouts</h4>
                                <p>We combine fitness routines with lifestyle advice that can amplify the effectiveness of
                                    workouts and nutrition plans. Our users can achieve better fitness results by optimizing
                                    their overall lifestyle.</p>
                            </div>
                        </div>
                        {/* <div className="sec-props-detail">
                            <img src={Props4} alt="" />
                            <h4>Complete Health Checkup, Addressing more than Fitness.</h4>
                            <p>Conducted by qualified healthcare professionals, Users have access to a thorough medical
                                checkup, providing with valuable insights into overall health and well-being.</p>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="sec-homepage-desc about-sub-messag mt_5">
                <div className="contain">
                    <div className="center-div">
                        <h2>Building Healthy Connections through Dance.</h2>
                        <div className="btn-array">
                            <button className="btn-default">Weight Loss</button>
                            <button className="btn-default">Burn Calories</button>
                            <button className="btn-default">Empowerment</button>
                            <button className="btn-default">Enhanced Flexibility</button>
                            <button className="btn-default">Muscle Strength</button>
                            <button className="btn-default">Cardio</button>
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
                                        <div>
                                            {placeHolder}
                                        </div>
                                    ))}
                                </div> :
                                <div className="grid-4">
                                    {
                                        videoBox.length ?
                                            videoBox.slice(minRandomFilter, +minRandomFilter + 8).map((productPlans, index) => (
                                                <div key={index}>
                                                    <Link to={props.auth.isAuthenticated ?
                                                        `/profile/video/play/${productPlans._id}/${productPlans.title}` : `/signin?auth_redirect=/profile/video/play/${productPlans._id}/${productPlans.title}`}>
                                                        <div>
                                                            <div className="">
                                                                <div className="card-display">
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
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))
                                            :
                                            skeleton.map((placeHolder, index) => (
                                                <div>
                                                    {placeHolder}
                                                </div>
                                            ))
                                    }
                                </div>
                        }
                    </div>
                    <div className="mobile-only">
                        <OwlCarousel className="owl-theme" lazyLoad={true}
                            responsive={responsive}
                            responsiveClass={true} loop={true} margin={20} nav>
                            <div className="card-display item">
                                <div className="card-header">

                                </div>
                                <div className="card-body">
                                    <div className="card-body-header">
                                        <p>Dance Trends</p>
                                        <p>02:20 mins</p>
                                    </div>
                                    <h4 className="card-body-title">Azonto in 2 minutes</h4>
                                    <div className="card-body-footer">
                                        <p>Adeleke Ifeoluwase</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-display item">
                                <div className="card-header">

                                </div>
                                <div className="card-body">
                                    <div className="card-body-header">
                                        <p>Dance Trends</p>
                                        <p>02:20 mins</p>
                                    </div>
                                    <h4 className="card-body-title">Azonto in 2 minutes</h4>
                                    <div className="card-body-footer">
                                        <p>Adeleke Ifeoluwase</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-display item">
                                <div className="card-header">

                                </div>
                                <div className="card-body">
                                    <div className="card-body-header">
                                        <p>Dance Trends</p>
                                        <p>02:20 mins</p>
                                    </div>
                                    <h4 className="card-body-title">Azonto in 2 minutes</h4>
                                    <div className="card-body-footer">
                                        <p>Adeleke Ifeoluwase</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-display item">
                                <div className="card-header">

                                </div>
                                <div className="card-body">
                                    <div className="card-body-header">
                                        <p>Dance Trends</p>
                                        <p>02:20 mins</p>
                                    </div>
                                    <h4 className="card-body-title">Azonto in 2 minutes</h4>
                                    <div className="card-body-footer">
                                        <p>Adeleke Ifeoluwase</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-display item">
                                <div className="card-header">

                                </div>
                                <div className="card-body">
                                    <div className="card-body-header">
                                        <p>Dance Trends</p>
                                        <p>02:20 mins</p>
                                    </div>
                                    <h4 className="card-body-title">Azonto in 2 minutes</h4>
                                    <div className="card-body-footer">
                                        <p>Adeleke Ifeoluwase</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-display item">
                                <div className="card-header">

                                </div>
                                <div className="card-body">
                                    <div className="card-body-header">
                                        <p>Dance Trends</p>
                                        <p>02:20 mins</p>
                                    </div>
                                    <h4 className="card-body-title">Azonto in 2 minutes</h4>
                                    <div className="card-body-footer">
                                        <p>Adeleke Ifeoluwase</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-display item">
                                <div className="card-header">

                                </div>
                                <div className="card-body">
                                    <div className="card-body-header">
                                        <p>Dance Trends</p>
                                        <p>02:20 mins</p>
                                    </div>
                                    <h4 className="card-body-title">Azonto in 2 minutes</h4>
                                    <div className="card-body-footer">
                                        <p>Adeleke Ifeoluwase</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-display item">
                                <div className="card-header">

                                </div>
                                <div className="card-body">
                                    <div className="card-body-header">
                                        <p>Dance Trends</p>
                                        <p>02:20 mins</p>
                                    </div>
                                    <h4 className="card-body-title">Azonto in 2 minutes</h4>
                                    <div className="card-body-footer">
                                        <p>Adeleke Ifeoluwase</p>
                                    </div>
                                </div>
                            </div>
                        </OwlCarousel>
                    </div>
                </div>
            </div>
            <div className="sec-homepage-extra-desc mt_5">
                <div className="contain">
                    <div className="grid-2 grid-first-outline">
                        <div>
                            <div>
                                <h2>On-demand, stepped care for all life's moments</h2>
                                <p>Empower your organization with industry-leading mental health resources, including EAP
                                    services, therapy, medication management, coaching, mindfulness. Empower your
                                    organization with industry-leading mental health resources.</p>
                                <div className="grid-2">
                                    <p><ColoredCircle />Empower your organization</p>
                                    <p><ColoredCircle />Empower your organization</p>
                                    <p><ColoredCircle />Empower your organization</p>
                                    <p><ColoredCircle />Empower your organization</p>
                                    <p><ColoredCircle />Empower your organization</p>
                                    <p><ColoredCircle />Empower your organization</p>
                                </div>
                                <div className="button-grid">
                                    <button className="btn-red">Request a demo</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            {/* <div className="sec-homepage-img-div">

                            </div> */}
                            <img src={Hero2} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="sec-homepage-extra-desc reverse mt_5">
                <div className="contain">
                    <div className="grid-2 grid-first-outline">
                        {/* <div className="sec-homepage-img-div">

                        </div> */}
                        <img src={Hero1} alt="" />
                        <div>
                            <div>
                                <h2>On-demand, stepped care for all life's moments</h2>
                                <p>Empower your organization with industry-leading mental health resources, including EAP
                                    services, therapy, medication management, coaching, mindfulness. Empower your
                                    organization with industry-leading mental health resources.</p>
                                <div className="grid-2">
                                    <p><ion-icon name="checkmark-circle-outline"></ion-icon>Empower your organization</p>
                                    <p><ion-icon name="checkmark-circle-outline"></ion-icon>Empower your organization</p>
                                    <p><ion-icon name="checkmark-circle-outline"></ion-icon>Empower your organization</p>
                                    <p><ion-icon name="checkmark-circle-outline"></ion-icon>Empower your organization</p>
                                    <p><ion-icon name="checkmark-circle-outline"></ion-icon>Empower your organization</p>
                                    <p><ion-icon name="checkmark-circle-outline"></ion-icon>Empower your organization</p>
                                </div>
                                <div className="button-grid">
                                    <button className="btn-red">Request a demo</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="final-cover mt_5">
                <div className="contain">
                    <h5>OUR PHYSICAL CLASSES</h5>
                    <h3>We are available in different locations across Lagos to meet your fitness needs.</h3>
                    <Link to={AllAppRoutes.trainings} className="btn-red">See our locations</Link>
                </div>
            </div>
            <Footer noMargin={true} />
        </div >
    )
}

const mapStateToProps = store => {
    return { auth: store.auth }
}

export default connect(mapStateToProps)(Homepage);