import React from 'react';
import { NavLink, } from 'react-router-dom';
import { connect } from 'react-redux';
import { Divider } from 'antd';

import AppRoutes from '../../utils/routes';

const Profile = () => {
    return (
        <div className="fix-nav">
            <ul>
                {/* <li> */}
                <h4 className="profile_nav_title"><ion-icon
                    class="profile_icon"
                    name="storefront-outline"></ion-icon> Your account</h4>
                {/* </li> */}
            </ul>
            <Divider style={{ margin: '10px 0px' }} />
            <ul>
                <li>
                    <NavLink to={AppRoutes.profile} exact
                        style={({ isActive }) => ({
                            color: !isActive ? '#111111' : '#258635',
                        })}
                    >
                        {/* <span className="lnr lnr-user"></span> */}
                        <ion-icon
                            class="profile_icon"
                            name="home-outline"></ion-icon>
                        Profile Overview</NavLink>
                </li>
                <li>
                    <NavLink to={AppRoutes.profileVideos}
                        style={({ isActive }) => ({
                            color: !isActive ? '#111111' : '#258635',
                        })}
                    >
                        <ion-icon
                            class="profile_icon"
                            name="videocam-outline"></ion-icon>
                        Your Videos</NavLink>
                </li>
                <li>
                    <NavLink to={AppRoutes.profileVirtualSubscription}
                        style={({ isActive }) => ({
                            color: !isActive ? '#111111' : '#258635',
                        })}
                    >
                        <ion-icon
                            class="profile_icon"
                            name="videocam-outline"></ion-icon>
                        Past Live Classes</NavLink>
                </li>
                <li>
                    <NavLink to={AppRoutes.profilePlanOrders}
                        style={({ isActive }) => ({
                            color: !isActive ? '#111111' : '#258635',
                        })}
                    >
                        <ion-icon
                            class="profile_icon"
                            name="card-outline"></ion-icon>
                        Physical Classes</NavLink>
                </li>
                <li>
                    <NavLink to={AppRoutes.profileProductOrders}
                        style={({ isActive }) => ({
                            color: !isActive ? '#111111' : '#258635',
                        })}
                    >
                        <ion-icon
                            class="profile_icon"
                            name="card-outline"></ion-icon>
                        {/* <span className="lnr lnr-gift"></span> */}
                        Your Product Orders</NavLink>
                </li>
                {/* <li>
                    <NavLink to={AppRoutes.profileEventTickets}
                        style={({ isActive }) => ({
                            color: !isActive ? '#111111' : '#258635',
                        })}
                    >
                        <ion-icon
                            class="profile_icon"
                            name="ticket-outline"></ion-icon>
                        Event Tickets</NavLink>
                </li> */}
                <li>
                    <NavLink to={AppRoutes.profileMerchandise}
                        style={({ isActive }) => ({
                            color: !isActive ? '#111111' : '#258635',
                        })}
                    >
                        <ion-icon
                            class="profile_icon"
                            name="shirt-outline"></ion-icon>
                        {/* <i className="lni lni-cart-full"></i> */}
                        Merchandise Orders</NavLink>
                </li>
                {/* <li>
                    <NavLink to="/cart"
                        style={({ isActive }) => ({
                            color: !isActive ? '#111111' : '#258635',
                        })}
                    >
                        <ion-icon
                            class="profile_icon"
                            name="cart-outline"></ion-icon>
                        Cart</NavLink>
                </li>
                <li>
                    <NavLink to="/faq"
                        style={({ isActive }) => ({
                            color: !isActive ? '#111111' : '#258635',
                        })}
                    >
                        <ion-icon
                            class="profile_icon"
                            name="call-outline"></ion-icon>
                        Contact Us</NavLink>
                </li> */}
            </ul>
            <Divider style={{ margin: '10px 0px' }} />
            <ul>
                <li>
                    <NavLink to="/signout"
                        style={({ isActive }) => ({
                            color: !isActive ? '#111111' : '#258635',
                        })}
                    >
                        <ion-icon
                            class="profile_icon"
                            name="log-out-outline"></ion-icon>
                        {/* <span className="lnr lnr-exit"></span> */}
                        Sign Out</NavLink>
                </li>
            </ul>
        </div>
    )
}

// const mapStateToProps = store => {
//     return { auth: store.auth }
// };

// export default connect(mapStateToProps)(Profile);

export default Profile;