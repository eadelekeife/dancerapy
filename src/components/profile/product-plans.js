import React, { useEffect, useState } from "react";
import { Skeleton, Divider, notification, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import axiosCall from "../../utils/axiosCall";
import AppRoute from "../../utils/routes";

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
        <div className="empty-product-display physical plans">
            <div className="contai">
                <div className=" mt-5">
                    <h3 className="other-prroducts-title">Dancerapy Products and Services</h3>
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
                                <div className="grid_4">
                                    {
                                        allProductPlans.map((productPlans, index) => (
                                            <div key={index}>
                                                <div className="text-block">
                                                    <img src={productPlans.image} alt={productPlans.title} />
                                                    <p>{productPlans.title}</p>
                                                    <Link
                                                        style={{ display: 'block', width: 'max-content', padding: '6px 10px', fontSize: '1.2rem' }}
                                                        className="btn_red" to={`/products/detail?productName=${productPlans.title}&productId=${productPlans.id}`}>See More <ion-icon name="arrow-forward-outline"></ion-icon></Link>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default Products;