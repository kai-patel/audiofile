import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";

import Welcome from "./Welcome";
import PlaylistListItem from "./PlaylistListItem";
import SelectionTable from "./SelectionTable";

const spotifyApi = new SpotifyWebApi({
    clientId: "1a457bdb20ac4f9c81b53a9e37cb6568",
});

const Home = () => {
    const code = useRouter().query.code; // Get code parameter from URL
    const [loading, setLoading] = useState(true);
    const [tokens, setTokens] = useState({});

    const [user, setUser] = useState({});
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [songsFromSelected, setSongsFromSelected] = useState([]);

    // Get access token using retrieved code
    useEffect(() => {
        if (!code) return;

        const getUser = () => {
            if (!spotifyApi.getAccessToken()) return;
            spotifyApi.getMe().then(
                function (data) {
                    setUser({
                        displayName: data.body.display_name,
                        userID: data.body.id,
                    });
                },
                function (err) {
                    console.error("Error in getMe()", err);
                }
            );
        };

        const getUserPlaylists = () => {
            if (!user || !spotifyApi.getAccessToken()) return;

            (async function () {
                let lists = [];
                let total = 0;
                let offset = 0;
                let data = await spotifyApi.getUserPlaylists(user.userID);
                total = data.body.total;
                lists.push(...data.body.items);

                while (lists.length < total) {
                    offset += 20;
                    let data = await spotifyApi.getUserPlaylists(user.userID, {
                        offset,
                    });
                    lists.push(...data.body.items);
                }
                return lists;
            })().then(
                function (data) {
                    console.log(data);
                    let items = data;
                    items.forEach((item) => {
                        item.selected = false;
                    });
                    setUserPlaylists(items);
                },
                function (err) {
                    console.error(
                        "Error getting all user playlists (immediate pagination fn)",
                        err
                    );
                }
            );
        };

        const getAccessToken = () => {
            console.log("Getting access token...", code);
            axios
                .get("/api/login/", { params: { code } })
                .then((res) => {
                    console.log("Setting tokens");
                    console.log(res.data);
                    spotifyApi.setAccessToken(res.data.accessToken);
                    spotifyApi.setRefreshToken(res.data.refreshToken);
                    setTokens(res.data);
                    window.history.pushState({}, "", "/home");
                    getUser();
                    getUserPlaylists();
                    setInterval(
                        () => {
                            axios.get("/api/refresh/").then(
                                function (res) {
                                    spotifyApi.setAccessToken(
                                        res.data.accessToken
                                    );
                                    console.log("Refreshed token!");
                                },
                                function (err) {
                                    console.error(
                                        "Error refreshing access token",
                                        err
                                    );
                                }
                            );
                        },
                        res.data.expiresIn
                            ? res.data.expiresIn * 1000
                            : 10 * 1000
                    );
                })
                .catch((err) => {
                    console.error(err);
                    window.location = "/";
                });
        };

        setLoading(true);
        getAccessToken();
        setSongsFromSelected([]);
        setLoading(false);
    }, [code]);

    // On user playlists state change, get all songs from selected playlists
    useEffect(() => {
        if (loading) return;

        // Get songs from single playlist (paginated)
        const getSongs = async (id) => {
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

        // Iterate through all selected playlists
        const getSongsFromSelected = async (selectedPlaylists) => {
            let songs = [];

            if (selectedPlaylists.length === 0) {
                setSongsFromSelected([]);
                return [];
            }

            for (let playlist of selectedPlaylists) {
                let res = await getSongs(playlist.id);

                let index = 0;
                while (index < res.length) {
                    let s = res[index];
                    s.track.playlistID = [playlist.id];
                    let dupe = songs.findIndex(
                        (i) => i.track.name === s.track.name
                    );
                    if (dupe > -1) {
                        songs[dupe].track.playlistID = songs[
                            dupe
                        ].track.playlistID.concat(s.track.playlistID);
                        res.splice(index, 1);
                        index--;
                    }
                    index++;
                }

                songs = songs.concat(res);
            }

            return [...songs];
        };

        let selectedPlaylists = [...userPlaylists];
        selectedPlaylists = selectedPlaylists.filter(
            (playlist) => playlist.selected
        );

        console.log("Selected", selectedPlaylists);
        getSongsFromSelected(selectedPlaylists).then(
            function (data) {
                setSongsFromSelected([...data]);
                console.log("Songs", data);
            },
            function (err) {
                setSongsFromSelected([]);
                console.error("Error in getSongsFromSelected()", err);
            }
        );
    }, [userPlaylists]);

    // On-click toggle whether playlist is selected
    const togglePlaylistSelected = (toggled) => {
        let tempPlaylists = [...userPlaylists];

        tempPlaylists.forEach((playlist) => {
            if (playlist.id === toggled.id) {
                playlist.selected = !playlist.selected;
            }
        });

        setUserPlaylists(tempPlaylists);
    };

    const toggleSongCheckbox = (e, song, playlist) => {
        if (e.target.checked === false) {
            console.log("Removed", song.track.name, "from", playlist.name);
            spotifyApi
                .removeTracksFromPlaylist(playlist.id, [
                    { uri: song.track.uri },
                ])
                .then(
                    function (data) {
                        console.log("Removed", data);
                    },
                    function (err) {
                        console.error(
                            "Error in removeTracksFromPlaylist (inside toggleSongCheckbox)",
                            err
                        );
                    }
                );
        } else {
            console.log("Added", song.track.name, "to", playlist.name);
            spotifyApi.addTracksToPlaylist(playlist.id, [song.track.uri]).then(
                function (data) {
                    console.log("Added", data);
                },
                function (err) {
                    console.error(
                        "Error in addTracksToPlaylist (inside toggleSongCheckbox)",
                        err
                    );
                }
            );
        }
    };

    // Generate a table of all selected songs
    const getTable = () => {
        return (
            <SelectionTable
                loading={loading}
                userPlaylists={userPlaylists}
                songsFromSelected={songsFromSelected}
                toggleSongCheckbox={toggleSongCheckbox}
            />
        );
    };

    return (
        <div className="flex flex-col w-screen h-screen space-y-1 bg-gray-800">
            <Welcome displayName={user.displayName} />
            <div className="flex flex-row h-[95%] w-full place-items-center place-content-center space-x-64 bg-gray-800">
                <div className="flex flex-col w-[20%] h-[75%] bg-green-500 rounded shadow-lg overflow-y-auto p-0">
                    {!loading
                        ? userPlaylists.map((playlist, index) => {
                              return (
                                  <PlaylistListItem
                                      userPlaylists={userPlaylists}
                                      index={index}
                                      togglePlaylistSelected={
                                          togglePlaylistSelected
                                      }
                                      playlist={playlist}
                                      key={index}
                                  />
                              );
                          })
                        : null}
                </div>
                {songsFromSelected.length > 0 ? getTable() : null}
            </div>
        </div>
    );
};

export default Home;
