"use strict";

const {app, BrowserWindow, Menu} = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

const installMenu = () => {
  if (process.platform === "darwin") {
    const menu = Menu.buildFromTemplate([
      {
        label: "PW-copy-Generator",
        submenu: [
          {
            label: "About PW-copy-Generator",
            selector: "orderFrontStandardAboutPanel:"
          },
          {
            type: "separator"
          },
          {
            label: "Services",
            submenu: []
          },
          {
            type: "separator"
          },
          {
            label: "Hide PW-copy-Generator",
            accelerator: "Command+H",
            selector: "hide:"
          },
          {
            label: "Hide Others",
            accelerator: "Command+Shift+H",
            selector: "hideOtherApplications:"
          },
          {
            label: "Show All",
            selector: "unhideAllApplications:"
          },
          {
            type: "separator"
          },
          {
            label: "Quit",
            accelerator: "Command+Q",
            click() {
              app.quit();
            }
          }
        ]
      },
      {
        label: "View",
        submenu: [
          {
            label: "Reload",
            accelerator: "Command+R",
            click() {
              mainWindow.reload();
            }
          },
          {
            label: "Toggle Full Screen",
            accelerator: "Ctrl+Command+F",
            click() {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          },
          {
            label: "Toggle Developer Tools",
            accelerator: "Alt+Command+I",
            click() {
              mainWindow.toggleDevTools();
            }
          }
        ]
      }
    ]);
    Menu.setApplicationMenu(menu);
  } else {
    const menu = Menu.buildFromTemplate([
      {
        label: "&View",
        submenu: [
          {
            label: "&Reload",
            accelerator: "Ctrl+R",
            click() {
              mainWindow.reload();
            }
          },
          {
            label: "Toggle &Full Screen",
            accelerator: "F11",
            click() {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          },
          {
            label: "Toggle &Developer Tools",
            accelerator: "Alt+Ctrl+I",
            click() {
              mainWindow.toggleDevTools();
            }
          }
        ]
      }
    ]);
    mainWindow.setMenu(menu);
  }
};

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 480,
    height: 640,
    title: app.getName(),
    show: false,
    // icon: process.platform === "linux" && path.join(__dirname, "static/Icon.png"),
    titleBarStyle: "hidden-inset",
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "js/script.js"),
      nodeIntegration: false,
      plugins: true
    }
  });

  const page = mainWindow.webContents;
  page.on("dom-ready", () => {
    page.insertCSS(fs.readFileSync(path.join(__dirname, "dist/css/style.css"), "utf8"));
    mainWindow.show();
  });

  const url = path.join(__dirname, "/index.html");
  mainWindow.loadURL("file://" + url);
  installMenu();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});
