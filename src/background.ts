"use strict"

import { app, protocol, BrowserWindow } from "electron"
import { createProtocol } from "vue-cli-plugin-electron-builder/lib"
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer"
import path from 'path'
import { FileManager } from "./model/class/File"
import { FileDTO } from "./model/dto/File"
import { WindowManager } from "./model/class/WindowManager"
const isDevelopment = process.env.NODE_ENV !== "production"

let mainWindow: BrowserWindow

let fileManager: FileManager
let windowManager: WindowManager

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
])

const switchFocusable = () => {
  const isAppFocused = mainWindow.isFocused() || windowManager.isSubwindowActive
  windowManager.setFocusable(isAppFocused)
}

async function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Required for Spectron testing
      enableRemoteModule: !!process.env.IS_TEST,

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
  } else {
    createProtocol("app")
    // Load the index.html when not in development
    mainWindow.loadURL("app://./index.html")
  }

  mainWindow.removeMenu()

  mainWindow.on('blur', () => switchFocusable())
  mainWindow.on('focus', () => switchFocusable())
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString())
    }
  }
  createWindow()

  windowManager = new WindowManager(mainWindow)
  fileManager = new FileManager(mainWindow)
  
  fileManager.on("fileSelected", (fileDTO: FileDTO) => {
    windowManager.makeSubWindow(fileDTO)
  })

  windowManager.on("switchFocusable", () => {
    switchFocusable()
  })

})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit()
      }
    })
  } else {
    process.on("SIGTERM", () => {
      app.quit()
    })
  }
}
