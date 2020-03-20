const { menubar } = require('menubar');
const axios = require('axios');

const mb = menubar({
    browserWindow: { height: 1550, width: 800 },
    preloadWindow: true,
});

const setTitle = async () => {
    const response = await axios.get(
        'https://api.darksky.net/forecast/[REPLACE_ME_WITH_DARK_SKY_API_KEY]/39.8917,-85.9685'
    );
    mb.tray.setTitle(`${Math.round(response.data.currently.apparentTemperature)}°`);
};

const OneMinuteInMilliSeconds = 1000 * 60;
mb.on('ready', () => {
    console.log('window is shown');
    setTitle();
    setInterval(() => {
        console.log('window is reloaded');
        setTitle();
        mb.window.loadURL(`file://${__dirname}/index.html`);
    }, OneMinuteInMilliSeconds * 5);
});
