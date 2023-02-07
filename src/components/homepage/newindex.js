import "./homepage.css";

import React from "react";

import { Rate } from "antd";

import AboutImage from "../../assets/images/homepage/about.webp";
import John from "../../assets/images/homepage/john.webp";
import { ReactComponent as About } from "../../assets/images/mini.svg";
import { ReactComponent as ArrowSvg } from '../../assets/images/arrow.svg';
import { ReactComponent as ImageBlock1 } from '../../assets/images/homepage/imageblock1.svg';

import Nav from "../../utils/nav";
import Footer from "../../utils/footer";

import { Link } from "react-router-dom";
import AppRoute from "../../utils/routes";
import ReactPlayer from 'react-player';

import Block1 from '../../assets/images/homepage/header.jpg';
import Block2 from '../../assets/images/homepage/header1.jpg';
import Block3 from '../../assets/images/homepage/header2.jpg';

import _1 from '../../assets/images/companies/access.webp';
import _2 from '../../assets/images/companies/shell.png';
import _3 from '../../assets/images/companies/terra.png';
import _4 from '../../assets/images/companies/corona.png';
import _6 from '../../assets/images/companies/dansol.png';
import _7 from '../../assets/images/companies/gtco.png';
import _8 from '../../assets/images/companies/mtn.png';

const AboutUs = () => {
    return (
        <div className="new-homepage about_us">
            <Nav />
            <div className="homepage-hero">
                <video src="https://lagostheatrevideos.s3.amazonaws.com/intro.mp4"
                    playsInline={true} style={{ background: 'black' }}
                    alt="Introduction Video" className="about_video" controls={true} loop />
                <div className="black-bg">

                </div>
            </div>
            <div className="pt-5">

            </div>
            <div className="contain">
                <div className="grid_3">
                    <div className="grid-block-cover">
                        <img src={Block1} alt="Block1" />
                        <div className="block-text">
                            <h2>Our Story</h2>
                        </div>
                    </div>
                    <div className="grid-block-cover">
                        <img src={Block2} alt="Block1" />
                        <div className="block-text">
                            <h2>Our Story</h2>
                        </div>
                    </div>
                    <div className="grid-block-cover">
                        <img src={Block3} alt="Block1" />
                        <div className="block-text">
                            <h2>Our Story</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-5">

            </div>
            <Footer />
        </div>
    )
}

export default AboutUs;