import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

const OneMinuteInMilliSeconds = 1000 * 60;
const Current = () => {
    const [darkSky, setDarkSky] = useState(null);
    const setDarkSkyData = useCallback(async () => {
        console.log(`Called here`);
        console.log({ env: process.env });
        const response = await axios(process.env.REACT_APP_DARK_SKY_API_URL);
        console.log({ data: response.data });
        setDarkSky(response.data);
    }, []);
    useEffect(() => {
        setDarkSkyData();
        const timeout = setTimeout(() => {
            setDarkSkyData();
        }, OneMinuteInMilliSeconds * 10);
        return () => {
            console.log(`clear timeout`);
            clearTimeout(timeout);
        };
    }, [setDarkSkyData]);
    return <div>Hello World {darkSky && darkSky.currently.apparentTemperature}℉</div>;
};

export default Current;
