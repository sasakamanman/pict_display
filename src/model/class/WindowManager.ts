import { BrowserWindow, ipcMain } from "electron"
import { EventEmitter } from "events"
import { FileDTO } from "@/model/dto/File"
import { WindowEventType } from "@/interface/EventEmitter"
import path from "path"

interface WindowItem {
  id: number,
  window: BrowserWindow,
  filePath: string
}

export class WindowManager extends (EventEmitter as {new(): WindowEventType}) {
  private mainWindow: BrowserWindow
  private windowList: WindowItem[] = []

  constructor(mainWindow: BrowserWindow) {
    super()
    this.mainWindow = mainWindow

    ipcMain.on("deleteFile", (event, id: number) => {
      this.deleteWindow(id)
    })

    ipcMain.handle("getFile", (evt) => {
      const senderId = evt.sender.id
      const target = this.windowList.filter(
        winItem => winItem.window.webContents.id == senderId
      )[0]
      return target.filePath
    })
  }

  async makeSubWindow(fileDTO: FileDTO) {
    const subWindow = await this.standUpSubWindow(fileDTO)
    this.windowList.push({id: fileDTO.id!, window: subWindow, filePath: fileDTO.filePath})
    this.setUpSubWindow(subWindow)

    this.emit("switchFocusable")
    }

  private async standUpSubWindow(fileDTO: FileDTO) {
    const subWindow = new BrowserWindow({
      parent: this.mainWindow,
      width: 200,
      height: 200,
      transparent: true,
      frame: false,
      alwaysOnTop: true,
      webPreferences: {
        backgroundThrottling: false,
        // Required for Spectron testing
        enableRemoteModule: !!process.env.IS_TEST,
  
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),

        // devモードで画像表示をさせるためにはwbeSecurityをfalseにする必要がある
        webSecurity: process.env.NODE_ENV !== 'development'
      },
    })

    return subWindow
  }

  private setUpSubWindow(subWindow: BrowserWindow) {
    subWindow.setAlwaysOnTop(true)

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      subWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string + '#/display')
    } else {
      // Load the index.html when not in development
      subWindow.loadURL("app://./index.html")
    }

    const switchFocusable = () => {
      this.emit("switchFocusable")
    }
    subWindow.on("focus", switchFocusable)
    subWindow.on("blur", switchFocusable)
  }

  setFocusable(isMainFocused: boolean) {
    const isFocused = isMainFocused || this.isSubwindowActive
    this.windowList.forEach((winItem) => {
      let win = winItem.window
      win.setIgnoreMouseEvents(!isFocused)
      win.setAlwaysOnTop(true)
      win.setVisibleOnAllWorkspaces(true)
      win.moveTop()
    })
  }

  private deleteWindow(id: number) {
    const target = this.windowList.filter(x => x.id == id)[0]
    const index = this.windowList.indexOf(target)
    target.window.destroy()
    this.windowList.splice(index, 1)
  }

  get isSubwindowActive() {
    const isActiveList = this.windowList.map((winItem) => {
      return winItem.window.isFocused()
    })
    return isActiveList.some((isActive) => isActive)
  }
}