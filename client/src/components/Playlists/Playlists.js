import React, { useEffect } from "react";

const Playlists = ({ playlists, handleCheckboxChange }) => {
    // const elems = playlists.map((playlist) => (
    //     <ListItem key={playlist.name}>
    //         <ListItemAvatar>
    //             <Avatar variant="square" src={playlist?.images[1]?.url} />
    //         </ListItemAvatar>
    //         <ListItemText primary={playlist.name} />
    //         <Checkbox edge="end" onChange={handleCheckboxChange(playlist.id)} />
    //     </ListItem>
    // ));

    const elems = playlists.map((playlist, index) => (
        <li className="flex flex-row justify-between items-center h-10 mx-0 my-4" key={index}>
            <img className="h-10" src={playlist?.images[0]?.url} alt="" />
            <h1 className="mx-4 font-sans text-base">{playlist.name}</h1>
            <input
                type="checkbox"
                onChange={handleCheckboxChange(playlist.id)}
            />
        </li>
    ));

    return (
        <div className="grid grid-cols-1 mx-auto my-auto bg-green-800 shadow-xl rounded p-4">
            <h1 className="font-sans font-medium text-lg justify-self-center">Playlists</h1>
            <ul>{elems}</ul>
        </div>
    );
};

export default Playlists;
