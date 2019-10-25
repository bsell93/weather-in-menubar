const { menubar } = require("menubar");

const loadView = () => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Weather</title>
      <style>
        body > iframe:not(:last-child) {
          margin-bottom: 40px;
          padding-bottom: 40px;
          border-bottom: 2px solid black;
        }
      </style>
    </head>
    <body>
      <script
        type="text/javascript"
        src="https://darksky.net/widget/default/39.8917,-85.9685/us12/en.js?width=100%&height=301&title=Full Forecast&textColor=333333&bgColor=transparent&transparency=true&skyColor=undefined&fontFamily=Default&customFont=&units=us&htColor=333333&ltColor=C7C7C7&displaySum=yes&displayHeader=yes"
      ></script>
      <script
        type="text/javascript"
        src="https://darksky.net/widget/graph-bar/39.8917,-85.9685/us12/en.js?width=100%&height=260&title=Full Forecast&textColor=333333&bgColor=transparent&transparency=true&skyColor=undefined&fontFamily=Default&customFont=&units=us&timeColor=333333&tempColor=333333&currentDetailsOption=true"
      ></script>
    </body>
  </html>
  `;
};

const mb = menubar({
  browserWindow: { height: 675, width: 800 },
  preloadWindow: true
});

const OneMinuteInMilliSeconds = 1000 * 60;
mb.on("ready", () => {
  console.log("window is shown");
  setInterval(() => {
    console.log("window is reloaded");
    const file =
      "data:text/html;charset=UTF-8," + encodeURIComponent(loadView());
    mb.window.loadURL(file);
  }, OneMinuteInMilliSeconds * 5);
});
