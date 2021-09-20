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
    Checkbox
} from "@material-ui/core";

const Playlists = ({ playlists }) => {
    const elems = playlists.map((playlist) => (
        <ListItem key={playlist.name}>
            <ListItemAvatar>
                <Avatar src={playlist?.images[1]?.url} />
            </ListItemAvatar>
            <ListItemText primary={playlist.name} />
            <Checkbox
                edge="end"
            />
        </ListItem>
    ));

    return (
        <Paper>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid item>
                    <Typography variant="h6">Playlists</Typography>
                </Grid>
                <Grid item>
                    <List dense={true}>{elems}</List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Playlists;
