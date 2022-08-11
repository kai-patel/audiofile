import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
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
