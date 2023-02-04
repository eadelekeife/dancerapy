import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Input, Select, Spin, notification, Radio, Space, Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from '../../utils/axiosCall';
import { Link } from 'react-router-dom';
import axiosCall from "../../utils/axiosCall";
import { usePaystackPayment } from "react-paystack";

import StatesData from '../../utils/states';
import NumberFormat from 'react-number-format';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Nav from '../../utils/nav';
import Footer from '../../utils/footer';

import AppRoute from '../../utils/routes';

const CheckOut = props => {

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };

    const { Option } = Select;
    const [loadingData, setLoadingData] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [towns, setLga] = useState([]);
    const [nigerianStatesData, setNigerianStatesData] = useState([]);
    const [nigerianLGAData, setNigerianLGAData] = useState([]);
    const [deliveryState, setDeliveryState] = useState('');
    const [deliveryHouseAddress, setDeliveryHouseAddress] = useState('');
    const [deliveryLGA, setDeliveryLGA] = useState('');
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [deliveryPhoneNumber, setDeliveryPhoneNumber] = useState(0);
    const [deliveryEmail, setDeliveryEmail] = useState(0);
    const [fetchingData, setFetchingData] = useState(true);
    const [fetchingCheckoutData, setFetchingCheckoutData] = useState(false);
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [cartData, setCartData] = useState([]);
    const [orderTotalCost, setOrderTotalCost] = useState(0);
    const [cartTotalCost, setCartTotalCost] = useState(0);
    const [userFormData, setUserFormData] = useState({});
    const [formDataToShow, setFormDataToShow] = useState('deliveryDetails');
    const [dateToUse, setDateToUse] = useState([]);
    const [deliveryDate, setDeliveryDate] = useState('');

    const publicKey = "pk_test_6001cfe393365d476119a4e494f32bcb1290cfea";
    const config = {
        reference: (new Date()).getTime().toString(),
        email: props.auth.userDetails.emailAddress,
        amount: orderTotalCost + '00',
        publicKey,
        firstname: props.auth.userDetails.firstname,
        lastname: props.auth.userDetails.lastname,
    };
    const initializePayment = usePaystackPayment(config);

    const fetchCart = () => {
        axiosCall.post('/user/cart', {
            cartId: localStorage.getItem('cart-token'),
            userId: props.auth.userDetails.id
        })
            .then(userCart => {
                if (userCart.data.statusMessage === "success") {
                    let cartTotalCost = 0;
                    userCart.data.message.forEach((cart) => {
                        let itemPrice = +cart.merchandise.discount ? ((cart.merchandise.discount * cart.merchandise.price) / 100) : cart.merchandise.price;
                        cartTotalCost += +(cart.quantity * +itemPrice);
                    })
                    setOrderTotalCost(cartTotalCost);
                    setCartTotalCost(cartTotalCost);
                    setValue('orderFee', `NGN ${cartTotalCost}`);
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

    const fetchDeliveryDates = () => {
        axiosCall('/alldeliverydates', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(date => {
                let dateBox = [];
                date.data.message.forEach(newDate => {
                    // if(+newDate.amount < +totalFee) {
                    dateBox.push(newDate);
                    // }
                })
                setDateToUse(dateBox);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchCart();
        fetchDeliveryDates();
        let allStates = [];
        for (let states of Object.keys(StatesData)) {
            allStates.push(states);
        }
        setNigerianStatesData(allStates);
    }, [])

    const updateLGAList = e => {
        setValue('deliveryLGA', '');
        setDeliveryLGA('');
        setDeliveryState(e);
        let deliveryFee = e === "Lagos" ? 500 : 1000;
        e === "Lagos" ? setDeliveryFee(deliveryFee) : setDeliveryFee(deliveryFee);
        e === "Lagos" ? setValue('deliveryFee', 'NGN 500.00') : setValue('deliveryFee', 'NGN 1000.00');
        let newCartTotal = deliveryFee + +cartTotalCost;
        setOrderTotalCost(newCartTotal);
        setValue('orderFee', `NGN ${newCartTotal}`);
        setNigerianLGAData(StatesData[e]);
    };

    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;
    const secAntIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const signupValidator = yup.object().shape({
        emailAddress: yup.string().email('Please enter a valid email address').required('Please enter your email address'),
        phoneNumber: yup.string().required('Please enter your phone number'),
        address: yup.string().required('Please enter your address')
    })

    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(signupValidator)
    });

    const selectDeliveryDate = e => {
        setDeliveryDate(e.target.value.trim());
    }

    const onSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log('running')
        setFetchingCheckoutData(true);
        axiosCall.post('/user/cart/checkout', {
            userFormData, transId: reference.trxref, deliveryDate
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(merchandiseData => {
                console.log(merchandiseData)
                if (merchandiseData.data.statusMessage === "success") {
                    window.location.href = "/checkout-success";
                } else {
                    setFetchingCheckoutData(false);
                    openNotificationWithIcon('error', 'An error occurred while completing transaction. Please try again..');
                }
            })
            .catch(err => {
                console.log(err)
                setFetchingCheckoutData(false);
                openNotificationWithIcon('error', 'An error occurred while completing transaction. Please try again..');
            })
    };

    const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }

    const setUserDeliveryDetails = e => {
        let userFormData = {
            emailAddress: e.emailAddress,
            phoneNumber: e.phoneNumber,
            deliveryState, deliveryLGA: e.deliveryLGA, deliveryFee, address: e.address, orderTotalCost, cartData, cartTotalCost
        };
        setUserFormData(userFormData);
        setFormDataToShow('deliveryDates');
    }

    const handleMerchandisePayment = () => {
        initializePayment(onSuccess, onClose);
    }

    return (
        <div>
            <Nav />
            <Spin spinning={fetchingCheckoutData} indicator={secAntIcon}>
                <div className="form form_page">
                    <div className="checkout-form-cover">
                        <div>
                            <div className="form_detail contain">
                                {
                                    errorMessage ?
                                        <p className="errorMessage">{errorMessage}</p> : ''
                                }
                                {
                                    fetchingData ?
                                        <div>
                                            <Spin indicator={secAntIcon} />
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
                                            formDataToShow === "deliveryDetails" ?
                                                <div className="checkout-form">
                                                    <div>
                                                        <h3>Select Your Delivery Details</h3>
                                                    </div>
                                                    <form onSubmit={handleSubmit(setUserDeliveryDetails)} className="mt-3">
                                                        <div className="form_flex">
                                                            <div className="form-group space">
                                                                <label htmlFor="emailAddress">Email address</label>
                                                                <Controller name="emailAddress" control={control}
                                                                    render={({ field }) => {
                                                                        return (
                                                                            <Input style={{ height: '5rem' }} type="email" {...field}
                                                                                name="emailAddress" />
                                                                        )
                                                                    }} />
                                                                {errors.emailAddress && <p className="errorMessage">{errors.emailAddress.message}</p>}
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="phoneNumber">Phone number</label>
                                                                <Controller name="phoneNumber" control={control}
                                                                    render={({ field }) => {
                                                                        return (
                                                                            <Input style={{ height: '5rem' }} type="tel" {...field}
                                                                                name="phoneNumber" />
                                                                        )
                                                                    }} />
                                                                {errors.phoneNumber && <p className="errorMessage">{errors.phoneNumber.message}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="form_flex">
                                                            <div className="form-group">
                                                                <label htmlFor="deliveryState">Delivery State</label>
                                                                <Controller name="deliveryState" control={control}
                                                                    render={({ field }) => {
                                                                        return (
                                                                            <Select
                                                                                defaultValue={deliveryState}
                                                                                onChange={updateLGAList}
                                                                            >
                                                                                {
                                                                                    nigerianStatesData.map((states, index) => (
                                                                                        <Option value={states} key={index}>{states}</Option>
                                                                                    ))
                                                                                }
                                                                            </Select>
                                                                        )
                                                                    }} />
                                                                {errors.deliveryState && <p className="errorMessage">{errors.deliveryState.message}</p>}
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="deliveryLGA">Delivery State</label>
                                                                <Controller name="deliveryLGA" control={control}
                                                                    render={({ field }) => {
                                                                        return (
                                                                            <Select defaultValue={deliveryLGA} {...field}>
                                                                                {
                                                                                    nigerianLGAData.map((lga, index) => (
                                                                                        <Option value={lga} key={index}>{lga}</Option>
                                                                                    ))
                                                                                }
                                                                            </Select>
                                                                        )
                                                                    }} />
                                                                {errors.deliveryLGA && <p className="errorMessage">{errors.deliveryLGA.message}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="address">House address</label>
                                                            <Controller name="address" control={control}
                                                                render={({ field }) => {
                                                                    return (
                                                                        <Input.TextArea type="address" rows="4" {...field}
                                                                            name="address" />
                                                                    )
                                                                }} />
                                                            {errors.address && <p className="errorMessage">{errors.address.message}</p>}
                                                        </div>
                                                        <div className="mt-5 grid_flex">
                                                            {
                                                                loadingData
                                                                    ?
                                                                    <button className="btn_red">
                                                                        <span style={{ marginRight: '10px' }}>Please wait...</span>
                                                                        <Spin indicator={antIcon} /></button>
                                                                    :
                                                                    <button className="btn_red">Select Delivery Date</button>
                                                            }
                                                        </div>
                                                    </form>
                                                </div>
                                                :
                                                formDataToShow === "deliveryDates" ?
                                                    <div className="checkout-form">
                                                        <h3 className="checkout_center_title">Pick your preferred Delivery Date</h3>
                                                        <div className="mt-5 grid_flex">
                                                            <Radio.Group
                                                                onChange={e => selectDeliveryDate(e)}
                                                                value={deliveryDate}
                                                            >
                                                                <div className="radioDisplay">
                                                                    <Space>
                                                                        {
                                                                            dateToUse.map((date, index) => {
                                                                                return (
                                                                                    <Radio key={index} value={date.date}>
                                                                                        <div>
                                                                                            <h6>{date.date}</h6>
                                                                                        </div>
                                                                                    </Radio>
                                                                                )
                                                                            })
                                                                        }
                                                                    </Space>
                                                                </div>
                                                            </Radio.Group>
                                                        </div>
                                                        <div className="mt-5 grid_flex">
                                                            <button
                                                                onClick={e => {
                                                                    e.preventDefault();
                                                                    setFormDataToShow('deliveryDetails')
                                                                }}
                                                                className="btn_blank">Go Back</button>
                                                            <button className="btn_red"
                                                                onClick={() => {
                                                                    if (deliveryDate) {
                                                                        setFormDataToShow('paymentOption');
                                                                        openNotificationWithIcon('success', 'Delivery date saved');
                                                                    } else {
                                                                        openNotificationWithIcon('error', 'Please set delivery date');
                                                                    }
                                                                }}
                                                            >Go to Payment</button>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="checkout-confirmation mt-5">
                                                        <div className="grid-2-bias">
                                                            <div>
                                                                <div>
                                                                    <h3>Please confirm and complete your order information</h3>
                                                                </div>
                                                                <form onSubmit={handleSubmit(setUserDeliveryDetails)} className="mt-3">
                                                                    <div className="form_flex">
                                                                        <div className="form-group space">
                                                                            <label htmlFor="emailAddressReview">Email address</label>
                                                                            <Input style={{ height: '5rem' }} type="email" disabled
                                                                                defaultValue={userFormData.emailAddress}
                                                                                name="emailAddressReview" />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="phoneNumberReview">Phone number</label>
                                                                            <Input style={{ height: '5rem' }} type="tel" disabled
                                                                                defaultValue={userFormData.phoneNumber}
                                                                                name="phoneNumberReview" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_flex">
                                                                        <div className="form-group">
                                                                            <label htmlFor="deliveryState">Delivery State</label>
                                                                            <Input disabled style={{ height: '5rem' }} type="text"
                                                                                defaultValue={userFormData.deliveryState}
                                                                                name="deliveryStateReview" />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="deliveryLGAReview">Delivery LGA</label>
                                                                            <Input disabled style={{ height: '5rem' }} type="text"
                                                                                defaultValue={userFormData.deliveryLGA}
                                                                                name="deliveryLGAReview" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_flex">
                                                                        <div className="form-group">
                                                                            <label htmlFor="deliveryTypeReview">Delivery Type</label>
                                                                            <Input style={{ height: '5rem' }} disabled
                                                                                defaultValue={'delivery'}
                                                                                name="deliveryTypeReview" />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="deliveryDateReview">Delivery Date</label>
                                                                            <Input style={{ height: '5rem' }}
                                                                                defaultValue={deliveryDate}
                                                                                disabled name="deliveryDateReview" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label htmlFor="address">House address</label>
                                                                        <Input.TextArea type="address" rows="4" disabled
                                                                            defaultValue={userFormData.address}
                                                                            name="address" />
                                                                    </div>
                                                                    <button className="btn_blank">Set Delivery Date</button>
                                                                </form>
                                                            </div>
                                                            <div>
                                                                <div className="cart-brief-data">
                                                                    <ul className="first-list">
                                                                        <li>
                                                                            <span className="first">Subtotal </span>
                                                                            <span className="second"><span className="currency">NGN</span>
                                                                                <NumberFormat prefix="" value={cartTotalCost.toFixed(2)} className="foo"
                                                                                    displayType={'text'} thousandSeparator={true} />
                                                                            </span>
                                                                        </li>
                                                                        <li>
                                                                            <span className="first">Delivery Fee </span>
                                                                            <span className="second"><span className="currency">NGN</span>
                                                                                <NumberFormat prefix="" value={deliveryFee.toFixed(2)} className="foo"
                                                                                    displayType={'text'} thousandSeparator={true} />
                                                                            </span>
                                                                        </li>
                                                                        <li>
                                                                            <span className="first">Order Size</span>
                                                                            <span className="second"><span className="currency">NGN</span> 0.00kg</span>
                                                                        </li>
                                                                        <li>
                                                                            <span className="first">Less Coupon</span>
                                                                            <span className="second"><span className="currency">NGN</span> 0.00</span>
                                                                        </li>
                                                                        <li>
                                                                            <span className="first">Less Voucher</span>
                                                                            <span className="second"><span className="currency">NGN</span> 0.00</span>
                                                                        </li>
                                                                        <Divider style={{marginTop: 0}} />
                                                                        <li>
                                                                            <span className="first">Total</span>
                                                                            <span className="second"><span className="currency">NGN</span>
                                                                                <NumberFormat prefix="" value={orderTotalCost.toFixed(2)} className="foo"
                                                                                    displayType={'text'} thousandSeparator={true} />
                                                                            </span>
                                                                        </li>
                                                                        <button
                                                                            onClick={handleMerchandisePayment}
                                                                            className="btn_red full">Go to Payment</button>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="show-on-mobile-only">
                    <Footer margin={true} />
                </div>
            </Spin>
        </div >
    )
}

const mapStateToProps = store => {
    return { auth: store.auth }
}

export default connect(mapStateToProps)(CheckOut);