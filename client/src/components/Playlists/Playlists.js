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
    const elems = playlists.map((playlist) => (
        <ListItem key={playlist.name}>
            <ListItemAvatar>
                <Avatar variant="square" src={playlist?.images[1]?.url} />
            </ListItemAvatar>
            <ListItemText primary={playlist.name} />
            <Checkbox edge="end" onChange={handleCheckboxChange(playlist.id)} />
        </ListItem>
    ));

    return (
        <div className="container grid grid-cols-1 mx-auto my-auto">
            <h1>Playlists</h1>
            {elems}
        </div>
    );
};

export default Playlists;
