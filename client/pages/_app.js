import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Audiofile</title>
                <link rel="icon" href="/Spotify_Icon_RGB_Green.png" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
