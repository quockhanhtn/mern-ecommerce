import faker from 'faker';
import { sub } from 'date-fns';
import { dotCase } from 'change-case';
import { sample, isEmpty, xor } from 'lodash';
// utils
import { mockImgFeed, mockImgAvatar } from '../utils/mockImages';
//
import mock from './mock';

// ----------------------------------------------------------------------

const createId = (index) => `8864c717-587d-472a-929a-8e5f298024da-${index}`;

const CONTACT_NAMES = [
  'Xander Purdy',
  'Genoveva Funk',
  'Sofia Funk',
  'Jody Osinski MD',
  'Augustine Jast',
  'Clyde Smitham',
  'Ottilie Heidenreich',
  'Camren Simonis',
  'Mrs. Sheldon Bartoletti',
  'Oswaldo Lockman',
  'Mr. Albin Little',
  'Daisy Dietrich',
  'Jarvis Sanford',
  'Patrick Rowe',
  'Kristy Lowe',
  'Toby Collier',
  'Birdie Howell',
  'Alverta Wuckert',
  'Charlotte Deckow',
  'Vivianne Frami',
  'Robin Grant',
  'Tavares Schneider',
  'Andreanne Bashirian'
];

const MY_CONTACT = {
  id: '8864c717-587d-472a-929a-8e5f298024da-0',
  avatar: '/static/mock-images/avatars/avatar_15.jpg',
  name: 'Jaydon Frankie',
  username: 'jaydon.frankie'
};

// ----------------------------------------------------------------------

