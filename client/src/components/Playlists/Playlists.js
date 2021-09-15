import React, { useEffect } from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";

const Playlists = ({ playlists }) => {
    const elems = playlists.map((playlist) => (
        <Grid item xs key={playlist.name}>
            <Card>
                <CardContent>
                    <Typography variant="body2">{playlist.name}</Typography>
                </CardContent>
            </Card>
        </Grid>
    ));

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
        >
            {elems}
        </Grid>
    );
};

export default Playlists;
