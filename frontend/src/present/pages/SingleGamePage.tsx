import React, { useEffect, useState } from "react";
import useLoadScript from "../../action/hooks/useLoadScript";

import SingleDomestic from "../layout/single/SingleDomestic";

const SingleGamePage = () => {
    // let locationMod = "international";
    let locationMod = "domestic";
    const NAVER_API_KEY = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=4vgyzjsnlj&submodules=panorama,drawing`;
    const GOOGLE_API_KEY = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC5fl-yV_BZhfIXZYDpU4JnCwFGDhd8oQA`;
    const [scriptLoadingState] = useLoadScript(locationMod === "domestic" ? NAVER_API_KEY : GOOGLE_API_KEY);
    const [showMap, setShowMap] = useState(false);

    useEffect(() => {
        if (scriptLoadingState !== 'l' && scriptLoadingState !== 'e' && window.naver) {
            setTimeout(() => {
                setShowMap(true);
            },1500)
        }
    }, [scriptLoadingState]);

    return (
        <React.Fragment>
            {
                showMap ? (locationMod === 'domestic' ? <SingleDomestic /> : <SingleDomestic />) : <h1>로딩중...</h1>
            }
        </React.Fragment>
    )
}

export default SingleGamePage;