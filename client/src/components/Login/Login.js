import React from "react";
import { Button } from "@material-ui/core";

const CLIENT_ID = "1a457bdb20ac4f9c81b53a9e37cb6568";
const REDIRECT_URI = "http://localhost:3000";
const API_URI = "http://localhost:5000";

const scopes = "user-read-private";

const spotifyURI =
    "https://accounts.spotify.com/authorize" +
    "?response_type=code" +
    "&client_id=" +
    CLIENT_ID +
    (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
    "&redirect_uri=" +
    encodeURIComponent(REDIRECT_URI);

const Login = () => {
    return (
        <Button
            href={spotifyURI}
            size="large"
            variant="contained"
            color="primary"
        >
            Login
        </Button>
    );
};

export default Login;
