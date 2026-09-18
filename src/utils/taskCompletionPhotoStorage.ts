import { generateUUID } from "./generateUUID";

const DB_NAME = "taskCompletionPhotoDB";
const STORE_NAME = "photos";

const openPhotoDatabase = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error ?? new Error("Failed to open completion photo storage"));
  });

export const saveTaskCompletionPhoto = async (image: string): Promise<string> => {
  const id = generateUUID();
  const db = await openPhotoDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).put(image, id);
    transaction.oncomplete = () => {
      db.close();
      resolve(id);
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error ?? new Error("Failed to save completion photo"));
    };
  });
};

export const getTaskCompletionPhoto = async (id: string): Promise<string | null> => {
  const db = await openPhotoDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const request = transaction.objectStore(STORE_NAME).get(id);
    request.onsuccess = () => {
      db.close();
      resolve((request.result as string) ?? null);
    };
    request.onerror = () => {
      db.close();
      reject(request.error ?? new Error("Failed to get completion photo"));
    };
  });
};
