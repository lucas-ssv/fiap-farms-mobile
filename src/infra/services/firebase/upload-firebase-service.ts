import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { randomUUID } from "expo-crypto";

import { UploadService } from "@/data/contracts/services";
import { storage } from "@/main/config/firebase";
import { uriToBlob } from "@/infra/utils";

export class UploadFirebaseService implements UploadService {
  async upload(uri: string, folderName?: string): Promise<UploadService.Result> {
    const fileName = randomUUID();
    const storageRef = ref(storage, `${folderName}/${fileName}`);
    const blob = await uriToBlob(uri);
    const uploadTask = uploadBytesResumable(storageRef, blob);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => reject(error),
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            name: fileName,
            url: downloadUrl,
          });
        }
      );
    });
  }
}
