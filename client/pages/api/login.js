import spotifyApi from "../../lib/APIObjectWrapper";

export default function handler(req, res) {
    const token = req.query.code;

    spotifyApi.authorizationCodeGrant(token).then(
        (data) => {
            console.log(`Expires In: ${data.body.expires_in}`);
            console.log(`Access Token: ${data.body.access_token}`);
            console.log(`Refresh Token: ${data.body.refresh_token}`);
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in,
            });
            spotifyApi.setAccessToken(data.body.access_token);
            spotifyApi.setRefreshToken(data.body.refresh_token);
        },
        (err) => {
            console.log("Could not authorize!");
            console.log(err);
            res.json({
                message: "Could not authorize",
                error: err,
            });
        }
    );
}
