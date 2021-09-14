import { findIndex } from 'lodash';
import { useState } from 'react';
import PropTypes from 'prop-types';
// material
import { Stack, Box, Avatar, Typography } from '@material-ui/core';
// utils
import { fToNow } from '../../../utils/formatTime';
//
import LightboxModal from '../../LightboxModal';

// ----------------------------------------------------------------------

KanbanCommentList.propTypes = {
  comments: PropTypes.array
};

export default function KanbanCommentList({ comments }) {
  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const imagesLightbox = comments.filter((comment) => comment.messageType === 'image').map((item) => item.message);

  const handleOpenLightbox = (url) => {
    const selectedImage = findIndex(imagesLightbox, (index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  return (
    <>
      <Stack spacing={3} sx={{ py: 3, px: 2.5, bgcolor: 'background.neutral' }}>
        {comments.map((comment) => (
          <Stack key={comment.id} direction="row" spacing={2}>
            <Avatar src={comment.avatar} sx={{ width: 32, height: 32 }} />
            <div>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="subtitle2"> {comment.name}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {fToNow(comment.createdAt)}
                </Typography>
              </Stack>

              {comment.messageType === 'image' ? (
                <Box
                  component="img"
                  src={comment.message}
                  onClick={() => handleOpenLightbox(comment.message)}
                  sx={{ mt: 2, borderRadius: 1 }}
                />
              ) : (
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {comment.message}
                </Typography>
              )}
            </div>
          </Stack>
        ))}
      </Stack>

      <LightboxModal
        images={imagesLightbox}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onClose={() => setOpenLightbox(false)}
      />
    </>
  );
}
