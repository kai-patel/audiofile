import React from "react";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";

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

    const handleCheckboxChange = (newPlaylist) => () => {
        for (let playlist of chosenPlaylists) {
            if (playlist.id === newPlaylist.id) {
                setChosenPlaylists(
                    chosenPlaylists.filter((i) => i.id !== newPlaylist.id)
                );
                return;
            }
        }
        setChosenPlaylists([...chosenPlaylists, newPlaylist]);
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
            getTracks(playlist.id).then(
                function (data) {
                    data.forEach((song) => {
                        song.track.playlistID = playlist.id;
                    });
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
        <div className="flex flex-col w-screen h-screen overflow-hidden bg-gray-900">
            <h1 className="font-sans font-medium text-xl bg-green-500 rounded-lg shadow-2xl my-2 py-2 px-4">
                Welcome {displayName}
            </h1>
            <div className="flex flex-row overflow-hidden bg-red-500 p-4">
                {playlists ? (
                    <Playlists
                        playlists={playlists}
                        handleCheckboxChange={handleCheckboxChange}
                    />
                ) : null}
                {songs.length > 0 ? (
                    <Songs songs={songs} playlists={chosenPlaylists} />
                ) : null}
            </div>
        </div>
    );
};

export default Home;
