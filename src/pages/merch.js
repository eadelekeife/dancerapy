import "../assets/css/merch.css";

import React, { useEffect, useState } from "react";
import { Skeleton, Divider, notification, Select, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import axiosCall from "../utils/axiosCall";
import AppRoute from "../utils/routes";
import NumberFormat from 'react-number-format';
import { connect } from "react-redux";

import Footer from "../components/footer";
import Nav from "../components/nav";
import AllAppRoutes from "../utils/routes";

const Merchandise = props => {
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
        <div className="shop">
            <Nav />
            <Spin spinning={spinning}>
                <div className="plan_bg">
                    <h3>Merchandise</h3>
                </div>
                <div className="mt_5">
                    <div className="contain">
                        {
                            fetchingData ?
                                <div>
                                    <div className="grid-4">
                                        {skeleton.map((placeHolder, index) => (
                                            <div className="item" key={index}>
                                                {placeHolder}
                                                <Divider />
                                            </div>
                                        ))}
                                    </div>
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
                                    <div className="grid-4">
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
                <div className="final-cover mt_5">
                    <div className="contain">
                        <h5>OUR PHYSICAL CLASSES</h5>
                        <h3>We are available in different locations across Lagos to meet your fitness needs.</h3>
                        <Link to={AllAppRoutes.trainings} className="btn-red">See our locations</Link>
                    </div>
                </div>
                <Footer noMargin={true} />
            </Spin>
        </div>
    )
}

const mapStateToProps = store => {
    return { auth: store.auth }
}

export default connect(mapStateToProps)(Merchandise);