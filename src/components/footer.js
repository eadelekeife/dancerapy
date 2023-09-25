import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Input } from 'antd';
import { Controller, useForm } from "react-hook-form";

import AppRoute from '../utils/routes';

const Footer = props => {
    const { handleSubmit, control } = useForm({});
    const [currentNav, setCurrentNav] = useState(0);
    return (
        <div className={`footer footer-sec ${props.noMargin ? 'no-margin' : ''}`}>
            <div className="contain">
                <div className="footer-grid">
                    <div className="biased_grid_4">
                        <div className="grid-2">
                            <div className="compartment">
                                <div
                                    className="footer-grid-title"
                                    onClick={() => setCurrentNav(1)}>
                                    <h5>About Us</h5>
                                    <ion-icon class="mobile" name="add-outline"></ion-icon>
                                </div>
                                <ul className={`${currentNav === 1 ? 'show-on-mobile' : 'hide-on-mobile'}`}>
                                    <li>
                                        <Link to={AppRoute.about_us}>About Dancerapy</Link>
                                    </li>
                                    <li>
                                        <Link to={AppRoute.our_team}>Our Team</Link>
                                    </li>
                                    <li>
                                        <Link to={AppRoute.merch}>Merchandise</Link>
                                    </li>
                                    <li>
                                        <Link to={AppRoute.sign_up}>Create a free account</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="compartment">
                                <div
                                    className="footer-grid-title"
                                    onClick={() => setCurrentNav(2)}>
                                    <h5>Support</h5>
                                    <ion-icon class="mobile" name="add-outline"></ion-icon>
                                </div>
                                <ul className={`${currentNav === 2 ? 'show-on-mobile' : 'hide-on-mobile'}`}>
                                    <li>
                                        <Link to="#">FAQs</Link>
                                    </li>
                                    <li>
                                        <Link to={AppRoute.contact_us}>Contact Us</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Become an Instructor</Link>
                                    </li>
                                    <li>
                                        <Link to={AppRoute.profileMerchandise}>Track your Order</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="compartment">
                            <div
                                className="footer-grid-title"
                                onClick={() => setCurrentNav(3)}>
                                <h5>Classes</h5>
                                <ion-icon class="mobile" name="add-outline"></ion-icon>
                            </div>
                            <ul className={`${currentNav === 3 ? 'show-on-mobile' : 'hide-on-mobile'}`}>
                                <li>
                                    <Link to={AppRoute.physical_plans}>Physical Classes</Link>
                                </li>
                                {/* <li>
                                <Link to={AppRoute.virtual}>Virtual Classes</Link>
                            </li> */}
                                <li>
                                    <Link to="#">DanceRapy Products and Services</Link>
                                </li>
                                <li>
                                    <Link to="#">Dancerapy corporate events/schools</Link>
                                </li>
                                <li>
                                    <Link to="#">Dancerapy and Corporates</Link>
                                </li>
                                {/* <li>
                                <Link to={AppRoute.ourteam}>Our Team</Link>
                            </li>
                            <li>
                                <Link to={AppRoute.trainings}>Dancerapy corporate events/schools</Link>
                            </li> */}
                            </ul>
                        </div>
                        <div className="compartment last">
                            <div
                                className="footer-grid-title"
                                onClick={() => setCurrentNav(4)}>
                                <h5>Reach out to us</h5>
                                <ion-icon class="mobile" name="add-outline"></ion-icon>
                            </div>
                            <div
                                className={`${currentNav === 4 ? 'show-on-mobile' : 'hide-on-mobile'}`}
                            >

                                <div>
                                    <ion-icon name="logo-facebook"></ion-icon>
                                    <ion-icon name="logo-twitter"></ion-icon>
                                    <ion-icon name="logo-instagram"></ion-icon>
                                    <ion-icon name="logo-youtube"></ion-icon>
                                </div>
                                <div>
                                    <a href="+2348169511139">+234 816 951 1139</a>
                                    <a href="+2348023414932"> | +234 802 341 4932</a>
                                </div>
                                <a href="">info@dancerapy.com</a>
                                {/* <a href="+2348033511964"> | +234 803 351 1964</a> */}
                                <div>
                                    <p>Head Office &mdash; The Dance Place <br />
                                        Behind Conoil filling Station, Eric Moore Rd, Surulere</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="sec_footer">
                    <div className="contain">
                        <div className="grid-flex">
                            <div className="sec_footer_block">
                                <form>
                                    <div>
                                        <Controller name="email" defaultValue="" control={control}
                                            render={({ field }) => (
                                                <Input {...field} />
                                            )}
                                        />
                                        {/* <div className="mobile-only"> */}
                                        <button className="btn-danger">Subscribe</button>
                                        {/* </div> */}
                                        {/* <div className="desktop-only">
                                        <button>Subscribe to our mailing list</button>
                                    </div> */}
                                    </div>
                                </form>
                            </div>
                            <div className="sec_footer_block">
                                <div>
                                    <p>© 2022 Dancerapy</p>
                                    <ul>
                                        <li>
                                            <Link to="">&mdash; Terms</Link>
                                        </li>
                                        <li>
                                            <Link to="">&mdash; Accessibility</Link>
                                        </li>
                                        <li>
                                            <Link to="">&mdash; Site map</Link>
                                        </li>
                                        <li>
                                            <Link to="">&mdash; Privacy</Link>
                                        </li>
                                        <li>
                                            <Link to="">&mdash; Do not sell my personal information</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;