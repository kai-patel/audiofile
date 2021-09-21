import React from "react";
import {
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
} from "@material-ui/core";

const Songs = ({ songs }) => {
    const elems = songs.map(({ track }, index) => (
        <ListItem key={index}>
            <ListItemText primary={track.name} />
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
