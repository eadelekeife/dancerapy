import "./mini.css";

import React from "react";
import { Input, Divider, Rate, Collapse } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { Link } from "react-router-dom";

import LocationMap from "../../assets/images/mini/map.jpeg";

import Footer from "../../utils/footer";
import Nav from "../../utils/nav";
import AppRoute from "../../utils/routes";

const FAQs = () => {
    const { Panel } = Collapse;
    return (
        <div className="faqs">
            <Nav />
            <div className="plan_bg">
                <h3>Questions we get asked often</h3>
            </div>
            <div className="mt-5">
                <div className="container">
                    <div className="">
                        <Collapse defaultActiveKey={['1']} ghost expandIconPosition="right">
                            <Panel header="How do I locate you?" key="1">
                                <p>You can find us at any of our 3 centers at the moment in
                                    Lagos. <Link to={AppRoute.trainings}>Click here to find one closest to you</Link></p>
                            </Panel>
                            <Panel header="Can I do weekend classes only (Saturdays)?" key="2">
                                <p>Yes. Saturday only classes can be done.</p>
                            </Panel>
                            <Panel header="What is the difference between in-person, livestream and private classes?" key="3">
                                <p>
                                    In-person classes is the Physical classes joined by other members of Dancerapy. Livestream
                                    is the online class via Zoom. Private classes however is a Dancerapy package that involves You (the
                                    Client) and your Instructor at your preferred location.
                                </p>
                            </Panel>
                            <Panel header="How can I register for Dancerapy online?" key="4">
                                <p>
                                    Kindly reach out to any of the two
                                    numbers <a href="+2348023414932">0802 341 4932</a> or <a href="+2348169511139">0816 951 1139</a>
                                </p>
                            </Panel>
                            <Panel header="How do I become an Instructor?" key="5">
                                <p>
                                    Becoming a Dancerapy Instructor is easy and fun. <Link to={AppRoute.instructor}>Click this link to learn more</Link>
                                </p>
                            </Panel>
                            <Panel header="Is there a Pay-as-you-go plan?" key="6">
                                <p>
                                    Yes there is. It is NGN2,000.00 per session.
                                </p>
                            </Panel>
                            <Panel header="How do I become a member of Dancerapy?" key="7">
                                <p>
                                    <p>
                                        To become a member of Dancerapy nationwide, you can contact us via our Social media platforms or you can
                                        call us on <a href="+2348023414932">0802 341 4932</a> or <a href="+2348169511139">0816 951 1139</a>
                                    </p>
                                </p>
                            </Panel>
                        </Collapse>
                    </div>
                </div>
            </div>
            <Footer margin={true} />
        </div >
    )
}

export default FAQs;