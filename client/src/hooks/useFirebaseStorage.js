import { useState, useEffect } from 'react';
import { storage } from '../firebase';

export default function useFirebaseStorage(file, uploadDir = 'images') {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (file == null) {
      return;
    }
    const uploadFileName = `${Date.now()}_${file.name}`;
    const storageRef = storage.ref(`${uploadDir}/${uploadFileName}`);

    storageRef.put(file).on(
      'state_changed',
      (snap) => {
        const percent = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percent);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.child(uploadFileName).getDownloadURL();
        setUrl(url);
        console.log('useFirebaseStorage hook: ', url);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return { progress, url, error };
}
