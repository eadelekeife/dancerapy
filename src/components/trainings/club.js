import React, { useEffect, useState, useRef } from "react";

import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Skeleton, notification, Modal } from 'antd';
import { Button, Dropdown, message, Space, Tooltip, Menu } from 'antd';
import NumberFormat from 'react-number-format';

import { Divider, Rate } from "antd";
import { PaystackButton, usePaystackPayment } from 'react-paystack';
import axiosCall from "../../utils/axiosCall";
import { v4 as uuid } from 'uuid';

import ReactPlayer from 'react-player';
import { connect } from "react-redux";

import AboutHero from "../../assets/images/homepage/club.jpg";

import Nav from "../../utils/nav";
import Footer from "../../utils/footer";
import AppRoute from '../../utils/routes';

const Club = props => {
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
        let productId = 1;
        axiosCall.get(`/findproductplan/${productId}`)
            .then(productPlans => {
                if (productPlans.data.statusMessage === "success") {
                    if (productPlans.data.message === null) {
                        setProductNotFound(true);
                    } else {
                        setProductPlans(productPlans.data.message);
                        let planAmount = productPlans.data.message.discount > 0 ? ((productPlans.data.message.discount * productPlans.data.message.price) / 100) : productPlans.data.message.price;
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
            // productPlanId: productPlans.id, productCart
            productPlanId: productCart,
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
            <div className="product-design">
                <div className="contain">
                    <div className="first-design-display">
                        <h3>Unlock the Power of African Dance Fitness and Reconnect with Your Cultural Roots – Transform Your
                            Fitness Routine with Dancerapy Club</h3>
                        {/* <img src={AboutHero} alt="about image" /> */}
                        <div>
                            <ReactPlayer width="100%" height="100%" playsinline={true}
                                url="https://dancerapyvideos.s3.amazonaws.com/club_2.mp4"
                                playing={false} controls={true} loop={true} />
                        </div>
                    </div>
                    <div>
                        <div className="product-story-block">
                            <p>Do you feel uninspired and unmotivated on your fitness journey?</p>
                            <p>Do you struggle to find time for exercise or feel isolated on your fitness journey?</p>
                            <p>Maybe you're looking for a fun and engaging way to get fit that aligns with your cultural
                                roots plus you would like to easily learn popular African dance trends in real-time ?</p>
                            <p> If any of these problems resonate with you, you're not alone.</p>
                            <p>Meet Funmi, a 28-year-old entrepreneur living in Lagos, Nigeria. Funmi has always been
                                interested in fitness, but she struggled to find a routine that worked for her busy
                                schedule.</p>

                            <p>Traditional exercise programs always felt boring and repetitive, and she found it hard
                                to stay motivated.</p>

                            <p>One day, Funmi stumbled upon Dancerapy Club.</p>
                        </div>
                    </div>
                </div>
                <Divider />
                <div>
                    <div className="contain">
                        <div className="product-story">
                            <div>
                                <div className="grid_2">
                                    <div>
                                        <p>She was intrigued by the idea of using dance as a form of exercise, and she was drawn to
                                            the African-Nigerian themed music that was featured in the videos.</p>
                                        <p>Funmi decided to give it a try and signed up for the Dancerapy Club Annual Online
                                            Subscription.</p>

                                        <p>At first, Funmi was nervous.</p>

                                        <p>She had never been much of a dancer, and she wasn't sure if she would be able to keep
                                            up with the routines.</p>

                                        <p>But as she started to follow along with the videos, something magical happened.</p>
                                        <p>
                                            <b>She found herself moving to the beat, feeling more confident and alive
                                                than she had in years.</b>
                                        </p>
                                        <p className="mb-0">With Dancerapy Club, Funmi was able to incorporate exercise into her daily routine
                                            in a way that felt fun and engaging.</p>
                                    </div>
                                    <div>
                                        {/* <img src={AboutHero} alt="about image" /> */}
                                        <div>
                                            <ReactPlayer width="100%" height="100%" playsinline={true}
                                                url="https://dancerapyvideos.s3.amazonaws.com/club_1.mp4"
                                                playing={false} controls={true} loop={true} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="grid_2 mobile-reverse">
                                    <div>
                                        <img src={AboutHero} alt="about image" />
                                    </div>
                                    <div>
                                        <p>She no longer dreaded her workouts – instead, she looked forward to them, excited to see what new moves she would learn.</p>
                                        <p>But Dancerapy Club was more than just a workout program for Funmi.</p>

                                        <p>It was a way to connect with her cultural roots and embrace her identity as an African woman.</p>

                                        <p>She loved the way that the African themed music made her feel connected to her
                                            heritage and inspired her to move in new and exciting ways.</p>
                                        <p>And the best part of Dancerapy Club, Funmi realized, was the community.</p>

                                        <p>She connected with other members online, sharing her progress and cheering on others on their fitness journeys.</p>

                                        <p className="mb-0">She felt like she was part of a supportive team that was all working towards the same goals.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="grid_2 mb-0">
                                    <div>
                                        <p>With Dancerapy Club, Funmi was able to transform her fitness routine and reconnect with her cultural roots.
                                            She felt more confident, energized, and alive than she had in years.</p>

                                        <p>If you're like Funmi and looking for a fun and engaging way to get fit, look no further than Dancerapy Club.
                                            Our comprehensive video library, African-Nigerian themed music, and supportive online
                                            community make it easy to achieve your fitness goals and feel great while doing it.</p>
                                        <p>With Dancerapy Club, you'll unlock the power of dance fitness and reconnect with your cultural roots.</p>
                                        <p className="mb-0">Don't wait – sign up for the Dancerapy Club Annual Online Subscription today and experience the joy and benefits of dance fitness for yourself.</p>
                                        <div className="desktop-only">
                                            {
                                                !props.auth.isAuthenticated ?
                                                    <button className="btn_red">Sign up now to get started</button>
                                                    :
                                                    <Dropdown className="dropme" class="helllos"
                                                        overlay={rentals}>
                                                        <button
                                                            className="btn_red" to="#">
                                                            Buy Plan
                                                        </button>
                                                    </Dropdown>
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <ReactPlayer width="100%" height="100%" playsinline={true}
                                                url="https://dancerapyvideos.s3.amazonaws.com/club-3.mp4"
                                                playing={false} controls={true} loop={true} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    !props.auth.isAuthenticated ?
                        <button className="btn_red full_width">Sign up now to get started</button>
                        :
                        <Dropdown className="dropme" class="helllos"
                            overlay={rentals}>
                            <button
                                style={{ width: '100%' }}
                                className="btn_red full_width" to="#">
                                Buy Plan
                            </button>
                        </Dropdown>
                }
            </div>
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
                                                        <p><span className="currency">NGN</span><NumberFormat value={(+productPlans.price).toFixed(2)} displayType={'text'} thousandSeparator={true}
                                                        /></p>
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
        </div >
    )
}

const mapStateToProps = store => {
    return { auth: store.auth }
}

export default connect(mapStateToProps)(Club);