import React, { useRef, useState } from "react";

import { connect } from "react-redux";

import { yupResolver } from '@hookform/resolvers/yup';
import { updateUser } from '../utils/reducers/auth';
import * as yup from 'yup';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router";
import { v4 as uuid } from 'uuid';
import NumberFormat from 'react-number-format';
import { Divider, Input, Tabs, Spin, Modal, notification } from 'antd';
import { Controller, useForm } from "react-hook-form";

import { usePaystackPayment } from 'react-paystack';
import AllAppRoutes from "../utils/routes";

import ReferImage from "../assets/images/illustrations/credit_card.png";

import { _cancel_fund_user_wallet, _fund_user_wallet_balance, _initiate_fund_user_wallet_balance } from "../utils/axiosroutes";

const ModalDisplay = props => {
    const referralMessage = useRef();
    const paystackButton = useRef(null);
    const navigate = useNavigate();
    const [referralModal, setReferralModal] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [inputTopupAmount, setInputTopupAmount] = useState(0);
    const [openFundWalletModal, setOpenFundWalletModal] = useState(false);
    const [fundWalletStatus, setFundWalletStatus] = useState(false);
    const [topupAmount, setTopupAmount] = useState(0);

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

    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;
    const publicKey = "pk_test_6001cfe393365d476119a4e494f32bcb1290cfea";
    const [uuidv4] = useState(uuid());
    const [amount, setAmount] = useState(0); // Remember, set in kobo!
    const [userData] = useState(props.auth.isAuthenticated ? props.auth.userDetails : '');

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };

    const quickEnterPaymentOption = e => {
        setTopupAmount(e);
        setInputTopupAmount(e);
    }

    const initiateFundWallet = async e => {
        setLoadingData(true);
        props.spinnerIcon(true);
        try {
            let fundUserWallet = await _initiate_fund_user_wallet_balance({ amount: topupAmount });
            if (fundUserWallet.data.statusMessage === "success") {
                localStorage.setItem('prevSetInitializationKey', fundUserWallet.data.message)
                paystackButton.current.click();
                // openNotificationWithIcon('success', 'Wallet');
            } else {
                setLoadingData(false);
                props.spinnerIcon(false);
                openNotificationWithIcon('error', fundUserWallet?.data?.summary);
            }
        } catch (err) {
            setLoadingData(false);
            props.spinnerIcon(false);
            openNotificationWithIcon('error', 'An error occurred while trying to fund your wallet. Please try again.');
        }
    }

    const cancelFundWallet = async () => {
        setLoadingData(true);
        props.spinnerIcon(true);
        try {
            let fundUserWallet = await _cancel_fund_user_wallet({
                transactionKey: (new Date()).getTime().toString(),
                walletTransId: localStorage.getItem('prevSetInitializationKey')
            });
            if (fundUserWallet.data.statusMessage === "success") {
                setLoadingData(false);
                props.spinnerIcon(false);
                localStorage.removeItem('prevSetInitializationKey');
                openNotificationWithIcon('error', 'Transaction cancelled');
            } else {
                setLoadingData(false);
                props.spinnerIcon(false);
                openNotificationWithIcon('error', 'Transaction cancelled');
            }
        } catch (err) {
            setLoadingData(false);
            props.spinnerIcon(false);
            openNotificationWithIcon('error', 'Transaction cancelled');
            // openNotificationWithIcon('error', 'An error occurred while trying to fund your wallet. Please try again.');
        }
    }

    const completeUserFundWallet = async paymentData => {
        setOpenFundWalletModal(false);
        if (paymentData?.status === "success") {
            // setLoaderSpinning(true)
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
                    props.spinnerIcon(false);
                } else {
                    setLoadingData(false);
                    props.spinnerIcon(false);
                    openNotificationWithIcon('error', fundUserWallet?.data?.summary);
                }
            } catch (err) {
                setLoadingData(false);
                props.spinnerIcon(false);
                openNotificationWithIcon('error', 'An error occurred while funding your wallet. Please try again or reach out to us if you have been debited.');
            }
        } else {
            openNotificationWithIcon('error', 'We could not process payment. Please try again.');
        }
    }

    const fundWallet = e => {

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

    return (
        <div>
            <div className="grid-2">
                <div>
                    <img src={ReferImage} alt="" />
                </div>
                <div>
                    <p>How to buy videos</p>
                    <h4>Fund your wallet today to gain access to exclusive Dance fitness videos</h4>
                    <button
                        onClick={() => setOpenFundWalletModal(true)}
                        className="btn-default">Fund Wallet</button>
                </div>
            </div>
            <Modal open={openFundWalletModal} footer={null} onCancel={() => {
                setFundWalletStatus(false)
                setOpenFundWalletModal(false)
            }}>
                <div className="">
                    {/* {
                        !fundWalletStatus ? */}
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
                                            <NumberFormat thousandSeparator={true}
                                                prefix={'NGN '}
                                                className="numeric"
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
                    </div>
                    {/* } */}
                </div>
            </Modal>
            <button ref={paystackButton} className="paystack-button" onClick={() => {
                initializePayment(onSuccess, onClose)
            }}>Paystack Hooks Implementation</button>
        </div>
    )
}

const mapStateToProps = state => {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(ModalDisplay);