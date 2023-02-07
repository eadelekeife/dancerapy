import "./instructors.css";

import React from "react";

import { Rate } from "antd";

import AboutImage from "../../assets/images/homepage/instructor.jpg";
import John from "../../assets/images/homepage/john.webp";
import { ReactComponent as About } from "../../assets/images/mini.svg";

import Nav from "../../utils/nav";
import Footer from "../../utils/footer";

import _1 from '../../assets/images/companies/access.webp';
import _2 from '../../assets/images/companies/shell.png';
import _3 from '../../assets/images/companies/terra.png';
import _4 from '../../assets/images/companies/corona.png';
import _6 from '../../assets/images/companies/dansol.png';
import _7 from '../../assets/images/companies/gtco.png';
import _8 from '../../assets/images/companies/mtn.png';

const AboutUs = () => {
    return (
        <div className="about_us">
            <Nav />
            <div className="about_hero">
                <div className="grid_2">
                    <div className="about_hero_content">
                        <h2>Join the Dancerapy Instructor Family</h2>
                        <p>We are an essential partnership link between produce growers and commercial purchasers
                            from coast to coast. So bring it on. We are an essential partnership link between
                            produce growers. We are an essential partnership link between produce growers and
                            commercial purchasers from coast to coast. </p>
                    </div>
                    <div>
                        <img src={AboutImage} alt="about image" />
                    </div>
                </div>
                <div className="bg-flow">
                    <About />
                </div>
            </div>
            <div className="black-content">
                <div>
                    <p>Access to new choreographies</p>
                    <p>Provision of Dancerapy merchandise</p>
                    <p>Access to larger client base</p>
                    <p>Free feature on publicity channels</p>
                    <p>Access to free graphic designs for classes</p>
                    <p>Invoicing</p>
                    <p>Free feature on Dancerapy platforms</p>
                    <p>Two free trainings and subsequent discounts</p>
                </div>
            </div>
            <div className="about_hero_text mt-5">
                <div className="contain">
                    <h5>GET STARTED</h5>
                    <h3>Do something you love and get paid for it</h3>
                    <p className="edit">
                        This is a career empowerment system aimed at equipping you with the tools required
                        for sustainable growth and income as a Dancerapy Instructor. The Dance Instructor Family
                        comes with a lot of benefits ranging from further trainings to free publicity
                    </p>
                    <div className="grid_3">
                        <div>
                            <img src={John} alt="john" />
                            <h5 className="hero-text-header">Create a free account</h5>
                            <p>
                                Create a free account and register your details, select your preferred training
                                method — in-person, online or private training.
                            </p>
                        </div>
                        <div>
                            <img src={John} alt="john" />
                            <h5 className="hero-text-header">Training / Get your Certificate</h5>
                            <p>
                                Training to span for a period of 6 months. After training, you
                                showcase /audition for management. Certificates will
                                be issued after training.
                            </p>
                        </div>
                        <div>
                            <img src={John} alt="john" />
                            <h5 className="hero-text-header">Become a Dancerapy Instructor</h5>
                            <p>
                                When you have successfully completed your training and are
                                certified by our team of experts, you can now handle professional dance classes. Enjoy!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="team-bg mt-5">

            </div>
            <div className="mt-5 instructor_testimonials">
                <div className="container">
                    <div className="center_div">
                        <div>
                            <h3 className="tile_header">What our Clients are saying about Us</h3>
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
                    <div className="mt-3 grid_3">
                        <div className="instructor_message_div">
                            <Rate disabled defaultValue={5} />
                            <p className="instructor_message">
                                Dancerapy is intense, fun, energetic and all the great words. If you are not a
                                dancerapy member, you are missing out big time. Shake your body, burn those
                                calories in a FUN way!
                            </p>
                            <div>
                                <p className="instructor_name">Chiamaka Obuekwe</p>
                            </div>
                        </div>
                        <div className="instructor_message_div">
                            <Rate disabled defaultValue={5} />
                            <p className="instructor_message">
                                With Dancerapy, i lost 8kg in four(4) months! It is always great fun during
                                Dancerapy sessions. You can dance your way to fitness, it is not a fluke.
                            </p>
                            <div>
                                <p className="instructor_name">Mrs Onyinye</p>
                            </div>
                        </div>
                        <div className="instructor_message_div">
                            <Rate disabled defaultValue={5} />
                            <p className="instructor_message">
                                Fun and energetic class, amazing instructors, great
                                engagements, beautiful members all of this and more to expect from a
                                Dancerapy session.
                            </p>
                            <div>
                                <p className="instructor_name">Olajumoke</p>
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