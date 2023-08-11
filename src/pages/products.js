import "../assets/css/training.css";

import React, { useState } from "react";

import { Divider, Rate } from "antd";
import { Link } from "react-router-dom";

import Nav from "../components/nav";
import Footer from "../components/footer";
import AllAppRoutes from "../utils/routes";

import { ReactComponent as ApproveIcon } from "../assets/images/approve.svg";
import AboutHero from "../assets/images/content/about_hero.jpg";
import CorporateHero from "../assets/images/content/event4.jpg";
import OfficePeople from "../assets/images/homepage/office.jpg";

const Products = () => {
    const [activeSelection, setActiveSelection] = useState('monthly');
    return (
        <div>
            <Nav />
            <div className="product-listing">
                <div>
                    <div className="contain listing-header">
                        <div className="new-header">
                            {/* <h2>Building Healthy Connections through Dance.</h2> */}
                            {/* <h2>Building healthy connections that encourages self-worth, confidence and a healthier lifestyle.</h2> */}
                            {/* <h2>We are on a Mission to help <span className="color-1">Business</span> <span className="color-2">Grow</span> Faster than Ever</h2> */}
                            {/* <h2>We are on a Mission to help Business Grow Faster than Ever</h2> */}
                            <h2>Step into Savings: Dance Your Way to a Healthier You at an Unbeatable Price!</h2>
                            <p>We believe that dance fitness should be accessible to everyone, which is why we've
                                designed our pricing plans to cater to different needs and budgets. Whether you're a
                                dance enthusiast or a fitness lover looking for a fun and effective workout, we
                                have a plan that's perfect for you.</p>
                            {/* <p> Being a dance instructor offers opportunities for personal growth and
                                development. Teaching others requires continuous learning, refining teaching
                                techniques, and staying updated with dance styles and trends.</p> */}
                            <div className="button-flex">
                                <button
                                    onClick={() => setActiveSelection('monthly')}
                                    className={`${activeSelection === "monthly" ? 'active' : ''}`}
                                >Monthly</button>
                                <button
                                    onClick={() => setActiveSelection('yearly')}
                                    className={`${activeSelection === "yearly" ? 'active' : ''}`}
                                >Yearly</button>
                            </div>
                        </div>
                        <div className="grid-3">
                            <div className="display1">
                                <h1>Dance in a flash</h1>
                                <p>Get Fit and Shed Off Excess Weight By Doing Something That Is Actually Fun without
                                    leaving The Comfort Of Your Home.
                                </p>
                                <div>
                                    <h4><span className="currency">NGN</span> 20,000.00 <span className="sec-span">/ for life</span></h4>
                                </div>
                                <ul>
                                    <li><ApproveIcon />Access to the most recent 90 days of message history</li>
                                    <li><ApproveIcon />Timely info and actions in one place with unlimited integrations</li>
                                    <li><ApproveIcon />Audio and video conversations with screen sharing with up to 50 people</li>
                                    <li><ApproveIcon />Compliance requirements met with data exports for all messages</li>
                                </ul>
                                <button>GET STARTED</button>
                                <Link to={AllAppRoutes.contact_us}>Contact Support</Link>
                            </div>
                            <div className="display1 _2">
                                <p className="price-tag">Most Popular</p>
                                <h1>Dancerapy Club</h1>
                                <p>Join The Dancerapy Club Today and have access to over 30 Dance Fitness Videos, Dance
                                    Choreophgries, Dance Trends and lots more monthly.</p>
                                <div>
                                    {
                                        activeSelection === "monthly" ?
                                            <h4><span className="currency">NGN</span> 3,000.00</h4>
                                            :
                                            <h4><span className="currency">NGN</span> 20,000.00</h4>
                                    }
                                </div>
                                <ul>
                                    <li><ApproveIcon />Access to the most recent 90 days of message history</li>
                                    <li><ApproveIcon />Timely info and actions in one place with unlimited integrations</li>
                                    <li><ApproveIcon />Audio and video conversations with screen sharing with up to 50 people</li>
                                    <li><ApproveIcon />Compliance requirements met with data exports for all messages</li>
                                </ul>
                                <button>GET STARTED</button>
                                <Link to={AllAppRoutes.contact_us}>Contact Support</Link>
                            </div>
                            <div className="display1 _3">
                                <h1>Dancerapy live on Zoom</h1>
                                <p>Join our experienced and passionate dance instructor live on Zoom as they guide you 
                                    through a dynamic and engaging dance workout.</p>
                                {/* <p>An online experience that can help your fitness dreams come true without leaving
                                    your house and still have workout buddies via access to workout dance routines.</p> */}
                                <div>
                                    {
                                        activeSelection === "monthly" ?
                                            <h4><span className="currency">NGN</span> 3,000.00</h4>
                                            :
                                            <h4><span className="currency">NGN</span> 20,000.00</h4>
                                    }
                                </div>
                                <ul>
                                    <li><ApproveIcon />Access to the most recent 90 days of message history</li>
                                    <li><ApproveIcon />Timely info and actions in one place with unlimited integrations</li>
                                    <li><ApproveIcon />Audio and video conversations with screen sharing with up to 50 people</li>
                                    <li><ApproveIcon />Compliance requirements met with data exports for all messages</li>
                                </ul>
                                <button>GET STARTED</button>
                                <Link to={AllAppRoutes.contact_us}>Contact Support</Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="contain">
                    <div className="display-listing">
                        <div className="grid-4">
                            <div className="display1">
                                <h1>Dance in a flash</h1>
                                <p>Scale your business, increase productivity, and keep your
                                    teams connected</p>
                                <div className="grid-2">
                                    <div>
                                        <p>Forever</p>
                                        <Divider style={{ marginTop: 0 }} />
                                        <h4>NGN 20,000.00</h4>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                                <button>GET STARTED</button>
                                <ul>
                                    <li><ApproveIcon />Access to the most recent 90 days of message history</li>
                                    <li><ApproveIcon />Timely info and actions in one place with unlimited integrations</li>
                                    <li><ApproveIcon />Audio and video conversations with screen sharing with up to 50 people</li>
                                    <li><ApproveIcon />Compliance requirements met with data exports for all messages</li>
                                </ul>
                            </div>
                            <div className="display1">
                                <h1>Dancerapy Club</h1>
                                <p>Scale your business, increase productivity, and keep your
                                    teams connected</p>
                                <div className="grid-2">
                                    <div>
                                        <p>Monthly</p>
                                        <Divider style={{ marginTop: 0 }} />
                                        <h4>NGN 20,000.00</h4>
                                    </div>
                                    <div>
                                        <p>Annual</p>
                                        <Divider style={{ marginTop: 0 }} />
                                        <h4>NGN 20,000.00</h4>
                                    </div>
                                </div>
                                <button>GET STARTED</button>
                                <ul>
                                    <li><ApproveIcon />Access to the most recent 90 days of message history</li>
                                    <li><ApproveIcon />Timely info and actions in one place with unlimited integrations</li>
                                    <li><ApproveIcon />Audio and video conversations with screen sharing with up to 50 people</li>
                                    <li><ApproveIcon />Compliance requirements met with data exports for all messages</li>
                                </ul>
                            </div>
                            <div className="display1">
                                <h1>Dancerapy live on Zoom</h1>
                                <p>Scale your business, increase productivity, and keep your
                                    teams connected</p>
                                <div className="grid-2">
                                    <div>
                                        <p>Monthly</p>
                                        <Divider style={{ marginTop: 0 }} />
                                        <h4>NGN 20,000.00</h4>
                                    </div>
                                    <div>
                                        <p>Annual</p>
                                        <Divider style={{ marginTop: 0 }} />
                                        <h4>NGN 20,000.00</h4>
                                    </div>
                                </div>
                                <button>GET STARTED</button>
                                <ul>
                                    <li><ApproveIcon />Access to the most recent 90 days of message history</li>
                                    <li><ApproveIcon />Timely info and actions in one place with unlimited integrations</li>
                                    <li><ApproveIcon />Audio and video conversations with screen sharing with up to 50 people</li>
                                    <li><ApproveIcon />Compliance requirements met with data exports for all messages</li>
                                </ul>
                            </div>
                            <div className="display1">
                                <h1>Physical Class</h1>
                                <p>Scale your business, increase productivity, and keep your
                                    teams connected</p>
                                <div className="grid-2">
                                    <div>
                                        <p>Monthly</p>
                                        <Divider style={{ marginTop: 0 }} />
                                        <h4>NGN 20,000.00</h4>
                                    </div>
                                    <div>
                                        <p>Annual</p>
                                        <Divider style={{ marginTop: 0 }} />
                                        <h4>NGN 20,000.00</h4>
                                    </div>
                                </div>
                                <button>GET STARTED</button>
                                <ul>
                                    <li><ApproveIcon />Access to the most recent 90 days of message history</li>
                                    <li><ApproveIcon />Timely info and actions in one place with unlimited integrations</li>
                                    <li><ApproveIcon />Audio and video conversations with screen sharing with up to 50 people</li>
                                    <li><ApproveIcon />Compliance requirements met with data exports for all messages</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="dance-props mt_5 new-product-listing">
                <div className="contain">
                    <h3>What People like you tell us</h3>
                    <div className="grid-3">
                        <div className="props-link-tab _1">
                            <div className="contain">
                                {/* <div className="hr-line"></div> */}
                                <div className="props-link-tab-body">
                                    <p>Dancerapy is intense, fun, energetic and all the great words. If you
                                        are not a dancerapy member, you are missing out big time. Shake your
                                        body, burn those calories in a FUN way!</p>
                                    <div>
                                        <Rate allowHalf defaultValue={5} disabled />
                                    </div>
                                    <Divider />
                                    <div className="testimonial-author-avatar">
                                        <div className="avatar-bar"></div>
                                        <div>
                                            <h4>Chiamaka Obuekwe</h4>
                                            <p>Dance Student</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="props-link-tab _1">
                            <div className="contain">
                                {/* <div className="hr-line"></div> */}
                                <div className="props-link-tab-body">
                                    <p>With Dancerapy, I lost 8kg in four (4) months! It is always great fun during
                                        Dancerapy sessions. You can dance your way to fitness, it is not a fluke.</p>
                                    <div>
                                        <Rate allowHalf defaultValue={5} disabled />
                                    </div>
                                    <Divider />
                                    <div className="testimonial-author-avatar">
                                        <div className="avatar-bar"></div>
                                        <div>
                                            <h4>Mrs Onyinye</h4>
                                            <p>Dance Student</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="props-link-tab _1">
                            <div className="contain">
                                {/* <div className="hr-line"></div> */}
                                <div className="props-link-tab-body">
                                    <p>Fun and energetic class, amazing instructors, great
                                        engagements, beautiful members all of this and more to expect from a
                                        Dancerapy session.</p>
                                    <div>
                                        <Rate allowHalf defaultValue={5} disabled />
                                    </div>
                                    <Divider />
                                    <div className="testimonial-author-avatar">
                                        <div className="avatar-bar"></div>
                                        <div>
                                            <h4>Olajumoke</h4>
                                            <p>Dance Student</p>
                                        </div>
                                    </div>
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
        </div>
    )
}

export default Products;