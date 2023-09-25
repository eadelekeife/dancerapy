import React, { useRef, useState } from "react";

import { Modal, Input } from "antd";
import { connect } from "react-redux";

import ReferImage from "../assets/images/illustrations/11_bulb.png";
import ReferralImage from "../assets/images/illustrations/5_bell.png";

const ModalDisplay = props => {
    const referralMessage = useRef();
    const [referralModal, setReferralModal] = useState(false);

    const copyReferralMessage = () => {
        // referralMessage.current.focus().select();
        // document.execCommand('copy');
        // console.log(message)
    }

    return (
        <div>
            <div className="grid-2">
                <div>
                    <img src={ReferImage} alt="" />
                </div>
                <div>
                    <p>Earn extra cash</p>
                    <h4>Invite a friend to Dancerapy and earn free <span
                        style={{ fontFamily: 'Gilroy Bold' }}
                        className="currency">NGN</span>300.00 to
                        subscribe for our Dancerapy plans</h4>
                    <button
                        onClick={() => setReferralModal(true)}
                        className="btn-default">Invite Friends</button>
                </div>
            </div>
            <Modal open={referralModal} footer={null} onCancel={() => setReferralModal(false)}>
                <div className="referral-story">
                    <div className="center-div">
                        <div>
                            <div>
                                <img src={ReferralImage} alt="" />
                            </div>
                            <h3>Earn extra cash</h3>
                            <p ref={referralMessage}>Invite a friend to Dancerapy and earn free <span
                                className="currency">NGN</span>300.00 to
                                subscribe for our Dancerapy plans. Please note that free cash is only redeemable after your friend's first
                                subscription on any of our dance plans.</p>
                            <div className="referral-box">
                                <Input.TextArea type="text" rows={6}
                                    value={`Introducing Dancerapy, the ultimate African dance fitness experience that will have you moving, grooving, and feeling absolutely alive. Their classes combine the infectious beats of African music with heart-pumping dance routines, creating a workout like no other. Click here to signup and get 5 free fitness videos https://dancerapy.org/signup?referralToken=${props?.auth?.userDetails?.referralCode}`} disabled
                                    style={{ width: '100%' }} />
                                <button onClick={() => copyReferralMessage()}>Copy Referral Message</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(ModalDisplay);