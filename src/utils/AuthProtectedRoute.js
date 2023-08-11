import React, { useState } from "react";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import AppRoutes from "./routes";

export const ProtectedRoute = (props) => {
    if (props.auth.isAuthenticated && localStorage.getItem('token')) {
        if (localStorage.getItem('redirectWebsite')) {
            let url = localStorage.getItem('redirectWebsite');
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