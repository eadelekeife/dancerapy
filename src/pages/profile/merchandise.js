import "./profile.css";

import React, { useState, useEffect } from "react";

import Nav from "../../components/nav";
import Footer from "../../components/footer";
import { LoadingOutlined } from '@ant-design/icons';
import { Skeleton, Divider, notification, Select, Spin } from 'antd';
import NumberFormat from 'react-number-format';
import { Link } from "react-router-dom";
import axiosCall from '../../utils/axiosCall';

import SideNav from "./side_nav";

import Empty from "../../assets/images/auth/empty.svg";
import _1 from "../../assets/images/content/_1.avif";
import _2 from "../../assets/images/content/_2.avif";
import AppRoute from "../../utils/routes";

const Profile = props => {
    const [loadingData, setLoadingData] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };

    const [allMerchandise, setAllMerchandise] = useState([]);
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);
    const [spinning, setSpinning] = useState(false);

    const axiosErrorResponse = message => {
        setErrorOccurred(true);
        setFetchingData(false);
        openNotificationWithIcon('error', message);
    }

    useEffect(() => {
        axiosCall.get('/all-merchandise')
            .then(products => {
                if (products.data.statusMessage === "success") {
                    setErrorOccurred(false);
                    setFetchingData(false);
                    setAllMerchandise(products.data.message);
                } else {
                    console.log('wetin sup')
                    axiosErrorResponse(products.data.summary)
                }
            })
            .catch(err => {
                console.log(err)
                axiosErrorResponse('An error occurred while fetching product plans. Please reload page to try again');
            })
    }, [])
    const { Option } = Select;
    let skeleton = [];
    for (let i = 0; i < 6; i++) {
        skeleton.push(<Skeleton active />)
    }
    const addMerchToCart = product => {
        setSpinning(true)
        axiosCall.post('/add-merch-to-cart', {
            userId: props.auth.userDetails.id,
            productId: product.id,
            cartId: localStorage.getItem('cart-token')
        })
            .then(cartResponse => {
                if (cartResponse.data.statusMessage === "success") {
                    localStorage.setItem('cart-token', cartResponse.data.message);
                    setSpinning(false);
                    openNotificationWithIcon('success', 'Product added to cart successfully');
                } else {
                    setSpinning(false);
                    openNotificationWithIcon('error', 'An error occurred while adding product to cart. Please try again');
                }
            })
            .catch(err => {
                setSpinning(false);
                openNotificationWithIcon('error', 'An error occurred while adding product to cart. Please try again');
            })
    }

    return (
        <div>
            <Nav />
            <div className="profile_div main_info">
                <div className="profile_to_left">
                    <div className="profile_nav">
                        <SideNav />
                    </div>
                </div>
                <div className="profile_to_right">
                    <div className="contain">
                        <div className="profile-data-display">
                            <h3 className="profile_title">Merchandise Orders</h3>
                            <div className="product-display empty_div mt-4">
                                <div>
                                    <img src={Empty} alt="empty" />
                                    <p>You have not placed any orders yet</p>
                                    {/* <Link to={AppRoute.merch} className="btn_red">View Merchandise</Link> */}
                                </div>
                            </div>
                            <div className="mt-5">
                                <h3 className="other-prroducts-title">Some items users buy</h3>
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
                                            <div className="merch_box grid-4">
                                                {allMerchandise.map((product, index) => (
                                                    <div key={index}>
                                                        <div>
                                                            <div className="merch_image_cover">
                                                                <img className="merch_image" src={product.image} alt="sweatshirt" />
                                                            </div>
                                                            <p className="merch_name">{product.name}</p>
                                                            {
                                                                +product.discount > 0 ?
                                                                    <div className="merch-price-grid">
                                                                        <p className="merch_price strikethrough"><span>NGN </span>
                                                                            <NumberFormat className="new_product_amount" value={product.price} displayType={'text'} thousandSeparator={true} />
                                                                        </p>
                                                                        <p className="merch_price"><span>NGN </span>
                                                                            <NumberFormat className="new_product_amount" value={((product.discount * product.price) / 100)} displayType={'text'} thousandSeparator={true} />
                                                                        </p>
                                                                    </div>
                                                                    :
                                                                    <p className="merch_price"><span>NGN </span>
                                                                        <NumberFormat className="new_product_amount" value={product.price} displayType={'text'} thousandSeparator={true} />
                                                                    </p>
                                                            }
                                                            <button
                                                                style={{ padding: '5px 10px', fontSize: '1.2rem' }}
                                                                onClick={() => addMerchToCart(product)}
                                                                className="btn-red">Add to Cart</button>
                                                        </div>
                                                    </div>
                                                ))
                                                }
                                            </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile;