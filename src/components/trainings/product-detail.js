import React, { useEffect, useState, useRef } from "react";

import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Controller, useForm } from 'react-hook-form';
import { Skeleton, notification, Modal } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip, Menu } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from '../../utils/axiosCall';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Divider, Rate } from "antd";
import ReactPlayer from 'react-player/lazy';
import { Player, ControlBar } from 'video-react';
import { PaystackButton, usePaystackPayment } from 'react-paystack';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import axiosCall from "../../utils/axiosCall";
import { v4 as uuid } from 'uuid';

// import locationMap from "../../assets/images/mini/locationmap.jpg";
// import Testimonial from "../../assets/videos/testimonial.mp4";
import Footer from "../../utils/footer";
import Nav from "../../utils/nav";
import { connect } from "react-redux";
import AppRoute from "../../utils/routes";
import Empty from '../../assets/images/empty_history.svg';

const ProductDetail = props => {

    const Navigate = useNavigate();
    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };
    const paymentButton = useRef(null);
    // const publicKey = "pk_test_6001cfe393365d476119a4e494f32bcb1290cfea"
    // const publicKey = "FLWPUBK_TEST-0e746e210b6a35ba308e802e22489f09-X";
    const publicKey = "pk_test_a19a6e93c97960b1a49da3577caacd3f2194d2a7"
    const [uuidv4] = useState(uuid());

    const [amount, setAmount] = useState(0); // Remember, set in kobo!
    const [userData] = useState(props.auth.isAuthenticated ? props.auth.userDetails : '');
    const [loaderSpinning, setLoaderSpinning] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [activePlan, setActivePlan] = useState(false);
    const [searchParams] = useSearchParams();
    const [productPlans, setProductPlans] = useState({});
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);
    const [watchMe, setWatchMe] = useState(false);
    const [productNotFound, setProductNotFound] = useState(false);
    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [currencyToUse, setCurrencyToUse] = useState('');
    const [rentals, setRentals] = useState(null);

    // fetch product plans
    const [allProductPlans, setAllProductPlans] = useState([]);
    const [productCart, setProductCart] = useState([]);

    useEffect(() => {
        let productId = searchParams.get('productId');
        axiosCall.get(`/findproductplan/${productId}`)
            .then(productPlans => {
                if (productPlans.data.statusMessage === "success") {
                    if (productPlans.data.message === null) {
                        setProductNotFound(true);
                    } else {
                        setProductPlans(productPlans.data.message);
                        let planAmount = productPlans.data.message.discount ? ((productPlans.data.message.discount * productPlans.data.message.price) / 100) : productPlans.data.message.price;
                        setAmount(`${planAmount}`);
                        setProductCart([productPlans.data.message.id]);
                    }
                    setErrorOccurred(false);
                    setFetchingData(false);
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
        if (props.auth.isAuthenticated) {
            axiosCall.post('/checkproductpurchase', {
                coursePlanId: productId,
                userId: userData.id,
            })
                .then(coursePlans => {
                    if (coursePlans.data.statusMessage === "success") {
                        if (coursePlans.data.message) {
                            setActivePlan(true)
                        }
                    } else {
                        openNotificationWithIcon('error', coursePlans.data.summary);
                    }
                })
                .catch(err => {
                    openNotificationWithIcon('error', 'An error occurred while checking product plans. Please reload page to try again')
                })
        }

        const items = [
            {
                label: 'NGN',
                key: '1',
                onClick: () => {
                    setCurrencyToUse('NGN');
                    setIsModalOpen(true);
                }
            },
            {
                label: 'USD',
                key: '2',
                onClick: () => {
                    setCurrencyToUse('USD');
                    setIsModalOpen(true);
                }
            }
        ];
        setCurrencyOptions(items);
        const rentals = (
            <div className="runMyDrowdown">
                <div className="dropdown-cover">
                    <div className="dropdown-list">
                        <Menu
                            items={items}
                        />
                    </div>
                </div>
            </div>
        )
        setRentals(rentals);
    }, [])
    const componentProps = {
        email: userData.emailAddress,
        // email: 'eadelekeife@yahoo.com',
        amount: amount + '00',
        metadata: {
            name: userData.firstName + ' ' + userData.lastName,
            phone: userData?.phoneNumber,
        },
        publicKey,
        text: `Complete Order: NGN ${amount}`,
        onSuccess: (paymentData) => {
            if (paymentData.status === "success") {
                setLoaderSpinning(true)
                axiosCall.post(`/buyproduct`, {
                    productPlanId: productPlans.id,
                    userId: userData.id,
                    transId: paymentData.trxref
                })
                    .then(coursePlans => {
                        if (coursePlans.data.statusMessage === "success") {
                            Navigate(AppRoute.plansuccess);
                        } else {
                            openNotificationWithIcon('error', coursePlans.data.summary);
                            setLoaderSpinning(false);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        openNotificationWithIcon('error', 'An error occurred while completing product purchase. Please try again')
                        setLoaderSpinning(false);
                    })
            }
        },
        // alert("Thanks for doing business with us! Come back soon!!"),
        onClose: () => openNotificationWithIcon('error', 'Transaction cancelled'),
    }

    let skeleton = [];
    for (let i = 0; i < 6; i++) {
        skeleton.push(<Skeleton active />)
    }

    // const fwloyaltyConfig = {
    //     public_key: publicKey,
    //     tx_ref: uuidv4,
    //     amount,
    //     currency: 'NGN',
    //     payment_options: 'card',
    //     customer: {
    //         // email: props.auth.isAuthenticated ? props.auth.userDetails.emailAddress : '',
    //         email: 'eadelekeife@gmail.com',
    //     },
    //     customizations: {
    //         title: productPlans?.title
    //     },
    // }

    // const handleFlutterPayment = useFlutterwave(fwloyaltyConfig);

    // const watchMyAuthentication = () => {
    //     // setWatchMe(true);
    //     setWatchMe(true);
    //     handleFlutterPayment({
    //         callback: async response => {
    //             if (response.status === "successful") {
    //                 setLoaderSpinning(true)
    //                 axiosCall.post(`/buyproduct`, {
    //                     productPlanId: productPlans.id,
    //                     userId: userData.id,
    //                     transId: response.tx_ref
    //                 })
    //                     .then(coursePlans => {
    //                         if (coursePlans.data.statusMessage === "success") {
    //                             Navigate(AppRoute.profileVideos)
    //                         } else {
    //                             openNotificationWithIcon('error', coursePlans.data.summary);
    //                             setLoaderSpinning(false);
    //                         }
    //                     })
    //                     .catch(err => {
    //                         console.log(err)
    //                         openNotificationWithIcon('error', 'An error occurred while completing product purchase. Please try again')
    //                         setLoaderSpinning(false);
    //                     })
    //             }
    //             closePaymentModal() // this will close the modal programmatically
    //         },
    //         onClose: () => { console.log('done') },
    //     });
    // }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const goToPayment = () => {
        // handleFlutterPayment({
        //     callback: async response => {
        //         if (response.status === "successful") {
        //             setLoaderSpinning(true)
        //             axiosCall.post(`/buyproduct`, {
        //                 productPlanId: productPlans.id,
        //                 userId: userData.id,
        //                 transId: response.tx_ref
        //             })
        //                 .then(coursePlans => {
        //                     if (coursePlans.data.statusMessage === "success") {
        //                         Navigate(AppRoute.profileVideos)
        //                     } else {
        //                         openNotificationWithIcon('error', coursePlans.data.summary);
        //                         setLoaderSpinning(false);
        //                     }
        //                 })
        //                 .catch(err => {
        //                     console.log(err)
        //                     openNotificationWithIcon('error', 'An error occurred while completing product purchase. Please try again')
        //                     setLoaderSpinning(false);
        //                 })
        //         }
        //     },
        //     onClose: () => { console.log('done') },
        // });
    }

    // Paystack
    const config = {
        reference: uuidv4,
        email: props.auth.userDetails.emailAddress,
        amount: `${+amount}00`, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: publicKey,
    };

    const onSuccessPayStack = (reference) => {
        setLoaderSpinning(true)
        axiosCall.post(`/buyproduct`, {
            productPlanId: productPlans.id,
            userId: userData.id,
            transId: reference.trxref
        })
            .then(coursePlans => {
                if (coursePlans.data.statusMessage === "success") {
                    localStorage.setItem('purchaseSuccessful', true);
                    Navigate(AppRoute.profileVideos)
                } else {
                    openNotificationWithIcon('error', coursePlans.data.summary);
                    setLoaderSpinning(false);
                }
            })
            .catch(err => {
                console.log(err)
                openNotificationWithIcon('error', 'An error occurred while completing product purchase. Please try again')
                setLoaderSpinning(false);
            })
    };


    // you can call this function anything
    const onClosePaystack = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        openNotificationWithIcon('error', 'Transaction cancelled')
    }

    const PaystackHookExample = () => {
        const initializePayment = usePaystackPayment(config);
        return (
            <div>
                <button
                    className="btn_red full"
                    onClick={() => {
                        initializePayment(onSuccessPayStack, onClosePaystack)
                    }}>Go to Payment</button>
            </div>
        );
    };

    // product plans cart

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

    const removeProductFromCart = (product) => {
        let productCartData = productCart;
        let index = productCartData.indexOf(product.id);
        productCartData.splice(index, 1);
        let newAmount = +amount - +product.price;
        setAmount(newAmount);
        setProductCart([...productCartData]);
    }

    const addProductToCart = product => {
        let newAmount = +amount + +product.price;
        setAmount(newAmount);
        setProductCart([...productCart, product.id]);
    }

    return (
        <div>
            <Nav />
            <React.Fragment>
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
                            !productNotFound ?
                                <div>
                                    <div className="plan_group">
                                        <div className="grid_2">
                                            <div className="plan_bg">
                                                <div className="plan_props_detail">
                                                    <h1>{productPlans.title}</h1>
                                                    <p>
                                                        {productPlans.description}
                                                    </p>
                                                    {
                                                        props.auth.isAuthenticated ?
                                                            !activePlan ? <button disabled className="btn_red">You have an Active Plan</button>
                                                                :
                                                                <Dropdown className="dropme" class="helllos"
                                                                    overlay={rentals}>
                                                                    <button className="flex-btn btn_red" to="#">
                                                                        Buy Plan <span>| <ion-icon name="chevron-down-outline"></ion-icon></span>
                                                                    </button>
                                                                </Dropdown>
                                                            :
                                                            <button className="btn_red" onClick={() => setIsModalOpen(true)}>Buy Plan</button>
                                                    }
                                                </div>
                                            </div>
                                            <div className="story_bg">

                                            </div>
                                        </div>
                                    </div>
                                    <div className="detail_props pt-3">
                                        <div className="contain">
                                            <div className="grid_3">
                                                <div className="plan_story_block">
                                                    <div className="block_header">
                                                        <h3>About Dancerapy</h3>
                                                    </div>
                                                    <Divider style={{ marginTop: 0, marginBottom: 0 }} />
                                                    <div className="block_body">
                                                        <div>
                                                            <h4>Our Mission Statement</h4>
                                                            <p>
                                                                To ensure that people have access to
                                                                DANCERAPY worldwide through our S.T.U.N.D (Studio Next Door Program)
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <h4>Our Vision Statement</h4>
                                                            <p>
                                                                To ensure that dance fitness becomes a lifestyle for
                                                                everyone, millions of people around the world thereby increasing life
                                                                expectancy by 15 – 20%.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="plan_story_block">
                                                    <div className="block_header">
                                                        <h3>About Dance Plan</h3>
                                                    </div>
                                                    <Divider style={{ marginTop: 0, marginBottom: 0 }} />
                                                    <div className="block_body">
                                                        <ul>
                                                            <li className="course_fitness_props">
                                                                <span className="first_span">Flexibility</span>
                                                                <span className="second_span"><Rate disabled allowHalf defaultValue={5} /></span></li>
                                                            <li className="course_fitness_props">
                                                                <span className="first_span">Cardio</span>
                                                                <span className="second_span"></span><Rate disabled allowHalf defaultValue={5} /></li>
                                                            <li className="course_fitness_props">
                                                                <span className="first_span">Muscle Toning</span>
                                                                <span className="second_span"><Rate disabled allowHalf defaultValue={5} /></span></li>
                                                            <li className="course_fitness_props">
                                                                <span className="first_span">Interval Training</span>
                                                                <span className="second_span"><Rate disabled allowHalf defaultValue={5} /></span></li>
                                                            <li className="course_fitness_props">
                                                                <span className="first_span">Muscle Memory</span>
                                                                <span className="second_span"><Rate disabled allowHalf defaultValue={5} /></span></li>
                                                            <li className="course_fitness_props">
                                                                <span className="first_span">Mind and Body Coordination</span>
                                                                <span className="second_span"><Rate disabled allowHalf defaultValue={5} /></span></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="plan_story_block">
                                                    <div className="block_header">
                                                        <h3>Dance Testimonials</h3>
                                                    </div>
                                                    <Divider style={{ marginTop: 0, marginBottom: 0 }} />
                                                    <div className="block_body">
                                                        <div className="black_div">
                                                            <video
                                                                src="https://lagostheatrevideos.s3.amazonaws.com/testimonial.mp4"
                                                                autoPlay={false} style={{ background: 'black' }} playsInline={true} controls />
                                                        </div>
                                                        {/* <ul style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <li><ion-icon name="call-outline"></ion-icon>: +234 803 432 6227</li>
                                                    <li><ion-icon name="mail-outline"></ion-icon>: info@dancerapy.com</li>
                                                </ul> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-4">

                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="center_align_message">
                                    <div>
                                        <img src={Empty} alt="empty" />
                                        <p>An error occurred while we were trying to fetch data. Please return to previous
                                            page to try again.</p>
                                    </div>
                                </div>
                }
            </React.Fragment>
            <Modal title={null} footer={null} open={isModalOpen} className="products-cart"
                onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <h4 className="products-cart-title">Users also buy these</h4>
                    <Divider style={{ marginTop: 0, marginBottom: 15 }} />
                    <div>
                        <div className="cart-data">
                            {
                                allProductPlans.map((productPlans, index) => {
                                    return (
                                        index === 0 ?
                                            ''
                                            :
                                            <React.Fragment key={index}>
                                                <div className="cart-grid-3 cart-grid-item">
                                                    <div className="cart-image-cover">
                                                        <img src={productPlans.image} alt={productPlans.title} />
                                                    </div>
                                                    <div>
                                                        <h3>{productPlans.title}</h3>
                                                        <p><span className="currency">NGN</span>{productPlans.price}</p>
                                                    </div>
                                                    <div>
                                                        {
                                                            productCart.indexOf(productPlans.id) !== -1 ?
                                                                <button
                                                                    onClick={() => {
                                                                        removeProductFromCart(productPlans)
                                                                    }}
                                                                    className="btn_border_black">Remove</button>
                                                                :
                                                                <button
                                                                    onClick={() => {
                                                                        addProductToCart(productPlans)
                                                                    }}
                                                                    className="btn_border_black">Add to Cart</button>
                                                        }
                                                    </div>
                                                </div>
                                                {allProductPlans.length - 1 === index ? '' : <Divider style={{ marginTop: 10, marginBottom: 10 }} />}
                                            </React.Fragment>
                                    )
                                })
                            }
                            <Divider />
                            <div className="grid_flex grid-button">
                                <button onClick={() => setIsModalOpen(false)} className="btn_border_black">Cancel</button>
                                <PaystackButton className="btn_red" {...componentProps} />
                                {/* <button className="btn_red">Complete Order: NGN {amount}</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <Footer />
        </div>
    )
}

const mapStateToProps = store => {
    return { auth: store.auth }
}

export default connect(mapStateToProps)(ProductDetail);