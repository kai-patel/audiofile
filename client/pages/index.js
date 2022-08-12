const CLIENT_ID = "1a457bdb20ac4f9c81b53a9e37cb6568";
const REDIRECT_URI = process.env.REDIRECT_URI;

const scopes =
    "user-read-private playlist-modify-private playlist-read-private playlist-modify-public";

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
        <div className="flex flex-col justify-evenly place-items-center w-screen h-screen mx-0 my-0 bg-gray-900">
            <h1 className="text-green-500 text-4xl sm:text-8xl p-4 text-center font-bold bg-gradient-to-r from-green-900 to-gray-800 rounded-2xl shadow select-none">
                <a href="https://www.github.com/kai-patel/audiofile">
                    Audiofile
                </a>
            </h1>
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
