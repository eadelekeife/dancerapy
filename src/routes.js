import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./utils/nav";
import AppRoute from "./utils/routes";

// import Homepage from "./components/homepage/index";
import Homepage from "./components/homepage/newindex";
import SignIn from "./components/auth/signin";
import SignUp from "./components/auth/signup";
import Reset from "./components/auth/reset";
import Club from "./components/mini/club";
import Merch from "./components/merchandise/merchandise";
import Trainings from "./components/trainings/trainings";
import Zoom from "./components/trainings/zoom";
import Team from "./components/mini/team";
import Instructors from "./components/instructors/instructors";
import Profile from "./components/profile/dashboard";
import ProfileEventTickets from "./components/profile/tickets";
import ProfileOrders from "./components/profile/orders";
import ProfileVideos from "./components/profile/videos";
import ProfileReviews from "./components/profile/reviews";
import ProfileMerchandise from "./components/profile/merchandise";
import Contact from "./components/mini/contact";

const Navigator = () => {
    return (
        <div>
            <BrowserRouter>
                {/* <Nav /> */}
                <Routes>
                    <Route path={AppRoute.homepage} exact element={<Homepage />} />
                    <Route path={AppRoute.signin} element={<SignIn />} />
                    <Route path={AppRoute.signup} element={<SignUp />} />
                    <Route path={AppRoute.reset} element={<Reset />} />

                    <Route path={AppRoute.contact} element={<Contact />} />
                    <Route path={AppRoute.trainings} element={<Trainings />} />
                    <Route path={AppRoute.zoom} element={<Zoom />} />
                    <Route path={AppRoute.club} element={<Club />} />
                    <Route path={AppRoute.team} element={<Team />} />
                    <Route path={AppRoute.merch} element={<Merch />} />
                    <Route path={AppRoute.instructor} element={<Instructors />} />

                    {/* profile */}
                    <Route path={AppRoute.profile} exact element={<Profile />} />
                    <Route path={AppRoute.profileEventTickets} exact element={<ProfileEventTickets />} />
                    <Route path={AppRoute.profileOrders} exact element={<ProfileOrders />} />
                    <Route path={AppRoute.profileVideos} exact element={<ProfileVideos />} />
                    <Route path={AppRoute.profileOrders} exact element={<ProfileOrders />} />
                    <Route path={AppRoute.profileReviews} exact element={<ProfileReviews />} />
                    <Route path={AppRoute.profileMerchandise} exact element={<ProfileMerchandise />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Navigator;