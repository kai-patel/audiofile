import React from "react";

const Songs = ({ songs }) => {
    const table = songs.map(({ track }, index) => (
        <tr key={index}>
            <td>{track.name}</td>
            <td>{track.artists[0].name}</td>
        </tr>
    ));

    return (
        <table>
            <thead>
                <tr>
                    <th>Track</th>
                    <th>Artist</th>
                </tr>
            </thead>
            <tbody>{table}</tbody>
        </table>
    );
};

export default Songs;
