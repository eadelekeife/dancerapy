import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { signOutProp } from '../../utils/reducers/auth';
import { connect } from 'react-redux';

const SignOut = props => {

    useEffect(() => {
        props.signOutProp();
    }, [])

    let navigate = useNavigate();
    return navigate('/signin')
}
// props.signOutProp();
const mapStateToProps = store => {
    return { auth: store.auth };
}

export default connect(mapStateToProps, { signOutProp })(SignOut);