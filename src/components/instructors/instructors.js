import "./instructors.css";

import React from "react";

import { Rate } from "antd";

import AboutImage from "../../assets/images/homepage/about.webp";
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
                        <h2>Bring us your toughest challenges.</h2>
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
                    <p>Member-only Perks</p>
                    <p>20% on every order</p>
                    <p>Free Shipping</p>
                    <p>Custom plans</p>
                    <p>Member-only Perks</p>
                    <p>Free Shipping</p>
                    <p>Custom plans</p>
                    <p>Member-only Perks</p>
                </div>
            </div>
            <div className="about_hero_text mt-5">
                <div className="contain">
                    <h5>OUR PROMISE</h5>
                    <h3>Never Be Thirsty Again</h3>
                    <p className="edit">
                        As we grew, we vowed to not only protect our customers from dehydration but create the
                        most effective, science-backed lineup of wellness products. When assembled, these
                        heroes empower you to live your best life. Onwards and upwards.
                    </p>
                    <div className="grid_3">
                        <div>
                            <img src={John} alt="john" />
                            <h5 className="hero-text-header">Mrs Onyinye</h5>
                            <p>
                                As we grew, we vowed to not only protect our customers from dehydration but
                                create the most effective, science-backed lineup of wellness products.
                            </p>
                        </div>
                        <div>
                            <img src={John} alt="john" />
                            <h5 className="hero-text-header">Mrs Onyinye</h5>
                            <p>
                                As we grew, we vowed to not only protect our customers from dehydration but
                                create the most effective, science-backed lineup of wellness products.
                            </p>
                        </div>
                        <div>
                            <img src={John} alt="john" />
                            <h5 className="hero-text-header">Mrs Onyinye</h5>
                            <p>
                                As we grew, we vowed to not only protect our customers from dehydration but
                                create the most effective, science-backed lineup of wellness products.
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