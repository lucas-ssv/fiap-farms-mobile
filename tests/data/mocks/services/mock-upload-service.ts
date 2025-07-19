import type { UploadService } from '@/data/contracts/services'

export class UploadServiceMock implements UploadService {
  async upload(uri: string, folderName?: string): Promise<UploadService.Result> {
    return {
      name: 'any_name',
      url: 'any_url',
    }
  }
}
