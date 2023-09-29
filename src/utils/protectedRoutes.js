import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router";
import { useParams } from "react-router-dom";

import AppRoutes from "./routes";

export const ProtectedRoute = (props) => {
    const { videoId, videoName } = useParams();
    if (props.auth.isAuthenticated && localStorage.getItem('token')) {
        return props.children;
    } else {
        return <Navigate to={`${AppRoutes.sign_in}?auth_redirect=/profile/video/play/${videoId}/${videoName}`} />;
    }
};

const mapStateToProps = store => {
    return { auth: store.auth }
}

export default connect(mapStateToProps)(ProtectedRoute);