import React from "react";
import { Box } from "@material-ui/core";

import Login from "./components/Login/Login.js";
import Home from "./components/Home/Home.js";

let code = window.URLSearchParams(window.location.search).get("code");

const App = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            code ? <Home code={code} /> : <Login />
        </Box>
    );
};

export default App;
