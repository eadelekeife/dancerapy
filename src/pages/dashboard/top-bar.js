import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { Avatar, Badge, Divider, Drawer, notification, Spin } from 'antd';
import { ReactComponent as AvatarIcon } from "../../assets/images/icons/Avatar.svg";
import { LoadingOutlined } from '@ant-design/icons';

import Logo from "../../assets/images/logo.jpg";
import { ReactComponent as Cart } from "../../assets/images/icons/shopping-cart.svg";
import { ReactComponent as LogOut } from "../../assets/images/icons/log-out-cropped.svg";
// import { ReactComponent as Cart } from "../../assets/images/cart.svg";
import { ReactComponent as Menu } from "../../assets/images/menu.svg";
import AllAppRoutes from "../../utils/routes";
import ArrowLeftWhite from "../../assets/images/arrow-left.svg";
import CancelWhite from "../../assets/images/x.svg";
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
        setOpenCartModal(false)
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
                </div>
                <div>
                    {/* <h3>{props.pageTitle}</h3> */}
                </div>
                <div className="inner-nav desktop-only">
                    <div>
                        <Link to="/signout">
                            <LogOut className="topnav icon" />
                        </Link>
                    </div>
                    {/* <div>
                        <i class="uil uil-signout"></i>
                    </div> */}
                    <Badge count={localStorage.getItem('cartQuantity')}
                    // onClick={() => setOpenCartModal(true)}
                    >
                        <Cart className="topnav icon" />
                    </Badge>
                    <div className="avatar-cover">
                        <AvatarIcon />
                        <h3>Ifeoluwase Adeleke,</h3>
                    </div>
                </div>

                <div className="mobile-only">
                    <ul>
                        <div>
                            <LogOut className="topnav icon" />
                        </div>
                        <Badge count={localStorage.getItem('cartQuantity')}
                        // onClick={() => setOpenCartModal(true)}
                        >
                            <Cart className="topnav icon" />
                        </Badge>
                        <li>
                            <Menu className="men topnav icon" onClick={showDrawer} />
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
                                    to={AllAppRoutes.appVideos}>
                                    <span>Fitness Videos</span>
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    // onClick={e => { e.preventDefault(); setExtraNavDisplay(2) }}
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
                                    to={AllAppRoutes.merch}>
                                    <span>Dancerapy Merchandise</span>
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
                            <li>
                                <Link
                                    // onClick={e => { e.preventDefault(); setExtraNavDisplay(4) }}
                                    onClick={() => setOpenDrawer(false)}
                                    to="#">
                                    <span>Become a Dancerapy Instructor</span>
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    onClick={() => setOpenDrawer(false)}
                                    to="#">
                                    <span>Events and Schools</span>
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    // onClick={e => { e.preventDefault(); setExtraNavDisplay(4) }}
                                    onClick={() => setOpenDrawer(false)}
                                    to="#">
                                    <span>Dancerapy and Corporates</span>
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
                        </div>
                        <ul>
                            <li>
                                <Link onClick={() => setOpenDrawer(false)} to={AllAppRoutes.profile} exact
                                >
                                    Profile Overview
                                </Link>
                            </li>
                            <li>
                                <Link onClick={() => setOpenDrawer(false)} to={AllAppRoutes.profileSettings}
                                >
                                    Profile Settings
                                </Link>
                            </li>
                            <li>
                                <Link onClick={() => setOpenDrawer(false)} to={AllAppRoutes.profileTransactionHistory}
                                >
                                    Transaction History
                                </Link>
                            </li>
                            <li>
                                <Link onClick={() => setOpenDrawer(false)} to={AllAppRoutes.videoViewsAnalytics}
                                >
                                    Video Views Analytics
                                </Link>
                            </li>
                            <li>
                                <Link onClick={() => setOpenDrawer(false)} to={AllAppRoutes.profileMerchandise}
                                >
                                    Merchandise Orders
                                </Link>
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
                            {/* <button className="btn-red">Buy by Tokens</button> */}
                            {
                                loadingSpinner ?
                                    <button disabled
                                        className="btn-red"><Spin indicator={antIcon} /></button>
                                    :
                                    <button style={{ padding: '14px 25px' }}
                                        onClick={finalizeCartPurchase}
                                        className="btn-red">Buy videos with Wallet Balance</button>
                            }
                        </div>
                    </div>
                </div>
            </Drawer>
        </div >
    )
}

const mapStateToProps = store => (
    { auth: store.auth }
)

export default connect(mapStateToProps)(TopNav);