const contacts = [...Array(20)].map((_, index) => {
  const setIndex = index + 1;
  return {
    id: createId(setIndex),
    name: CONTACT_NAMES[setIndex],
    username: CONTACT_NAMES[setIndex] && dotCase(CONTACT_NAMES[setIndex]),
    avatar: mockImgAvatar(setIndex),
    address: faker.address.streetAddress(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    lastActivity: faker.time.recent(),
    status: sample(['online', 'offline', 'away', 'busy']),
    position: sample([
      'Leader',
      'Hr Manager',
      'UI Designer',
      'UX Designer',
      'UI/UX Designer',
      'Project Manager',
      'Backend Developer',
      'Full Stack Designer',
      'Front End Developer',
      'Full Stack Developer'
    ])
  };
});

const conversations = [
  {
    id: createId(1),
    participants: [MY_CONTACT, contacts[1]],
    type: 'ONE_TO_ONE',
    unreadCount: 0,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [mockImgFeed(1)],
        createdAt: sub(new Date(), { hours: 10 }),
        senderId: contacts[1].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [mockImgFeed(2)],
        createdAt: sub(new Date(), { hours: 2 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: ['/static/mock-images/avatars/avatar_12.mp4'],
        createdAt: sub(new Date(), { minutes: 8 }),
        senderId: contacts[1].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [
          'https://mail.google.com/mail/u/file1.docx',
          'https://mail.google.com/mail/u/file2.xlsx',
          'https://mail.google.com/mail/u/file3.pptx'
        ],
        createdAt: sub(new Date(), { minutes: 6 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [
          'https://mail.google.com/mail/u/file4.pdf',
          'https://mail.google.com/mail/u/file5.psd',
          'https://mail.google.com/mail/u/file6.esp',
          'https://mail.google.com/mail/u/file7.sketch'
        ],
        createdAt: sub(new Date(), { minutes: 4 }),
        senderId: contacts[1].id
      },
      {
        id: faker.datatype.uuid(),
        attachments: [],
        contentType: 'image',
        body: mockImgFeed(4),
        createdAt: sub(new Date(), { minutes: 2 }),
        senderId: contacts[1].id
      },
      {
        id: faker.datatype.uuid(),
        contentType: 'text',
        body: faker.lorem.sentence(),
        attachments: [],
        createdAt: sub(new Date(), { minutes: 2 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 2 }),
        senderId: MY_CONTACT.id
      }
    ]
  },
  {
    id: createId(2),
    participants: [MY_CONTACT, contacts[2]],
    type: 'ONE_TO_ONE',
    unreadCount: 2,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 8 }),
        senderId: contacts[2].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 6 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 4, minutes: 30 }),
        senderId: contacts[2].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 2, minutes: 15 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 1, minutes: 15 }),
        senderId: contacts[2].id
      },
      {
        id: faker.datatype.uuid(),
        body: mockImgFeed(7),
        attachments: [],
        contentType: 'image',
        createdAt: sub(new Date(), { hours: 1 }),
        senderId: contacts[2].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 45 }),
        senderId: MY_CONTACT.id
      }
    ]
  },
  {
    id: createId(3),
    participants: [MY_CONTACT, contacts[3]],
    type: 'ONE_TO_ONE',
    unreadCount: 0,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 8 }),
        senderId: contacts[3].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 6 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 4, minutes: 30 }),
        senderId: contacts[3].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 2, minutes: 15 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 1, minutes: 15 }),
        senderId: contacts[3].id
      },
      {
        id: faker.datatype.uuid(),
        body: mockImgFeed(5),
        contentType: 'image',
        attachments: [],
        createdAt: sub(new Date(), { hours: 1 }),
        senderId: contacts[3].id
      },
      {
        id: faker.datatype.uuid(),
        body: mockImgFeed(6),
        contentType: 'image',
        attachments: [],
        createdAt: sub(new Date(), { hours: 1 }),
        senderId: contacts[3].id
      }
    ]
  },
  {
    id: createId(4),
    participants: [MY_CONTACT, contacts[4]],
    type: 'ONE_TO_ONE',
    unreadCount: 2,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 10 }),
        senderId: contacts[4].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 2 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 5 }),
        senderId: contacts[4].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 3 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: contacts[4].id
      }
    ]
  },
  {
    id: createId(5),
    participants: [MY_CONTACT, contacts[5]],
    type: 'ONE_TO_ONE',
    unreadCount: 0,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: contacts[5].id
      }
    ]
  },
  {
    id: createId(6),
    participants: [MY_CONTACT, contacts[6]],
    type: 'ONE_TO_ONE',
    unreadCount: 2,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: contacts[6].id
      }
    ]
  },
  {
    id: createId(7),
    participants: [MY_CONTACT, contacts[1], contacts[2], contacts[4], contacts[3]],
    type: 'GROUP',
    unreadCount: 5,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [
          mockImgFeed(1),
          mockImgFeed(2),
          mockImgFeed(3),
          mockImgFeed(4),
          'https://mail.google.com/mail/u/file1.docx'
        ],
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 30 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: ['https://mail.google.com/mail/u/file2.xlsx'],
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 29 }),
        senderId: contacts[1].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: ['https://mail.google.com/mail/u/file3.psd'],
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 28 }),
        senderId: contacts[2].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: ['https://mail.google.com/mail/u/file3.pptx'],
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 27 }),
        senderId: contacts[4].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: ['https://mail.google.com/mail/u/file3.ai'],
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 26 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: ['https://mail.google.com/mail/u/file3.mp4'],
        createdAt: sub(new Date(), { days: 3 }),
        senderId: contacts[3].id
      }
    ]
  },
  {
    id: createId(8),
    participants: [MY_CONTACT, contacts[7]],
    type: 'ONE_TO_ONE',
    unreadCount: 0,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: contacts[7].id
      }
    ]
  },
  {
    id: createId(9),
    participants: [MY_CONTACT, contacts[8]],
    type: 'ONE_TO_ONE',
    unreadCount: 0,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: contacts[8].id
      }
    ]
  },
  {
    id: createId(10),
    participants: [MY_CONTACT, contacts[9]],
    type: 'ONE_TO_ONE',
    unreadCount: 0,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: contacts[9].id
      }
    ]
  },
  {
    id: createId(11),
    participants: [MY_CONTACT, contacts[6], contacts[7], contacts[8], contacts[9], contacts[10]],
    type: 'GROUP',
    unreadCount: 0,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 30 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 29 }),
        senderId: contacts[9].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 28 }),
        senderId: contacts[10].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 27 }),
        senderId: contacts[8].id
      },
      {
        id: faker.datatype.uuid(),
        attachments: [],
        body: faker.lorem.sentence(),
        contentType: 'text',
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 26 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { days: 3 }),
        senderId: contacts[6].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { days: 3 }),
        senderId: contacts[7].id
      }
    ]
  },
  {
    id: createId(12),
    participants: [MY_CONTACT, contacts[10]],
    type: 'ONE_TO_ONE',
    unreadCount: 0,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: contacts[10].id
      }
    ]
  }
];

// ----------------------------------------------------------------------

