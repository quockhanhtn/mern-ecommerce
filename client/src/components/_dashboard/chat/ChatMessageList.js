import PropTypes from 'prop-types';
import { findIndex } from 'lodash';
import { useEffect, useState, useRef } from 'react';
//
import Scrollbar from '../../Scrollbar';
import LightboxModal from '../../LightboxModal';
import ChatMessageItem from './ChatMessageItem';

// ----------------------------------------------------------------------

ChatMessageList.propTypes = {
  conversation: PropTypes.object.isRequired
};

export default function ChatMessageList({ conversation }) {
  const scrollRef = useRef();
  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, [conversation.messages]);

  const images = conversation.messages
    .filter((messages) => messages.contentType === 'image')
    .map((messages) => messages.body);

  const handleOpenLightbox = (url) => {
    const selectedImage = findIndex(images, (index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  return (
    <Scrollbar scrollableNodeProps={{ ref: scrollRef }} sx={{ p: 3, flexGrow: 1 }}>
      {conversation.messages.map((message) => (
        <ChatMessageItem
          key={message.id}
          message={message}
          conversation={conversation}
          onOpenLightbox={handleOpenLightbox}
        />
      ))}

      <LightboxModal
        images={images}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onClose={() => setOpenLightbox(false)}
      />
    </Scrollbar>
  );
}
