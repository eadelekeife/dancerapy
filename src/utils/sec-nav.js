import "./utils.css";

import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import AppRoute from "./routes";

import Logo from "../assets/images/logo.jpg";
import Menu from "../assets/images/menu.svg";
import Cart from "../assets/images/cart.svg";

const Nav = props => {
    const [fixedNav, setFixed] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const offset = window.scrollY;
            if (offset > 200) {
                setFixed(true);
            }
            else {
                setFixed(false);
            }
        })
    }, [])
    const showCartDrawer = () => {
        setOpen(true);
        // fetchCart();
    }
    const showDrawer = () => {
        setOpenDrawer(true);
    };
    const closeDrawer = () => {
        setOpenDrawer(false);
    };
    return (
        <div>
            <div className="sec_navigation">
                <p>Become an Instructor</p>
                <div className="">
                    <ul>
                        <li>
                            <Link to={AppRoute.signin}>Sign In</Link>
                        </li>
                        <li>
                            <Link to={AppRoute.signup}>Sign Up</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`navigation sec ${props.border ? "border" : ''} ${fixedNav ? 'fixed' : ''}`}>
                <div className="inner-nav">
                    <img src={Logo} alt="logo" className="logo" />
                    <ul className="desktop-only">
                        <li>
                            <Link to={AppRoute.instructor}>About Us</Link>
                        </li>
                        <li>
                            <Link to={AppRoute.team}>Our Team</Link>
                        </li>
                        <li>
                            <Link to={AppRoute.signup}>Trainings</Link>
                        </li>
                    </ul>
                </div>
                <div className="desktop-only">
                    <ul>
                        {/* <li>
                            <Link to={AppRoute.trainings}>Trainings</Link>
                        </li> */}
                        <li>
                            <Link to={AppRoute.merch}>Merchandise</Link>
                        </li>
                        <li>
                            <Link to={AppRoute.instructor}>Become a Dance Instructor</Link>
                        </li>
                        <li>
                            <Link to={AppRoute.contact}>Contact Us</Link>
                        </li>
                        <li className="style-me">
                            <Link to={AppRoute.signup}>Create a free Account</Link>
                        </li>
                    </ul>
                </div>
                <div className="mobile-only">
                    <img onClick={showCartDrawer} src={Cart} alt="menu" />
                    <img onClick={showDrawer} src={Menu} alt="menu" />
                </div>
            </div>
        </div>
    )
}

export default Nav;