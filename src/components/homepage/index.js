import "./homepage.css";

import React from "react";

import Footer from "../../utils/footer";

import Dance from "../../assets/images/homepage/dance.png";

import _1 from "../../assets/images/homepage/flash.jpeg";
import _2 from "../../assets/images/homepage/zoom.jpg";
import _3 from "../../assets/images/homepage/physical.jpeg";
import _4 from "../../assets/images/homepage/annual.jpeg";

import Link1 from "../../assets/images/homepage/link1.jpeg";
import Link2 from "../../assets/images/homepage/link2.jpeg";
import Link3 from "../../assets/images/homepage/link3.jpeg";


const Homepage = () => {
    return (
        <div>
            <div className="hero_sect">
                <div className="hero_sect_text">
                    <h1>The Floor is Ours</h1>
                    {/* <p>Nothing beats dancing with your own personal hype squad</p> */}
                    <button className="btn_red">Find a Plan for you</button>
                </div>
            </div>
            <div className="props pt-5">
                <div className="container">
                    <div className="props_cover">
                        <h3>Professional Dance Trainings</h3>
                        <p>Easy to follow. Hard to stop! Get ready for your workout with
                            our DanceRapy fitness series. See our dance plans below.</p>
                        <div className="grid_4">
                            <div>
                                <img src={_1} alt="_1" />
                            </div>
                            <div>
                                <img src={_2} alt="_1" />
                            </div>
                            <div>
                                <img src={_3} alt="_1" />
                            </div>
                            <div>
                                <img src={_4} alt="_1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="instructor mt-5">
                <div className="container">
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
                </div>
            </div>
            <div className="site_links mt-5">
                <div className="container">
                    <div className="grid_4">
                        <div>
                            <img src={Link1} alt="_3" />
                            <div>
                                <h4>Virtual Classes</h4>
                                <p>Access group fitness classes from instructors around the world.</p>
                            </div>
                        </div>
                        <div>
                            <img src={Link2} alt="_2" />
                            <div>
                                <h4>Virtual Classes</h4>
                                <p>Access group fitness classes from instructors around the world.</p>
                            </div>
                        </div>
                        <div>
                            <img src={Link3} alt="_2" />
                            <div>
                                <h4>Virtual Classes</h4>
                                <p>Access group fitness classes from instructors around the world.</p>
                            </div>
                        </div>
                        <div>
                            <img src={Link1} alt="_2" />
                            <div>
                                <h4>Virtual Classes</h4>
                                <p>Access group fitness classes from instructors around the world.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer margin={true} />
        </div>
    )
}

export default Homepage;