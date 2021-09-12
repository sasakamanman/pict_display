import { FileDTO } from "@/model/dto/File"
import imageSize from "image-size"
import path from "path"
import { BrowserWindow, ipcMain } from "electron"
import { ImageEncoder } from "./Encoder"
import { EventEmitter } from "events"
import { SizeManagerEventType } from "@/interface/EventEmitter"


export class PictSizeManager extends (EventEmitter as {new(): SizeManagerEventType}) {
  private pictSizeWindow: null | BrowserWindow = null
  private mainWindow: BrowserWindow
  private fileDTO: null | FileDTO = null

  constructor(mainWindow: BrowserWindow) {
    super()
    this.mainWindow = mainWindow

    ipcMain.on("recieveFileSize", (evt, fileInfo: {id: number, height: number, width: number}) => {
      if (this.pictSizeWindow !== null) {
        this.pictSizeWindow.destroy()
      }
      if (this.fileDTO !== null) {
        this.emit("recieveFileSize", this.fileDTO, {width: fileInfo.width, height: fileInfo.height})
        this.fileDTO = null
      }
      
    })

    ipcMain.handle("getPreviewFile", (evt) => {
      if (this.fileDTO === null) { throw Error("予期せぬ動作が発生しました") }
      return ImageEncoder.encodeImage(this.fileDTO.filePath)
    })
  }
  
  askPictSize(fileDTO: FileDTO) {
    this.fileDTO = fileDTO
    const defaultImageSize = imageSize(this.fileDTO.filePath)

    this.pictSizeWindow = this.openWindow()

    const query = "?id=" + String(fileDTO.id) + "&x=" + String(defaultImageSize.width) + "&y=" + String(defaultImageSize.height)

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      this.pictSizeWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string + '#/AskFileSize' + query)
      if (!process.env.IS_TEST) this.pictSizeWindow.webContents.openDevTools()
    } else {
      // Load the index.html when not in development
      this.pictSizeWindow.loadURL("app://./index.html#AskFileSize" + query)
    }
  }

  private openWindow() {
    const pictSizeWindow = new BrowserWindow({
      parent: this.mainWindow,
      width: 800,
      height: 800,
      frame: false,
      modal: true,
      webPreferences: {
        backgroundThrottling: false,
        // Required for Spectron testing
        enableRemoteModule: !!process.env.IS_TEST,
  
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
      },
    })
    return pictSizeWindow
  }
}