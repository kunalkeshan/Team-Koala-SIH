/**
 * Backdrop Component
 */

// Dependencies
import React from "react";
import { useSelector } from "react-redux";
import Main from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function BackdropComponent() {
    const { showLoading } = useSelector((state) => state.app.value);

    return (
        <Main className="z-50 text-white" open={showLoading}>
            <CircularProgress color="inherit" />
        </Main>
    );
}

export default BackdropComponent;