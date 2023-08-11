import "./profile.css";

import React, { useState } from "react";

import Footer from "../../components/footer";
import { Controller, useForm } from 'react-hook-form';
import { Input, Spin, Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from '../../utils/axiosCall';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import SideNav from "./side_nav";

import Empty from "../../assets/images/auth/empty.svg";
import _1 from "../../assets/images/content/_1.avif";
import _2 from "../../assets/images/content/_2.avif";

const Profile = () => {
    const [loadingData, setLoadingData] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const dataSource = [
        {
            key: '1',
            name: 'Olamide live In Concert',
            age: 'NGN5000.00',
            address: 'Thursday, 10 March 2022',
            purchaseDate: 'Tuesday, 10 February 2022',
            ticket: <button className="btn_green">Resend Ticket to Mail</button>
        },
        {
            key: '2',
            name: 'Rum Punch Brunch: Eat. Sip. Chill.',
            age: 'NGN3500.00',
            address: 'Monday, 03 September 2022',
            purchaseDate: 'Wednesday, 20 August 2022',
            ticket: <button className="btn_green">Resend Ticket to Mail</button>
        },
    ];

    const columns = [
        {
            title: 'Event Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Event Price',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Event Date',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Purchase Date',
            dataIndex: 'purchaseDate',
            key: 'address',
        },
        {
            title: '',
            dataIndex: 'ticket',
            key: 'address',
        }
    ];
    return (
        <div>
            <div className="profile_div main_info">
                <div className="profile_to_left">
                    <div className="profile_nav">
                        <SideNav />
                    </div>
                </div>
                <div className="profile_to_right">
                    <div className="contain">
                        <div className="profile-data-display">
                            <h3 className="profile_title">Event Tickets</h3>
                            <div>
                                <Table dataSource={dataSource} columns={columns} bordered />;
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile;