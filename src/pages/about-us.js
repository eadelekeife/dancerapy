import React from "react";

import { Link, useQue } from "react-router-dom";

import Nav from "../components/nav";
import Footer from "../components/footer";
import AllAppRoutes from "../utils/routes";
import OwlCarousel from 'react-owl-carousel';

import { ReactComponent as ArrowRight } from "../assets/images/arrow-right.svg";
import Image1 from "../assets/images/new/new1.jpg";
import Image2 from "../assets/images/new/new8.jpg";
import Image3 from "../assets/images/new/new7.jpeg";
import Image4 from "../assets/images/new/new4.jpg";
import video1 from "../assets/images/new/video1.mp4";

import { ReactComponent as PlusIcon } from "../assets/images/plus.svg";
import Instructor2 from "../assets/images/team/_4.jpg";
import Instructor3 from "../assets/images/team/_5.jpg";
import Instructor4 from "../assets/images/team/_6.jpg";
import Instructor5 from "../assets/images/team/_7.jpg";

const AboutUs = () => {
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
    return (
        <div className="about-hero-sec instructor-display">
            <Nav />
            {/* <div className="about-hero">
                <div className="about-video-sect">
                </div>
            </div> */}
            <div className="about-sub-hero">
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
                                <Link
                                    to={AllAppRoutes.contact_us}
                                    className="btn-black curve">Reach out to us <ArrowRight /></Link>
                                <Link to={AllAppRoutes.corporate} className="btn-blank">See how we impact</Link>
                            </div>
                            <div>
                                <div>
                                    <p>Tested by the country's biggest brands</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="bg-instructors-circle">

                            </div>
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
                        </div>
                    </div>
                </div>
            </div>
            <div className="about-sub-props mt_5">
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
                        <div className="video-message-bg">
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
            <div className="about-sub-message mt_5">
                <div className="contain">
                    <div className="about-flex">
                        <div>
                            <h2>Our mission is to ensure that <span>dance fitness</span> becomes a lifestyle for <span>millions of people</span> around the world.</h2>
                            {/* <h2>Real-world examples of how we have helped companies achieve their marketing objectives</h2> */}
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
            <div className="testimonial">
                <div className="contain">
                    <div>
                        {/* <h1>&ldquo;Dancerapy is intense, fun, energetic and all the great words. If you
                            are not a dancerapy member, you are missing out big time. Shake your
                            body, burn those calories in a FUN way&rdquo;</h1> */}
                        <h1>&ldquo;I've always been intimidated by dance workouts, but this app has made it so accessible
                            and enjoyable. The instructors break down the moves step by step, and the app's interface
                            is user-friendly. I've gained confidence, improved my fitness, and discovered a new passion
                            for dancing. I can't thank this app enough!&rdquo;</h1>
                        {/* <h1>&ldquo;I really enjoyed working with you guys, you guys are very communicative and quick to
                            do the job. I really can't wait to work with you again! I really enjoyed working with
                            you guys, you guys are very communicative and quick to do
                            the job.&rdquo;</h1> */}
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
            <div>
                <div className="team mt_5">
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
            <Footer />
        </div>
    )
}

export default AboutUs;