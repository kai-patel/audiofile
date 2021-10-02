import React from "react";

const CLIENT_ID = "1a457bdb20ac4f9c81b53a9e37cb6568";
const REDIRECT_URI = "http://localhost:3000";

const scopes = "user-read-private playlist-modify-private";

const spotifyURI =
    "https://accounts.spotify.com/authorize" +
    "?response_type=code" +
    "&client_id=" +
    CLIENT_ID +
    (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
    "&redirect_uri=" +
    encodeURIComponent(REDIRECT_URI);

const Login = () => {
    return (
        <div className="grid place-items-center w-screen h-screen mx-0 my-0 bg-gray-900">
            <a
                href={spotifyURI}
                className="px-4 py-2 text-lg bg-green-500 text-white rounded-lg shadow"
            >
                Login
            </a>
        </div>
    );
};

export default Login;
