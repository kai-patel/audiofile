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
    const [chosenPlaylists, setChosenPlaylists] = useState([]);
    const [songs, setSongs] = useState([]);

    const handleCheckboxChange = (id) => () => {
        if (chosenPlaylists.includes(id)) {
            setChosenPlaylists(chosenPlaylists.filter((i) => i !== id));
        } else {
            setChosenPlaylists([...chosenPlaylists, id]);
        }
    };

    const getTracks = async (id) => {
        let tracks = [];
        let total = 0;
        let offset = 0;
        let data = await spotifyApi.getPlaylistTracks(id);
        total = data.body.total;
        tracks.push(...data.body.items);

        while (tracks.length < total) {
            offset += 100;
            let data = await spotifyApi.getPlaylistTracks(id, { offset });
            tracks.push(...data.body.items);
        }

        return tracks;
    };

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
        if (!chosenPlaylists) return;
        if (!accessToken) return;
        console.log("Chosen Playlists:", chosenPlaylists);
        setSongs([]);
        for (let playlist of chosenPlaylists) {
            getTracks(playlist).then(
                function (data) {
                    setSongs([...songs, ...data]);
                },
                function (err) {
                    console.log("Something went wrong!", err);
                    return null;
                }
            );
        }
    }, [chosenPlaylists]);

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
        <Box mt={4}>
            <Grid
                container
                spacing={4}
                alignItems="center"
                justifyContent="center"
            >
                <Grid item>
                    <Typography variant="h4">Welcome {displayName}</Typography>
                </Grid>
                <Grid
                    container
                    item
                    spacing={2}
                    alignItems="flex-start"
                    justifyContent="flex-start"
                >
                    <Grid item>
                        {playlists ? (
                            <Playlists
                                playlists={playlists}
                                handleCheckboxChange={handleCheckboxChange}
                            />
                        ) : null}
                    </Grid>
                    <Grid item>
                        {songs.length > 0 ? <Songs songs={songs} /> : null}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;
