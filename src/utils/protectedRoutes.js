import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router";

import AppRoutes from "./routes";

export const ProtectedRoute = (props) => {
    if (props.auth.isAuthenticated && localStorage.getItem('token')) {
        return props.children;
    } else {
        return <Navigate to={AppRoutes.signin} />;
    }
};

const mapStateToProps = store => {
    return { auth: store.auth }
}

export default connect(mapStateToProps)(ProtectedRoute);