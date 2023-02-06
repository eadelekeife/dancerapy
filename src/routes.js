import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./utils/nav";
import AppRoute from "./utils/routes";
import ProtectedRoutes from "./utils/protectedRoutes";
import AuthProtectedRoutes from "./utils/AuthProtectedRoute";

// import Homepage from "./components/homepage/index";
import Homepage from "./components/homepage/newindex";
import SignIn from "./components/auth/signin";
import SignUp from "./components/auth/signup";
import Reset from "./components/auth/reset";
import Club from "./components/mini/club";
import Merch from "./components/merchandise/merchandise";
import Trainings from "./components/trainings/trainings";
import Products from "./components/trainings/products";
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
import AboutUs from "./components/mini/about";
import ProductDetail from "./components/trainings/product-detail";
import PlanDetail from "./components/trainings/plan_detail";

const Navigator = () => {
    return (
        <div>
            <BrowserRouter>
                {/* <Nav /> */}
                <Routes>
                    <Route path={AppRoute.homepage} exact element={<Homepage />} />
                    <Route path={AppRoute.about} exact element={<AboutUs />} />
                    <Route path={AppRoute.signin} element={<AuthProtectedRoutes><SignIn /></AuthProtectedRoutes>} />
                    <Route path={AppRoute.signup} element={<AuthProtectedRoutes><SignUp /></AuthProtectedRoutes>} />
                    <Route path={AppRoute.reset} element={<AuthProtectedRoutes><Reset /></AuthProtectedRoutes>} />

                    <Route path={AppRoute.contact} element={<Contact />} />
                    <Route path={AppRoute.trainings} element={<Trainings />} />
                    <Route path={AppRoute.products} element={<Products />} />
                    <Route path={`${AppRoute.products}/detail`} element={<ProductDetail />} />
                    <Route path={`${AppRoute.trainings}/detail`} element={<PlanDetail />} />
                    <Route path={AppRoute.zoom} element={<Zoom />} />
                    <Route path={AppRoute.club} element={<Club />} />
                    <Route path={AppRoute.team} element={<Team />} />
                    <Route path={AppRoute.merch} element={<Merch />} />
                    <Route path={AppRoute.instructor} element={<Instructors />} />

                    {/* profile */}
                    <Route path={AppRoute.profile} exact element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
                    <Route path={AppRoute.profileEventTickets} exact element={<ProtectedRoutes><ProfileEventTickets /></ProtectedRoutes>} />
                    <Route path={AppRoute.profileOrders} exact element={<ProtectedRoutes><ProfileOrders /></ProtectedRoutes>} />
                    <Route path={AppRoute.profileVideos} exact element={<ProtectedRoutes><ProfileVideos /></ProtectedRoutes>} />
                    <Route path={AppRoute.profileOrders} exact element={<ProtectedRoutes><ProfileOrders /></ProtectedRoutes>} />
                    <Route path={AppRoute.profileReviews} exact element={<ProtectedRoutes><ProfileReviews /></ProtectedRoutes>} />
                    <Route path={AppRoute.profileMerchandise} exact element={<ProtectedRoutes><ProfileMerchandise /></ProtectedRoutes>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Navigator;