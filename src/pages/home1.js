import React from "react";
import { Link } from "react-router-dom";

import Image1 from "../assets/images/homepage/meal1.jpg";
import Image2 from "../assets/images/homepage/meal2.jpg";
import Image3 from "../assets/images/homepage/prod.webp";
import Footer from "../components/footer";
import Nav from "../components/nav";

const Homepage = () => {
    return (
        <div className="new-homepage">
            <Nav />
            <div className="home-sect">
                <h1>Your home base for home financing.</h1>
                <p>Competitive mortgage options from a marketplace that’s on your side. Expert guidance and a seamless
                    experience along the way. Limitless, hassle-free home financing.</p>
                <Link to="">GET STARTED</Link>
            </div>
            <div className="new-homepage-dance-props">
                <div className="container">
                    <div className="grid-2">
                        <div>
                            <p className="page-summary">THE MORTY DIFFERENCE</p>
                            <h3>Our technology powers a marketplace like no other</h3>
                            <p>Whether you're looking to buy a home, exploring your options or planning for the
                                future, we have solutions that can work for you. Competitive mortgage options from a
                                marketplace that’s on your side. Expert guidance and a seamless experience along the way</p>
                            <button>Create an Account</button>
                        </div>
                        <div>
                            <img src={Image3} alt="" />
                            {/* <div className="grid-2">
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
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="new-homepage-dance-props meal-props">
                <div className="container">
                    <div className="grid-2">
                        <div>
                            <div className="grid-2">
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
                            </div>
                        </div>
                        <div>
                            <p>THE MORTY DIFFERENCE</p>
                            <h3>Our technology powers a marketplace like no other</h3>
                            <p>Whether you're looking to buy a home, exploring your options or planning for the
                                future, we have solutions that can work for you. Competitive mortgage options from a
                                marketplace that’s on your side.</p>
                            <button>Create an Account</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="new-homepage-dance-props dance-story">
                <div className="container">
                    <div className="grid-2">
                        <div>
                            <p>THE MORTY DIFFERENCE</p>
                            <h3>Our technology powers a marketplace like no other</h3>
                            <p>Whether you're looking to buy a home, exploring your options or planning for the
                                future, we have solutions that can work for you. Competitive mortgage options from a
                                marketplace that’s on your side.</p>
                            <button>Create an Account</button>
                        </div>
                        <div>
                            <div className="grid-2">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Homepage;