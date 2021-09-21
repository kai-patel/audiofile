import React from "react";
import {
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
    Divider,
} from "@material-ui/core";

const Songs = ({ songs }) => {
    const elems = songs.map(({ track }, index) => (
        <React.Fragment key={index}>
            <ListItem>
                <ListItemText primary={track.name} />
            </ListItem>
            <Divider variant="fullWidth" component="li" />
        </React.Fragment>
    ));

    return (
        <Paper square variant="outlined">
            <Typography align="center" variant="h6">
                Songs
            </Typography>
            <List dense={true}>{elems}</List>
        </Paper>
    );
};

export default Songs;
