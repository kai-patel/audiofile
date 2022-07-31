import React, { useEffect } from "react";

const Songs = ({ songs, playlists }) => {
    const getBoxes = (track) => {
        let boxes = [];
        for (let i = 0; i < playlists.length; i++) {
            const playlist = playlists[i];
            // console.log(track.name, playlist.id, track.playlistID);
            if (playlist.id === track.playlistID) {
                boxes.push(
                    <td
                        className="border border-gray-800 text-center"
                        key={track.name + playlist.id}
                    >
                        <input type="checkbox" checked={true} readOnly={true} />
                    </td>
                );
            } else {
                boxes.push(
                    <td
                        className="border border-gray-800 text-center"
                        key={track.name + playlist.id}
                    >
                        <input
                            type="checkbox"
                            checked={false}
                            readOnly={true}
                        />
                    </td>
                );
            }
        }
        return boxes;
    };

    let table = songs.map(({ track }, index) => (
        <tr key={index}>
            <td className="border border-gray-800 text-center">{track.name}</td>
            <td className="border border-gray-800 text-center">
                {track.artists[0].name}
            </td>
            {getBoxes(track)}
        </tr>
    ));

    const playlistHeaders = playlists.map((playlist, index) => (
        <th
            className="border border-gray-800 text-center bg-green-200"
            key={index}
        >
            {playlist.name}
        </th>
    ));

    return (
        <div className="flex flex-col container h-full max-h-full overflow-y-scroll border-green-900 border-2 p-0 shadow-lg">
            <table className="relative bg-gray-300 shadow-inner border border-gray-700">
                <thead className="sticky top-[-1px]">
                    <tr>
                        <th className="border border-gray-800 text-center bg-green-500">
                            Track
                        </th>
                        <th className="border border-gray-800 text-center bg-green-300">
                            Artist
                        </th>
                        {playlistHeaders}
                    </tr>
                </thead>
                <tbody>{table}</tbody>
            </table>
        </div>
    );
};

export default Songs;
