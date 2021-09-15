import React from "react";
import { Box } from "@material-ui/core";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";

const App = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Login />
            <Home />
        </Box>
    );
};

export default App;
