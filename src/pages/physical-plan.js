import React, { useEffect, useState } from "react";
import { Skeleton, Divider, notification, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import axiosCall from "../utils/axiosCall";
import AppRoute from "../utils/routes";

import LocationMap from "../assets/images/mini/map.jpeg";

import Footer from "../components/footer";
import Nav from "../components/nav";

const PhysicalPlans = () => {
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
            <div className="desktop-only">
                <div className="plan_bg">
                    <h3>Find a Physical Class</h3>
                </div>
            </div>
            <div className="mobile-only mobile-product-outline contain">
                <h3>Dancerapy Physical Plans</h3>
                <div className="product-tag">
                    <p>Any day <ion-icon name="chevron-down-outline"></ion-icon></p>
                    <p>Any type <ion-icon name="chevron-down-outline"></ion-icon></p>
                    <p>Any distance <ion-icon name="chevron-down-outline"></ion-icon></p>
                </div>
            </div>
            <div className="grid-2">
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
                                                <div className="desktop-only">
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
                                                <div className="mobile-only">
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
                                                </div>
                                                <div className="plan_grid_props_list">
                                                    <Link to={`${AppRoute.physical_detail}/?productName=${productPlans.title}&productId=${productPlans.id}`}
                                                        className="btn-red">Details</Link>
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
            <Footer noMargin={true} />
        </div >
    )
}

export default PhysicalPlans;