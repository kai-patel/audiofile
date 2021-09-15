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
    const [displayName, setDisplayName] = useState();
    const [userID, setUserID] = useState();
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.getMe().then(
            function (data) {
                setDisplayName(data.body.display_name);
                setUserID(data.body.id);
                console.log(data.body);
            },
            function (err) {
                console.log("Something went wrong!", err);
                return null;
            }
        );
    }, [accessToken]);

    useEffect(() => {
        if (!userID) return;
        spotifyApi.getUserPlaylists(userID).then(
            function (data) {
                setPlaylists(data.body.items);
                console.log(data);
            },
            function (err) {
                console.log("Something went wrong!", err);
                return null;
            }
        );
    }, [userID]);

    if (!spotifyApi.getAccessToken()) return <h1>Not authenticated</h1>;

    return <h4>Welcome {displayName}</h4>;
};

export default Home;
