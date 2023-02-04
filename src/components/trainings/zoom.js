import "./trainings.css";
import React, { useState } from 'react';

import { Rate, Avatar, Image } from 'antd';

import Footer from '../../utils/footer';

import { Modal } from "antd";

import Cart from '../../assets/images/cart.svg';
import _1 from '../../assets/images/companies/box-dark.svg';
import _2 from '../../assets/images/companies/eventbrite-dark.svg';
import _3 from '../../assets/images/companies/nasdaq-dark.svg';
import _4 from '../../assets/images/companies/netapp-dark.svg';
import _5 from '../../assets/images/companies/volkswagen-dark.svg';

import Video1 from "../../assets/video1.mp4";

import _10 from "../../assets/images/team/_10.jpg";
// import courseSnap from '../../assets/images/real/course_snap.jpg';
import courseSnap from '../../assets/images/homepage/course.jpg';

const Plan = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="plans_page">
            <div>
                <div className="">
                    <div>
                        <div className="course_summary">
                            <div className="contain">
                                <div className="grid_2_bias">
                                    <div>
                                        <h2 className="course_title">DanceRapy Annual Subscription Online</h2>
                                        <p className="course_desc">Join The Dancerapy Club Today and have access to over 30 Dance Fitness Videos,
                                            Dance Choreophgries, Dance Trends and lots more monthly.
                                            For ONLY #10 thousand naira per Year.</p>
                                        <div className="course_prop">
                                            <ul>
                                                <li><ion-icon name="calendar-outline"></ion-icon> Last updated: 08/08/2022</li>
                                                <li><ion-icon name="language-outline"></ion-icon> English</li>
                                                <li><ion-icon name="videocam-outline"></ion-icon> 80+ videos</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="course_summary_div">
                                        {/* <img src={courseSnap} alt="courseSnap" /> */}
                                        <div className="video_cover">
                                            <video src={Video1} />
                                        </div>
                                        <div 
                                        onClick={() => setIsModalOpen(true)}
                                        className="absolute_course_div">
                                            <ion-icon name="play-circle-outline"></ion-icon>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contain mt-5">
                        <div className="grid_2_bias">
                            <div className="first_sect">
                                <div className="plan_story_border">
                                    <h5 className="margin">What you will get</h5>
                                    <ul className="props">
                                        <li><ion-icon name="checkmark-circle-outline"></ion-icon> Write simple and complex
                                            proto files</li>
                                        <li><ion-icon name="checkmark-circle-outline"></ion-icon> Write simple and complex
                                            proto files</li>
                                        <li><ion-icon name="checkmark-circle-outline"></ion-icon> Write simple and complex
                                            proto files</li>
                                        <li><ion-icon name="checkmark-circle-outline"></ion-icon> Write simple and complex
                                            proto files</li>
                                        <li><ion-icon name="checkmark-circle-outline"></ion-icon> Write simple and complex
                                            proto files</li>
                                        <li><ion-icon name="checkmark-circle-outline"></ion-icon> Write simple and complex
                                            proto files</li>
                                        <li><ion-icon name="checkmark-circle-outline"></ion-icon> Write simple and complex
                                            proto files</li>
                                        <li><ion-icon name="checkmark-circle-outline"></ion-icon> Write simple and complex
                                            proto files</li>
                                    </ul>
                                </div>
                                <div className="plan_story_border">
                                    <h5>Why Join Us</h5>
                                    {/* <p>
                                        Zailoon is a fully-responsive website template to build your upcoming Saloon & Spa
                                        website. Zailoon is a responsive modern Webflow template for Saloon & Spa websites
                                        with all essential CMS & Ecommerce features. Protocol Buffers (protobuf) is a
                                        fundamental data serialization format that every
                                        Data Engineer should know about. It is leveraged by many top tech companies such as
                                        Google and enables micro-services to transfer data in a format that is safe and
                                        efficient.
                                    </p> */}
                                    <p>
                                        Dancerapy is a fitness and lifestyle brand invested in reintroducing dance as a
                                        choice therapy for healthy living. As a movement, Dancerapy personalizes the
                                        idea of dance as a culture towards achieving wholeness in health and fitness. Our
                                        mission is to ensure that people have access to DANCERAPY worldwide
                                        through our S.T.U.N.D (Studio Next Door Program)
                                    </p>
                                </div>
                                <div className="plan_story_border">
                                    <div className="avatar">
                                        <Avatar
                                            size={74}
                                            src={
                                                <Image
                                                    src={_10}
                                                    style={{
                                                        // width: 50,
                                                    }}
                                                />
                                            }
                                        />
                                        <div>
                                            <Rate allowHalf defaultValue={5} />
                                            <h5>Adeleke Ifeoluwase</h5>
                                            <p>Thurs 08 May, 2022</p>
                                        </div>
                                    </div>
                                    <p>
                                        The course everything the essentials and the basics of protocol buffers 3 or protobuf
                                        to be short. Stephane is a good tutor with concise videos and clear explanations. My
                                        4th course with Stephane and looking forward to the gRPC golang course.
                                    </p>
                                </div>
                                <div className="plan_story_border" style={{ marginBottom: 0 }}>
                                    <h5>Companies our Instructors have taught at</h5>
                                    <p>This course was selected for our collection of top-rated courses
                                        trusted by businesses worldwide. Learn more</p>
                                    <div className="companies">
                                        <ul>
                                            <li><img src={_1} alt="" /></li>
                                            <li><img src={_2} alt="" /></li>
                                            <li><img src={_3} alt="" /></li>
                                            <li><img src={_4} alt="" /></li>
                                            <li><img src={_5} alt="" /></li>
                                            <li><img src={_1} alt="" /></li>
                                            <li><img src={_2} alt="" /></li>
                                            <li><img src={_3} alt="" /></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="first_list">
                                <div className="grid_buttons">
                                    <button className="btn_green">Buy this Plan</button>
                                    {/* <button className="btn_border"><img src={Cart} alt="cart" /></button> */}
                                </div>
                                <h5 className="margin">This course includes:</h5>
                                <ul className="props">
                                    <li><ion-icon name="videocam-outline"></ion-icon> 80+ videos</li>
                                    <li><ion-icon name="phone-portrait-outline"></ion-icon> 18 articles</li>
                                    <li><ion-icon name="megaphone-outline"></ion-icon> Full lifetime access</li>
                                    <li><ion-icon name="accessibility-outline"></ion-icon> Access on mobile</li>
                                    <li><ion-icon name="archive-outline"></ion-icon> Certificate</li>
                                    <li><ion-icon name="megaphone-outline"></ion-icon> Full lifetime access</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal title="" open={isModalOpen}
                 onOk={handleOk} onCancel={handleCancel} footer={null}>
                    <video src={Video1} />
                </Modal>
            </div>
            <Footer margin={true} />
        </div>
    )
}

export default Plan;