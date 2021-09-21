import React from "react";
import {
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
} from "@material-ui/core";

const Songs = ({ songs }) => {
    let tracks = songs.map((song) => song.track.name);
    let songsSet = new Set(tracks);

    const elems = [...songsSet].map((track) => (
        <ListItem key={track}>
            <ListItemText primary={track} />
        </ListItem>
    ));

    return (
        <Paper>
            <Typography variant="h6">Songs</Typography>
            <List dense={true}>{elems}</List>
        </Paper>
    );
};

export default Songs;
