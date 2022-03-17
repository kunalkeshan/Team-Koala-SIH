/**
 * Snackbar Component
 */

// Dependencies
import React from "react";
import Main from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import Slide from '@mui/material/Slide';
import { useSelector, useDispatch } from "react-redux";

// Actions
import { hideSnackbar } from "../../store/features/app";

function SnackbarComponent() {
    const dispatch = useDispatch();
    const { snackbar } = useSelector((state) => state.app.value);

    // Close Snackbar Function
    const handleSnackbarClose = () => {
        dispatch(hideSnackbar());
    };
    return (
        <Main
            open={snackbar.display}
            autoHideDuration={6000} // 6 Seconds before Hiding the Main
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            TransitionComponent={Slide}
        >
            <Alert
                onClose={handleSnackbarClose}
                severity={snackbar.type}
                variant="standard"
                className="z-50 w-full"
            >
                {snackbar.message}
            </Alert>
        </Main>
    );
}

export default SnackbarComponent;