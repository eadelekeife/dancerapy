import React, { useEffect, useState } from "react";
import { Input, Spin, Rate, notification } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { Controller, useForm } from "react-hook-form";
import { _add_video_ratings } from "../utils/axiosroutes";
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';

const VideoRatings = props => {
    const { handleSubmit, control, formState: { errors }, setValue } = useForm({});
    const [videoRating, setVideoRating] = useState(5);
    const [loadingRatingsBar, setLoadingRatingsBar] = useState(false);

    const antIcon = (<LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />);

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description: message
        });
    };

    const customIcons = {
        1: <FrownOutlined />,
        2: <FrownOutlined />,
        3: <MehOutlined />,
        4: <SmileOutlined />,
        5: <SmileOutlined />,
    };

    const addVideoRatings = async e => {
        setLoadingRatingsBar(true);
        let videoData = {
            videoId: props.videoId,
            rating: videoRating,
            message: e.message
        }
        try {
            let submitVideoRatings = await _add_video_ratings(videoData);
            if (submitVideoRatings) {
                openNotificationWithIcon('success', 'Video ratings added successfully');
                props.closeModal();
                setLoadingRatingsBar(false);
                setVideoRating(3);
                setValue('message', '');
            } else {
                openNotificationWithIcon('error', 'An error occurred while adding video ratings. Please try again');
            }
        } catch (err) {
            console.log(err)
            setLoadingRatingsBar(false);
            openNotificationWithIcon('error', 'An error occurred while adding video ratings. Please try again');
        }
    }
    return (
        <div>
            <div>
                {/* <div className="fund-modal-content">
                    <h3>Rate Video</h3>
                    <p>Invite a friend to Dancerapy and earn 0.25% on all their
                        transactions. This is a total of all the assets you have in your portfolio</p>
                </div> */}
                <form onSubmit={handleSubmit(addVideoRatings)}>
                    <div className="form-group">
                        <label style={{ display: 'block' }}>Ratings</label>
                        <Rate style={{ fontSize: '3rem' }} onChange={setVideoRating}
                            value={videoRating} character={({ index }) => customIcons[index + 1]} />
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
                    {
                        !loadingRatingsBar ?
                            <button className="btn-red">Add Rating</button>
                            :
                            <button className="btn-red"><Spin indicator={antIcon} /></button>
                    }
                </form>
            </div>
        </div>
    )
}

export default VideoRatings;