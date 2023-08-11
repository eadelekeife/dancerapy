import React from "react";
import { Link, NavLink } from "react-router-dom";
import AllAppRoutes from "../../utils/routes";

const SideBar = () => {
    return (
        <div>
            <ul className="last-link-block">
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                        to="/dash"><ion-icon
                            class="profile_icon"
                            name="home-outline"></ion-icon>Profile Overview</NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                        to={AllAppRoutes.profileVideos}><ion-icon
                            class="profile_icon"
                            name="videocam-outline"></ion-icon>Videos</NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                        to={AllAppRoutes.profileTransactionHistory}><ion-icon
                            class="profile_icon"
                            name="videocam-outline"></ion-icon>Transaction History</NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                        to={AllAppRoutes.videoViewsAnalytics}><ion-icon
                            class="profile_icon"
                            name="videocam-outline"></ion-icon>Video Analytics</NavLink>
                </li>
                {/* <li>
                    <NavLink
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                        to={AllAppRoutes.profileVirtualSubscription}><ion-icon
                            class="profile_icon"
                            name="videocam-outline"></ion-icon>Past Live Classes</NavLink>
                </li> */}
                {/* <li>
                    <NavLink
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                        to={AllAppRoutes.profilePlanOrders}><ion-icon
                            class="profile_icon"
                            name="card-outline"></ion-icon>Physical Classes</NavLink>
                </li> */}
                {/* <li>
                    <NavLink
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                        to={AllAppRoutes.profileVideoUploads}><ion-icon
                            class="profile_icon"
                            name="card-outline"></ion-icon>Video Uploads <span>coming soon</span></NavLink>
                </li> */}
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                        to={AllAppRoutes.profileHealthcarePlans}><ion-icon
                            class="profile_icon"
                            name="videocam-outline"></ion-icon>Healthcare Plans <span>coming soon</span></NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                        to={AllAppRoutes.profileMerchandise}><ion-icon
                            class="profile_icon"
                            name="shirt-outline"></ion-icon>Merchandise Orders</NavLink>
                </li>
            </ul>
            <div>
                <ul className="last-link">
                    <li>
                        <Link
                            className={({ isActive }) => isActive ? 'active-link' : ''}
                            to="/signout"><ion-icon
                                class="profile_icon"
                                name="log-out-outline"></ion-icon>Sign Out</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar;