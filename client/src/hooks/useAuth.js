import React from "react";
import axios from "axios";

import { useEffect, useState } from "react";

function useAuth(code) {
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [expiresIn, setExpiresIn] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:5000/login/", {
                code,
            })
            .then((res) => {
                setAccessToken(res.data.accessToken);
                setRefreshToken(res.data.refreshToken);
                setExpiresIn(res.data.expiresIn);
                //window.history.pushState({}, null, "/");
                console.log(accessToken);
            })
            .catch((err) => {
                console.log(err);
                //window.location = "/";
            });
    }, [code]);

    return accessToken;
}

export default useAuth;
