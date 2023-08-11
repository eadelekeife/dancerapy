import React, { useState } from "react";
import Nav from "../components/nav";
import Footer from "../components/footer";

import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import OwlCarousel from 'react-owl-carousel';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import { Input, Spin, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import VideoJS from '../components/video-player';

import _1 from '../assets/images/companies/access.webp';
import _2 from '../assets/images/companies/shell.png';
import _3 from '../assets/images/companies/terra.png';
import _4 from '../assets/images/companies/corona.png';
import _6 from '../assets/images/companies/dansol.png';
import _7 from '../assets/images/companies/gtco.png';
import _8 from '../assets/images/companies/mtn.png';
// import video1 from "../assets/images/new/video1.mp4";

import { ReactComponent as PlusIcon } from "../assets/images/plus.svg";
import Instructor2 from "../assets/images/team/_4.jpg";
import Instructor3 from "../assets/images/team/_5.jpg";
import Instructor4 from "../assets/images/team/_6.jpg";
import Instructor5 from "../assets/images/team/_7.jpg";
import Instructor6 from "../assets/images/team/_8.jpg";

import Image1 from "../assets/images/new/new9.jpg";
import Image2 from "../assets/images/new/instructor_sec.jpg";
import Image3 from "../assets/images/new/new5.jpg";
import Image4 from "../assets/images/new/instructor_hero.jpg";

import StudentCap from "../assets/images/illustrations/student_cap.png";
import CreditCard from "../assets/images/illustrations/credit_card.png";
import EnterKey from "../assets/images/illustrations/enter_key.png";

import AllAppRoutes from "../utils/routes";
import { Modal } from "antd";

const Instructors = () => {

    const [loadingData, setLoadingData] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;
    const validator = yup.object().shape({
        emailAddress: yup.string().email('Email is not valid').required('Email field can not be empty'),
        password: yup.string().min(6).required('Password field can not be empty')
    })

    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValue: {
            emailAddress: "",
            password: "",
        },
        resolver: yupResolver(validator)
    });

    const [visible, setVisible] = useState(false);
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
    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            src: "https://dancerapyvideos.s3.amazonaws.com/dance+trends/DANCE+TRENDS+(Azonto)+(1).mp4",
            type: 'video/mp4'
        }]
    };


    const handlePlayerReady = (player) => {
        // playerRef.current = player;
    };
    const signInUser = () => {

    }
    return (
        <div className="about-hero-sec instructor-display">
            <Nav />
            <div className="about-sub-hero">
                <div className="contain">
                    <div className="grid-2">
                        <div>
                            <h2>Do something you enjoy and get paid for it with DIF</h2>
                            {/* <h2>Stay ahead of the curve with our forward-thinking</h2> */}
                            <p>This is a career empowerment system aimed at equipping you with the tools required for
                                sustainable growth and income as a Dancerapy Instructor. The Dance Instructor Family comes
                                with a lot of benefits ranging from further trainings.</p>
                            <div className="btn-flex">
                                <button
                                    onClick={() => setVisible(true)}
                                    className="btn-black curve">Become an Instructor</button>
                                <Link to={AllAppRoutes.contact_us} className="btn-blank">Reach out to us</Link>
                            </div>
                            <div className="desktop-only">
                                <div>
                                    <p>Tested by the country's biggest brands</p>
                                    <ul>
                                        <li><img src={_1} alt="" /></li>
                                        <li><img src={_2} alt="" /></li>
                                        <li><img src={_3} alt="" /></li>
                                        <li><img src={_4} alt="" /></li>
                                        <li><img src={_6} alt="" /></li>
                                        <li><img src={_7} alt="" /></li>
                                        <li><img src={_8} alt="" /></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div style={{ height: '100%' }}>
                            {/* <div className="bg-instructors-banner">
                                <VideoJS options={videoJsOptions}
                                    onReady={handlePlayerReady} />
                            </div> */}
                            {/* <div className="grid-2">
                                <div className="about-sub-hero-card">
                                    <h2>230+</h2>
                                    <p>This is a career empowerment system aimed at equipping you with the tools required.</p>
                                </div>
                                <div className="about-sub-hero-card">
                                    <h2>230+</h2>
                                    <p>This is a career empowerment system aimed at equipping you with the tools required.</p>
                                </div>
                            </div>
                            <div className="color-me">
                                <div className="grid-2">
                                    <div>
                                        <p><span></span>Drive more traffic werey</p>
                                        <h3>Drive more traffic and product sales</h3>
                                    </div>
                                    <div className="bar-chart-cover">
                                        <div className="bar-chart-display">
                                            <div className="bar bar-1"></div>
                                            <div className="bar bar-2"></div>
                                            <div className="bar bar-3"></div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="bg-instructors-circle">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="about-sub-props mt_5">
                <div className="contain">
                    <div className="grid-2">
                        <div>
                            <h3>Get certified by our team of experts and handle classes</h3>
                        </div>
                        <div>
                            <p> Being a dance instructor offers opportunities for personal growth and
                                development. Teaching others requires continuous learning, refining teaching
                                techniques, and staying updated with dance styles and trends.</p>
                        </div>
                    </div>
                    <div className="sec-grid-2">
                        <div className="video-message-bg desktop-only">
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
            <div className="about-sub-message mt_5">
                <div>
                    <div className="contain">
                        <div className="about-flex">
                            <div>
                                <h2>Teaching dance allows you to <span>express</span> your creativity <span>through</span> choreography <span>and</span> lesson planning.</h2>
                                <div className="btn-array">
                                    <button className="btn-default">Access to new Choreographies</button>
                                    <button className="btn-default">Provision of Dancerapy merchandise</button>
                                    <button className="btn-default">Invoicing</button>
                                    <button className="btn-default">Access to larger client base</button>
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
                    {/* <div className="img-data-flex">
                        <OwlCarousel className="owl-theme" lazyLoad={true}
                            //  responsive={responsive}
                            responsiveClass={true} loop={true} margin={20} nav>
                            <div class='item'>
                                <div className='img-block'>
                                    <h4>2</h4>
                                </div>
                            </div>
                            <div class='item'>
                                <div className='img-block'>
                                    <h4>3</h4>
                                </div>
                            </div>
                            <div class='item'>
                                <div className='img-block'>
                                    <h4>4</h4>
                                </div>
                            </div>
                            <div className='item'>
                                <div className='img-block'>
                                    <h4>5</h4>
                                </div>
                            </div>
                        </OwlCarousel>
                    </div> */}
                </div>
            </div>
            <div className="testimonial">
                <div className="contain">
                    <div>
                        <h1>&ldquo;I really enjoyed working with you guys, you guys are very communicative and quick to
                            do the job. I really can't wait to work with you again! I really enjoyed working with
                            you guys, you guys are very communicative and quick to do
                            the job.&rdquo;</h1>
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
            <div className="about-sub-props mt_5">
                <div className="contain">
                    <div className="grid-2">
                        <div>
                            <h3>3 simple ways to join the Dancerapy Instructor Family</h3>
                        </div>
                        <div>
                            <p>As a dance instructor, you have the opportunity to build meaningful relationships with
                                your students and fellow dancers. You can create a sense of community, foster
                                connections, and form lifelong friendships within the dance world.</p>
                        </div>
                    </div>
                    <div className="grid-3">
                        <div className="instructor-prop-data">
                            <div className="block">
                                {/* <EnterKey /> */}
                                <img src={EnterKey} alt="user signup" />
                            </div>
                            <div>
                                <h3>Create a free account</h3>
                            </div>
                            <div>
                                <p>To join the DIF, you begin by creating a free account, registering
                                    your details, selecting your preferred training method — in-person, online
                                    or private training.
                                </p>
                            </div>
                        </div>
                        <div className="instructor-prop-data">
                            <div className="block">
                                {/* <StudentCap /> */}
                                <img src={StudentCap} alt="user graduates" />
                            </div>
                            <div>
                                <h3>Training / Get your Certificate</h3>
                            </div>
                            <div>
                                <p>The Dancerapy Instructor Training spans for a period of 6 months. After training, you
                                    showcase /audition for management. Certificates will be issued after training.</p>
                            </div>
                        </div>
                        <div className="instructor-prop-data">
                            <div className="block">
                                {/* <CreditCard /> */}
                                <img src={CreditCard} alt="user becomes an instructor" />
                            </div>
                            <div>
                                <h3>Become a Dancerapy Instructor</h3>
                            </div>
                            <div>
                                <p>When you have successfully completed your training and are certified by our team of
                                    experts, you can now handle professional dance classes. Enjoy!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal centered open={visible} onOk={() => setVisible(false)} maskClosable={false} onCancel={() => setVisible(false)} footer={null} >
                <React.Fragment>
                    <form onSubmit={handleSubmit(signInUser)}>
                        <div className="form-group">
                            <label htmlFor="emailAddress">Email address</label>
                            <Controller name="emailAddress" control={control}
                                render={({ field }) => {
                                    return (
                                        <Input style={{ height: '5rem' }} type="email" {...field}
                                            name="emailAddress" />
                                    )
                                }} />
                            {errors.emailAddress && <p className="errorMessage">{errors.emailAddress.message}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Controller name="password" control={control}
                                render={({ field }) => {
                                    return (
                                        <Input.Password type="password" style={{ height: '5rem' }} {...field}
                                            name="password" />
                                    )
                                }} />
                            {errors.password && <p className="errorMessage">{errors.password.message}</p>}
                        </div>
                    </form>
                </React.Fragment>
            </Modal>
            <Footer />
        </div>
    )
}

export default Instructors;