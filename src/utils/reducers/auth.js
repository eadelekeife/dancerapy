import axios from '../axiosCall';

export const loginUser = (e) => async dispatch => {
    let { emailAddress, password } = e
    try {
        let submitData = await axios.post('/signin', {
            emailAddress,
            password,
        });
        if (submitData.data.statusMessage === 'success') {
            dispatch({ type: 'LOGIN_SUCCESS', payload: submitData.data.message });
        } else {
            dispatch({ type: 'LOGIN_FAILURE', payload: submitData.data.summary })
        }
    } catch (err) {
        console.log(err);
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