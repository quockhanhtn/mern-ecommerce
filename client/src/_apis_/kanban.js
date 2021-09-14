import faker from 'faker';
import { addDays } from 'date-fns';
import { reject, map, assign } from 'lodash';

// utils
import { mockImgAvatar, mockImgFeed } from '../utils/mockImages';
//
import mock from './mock';

// ----------------------------------------------------------------------

const now = new Date();

const columnIds = {
  column1: '8cd887ec-b3bc-11eb-8529-0242ac130003',
  column2: '23008a1f-ad94-4771-b85c-3566755afab7',
  column3: '37a9a747-f732-4587-a866-88d51c037641',
  column4: '4ac3cd37-b3e1-466a-8e3b-d7d88f6f5d4f'
};

const cardIds = {
  card1: 'deb02f04-9cf8-4f1e-97e0-2fbda84cc6b3',
  card2: '98bf6e8b-becc-485b-9c3f-a7d09392c48d',
  card3: '99fbc02c-de89-4be3-9515-f8bd12227d38',
  card4: 'ab9cebca-6cb4-4847-aa17-3b261b3dd0fb',
  card5: 'ebf0d26a-78e5-414f-986f-003d8fcd3154',
  card6: '9d98ce30-3c51-4de3-8537-7a4b663ee3af',
  card7: '0f71fb1f-9fce-419c-a525-46aeeb9b3e83',
  card8: '534fac32-cae1-4d77-965a-062d2114bc29',
  card9: 'dc0fa705-1740-46a4-a3ec-5c6d67b6f402',
  card10: '5b323625-c53b-4d06-86df-b59e180657a0'
};

const memberIds = {
  member1: '473d2720-341c-49bf-94ed-556999cf6ef7',
  member2: 'b8395203-887c-46f5-a85f-339b2d75c98b',
  member3: '048f6343-7a65-4873-a570-eb6ff4eb1ba3',
  member4: '18e23ac9-c874-43e4-8163-2d37f15f3367',
  member5: 'a3be5485-03bf-47a6-b553-a9cf9f070ed8'
};

const COMMENTS = [...Array(8)].map((_, index) => {
  const setIndex = index + 1;
  return {
    id: faker.datatype.uuid(),
    avatar: mockImgAvatar(setIndex),
    name: faker.name.findName(),
    createdAt: faker.date.past(),
    messageType: setIndex === 3 || setIndex === 5 ? 'image' : 'text',
    message: (setIndex === 3 && mockImgFeed(6)) || (setIndex === 5 && mockImgFeed(8)) || faker.lorem.sentence()
  };
});

// ----------------------------------------------------------------------

let board = {
  columns: [
    {
      id: columnIds.column1,
      name: 'Backlog',
      cards: [
        {
          id: cardIds.card1,
          attachments: [],
          comments: COMMENTS,
          description:
            'Duis condimentum lacus finibus felis pellentesque, ac auctor nibh fermentum. Duis sed dui ante. Phasellus id eros tincidunt, dictum lorem vitae, pellentesque sem. Aenean eu enim sit amet mauris rhoncus mollis. Sed enim turpis, porta a felis et, luctus faucibus nisi. Phasellus et metus fermentum, ultrices arcu aliquam, facilisis justo. Cras nunc nunc, elementum sed euismod ut, maximus eget nibh. Phasellus condimentum lorem neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce sagittis pharetra eleifend. Suspendisse potenti.',
          due: addDays(now, 7).getTime(),
          columnId: columnIds.column1,
          assignee: [{ id: memberIds.member1, avatar: mockImgAvatar(1), name: faker.name.findName() }],
          name: 'Call with sales of HubSpot',
          completed: true
        },
        {
          id: cardIds.card3,
          attachments: [],
          comments: [],
          description: 'We nede to make it aggressive with pricing because it’s in their interest to acquire us',
          due: null,
          columnId: columnIds.column1,
          assignee: [],
          name: 'Change the height of the top bar because it looks too chunky',
          completed: true
        },
        {
          id: cardIds.card4,
          attachments: [mockImgFeed(3)],
          comments: [],
          description: 'We nede to make it aggresive with pricing because it’s in their interest to acquire us',
          due: null,
          columnId: columnIds.column1,
          assignee: [
            { id: memberIds.member2, avatar: mockImgAvatar(2), name: faker.name.findName() },
            { id: memberIds.member5, avatar: mockImgAvatar(5), name: faker.name.findName() }
          ],
          name: 'Integrate Stripe API',
          completed: false
        }
      ]
    },
    {
      id: columnIds.column2,
      name: 'Progress',
      cards: [
        {
          id: cardIds.card4,
          attachments: [mockImgFeed(3)],
          comments: [],
          description: 'We nede to make it aggresive with pricing because it’s in their interest to acquire us',
          due: null,
          columnId: columnIds.column1,
          assignee: [
            { id: memberIds.member2, avatar: mockImgAvatar(2), name: faker.name.findName() },
            { id: memberIds.member5, avatar: mockImgAvatar(5), name: faker.name.findName() }
          ],
          name: 'Integrate Stripe API',
          completed: false
        },
        {
          id: cardIds.card5,
          attachments: [],
          comments: [],
          description: 'We need to make it aggresive with pricing because it’s in their interest to acquire us',
          due: null,
          columnId: columnIds.column2,
          assignee: [{ id: memberIds.member1, avatar: mockImgAvatar(1), name: faker.name.findName() }],
          name: 'Update the customer API for payments',
          completed: true
        }
      ]
    },
    {
      id: columnIds.column3,
      name: 'Q&A',
      cards: [
        {
          id: cardIds.card2,
          attachments: [mockImgFeed(1)],
          comments: [],
          description: 'We are looking for vue experience and of course node js strong knowledge',
          due: addDays(now, 6).getTime(),
          columnId: columnIds.column1,
          assignee: [
            { id: memberIds.member1, avatar: mockImgAvatar(1), name: faker.name.findName() },
            { id: memberIds.member2, avatar: mockImgAvatar(2), name: faker.name.findName() },
            { id: memberIds.member4, avatar: mockImgAvatar(2), name: faker.name.findName() },
            { id: memberIds.member5, avatar: mockImgAvatar(2), name: faker.name.findName() },
            { id: memberIds.member3, avatar: mockImgAvatar(3), name: faker.name.findName() }
          ],
          name: 'Interview for the Asis. Sales Manager',
          completed: false
        }
      ]
    },
    {
      id: columnIds.column4,
      name: 'Production',
      cards: []
    }
  ]
};

// ----------------------------------------------------------------------

mock.onGet('/api/kanban/board').reply(200, { board });

// ----------------------------------------------------------------------

mock.onPost('/api/kanban/columns/new').reply((request) => {
  try {
    const { name } = JSON.parse(request.data);
    const column = {
      id: faker.datatype.uuid(),
      name,
      cards: []
    };
    board = {
      columns: [...board.columns, column]
    };
    return [200, { column }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onPost('/api/kanban/columns/update').reply((request) => {
  try {
    const { columnId, updateColumn } = JSON.parse(request.data);
    let column = null;

    board = {
      columns: map(board.columns, (_column) => {
        if (_column.id === columnId) {
          assign(_column, { ...updateColumn });
          column = _column;
        }
        return _column;
      })
    };

    return [200, { column }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onPost('/api/kanban/columns/delete').reply((request) => {
  try {
    const { columnId } = JSON.parse(request.data);
    board = {
      columns: reject(board.columns, { id: columnId })
    };
    return [200, { columnId }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
