import React from "react";

import SadEmoji from "../assets/images/illustrations/18_sad_emoji.png";
import ErrorImage from "../assets/images/illustrations/error.png";


const ErrorPageDisplay = props => {

    return (
        <div className="product-display empty_div_product mt-4">
            <div>
                {/* <img src={SadEmoji} alt="Sad face emoji" className="error-img" /> */}
                <img src={ErrorImage} alt="ship with anchor" className="error-img" />
                <p>An error occurred while loading page. Please reload to try again.</p>
                {props.link}
            </div>
        </div>

    )
}
export default ErrorPageDisplay;