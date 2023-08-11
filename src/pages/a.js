import React, { useEffect, useState } from "react";
import { Input, Modal, Rate, notification } from "antd";
import { Controller, useForm } from "react-hook-form";
import { _add_video_ratings } from "../utils/axiosroutes";

const TestPlayer = () => {
    const [openRatingsModal, setOpenRatingsModal] = useState([]);
    const [videoId] = useState(0);
    const { handleSubmit, control, formState: { errors } } = useForm({});

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };

    const addVideoRatings = async e => {
        let videoData = {
            videoId,
            rating: e.rating,
            message: e.message
        }
        try {
            let submitVideoRatings = await _add_video_ratings(videoData);
            if (submitVideoRatings) {
                openNotificationWithIcon('success', 'Video ratings added successfully');
                setOpenRatingsModal(false);
            } else {
                openNotificationWithIcon('error', 'An error occurred while adding video ratings. Please try again');
            }
        } catch (err) {
            openNotificationWithIcon('error', 'An error occurred while adding video ratings. Please try again');
        }
    }
    return (
        <div>
            <button className="btn-red">Hello</button>
            <Modal open={openRatingsModal} footer={null}>
                <div>
                    <div className="fund-modal-content">
                        <h3>Rate Video</h3>
                        <p>Invite a friend to Dancerapy and earn 0.25% on all their
                            transactions. This is a total of all the assets you have in your portfolio</p>
                    </div>
                    <form onSubmit={handleSubmit(addVideoRatings)}>
                        <div className="form-group">
                            <label style={{ display: 'block' }}>Ratings</label>
                            <Rate style={{ fontSize: '3rem' }} />
                        </div>
                        <div className="form-group">
                            <label style={{ display: 'block' }}>Message <small>(optional)</small></label>
                            <Controller name="message" control={control}
                                render={({ field }) => {
                                    return (
                                        <Input.TextArea name="message" {...field}
                                            rows={4} />
                                    )
                                }} />
                        </div>
                        <button className="btn-red">Add Rating</button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default TestPlayer;