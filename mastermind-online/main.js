const electron = require('electron')
const {BrowserWindow, app, ipcMain, ipcRenderer} = require('electron');
const path = require('path');
win = null;
const createWindow = () => {
    win = new BrowserWindow({
        width:1280,
        height:1024,
        webPreferences: {
            preload: path.join(__dirname,'preload.js'),
            contextIsolation: false
        }
    })
    win.setMenuBarVisibility(false)
    win.loadFile("index.html") 
}

app.whenReady().then(() => {
    createWindow();
});


app.on('window-all-closed', () =>{
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('openPage', (event, msg) => {
    let page = msg+'.html'
    win.loadFile(path.join(__dirname,page))
});