const { app, BrowserWindow } = require('electron')

const fs = require('fs')

const config = JSON.parse(fs.readFileSync('config.json'))
for (const i of Array(process.argv.length).keys()) {
  if (process.argv[i] === '-server') {
    config.host = process.argv[i + 1]
  } else if (process.argv[i] === '-port') {
    config.port = process.argv[i + 1]
  }
}

console.log('process.argv', process.argv)
console.log('config', config)

const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 130,
    icon: 'circle.ico'
  })
  win.on('closed', () => {
    app.quit()
  })
  win.setMenuBarVisibility(false)
  win.loadURL(`${config.host}:${config.port}/manager`)
  win.setAlwaysOnTop(true)
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  app.quit()
})
