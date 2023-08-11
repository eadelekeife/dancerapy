import React, { useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { Modal } from "antd";
import { _update_user_token_by_views, _update_video_data, _update_video_full_data, _update_video_half_data } from "../utils/axiosroutes";
import VideoRatings from "./video-ratings";

export const VideoJS = (props) => {
    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const { options } = props;
    const [halfUpdated, setHalfUpdated] = useState(false);
    const [startUpdated, setStartUpdated] = useState(false);
    const [viewsId, setViewsId] = useState(0);
    const [videoViewsNum, setVideoViewsNum] = useState(0);
    const [displayVideoRatingsModal, setDisplayVideoRatingsModal] = useState(false);

    let newViewsId = 0;
    const updateVideosPlayCount = async () => {
        try {
            let updateVideo = await _update_video_data(props.videoId);
            if (updateVideo.data.statusMessage === "success") {
                setViewsId(updateVideo.data.message);
                newViewsId = updateVideo.data.message;
            }
        } catch (err) {
            // openNotificationWithIcon('error', 'An error occurred while updating video plans. Please reload page to try again')
        }
    }
    const updateVideosHalfCount = async () => {
        try {
            let updateVideo = await _update_video_half_data(newViewsId);
        } catch (err) {
            // openNotificationWithIcon('error', 'An error occurred while updating video plans. Please reload page to try again')
        }
    }
    const updateVideosFullCount = async () => {
        try {
            let updateVideo = await _update_video_full_data(newViewsId);
        } catch (err) {
            // openNotificationWithIcon('error', 'An error occurred while updating video plans. Please reload page to try again')
        }
    }

    const updateUserViewsToken = async () => {
        try {
            let updateVideo = await _update_user_token_by_views({ videoId: props.videoId });
            if (updateVideo.data.statusMessage === "success") {
            }
        } catch (err) {
            // openNotificationWithIcon('error', 'An error occurred while updating video plans. Please reload page to try again')
        }
    }

    React.useEffect(() => {
        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
            // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
            const videoElement = document.createElement("video-js");

            videoElement.classList.add("vjs-big-play-centered");
            videoRef.current.appendChild(videoElement);

            const player = (playerRef.current = videojs(videoElement, options, () => {
                // player.on("waiting", () => {
                //   videojs.log("player is waiting");
                // });

                // player.on("dispose", () => {
                //   videojs.log("player will dispose");
                // });

                let starterWatch = startUpdated;
                let halfWatch = halfUpdated;
                player.on("timeupdate", () => {
                    if ((Math.trunc(+player.currentTime()) === 2) && (!starterWatch)) {
                        starterWatch = true;
                        setStartUpdated(true)
                        updateVideosPlayCount();
                    } else if ((Math.trunc(+player.currentTime()) === 10) && (!halfWatch)) {
                        halfWatch = true;
                        setHalfUpdated(true);
                        updateVideosHalfCount();
                    }
                });
                player.on('ended', () => {
                    starterWatch = false;
                    halfWatch = false;
                    setStartUpdated(false);
                    setHalfUpdated(false);
                    updateVideosFullCount();
                    updateUserViewsToken();
                    let getItem = localStorage.getItem('videoViewsNum');
                    console.log(getItem)
                    if (getItem === 0) {
                        setDisplayVideoRatingsModal(true);
                        setVideoViewsNum(1);
                        localStorage.setItem('videoViewsNum', 1);
                        console.log(getItem)
                    }
                });
            }));

            // You could update an existing player in the `else` block here
            // on prop change, for example:
        } else {
            const player = playerRef.current;
            player.autoplay(options.autoplay);
            player.src(options.sources);
        }
    }, []);

    // Dispose the Video.js player when the functional component unmounts
    React.useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    const closeRatingsModal = () => {
        setDisplayVideoRatingsModal(false);
        setVideoViewsNum(1);
        localStorage.setItem('videoViewsNum', 1);
    };

    return (
        <div data-vjs-player>
            <div ref={videoRef} />
            <Modal open={displayVideoRatingsModal} footer={null} onCancel={closeRatingsModal}>
                <VideoRatings videoId={props.videoId} closeModal={closeRatingsModal} />
            </Modal>
        </div>
    );
};

export default VideoJS;