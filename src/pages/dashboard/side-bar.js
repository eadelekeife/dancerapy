import React from "react";
import { Link, NavLink } from "react-router-dom";
import AllAppRoutes from "../../utils/routes";

import { ReactComponent as Calendar } from "../../assets/images/icons/pie-chart -cropped.svg";
import { ReactComponent as ArchiveIcon } from "../../assets/images/icons/archive-cropped.svg";
import { ReactComponent as Settings } from "../../assets/images/icons/settings-cropped.svg";
import { ReactComponent as VideoIcon } from "../../assets/images/icons/monitor-cropped.svg";
import { ReactComponent as HomeIcon } from "../../assets/images/icons/home-cropped.svg";
import { ReactComponent as SignOutIcon } from "../../assets/images/icons/log-out-cropped.svg";
import { ReactComponent as MerchandiseIcon } from "../../assets/images/icons/shopping-bag-cropped.svg";

const SideBar = () => {
    return (
        <div>
            <ul className="last-link-block">
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                        to="/dash"><HomeIcon className="side-nav-icon" /><span>Profile Overview</span></NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                        to={AllAppRoutes.profileSettings}><Settings className="side-nav-icon" /><span>Profile Settings</span></NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                        to={AllAppRoutes.profileVideos}><VideoIcon className="side-nav-icon _1" />
                        <span>Videos</span></NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                        to={AllAppRoutes.profileTransactionHistory}><ArchiveIcon className="side-nav-icon _1" />
                        <span>Transaction History</span></NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                        to={AllAppRoutes.videoViewsAnalytics}><Calendar className="side-nav-icon _1" />
                        <span>Video Analytics</span></NavLink>
                </li>
                {/* <li>
                    <NavLink
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                        to={AllAppRoutes.profileVirtualSubscription}><ion-icon
                            class="profile_icon"
                            name="videocam-outline"></ion-icon>Past Live Classes</span></NavLink>
                </li> */}
                {/* <li>
                    <NavLink
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                        to={AllAppRoutes.profilePlanOrders}><ion-icon
                            class="profile_icon"
                            name="card-outline"></ion-icon>Physical Classes</span></NavLink>
                </li> */}
                {/* <li>
                    <NavLink
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                        to={AllAppRoutes.profileVideoUploads}><ion-icon
                            class="profile_icon"
                            name="card-outline"></ion-icon>Video Uploads <span className="coming_soon">coming soon</span></span></NavLink>
                </li> */}
                {/* <li>
                    <NavLink
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                        to={AllAppRoutes.profileHealthcarePlans}><ion-icon
                            class="profile_icon"
                            name="videocam-outline"></ion-icon>Healthcare Plans <span className="coming_soon">coming soon</span></span></NavLink>
                </li> */}
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                        to={AllAppRoutes.profileMerchandise}><MerchandiseIcon className="side-nav-icon _1" />
                        <span>Merchandise Orders</span></NavLink>
                </li>
            </ul>
            <div>
                <ul className="last-link">
                    <li>
                        <Link
                            className={({ isActive }) => isActive ? 'active-link' : ''}
                            to="/signout"><SignOutIcon className="side-nav-icon _1" />Sign Out</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar;