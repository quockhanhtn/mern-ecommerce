import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// material
import { List } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import ChatConversationItem from './ChatConversationItem';

// ----------------------------------------------------------------------

ChatConversationList.propTypes = {
  conversations: PropTypes.object,
  isOpenSidebar: PropTypes.bool,
  activeConversationId: PropTypes.string
};

export default function ChatConversationList({ conversations, isOpenSidebar, activeConversationId, ...other }) {
  const navigate = useNavigate();

  const handleSelectConversation = (conversationId) => {
    let conversationKey = '';
    const conversation = conversations.byId[conversationId];
    if (conversation.type === 'GROUP') {
      conversationKey = conversation.id;
    } else {
      const otherParticipant = conversation.participants.find(
        (participant) => participant.id !== '8864c717-587d-472a-929a-8e5f298024da-0'
      );
      conversationKey = otherParticipant.username;
    }
    navigate(`${PATH_DASHBOARD.chat.root}/${conversationKey}`);
  };

  return (
    <List disablePadding {...other}>
      {conversations.allIds.map((conversationId) => (
        <ChatConversationItem
          key={conversationId}
          isOpenSidebar={isOpenSidebar}
          conversation={conversations.byId[conversationId]}
          isSelected={activeConversationId === conversationId}
          onSelectConversation={() => handleSelectConversation(conversationId)}
        />
      ))}
    </List>
  );
}
