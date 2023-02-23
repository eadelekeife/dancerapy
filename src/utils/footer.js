import "./utils.css";

import React from 'react';
import { Link } from 'react-router-dom';

import { Input } from 'antd';
import { Controller, useForm } from "react-hook-form";

import AppRoute from './routes';

const Footer = props => {
    const { handleSubmit, control } = useForm({});
    return (
        <div className={`footer ${props.margin ? 'margin' : ''}`}>
            <div className="contain">
                <div className="footer-grid">
                    <div className="biased_grid_4">
                        <div>
                            <h5>About Us</h5>
                            <ul className="hide-on-mobile">
                                <li>
                                    <Link to={AppRoute.about}>About DanceRapy</Link>
                                </li>
                                <li>
                                    <Link to={AppRoute.team}>Our Team</Link>
                                </li>
                                <li>
                                    <Link to={AppRoute.merch}>Merchandise</Link>
                                </li>
                                <li>
                                    <Link to={AppRoute.signup}>Create a free account</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h5>Support</h5>
                            <ul className="hide-on-mobile">
                                <li>
                                    <Link to={AppRoute.faqs}>FAQs</Link>
                                </li>
                                <li>
                                    <Link to={AppRoute.contact}>Contact Us</Link>
                                </li>
                                <li>
                                    <Link to={AppRoute.instructor}>Become an Instructor</Link>
                                </li>
                                <li>
                                    <Link to={AppRoute.profileMerchandise}>Track your Order</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h5>Classes</h5>
                            <ul className="hide-on-mobile">
                                <li>
                                    <Link to={AppRoute.trainings}>Physical Classes</Link>
                                </li>
                                {/* <li>
                                <Link to={AppRoute.virtual}>Virtual Classes</Link>
                            </li> */}
                                <li>
                                    <Link to={AppRoute.products}>DanceRapy Products and Services</Link>
                                </li>
                                <li>
                                    <Link to={AppRoute.schools}>Dancerapy corporate events/schools</Link>
                                </li>
                                <li>
                                    <Link to={AppRoute.corporate}>Dancerapy and Corporates</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h5>Reach out to us</h5>
                            <React.Fragment className="hide-on-mobile">
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
                            </React.Fragment>
                        </div>
                    </div>
                </div>
                <div className="sec_footer">
                    <div className="grid_flex">
                        <div className="sec_footer_block">
                            <form>
                                <div>
                                    <Controller name="email" defaultValue="" control={control}
                                        render={({ field }) => (
                                            <Input {...field} />
                                        )}
                                    />
                                    <button>Subscribe to our mailing list</button>
                                </div>
                            </form>
                        </div>
                        <div className="sec_footer_block">
                            <div>
                                <p>© 2022 Lagos Theatre Igando</p>
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
    )
}

export default Footer;