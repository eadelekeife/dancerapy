import "./dashboard.css";

import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AppRoute from "../../utils/routes";
import ReferImage from "../../assets/images/a-company/refer.png";

import TopNav from "./top-bar";
import SideBar from "./side-bar";
import ModalDisplay from "../../components/referral-modal";
import UserBalance from "../../components/balance-cover";
import Footer from "../../components/footer";
import { _fetch_user_wallet_transactions } from "../../utils/axiosroutes";

const VideosPage = props => {

    return (
        <div>
            <div className="dashboard-profile">
                <TopNav pageTitle="Your Product Orders" />
                <div className="dash-side-bar">
                    <SideBar />
                </div>
                <div className="dash-main-div">
                    <div className="contain">
                        <div className="dash-main-content">
                            <div className="white-dash-grid">
                                <div>
                                    <div className="white-dash-data">
                                        <UserBalance />
                                    </div>
                                    <div className="product-display empty_div_product mt-4">
                                        <div>
                                            <div className="empty_div_square">
                                            </div>
                                            <h4>No activity yet</h4>
                                            <p>When you buy a video, your transaction history would appear here</p>
                                            <Link to={AppRoute.profileVideos} className="btn-red">View All Videos</Link>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="white-dash-data side">
                                        <ModalDisplay />
                                    </div>
                                    <div className="white-dash-data side">
                                        <div className="grid-2">
                                            <div>
                                                <img src={ReferImage} alt="" />
                                            </div>
                                            <div>
                                                <p>Earn extra income</p>
                                                <h4>Invite a friend to Dancerapy and earn 0.25% on all their transactions</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt_5"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mobile-only">
                <Footer noMargin={true} />
            </div>
        </div >
    )
}

const mapStateToProps = state => {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(VideosPage);