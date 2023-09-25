import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { signOutProp } from '../../utils/reducers/auth';
import { connect } from 'react-redux';
import { _signout_user_ } from '../../utils/axiosroutes';

const SignOut = props => {
    let navigate = useNavigate();
    const [errorOccurred, setErrorOccurred] = useState(false);
    const signOutUser = async () => {
        try {
            let signout = await _signout_user_();
            props.signOutProp();
            navigate('/signin');
        } catch (err) {
            props.signOutProp();
            navigate('/signin');
        }
    }
    useEffect(() => {
        signOutUser();
    }, []);

}
const mapStateToProps = store => {
    return { auth: store.auth };
}

export default connect(mapStateToProps, { signOutProp })(SignOut);