const { BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../../build/index.html")}`
  );

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

module.exports = createWindow;
