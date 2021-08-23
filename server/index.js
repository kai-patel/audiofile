import express from 'express';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_ID = process.env.CLIENT_ID || "";
const CLIENT_SECRET = process.env.CLIENT_SECRET || "";

app.use(cors());
app.use(express.json());

app.use('/', (req, res) => {
    res.send("Hello!");
});

// Handle authorization code flow with Spotify
app.post('/authorize', (req, res) => {
    const token = req.body.token;
    // TODO: Install and use spotify-web-api-node wrapper
    
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
