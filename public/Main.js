const { menubar } = require('menubar');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const menubarOptions = {
    browserWindow: {
        height: 1550,
        width: 800,
    },
    preloadWindow: true,
};
if (process.env.NODE_ENV === undefined) {
    menubarOptions.dir = path.join(__dirname, '../build/');
}
const mb = menubar(menubarOptions);

const getDarkSkyData = async () => {
    const response = await axios.get(process.env.REACT_APP_DARK_SKY_API_URL);
    return response.data;
};

const setTitle = (apparentTemperature) => mb.tray.setTitle(`${Math.round(apparentTemperature)}°`);

const OneMinuteInMilliSeconds = 1000 * 60;
mb.on('after-create-window', async () => {
    console.log('window is shown');
    console.log({ env: process.env.NODE_ENV });
    if (process.env.NODE_ENV === undefined) {
        mb.window.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
    } else {
        mb.window.webContents.openDevTools();
        mb.window.loadURL('http://localhost:3000/');
    }
    const {
        currently: { apparentTemperature },
    } = await getDarkSkyData();
    setTitle(apparentTemperature);
    setInterval(async () => {
        console.log('window is reloaded');
        const {
            currently: { apparentTemperature },
        } = await getDarkSkyData();
        setTitle(apparentTemperature);
    }, OneMinuteInMilliSeconds * 10);
});
