import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { Avatar, Badge, Divider, Drawer, notification, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Logo from "../../assets/images/logo.jpg";
import { ReactComponent as Cart } from "../../assets/images/cart.svg";
import { ReactComponent as Menu } from "../../assets/images/menu.svg";
import AllAppRoutes from "../../utils/routes";
import ArrowLeftWhite from "../../assets/images/arrow-left-white.svg";
import CancelWhite from "../../assets/images/x-white.svg";
import { _complete_cart_purchase, _delete_video_from_cart, _fetch_videos_from_cart } from "../../utils/axiosroutes";


const TopNav = props => {

    const Navigate = useNavigate();

    const [fixedNav, setFixed] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [showUserProfileNav, setShowUserProfileNav] = useState(false);
    const [cartData, setCartData] = useState([]);
    const [openCartModal, setOpenCartModal] = useState(false);
    const [loadingSpinner, setLoadingSpinner] = useState(false);
    // const antIcon = <Load
    const antIcon = (<LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />);


    const fetchUserCartVideos = async () => {
        try {
            let videoCart = await _fetch_videos_from_cart();
            if (videoCart.data.statusMessage === "success") {
                localStorage.setItem('cartQuantity', videoCart.data.message.length);
                setCartData(videoCart.data.message);
            } else {
                openNotificationWithIcon('error', videoCart.data.summary);
            }
        } catch (err) {
            openNotificationWithIcon('error', 'An error occurred while fetching cart data. Please reload page to try again.');
        }
    }
    const deleteUserCartVideo = async e => {
        try {
            let videoCart = await _delete_video_from_cart({ videoId: e });
            if (videoCart.data.statusMessage === "success") {
                localStorage.setItem('cartQuantity', videoCart.data.message.length);
                setCartData(videoCart.data.message);
                openNotificationWithIcon('success', 'Video deleted from cart successfully');
            } else {
                openNotificationWithIcon('error', videoCart.data.summary);
            }
        } catch (err) {
            console.log(err)
            openNotificationWithIcon('error', 'An error occurred while fetching cart data. Please reload page to try again.');
        }
    }
    const finalizeCartPurchase = async () => {
        setLoadingSpinner(true);
        try {
            let cartObject = {
                couponDiscount: 0,
                videoCartIds: cartData
            }
            let videoCart = await _complete_cart_purchase(cartObject);
            if (videoCart.data.statusMessage === "success") {
                Navigate(AllAppRoutes.profileVideoPurchaseSuccess)
            } else {
                setLoadingSpinner(false);
                openNotificationWithIcon('error', videoCart.data.summary);
            }
        } catch (err) {
            console.log(err)
            setLoadingSpinner(false);
            openNotificationWithIcon('error', 'An error occurred while fetching cart data. Please reload page to try again.');
        }
    }

    useEffect(() => {
        fetchUserCartVideos();
        window.addEventListener('scroll', () => {
            const offset = window.scrollY;
            if (offset > 200) {
                setFixed(true);
            }
            else {
                setFixed(false);
            }
        })
    }, []);
    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };
    const showDrawer = () => {
        setOpenDrawer(true);
    };
    const closeDrawer = () => {
        setOpenDrawer(false);
    };

    return (
        <div
            className={`navigation ${fixedNav ? 'fixed' : ''} top-nav`}>
            <div className="top-nav-navigation">
                <div className="inner-nav">
                    <div className="logo">
                        <Link to="/">
                            <img src={Logo} alt="dancerapy logo" />
                        </Link>
                    </div>
                    <ul className="desktop-only">
                        <li>
                            <Link to="">Become a Dancerapy Instructor</Link>
                        </li>
                        <li>
                            <Link to="">Contact Us</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    {/* <h3>{props.pageTitle}</h3> */}
                </div>
                <div className="inner-nav desktop-only">
                    <Badge count={localStorage.getItem('cartQuantity')}
                        onClick={() => setOpenCartModal(true)}>
                        <Cart />
                    </Badge>
                    <div className="avatar-cover">
                        <div className="avatar">

                        </div>
                        <h3>Hi Ifeoluwase Adeleke,</h3>
                    </div>
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
                                    to={AllAppRoutes.trainings}>
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
                                    to={AllAppRoutes.contact}>
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
                                                to={AllAppRoutes.signin}>
                                                <span>Login to your Account</span>
                                                <ion-icon name="arrow-forward-outline"></ion-icon>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                onClick={() => setOpenDrawer(false)}
                                                to={AllAppRoutes.signup}>
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
            <Drawer className="nav-drawer" title={null} placement="right" onClose={() => setOpenCartModal(false)}
                open={openCartModal}>
                <div>
                    <div className="drawer-nav-block">
                        <div>
                        </div>
                        <img onClick={closeDrawer} src={CancelWhite} alt="Cancel" />
                    </div>
                    <div>
                        <div className="cart-drawer-padding">
                            {
                                cartData.map((videos, index) => {
                                    return (
                                        <div key={index}>
                                            <div>
                                                {index != 0 ? <Divider /> : ''}
                                                <div className="video-cart-group">
                                                    <img src={videos?.video?.poster} alt={videos?.video?.title} />
                                                    <div>
                                                        <h4>{videos?.video?.title}</h4>
                                                        <p><span className="currency">NGN</span>{videos?.video?.amount}</p>
                                                    </div>
                                                    <div>
                                                        <button
                                                            onClick={() => deleteUserCartVideo(videos._id)}
                                                            className="btn-red">Remove</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="bottom-drawer-buttons">
                        <Divider />
                        <div>
                            <button className="btn-red">Buy by Tokens</button>
                            {
                                loadingSpinner ?
                                    <button disabled
                                        className="btn-red"><Spin indicator={antIcon} /></button>
                                    :
                                    <button
                                        onClick={finalizeCartPurchase}
                                        className="btn-red">Buy by Wallet Balance</button>
                            }
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

const mapStateToProps = store => (
    { auth: store.auth }
)

export default connect(mapStateToProps)(TopNav);