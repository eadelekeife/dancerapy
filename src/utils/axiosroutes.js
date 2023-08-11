import axiosCall, { userAxiosCall } from "./axiosCall";
import Axios from "axios";

export const _save_instructor_data = req => {
    return axiosCall.post('/save-new-instructor', req);
}

export const _save_user_from_marketing = req => {
    return axiosCall.post('/save-user-from-marketing', req);
}

export const _save_user_from_trial = req => {
    return axiosCall.post('/week-trial-subscription-signup', req);
}

export const _signin_user_from_trial = req => {
    return axiosCall.post('/week-trial-subscription-signin', req);
}

export const _signup_new_user = req => {
    return userAxiosCall.post('/users/signup-user', req);
}

export const _fetch_user_wallet = req => {
    return userAxiosCall('/users/fetch-user-wallet', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
}
export const _fetch_user_wallet_transactions = req => {
    return userAxiosCall('/users/fetch-user-wallet-transactions', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
}

export const _trial_activation_for_users = () => {
    return axiosCall.post('/week-trial-subscription-registered-users', {}, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
}

export const _check_user_product_purchase = req => {
    return axiosCall.post('/checkproductpurchase', {
        coursePlanId: req
    }, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const _update_video_data = req => {
    return userAxiosCall.post('/videos/update_video_counter', {
        videoId: req
    }, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const _update_video_half_data = req => {
    return userAxiosCall.post('/videos/update_video_half_counter', {
        viewsId: req
    }, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}
export const _update_video_full_data = req => {
    return userAxiosCall.post('/videos/update_video_full_counter', {
        viewsId: req
    }, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const _fund_user_wallet_balance = req => {
    return userAxiosCall.post('/users/fund-user-wallet', req, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}
export const _initiate_fund_user_wallet_balance = req => {
    return userAxiosCall.post('/users/initiate-fund-user-wallet', req, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}
export const _cancel_fund_user_wallet = req => {
    return userAxiosCall.post('/users/cancel-fund-user-wallet', req, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const _add_video_ratings = req => {
    return userAxiosCall.post('/users/add-video-ratings', req, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}
export const _fetch_all_user_video_views = req => {
    return userAxiosCall('/users/fetch-user-video-views', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const _fetch_app_videos = req => {
    return userAxiosCall('/videos/fetch-all-videos', req, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const _buy_single_video = req => {
    return userAxiosCall.post('/users/buy-single-video', req, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const _buy_single_video_with_tokens = req => {
    return userAxiosCall.post('/users/buy-single-video-with-token', req, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const _add_video_to_cart = req => {
    return userAxiosCall.post('/users/add-video-to-cart', req, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const _verify_new_user = req => {
    return userAxiosCall.post('/users/verify-new-user', { token: req }, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const _complete_cart_purchase = req => {
    return userAxiosCall.post('/users/buy-videos-from-cart', req, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const _fetch_videos_from_cart = req => {
    return userAxiosCall('/users/fetch-videos-from-cart', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const _delete_video_from_cart = req => {
    return userAxiosCall.post('/users/delete-video-from-cart', req, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const _find_video_by_id = videoId => {
    return userAxiosCall(`/videos/find-video-by-id/${videoId}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const _update_user_token_by_views = req => {
    return userAxiosCall.post(`/videos/update-user-token-by-video`, req, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}


// export const _update_video_data = req => {
//     return axiosCall.post('/update_video_counter', {
//         videoId: req
//     }, {
//         headers: {
//             authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//     })
// }

// export const _update_video_half_data = req => {
//     return axiosCall.post('/update_video_half_counter', {
//         viewsId: req
//     }, {
//         headers: {
//             authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//     })
// }
// export const _update_video_full_data = req => {
//     return axiosCall.post('/update_video_full_counter', {
//         viewsId: req
//     }, {
//         headers: {
//             authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//     })
// }