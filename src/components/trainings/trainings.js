import "./trainings.css";

import React from "react";

import { Link } from "react-router-dom";
// import _1 from "../../assets/images/trainings/_1.jpeg";

import _1 from "../../assets/images/homepage/flash.jpeg";
import _2 from "../../assets/images/homepage/zoom.jpg";
import _3 from "../../assets/images/homepage/physical.jpeg";
import _4 from "../../assets/images/homepage/annual.jpeg";
import Dance from "../../assets/images/homepage/dance.png";

import Cart from "../../assets/images/cart.svg";

import Footer from "../../utils/footer";

const Trainings = () => {
    return (
        <div>
            <div className="training_hero">

            </div>
            <div className="trainings_sect">
                <div className="container">
                    <div className="training_div_cover mt-5">
                        <div className="training_group">
                            <div className="training_inside_group">
                                <div className="training_inside_img">
                                    <img src={_1} alt="_1" />
                                </div>
                                <div className="training_inside_div">
                                    <p className="unimportant">50% Discount</p>
                                    <h4 className="plan_title">DANCE IN A FLASH INSTANT DOWNLOAD</h4>
                                    <p>
                                        These dance routines have been carefully created to take care of your fitness 
                                        needs without you going to the gym, what is even super cool is, we have taken 
                                        all the Boring exercise movements and made dance routines for them.
                                    </p>
                                    {/* <p className="plan_author">Wendy Galvan - 5.0(110)</p>
                                    <div className="inline_list">
                                        <p className="unimportant">Zumba Toning</p>
                                        <ul>
                                            <li>&bull; Medium Intensity</li>
                                            <li>&bull; Great Music, Good Workout, Great Energy, Awesome Movies</li>
                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                            <div className="training_side_cover">
                                <div>
                                    <img src={Cart} alt="Cart" />
                                </div>
                                <div>
                                    <Link to="/zoom">DETAILS</Link>
                                </div>
                            </div>
                        </div>
                        <div className="training_group">
                            <div className="training_inside_group">
                                <div className="training_inside_img">
                                    <img src={_2} alt="_1" />
                                </div>
                                <div className="training_inside_div">
                                    <p className="unimportant">50% Discount</p>
                                    <h4 className="plan_title">JOIN DANCERAPY PHYSICAL CLASS</h4>
                                    {/* <p className="plan_author">NGN 10,000.00</p>
                                    <div className="inline_list">
                                        <p className="unimportant">Zumba Toning</p>
                                        <ul>
                                            <li>&bull; Medium Intensity</li>
                                            <li>&bull; Great Music, Good Workout, Great Energy, Awesome Movies</li>
                                        </ul>
                                    </div> */}
                                    <p>Dancerapy is a dance/fitness institution committed to helping you live your best life, achieve
                                        your fitness dreams and ultimately fall in love with your body.
                                        Join any of our dance studios around Lagos.</p>
                                </div>
                            </div>
                            <div className="training_side_cover">
                                <div>
                                    <img src={Cart} alt="Cart" />
                                </div>
                                <div>
                                    <Link to="/zoom">DETAILS</Link>
                                </div>
                            </div>
                        </div>
                        <div className="training_group">
                            <div className="training_inside_group">
                                <div className="training_inside_img">
                                    <img src={_3} alt="_1" />
                                </div>
                                <div className="training_inside_div">
                                    <p className="unimportant">50% Discount</p>
                                    <h4 className="plan_title">JOIN DANCERAPY LIVE ON ZOOM</h4>
                                    <p>
                                        An online experience that can help your fitness dreams
                                        come true without leaving your house and still have workout buddies via
                                        access to workout dance routines.
                                    </p>
                                    {/* <p className="plan_author">NGN 10,000.00</p>
                                    <div className="inline_list">
                                        <p className="unimportant">Zumba Toning</p>
                                        <ul>
                                            <li>&bull; Medium Intensity</li>
                                            <li>&bull; Great Music, Good Workout, Great Energy, Awesome Movies</li>
                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                            <div className="training_side_cover">
                                <div>
                                    <img src={Cart} alt="Cart" />
                                </div>
                                <div>
                                    <Link to="/zoom">DETAILS</Link>
                                </div>
                            </div>
                        </div>
                        <div className="training_group">
                            <div className="training_inside_group">
                                <div className="training_inside_img">
                                    <img src={_4} alt="_1" />
                                </div>
                                <div className="training_inside_div">
                                    <p className="unimportant">50% Discount</p>
                                    <h4 className="plan_title">DANCERPAY CLUB ANNUAL SUBSCRIPTION ONLINE</h4>
                                    <p>
                                        Join The Dancerapy Club Today and have access to over 30 Dance Fitness Videos,
                                        Dance Choreophgries, Dance Trends and lots more monthly.
                                        For ONLY #10 thousand naira per Year.
                                    </p>
                                    {/* <p className="plan_author">NGN 120,000.00</p>
                                    <div className="inline_list">
                                        <p className="unimportant">Zumba Toning</p>
                                        <ul>
                                            <li>&bull; Medium Intensity</li>
                                            <li>&bull; Great Music, Good Workout, Great Energy, Awesome Movies</li>
                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                            <div className="training_side_cover">
                                <div>
                                    <img src={Cart} alt="Cart" />
                                </div>
                                <div>
                                    <Link to="/zoom">DETAILS</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="instructor mt-5">
                {/* <div className="container"> */}
                <div className="instructor_cover">
                    <div className="grid_2">
                        <div>
                            <h1>Become a Dance Instructor</h1>
                            <p>
                                Dance your dreams into reality this summer and
                                take 60% off your Basic Zumba® Instructor Training
                                with code B1ZUMBA60! Limited time offer.
                            </p>
                            <button className="btn_red">Learn More</button>
                        </div>
                        <div className="">
                            <img src={Dance} alt="dance" />
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>
            <Footer />
        </div>
    )
}

export default Trainings;