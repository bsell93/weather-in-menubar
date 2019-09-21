const { menubar } = require("menubar");

const mb = menubar({ browserWindow: { height: 675, width: 800 } });

mb.on("ready", () => {
  console.log("app is ready");
  // your app code here
});
