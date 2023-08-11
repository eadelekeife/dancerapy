import React from "react";

import { Link } from "react-router-dom";

import TopBar from "../top-bar";
import Footer from "../../../components/footer";
import AllAppRoutes from "../../../utils/routes";

const VideoPurchaseSuccess = () => {
    return (
        <div>
            <TopBar />
            <div className="grey-bg dashboard">
                <div className="grey-center">
                    <div className="sucess-gif"></div>
                    <h2>Video Purchase Successful</h2>
                    <p>As a movement, Dancerapy personalizes the idea of dance as a culture towards achieving wholeness
                        in health and fitness.</p>
                    <Link to={AllAppRoutes.profileTransactionHistory}>View Transaction History</Link>
                </div>
            </div>
            <Footer noMargin={true} />
        </div>
    )
}

export default VideoPurchaseSuccess;