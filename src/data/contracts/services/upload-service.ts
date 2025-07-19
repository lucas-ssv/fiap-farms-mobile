export interface UploadService {
  upload: (uri: string, folderName: string) => Promise<UploadService.Result>
}

export namespace UploadService {
  export type Result = {
    name: string
    url: string
  }
}
