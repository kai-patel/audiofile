import React from "react";

const Songs = ({ songs, playlists }) => {
    const table = songs.map(({ track }, index) => (
        <tr key={index}>
            <td className="border border-gray-800 text-center">{track.name}</td>
            <td className="border border-gray-800 text-center">
                {track.artists[0].name}
            </td>
        </tr>
    ));

    const playlistHeaders = playlists.map((playlist, index) => (
        <th key="index">{playlist.name}</th>
    ));

    return (
        <div className="container flex">
            <table className="bg-gray-300 shadow-inner border border-gray-700">
                <thead>
                    <tr>
                        <th className="border border-gray-800 text-center bg-green-500">
                            Track
                        </th>
                        <th className="border border-gray-800 text-center bg-green-300">
                            Artist
                        </th>
                    </tr>
                </thead>
                <tbody>{table}</tbody>
            </table>
        </div>
    );
};

export default Songs;
