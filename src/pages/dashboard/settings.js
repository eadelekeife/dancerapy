import "./dashboard.css";

import React, { useEffect, useRef, useState } from "react";

import { Controller, useForm } from 'react-hook-form';
import { Divider, Input, Tabs, Spin, Modal, notification } from 'antd';
import * as yup from 'yup';
import { LoadingOutlined } from '@ant-design/icons';
import axios from '../../utils/axiosCall';
import { connect } from "react-redux";
import { yupResolver } from '@hookform/resolvers/yup';
import { updateUser } from '../../utils/reducers/auth';
import { useNavigate } from "react-router";
import { v4 as uuid } from 'uuid';
import NumberFormat from 'react-number-format';

import TopNav from "./top-bar";
import SideBar from "./side-bar";
import Footer from "../../components/footer";

import CheckSymbol from "../../assets/images/illustrations/Check.png";
import ModalDisplay from "../../components/referral-modal";
import { _cancel_fund_user_wallet, _fetch_user_wallet, _fund_user_wallet_balance, _initiate_fund_user_wallet_balance, _update_basic_user_info, _update_password_from_settings } from "../../utils/axiosroutes";

import { usePaystackPayment } from 'react-paystack';
import AllAppRoutes from "../../utils/routes";
import FundWalletModal from "../../components/fund-wallet-modal";
import TokensModal from "../../components/tokens-modal";
import UserBalance from "../../components/balance-cover";

