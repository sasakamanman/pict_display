import { BrowserWindow, dialog, ipcMain } from "electron"
import { FileDTO } from "../dto/File"
import EventEmitter from 'events'
import { FileEventType } from "@/interface/EventEmitter"

export class FileManager extends (EventEmitter as {new(): FileEventType}) {
  private fileList: FileDTO[] = [
    {fileName: 'あいう.png', filePath: 'c:\\あいう.png'},
    {fileName: 'かきく.png', filePath: 'c:\\かきく.png'}
  ]

  private mainWindow: BrowserWindow
  private currentId: number = 0

  constructor(mainWindow: BrowserWindow) {
    super()
    this.mainWindow = mainWindow
    this.initializeFileList()

    ipcMain.on("selectFile", () => {
      this.selectFile()
    })

    ipcMain.on('completeLoading', (event) => {
      this.sendFileList()
    })

    ipcMain.on('deleteFile', (event, id: number) => {
      this.deleteFile(id)
    })
  }

  private sendFileList() {
    this.mainWindow.webContents.send('sendFileList', this.fileList)
  }

  private selectFile() {
    const filePathList = dialog.showOpenDialogSync(this.mainWindow, {
      filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }],
      properties: ["openFile"]
    })

    if (filePathList === undefined) { return }

    const filePath = filePathList[0]
    const fileName = filePath.split('\\').slice(-1)[0]

    const dto: FileDTO = {
      id: this.getNewId(),
      fileName: fileName,
      filePath: filePath
    }

    this.fileList.push(dto)
    this.emit("fileSelected", dto)
    this.sendFileList()
  }

  private deleteFile(id: number) {
    const target = this.fileList.filter(x => x.id == id)[0]
    const index = this.fileList.indexOf(target)
    this.fileList.splice(index, 1)

    this.sendFileList()
  }

  private getNewId() {
    const newId = this.currentId
    this.currentId ++ 
    return newId
  }

  private initializeFileList() {
    for (let item of this.fileList) {
      item.id = this.getNewId()
    }
  }
}