import { FileDTO } from "@/model/dto/File";
import { contextBridge, ipcRenderer } from "electron";

export const rendererFile = () => {
  contextBridge.exposeInMainWorld("file", {
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


export interface apiFile {
  selectFile: () => Promise<FileDTO>
}