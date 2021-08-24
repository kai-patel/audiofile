import react from 'react';
import { Box, Container, Button } from '@material-ui/core';
import axios from 'axios';

const CLIENT_ID = process.env.CLIENT_ID || "";
const REDIRECT_URI = process.env.REDIRECT_URI || "http://localhost:5000/authorize"
const API_URI = process.env.API_URI || "http://localhost:5000"
const scopes = "user-read-private"
const spotifyURI = "https://accounts.spotify.com/authorize?reponse_type=code" +
      `&client_id=${CLIENT_ID}` +
      `&scope=${encodeURIComponent(scopes)}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

// Handle auth -- retrieve tokens from api
const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Clicked!");

    // Retrieve client code from Spotify
    let { codeData } = await axios.get(spotifyURI);
    console.log(codeData);

    // Send client code to API, get back tokens
    let { tokenData } = await axios.post(`${API_URI}/login`, { "code": codeData.code });
    console.log(tokenData);

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
