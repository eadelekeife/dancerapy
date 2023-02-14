import "./homepage.css";

import React from "react";
import Slider from "react-slick";

import { Divider, Rate } from "antd";

import AboutImage from "../../assets/images/homepage/about.webp";
import John from "../../assets/images/homepage/john.webp";
import { ReactComponent as About } from "../../assets/images/mini.svg";
import { ReactComponent as ArrowSvg } from '../../assets/images/arrow.svg';
import { ReactComponent as ImageBlock1 } from '../../assets/images/homepage/imageblock1.svg';

import Nav from "../../utils/nav";
import Footer from "../../utils/footer";

import { Input } from 'antd';
import { Controller, useForm } from "react-hook-form";

import { Link } from "react-router-dom";
import AppRoute from "../../utils/routes";
import ReactPlayer from 'react-player';

import Block1 from '../../assets/images/homepage/header.jpg';
import Block2 from '../../assets/images/homepage/header1.jpg';
import Block3 from '../../assets/images/homepage/header2.jpg';

import Annual from "../../assets/images/homepage/annual.jpeg";
import Flash from "../../assets/images/homepage/flash.jpeg";
import Zoom from "../../assets/images/homepage/zoom.jpg";
import Physical from "../../assets/images/homepage/physical.jpeg";

import Insta1 from "../../assets/images/content/event_1.jpg";
import Insta2 from "../../assets/images/content/event3.jpg";
import Insta3 from "../../assets/images/content/testi.jpg";
import Insta4 from "../../assets/images/content/event4.jpg";

import _1 from '../../assets/images/companies/access.webp';
import _2 from '../../assets/images/companies/shell.png';
import _3 from '../../assets/images/companies/terra.png';
import _4 from '../../assets/images/companies/corona.png';
import _6 from '../../assets/images/companies/dansol.png';
import _7 from '../../assets/images/companies/gtco.png';
import _8 from '../../assets/images/companies/mtn.png';

import Loom1 from '../../assets/images/homepage/loom1.jpg';
import Ready from '../../assets/images/homepage/ready.webp';

import Loom from './_1.svg';
import Loom2 from './img.svg';
import AlvinWave from "./_2.svg";
import { ReactComponent as Wave } from "./wave.svg";

const AboutUs = () => {

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
    const { handleSubmit, control } = useForm({});
    return (
        <div className="new-homepage about_us">
            <Nav />
            <div className="dance-redesign-hero">
                <div className="contain">
                    <div className="dance-hero-cover">
                        <h3>Profession Fitness <br /> Dance Trainings</h3>
                    </div>
                </div>
            </div>
            <div className="dance-redesign-text-display mt-5">
                <div className="contain">
                    <h3>Integrated <br /> Digital Marketing</h3>
                    {/* <h3>Integrated <br /> Digital Marketing</h3>
                    <p>We’ve been skillfully weaving together the strands of strategic digital marketing since
                        2009. Loom helps all kinds of ambitious businesses to improve their digital presence and
                        make digital work for them commercially. Find out more about who we are.</p>
                    <p>We’ve been skillfully weaving together the strands of strategic digital marketing since
                        2009. Loom helps all kinds of ambitious businesses to improve their digital presence and
                        make digital work for them commercially. Find out more about who we are.</p>
                    <button>How we weave channels together</button>
                    <img src={Loom2} alt="Loom2" /> */}
                    {/* <div>
                        <Divider />
                        <p>We’ve been skillfully weaving together the strands of strategic digital marketing since
                            2009. Loom helps all kinds of ambitious businesses to improve their digital presence and
                            make digital work for them commercially. Find out more about who we are.</p>
                        <button>How we weave channels together</button>
                    </div>
                    <div>
                        <Divider />
                        <p>We’ve been skillfully weaving together the strands of strategic digital marketing since
                            2009. Loom helps all kinds of ambitious businesses to improve their digital presence and
                            make digital work for them commercially. Find out more about who we are.</p>
                        <button>How we weave channels together</button>
                    </div> */}
                    <div>
                        <Divider />
                        <p>We’ve been skillfully weaving together the strands of strategic digital marketing since
                            2009. Loom helps all kinds of ambitious businesses to improve their digital presence and
                            make digital work for them commercially. Find out more about who we are.</p>
                        <button>How we weave channels together</button>
                    </div>
                    <div>
                        <Divider />
                        <p>We’ve been skillfully weaving together the strands of strategic digital marketing since
                            2009. Loom helps all kinds of ambitious businesses to improve their digital presence and
                            make digital work for them commercially. Find out more about who we are.</p>
                        <button>How we weave channels together</button>
                    </div>
                </div>
            </div>
            <div className="dance-redesign-props-display mt-5">
                <div className="dance-redesign-props-img-cover">
                    <img src={Loom1} alt="loom 1" />
                    <Wave className="wave-image" />
                </div>
                <div className="contain">
                    <div className="block"></div>
                    <h4>For over ten years.</h4>
                    <p>We’ve been skillfully weaving together the strands of strategic digital marketing since
                        2009. Loom helps all kinds of ambitious businesses to improve their digital presence and
                        make digital work for them commercially. Find out more about who we are.</p>
                    <button className="btn_red">Meet the Loom team</button>
                </div>
            </div>
            <div className="dance-redesign-final-props mt-5">
                <div className="contain">
                    <div>
                        <h2>All in a calendar, that's a joy to use</h2>
                        <p>We’ve been skillfully weaving together the strands of strategic digital marketing since
                            2009. Loom helps all kinds of ambitious businesses to improve their digital presence and
                            make digital work for them commercially. Find out more about who we are.</p>
                        <div className="tags">
                            <p>Desktop App</p>
                            <p>Keyboard Shortcuts</p>
                            <p>Dark and Light Mode</p>
                            <p>Google calendar sync</p>
                            <p>Notifications</p>
                        </div>
                    </div>
                    <div>
                        <img src={Ready} alt="ready" />
                    </div>
                </div>
            </div>
            <div className="dance-redesign-props-display mt-5">
                <div className="dance-redesign-props-img-cover">
                    <img src={Loom1} alt="loom 1" />
                    <Wave className="wave-image" />
                </div>
                <div className="contain">
                    <div className="block"></div>
                    <h4>For over ten years.</h4>
                    <p>We’ve been skillfully weaving together the strands of strategic digital marketing since
                        2009. Loom helps all kinds of ambitious businesses to improve their digital presence and
                        make digital work for them commercially. Find out more about who we are.</p>
                    <button className="btn_red">Meet the Loom team</button>
                </div>
            </div>
            <div className="dance-redesign-email mt-5">
                <div className="contain">
                    <h4>For over ten years, Bristol-based Loom has been.</h4>
                    <p>We’ve been skillfully weaving together the strands of strategic digital marketing since
                        2009. Loom helps all kinds of ambitious businesses to improve their digital presence and
                        make digital work for them commercially. Find out more about who we are.</p>
                    <form>
                        <div>
                            <Controller name="email" defaultValue="" control={control}
                                render={({ field }) => (
                                    <Input {...field} />
                                )}
                            />
                            <button>Subscribe</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* <div className="mt-5 homepage_links">
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
            </div> */}
            <Footer margin={true} />
        </div>
    )
}

export default AboutUs;