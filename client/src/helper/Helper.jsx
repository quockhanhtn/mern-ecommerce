import { storage } from '../services/firebase';

export function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

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
