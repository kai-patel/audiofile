import React from "react";
import { Box } from "@material-ui/core";

import Login from "./components/Login/Login.js";
import Home from "./components/Home/Home.js";

let code = new URLSearchParams(window.location.search).get("code");

const App = () => {
    return <>{code ? <Home code={code} /> : <Login />}</>;
};

export default App;
