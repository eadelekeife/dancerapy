import "./dashboard.css";

import React, { useEffect, useRef, useState } from "react";

import { Controller, useForm } from 'react-hook-form';
import { Divider, Input, Tabs, Spin, Modal, notification } from 'antd';
import { Link } from "react-router-dom";
import * as yup from 'yup';
import { LoadingOutlined } from '@ant-design/icons';
import axios from '../../utils/axiosCall';
import { connect } from "react-redux";
import { yupResolver } from '@hookform/resolvers/yup';
import { updateUser } from '../../utils/reducers/auth';
import { useNavigate } from "react-router";
import { v4 as uuid } from 'uuid';
import NumberFormat from 'react-number-format';
import { ReactComponent as AvatarIcon } from "../../assets/images/icons/Avatar.svg";

import TopNav from "./top-bar";
import SideBar from "./side-bar";
import Footer from "../../components/footer";

import WalletImg from "../../assets/images/illustrations/14_rhombus.png";
import TokenImg from "../../assets/images/illustrations/17_soap.png";
import User1 from "../../assets/images/illustrations/user-1.png";
import { ReactComponent as PlusIcon } from "../../assets/images/icons/pluc-circle-r.svg";
import { ReactComponent as WalletIcon } from "../../assets/images/icons/wallet-t-cropped.svg";
import { ReactComponent as SignOutIcon } from "../../assets/images/icons/log-out-cropped.svg";

import CheckSymbol from "../../assets/images/illustrations/Check.png";

import { ReactComponent as Calendar } from "../../assets/images/icons/pie-chart -cropped.svg";
import { ReactComponent as ArchiveIcon } from "../../assets/images/icons/archive-cropped.svg";
import { ReactComponent as Settings } from "../../assets/images/icons/settings-cropped.svg";
import { ReactComponent as MerchandiseIcon } from "../../assets/images/icons/shopping-bag-cropped.svg";

import { _cancel_fund_user_wallet, _cancel_user_subscription, _complete_user_subscription, _complete_user_subscription_with_wallet, _fetch_subscription_plans, _fetch_user_wallet, _fund_user_wallet_balance, _initiate_fund_user_wallet_balance, _initiate_user_subscription, _initiate_user_subscription_with_wallet } from "../../utils/axiosroutes";

import { usePaystackPayment } from 'react-paystack';
import AllAppRoutes from "../../utils/routes";

