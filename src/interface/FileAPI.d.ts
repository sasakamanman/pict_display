import { fileApi } from "@/preloads/File";

export declare global {
    interface Window { 
      fileApi: fileApi,
    }
}
