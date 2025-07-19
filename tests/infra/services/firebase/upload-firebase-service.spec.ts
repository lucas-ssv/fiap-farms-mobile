import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { randomUUID } from "expo-crypto";

import { storage } from "@/main/config/firebase";
import { uriToBlob } from "@/infra/utils";
import { UploadFirebaseService } from "@/infra/services/firebase";

jest.mock("expo-crypto", () => ({
  randomUUID: jest.fn().mockReturnValue("any_filename"),
}));

jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  initializeAuth: jest.fn(),
  getReactNativePersistence: jest.fn(),
  setPersistence: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  addDoc: jest.fn().mockResolvedValue({ id: "any_transaction_id" }),
  collection: jest.fn(),
  getFirestore: jest.fn(),
  Timestamp: {
    now: jest.fn(() => "any_timestamp"),
  },
}));

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("firebase/storage", () => {
  const onMock = jest.fn((_event, _progress, _error, success) => {
    success();
  });
  const mockUploadTask = {
    on: onMock,
    snapshot: {
      ref: "mocked_ref",
    },
  };

  return {
    getStorage: jest.fn(),
    ref: jest.fn().mockReturnValue("mocked_storage_ref"),
    uploadBytesResumable: jest.fn().mockReturnValue(mockUploadTask),
    getDownloadURL: jest.fn().mockResolvedValue("any_download_url"),
  };
});

jest.mock("@/main/config/firebase", () => ({
  storage: "mocked_storage",
}));

jest.mock("@/infra/utils", () => ({
  uriToBlob: jest.fn().mockResolvedValue("mocked_blob"),
}));

describe("UploadFirebaseService", () => {
  it("should call randomUUID", async () => {
    const sut = new UploadFirebaseService();

    await sut.upload("any_document_uri");

    expect(randomUUID).toHaveBeenCalled();
  });

  it("should call ref with correct values", async () => {
    const sut = new UploadFirebaseService();

    await sut.upload("any_document_uri", 'any_folder_name');

    expect(ref).toHaveBeenCalledWith(storage, "any_folder_name/any_filename");
  });

  it("should call uriToBlob with correct uri", async () => {
    const sut = new UploadFirebaseService();

    await sut.upload("any_document_uri");

    expect(uriToBlob).toHaveBeenCalledWith("any_document_uri");
  });

  it("should call uploadBytesResumable with correct values", async () => {
    const sut = new UploadFirebaseService();

    await sut.upload("any_document_uri");

    expect(uploadBytesResumable).toHaveBeenCalledWith(
      "mocked_storage_ref",
      "mocked_blob"
    );
  });

  it("should upload the file and return the filename and download URL", async () => {
    const sut = new UploadFirebaseService();
    const onMock = jest.fn((_event, _progress, _error, success) => {
      success();
    });
    const mockUploadTask = {
      on: onMock,
      snapshot: {
        ref: "mocked_ref",
      },
    };
    (uploadBytesResumable as jest.Mock).mockReturnValue(mockUploadTask);

    const result = await sut.upload("any_document_uri");

    expect(onMock).toHaveBeenCalled();
    expect(getDownloadURL).toHaveBeenCalledWith("mocked_ref");
    expect(result).toEqual({
      name: "any_filename",
      url: "any_download_url",
    });
  });
});
