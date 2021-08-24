import react from 'react';
import { Container, Button } from '@material-ui/core';
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
            <div style={{"width": "100%", "height": "100%"}}>
            <Container>
            <Button variant="contained" color="primary" size="large" onClick={handleLogin}>
            Login
        </Button>
            </Container>
            </div>
    );
}

export default App;
