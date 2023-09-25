import React from "react";

import { connect } from "react-redux";

import ReferImage from "../assets/images/illustrations/14_rhombus.png";

const ModalDisplay = () => {
    return (
        <div>
            <div className="grid-2">
                <div>
                    <img src={ReferImage} alt="" />
                </div>
                <div>
                    <p>How Tokens Work</p>
                    <h4>Earn free tokens to buy videos by watching fitness videos and referring new users</h4>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(ModalDisplay);