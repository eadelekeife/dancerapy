import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Drawer, Skeleton, Divider, notification, Select, Spin } from 'antd';
import AllAppRoutes from "../utils/routes";

import Logo from "../assets/images/logo.jpg";
import ArrowLeftWhite from "../assets/images/arrow-left-white.svg";
import { ReactComponent as Menu } from "../assets/images/menu.svg";
import { ReactComponent as Cart } from "../assets/images/cart.svg";
import Cancel from "../assets/images/x.svg";
import CancelWhite from "../assets/images/x-white.svg";

const Nav = props => {
    const [fixedNav, setFixed] = useState(false);
    const [open, setOpen] = useState(false);
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
        <div className={`navigation ${fixedNav ? 'fixed' : ''}`}>
            {/* <div className="sec-nav">
                <Link to="/instructors">Become an Instructor</Link>
                <ul>
                    <li>
                        <Link to="">Account</Link>
                    </li>
                    <li>
                        <Link to="">Cart</Link>
                    </li>
                </ul>
            </div> */}
            <div className="nav">
                <div className="inner-nav">
                    <div className="logo">
                        <Link to="/">
                            <img src={Logo} alt="dancerapy logo" />
                        </Link>
                    </div>
                    <ul className="desktop-only">
                        {/* <li>
                            <Link to={AllAppRoutes.about_us}>About Us</Link>
                        </li> */}
                        <li>
                            <Link to={AllAppRoutes.appVideos}>Fitness Videos</Link>
                        </li>
                        <li>
                            <Link to={AllAppRoutes.healthcare}>Health Plans</Link>
                        </li>
                        {/* <li>
                            <Link to={AllAppRoutes.instructors}>Become a Dancerapy Instructor</Link>
                        </li> */}
                        {/* <li>
                            <Link to={AllAppRoutes.contact_us}>Contact</Link>
                        </li> */}
                    </ul>
                </div>
                <div className="desktop-only">
                    <ul>
                        <li>
                            <Link to={AllAppRoutes.contact_us}>Contact Us</Link>
                        </li>
                        <li>
                            <Link to={AllAppRoutes.contact_us}>About</Link>
                        </li>
                        <li>
                            <Link to={AllAppRoutes.help}>Help</Link>
                        </li>
                        {/* <li>
                            <Link to={AllAppRoutes.physical_plans}>Physical Trainings</Link>
                        </li> */}
                        {
                            props.auth.isAuthenticated ?
                                <React.Fragment>
                                    <li className="bg-auth" style={{ textAlign: 'center' }}>
                                        <Link activeClassName="active-nav"
                                            to="/dash" className="bg-auth">
                                            <span className="active-user">
                                                Hi, {props.auth.userDetails.firstName} {props.auth.userDetails.lastName}</span>
                                        </Link>
                                    </li>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <li>
                                        <Link to={AllAppRoutes.sign_in}>Log In</Link>
                                    </li>
                                    <li className="bg-auth">
                                        <Link to={AllAppRoutes.sign_up}>Create Account</Link>
                                    </li>
                                </React.Fragment>
                        }
                    </ul>
                </div>
                <div className="mobile-only">
                    <ul>
                        <li>
                            <button className="btn-black">Your Videos</button>
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
                                <Link
                                    onClick={() => setOpenDrawer(false)}
                                    to="/">
                                    <span>Home</span>
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            {
                                props.auth.isAuthenticated ?
                                    <li>
                                        <Link
                                            onClick={e => {
                                                e.preventDefault();
                                                setShowUserProfileNav(true)
                                            }}
                                            to={AllAppRoutes.signup}>
                                            <span>Account</span>
                                            <ion-icon class="white" name="chevron-forward-outline"></ion-icon>
                                        </Link>
                                    </li>
                                    : ''
                            }
                            <li>
                                <Link
                                    // onClick={e => { e.preventDefault(); setExtraNavDisplay(1) }}
                                    onClick={() => setOpenDrawer(false)}
                                    to={AllAppRoutes.about_us}>
                                    <span>About Us</span>
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    // onClick={e => { e.preventDefault(); setExtraNavDisplay(2) }}
                                    onClick={() => setOpenDrawer(false)}
                                    to={AllAppRoutes.physical_plans}>
                                    <span>Physical Classes</span>
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    // onClick={e => { e.preventDefault(); setExtraNavDisplay(2) }}
                                    onClick={() => setOpenDrawer(false)}
                                    to={AllAppRoutes.products}>
                                    <span>Dancerapy Products and Services</span>
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    // onClick={e => { e.preventDefault(); setExtraNavDisplay(3) }}
                                    onClick={() => setOpenDrawer(false)}
                                    to={AllAppRoutes.merch}>
                                    <span>Shop Now</span>
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    // onClick={e => { e.preventDefault(); setExtraNavDisplay(4) }}
                                    onClick={() => setOpenDrawer(false)}
                                    to={AllAppRoutes.instructors}>
                                    <span>Become a Dancerapy Instructor</span>
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    onClick={() => setOpenDrawer(false)}
                                    to={AllAppRoutes.schools}>
                                    <span>Events and Schools</span>
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    // onClick={e => { e.preventDefault(); setExtraNavDisplay(4) }}
                                    onClick={() => setOpenDrawer(false)}
                                    to={AllAppRoutes.corporate}>
                                    <span>Dancerapy and Corporates</span>
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    // onClick={e => { e.preventDefault(); setExtraNavDisplay(5) }}
                                    onClick={() => setOpenDrawer(false)}
                                    to={AllAppRoutes.contact_us}>
                                    <span>Contact Us</span>
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            {
                                !props.auth.isAuthenticated ?
                                    <React.Fragment>
                                        <li>
                                            <Link
                                                onClick={() => setOpenDrawer(false)}
                                                to={AllAppRoutes.sign_in}>
                                                <span>Login to your Account</span>
                                                <ion-icon name="arrow-forward-outline"></ion-icon>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                onClick={() => setOpenDrawer(false)}
                                                to={AllAppRoutes.sign_up}>
                                                <span>Sign Up</span>
                                                <ion-icon name="arrow-forward-outline"></ion-icon>
                                            </Link>
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
                            {/* <ion-icon
                                onClick={() => setShowUserProfileNav(false)}
                                class="menu-bar"
                                name="arrow-back-outline"></ion-icon> */}
                        </div>
                        <ul>
                            <li>
                                <Link onClick={() => setOpenDrawer(false)} to={AllAppRoutes.profile} exact
                                >
                                    Profile Overview
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link onClick={() => setOpenDrawer(false)} to={AllAppRoutes.profileVideos}
                                >
                                    Your Videos
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link onClick={() => setOpenDrawer(false)} to={AllAppRoutes.profileVirtualSubscription}
                                >
                                    Past Live Classes
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link onClick={() => setOpenDrawer(false)} to={AllAppRoutes.profilePlanOrders}
                                >
                                    Physical Classes
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link onClick={() => setOpenDrawer(false)} to={AllAppRoutes.profileProductOrders}
                                >
                                    Your Product Orders
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link onClick={() => setOpenDrawer(false)} to={AllAppRoutes.profileMerchandise}
                                >
                                    Merchandise Orders
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link onClick={() => setOpenDrawer(false)} to={AllAppRoutes.contact}
                                >
                                    Contact Us
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link onClick={() => setOpenDrawer(false)} to="/signout">
                                    {/* <span className="lnr lnr-exit"></span> */}
                                    Sign Out</Link>
                            </li>
                        </ul>
                    </div>
                }
            </Drawer>
        </div>
    )
}

const mapStateToProps = store => (
    { auth: store.auth }
)

export default connect(mapStateToProps)(Nav);