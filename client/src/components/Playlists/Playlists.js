import React, { useEffect } from "react";
import {
    Paper,
    Avatar,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Grid,
    Typography,
    Checkbox,
} from "@material-ui/core";

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

    const elems = playlists.map((playlist) => (
        <li className="flex flex-row justify-start items-center h-10 mx-auto my-auto">
            <img className="h-10" src={playlist?.images[0]?.url} alt="" />
            <h1>{playlist.name}</h1>
            <input
                type="checkbox"
                onChange={handleCheckboxChange(playlist.id)}
            />
        </li>
    ));

    return (
        <div className="grid grid-cols-1 mx-auto my-auto">
            <h1>Playlists</h1>
            <ul>{elems}</ul>
        </div>
    );
};

export default Playlists;
