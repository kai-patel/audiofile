import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";
import { Box, Grid, Typography } from "@material-ui/core";

import useAuth from "../../hooks/useAuth.js";
import Playlists from "../Playlists/Playlists.js";
import Songs from "../Songs/Songs.js";

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
                let items = data.body.items;
                setPlaylists(items);
            },
            function (err) {
                console.log("Something went wrong!", err);
                return null;
            }
        );
    }, [userID, accessToken]);

    useEffect(() => {
        if (!playlists) return;
        console.log("Playlists --- \n", playlists);
    }, [playlists]);

    useEffect(() => {
        if (!playlists) return;
        console.log("User Details --- \n", displayName, userID);
    }, [displayName, userID]);

    if (!spotifyApi.getAccessToken()) return <h1>Not authenticated</h1>;

    return (
        <Box>
            <Grid
                container
                spacing={4}
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="h5">Welcome {displayName}</Typography>
                <Grid container item spacing={2}>
                    <Grid item>
                        {playlists ? <Playlists playlists={playlists} /> : null}
                    </Grid>
                    <Grid item>
                        <Songs />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;
