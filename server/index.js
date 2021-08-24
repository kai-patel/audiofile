import express from 'express';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_ID = process.env.CLIENT_ID || "";
const CLIENT_SECRET = process.env.CLIENT_SECRET || "";
const REDIRECT_URI = process.env.REDIRECT_URI || "http://localhost:5000/authorize";

app.use(cors());
app.use(express.json());

app.use('/', (req, res) => {
    res.send("Hello!");
});

// Handle authorization code flow with Spotify
app.post('/authorize', (req, res) => {
    const token = req.body.token;
    const spotifyApi = new SpotifyWebApi({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        redirectUri: REDIRECT_URI
    });

    spotifyApi.authorizationCodeGrant(token).then((data) => {
        console.log(`Expires In: ${data.body.expires_in}`);
        console.log(`Access Token: ${data.body.access_token}`);
        console.log(`Refresh Token: ${data.body.refresh_token}`);
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        });
    }, (err) => {
        console.log("Could not authorize!");
        console.log(err);
        res.json({
            message: "Could not authorize",
            error: err
        });
    });
    
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));