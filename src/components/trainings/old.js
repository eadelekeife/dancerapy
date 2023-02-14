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













import "./trainings.css";

import React, { useEffect, useState } from "react";
import { Skeleton, Divider, notification, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import axiosCall from "../../utils/axiosCall";
import AppRoute from "../../utils/routes";

import LocationMap from "../../assets/images/mini/map.jpeg";

import Footer from "../../utils/footer";
import Nav from "../../utils/nav";

const Plans = () => {
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
        axiosCall.get('/fetchallcourseplans')
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
                console.log(err)
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
        <div className="physical plans">
            <Nav />
            <div className="plan_bg">
                <h3>Find a Physical Class</h3>
                <div className="flex_form filter">
                    <div className="select_box_filter_cover">
                        <Select
                            placeholder="Set Training Time"
                            style={{ width: '300px' }}
                            prefix={<UserOutlined />}>
                            <Option value="morning">Morning Sessions</Option>
                            <Option value="afternoon">Afternoon Sessions</Option>
                            <Option value="evening">Evening Sessions</Option>
                        </Select>
                        <ion-icon name="alarm-outline" className="filter_box_icon"></ion-icon>
                    </div>
                    <div className="select_box_filter_cover">
                        <Select
                            placeholder="Set Training Location"
                            style={{ width: '300px' }}
                            prefix={<UserOutlined />}>
                            <Option value="ikeja">Ikeja</Option>
                            <Option value="ikoyi">Ikoyi</Option>
                            <Option value="surulere">Surulere</Option>
                        </Select>
                        <ion-icon name="navigate-circle-outline" className="filter_box_icon"></ion-icon>
                    </div>
                    <button className="btn_red">FILTER CLASSES</button>
                </div>
            </div>
            <div className="grid_2">
                <div className="plans_content">
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
                                <div className="">
                                    <div className="grey_line">

                                    </div>
                                    {allProductPlans.map((productPlans, index) => (
                                        <div key={index}>
                                            <div className="grid_3_bias">
                                                <div className="plan_grid_duration">
                                                    <ul>
                                                        {productPlans.monday ? <li>&bull; Mon</li> : ''}
                                                        {productPlans.tuesday ? <li>&bull; Tues</li> : ''}
                                                        {productPlans.wednesday ? <li>&bull; Wed</li> : ''}
                                                        {productPlans.thursday ? <li>&bull; Thurs</li> : ''}
                                                        {productPlans.friday ? <li>&bull; Fri</li> : ''}
                                                        {productPlans.saturday ? <li>&bull; Sat</li> : ''}
                                                        {productPlans.sunday ? <li>&bull; Sun</li> : ''}
                                                    </ul>
                                                </div>
                                                <div className="plan_grid_main">
                                                    <div className="plan_grid_main_detail">
                                                        <Link to={`${AppRoute.trainings}/detail?productName=${productPlans.title}&productId=${productPlans.id}`}>
                                                            <h3 className="physical_plan_title">{productPlans.title}</h3>
                                                        </Link>
                                                        <ul className="physical_plans_list">
                                                            <li>&bull; Muscle Toning</li>
                                                            <li>&bull; Interval Training</li>
                                                            <li>&bull; Muscle Memory</li>
                                                            <li>&bull; Cardio</li>
                                                            <li>&bull; Flexibility</li>
                                                            <li>&bull; Mind and Body Coordination</li>
                                                        </ul>
                                                        <ul className="physical_plans_list">
                                                            <li><ion-icon name="language-outline"></ion-icon> {productPlans.language}</li>
                                                            <li><ion-icon name="heart-outline"></ion-icon> 0 reviews</li>
                                                            <li><ion-icon name="alarm-outline"></ion-icon> {productPlans.openTime} &mdash; {productPlans.closeTime}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="plan_grid_props_list">
                                                    <Link to={`${AppRoute.trainings}/detail?productName=${productPlans.title}&productId=${productPlans.id}`}
                                                        className="btn_border_black">Details</Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    }
                                </div>
                    }
                </div>
                <div>
                    <img src={LocationMap} alt="map" />
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default Plans;