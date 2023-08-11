import axios, {userAxiosCall} from '../axiosCall';
import { _signin_user_from_trial } from '../axiosroutes';

export const loginUser = (e) => async dispatch => {
    let { emailAddress, password } = e
    try {
        let submitData = await userAxiosCall.post('/users/signin-user', {
            emailAddress,
            password,
        });
        console.log(submitData)
        if (submitData.data.statusMessage === 'success') {
            dispatch({ type: 'LOGIN_SUCCESS', payload: submitData.data.message });
        } else {
            dispatch({ type: 'LOGIN_FAILURE', payload: submitData.data.summary })
        }
    } catch (err) {
        dispatch({ type: 'LOGIN_FAILURE', payload: '' })
    }
};

export const loginUserFromTrial = (e) => async dispatch => {
    try {
        let submitData = await _signin_user_from_trial(e);
        if (submitData.data.statusMessage === 'success') {
            dispatch({ type: 'LOGIN_SUCCESS', payload: submitData.data.message });
            return submitData;
        } else {
            dispatch({ type: 'LOGIN_FAILURE', payload: submitData.data.summary })
        }
    } catch (err) {
        dispatch({ type: 'LOGIN_FAILURE', payload: '' })
    }
};

export const signOutProp = () => {
    return {
        type: 'LOGOUT_SUCCESS'
    }
}

export const updateUser = user => {
    return {
        type: "UPDATE_USER",
        payload: user
    }
}

export const loginUserFromPlan = (e) => async dispatch => {
    dispatch({ type: 'LOGIN_SUCCESS', payload: e });
};