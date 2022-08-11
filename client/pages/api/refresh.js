import { spotifyApi } from "../../lib/APIObjectWrapper";

export default function handler(req, res) {
    spotifyApi.refreshAccessToken().then(
        function (data) {
            console.log("The access token has been refreshed!");
            spotifyApi.setAccessToken(data.body.access_token);
            res.json({
                accessToken: data.body.access_token,
            });
        },
        function (err) {
            console.log("Could not refresh access token", err);
        }
    );
}
