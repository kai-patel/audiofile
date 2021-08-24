import react from 'react';
import { Box, Container, Button } from '@material-ui/core';
import axios from 'axios';

const CLIENT_ID = process.env.CLIENT_ID || "";
const REDIRECT_URI = process.env.REDIRECT_URI || "http://localhost:5000/authorize"
const scopes = "user-read-private"
const spotifyURI = "https://accounts.spotify.com/authorize?reponse_type=code" +
      `&client_id=${CLIENT_ID}` +
      `&scope=${encodeURIComponent(scopes)}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Clicked!");
    let response = await axios.get(spotifyURI);
    console.log(response);
}

const App = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Button size="large" variant="contained" color="primary" onClick={handleLogin}>
                Login
            </Button>
        </Box>
    );
}

export default App;
