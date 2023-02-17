import "./utils.css";

import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Drawer, Skeleton, Divider, notification, Select, Spin } from 'antd';
import NumberFormat from 'react-number-format';

import Logo from "../assets/images/logo.jpg";
import { ReactComponent as Menu } from "../assets/images/menu.svg";
import { ReactComponent as Cart } from "../assets/images/cart.svg";
import Cancel from "../assets/images/x.svg";
import CancelWhite from "../assets/images/x-white.svg";
import Call from "../assets/images/call.svg";
import ArrowLeft from "../assets/images/arrow-left.svg";
// import Empty from "../assets/images/auth/empty.svg";
import Empty from '../assets/images/empty_history.svg';

import { Link } from "react-router-dom";
import AppRoute from "./routes";
import axiosCall from "./axiosCall";

const Nav = props => {
    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };

    const { Option } = Select;
    const options = [];
    for (let index = 1; index <= 20; index++) {
        options.push(index);
    };

    const [fixedNav, setFixed] = useState(false);
    const [open, setOpen] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);
    const [spinnerLoading, setSpinnerLoading] = useState(false);
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [cartData, setCartData] = useState([]);
    const [extraNavToShow, setExtraNavToShow] = useState(0);
    const [showUserProfileNav, setShowUserProfileNav] = useState(false);

    const onClose = () => {
        setOpen(false);
    };

    const fetchCart = () => {
        axiosCall.post('/user/cart', {
            cartId: localStorage.getItem('cart-token'),
            userId: props.auth.userDetails.id
        })
            .then(userCart => {
                if (userCart.data.statusMessage === "success") {
                    // setSpinning(false);
                    setCartData(userCart.data.message);
                    setErrorOccurred(false);
                    setFetchingData(false);
                } else {
                    setErrorOccurred(true);
                    setFetchingData(false);
                    openNotificationWithIcon('error', 'An error occurred while fetching products from cart. Please try again');
                }
            })
            .catch(err => {
                setErrorOccurred(true);
                setFetchingData(false);
                openNotificationWithIcon('error', 'An error occurred while fetching products from cart. Please try again');
            })
    }

    const reloadCart = cartData => {
        let cartBox = [];
        cartData.forEach(cart => {
            if (cart.merchandise) {
                cartBox.push(cart);
                // temporaryOrderSize += (+cart.Product.weight * +cart.quantity);
                // let unitPrice = ((konnectPrice * cart.Product.sellerPrice) / 100) + Number(cart.Product.sellerPrice) > Number(cart.Product.marketPrice)
                //     ? cart.Product.marketPrice * parseInt(cart.quantity) :
                //     ((((konnectPrice * cart.Product.sellerPrice) / 100) + Number(cart.Product.sellerPrice)) * parseInt(cart.quantity));

                // temporarySubTotal += unitPrice;
            }
        });
        setCartData(cartBox);
        // setSubTotal(temporarySubTotal);
        // setOrderSize(temporaryOrderSize);
    }

    const updateCartQuantity = (e, id) => {
        setSpinnerLoading(true);
        axiosCall.post(`/user/updatecart`, {
            cartId: id,
            quantity: e,
            productId: id,
            userId: props.auth.userDetails.id,
            cartToken: localStorage.getItem('cart-token')
        })
            .then(data => {
                if (data.data.statusMessage === 'success') {
                    reloadCart(data.data.message);
                    openNotificationWithIcon('success', data.data.summary);
                    setSpinnerLoading(false);
                } else {
                    openNotificationWithIcon('error', 'An error occurred while updating cart. Please try again');
                    setSpinnerLoading(false);
                }
            })
            .catch(err => {
                console.log(err)
                setSpinnerLoading(false);
                openNotificationWithIcon('error', 'An error occurred while updating cart. Please try again');
            })
    }

    const removeProductFromCart = (id) => {
        setSpinnerLoading(true);
        axiosCall.post(`/user/removecart`, {
            productId: id,
            userId: props.auth.userDetails.id,
            cartId: localStorage.getItem('cart-token')
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        )
            .then(data => {
                if (data.data.statusMessage === 'success') {
                    reloadCart(data.data.message);
                    openNotificationWithIcon('success', data.data.summary);
                    setSpinnerLoading(false);
                } else {
                    openNotificationWithIcon('error', 'An error occurred while updating cart. Please try again');
                    setSpinnerLoading(false);
                }
            })
            .catch(err => {
                setSpinnerLoading(false);
                openNotificationWithIcon('error', 'An error occurred while updating cart. Please try again');
            })
    }

    const showCartDrawer = () => {
        setOpen(true);
        fetchCart();
    }

    const showDrawer = () => {
        setOpenDrawer(true);
    };
    const closeDrawer = () => {
        setOpenDrawer(false);
    };

    const setExtraNavDisplay = e => extraNavToShow === e ? setExtraNavToShow(0) : setExtraNavToShow(e);

    let skeleton = [];
    for (let i = 0; i < 6; i++) {
        skeleton.push(<Skeleton active />)
    }
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
    return (
        <div>
            <div className="sec_navigation">
                <p>Become an Instructor</p>
                <div className="">
                    <ul>
                        <li>
                            <Link to={AppRoute.signin}>Account</Link>
                        </li>
                        <li
                            onClick={() => showCartDrawer()}
                        >
                            Cart
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`navigation ${props.border ? "border" : ''} ${fixedNav ? 'fixed' : ''}`}>
                <div className="inner-nav">
                    <Link to="/">
                        <img src={Logo} alt="logo" className="logo" />
                    </Link>
                    <ul className="desktop-only">
                        <li>
                            <Link to={AppRoute.about}>About Us</Link>
                        </li>
                        <li>
                            <Link to={AppRoute.trainings}>Trainings</Link>
                        </li>
                        <li>
                            <Link to={AppRoute.merch}>Merchandise</Link>
                        </li>
                    </ul>
                </div>
                <div className="desktop-only">
                    <ul>
                        <li>
                            <Link to={AppRoute.instructor}>Become a Dance Instructor</Link>
                        </li>
                        <li>
                            <Link to={AppRoute.schools}>Events and Schools</Link>
                        </li>
                        {/* <li>
                            <Link to={AppRoute.contact}>Contact Us</Link>
                        </li> */}
                        {
                            props.auth.isAuthenticated ?
                                <React.Fragment>
                                    <li className="" style={{ textAlign: 'center' }}>
                                        <Link activeClassName="active-nav"
                                            to={AppRoute.profileVideos} className="button_like">
                                            <span className="active-user">
                                                Your Videos</span>
                                        </Link>
                                    </li >
                                    <li className="style-me" style={{ textAlign: 'center' }}>
                                        <Link activeClassName="active-nav"
                                            to={AppRoute.profile} className="button_like">
                                            <span className="active-user">
                                                Hi, {props.auth.userDetails.firstName} {props.auth.userDetails.lastName}</span>
                                        </Link>
                                    </li>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <li>
                                        <Link to={AppRoute.contact}>Contact Us</Link>
                                    </li>
                                    <li className="style-me">
                                        <Link to={AppRoute.signup}>Create a free account</Link>
                                    </li>
                                </React.Fragment>
                        }
                    </ul>
                </div>
                <div className="mobile-only">
                    <ul>
                        <li>
                            <Cart className="cart" onClick={showDrawer} />
                            {/* <img onClick={showCartDrawer} src={Cart} alt="menu" /> */}
                        </li>
                        <li>
                            <Menu className="menu" onClick={showDrawer} />
                            {/* <img onClick={showDrawer} src={Menu} alt="menu" /> */}
                        </li>
                    </ul>
                </div>
            </div>
            <Drawer title={null} placement="right" onClose={onClose} open={open}>
                <Spin spinning={spinnerLoading}>
                    <div>
                        <div className="new-cart-header">
                            <h2>Merchandise Cart</h2>
                            <img onClick={onClose} src={Cancel} alt="Cancel" />
                        </div>
                        <Divider style={{ marginTop: 0 }} />
                        <div className="cart-data">
                            {
                                fetchingData ?
                                    <div>
                                        {skeleton.map((placeHolder, index) => (
                                            <div className="item" key={index}>
                                                {placeHolder}
                                                <Divider />
                                            </div>
                                        ))}
                                    </div>
                                    :
                                    errorOccurred ?
                                        <div className="center_align_message">
                                            <div>
                                                <h3>Oops!</h3>
                                                <p>An error occurred while we were trying to fetch data. Please reload page to
                                                    try again.</p>
                                            </div>
                                        </div>
                                        :
                                        cartData.length ?
                                            <div>
                                                {
                                                    cartData.map((cart, index) => (
                                                        <div key={index}>
                                                            <div className="cart-grid-3">
                                                                <div className="cart-image-cover">
                                                                    <img src={cart.merchandise.image} alt={cart.merchandise.image} />
                                                                </div>
                                                                <div className="">
                                                                    <h3>{cart.merchandise.name}</h3>
                                                                    {
                                                                        +cart.merchandise.discount > 0 ?
                                                                            <div className="merch-price-grid">
                                                                                <p className="merch_price strikethrough"><span>NGN </span>
                                                                                    <NumberFormat className="new_product_amount" value={cart.merchandise.price} displayType={'text'} thousandSeparator={true} />
                                                                                </p>
                                                                                <p className="merch_price"><span>NGN </span>
                                                                                    <NumberFormat className="new_product_amount" value={((cart.merchandise.discount * cart.merchandise.price) / 100)} displayType={'text'} thousandSeparator={true} />
                                                                                </p>
                                                                            </div>
                                                                            :
                                                                            <p className="merch_price"><span>NGN </span>
                                                                                <NumberFormat className="new_product_amount" value={cart.merchandise.price} displayType={'text'} thousandSeparator={true} />
                                                                            </p>
                                                                    }
                                                                </div>
                                                                <div>
                                                                    <Select
                                                                        onChange={e => updateCartQuantity(e, cart.id)}
                                                                        defaultValue={+cart.quantity}>
                                                                        {
                                                                            options.map((option) => (
                                                                                <Option value={+option} key={option}>{option}</Option>
                                                                            ))
                                                                        }
                                                                    </Select>
                                                                </div>
                                                            </div>
                                                            <div className="mt-5"></div>
                                                            <ion-icon
                                                                onClick={() => removeProductFromCart(cart.id)}
                                                                name="trash-outline"></ion-icon>
                                                            <Divider style={{ marginTop: 0 }} />
                                                        </div>
                                                    ))
                                                }
                                                <Link to={AppRoute.checkout} className="btn_red">Go to Checkout</Link>
                                            </div>
                                            :
                                            <div className="empty_div">
                                                <div>
                                                    <img src={Empty} alt="empty" />
                                                    <p>You have not added any merchandise to cart yet</p>
                                                </div>
                                            </div>
                            }
                        </div>
                    </div>
                </Spin>
            </Drawer>
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
                                    onClick={() => setOpen(false)}
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
                                            to={AppRoute.signup}>
                                            <span>Account</span>
                                            <ion-icon name="chevron-forward-outline"></ion-icon>
                                        </Link>
                                    </li>
                                    : ''
                            }
                            <li>
                                <Link
                                    // onClick={e => { e.preventDefault(); setExtraNavDisplay(1) }}
                                    to={AppRoute.about}>
                                    <span>About Us</span>
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    // onClick={e => { e.preventDefault(); setExtraNavDisplay(2) }}
                                    to={AppRoute.trainings}>
                                    <span>Physical Classes</span>
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    // onClick={e => { e.preventDefault(); setExtraNavDisplay(2) }}
                                    to={AppRoute.products}>
                                    <span>Dancerapy Products and Services</span>
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    // onClick={e => { e.preventDefault(); setExtraNavDisplay(3) }}
                                    to={AppRoute.merch}>
                                    <span>Merchandise</span>
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    // onClick={e => { e.preventDefault(); setExtraNavDisplay(4) }}
                                    to={AppRoute.instructor}>
                                    <span>Become a Dancerapy Instructor</span>
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    onClick={() => setOpen(false)}
                                    to={AppRoute.schools}>
                                    <span>Events and Schools</span>
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    // onClick={e => { e.preventDefault(); setExtraNavDisplay(4) }}
                                    to={AppRoute.corporate}>
                                    <span>Dancerapy and Corporates</span>
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    // onClick={e => { e.preventDefault(); setExtraNavDisplay(5) }}
                                    to={AppRoute.contact}>
                                    <span>Contact Us</span>
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            {
                                !props.auth.isAuthenticated ?
                                    <li>
                                        <Link
                                            onClick={() => setOpen(false)}
                                            to={AppRoute.signup}>
                                            <span>Create a free Account</span>
                                            <ion-icon name="arrow-forward-outline"></ion-icon>
                                        </Link>
                                    </li>
                                    : ''
                            }
                        </ul>
                    </div>
                    :
                    <div>
                        <div className="drawer-nav-block">
                            <div>
                                <img src={Logo} className="nav-logo" alt="logo" />
                            </div>
                            <img onClick={() => setShowUserProfileNav(false)} src={ArrowLeft} alt="ArrowLeft" />
                            {/* <ion-icon
                                onClick={() => setShowUserProfileNav(false)}
                                class="menu-bar"
                                name="arrow-back-outline"></ion-icon> */}
                        </div>
                        <ul>
                            <li>
                                <Link to={AppRoute.profile} exact
                                >
                                    Profile Overview
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link to={AppRoute.profileVideos}
                                >
                                    Your Videos
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link to={AppRoute.profileVirtualSubscription}
                                >
                                    Virtual Subscription
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link to={AppRoute.profilePlanOrders}
                                >
                                    Your Plan Orders
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link to={AppRoute.profileProductOrders}
                                >
                                    Your Product Orders
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link to={AppRoute.profileMerchandise}
                                >
                                    Merchandise Orders
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link to={AppRoute.contact}
                                >
                                    Contact Us
                                    {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                                </Link>
                            </li>
                            <li>
                                <Link to="/signout">
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