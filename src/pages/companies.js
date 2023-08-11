import "../assets/css/mini.css";

import React, { useState, useEffect } from "react";

// import { connect } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Modal } from 'antd';
import ReactPlayer from 'react-player';
import { LoadingOutlined } from '@ant-design/icons';
// import axios from '../../utils/axiosCall';

import { Link } from "react-router-dom";

import CancelImg from '../assets/images/x-white.svg';

import Prudent from '../assets/images/companies/prudent_video.png';
import Axxela from '../assets/images/companies/axxela_video.png';
import Leadway from '../assets/images/companies/leadway_video.png';
import Access from '../assets/images/companies/access_video.png';
import Nestle from '../assets/images/companies/nestle_video.png';
import NoName from '../assets/images/companies/noname_video.png';
import OVH from '../assets/images/companies/ovh_video.png';
import HRNigeria from '../assets/images/companies/last_video.png';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Footer from '../components/footer';
import Nav from "../components/nav";

const Companies = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [playVideo, setPlayVideo] = useState(false);
    const [videoToPlayLink, setVideoToPlayLink] = useState('https://lagostheatrevideos.s3.amazonaws.com/summer+intensive+2021.MP4');

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setPlayVideo(false);
        setIsModalOpen(false);
        // ReactPlayer.on
    };
    const openVideoModal = e => {
        setPlayVideo(true);
        setVideoToPlayLink(e);
        setIsModalOpen(true);
    }

    const pauseMediaPlayer = async () => {
        await setPlayVideo(false);
        setIsModalOpen(false);
    }
    return (
        <div className="contact">
            <Nav />
            <div className="plan_bg">
                <h3>How we Impact Companies</h3>
            </div>
            <div className="mt_5 contain">
                <div className="grid-4">
                    <div>
                        <img
                            onClick={() => openVideoModal('https://dancerapyvideos.s3.amazonaws.com/companies/prudent.mp4')}
                            src={Prudent} alt='banner 1' />
                        <div>
                            <h5>Dancerapy at Prudent Group</h5>
                        </div>
                    </div>
                    <div>
                        <img
                            onClick={() => openVideoModal('https://dancerapyvideos.s3.amazonaws.com/companies/axxela.mp4')}
                            src={Axxela} alt='banner 1' />
                        <div>
                            <h5>Dancerapy at Axxela Group</h5>
                        </div>
                    </div>
                    <div>
                        <img
                            onClick={() => openVideoModal('https://dancerapyvideos.s3.amazonaws.com/companies/leadway.mp4')}
                            src={Leadway} alt='banner 1' />
                        <div>
                            <h5>Dancerapy at Leadway Insurance</h5>
                        </div>
                    </div>
                    <div>
                        <img
                            onClick={() => openVideoModal('https://dancerapyvideos.s3.amazonaws.com/companies/access.mp4')}
                            src={Access} alt='banner 1' />
                        <div>
                            <h5>Dancerapy at Access Bank</h5>
                        </div>
                    </div>
                    <div>
                        <img
                            onClick={() => openVideoModal('https://dancerapyvideos.s3.amazonaws.com/companies/nestle.mp4')}
                            src={Nestle} alt='banner 1' />
                        <div>
                            <h5>Dancerapy at Nestle</h5>
                        </div>
                    </div>
                    <div>
                        <img
                            onClick={() => openVideoModal('https://dancerapyvideos.s3.amazonaws.com/companies/noname.mp4')}
                            src={NoName} alt='banner 1' />
                        <div>
                            <h5>Dancerapy at HR Foundary</h5>
                        </div>
                    </div>
                    <div>
                        <img
                            onClick={() => openVideoModal('https://dancerapyvideos.s3.amazonaws.com/companies/ovh.mp4')}
                            src={OVH} alt='banner 1' />
                        <div>
                            <h5>Dancerapy at OVH Energy Family</h5>
                        </div>
                    </div>
                    <div>
                        <img
                            onClick={() => openVideoModal('https://dancerapyvideos.s3.amazonaws.com/companies/hrnigeria.mp4')}
                            src={HRNigeria} alt='banner 1' />
                        <div>
                            <h5>Dancerapy at HR Nigeria</h5>
                        </div>
                    </div>
                </div>
            </div>
            <Modal title={null}
                className="videoPlayer marathon-media-player"
                width={800}
                footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <ReactPlayer width="100%" height="100%" url={videoToPlayLink}
                    playing={playVideo} style={{ background: 'black' }} playsinline={true} controls={false} />
                <div className="stopVideoButton">
                    <button onClick={() => {
                        pauseMediaPlayer()
                    }}><img src={CancelImg} alt="cancel modal" /></button>
                </div>
            </Modal>
            <Footer margin={true} />
        </div>
    )
}

export default Companies;