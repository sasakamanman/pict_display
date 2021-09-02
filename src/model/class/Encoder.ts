import fs from "fs"

interface FileSpec {
  suffixes: string[],
  mime: string
}

const fileType: FileSpec[] = [
  {
    suffixes: ["png"],
    mime: "image/png"
  },
  {
    suffixes: ["jpeg", "jpg"],
    mime: "image/jpeg"
  },
  {
    suffixes: ["gif"],
    mime: "image/gif"
  },
  {
    suffixes: ["svg"],
    mime: "image/svg+xml"
  }
]


export class ImageEncoder{
  static encodeImage(imagePath: string) {
    const fileSuffix = imagePath.split('.').slice(-1)[0].toLowerCase()
    const fileSpecList = fileType.filter(type => type.suffixes.includes(fileSuffix))
    if (!(fileSpecList)) {
      throw Error("ファイル拡張子が正しくありません。")
    }

    const mime = fileSpecList[0].mime
    let encodedFile: string
    try {
      encodedFile = this.encodeFile(imagePath, mime)
    } catch(e){
      throw Error("エンコードに失敗しました。")
    }

    return encodedFile
  }

  private static encodeFile(filePath: string, mime: string) {
    const file = fs.readFileSync(filePath)
    const fileData = file.toString("base64")

    return "data:" + mime + ";base64," + fileData
  } 
}