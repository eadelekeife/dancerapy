import "./assets/css/index.css";

import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import AllAppRoutes from "./utils/routes";
import { useLayoutEffect } from 'react';
import ProtectedRoutes from "./utils/protectedRoutes";
import AuthProtectedRoutes from "./utils/AuthProtectedRoute";


import Homepage from "./pages/homepage";
import AboutUs from "./pages/about";
import About from "./pages/about-us";
import Contact from "./pages/contact";
import SignInPage from "./pages/auth/signin";
import OurTeam from "./pages/team";
import ResetSendMail from "./pages/auth/sendmail";
import Passwordreset from "./pages/auth/resetpassword";
// profile
import Profile from "./pages/profile/dashboard";
import ProfileEventTickets from "./pages/profile/tickets";
import ProfileOrders from "./pages/profile/orders";
import ProductOrders from "./pages/profile/productorders";
import ProfileVideos from "./pages/profile/videos";
import ProfileReviews from "./pages/profile/reviews";
import ProfileMerchandise from "./pages/profile/merchandise";
import ProfileVirtualSubscription from "./pages/profile/virtualSubscription";
import ProfileVideoToPlay from "./pages/profile/videopage";
import Merch from "./pages/merch";
import Products from "./pages/products";
import PhysicalPlans from "./pages/physical-plan";
import Instructors from "./pages/instructor";
import SignUpPage from "./pages/auth/signup";
import SignUpVerificationPage from "./pages/auth/verification";
import VerificationSuccessfulPage from "./pages/auth/verification_success";
import SignOutPage from "./pages/auth/signout";
import ProductDetail from "./pages/product-detail";
import ProdDetail from "./pages/prod";
// import Videopage from "./pages/videos";
import PhysicalDetail from "./pages/physical-detail";

import Dashboard from "./pages/dashboard/dashboard";
import Videopage from "./pages/dashboard/videos";
import VirtualSubscription from "./pages/dashboard/live_classes";
import ProductsOrders from "./pages/dashboard/product";
import Merchandise from "./pages/dashboard/merch";
import Physical from "./pages/dashboard/physical";
import Companies from "./pages/companies";
import TransactionHistory from "./pages/dashboard/transactionHistory";
import Lifestyle from "./pages/dashboard/lifestyle";
import Healthhcare from "./pages/dashboard/healthhcare";
import VideoUploads from "./pages/dashboard/videoUploads";
import VideoViewsAnalytics from "./pages/dashboard/video_views_analytics";
import VideoPurchaseSuccess from "./pages/dashboard/success-page/video-purchase-success";
import FundWalletSuccess from "./pages/dashboard/success-page/fund-wallet-success";
import TestPlayer from "./pages/a";
import Videoplayer from "./pages/dashboard/videoplayer";
import VideoPage from "./pages/videos";
import HelpPage from "./pages/help";
import HealthcarePage from "./pages/healthcare";
// import Merchandise from "./pages/dashboard/merch";

const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children
}

const AppRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <Wrapper>
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/aa" element={<TestPlayer />} />
                        {/* <Route path="/videos" element={<VideoPage />} /> */}
                        {/* <Route path={AllAppRoutes.about_us} element={<AboutUs />} /> */}
                        <Route path={AllAppRoutes.about_us} element={<About />} />
                        <Route path={AllAppRoutes.instructors} element={<Instructors />} />
                        <Route path={AllAppRoutes.contact_us} element={<Contact />} />
                        <Route path={AllAppRoutes.corporate} element={<Companies />} />
                        <Route path={AllAppRoutes.our_team} element={<OurTeam />} />
                        <Route path={AllAppRoutes.healthcare} element={<HealthcarePage />} />
                        <Route path={AllAppRoutes.help} element={<HelpPage />} />
                        <Route path={AllAppRoutes.merch} element={<Merch />} />
                        <Route path={AllAppRoutes.appVideos} element={<VideoPage />} />
                        <Route path={AllAppRoutes.playProfileVideo} element={<Videoplayer />} />

                        <Route path={AllAppRoutes.products} element={<Products />} />
                        <Route path={AllAppRoutes.physical_detail} element={<PhysicalDetail />} />
                        <Route path={AllAppRoutes.product_detail} element={<ProdDetail />} />
                        <Route path={AllAppRoutes.physical_plans} element={<PhysicalPlans />} />

                        <Route path={AllAppRoutes.sign_in} element={<AuthProtectedRoutes><SignInPage /></AuthProtectedRoutes>} />
                        <Route path={AllAppRoutes.sign_out} element={<AuthProtectedRoutes><SignOutPage /></AuthProtectedRoutes>} />
                        <Route path={AllAppRoutes.sign_up} element={<AuthProtectedRoutes><SignUpPage /></AuthProtectedRoutes>} />
                        <Route path={AllAppRoutes.sign_up_verification} element={<AuthProtectedRoutes><SignUpVerificationPage /></AuthProtectedRoutes>} />
                        <Route path={AllAppRoutes.verification_successful} element={<AuthProtectedRoutes><VerificationSuccessfulPage /></AuthProtectedRoutes>} />
                        <Route path="/resetsendmail" element={<AuthProtectedRoutes><ResetSendMail /></AuthProtectedRoutes>} />
                        <Route path="/resetpassword" element={<AuthProtectedRoutes><Passwordreset /></AuthProtectedRoutes>} />


                        {/* profile */}

                        <Route path="/dash" exact element={<Dashboard />} />
                        <Route path={AllAppRoutes.profileVideos} exact element={<Videopage />} />
                        <Route path={AllAppRoutes.profileVirtualSubscription} exact element={<VirtualSubscription />} />
                        <Route path={AllAppRoutes.profilePlanOrders} exact element={<Physical />} />
                        <Route path={AllAppRoutes.videoViewsAnalytics} exact element={<VideoViewsAnalytics />} />
                        <Route path={AllAppRoutes.profileTransactionHistory} exact element={<TransactionHistory />} />
                        <Route path={AllAppRoutes.profileVideoUploads} exact element={<VideoUploads />} />
                        <Route path={AllAppRoutes.profileLifestylePlans} exact element={<Lifestyle />} />
                        <Route path={AllAppRoutes.profileHealthcarePlans} exact element={<Healthhcare />} />
                        <Route path={AllAppRoutes.profileMerchandise} exact element={<Merchandise />} />
                        <Route path={AllAppRoutes.profileProductOrders} exact element={<ProductsOrders />} />
                        <Route path={AllAppRoutes.profileVideoPurchaseSuccess} exact element={<VideoPurchaseSuccess />} />
                        <Route path={AllAppRoutes.profileFundWalletSuccess} exact element={<FundWalletSuccess />} />
                        {/* <Route path={AllAppRoutes.profilePlanOrders} exact element={<ProfileOrders />} /> */}

                        {/* <Route path={AllAppRoutes.profile} exact element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
                        <Route path={AllAppRoutes.profileEventTickets} exact element={<ProtectedRoutes><ProfileEventTickets /></ProtectedRoutes>} />
                        <Route path={AllAppRoutes.profileVideos} exact element={<ProtectedRoutes><ProfileVideos /></ProtectedRoutes>} /> */}
                        {/* <Route path={AllAppRoutes.profileVideoToPlay} exact element={<ProtectedRoutes><ProfileVideoToPlay /></ProtectedRoutes>} />
                        <Route path={AllAppRoutes.profileProductOrders} exact element={<ProtectedRoutes><ProductOrders /></ProtectedRoutes>} />
                        <Route path={AllAppRoutes.profilePlanOrders} exact element={<ProtectedRoutes><ProfileOrders /></ProtectedRoutes>} />
                        <Route path={AllAppRoutes.profileReviews} exact element={<ProtectedRoutes><ProfileReviews /></ProtectedRoutes>} />
                        <Route path={AllAppRoutes.profileMerchandise} exact element={<ProtectedRoutes><ProfileMerchandise /></ProtectedRoutes>} /> */}
                        {/* <Route path={AllAppRoutes.profileVirtualSubscription} exact element={<ProtectedRoutes><ProfileVirtualSubscription /></ProtectedRoutes>} /> */}
                    </Routes>
                </Wrapper>
            </BrowserRouter>
        </div>
    )
}

export default AppRoutes;