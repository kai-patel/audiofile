import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";

import useAuth from "../../hooks/useAuth.js";

const spotifyApi = new SpotifyWebApi({
    clientId: "1a457bdb20ac4f9c81b53a9e37cb6568",
});

const Home = ({ code }) => {
    const accessToken = useAuth(code);

    return <h1>Welcome: {accessToken}</h1>;
};

export default Home;
