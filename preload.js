const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  getConfig: () => ipcRenderer.sendSync('getConfig')
})
