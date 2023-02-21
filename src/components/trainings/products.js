import "./trainings";

import React, { useEffect, useState } from "react";
import { Skeleton, Divider, notification, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import axiosCall from "../../utils/axiosCall";
import AppRoute from "../../utils/routes";

import Cart from "../../assets/images/cart.svg";

import Chowdeck1 from "./_1.webp";
import Chowdeck2 from "./_2.webp";
import Chowdeck3 from "./_3.webp";


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
        <div className="physical plans">
            <Nav />
            <div className="contain">
                <div className=" mt-5">
                    <h1>Dancerapy Products and Services</h1>
                    <div className="grid_3">
                        <div className="dancerapy-products">
                            <div className="text-block">
                                <h2>Annual Online Subscription</h2>
                                <p>Join The Dancerapy Club Today and have access to over 30 Dance Fitness
                                    Videos, Dance Choreophgries, Dance Trends and lots more monthly.</p>
                                <Link to="/products/detail?productName=Dancerapy%20Club%20Annual%20Online%20Subscription&productId=8">See More <ion-icon name="arrow-forward-outline"></ion-icon></Link>
                            </div>
                            <div className="chow-1"></div>
                        </div>
                        <div className="dancerapy-products">
                            <div className="text-block">
                                <h2>Dance in a Flash</h2>
                                <p>Join The Dancerapy Club Today and have access to over 30 Dance Fitness
                                    Videos, Dance Choreophgries, Dance Trends and lots more monthly.</p>
                                <Link to="/products/detail?productName=Dance%20in%20a%20Flash%20-%20Delivered%20to%20your%20Doorstep&productId=9">See More <ion-icon name="arrow-forward-outline"></ion-icon></Link>
                            </div>
                            <div className="chow-2"></div>
                        </div>
                        <div className="dancerapy-products">
                            <div className="text-block">
                                <h2>Dancerapy live on Zoom</h2>
                                <p>Join The Dancerapy Club Today and have access to over 30 Dance Fitness
                                    Videos, Dance Choreophgries, Dance Trends and lots more monthly.</p>
                                <Link to="/products/detail?productName=Join%20Dancerapy%20live%20on%20Zoom&productId=10">See More <ion-icon name="arrow-forward-outline"></ion-icon></Link>
                            </div>
                            <div className="chow-3"></div>
                        </div>
                        <div className="dancerapy-products">
                            <div className="text-block">
                                <h2>Dancerapy Physical class</h2>
                                <p>Join The Dancerapy Club Today and have access to over 30 Dance Fitness
                                    Videos, Dance Choreophgries, Dance Trends and lots more monthly.</p>
                                <Link to="/products/detail?productName=Join%20Dancerapy%20Physical%20Class&productId=11">See More <ion-icon name="arrow-forward-outline"></ion-icon></Link>
                            </div>
                            <div className="chow-1"></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer margin={true} />
        </div >
    )
}

export default Products;