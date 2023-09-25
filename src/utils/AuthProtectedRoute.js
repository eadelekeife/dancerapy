import React, { useState } from "react";
import { connect } from "react-redux";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";

import AppRoutes from "./routes";

export const ProtectedRoute = (props) => {
    const [urlLocation] = useSearchParams();
    const redirectURL = urlLocation.get('auth_redirect');
    if (props.auth.isAuthenticated && localStorage.getItem('token')) {
        if (redirectURL) {
            let url = redirectURL;
            localStorage.removeItem('redirectWebsite');
            return <Navigate to={url} />;
        } else {
            return <Navigate to={AppRoutes.profile} />;
        }
    } else {
        return props.children;
    }
};

const mapStateToProps = store => {
    return { auth: store.auth }
}

export default connect(mapStateToProps)(ProtectedRoute);