const Dashboard = props => {

    const navigate = useNavigate();
    const referralMessage = useRef();
    const paystackButton = useRef(null);
    const fundWalletPaystackButton = useRef(null);
    const [loadingData, setLoadingData] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [size, setSize] = useState('small');
    const [loadPasswordUpdate, setLoadPasswordUpdate] = useState(false);
    const [loadPasswordError, setLoadPasswordError] = useState(false);

    const [loadUserUpdate, setLoadUserUpdate] = useState(false);
    const [loadUserError, setLoadUserError] = useState(false);
    const [openFundWalletModal, setOpenFundWalletModal] = useState(false);
    const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
    const [subscriptionPlans, setSubscriptionPlans] = useState([]);
    const [selectedSubscriptionPackage, setSelectedSubscriptionPackage] = useState({});
    const [activeSubPackage, setActiveSubPackage] = useState(0);
    const [referralModal, setReferralModal] = useState(false);
    const [userWalletData, setUserWalletData] = useState({});
    const [loadingWalletData, setLoadingWalletData] = useState(true);
    const [loaderSpinning, setLoaderSpinning] = useState(false);
    const [topupAmount, setTopupAmount] = useState(0);
    const [inputTopupAmount, setInputTopupAmount] = useState(0);
    const [fundWalletStatus, setFundWalletStatus] = useState(false);
    const [userWalletInitializationKey, setUserWalletInitializationKey] = useState('');

    const [uuidv4] = useState(uuid());
    const [amount, setAmount] = useState(0); // Remember, set in kobo!
    const [userData] = useState(props.auth.isAuthenticated ? props.auth.userDetails : '');

    const onChange = (e) => {
        setSize(e.target.value);
    };

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };

    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;
    const spinnerIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

    const digitsOnly = (value) => /^\d+$/.test(value);
    const signupValidator = yup.object().shape({
        emailAddress: yup.string().email('Please enter a valid email address').required('Please enter your email address'),
        password: yup.string().required('Please enter your password'),
        firstName: yup.string().required('Please enter your first name'),
        lastName: yup.string().required('Please enter your last name')
    })

    const userValidator = yup.object().shape({
        emailAddress: yup.string().email('Email address is not valid').required('Email address field is required'),
        firstName: yup.string().required('First name field is required'),
        lastName: yup.string().required('Last name field is required'),
        phoneNumber: yup.string()
            .min(9, 'Please enter a valid phone number')
            .required('Phone number field is required')
            .test('Digits only', 'The field should have digits only', digitsOnly)
            .nullable()
    })
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(userValidator)
    });

    const fundWalletValidator = yup.object().shape({
        emailAddress: yup.string().email('Email is not valid').required('Email field can not be empty'),
        password: yup.string().min(6).required('Password field can not be empty')
    })

    const { handleSubmit: handleFundWalletSubmit, control: controlFundWallet,
        formState: { errors: errorsFundWallet }, setValue: setFundWalletValue } = useForm({
            defaultValue: {
                emailAddress: "",
                password: "",
            },
            resolver: yupResolver(fundWalletValidator)
        });


    const fetchUserWalletBalance = async e => {
        try {
            let userWallet = await _fetch_user_wallet();
            if (userWallet.data.statusMessage === "success") {
                setUserWalletData(userWallet.data.message);
                setLoadingWalletData(false);
            } else {
                openNotificationWithIcon('error', 'An error occurred while fetching wallet data. Please try again');
            }
        } catch (err) {
            openNotificationWithIcon('error', 'An error occurred while fetching wallet data. Please try again');
        }
    }
    const fetchSubscriptionData = async () => {
        setLoadingData(true);
        try {
            let subPlans = await _fetch_subscription_plans();
            if (subPlans.data.statusMessage === "success") {
                setSubscriptionPlans(subPlans.data.message);
                let planIndex;
                subPlans.data.message.find((plan, index) => {
                    if (plan.duration === 12) planIndex = index
                })
                setActiveSubPackage(planIndex);
                setLoadingData(false);
                setSelectedSubscriptionPackage(subPlans.data.message[planIndex]);
                setOpenSubscriptionModal(true);
            } else {
                setLoadingData(false);
                openNotificationWithIcon('error', subPlans.data.summary);
            }
        } catch (err) {
            console.log(err)
            setLoadingData(false);
            openNotificationWithIcon('error', 'An error occurred while fetching subscription plans. Please reload page to try again');
        }
    }
    useEffect(() => {
        fetchUserWalletBalance();
    }, [])

    const changePassword = e => {
        setLoadPasswordUpdate(true);
        axios.post('/user/update-password', {
            oldPassword: e.oldPassword,
            newPassword: e.newPassword
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(data => {
                if (data.data.statusMessage === 'success') {
                    navigate(0)
                    // history.go(0);
                } else {
                    setLoadPasswordError(data.data.summary);
                    setLoadPasswordUpdate(false);
                }
            })
            .catch(err => {
                console.log(err)
                setLoadPasswordError('An error occurred. Please try again later');
                setLoadPasswordUpdate(false);
            })
    }

    const copyReferralMessage = () => {
        // referralMessage.current.focus().select();
        // document.execCommand('copy');
        // console.log(message)
    }

    const quickEnterPaymentOption = e => {
        setTopupAmount(e);
        setInputTopupAmount(e);
    }

    const fundWallet = e => {

    }

    const updateUserInfo = e => {
        setLoadUserUpdate(true);
        let { emailAddress, firstName, lastName, phoneNumber } = e;
        axios.post('/user/update-profile', {
            emailAddress, firstName, lastName, phoneNumber
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(data => {
                if (data.data.statusMessage === 'success') {
                    props.updateUser(data.data.message);
                    navigate(0);
                } else {
                    setLoadUserError(data.data.summary);
                    setLoadUserUpdate(false);
                }
            })
            .catch(err => {
                setLoadUserError('An error occurred. Please try again later');
                setLoadUserUpdate(false);
            })
    }

    const initiateFundWallet = async e => {
        setLoadingData(true);
        try {
            let fundUserWallet = await _initiate_fund_user_wallet_balance({ amount: topupAmount });
            if (fundUserWallet.data.statusMessage === "success") {
                localStorage.setItem('prevSetInitializationKey', fundUserWallet.data.message)
                paystackButton.current.click();
                // openNotificationWithIcon('success', 'Wallet');
            } else {
                setLoadingData(false);
                openNotificationWithIcon('error', fundUserWallet?.data?.summary);
            }
        } catch (err) {
            setLoadingData(false);
            openNotificationWithIcon('error', 'An error occurred while trying to fund your wallet. Please try again.');
        }
    }

    const cancelFundWallet = async () => {
        setLoadingData(true);
        try {
            let fundUserWallet = await _cancel_fund_user_wallet({
                transactionKey: (new Date()).getTime().toString(),
                walletTransId: localStorage.getItem('prevSetInitializationKey')
            });
            if (fundUserWallet.data.statusMessage === "success") {
                setLoadingData(false);
                localStorage.removeItem('prevSetInitializationKey');
                openNotificationWithIcon('error', 'Transaction cancelled');
            } else {
                setLoadingData(false);
                openNotificationWithIcon('error', 'Transaction cancelled');
            }
        } catch (err) {
            setLoadingData(false);
            openNotificationWithIcon('error', 'Transaction cancelled');
            // openNotificationWithIcon('error', 'An error occurred while trying to fund your wallet. Please try again.');
        }
    }

    const completeUserFundWallet = async paymentData => {
        setOpenFundWalletModal(false);
        if (paymentData?.status === "success") {
            setLoaderSpinning(true)
            try {
                let userPaymentData = {
                    amount: topupAmount,
                    transactionKey: paymentData?.trxref,
                    walletTransId: localStorage.getItem('prevSetInitializationKey')
                };
                let fundUserWallet = await _fund_user_wallet_balance(userPaymentData);
                if (fundUserWallet.data.statusMessage === "success") {
                    localStorage.removeItem('prevSetInitializationKey');
                    // setInputTopupAmount(0);
                    // setFundWalletStatus(true);
                    localStorage.setItem('topupAmount', fundUserWallet.data.message.balance);
                    localStorage.setItem('userWalletBalance', fundUserWallet.data.message.balance);
                    navigate(AllAppRoutes.profileFundWalletSuccess);
                    // setUserWalletData(fundUserWallet.data.message);
                    // setLoadingData(false);
                } else {
                    setLoadingData(false);
                    openNotificationWithIcon('error', fundUserWallet?.data?.summary);
                }
            } catch (err) {
                setLoadingData(false);
                openNotificationWithIcon('error', 'An error occurred while funding your wallet. Please try again or reach out to us if you have been debited.');
            }
        } else {
            openNotificationWithIcon('error', 'We could not process payment. Please try again.');
        }
    }

    const initiateUserSubscription = async e => {
        setLoadingData(true);
        try {
            let initiateSubscription = await _initiate_user_subscription({
                subscriptionPackageId: selectedSubscriptionPackage._id,
                amount: selectedSubscriptionPackage.amount,
                couponDiscount: 0
            });
            if (initiateSubscription.data.statusMessage === "success") {
                localStorage.setItem('subscriptionInitializationKey', initiateSubscription.data.message)
                fundWalletPaystackButton.current.click();
                setOpenSubscriptionModal(false);
            } else {
                setLoadingData(false);
                openNotificationWithIcon('error', initiateSubscription?.data?.summary);
            }
        } catch (err) {
            setLoadingData(false);
            openNotificationWithIcon('error', 'An error occurred while completing transaction. Please try again');
        }
    }

    const completeUserSubscription = async paymentData => {
        setOpenFundWalletModal(false);
        if (paymentData?.status === "success") {
            setLoaderSpinning(true)
            try {
                let userPaymentData = {
                    subscriptionPackageId: selectedSubscriptionPackage._id,
                    subscriptionId: localStorage.getItem('subscriptionInitializationKey'),
                    transactionKey: paymentData?.trxref,
                };
                let completeUserSubscription = await _complete_user_subscription(userPaymentData);
                if (completeUserSubscription.data.statusMessage === "success") {
                    localStorage.removeItem('subscriptionInitializationKey');
                    localStorage.setItem('subscriptionAmount', completeUserSubscription.data.message.amount);
                    localStorage.setItem('subscriptionDuration', completeUserSubscription.data.message.duration);
                    localStorage.setItem('subscriptionDurationTitle', completeUserSubscription.data.message.name);
                    navigate(AllAppRoutes.profileSubscriptionSuccess);
                } else {
                    setLoadingData(false);
                    openNotificationWithIcon('error', completeUserSubscription?.data?.summary);
                }
            } catch (err) {
                setLoadingData(false);
                openNotificationWithIcon('error', 'An error occurred while completing your subscription. Please try again or reach out to us if your account has been debited.');
            }
        } else {
            openNotificationWithIcon('error', 'We could not process payment. Please try again.');
        }
    }

    const cancelUserSubscription = async () => {
        setLoadingData(true);
        try {
            let subscribeUser = await _cancel_user_subscription({
                transactionKey: (new Date()).getTime().toString(),
                subscriptionId: localStorage.getItem('subscriptionInitializationKey')
            });
            if (subscribeUser.data.statusMessage === "success") {
                setLoadingData(false);
                localStorage.removeItem('subscriptionInitializationKey');
                openNotificationWithIcon('error', 'Transaction cancelled');
            } else {
                setLoadingData(false);
                openNotificationWithIcon('error', 'Transaction cancelled');
            }
        } catch (err) {
            setLoadingData(false);
            openNotificationWithIcon('error', 'Transaction cancelled');
        }
    }

    const completeUserSubscriptionWithWallet = async paymentData => {
        setOpenFundWalletModal(false);
        setLoaderSpinning(true)
        try {
            let userPaymentData = {
                subscriptionPackageId: selectedSubscriptionPackage._id,
                subscriptionId: paymentData,
                transactionKey: (new Date()).getTime().toString(),
            };
            let completeUserSubscription = await _complete_user_subscription_with_wallet(userPaymentData);
            if (completeUserSubscription.data.statusMessage === "success") {
                localStorage.removeItem('subscriptionInitializationKey');
                localStorage.setItem('subscriptionAmount', completeUserSubscription.data.message.amount);
                localStorage.setItem('subscriptionDuration', completeUserSubscription.data.message.duration);
                localStorage.setItem('subscriptionDurationTitle', completeUserSubscription.data.message.name);
                navigate(AllAppRoutes.profileSubscriptionSuccess);
            } else {
                setLoadingData(false);
                openNotificationWithIcon('error', completeUserSubscription?.data?.summary);
            }
        } catch (err) {
            console.log(err)
            setLoadingData(false);
            openNotificationWithIcon('error', 'An error occurred while completing your subscription. Please try again or reach out to us if your account has been debited.');
        }
    }

    const initiateUserSubscriptionWithWallet = async e => {
        setLoadingData(true);
        try {
            let initiateSubscription = await _initiate_user_subscription_with_wallet({
                subscriptionPackageId: selectedSubscriptionPackage._id,
                amount: selectedSubscriptionPackage.amount,
                couponDiscount: 0
            });
            if (initiateSubscription.data.statusMessage === "success") {
                localStorage.setItem('subscriptionInitializationKey', initiateSubscription.data.message)
                // fundWalletPaystackButton.current.click();
                completeUserSubscriptionWithWallet(initiateSubscription.data.message);
                setOpenSubscriptionModal(false);
            } else {
                setLoadingData(false);
                openNotificationWithIcon('error', initiateSubscription?.data?.summary);
            }
        } catch (err) {
            setLoadingData(false);
            openNotificationWithIcon('error', 'An error occurred while completing transaction. Please try again');
        }
    }

    // paystack
    const onSuccess = (reference) => completeUserFundWallet(reference);
    const onSuccessUserSubscription = (reference) => completeUserSubscription(reference);

    // you can call this function anything
    const onClose = (reference) => cancelFundWallet(reference);
    const onCloseUserSubscription = (reference) => cancelUserSubscription(reference);

    const paystackConfig = {
        reference: (new Date()).getTime().toString(),
        email: userData.emailAddress,
        amount: topupAmount + '00', //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: process.env.REACT_APP_DANCERAPY_PAYMENT_KEY,
    };
    const paystackSubConfig = {
        reference: (new Date()).getTime().toString(),
        email: userData.emailAddress,
        amount: +selectedSubscriptionPackage.amount + '00', //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: process.env.REACT_APP_DANCERAPY_PAYMENT_KEY,
    };
    const initializePayment = usePaystackPayment(paystackConfig);
    const initializeSubscriptionPayment = usePaystackPayment(paystackSubConfig);

    return (
        <div>
            <Spin spinning={loadingData} indicator={spinnerIcon}>
                <div className="dashboard-profile">
                    <TopNav pageTitle="Account Overview" />
                    <div className="dash-side-bar">
                        <SideBar />
                    </div>
                    <div className="dash-main-div">
                        <div className="contain">
                            <div className="dash-main-content">
                                <div className="dash-overview">
                                    <div className="dash-data-block">
                                        <div className="dash-text-block">
                                            <div className="avatar-cover">
                                                {/* <AvatarIcon /> */}
                                                <img src={User1} alt="user avatar" className="user-avatar" />
                                            </div>
                                            <div>
                                                <h2>{`${userData.firstName} ${userData.lastName}`}</h2>
                                                <p>{userData.referralCode}</p>
                                                <div className="btn-dash-array">
                                                    <button
                                                        className="btn-green curve" onClick={() => fetchSubscriptionData()}><WalletIcon /> Subscribe</button>
                                                    <button
                                                        className="btn-green curve" onClick={() => setOpenFundWalletModal(true)}><PlusIcon /> Fund Wallet</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid-2">
                                            <div className="data-block-sec">
                                                <div className="grid-2">
                                                    <div>
                                                        {/* <h3><small>expires -</small> </h3> */}
                                                        <h3>&mdash;</h3>
                                                        {/* <h3 className="balance-display"><span className="currency">NGN </span>{!loadingWalletData ? ((+userWalletData?.balance)?.toFixed(2)?.split('.')[0]) : '-'}.<span>{userWalletData?.balance ? ((+userWalletData?.balance)?.toFixed(2)?.split('.')[1]) : '00'}</span></h3> */}
                                                        <p>Active Subscription</p>
                                                    </div>
                                                    <div>
                                                        <img src={WalletImg} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="data-block-sec">
                                                <div className="grid-2">
                                                    <div>
                                                        <h3 className="balance-display"><span className="currency">NGN </span>{!loadingWalletData ? ((+userWalletData?.balance)?.toFixed(2)?.split('.')[0]) : '-'}.<span>{userWalletData?.balance ? ((+userWalletData?.balance)?.toFixed(2)?.split('.')[1]) : '00'}</span></h3>
                                                        <p>Wallet Balance</p>
                                                    </div>
                                                    <div>
                                                        <img src={TokenImg} alt="" />
                                                    </div>
                                                </div>
                                                {/* <div className="grid-2">
                                                    <div>
                                                        <h3>{!loadingWalletData ? userWalletData?.tokens : '-'}</h3>
                                                        <p>Token Balance</p>
                                                    </div>
                                                    <div>
                                                        <img src={TokenImg} alt="" />
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="data-block">
                                            <div className="data-block-sec">
                                                <Link to={AllAppRoutes.profileSettings}>
                                                    <Settings className="side-nav-icon _1" /><span>Update Profile Data</span>
                                                </Link>
                                            </div>
                                            <div className="data-block-sec">
                                                <Link to={AllAppRoutes.profileTransactionHistory}>
                                                    <ArchiveIcon className="side-nav-icon" /><span>Transaction History</span>
                                                </Link>
                                            </div>
                                            <div className="data-block-sec">
                                                <Link to={AllAppRoutes.videoViewsAnalytics}>
                                                    <Calendar className="side-nav-icon" /><span>Video Analytics</span>
                                                </Link>
                                            </div>
                                            <div className="data-block-sec">
                                                <Link to={AllAppRoutes.profileMerchandise}>
                                                    <MerchandiseIcon className="side-nav-icon" /><span>Merchandise Orders</span>
                                                </Link>
                                            </div>
                                            <div className="data-block-sec logout">
                                                <Link to={AllAppRoutes.sign_out}>
                                                    <SignOutIcon className="side-nav-icon _1" /><span>Log Out</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt_5"></div>
                            </div>
                        </div>
                        {/* <div className="fund-wallet-dashboard-button">
                            <button onClick={() => fetchSubscriptionData()}>Subscribe</button>
                            <div className="mt-4"></div>
                            <button onClick={() => setOpenFundWalletModal(true)}>
                                <PlusIcon /><span>Fund Wallet</span></button>
                        </div> */}
                    </div>
                </div>
                <Modal open={openFundWalletModal} footer={null} onCancel={() => {
                    setFundWalletStatus(false)
                    setOpenFundWalletModal(false)
                }}>
                    <div className="">
                        {
                            !fundWalletStatus ?
                                <div>
                                    <div className="fund-modal-content">
                                        <h3>Fund Wallet</h3>
                                        <p>Take a step closer to dance fitness bliss. Add funds to your wallet now and 
                                            keep saving up to have enough to complete your subscription.
                                        </p>
                                        {/* <p>Invite a friend to Dancerapy and earn 0.25% on all their
                                            transactions. This is a total of all the assets you have in your portfolio</p> */}
                                    </div>
                                    <form onSubmit={handleFundWalletSubmit(fundWallet)}>
                                        <div className="form-group">
                                            <label>Quick Select</label>
                                            <div className="grid-4 fund-wallet-quick-button">
                                                <button onClick={() => quickEnterPaymentOption(500)}><span className="currency">NGN</span>500</button>
                                                <button onClick={() => quickEnterPaymentOption(2000)}><span className="currency">NGN</span>2,000</button>
                                                <button onClick={() => quickEnterPaymentOption(5000)}><span className="currency">NGN</span>5,000</button>
                                                <button onClick={() => quickEnterPaymentOption(10000)}><span className="currency">NGN</span>10,000</button>
                                                <button onClick={() => quickEnterPaymentOption(20000)}><span className="currency">NGN</span>20,000</button>
                                                <button onClick={() => quickEnterPaymentOption(30000)}><span className="currency">NGN</span>30,000</button>
                                                <button onClick={() => quickEnterPaymentOption(50000)}><span className="currency">NGN</span>50,000</button>
                                                <button onClick={() => quickEnterPaymentOption(100000)}><span className="currency">NGN</span>100,000</button>
                                            </div>
                                        </div>
                                        <Divider>OR</Divider>
                                        <div className="form-group">
                                            <label htmlFor="amountToTopUp">Enter Amount</label>
                                            <Controller name="amountToTopUp" control={controlFundWallet}
                                                render={({ field }) => {
                                                    return (
                                                        // <NumberFormat style={{ height: '5rem' }} type="email" {...field}
                                                        //     onInput={e => {
                                                        //         if (e.target.value.includes('NGN')) {
                                                        //             setTopupAmount(e.target.value.slice(3).split(',').join(''));
                                                        //             setInputTopupAmount(e.target.value);
                                                        //         } else {
                                                        //             setTopupAmount(e.target.value);
                                                        //             setInputTopupAmount(e.target.value);
                                                        //         }
                                                        //     }}
                                                        //     value={inputTopupAmount} name="amountToTopUp" />
                                                        <NumberFormat thousandSeparator={true}
                                                            prefix={'NGN '}
                                                            className="numeric"
                                                            // onInput={e => onChangeValue(e)}
                                                            onInput={e => {
                                                                if (e.target.value.includes('NGN')) {
                                                                    setTopupAmount(e.target.value.slice(3).split(',').join(''));
                                                                    setInputTopupAmount(e.target.value);
                                                                } else {
                                                                    setTopupAmount(e.target.value);
                                                                    setInputTopupAmount(e.target.value);
                                                                }
                                                            }} value={inputTopupAmount}
                                                            style={{ height: '5rem', width: '100%' }} />
                                                    )
                                                }} />
                                            {errorsFundWallet.amountToTopUp && <p className="errorMessage">{errorsFundWallet.amountToTopUp.message}</p>}
                                        </div>
                                        {
                                            loadingData
                                                ?
                                                <button className="btn-red" disabled>
                                                    <Spin indicator={antIcon} /></button>
                                                :
                                                <button
                                                    onClick={initiateFundWallet}
                                                    className="btn-red">Fund Wallet</button>
                                        }
                                    </form>
                                </div> :
                                <div className="center-div fund-wallet-successful">
                                    <div className="contain">
                                        <img src={CheckSymbol} className="checkmark" alt="checkmark symbol" />
                                        <h4>Top-Up Successful</h4>
                                        <p>Your top-up of <span className="currency">NGN</span>{topupAmount} was
                                            successful and your new wallet balance is <span className="currency">NGN</span>{userWalletData?.balance}. Invite a friend to
                                            Dancerapy and earn 0.25% on all their transactions. This is a total of all the
                                            assets you have in your portfolio</p>
                                        <button
                                            onClick={() => {
                                                setFundWalletStatus(false);
                                                setOpenFundWalletModal(false);
                                            }}
                                            className="btn-red">Continue</button>
                                    </div>
                                </div>
                        }
                    </div>
                </Modal>

                <Modal open={openSubscriptionModal} footer={null} onCancel={() => {
                    setOpenSubscriptionModal(false)
                }}>
                    <div className="">
                        <div>
                            <div className="fund-modal-content">
                                <h3>Start Your Fitness Journey Today!</h3>
                                <p>Subscribe now and embark on a journey to better health, a more 
                                    confident you, and loads of fun. Let's dance our way to fitness together!</p>
                                {/* <p>Invite a friend to Dancerapy and earn 0.25% on all their
                                    transactions. This is a total of all the assets you have in your portfolio</p> */}
                            </div>
                            <form onSubmit={handleFundWalletSubmit(fundWallet)}>
                                <div>
                                    <div className="grid-3">
                                        {
                                            subscriptionPlans.map((subPlans, index) => (
                                                <div key={index}
                                                    onClick={() => {
                                                        setSelectedSubscriptionPackage(subPlans)
                                                        setActiveSubPackage(index)
                                                    }}
                                                    className={`sub-card ${activeSubPackage === index ? 'active' : ''}`}>
                                                    <div className="subscription-card">
                                                        <h3><span className="currency">NGN </span>
                                                            <NumberFormat thousandSeparator={true}
                                                                prefix={''} displayType="text"
                                                                className="numeric" value={subPlans.amount.toFixed(2)} /></h3>
                                                        <p>{subPlans.name}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="mt-5"></div>
                                    {
                                        !loadingData ?
                                            <button
                                                onClick={() => initiateUserSubscription()}
                                                className="btn-red curve full_width">Subscribe with Card</button>
                                            :
                                            <button disabled
                                                className="btn-red curve full_width"><Spin indicator={antIcon} /></button>
                                    }
                                    <div className="mt-3"></div>
                                    {
                                        !loadingData ?
                                            <button
                                                onClick={() => initiateUserSubscriptionWithWallet()}
                                                className="btn-border-red curve full_width">Subscribe with Wallet Balance</button>
                                            :
                                            <button disabled
                                                className="btn-border-red curve full_width"><Spin indicator={antIcon} /></button>
                                    }
                                    <button
                                        onClick={() => setOpenSubscriptionModal(false)}
                                        className="btn-white full_width">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
                <div className="mobile-only">
                    <Footer noMargin={true} />
                </div>
            </Spin >
            <button ref={paystackButton} className="paystack-button" onClick={() => {
                initializePayment(onSuccess, onClose)
            }}>Paystack Hooks Implementation</button>
            <button ref={fundWalletPaystackButton} className="paystack-button" onClick={() => {
                initializeSubscriptionPayment(onSuccessUserSubscription, onCloseUserSubscription)
            }}>Paystack Hooks Implementation</button>
        </div >
    )
}

const mapStateToProps = state => {
    return { auth: state.auth }
}

export default connect(mapStateToProps, { updateUser })(Dashboard);