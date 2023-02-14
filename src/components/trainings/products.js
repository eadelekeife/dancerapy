import "./trainings";

import React, { useEffect, useState } from "react";
import { Skeleton, Divider, notification, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import axiosCall from "../../utils/axiosCall";
import AppRoute from "../../utils/routes";

import Cart from "../../assets/images/cart.svg";

import Footer from "../../utils/footer";
import Nav from "../../utils/nav";

const Products = () => {
    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };

    const [allProductPlans, setAllProductPlans] = useState([]);
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);

    useEffect(() => {
        axiosCall.get('/fetchAllproductplans')
            .then(productPlans => {
                if (productPlans.data.statusMessage === "success") {
                    setErrorOccurred(false);
                    setFetchingData(false);
                    setAllProductPlans(productPlans.data.message);
                } else {
                    setErrorOccurred(true);
                    setFetchingData(false);
                    openNotificationWithIcon('error', productPlans.data.summary);
                }
            })
            .catch(err => {
                setErrorOccurred(true);
                setFetchingData(false);
                openNotificationWithIcon('error', 'An error occurred while fetching product plans. Please reload page to try again')
            })
    }, [])
    const { Option } = Select;
    let skeleton = [];
    for (let i = 0; i < 6; i++) {
        skeleton.push(<Skeleton active />)
    }
    return (
        <div className="plans">
            <Nav />
            <div className="desktop-only">
                <div className="plan_bg">
                    <h3>Dancerapy Products and Services</h3>
                    <div className="flex_form filter">
                        <div className="select_box_filter_cover">
                            <Select
                                style={{ width: '300px' }}
                                prefix={<UserOutlined />}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled" disabled>
                                    Disabled
                                </Option>
                            </Select>
                            <ion-icon name="alarm-outline" className="filter_box_icon"></ion-icon>
                        </div>
                        <div className="select_box_filter_cover">
                            <Select
                                style={{ width: '300px' }}
                                prefix={<UserOutlined />}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled" disabled>
                                    Disabled
                                </Option>
                            </Select>
                            <ion-icon name="navigate-circle-outline" className="filter_box_icon"></ion-icon>
                        </div>
                        <button className="btn_red">FILTER CLASSES</button>
                    </div>
                </div>
            </div>
            <div className="mobile-product-outline contain">
                <h3>Products and Services</h3>
                <div className="product-tag">
                    <p>Any day <ion-icon name="chevron-down-outline"></ion-icon></p>
                    <p>Any type <ion-icon name="chevron-down-outline"></ion-icon></p>
                    <p>Any distance <ion-icon name="chevron-down-outline"></ion-icon></p>
                </div>
            </div>
            <div className="container">
                <div>
                    <Divider />
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
                                allProductPlans.map((productPlans, index) => (
                                    <div key={index}>
                                        <div className="training_group">
                                            <div className="training_inside_group">
                                                <div className="training_inside_div">
                                                    <p className="unimportant">{productPlans.discount}% Discount</p>
                                                    <Link to={`${AppRoute.products}/detail?productName=${productPlans.title}&productId=${productPlans.id}`}>
                                                        <h4 className="plan_title">{productPlans.title}</h4>
                                                    </Link>
                                                    <p className="plan_desc">
                                                        {productPlans.description}
                                                    </p>
                                                </div>
                                                <div className="training_inside_img">
                                                    <img src={productPlans.image} alt="annual" />
                                                </div>
                                            </div>
                                            <div className="sec-group mt-4 training_inside_group">
                                                <p>NGN 10,000</p>
                                                <ion-icon name="logo-whatsapp"></ion-icon>
                                            </div>
                                            <div className="training_side_cover">
                                                <div>
                                                    <img src={Cart} alt="Cart" />
                                                </div>
                                                <div>
                                                    <Link
                                                        to={`${AppRoute.products}/detail?productName=${productPlans.title}&productId=${productPlans.id}`}
                                                        style={{ padding: '12px 25px' }}
                                                        className="btn_red">Learn More</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <Divider />
                                    </div>
                                ))
                    }
                </div>
            </div>
            <Footer margin={true} />
        </div >
    )
}

export default Products;