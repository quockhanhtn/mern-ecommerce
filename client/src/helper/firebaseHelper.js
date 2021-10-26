import { storage } from '../services/firebase';

export function firebaseUploadSingle(uploadImage, uploadDir, setUploadPercent, onError, doAfterGetUrl) {
  const uploadFileName = `${Date.now}_${uploadImage.name}`;
  const uploadTask = storage.ref(`${uploadDir}/${uploadFileName}`).put(uploadImage);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setUploadPercent(progress);
    },
    (error) => {
      onError(error);
    },
    async () => {
      await storage
        .ref(uploadDir)
        .child(uploadFileName)
        .getDownloadURL()
        .then((imageUrl) => {
          console.log('action-firebaseUploadSingle', imageUrl);
          doAfterGetUrl(imageUrl);
        });
    }
  );
}
