import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Input, Select, Spin, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from '../../utils/axiosCall';
import { Link } from 'react-router-dom';
import axiosCall from "../../utils/axiosCall";
import { usePaystackPayment } from "react-paystack";

import StatesData from '../../utils/states';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Empty from "../../assets/images/auth/empty.svg";
import Footer from '../../utils/footer';
import Nav from '../../utils/nav';
import AppRoute from '../../utils/routes';

const SuccessfulCheckOut = props => {

    return (
        <div>
            <Nav />
            <div className="empty_div page pt-5">
                <div>
                    <img src={Empty} alt="empty" />
                    <h3>Transaction Completed!</h3>
                    <p>Your transaction has been completed successfully and your delivery process has begun. We will deliver
                        your merchandise on .
                    </p>
                    <Link className="btn_red" to={AppRoute.profileMerchandise}>See Transaction History</Link>
                </div>
            </div>
            <Footer margin={true} />
        </div >
    )
}

const mapStateToProps = store => {
    return { auth: store.auth }
}

export default connect(mapStateToProps)(SuccessfulCheckOut);