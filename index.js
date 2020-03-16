const { menubar } = require('menubar');

const mb = menubar({
    browserWindow: { height: 1550, width: 800 },
    preloadWindow: true,
});

const OneMinuteInMilliSeconds = 1000 * 60;
mb.on('ready', () => {
    console.log('window is shown');
    setInterval(() => {
        console.log('window is reloaded');
        mb.window.loadURL(`file://${__dirname}/index.html`);
    }, OneMinuteInMilliSeconds * 5);
});