const findContactByUsername = (username) => {
  const contact = contacts.find((_contact) => _contact.username === username);
  return contact || null;
};

const findConversationById = (conversationId) => {
  const conversation = conversations.find((_conversationId) => _conversationId.id === conversationId);
  return conversation || null;
};

const findConversationByOtherParticipantId = (participantId) => {
  const conversation = conversations.find((_conversation) => {
    if (_conversation.type !== 'ONE_TO_ONE') {
      return false;
    }
    const participant = _conversation.participants.find((_participant) => _participant.id === participantId);
    return !!participant;
  });
  return conversation || null;
};

const findConversationByParticipantIds = (participantIds) => {
  const conversation = conversations.find((_conversation) => {
    if (_conversation.participants.length < participantIds.length) {
      return false;
    }
    const _participantIds = [];
    _conversation.participants.forEach((_participant) => {
      _participantIds.push(_participant.id);
    });

    return isEmpty(xor(participantIds, _participantIds));
  });
  return conversation || null;
};

// ----------------------------------------------------------------------

mock.onGet('/api/chat/contacts').reply(200, { contacts });

// ----------------------------------------------------------------------

mock.onGet('/api/chat/search').reply((config) => {
  try {
    const { query } = config.params;
    let results = contacts;
    if (query) {
      const cleanQuery = query.toLowerCase().trim();
      results = results.filter((contact) => contact.name.toLowerCase().includes(cleanQuery));
    }
    return [200, { results }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onGet('/api/chat/participants').reply((config) => {
  try {
    const { conversationKey } = config.params;
    const participants = [];
    const conversation = findConversationById(conversationKey);
    if (conversation) {
      participants.push(...conversation.participants);
    } else {
      const contact = findContactByUsername(conversationKey);
      if (contact) {
        participants.push({
          id: contact.id,
          avatar: contact.avatar,
          name: contact.name,
          username: contact.username,
          address: contact.address,
          phone: contact.phone,
          email: contact.email,
          position: contact.position,
          status: contact.status,
          lastActivity: contact.lastActivity
        });
      }
    }
    return [200, { participants }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onGet('/api/chat/conversations').reply(200, { conversations });

// ----------------------------------------------------------------------

mock.onGet('/api/chat/conversation').reply((config) => {
  try {
    const { conversationKey } = config.params;
    let conversation = findConversationById(conversationKey);

    if (conversation) {
      return [200, { conversation }];
    }

    const contact = findContactByUsername(conversationKey);

    if (!contact) {
      return [404, { message: 'Unable to find the contact' }];
    }
    conversation = findConversationByOtherParticipantId(contact.id);

    return [200, { conversation }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onGet('/api/chat/conversation/mark-as-seen').reply((config) => {
  try {
    const { conversationId } = config.params;
    const conversation = conversations.find((_conversation) => _conversation.id === conversationId);
    if (conversation) {
      conversation.unreadCount = 0;
    }
    return [200, true];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onPost('/api/chat/messages/new').reply((request) => {
  try {
    const { conversationId, recipientIds, body } = JSON.parse(request.data);

    const user = MY_CONTACT;
    let conversation = null;

    if (conversationId) {
      conversation = findConversationById(conversationId);
      if (!conversation) {
        return [400, { message: 'Invalid conversation id' }];
      }
    }

    if (recipientIds) {
      const participantIds = [...recipientIds, user.id];
      conversation = findConversationByParticipantIds(participantIds);
    }

    const message = {
      id: faker.datatype.uuid(),
      attachments: [],
      body,
      contentType: 'text',
      createdAt: sub(new Date(), { minutes: 1 }),
      senderId: user.id
    };

    if (conversation) {
      conversation.messages = [...conversation.messages, message];
    } else {
      const participants = [user];

      recipientIds.forEach((recipientId) => {
        const contact = contacts.find((_contact) => _contact.id === recipientId);

        if (!contact) {
          throw new Error('Contact not found');
        }

        participants.push({
          id: contact.id,
          avatar: contact.avatar,
          name: contact.name,
          username: contact.username
        });
      });

      conversation = {
        id: faker.datatype.uuid(),
        messages: [message],
        participants,
        type: participants.length === 2 ? 'ONE_TO_ONE' : 'GROUP',
        unreadCount: 0
      };
    }

    const responseData = {
      conversationId: conversation.id,
      message
    };

    return [200, responseData];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
