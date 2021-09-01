import { FileDTO } from "@/model/dto/File";
import { contextBridge, ipcRenderer } from "electron";

export const rendererFile = () => {
  contextBridge.exposeInMainWorld("fileApi", {
    selectFile: () => {
      ipcRenderer.send("selectFile")
    },

    getFile: () => {
      return ipcRenderer.invoke('getFile')
    },

    recieveFileList: (listener: Function) => {
      ipcRenderer.on('sendFileList', (evt:any, fileNameList: FileDTO[]) => {
        listener(fileNameList)
      })
    },

    completeLoading: () => {
      ipcRenderer.send('completeLoading')
    },

    deleteFile: (id: number) => {
      ipcRenderer.send('deleteFile', id)
    }
  })
}


export interface fileApi {
  selectFile: () => void
  getFile: () => Promise<string>
  completeLoading: () => void
  recieveFileList: (listener: Function) => void
  deleteFile: (id: number) => void
}