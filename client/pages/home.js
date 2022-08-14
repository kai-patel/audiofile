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

    const [tableLoading, setTableLoading] = useState(false);

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
        setTableLoading(true);
        getSongsFromSelected(selectedPlaylists).then(
            function (data) {
                setSongsFromSelected([...data]);
                console.log("Songs", data);
                setTableLoading(false);
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
        if (songsFromSelected.length > 0) {
            return (
                <SelectionTable
                    loading={loading}
                    userPlaylists={userPlaylists}
                    songsFromSelected={songsFromSelected}
                    toggleSongCheckbox={toggleSongCheckbox}
                />
            );
        } else {
            return null;
        }
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
                                      userID={user.userID}
                                      key={index}
                                  />
                              );
                          })
                        : null}
                </div>
                {tableLoading ? (
                    <div role="status">
                        <svg
                            aria-hidden="true"
                            className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    getTable()
                )}
            </div>
        </div>
    );
};

export default Home;
