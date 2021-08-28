import { apiFile } from "../src/preloads/File"

declare global {
  interface window {
    apiFile: apiFile
  }
}