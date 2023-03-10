import React from "react";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useLayoutEffect } from 'react';

import AppRoute from "./utils/routes";
import ProtectedRoutes from "./utils/protectedRoutes";
import AuthProtectedRoutes from "./utils/AuthProtectedRoute";

// import Homepage from "./components/homepage/index";
import Homepage from "./components/homepage/newindex";
import SignIn from "./components/auth/signin";
import SignUp from "./components/auth/signup";
import Reset from "./components/auth/reset";
import SignOut from "./components/auth/signout";
import Club from "./components/trainings/club";
import Merch from "./components/merchandise/merchandise";
import Trainings from "./components/trainings/trainings";
import Products from "./components/trainings/products";
import Zoom from "./components/trainings/zoom";
import Team from "./components/mini/team";
import Instructors from "./components/instructors/instructors";
import Profile from "./components/profile/dashboard";
import ProfileEventTickets from "./components/profile/tickets";
import ProfileOrders from "./components/profile/orders";
import ProductOrders from "./components/profile/productorders";
import ProfileVideos from "./components/profile/videos";
import ProfileReviews from "./components/profile/reviews";
import ProfileMerchandise from "./components/profile/merchandise";
import ProfileVirtualSubscription from "./components/profile/virtualSubscription";
import ProfileVideoToPlay from "./components/profile/videopage";
import Contact from "./components/mini/contact";
import AboutUs from "./components/mini/about";
import ProductDetail from "./components/trainings/product-detail";
import PlanDetail from "./components/trainings/plan_detail";
import FAQs from "./components/mini/faq";
import Corporate from "./components/mini/corporate";

const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children
}

const Navigator = () => {
    return (
        <div>

            <BrowserRouter>
                <Wrapper>
                    <Routes>
                        <Route path={AppRoute.homepage} exact element={<Homepage />} />
                        <Route path={AppRoute.about} exact element={<AboutUs />} />
                        <Route path={AppRoute.signin} element={<AuthProtectedRoutes><SignIn /></AuthProtectedRoutes>} />
                        <Route path={AppRoute.signup} element={<AuthProtectedRoutes><SignUp /></AuthProtectedRoutes>} />
                        <Route path={AppRoute.reset} element={<AuthProtectedRoutes><Reset /></AuthProtectedRoutes>} />
                        <Route path={AppRoute.signout} element={<SignOut />} />

                        <Route path={AppRoute.contact} element={<Contact />} />
                        <Route path={AppRoute.trainings} element={<Trainings />} />
                        <Route path={AppRoute.products} element={<Products />} />
                        <Route path={`${AppRoute.products}/detail`} element={<ProductDetail />} />
                        <Route path={`${AppRoute.trainings}/detail`} element={<PlanDetail />} />
                        <Route path={AppRoute.zoom} element={<Zoom />} />
                        <Route path={AppRoute.schools} element={<Club />} />
                        <Route path={AppRoute.team} element={<Team />} />
                        <Route path={AppRoute.merch} element={<Merch />} />
                        <Route path={AppRoute.instructor} element={<Instructors />} />
                        <Route path={AppRoute.faqs} element={<FAQs />} />
                        <Route path={AppRoute.corporate} element={<Corporate />} />

                        <Route path={AppRoute.profile} exact element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
                        <Route path={AppRoute.profileEventTickets} exact element={<ProtectedRoutes><ProfileEventTickets /></ProtectedRoutes>} />
                        <Route path={AppRoute.profileVideos} exact element={<ProtectedRoutes><ProfileVideos /></ProtectedRoutes>} />
                        <Route path={AppRoute.profileVideoToPlay} exact element={<ProtectedRoutes><ProfileVideoToPlay /></ProtectedRoutes>} />
                        <Route path={AppRoute.profileProductOrders} exact element={<ProtectedRoutes><ProductOrders /></ProtectedRoutes>} />
                        <Route path={AppRoute.profilePlanOrders} exact element={<ProtectedRoutes><ProfileOrders /></ProtectedRoutes>} />
                        <Route path={AppRoute.profileReviews} exact element={<ProtectedRoutes><ProfileReviews /></ProtectedRoutes>} />
                        <Route path={AppRoute.profileMerchandise} exact element={<ProtectedRoutes><ProfileMerchandise /></ProtectedRoutes>} />
                        <Route path={AppRoute.profileVirtualSubscription} exact element={<ProtectedRoutes><ProfileVirtualSubscription /></ProtectedRoutes>} />
                    


                        <Route path="/club" exact element={<Club />} />
                    </Routes>
                </Wrapper>
            </BrowserRouter>
        </div>
    )
}

export default Navigator;