const ProfileSettings = props => {

    const navigate = useNavigate();
    const referralMessage = useRef();
    const paystackButton = useRef(null);
    const [loadingData, setLoadingData] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [size, setSize] = useState('small');
    const [loadPasswordUpdate, setLoadPasswordUpdate] = useState(false);
    const [loadPasswordError, setLoadPasswordError] = useState(false);

    const [loadUserUpdate, setLoadUserUpdate] = useState(false);
    const [loadUserError, setLoadUserError] = useState(false);
    const [openFundWalletModal, setOpenFundWalletModal] = useState(false);
    const [referralModal, setReferralModal] = useState(false);
    const [userWalletData, setUserWalletData] = useState({});
    const [loadingWalletData, setLoadingWalletData] = useState(true);
    const [loaderSpinning, setLoaderSpinning] = useState(false);
    const [topupAmount, setTopupAmount] = useState(0);
    const [inputTopupAmount, setInputTopupAmount] = useState(0);
    const [fundWalletStatus, setFundWalletStatus] = useState(false);
    const [userWalletInitializationKey, setUserWalletInitializationKey] = useState('');
    // const [loadingData, setLoadingData] = useState(false);


    // const publicKey = process.env.REACT_APP_DANCERAPY_PAYMENT_KEY;
    // const publicKey = "pk_live_76740464a53c7a4656f2eaca00433836d01f4e24";
    const publicKey = "pk_test_6001cfe393365d476119a4e494f32bcb1290cfea";
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

    const userValidator = yup.object().shape({
        emailAddress: yup.string().email('Email address is not valid').required('Email address field is required'),
        firstName: yup.string().required('First name field is required'),
        lastName: yup.string().required('Last name field is required'),
        phoneNumber: yup.string()
            .min(11, 'Please enter a valid phone number')
            .max(11, 'Please enter a valid phone number')
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

    const changePasswordValidator = yup.object().shape({
        // oldPassword: yup.string().min(6, 'Password can not be less than 6 characters').required('Please enter old password'),
        // newPassword: yup.string().min(6, 'Password can not be less than 6 characters').required('Please enter new password')
        oldPassword: yup.string().min(8).required('Password field can not be empty').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
        newPassword: yup.string().min(8).required('Password field can not be empty').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
    })
    const { handleSubmit: handleChangePassword, control: controlPasswordChange,
        formState: { errors: errorsChangePassword } } = useForm({
            resolver: yupResolver(changePasswordValidator)
        })


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
            console.log(err)
            openNotificationWithIcon('error', 'An error occurred while fetching wallet data. Please try again');
        }
    }
    useEffect(() => {
        fetchUserWalletBalance();
    }, [])

    const changePassword = async e => {
        setLoadPasswordUpdate(true);
        try {
            let newPass = await _update_password_from_settings({
                oldPassword: e.oldPassword,
                newPassword: e.newPassword
            });
            if (newPass.data.statusMessage === 'success') {
                openNotificationWithIcon('success', 'Password updated successfully');
                navigate(0);
            } else {
                setLoadPasswordError(newPass.data.summary);
                setLoadPasswordUpdate(false);
            }
        } catch (err) {
            setLoadPasswordError('An error occurred. Please try again later');
            setLoadPasswordUpdate(false);
        }
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

    const updateUserInfo = async e => {
        setLoadUserUpdate(true);
        let { emailAddress, firstName, lastName, phoneNumber } = e;
        try {
            let updateUser = await _update_basic_user_info({ emailAddress, firstName, lastName, phoneNumber });
            if (updateUser.data.statusMessage === "success") {
                openNotificationWithIcon('success', 'Data updated successfully');
                props.updateUser(updateUser.data.message);
                navigate(0);
            } else {
                setLoadUserError(updateUser.data.summary);
                setLoadUserUpdate(false);
            }
        } catch (err) {
            setLoadUserError('An error occurred. Please try again later');
            setLoadUserUpdate(false);
        }
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


    const componentProps = {
        email: userData.emailAddress,
        // email: 'eadelekeife@yahoo.com',
        amount: topupAmount + '00',
        metadata: {
            name: userData.firstName + ' ' + userData.lastName,
            phone: userData?.phoneNumber,
        },
        publicKey,
        text: `Complete Order`,
        onSuccess: e => completeUserFundWallet(e),
        onClose: () => {
            // setIsModalOpen(false);
            openNotificationWithIcon('error', 'Transaction cancelled')
        },
    }
    // paystack
    const onSuccess = (reference) => completeUserFundWallet(reference);

    // you can call this function anything
    const onClose = (reference) => cancelFundWallet(reference);

    const paystackConfig = {
        reference: (new Date()).getTime().toString(),
        email: userData.emailAddress,
        amount: topupAmount + '00', //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: 'pk_test_6001cfe393365d476119a4e494f32bcb1290cfea',
    };
    const initializePayment = usePaystackPayment(paystackConfig);


    const loadModalSpinner = () => {
        console.log('rrerer')
        setLoadingData(!loadingData);
    }
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
                                <div className="">
                                    <div className="white-dash-grid">
                                        <div className="">
                                            <div className="mobile-only">
                                                <div className="white-dash-data">
                                                    <UserBalance />
                                                </div>
                                            </div>
                                            <div className="white-dash-data">
                                                <h5 className="white-dash-title">Update Profile Data</h5>
                                                <Tabs type="card">
                                                    <Tabs.TabPane tab="Basic settings" key="1">
                                                        <div className="width_7">
                                                            {loadUserError ?
                                                                <p className="errorMessage">{loadUserError}</p> : ''
                                                            }
                                                            <form onSubmit={handleSubmit(updateUserInfo)}>
                                                                <div className="form_flex">
                                                                    <div className="form-group space">
                                                                        <label htmlFor="firstName">First name</label>
                                                                        <Controller name="firstName" control={control} defaultValue={props.auth.userDetails.firstName}
                                                                            render={({ field }) => {
                                                                                return (
                                                                                    <Input style={{ height: '5rem' }} type="text" {...field}
                                                                                        name="firstName" />
                                                                                )
                                                                            }} />
                                                                        {errors.firstName && <p className="errorMessage">{errors.firstName.message}</p>}
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label htmlFor="lastName">Last name</label>
                                                                        <Controller name="lastName" control={control} defaultValue={props.auth.userDetails.lastName}
                                                                            render={({ field }) => {
                                                                                return (
                                                                                    <Input style={{ height: '5rem' }} type="text" {...field}
                                                                                        name="lastName" />
                                                                                )
                                                                            }} />
                                                                        {errors.lastName && <p className="errorMessage">{errors.lastName.message}</p>}
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="phoneNumber">Phone number</label>
                                                                    <Controller name="phoneNumber" control={control} defaultValue={props.auth.userDetails.phoneNumber}
                                                                        render={({ field }) => {
                                                                            return (
                                                                                <Input type="tel" style={{ height: '5rem' }} {...field}
                                                                                    name="phoneNumber" />
                                                                            )
                                                                        }} />
                                                                    {errors.phoneNumber && <p className="errorMessage">{errors.phoneNumber.message}</p>}
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="emailAddress">Email address</label>
                                                                    <Controller name="emailAddress" control={control} defaultValue={props.auth.userDetails.emailAddress}
                                                                        render={({ field }) => {
                                                                            return (
                                                                                <Input style={{ height: '5rem' }} disabled type="email" {...field}
                                                                                    name="emailAddress" />
                                                                            )
                                                                        }} />
                                                                    {errors.emailAddress && <p className="errorMessage">{errors.emailAddress.message}</p>}
                                                                </div>
                                                                <div style={{ marginTop: '5%', display: 'block' }}></div>
                                                                {
                                                                    !loadUserUpdate ?
                                                                        <button type="submit"
                                                                            className="btn-red"
                                                                            style={{ display: 'block', borderRadius: '4px' }}
                                                                            id="submit-form">Update profile</button>
                                                                        :
                                                                        <button id="submit-form" className="btn-red"
                                                                            style={{ display: 'block', borderRadius: '4px' }}
                                                                            disabled><Spin indicator={antIcon} /></button>
                                                                }
                                                            </form>
                                                        </div>
                                                    </Tabs.TabPane>
                                                    <Tabs.TabPane tab="Change Password" key="2">
                                                        <div className="width_7">
                                                            {loadPasswordError ?
                                                                <p className="errorMessage">{loadPasswordError}</p> : ''
                                                            }
                                                            <form onSubmit={handleChangePassword(changePassword)}>
                                                                <div className="form-group">
                                                                    <label htmlFor="oldPassword">Old Password</label>
                                                                    <Controller name="oldPassword" control={controlPasswordChange} defaultValue=""
                                                                        render={({ field }) => {
                                                                            return (
                                                                                <Input.Password style={{ height: '5rem' }} type="password" {...field}
                                                                                    name="oldPassword" />
                                                                            )
                                                                        }} />
                                                                    {errorsChangePassword.oldPassword && <p className="errorMessage">{errorsChangePassword.oldPassword.message}</p>}
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="newPassword">New Password</label>
                                                                    <Controller name="newPassword" control={controlPasswordChange} defaultValue=""
                                                                        render={({ field }) => {
                                                                            return (
                                                                                <Input.Password type="password" style={{ height: '5rem' }} {...field}
                                                                                    name="newPassword" />
                                                                            )
                                                                        }} />
                                                                    {errorsChangePassword.newPassword && <p className="errorMessage">{errorsChangePassword.newPassword.message}</p>}
                                                                </div>
                                                                <div style={{ marginTop: '5%', display: 'block' }}></div>
                                                                {
                                                                    !loadPasswordUpdate ?
                                                                        <button type="submit"
                                                                            className="btn-red"
                                                                            style={{ display: 'block', borderRadius: '4px' }}
                                                                            id="submit-form">Update password</button>
                                                                        :
                                                                        <button id="submit-form"
                                                                            className="btn-red"
                                                                            style={{ display: 'block', borderRadius: '4px' }}
                                                                            disabled><Spin indicator={antIcon} /></button>
                                                                }
                                                            </form>
                                                        </div>
                                                    </Tabs.TabPane>
                                                </Tabs>
                                            </div>
                                        </div>
                                        <div className="white-dash-data side">
                                            <ModalDisplay />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt_5"></div>
                            </div>
                        </div>
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
                                        <p>Invite a friend to Dancerapy and earn 0.25% on all their
                                            transactions. This is a total of all the assets you have in your portfolio</p>
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
                                            // <PaystackButton className="btn-red" {...componentProps} />
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
                <div className="mobile-only">
                    <Footer noMargin={true} />
                </div>
            </Spin>
            <button ref={paystackButton} className="paystack-button" onClick={() => {
                initializePayment(onSuccess, onClose)
            }}>Paystack Hooks Implementation</button>
        </div>
    )
}

const mapStateToProps = state => {
    return { auth: state.auth }
}

export default connect(mapStateToProps, { updateUser })(ProfileSettings);