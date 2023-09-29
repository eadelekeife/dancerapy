import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { Drawer, Skeleton, Divider, notification, Select, Spin } from 'antd';
import AllAppRoutes from "../utils/routes";

import Logo from "../assets/images/logo.jpg";
import ArrowLeftWhite from "../assets/images/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../assets/images/arrow-right.svg";
// import { ReactComponent as Menu } from "../assets/images/menu-r.svg";
import { ReactComponent as Menu } from "../assets/images/menu.svg";
import { ReactComponent as AvatarIcon } from "../assets/images/icons/user-cropped.svg";
import { ReactComponent as Cart } from "../assets/images/cart.svg";
import Cancel from "../assets/images/x.svg";
import CancelWhite from "../assets/images/x.svg";

const Nav = props => {
    const [fixedNav, setFixed] = useState(false);
    const [open, setOpen] = useState(false);
    const [openUserCart, setOpenUserCart] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);
    const [spinnerLoading, setSpinnerLoading] = useState(false);
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [cartData, setCartData] = useState([]);
    const [extraNavToShow, setExtraNavToShow] = useState(0);
    const [showUserProfileNav, setShowUserProfileNav] = useState(false);

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

    const showDrawer = () => {
        setOpenDrawer(true);
    };
    const closeDrawer = () => {
        setOpenDrawer(false);
    };

    return (
        <div className={`navigation ${fixedNav ? 'fixed' : ''} ${props.pageFixedNav ? 'fixed' : ''}`}>
            {/* <div className="sec-nav">
                <NavLink className={({ isActive }) => isActive ? 'active-link' : ''} to="/instructors">Become an Instructor<span className="cover-nav-bg"></span></NavLink>
                <ul>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? 'active-link' : ''} to="">Account<span className="cover-nav-bg"></span></NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? 'active-link' : ''} to="">Cart<span className="cover-nav-bg"></span></NavLink>
                    </li>
                </ul>
            </div> */}
            <div className="nav">
                <div className="inner-nav">
                    <div className="logo">
                        <NavLink className={({ isActive }) => isActive ? 'active-link' : ''} to="/">
                            <img src={Logo} alt="dancerapy logo" />
                            <span className="cover-nav-bg"></span></NavLink>
                    </div>
                    <ul className="desktop-only">
                        <li>
                            <NavLink className={({ isActive }) => isActive ? 'active-link' : ''} to={AllAppRoutes.appVideos}><span className="nav-text">Fitness Videos</span><span className="cover-nav-bg"></span></NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => isActive ? 'active-link' : ''} to={AllAppRoutes.about_us}><span className="nav-text">Who We Are</span><span className="cover-nav-bg"></span></NavLink>
                        </li>
                    </ul>
                </div>
                <div className="desktop-only">
                    <ul>
                        <li>
                            <NavLink className={({ isActive }) => isActive ? 'active-link' : ''} to={AllAppRoutes.contact_us}><span className="nav-text">Contact Us</span><span className="cover-nav-bg"></span></NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => isActive ? 'active-link' : ''} to={AllAppRoutes.our_team}><span className="nav-text">Our Team</span><span className="cover-nav-bg"></span></NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => isActive ? 'active-link' : ''} to={AllAppRoutes.merch}><span className="nav-text">Merchandise</span><span className="cover-nav-bg"></span></NavLink>
                        </li>
                        {
                            props.auth.isAuthenticated ?
                                <React.Fragment>
                                    <li className="bg-auth" style={{ textAlign: 'center' }}>
                                        <NavLink className={`({ isActive }) => isActive ? 'active-link' : '' bg-auth`} activeClassName="active-nav"
                                            to="/dash">
                                            <span className="active-user">
                                                Hi, {props.auth.userDetails.firstName} {props.auth.userDetails.lastName}</span></NavLink>
                                    </li>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <li>
                                        <NavLink className={({ isActive }) => isActive ? 'active-link' : ''} to={AllAppRoutes.sign_in}>Log In</NavLink>
                                    </li>
                                    <li className="bg-auth">
                                        <NavLink className={({ isActive }) => isActive ? 'active-link' : ''} to={AllAppRoutes.sign_up}>Create Account</NavLink>
                                    </li>
                                </React.Fragment>
                        }
                    </ul>
                </div>
                <div className="mobile-only">
                    <ul>
                        {/* <li>
                            <button className="btn-black">Your Videos</button>
                        </li> */}
                        <li>
                            <Link to={AllAppRoutes.sign_up}>
                                <AvatarIcon className="menu" />
                            </Link>
                        </li>
                        <li onClick={() => setOpenUserCart()}>
                            <Cart className="menu" />
                        </li>
                        <li>
                            <Menu className="menu" onClick={showDrawer} />
                        </li>
                    </ul>
                </div>
            </div>
            <Drawer
                className="nav-drawer"
                title={null} placement="right" onClose={closeDrawer} open={openDrawer}>
                {!showUserProfileNav ?
                    <div>
                        <div className="drawer-nav-block">
                            <div>
                                {/* <img src={Logo} className="nav-logo" alt="logo" /> */}
                            </div>
                            <img onClick={closeDrawer} src={CancelWhite} alt="Cancel" />
                        </div>
                        <ul>
                            <li>
                                <NavLink
                                    onClick={() => setOpenDrawer(false)}
                                    to="/">
                                    <span>Home</span>
                                </NavLink>
                            </li>
                            {
                                props.auth.isAuthenticated ?
                                    <li>
                                        <NavLink
                                            onClick={e => {
                                                e.preventDefault();
                                                setShowUserProfileNav(true)
                                            }}
                                            to={AllAppRoutes.signup}>
                                            <span>Account</span>
                                            <ArrowRight className="nav-arrow" />
                                        </NavLink>
                                    </li>
                                    : ''
                            }
                            <li>
                                <NavLink
                                    onClick={() => setOpenDrawer(false)}
                                    to={AllAppRoutes.appVideos}>
                                    <span>Videos</span></NavLink>
                            </li>
                            <li>
                                <NavLink
                                    // onClick={e => { e.preventDefault(); setExtraNavDisplay(2) }}
                                    onClick={() => setOpenDrawer(false)}
                                    to={AllAppRoutes.about_us}>
                                    <span>About Us</span>
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}</NavLink>
                            </li>
                            <li>
                                <NavLink
                                    // onClick={e => { e.preventDefault(); setExtraNavDisplay(2) }}
                                    onClick={() => setOpenDrawer(false)}
                                    to={AllAppRoutes.merch}>
                                    <span>Dancerapy Merchandise</span>
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}</NavLink>
                            </li>
                            <li>
                                <NavLink
                                    // onClick={e => { e.preventDefault(); setExtraNavDisplay(5) }}
                                    onClick={() => setOpenDrawer(false)}
                                    to={AllAppRoutes.contact_us}>
                                    <span>Contact Us</span>
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}</NavLink>
                            </li>
                            <li>
                                <NavLink
                                    onClick={() => setOpenDrawer(false)}
                                    to="#">
                                    <span>Become a Dancerapy Instructor</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    onClick={() => setOpenDrawer(false)}
                                    to="#">
                                    <span>Events and Schools</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    onClick={() => setOpenDrawer(false)}
                                    to="#">
                                    <span>Dancerapy and Corporates</span>
                                </NavLink>
                            </li>
                            {
                                !props.auth.isAuthenticated ?
                                    <React.Fragment>
                                        <li>
                                            <NavLink
                                                onClick={() => setOpenDrawer(false)}
                                                to={AllAppRoutes.sign_in}>
                                                <span>Login to your Account</span>
                                                <ion-icon name="arrow-forward-outline"></ion-icon>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                onClick={() => setOpenDrawer(false)}
                                                to={AllAppRoutes.sign_up}>
                                                <span>Sign Up</span>
                                                <ion-icon name="arrow-forward-outline"></ion-icon>
                                            </NavLink>
                                        </li>
                                    </React.Fragment>
                                    : ''
                            }
                        </ul>
                    </div>
                    :
                    <div>
                        <div className="drawer-nav-block">
                            <div>
                                {/* <img src={Logo} className="nav-logo" alt="logo" /> */}
                            </div>
                            <img onClick={() => setShowUserProfileNav(false)} src={ArrowLeftWhite} alt="ArrowLeft" />
                        </div>
                        <ul>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'active-link' : ''} onClick={() => setOpenDrawer(false)} to={AllAppRoutes.profile} exact
                                >
                                    Profile Overview
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'active-link' : ''} onClick={() => setOpenDrawer(false)} to={AllAppRoutes.profileSettings}
                                >
                                    Profile Settings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'active-link' : ''} onClick={() => setOpenDrawer(false)} to={AllAppRoutes.profileTransactionHistory}
                                >
                                    Transaction History
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'active-link' : ''} onClick={() => setOpenDrawer(false)} to={AllAppRoutes.videoViewsAnalytics}
                                >
                                    Video Views Analytics
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'active-link' : ''} onClick={() => setOpenDrawer(false)} to={AllAppRoutes.profileMerchandise}
                                >
                                    Merchandise Orders
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                }
            </Drawer>
            {/* <Drawer
                className="nav-drawer"
                title={null} placement="right" onClose={closeDrawer} open={openDrawer}>
                {!showUserProfileNav ?
                    <div>
                        <div className="drawer-nav-block">
                            <div>
                            </div>
                            <img onClick={closeDrawer} src={CancelWhite} alt="Cancel" />
                        </div>
                    </div>
                }
            </Drawer>
            openUserCart */}
        </div>
    )
}

const mapStateToProps = store => (
    { auth: store.auth }
)

export default connect(mapStateToProps)(Nav);