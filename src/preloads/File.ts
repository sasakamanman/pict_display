import { FileDTO } from "@/model/dto/File";
import { contextBridge, ipcRenderer } from "electron";

export const rendererFile = () => {
  contextBridge.exposeInMainWorld("fileApi", {
    selectFile: async () => {
      // ipcRenderer.invoke("selectFile")
      const dto: FileDTO = {
        id: 0,
        fileName: "abc.png",
        filePath: "C:\\abc.png"
      }
    },
  })
}


export interface fileApi {
  selectFile: () => Promise<FileDTO>
}