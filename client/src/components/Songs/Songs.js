import React from "react";
import {
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
    Divider,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@material-ui/core";

const Songs = ({ songs }) => {
    const table = songs.map(({ track }, index) => (
        <TableRow key={index}>
            <TableCell>{track.name}</TableCell>
            <TableCell>{track.artists[0].name}</TableCell>
        </TableRow>
    ));

    return (
        <TableContainer
            component={Paper}
            style={{ maxHeight: "75vh", maxWidth: "100%", overflow: "auto" }}
        >
            <Table padding="normal">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" style={{ width: "10vw" }}>
                            <b>Track</b>
                        </TableCell>
                        <TableCell align="left" style={{ width: "20vw" }}>
                            Artist
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{table}</TableBody>
            </Table>
        </TableContainer>
    );
};

export default Songs;
