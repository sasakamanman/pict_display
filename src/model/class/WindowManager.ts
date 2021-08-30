import { BrowserWindow } from "electron"
import { FileDTO } from "@/model/dto/File"

interface WindowItem {
  id: number,
  window: BrowserWindow,
  filePath: string
}

export class WindowManager {
  private windowList: WindowItem[] = []

  makeSubWindow(fileDTO: FileDTO) {
    console.log(fileDTO.filePath)
  }
}