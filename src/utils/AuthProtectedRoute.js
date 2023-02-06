import React, { useState } from "react";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import AppRoutes from "./routes";

export const ProtectedRoute = (props) => {
    if (props.auth.isAuthenticated && localStorage.getItem('token')) {
        return <Navigate to={AppRoutes.profile} />;
    } else {
        return props.children;
    }
};

const mapStateToProps = store => {
    return { auth: store.auth }
}

export default connect(mapStateToProps)(ProtectedRoute);