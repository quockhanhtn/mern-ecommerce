import * as actionTypes from '../../constants/actionTypes';
import { storage } from '../../firebase';

/*
 * Not use
 */
export const uploadSingleImage =
  (imageFile, uploadDir = 'images') =>
  async (dispatch) => {
    try {
      dispatch({ type: actionTypes.START_LOADING });

      const uploadFileName = Date.now() + imageFile.name;
      const uploadTask = storage.ref(`${uploadDir}/${uploadFileName}`).put(imageFile);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          dispatch({ type: actionTypes.IMAGE.UPLOAD_SINGLE, payload: progress });
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await storage
            .ref(uploadDir)
            .child(uploadFileName)
            .getDownloadURL()
            .then((imageUrl) => {
              dispatch({ type: actionTypes.IMAGE.UPLOAD_SINGLE, payload: imageUrl });
              dispatch({ type: actionTypes.END_LOADING });
              console.log(imageUrl);
            });
        }
      );
    } catch (e) {
      console.error('Error when get posts in actions/images/uploadSingleImage', e);
      dispatch({ type: actionTypes.HAS_ERROR });
    }
  };
