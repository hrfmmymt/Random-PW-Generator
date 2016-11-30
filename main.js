'use strict';

const {app, BrowserWindow, Menu} = require('electron');

let mainWindow;

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 480,
    height: 640,
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  installMenu();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

const installMenu = () => {
  if(process.platform === 'darwin') {
    const menu = Menu.buildFromTemplate([
      {
        label: 'PW-copy-Generator',
        submenu: [
          {
            label: 'About PW-copy-Generator',
            selector: 'orderFrontStandardAboutPanel:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Services',
            submenu: []
          },
          {
            type: 'separator'
          },
          {
            label: 'Hide PW-copy-Generator',
            accelerator: 'Command+H',
            selector: 'hide:'
          },
          {
            label: 'Hide Others',
            accelerator: 'Command+Shift+H',
            selector: 'hideOtherApplications:'
          },
          {
            label: 'Show All',
            selector: 'unhideAllApplications:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click() {
              app.quit();
            }
          },
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Reload',
            accelerator: 'Command+R',
            click() {
              mainWindow.reload();
            }
          },
          {
            label: 'Toggle Full Screen',
            accelerator: 'Ctrl+Command+F',
            click() {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          },
          {
            label: 'Toggle Developer Tools',
            accelerator: 'Alt+Command+I',
            click() {
              mainWindow.toggleDevTools();
            }
          },
        ]
      }
    ]);
    Menu.setApplicationMenu(menu);
  } else {
    menu = Menu.buildFromTemplate([
      {
        label: '&View',
        submenu: [
          {
            label: '&Reload',
            accelerator: 'Ctrl+R',
            click() {
              mainWindow.reload();
            }
          },
          {
            label: 'Toggle &Full Screen',
            accelerator: 'F11',
            click() {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          },
          {
            label: 'Toggle &Developer Tools',
            accelerator: 'Alt+Ctrl+I',
            click() {
              mainWindow.toggleDevTools();
            }
          },
        ]
      }
    ]);
    mainWindow.setMenu(menu);
  }

}