import "./home.css";

import React from "react";

import Footer from "../../utils/footer";

import StudioImage from "../../assets/images/homepage/ruby2.jpg";
import StudioImage2 from "../../assets/images/homepage/ruby3.jpg";
// import StudioImage from "../../assets/images/homepage/ruby1.jpg";

const Homepage = () => {
    return (
        <div className="homepage">
            <div className="homepage-header">
                <div>
                    <h2>Bring us your toughest challenges.</h2>
                    {/* <p>We are an essential partnership link between produce growers and commercial purchasers
                        from coast to coast. So bring it on. We are an essential partnership link between
                        produce growers.</p> */}
                    <button>View Instructor Plans</button>
                </div>
            </div>
            <div className="dance-props">
                <div className="grid_2">
                    <div className="text-block">
                        <div className="contain">
                            <p className="new-greeting">OUR COMPANY</p>
                            <h2>Bring us your toughest challenges.</h2>
                            <p>We are an essential partnership link between produce growers and commercial purchasers
                                from coast to coast. So bring it on. We are an essential partnership link between
                                produce growers.</p>
                            <button>View Instructor Plans</button>
                        </div>
                    </div>
                    <div>
                        <img src={StudioImage} alt="people dancing" />
                    </div>
                </div>
            </div>
            <div className="bg-display">
                <div>
                    <h3>Our Produce</h3>
                    <p>We are an essential partnership link between produce growers and commercial purchasers
                        from coast to coast. So bring it on.</p>
                    <button>View Instructor Plans</button>
                </div>
            </div>
            <div className="dance-props inverse">
                <div className="grid_2">
                    <div className="text-block">
                        <div className="contain">
                            <p className="new-greeting">OUR COMPANY</p>
                            <h2>Bring us your toughest challenges.</h2>
                            <p>We are an essential partnership link between produce growers and commercial purchasers
                                from coast to coast. So bring it on. We are an essential partnership link between
                                produce growers and commercial purchasers from coast to coast. So bring it on.</p>
                            <button>View Instructor Plans</button>
                        </div>
                    </div>
                    <div>
                        <img src={StudioImage2} alt="people dancing" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Homepage;