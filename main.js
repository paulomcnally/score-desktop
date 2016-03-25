'use strict';

const port = 35588;

const electron = require('electron');

// Module to control application life.
const app = electron.app;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    fullscreen: true,
  });

  mainWindow.setMenu(null);

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/views/index.html');

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

const express = require('express')();
const server = require('http').Server(express);
const io = require('socket.io')(server);

server.listen(port);

io.on('connection', function (socket) {

  /**
  * Change points
  * @param
  *  team (String a|b)
  * @param
  *  points (Integer 0...n)
  * @example
  * /a/score/10
  */
  express.get('/:team/score/:points', function (req, res) {
    var data = {
      team: req.params.team, // a or b
      points: req.params.points,
    };

    if (req.get('secret') === process.env.SCORE_DESKTOP_SECRET) {
      socket.emit('score', data);
    }

    res.json(data);
  });

  /**
  * Change points
  * @param
  *  team (String a|b)
  * @param
  *  name (String)
  * @example
  * /a/name/Angels
  */
  express.get('/:team/name/:name', function (req, res) {
    var data = {
      team: req.params.team, // a or b
      name: req.params.name,
    };

    if (req.get('secret') === process.env.SCORE_DESKTOP_SECRET) {
      socket.emit('name', data);
    }

    res.json(data);
  });

  console.log('Connected');
});
