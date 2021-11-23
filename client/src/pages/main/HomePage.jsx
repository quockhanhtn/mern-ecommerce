// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// components
import {
  Box,
  Container,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Link,
  Paper,
  Typography,
  Stack
} from '@material-ui/core';
// mock data
import faker from 'faker';
import { mockImgFeed } from '../../utils/mockImages';
import Page from '../../components/Page';
import { CarouselAnimation, CarouselMiniList, CarouselCenterMode } from '../../components/carousel';
import ProductList from './home/ProductList';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  // paddingTop: theme.spacing(0),
  // paddingBottom: theme.spacing(0),
  // paddingLeft: theme.spacing(0),
  // paddingRight: theme.spacing(0)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  const discountList = discountMockData;
  const brandsList = brandsMockData.map((x) => ({
    title: x.name,
    image: x.image,
    description: x.description,
    path: `/b/${x.slug}`
  }));

  return (
    <RootStyle title="Home page" id="move_top">
      <ContentStyle sx={{ bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800') }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* Discount carousel */}
            <Grid item xs={12}>
              <CarouselAnimation items={discountList} />
            </Grid>

            {/* Brand List carousel */}
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Brand list" />
                <CardContent>
                  <CarouselMiniList items={brandsList} numberPerRow={2} numberShow={2} />
                </CardContent>
              </Card>
            </Grid>

            {/* Products List */}
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Products list" />
                <CardContent>
                  <ProductList />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </ContentStyle>
    </RootStyle>
  );
}

const discountMockData = [
  {
    _id: 1,
    image: 'https://source.unsplash.com/random/800x600',
    title: 'Discount 1',
    link: 'https://facebook.com',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quas animi ab deserunt tempora repellat maxime saepe tenetur eaque ipsum?'
  },
  {
    _id: 2,
    image: 'https://source.unsplash.com/random/800x600',
    title: 'Discount 2',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quas animi ab deserunt tempora repellat maxime saepe tenetur eaque ipsum?'
  },
  {
    _id: 3,
    image: 'https://source.unsplash.com/random/800x600',
    title: 'Discount 3',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quas animi ab deserunt tempora repellat maxime saepe tenetur eaque ipsum?'
  },
  {
    _id: 4,
    image: 'https://source.unsplash.com/random/800x600',
    title: 'Discount 4',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quas animi ab deserunt tempora repellat maxime saepe tenetur eaque ipsum?'
  },
  {
    _id: 5,
    image: 'https://source.unsplash.com/random/800x600',
    title: 'Discount 5',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quas animi ab deserunt tempora repellat maxime saepe tenetur eaque ipsum?'
  }
];

// const brandsMockData = [...Array(10)].map((_, index) => {
//   const setIndex = index + 1;
//   return {
//     title: faker.name.title(),
//     description: faker.lorem.paragraphs(),
//     image: mockImgFeed(setIndex),
//     path: '#'
//   };
// });

const categoryMockData = [
  {
    _id: 'c00000000000000000000001',
    order: 1,
    name: 'Điện thoại',
    image: 'http://localhost:3001/public/uploads/categories/phone.svg',
    parent: null,
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.330Z',
    updatedAt: '2021-11-23T04:39:59.330Z',
    slug: 'dien-thoai'
  },
  {
    _id: 'c00000000000000000000002',
    order: 2,
    name: 'Máy tính bảng',
    image: 'http://localhost:3001/public/uploads/categories/tablet.svg',
    parent: null,
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.342Z',
    updatedAt: '2021-11-23T04:39:59.342Z',
    slug: 'may-tinh-bang'
  },
  {
    _id: 'c00000000000000000000003',
    order: 3,
    name: 'Đồng hồ',
    image: 'http://localhost:3001/public/uploads/categories/watch.svg',
    parent: null,
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.349Z',
    updatedAt: '2021-11-23T04:39:59.349Z',
    slug: 'dong-ho'
  },
  {
    _id: 'c00000000000000000000004',
    order: 4,
    name: 'Laptop',
    image: 'http://localhost:3001/public/uploads/categories/laptop.svg',
    parent: null,
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.354Z',
    updatedAt: '2021-11-23T04:39:59.354Z',
    slug: 'laptop'
  },
  {
    _id: 'c00000000000000000000005',
    order: 5,
    name: 'Máy ảnh',
    image: 'http://localhost:3001/public/uploads/categories/camera.svg',
    parent: null,
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.358Z',
    updatedAt: '2021-11-23T04:39:59.358Z',
    slug: 'may-anh'
  },
  {
    _id: 'c00000000000000000000006',
    order: 6,
    name: 'Phụ kiện',
    image: 'http://localhost:3001/public/uploads/categories/airpods.svg',
    parent: null,
    children: [
      {
        _id: 'c00000000000000000000007',
        order: 6.01,
        name: 'Thiết bị âm thanh',
        image: 'http://localhost:3001/public/uploads/categories/sound.svg',
        parent: 'c00000000000000000000006',
        children: [
          {
            _id: 'c00000000000000000000008',
            order: 6.0101,
            name: 'Tai nghe',
            image: 'http://localhost:3001/public/uploads/categories/headphone.svg',
            parent: 'c00000000000000000000007',
            children: [
              {
                _id: 'c00000000000000000000009',
                order: 6.010101,
                name: 'Tai nghe Bluetooth',
                image: 'http://localhost:3001/public/uploads/categories/bluetooth.svg',
                parent: 'c00000000000000000000008',
                children: [],
                isHide: false,
                createdBy: 'a00000000000000000000001',
                updatedBy: 'a00000000000000000000001',
                createdAt: '2021-11-23T04:39:59.397Z',
                updatedAt: '2021-11-23T04:39:59.397Z',
                slug: 'tai-nghe-bluetooth'
              },
              {
                _id: 'c00000000000000000000010',
                order: 6.010102,
                name: 'Tai nghe có dây',
                image: 'http://localhost:3001/public/uploads/categories/earphone.svg',
                parent: 'c00000000000000000000008',
                children: [],
                isHide: false,
                createdBy: 'a00000000000000000000001',
                updatedBy: 'a00000000000000000000001',
                createdAt: '2021-11-23T04:39:59.410Z',
                updatedAt: '2021-11-23T04:39:59.410Z',
                slug: 'tai-nghe-co-day'
              }
            ],
            isHide: false,
            createdBy: 'a00000000000000000000001',
            updatedBy: 'a00000000000000000000001',
            createdAt: '2021-11-23T04:39:59.389Z',
            updatedAt: '2021-11-23T04:39:59.408Z',
            slug: 'tai-nghe'
          },
          {
            _id: 'c00000000000000000000011',
            order: 6.0102,
            name: 'Loa',
            image: 'http://localhost:3001/public/uploads/categories/speaker.svg',
            parent: 'c00000000000000000000007',
            children: [],
            isHide: false,
            createdBy: 'a00000000000000000000001',
            updatedBy: 'a00000000000000000000001',
            createdAt: '2021-11-23T04:39:59.422Z',
            updatedAt: '2021-11-23T04:39:59.422Z',
            slug: 'loa'
          }
        ],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.380Z',
        updatedAt: '2021-11-23T04:39:59.420Z',
        slug: 'thiet-bi-am-thanh'
      },
      {
        _id: 'c00000000000000000000012',
        order: 6.02,
        name: 'Thiết bị lưu trữ',
        image: 'http://localhost:3001/public/uploads/categories/data-storage.svg',
        parent: 'c00000000000000000000006',
        children: [
          {
            _id: 'c00000000000000000000013',
            order: 6.0201,
            name: 'Thẻ nhớ',
            image: 'http://localhost:3001/public/uploads/categories/sd-storage.svg',
            parent: 'c00000000000000000000012',
            children: [],
            isHide: false,
            createdBy: 'a00000000000000000000001',
            updatedBy: 'a00000000000000000000001',
            createdAt: '2021-11-23T04:39:59.443Z',
            updatedAt: '2021-11-23T04:39:59.443Z',
            slug: 'the-nho'
          },
          {
            _id: 'c00000000000000000000014',
            order: 6.0202,
            name: 'USB',
            image: 'http://localhost:3001/public/uploads/categories/usb.svg',
            parent: 'c00000000000000000000012',
            children: [],
            isHide: false,
            createdBy: 'a00000000000000000000001',
            updatedBy: 'a00000000000000000000001',
            createdAt: '2021-11-23T04:39:59.452Z',
            updatedAt: '2021-11-23T04:39:59.452Z',
            slug: 'usb'
          },
          {
            _id: 'c00000000000000000000015',
            order: 6.0203,
            name: 'Ổ cứng di động',
            image: 'http://localhost:3001/public/uploads/categories/hdd.svg',
            parent: 'c00000000000000000000012',
            children: [],
            isHide: false,
            createdBy: 'a00000000000000000000001',
            updatedBy: 'a00000000000000000000001',
            createdAt: '2021-11-23T04:39:59.463Z',
            updatedAt: '2021-11-23T04:39:59.463Z',
            slug: 'o-cung-di-dong'
          }
        ],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.435Z',
        updatedAt: '2021-11-23T04:39:59.462Z',
        slug: 'thiet-bi-luu-tru'
      },
      {
        _id: 'c00000000000000000000016',
        order: 6.03,
        name: 'Phụ kiện điện thoại',
        image: 'http://localhost:3001/public/uploads/categories/phone-accessories.svg',
        parent: 'c00000000000000000000006',
        children: [
          {
            _id: 'c00000000000000000000017',
            order: 6.0301,
            name: 'Pin sạc dự phòng',
            image: 'http://localhost:3001/public/uploads/categories/power-bank.svg',
            parent: 'c00000000000000000000016',
            children: [],
            isHide: false,
            createdBy: 'a00000000000000000000001',
            updatedBy: 'a00000000000000000000001',
            createdAt: '2021-11-23T04:39:59.485Z',
            updatedAt: '2021-11-23T04:39:59.485Z',
            slug: 'pin-sac-du-phong'
          },
          {
            _id: 'c00000000000000000000018',
            order: 6.0302,
            name: 'Sim, thẻ',
            image: 'http://localhost:3001/public/uploads/categories/sim.svg',
            parent: 'c00000000000000000000016',
            children: [],
            isHide: false,
            createdBy: 'a00000000000000000000001',
            updatedBy: 'a00000000000000000000001',
            createdAt: '2021-11-23T04:39:59.495Z',
            updatedAt: '2021-11-23T04:39:59.495Z',
            slug: 'sim-the'
          },
          {
            _id: 'c00000000000000000000019',
            order: 6.0303,
            name: 'Miếng dán màn hình',
            parent: 'c00000000000000000000016',
            children: [],
            isHide: false,
            createdBy: 'a00000000000000000000001',
            updatedBy: 'a00000000000000000000001',
            createdAt: '2021-11-23T04:39:59.505Z',
            updatedAt: '2021-11-23T04:39:59.505Z',
            slug: 'mieng-dan-man-hinh'
          },
          {
            _id: 'c0000000000000000000001a',
            order: 6.0304,
            name: 'Ốp lưng, bao da',
            parent: 'c00000000000000000000016',
            children: [],
            isHide: false,
            createdBy: 'a00000000000000000000001',
            updatedBy: 'a00000000000000000000001',
            createdAt: '2021-11-23T04:39:59.515Z',
            updatedAt: '2021-11-23T04:39:59.515Z',
            slug: 'op-lung-bao-da'
          },
          {
            _id: 'c0000000000000000000001b',
            order: 6.0305,
            name: 'Gậy tự sướng',
            parent: 'c00000000000000000000016',
            children: [],
            isHide: false,
            createdBy: 'a00000000000000000000001',
            updatedBy: 'a00000000000000000000001',
            createdAt: '2021-11-23T04:39:59.528Z',
            updatedAt: '2021-11-23T04:39:59.528Z',
            slug: 'gay-tu-suong'
          },
          {
            _id: 'c0000000000000000000001c',
            order: 6.0306,
            name: 'Cáp sạc',
            image: 'http://localhost:3001/public/uploads/categories/cable.svg',
            parent: 'c00000000000000000000016',
            children: [
              {
                _id: 'c0000000000000000000001d',
                order: 6.0307,
                name: 'Cáp micro USB',
                parent: 'c0000000000000000000001c',
                children: [],
                isHide: false,
                createdBy: 'a00000000000000000000001',
                updatedBy: 'a00000000000000000000001',
                createdAt: '2021-11-23T04:39:59.549Z',
                updatedAt: '2021-11-23T04:39:59.549Z',
                slug: 'cap-micro-usb'
              },
              {
                _id: 'c0000000000000000000001e',
                order: 6.0308,
                name: 'Cáp type C',
                parent: 'c0000000000000000000001c',
                children: [],
                isHide: false,
                createdBy: 'a00000000000000000000001',
                updatedBy: 'a00000000000000000000001',
                createdAt: '2021-11-23T04:39:59.559Z',
                updatedAt: '2021-11-23T04:39:59.559Z',
                slug: 'cap-type-c'
              },
              {
                _id: 'c0000000000000000000001f',
                order: 6.0309,
                name: 'Cáp lightning',
                parent: 'c0000000000000000000001c',
                children: [],
                isHide: false,
                createdBy: 'a00000000000000000000001',
                updatedBy: 'a00000000000000000000001',
                createdAt: '2021-11-23T04:39:59.568Z',
                updatedAt: '2021-11-23T04:39:59.568Z',
                slug: 'cap-lightning'
              }
            ],
            isHide: false,
            createdBy: 'a00000000000000000000001',
            updatedBy: 'a00000000000000000000001',
            createdAt: '2021-11-23T04:39:59.540Z',
            updatedAt: '2021-11-23T04:39:59.567Z',
            slug: 'cap-sac'
          }
        ],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.478Z',
        updatedAt: '2021-11-23T04:39:59.537Z',
        slug: 'phu-kien-dien-thoai'
      },
      {
        _id: 'c00000000000000000000020',
        order: 6.04,
        name: 'Phụ kiện máy tính',
        image: 'http://localhost:3001/public/uploads/categories/computer-maintenance.svg',
        parent: 'c00000000000000000000006',
        children: [
          {
            _id: 'c00000000000000000000021',
            order: 6.0401,
            name: 'Bàn phím',
            image: 'http://localhost:3001/public/uploads/categories/keyboard.svg',
            parent: 'c00000000000000000000020',
            children: [],
            isHide: false,
            createdBy: 'a00000000000000000000001',
            updatedBy: 'a00000000000000000000001',
            createdAt: '2021-11-23T04:39:59.601Z',
            updatedAt: '2021-11-23T04:39:59.601Z',
            slug: 'ban-phim'
          },
          {
            _id: 'c00000000000000000000022',
            order: 6.0402,
            name: 'Chuột',
            image: 'http://localhost:3001/public/uploads/categories/mouse.svg',
            parent: 'c00000000000000000000020',
            children: [],
            isHide: false,
            createdBy: 'a00000000000000000000001',
            updatedBy: 'a00000000000000000000001',
            createdAt: '2021-11-23T04:39:59.611Z',
            updatedAt: '2021-11-23T04:39:59.611Z',
            slug: 'chuot'
          },
          {
            _id: 'c00000000000000000000023',
            order: 6.0403,
            name: 'Màn hình',
            image: 'http://localhost:3001/public/uploads/categories/monitor.svg',
            parent: 'c00000000000000000000020',
            children: [],
            isHide: false,
            createdBy: 'a00000000000000000000001',
            updatedBy: 'a00000000000000000000001',
            createdAt: '2021-11-23T04:39:59.621Z',
            updatedAt: '2021-11-23T04:39:59.621Z',
            slug: 'man-hinh'
          },
          {
            _id: 'c00000000000000000000024',
            order: 6.0404,
            name: 'Máy in',
            image: 'http://localhost:3001/public/uploads/categories/printer.svg',
            parent: 'c00000000000000000000020',
            children: [],
            isHide: false,
            createdBy: 'a00000000000000000000001',
            updatedBy: 'a00000000000000000000001',
            createdAt: '2021-11-23T04:39:59.632Z',
            updatedAt: '2021-11-23T04:39:59.632Z',
            slug: 'may-in'
          },
          {
            _id: 'c00000000000000000000025',
            order: 6.0405,
            name: 'Balo, túi chống sốc',
            image: 'http://localhost:3001/public/uploads/categories/laptop-sleeve.svg',
            parent: 'c00000000000000000000020',
            children: [],
            isHide: false,
            createdBy: 'a00000000000000000000001',
            updatedBy: 'a00000000000000000000001',
            createdAt: '2021-11-23T04:39:59.646Z',
            updatedAt: '2021-11-23T04:39:59.646Z',
            slug: 'balo-tui-chong-soc'
          },
          {
            _id: 'c00000000000000000000026',
            order: 6.0406,
            name: 'Phần mềm',
            image: 'http://localhost:3001/public/uploads/categories/software-dvd.svg',
            parent: 'c00000000000000000000020',
            children: [],
            isHide: false,
            createdBy: 'a00000000000000000000001',
            updatedBy: 'a00000000000000000000001',
            createdAt: '2021-11-23T04:39:59.658Z',
            updatedAt: '2021-11-23T04:39:59.658Z',
            slug: 'phan-mem'
          }
        ],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.589Z',
        updatedAt: '2021-11-23T04:39:59.655Z',
        slug: 'phu-kien-may-tinh'
      },
      {
        _id: 'c00000000000000000000027',
        order: 6.05,
        name: 'Phụ kiện máy ảnh',
        image: 'http://localhost:3001/public/uploads/categories/camera-change.svg',
        parent: 'c00000000000000000000006',
        children: [],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.678Z',
        updatedAt: '2021-11-23T04:39:59.678Z',
        slug: 'phu-kien-may-anh'
      },
      {
        _id: 'c00000000000000000000028',
        order: 6.06,
        name: 'Phụ kiện khác',
        image: 'http://localhost:3001/public/uploads/categories/others.svg',
        parent: 'c00000000000000000000006',
        children: [],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.698Z',
        updatedAt: '2021-11-23T04:39:59.698Z',
        slug: 'phu-kien-khac'
      }
    ],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.362Z',
    updatedAt: '2021-11-23T04:39:59.696Z',
    slug: 'phu-kien'
  },
  {
    _id: 'c00000000000000000000007',
    order: 6.01,
    name: 'Thiết bị âm thanh',
    image: 'http://localhost:3001/public/uploads/categories/sound.svg',
    parent: 'c00000000000000000000006',
    children: [
      {
        _id: 'c00000000000000000000008',
        order: 6.0101,
        name: 'Tai nghe',
        image: 'http://localhost:3001/public/uploads/categories/headphone.svg',
        parent: 'c00000000000000000000007',
        children: [
          {
            _id: 'c00000000000000000000009',
            order: 6.010101,
            name: 'Tai nghe Bluetooth',
            image: 'http://localhost:3001/public/uploads/categories/bluetooth.svg',
            parent: 'c00000000000000000000008',
            children: [],
            isHide: false,
            createdBy: 'a00000000000000000000001',
            updatedBy: 'a00000000000000000000001',
            createdAt: '2021-11-23T04:39:59.397Z',
            updatedAt: '2021-11-23T04:39:59.397Z',
            slug: 'tai-nghe-bluetooth'
          },
          {
            _id: 'c00000000000000000000010',
            order: 6.010102,
            name: 'Tai nghe có dây',
            image: 'http://localhost:3001/public/uploads/categories/earphone.svg',
            parent: 'c00000000000000000000008',
            children: [],
            isHide: false,
            createdBy: 'a00000000000000000000001',
            updatedBy: 'a00000000000000000000001',
            createdAt: '2021-11-23T04:39:59.410Z',
            updatedAt: '2021-11-23T04:39:59.410Z',
            slug: 'tai-nghe-co-day'
          }
        ],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.389Z',
        updatedAt: '2021-11-23T04:39:59.408Z',
        slug: 'tai-nghe'
      },
      {
        _id: 'c00000000000000000000011',
        order: 6.0102,
        name: 'Loa',
        image: 'http://localhost:3001/public/uploads/categories/speaker.svg',
        parent: 'c00000000000000000000007',
        children: [],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.422Z',
        updatedAt: '2021-11-23T04:39:59.422Z',
        slug: 'loa'
      }
    ],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.380Z',
    updatedAt: '2021-11-23T04:39:59.420Z',
    slug: 'thiet-bi-am-thanh'
  },
  {
    _id: 'c00000000000000000000008',
    order: 6.0101,
    name: 'Tai nghe',
    image: 'http://localhost:3001/public/uploads/categories/headphone.svg',
    parent: 'c00000000000000000000007',
    children: [
      {
        _id: 'c00000000000000000000009',
        order: 6.010101,
        name: 'Tai nghe Bluetooth',
        image: 'http://localhost:3001/public/uploads/categories/bluetooth.svg',
        parent: 'c00000000000000000000008',
        children: [],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.397Z',
        updatedAt: '2021-11-23T04:39:59.397Z',
        slug: 'tai-nghe-bluetooth'
      },
      {
        _id: 'c00000000000000000000010',
        order: 6.010102,
        name: 'Tai nghe có dây',
        image: 'http://localhost:3001/public/uploads/categories/earphone.svg',
        parent: 'c00000000000000000000008',
        children: [],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.410Z',
        updatedAt: '2021-11-23T04:39:59.410Z',
        slug: 'tai-nghe-co-day'
      }
    ],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.389Z',
    updatedAt: '2021-11-23T04:39:59.408Z',
    slug: 'tai-nghe'
  },
  {
    _id: 'c00000000000000000000009',
    order: 6.010101,
    name: 'Tai nghe Bluetooth',
    image: 'http://localhost:3001/public/uploads/categories/bluetooth.svg',
    parent: 'c00000000000000000000008',
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.397Z',
    updatedAt: '2021-11-23T04:39:59.397Z',
    slug: 'tai-nghe-bluetooth'
  },
  {
    _id: 'c00000000000000000000010',
    order: 6.010102,
    name: 'Tai nghe có dây',
    image: 'http://localhost:3001/public/uploads/categories/earphone.svg',
    parent: 'c00000000000000000000008',
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.410Z',
    updatedAt: '2021-11-23T04:39:59.410Z',
    slug: 'tai-nghe-co-day'
  },
  {
    _id: 'c00000000000000000000011',
    order: 6.0102,
    name: 'Loa',
    image: 'http://localhost:3001/public/uploads/categories/speaker.svg',
    parent: 'c00000000000000000000007',
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.422Z',
    updatedAt: '2021-11-23T04:39:59.422Z',
    slug: 'loa'
  },
  {
    _id: 'c00000000000000000000012',
    order: 6.02,
    name: 'Thiết bị lưu trữ',
    image: 'http://localhost:3001/public/uploads/categories/data-storage.svg',
    parent: 'c00000000000000000000006',
    children: [
      {
        _id: 'c00000000000000000000013',
        order: 6.0201,
        name: 'Thẻ nhớ',
        image: 'http://localhost:3001/public/uploads/categories/sd-storage.svg',
        parent: 'c00000000000000000000012',
        children: [],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.443Z',
        updatedAt: '2021-11-23T04:39:59.443Z',
        slug: 'the-nho'
      },
      {
        _id: 'c00000000000000000000014',
        order: 6.0202,
        name: 'USB',
        image: 'http://localhost:3001/public/uploads/categories/usb.svg',
        parent: 'c00000000000000000000012',
        children: [],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.452Z',
        updatedAt: '2021-11-23T04:39:59.452Z',
        slug: 'usb'
      },
      {
        _id: 'c00000000000000000000015',
        order: 6.0203,
        name: 'Ổ cứng di động',
        image: 'http://localhost:3001/public/uploads/categories/hdd.svg',
        parent: 'c00000000000000000000012',
        children: [],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.463Z',
        updatedAt: '2021-11-23T04:39:59.463Z',
        slug: 'o-cung-di-dong'
      }
    ],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.435Z',
    updatedAt: '2021-11-23T04:39:59.462Z',
    slug: 'thiet-bi-luu-tru'
  },
  {
    _id: 'c00000000000000000000013',
    order: 6.0201,
    name: 'Thẻ nhớ',
    image: 'http://localhost:3001/public/uploads/categories/sd-storage.svg',
    parent: 'c00000000000000000000012',
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.443Z',
    updatedAt: '2021-11-23T04:39:59.443Z',
    slug: 'the-nho'
  },
  {
    _id: 'c00000000000000000000014',
    order: 6.0202,
    name: 'USB',
    image: 'http://localhost:3001/public/uploads/categories/usb.svg',
    parent: 'c00000000000000000000012',
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.452Z',
    updatedAt: '2021-11-23T04:39:59.452Z',
    slug: 'usb'
  },
  {
    _id: 'c00000000000000000000015',
    order: 6.0203,
    name: 'Ổ cứng di động',
    image: 'http://localhost:3001/public/uploads/categories/hdd.svg',
    parent: 'c00000000000000000000012',
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.463Z',
    updatedAt: '2021-11-23T04:39:59.463Z',
    slug: 'o-cung-di-dong'
  },
  {
    _id: 'c00000000000000000000016',
    order: 6.03,
    name: 'Phụ kiện điện thoại',
    image: 'http://localhost:3001/public/uploads/categories/phone-accessories.svg',
    parent: 'c00000000000000000000006',
    children: [
      {
        _id: 'c00000000000000000000017',
        order: 6.0301,
        name: 'Pin sạc dự phòng',
        image: 'http://localhost:3001/public/uploads/categories/power-bank.svg',
        parent: 'c00000000000000000000016',
        children: [],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.485Z',
        updatedAt: '2021-11-23T04:39:59.485Z',
        slug: 'pin-sac-du-phong'
      },
      {
        _id: 'c00000000000000000000018',
        order: 6.0302,
        name: 'Sim, thẻ',
        image: 'http://localhost:3001/public/uploads/categories/sim.svg',
        parent: 'c00000000000000000000016',
        children: [],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.495Z',
        updatedAt: '2021-11-23T04:39:59.495Z',
        slug: 'sim-the'
      },
      {
        _id: 'c00000000000000000000019',
        order: 6.0303,
        name: 'Miếng dán màn hình',
        parent: 'c00000000000000000000016',
        children: [],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.505Z',
        updatedAt: '2021-11-23T04:39:59.505Z',
        slug: 'mieng-dan-man-hinh'
      },
      {
        _id: 'c0000000000000000000001a',
        order: 6.0304,
        name: 'Ốp lưng, bao da',
        parent: 'c00000000000000000000016',
        children: [],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.515Z',
        updatedAt: '2021-11-23T04:39:59.515Z',
        slug: 'op-lung-bao-da'
      },
      {
        _id: 'c0000000000000000000001b',
        order: 6.0305,
        name: 'Gậy tự sướng',
        parent: 'c00000000000000000000016',
        children: [],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.528Z',
        updatedAt: '2021-11-23T04:39:59.528Z',
        slug: 'gay-tu-suong'
      },
      {
        _id: 'c0000000000000000000001c',
        order: 6.0306,
        name: 'Cáp sạc',
        image: 'http://localhost:3001/public/uploads/categories/cable.svg',
        parent: 'c00000000000000000000016',
        children: [
          {
            _id: 'c0000000000000000000001d',
            order: 6.0307,
            name: 'Cáp micro USB',
            parent: 'c0000000000000000000001c',
            children: [],
            isHide: false,
            createdBy: 'a00000000000000000000001',
            updatedBy: 'a00000000000000000000001',
            createdAt: '2021-11-23T04:39:59.549Z',
            updatedAt: '2021-11-23T04:39:59.549Z',
            slug: 'cap-micro-usb'
          },
          {
            _id: 'c0000000000000000000001e',
            order: 6.0308,
            name: 'Cáp type C',
            parent: 'c0000000000000000000001c',
            children: [],
            isHide: false,
            createdBy: 'a00000000000000000000001',
            updatedBy: 'a00000000000000000000001',
            createdAt: '2021-11-23T04:39:59.559Z',
            updatedAt: '2021-11-23T04:39:59.559Z',
            slug: 'cap-type-c'
          },
          {
            _id: 'c0000000000000000000001f',
            order: 6.0309,
            name: 'Cáp lightning',
            parent: 'c0000000000000000000001c',
            children: [],
            isHide: false,
            createdBy: 'a00000000000000000000001',
            updatedBy: 'a00000000000000000000001',
            createdAt: '2021-11-23T04:39:59.568Z',
            updatedAt: '2021-11-23T04:39:59.568Z',
            slug: 'cap-lightning'
          }
        ],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.540Z',
        updatedAt: '2021-11-23T04:39:59.567Z',
        slug: 'cap-sac'
      }
    ],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.478Z',
    updatedAt: '2021-11-23T04:39:59.537Z',
    slug: 'phu-kien-dien-thoai'
  },
  {
    _id: 'c00000000000000000000017',
    order: 6.0301,
    name: 'Pin sạc dự phòng',
    image: 'http://localhost:3001/public/uploads/categories/power-bank.svg',
    parent: 'c00000000000000000000016',
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.485Z',
    updatedAt: '2021-11-23T04:39:59.485Z',
    slug: 'pin-sac-du-phong'
  },
  {
    _id: 'c00000000000000000000018',
    order: 6.0302,
    name: 'Sim, thẻ',
    image: 'http://localhost:3001/public/uploads/categories/sim.svg',
    parent: 'c00000000000000000000016',
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.495Z',
    updatedAt: '2021-11-23T04:39:59.495Z',
    slug: 'sim-the'
  },
  {
    _id: 'c00000000000000000000019',
    order: 6.0303,
    name: 'Miếng dán màn hình',
    parent: 'c00000000000000000000016',
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.505Z',
    updatedAt: '2021-11-23T04:39:59.505Z',
    slug: 'mieng-dan-man-hinh'
  },
  {
    _id: 'c0000000000000000000001a',
    order: 6.0304,
    name: 'Ốp lưng, bao da',
    parent: 'c00000000000000000000016',
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.515Z',
    updatedAt: '2021-11-23T04:39:59.515Z',
    slug: 'op-lung-bao-da'
  },
  {
    _id: 'c0000000000000000000001b',
    order: 6.0305,
    name: 'Gậy tự sướng',
    parent: 'c00000000000000000000016',
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.528Z',
    updatedAt: '2021-11-23T04:39:59.528Z',
    slug: 'gay-tu-suong'
  },
  {
    _id: 'c0000000000000000000001c',
    order: 6.0306,
    name: 'Cáp sạc',
    image: 'http://localhost:3001/public/uploads/categories/cable.svg',
    parent: 'c00000000000000000000016',
    children: [
      {
        _id: 'c0000000000000000000001d',
        order: 6.0307,
        name: 'Cáp micro USB',
        parent: 'c0000000000000000000001c',
        children: [],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.549Z',
        updatedAt: '2021-11-23T04:39:59.549Z',
        slug: 'cap-micro-usb'
      },
      {
        _id: 'c0000000000000000000001e',
        order: 6.0308,
        name: 'Cáp type C',
        parent: 'c0000000000000000000001c',
        children: [],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.559Z',
        updatedAt: '2021-11-23T04:39:59.559Z',
        slug: 'cap-type-c'
      },
      {
        _id: 'c0000000000000000000001f',
        order: 6.0309,
        name: 'Cáp lightning',
        parent: 'c0000000000000000000001c',
        children: [],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.568Z',
        updatedAt: '2021-11-23T04:39:59.568Z',
        slug: 'cap-lightning'
      }
    ],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.540Z',
    updatedAt: '2021-11-23T04:39:59.567Z',
    slug: 'cap-sac'
  },
  {
    _id: 'c0000000000000000000001d',
    order: 6.0307,
    name: 'Cáp micro USB',
    parent: 'c0000000000000000000001c',
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.549Z',
    updatedAt: '2021-11-23T04:39:59.549Z',
    slug: 'cap-micro-usb'
  },
  {
    _id: 'c0000000000000000000001e',
    order: 6.0308,
    name: 'Cáp type C',
    parent: 'c0000000000000000000001c',
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.559Z',
    updatedAt: '2021-11-23T04:39:59.559Z',
    slug: 'cap-type-c'
  },
  {
    _id: 'c0000000000000000000001f',
    order: 6.0309,
    name: 'Cáp lightning',
    parent: 'c0000000000000000000001c',
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.568Z',
    updatedAt: '2021-11-23T04:39:59.568Z',
    slug: 'cap-lightning'
  },
  {
    _id: 'c00000000000000000000020',
    order: 6.04,
    name: 'Phụ kiện máy tính',
    image: 'http://localhost:3001/public/uploads/categories/computer-maintenance.svg',
    parent: 'c00000000000000000000006',
    children: [
      {
        _id: 'c00000000000000000000021',
        order: 6.0401,
        name: 'Bàn phím',
        image: 'http://localhost:3001/public/uploads/categories/keyboard.svg',
        parent: 'c00000000000000000000020',
        children: [],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.601Z',
        updatedAt: '2021-11-23T04:39:59.601Z',
        slug: 'ban-phim'
      },
      {
        _id: 'c00000000000000000000022',
        order: 6.0402,
        name: 'Chuột',
        image: 'http://localhost:3001/public/uploads/categories/mouse.svg',
        parent: 'c00000000000000000000020',
        children: [],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.611Z',
        updatedAt: '2021-11-23T04:39:59.611Z',
        slug: 'chuot'
      },
      {
        _id: 'c00000000000000000000023',
        order: 6.0403,
        name: 'Màn hình',
        image: 'http://localhost:3001/public/uploads/categories/monitor.svg',
        parent: 'c00000000000000000000020',
        children: [],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.621Z',
        updatedAt: '2021-11-23T04:39:59.621Z',
        slug: 'man-hinh'
      },
      {
        _id: 'c00000000000000000000024',
        order: 6.0404,
        name: 'Máy in',
        image: 'http://localhost:3001/public/uploads/categories/printer.svg',
        parent: 'c00000000000000000000020',
        children: [],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.632Z',
        updatedAt: '2021-11-23T04:39:59.632Z',
        slug: 'may-in'
      },
      {
        _id: 'c00000000000000000000025',
        order: 6.0405,
        name: 'Balo, túi chống sốc',
        image: 'http://localhost:3001/public/uploads/categories/laptop-sleeve.svg',
        parent: 'c00000000000000000000020',
        children: [],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.646Z',
        updatedAt: '2021-11-23T04:39:59.646Z',
        slug: 'balo-tui-chong-soc'
      },
      {
        _id: 'c00000000000000000000026',
        order: 6.0406,
        name: 'Phần mềm',
        image: 'http://localhost:3001/public/uploads/categories/software-dvd.svg',
        parent: 'c00000000000000000000020',
        children: [],
        isHide: false,
        createdBy: 'a00000000000000000000001',
        updatedBy: 'a00000000000000000000001',
        createdAt: '2021-11-23T04:39:59.658Z',
        updatedAt: '2021-11-23T04:39:59.658Z',
        slug: 'phan-mem'
      }
    ],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.589Z',
    updatedAt: '2021-11-23T04:39:59.655Z',
    slug: 'phu-kien-may-tinh'
  },
  {
    _id: 'c00000000000000000000021',
    order: 6.0401,
    name: 'Bàn phím',
    image: 'http://localhost:3001/public/uploads/categories/keyboard.svg',
    parent: 'c00000000000000000000020',
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.601Z',
    updatedAt: '2021-11-23T04:39:59.601Z',
    slug: 'ban-phim'
  },
  {
    _id: 'c00000000000000000000022',
    order: 6.0402,
    name: 'Chuột',
    image: 'http://localhost:3001/public/uploads/categories/mouse.svg',
    parent: 'c00000000000000000000020',
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.611Z',
    updatedAt: '2021-11-23T04:39:59.611Z',
    slug: 'chuot'
  },
  {
    _id: 'c00000000000000000000023',
    order: 6.0403,
    name: 'Màn hình',
    image: 'http://localhost:3001/public/uploads/categories/monitor.svg',
    parent: 'c00000000000000000000020',
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.621Z',
    updatedAt: '2021-11-23T04:39:59.621Z',
    slug: 'man-hinh'
  },
  {
    _id: 'c00000000000000000000024',
    order: 6.0404,
    name: 'Máy in',
    image: 'http://localhost:3001/public/uploads/categories/printer.svg',
    parent: 'c00000000000000000000020',
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.632Z',
    updatedAt: '2021-11-23T04:39:59.632Z',
    slug: 'may-in'
  },
  {
    _id: 'c00000000000000000000025',
    order: 6.0405,
    name: 'Balo, túi chống sốc',
    image: 'http://localhost:3001/public/uploads/categories/laptop-sleeve.svg',
    parent: 'c00000000000000000000020',
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.646Z',
    updatedAt: '2021-11-23T04:39:59.646Z',
    slug: 'balo-tui-chong-soc'
  },
  {
    _id: 'c00000000000000000000026',
    order: 6.0406,
    name: 'Phần mềm',
    image: 'http://localhost:3001/public/uploads/categories/software-dvd.svg',
    parent: 'c00000000000000000000020',
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.658Z',
    updatedAt: '2021-11-23T04:39:59.658Z',
    slug: 'phan-mem'
  },
  {
    _id: 'c00000000000000000000027',
    order: 6.05,
    name: 'Phụ kiện máy ảnh',
    image: 'http://localhost:3001/public/uploads/categories/camera-change.svg',
    parent: 'c00000000000000000000006',
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.678Z',
    updatedAt: '2021-11-23T04:39:59.678Z',
    slug: 'phu-kien-may-anh'
  },
  {
    _id: 'c00000000000000000000028',
    order: 6.06,
    name: 'Phụ kiện khác',
    image: 'http://localhost:3001/public/uploads/categories/others.svg',
    parent: 'c00000000000000000000006',
    children: [],
    isHide: false,
    createdAt: '2021-11-23T04:39:59.698Z',
    updatedAt: '2021-11-23T04:39:59.698Z',
    slug: 'phu-kien-khac'
  }
];

const brandsMockData = [
  {
    _id: 'b00000000000000000000011',
    name: 'Canon',
    desc: 'Canon Inc. là một tập đoàn đa quốc gia của Nhật Bản có trụ sở chính tại Ōta, Tokyo, Nhật Bản, chuyên về các sản phẩm quang học, hình ảnh và công nghiệp, chẳng hạn như ống kính, máy ảnh, thiết bị y tế, máy quét, máy in và thiết bị sản xuất chất bán dẫn.',
    country: 'Nhật Bản',
    image: 'http://localhost:3001/public/uploads/brands/canon.png',
    isHide: false,
    createdAt: '2021-11-23T04:39:59.751Z',
    updatedAt: '2021-11-23T04:39:59.751Z',
    slug: 'canon'
  },
  {
    _id: 'b00000000000000000000010',
    name: 'Nikon',
    desc: 'Nikon Corporation, còn được gọi là Nikon, là một tập đoàn đa quốc gia của Nhật Bản có trụ sở chính tại Tokyo, Nhật Bản, chuyên về quang học và các sản phẩm hình ảnh',
    country: 'Nhật Bản',
    image: 'http://localhost:3001/public/uploads/brands/nikon.png',
    isHide: false,
    createdAt: '2021-11-23T04:39:59.748Z',
    updatedAt: '2021-11-23T04:39:59.748Z',
    slug: 'nikon'
  },
  {
    _id: 'b00000000000000000000009',
    name: 'MSI',
    desc: 'Micro-Star International Co., Ltd là một tập đoàn công nghệ thông tin đa quốc gia của Đài Loan có trụ sở chính tại thành phố Tân Đài Bắc, Đài Loan.',
    country: 'Đài Loan',
    image: 'http://localhost:3001/public/uploads/brands/msi.png',
    isHide: false,
    createdAt: '2021-11-23T04:39:59.744Z',
    updatedAt: '2021-11-23T04:39:59.744Z',
    slug: 'msi'
  },
  {
    _id: 'b00000000000000000000008',
    name: 'Dell',
    desc: 'Dell là một công ty công nghệ máy tính đa quốc gia của Mỹ chuyên phát triển, bán, sửa chữa và hỗ trợ máy tính cũng như các sản phẩm và dịch vụ liên quan và thuộc sở hữu của công ty mẹ Dell Technologies.',
    country: 'Mỹ',
    image: 'http://localhost:3001/public/uploads/brands/dell.png',
    isHide: false,
    createdAt: '2021-11-23T04:39:59.735Z',
    updatedAt: '2021-11-23T04:39:59.735Z',
    slug: 'dell'
  },
  {
    _id: 'b00000000000000000000007',
    name: 'ASUS',
    desc: 'ASUS đam mê công nghệ và được thúc đẩy bởi sự đổi mới. Chúng tôi mơ ước, chúng tôi dám và chúng tôi cố gắng để tạo ra một cuộc sống kỹ thuật số dễ dàng và thú vị cho tất cả mọi người. Chúng tôi luôn tìm kiếm những ý tưởng và trải nghiệm đáng kinh ngạc, và chúng tôi mong muốn cung cấp những điều đó trong mọi việc chúng tôi làm.',
    country: 'Đài Loan',
    image: 'http://localhost:3001/public/uploads/brands/asus.png',
    isHide: false,
    createdAt: '2021-11-23T04:39:59.732Z',
    updatedAt: '2021-11-23T04:39:59.732Z',
    slug: 'asus'
  },
  {
    _id: 'b00000000000000000000006',
    name: 'Sony',
    desc: 'Sony là một trong những thương hiệu toàn cầu nổi tiếng nhất về điện tử tiêu dùng nhờ vào những sáng tạo đột phá mang tính cách mạng và chất lượng sản phẩm. Thành công của Sony tại thị trường Việt Nam là bởi thương hiệu Sony luôn thể hiện được bản sắc riêng một cách mạnh mẽ và ấn tượng, kết hợp giữa chất lượng sản phẩm-công nghệ hàng đầu-kiểu dáng thiết kế độc đáo và cách xây dựng thương hiệu sáng tạo-tôn trọng văn hóa bản địa tiếp tục nâng cao tinh thần sáng tạo của mình để luôn tạo ra sản phẩm chất lượng cho người dùng.',
    country: 'Nhật Bản',
    image: 'http://localhost:3001/public/uploads/brands/sony.png',
    isHide: false,
    createdAt: '2021-11-23T04:39:59.729Z',
    updatedAt: '2021-11-23T04:39:59.729Z',
    slug: 'sony'
  },
  {
    _id: 'b00000000000000000000005',
    name: 'Philips',
    desc: 'Koninklijke Philips N.V. là một tập đoàn đa quốc gia của Hà Lan được thành lập tại Eindhoven. Kể từ năm 1997, nó chủ yếu có trụ sở chính ở Amsterdam, mặc dù trụ sở chính của Benelux vẫn ở Eindhoven',
    country: 'Hà Lan',
    image: 'http://localhost:3001/public/uploads/brands/philips.png',
    isHide: false,
    createdAt: '2021-11-23T04:39:59.726Z',
    updatedAt: '2021-11-23T04:39:59.726Z',
    slug: 'philips'
  },
  {
    _id: 'b00000000000000000000004',
    name: 'LG Electronics',
    desc: 'LG Electronics Inc. là một công ty điện tử đa quốc gia của Hàn Quốc có trụ sở chính tại Yeouido-dong, Seoul, Hàn Quốc. LG Electronics là một phần của tập đoàn chaebol lớn thứ tư ở Hàn Quốc và doanh thu toàn cầu của nó đạt 55,91 tỷ USD vào năm 2014.',
    country: 'Hàn Quốc',
    image: 'http://localhost:3001/public/uploads/brands/lg-electronics.png',
    isHide: false,
    createdAt: '2021-11-23T04:39:59.720Z',
    updatedAt: '2021-11-23T04:39:59.720Z',
    slug: 'lg-electronics'
  },
  {
    _id: 'b00000000000000000000003',
    name: 'Apple',
    desc: 'Apple Inc. là một công ty công nghệ đa quốc gia của Mỹ có trụ sở chính tại Cupertino, California, chuyên thiết kế, phát triển và bán thiết bị điện tử tiêu dùng, phần mềm máy tính và các dịch vụ trực tuyến',
    country: 'Mỹ',
    image: 'http://localhost:3001/public/uploads/brands/apple.png',
    isHide: false,
    createdAt: '2021-11-23T04:39:59.712Z',
    updatedAt: '2021-11-23T04:39:59.712Z',
    slug: 'apple'
  },
  {
    _id: 'b00000000000000000000002',
    name: 'Samsung',
    desc: 'Thương hiệu chiếm lĩnh thị trường smartphone Việt. Samsung là tập đoàn đa quốc gia có trụ sở được đặt tại thủ đô Seoul, Hàn Quốc',
    country: 'Hàn Quốc',
    image: 'http://localhost:3001/public/uploads/brands/samsung.png',
    isHide: false,
    createdAt: '2021-11-23T04:39:59.709Z',
    updatedAt: '2021-11-23T04:39:59.709Z',
    slug: 'samsung'
  },
  {
    _id: 'b00000000000000000000001',
    name: 'Vsmart',
    desc: 'Vsmart là thương hiệu mang tính công nghệ và trí tuệ Việt, mang tinh thần của một Việt Nam mới mẻ, hiện đại, là nền tảng hội tụ kết nối trí tuệ, đồng thời là đại diện của Vingroup trong lộ trình toàn cầu hóa, vươn ra thế giới.',
    country: 'Việt Nam',
    image: 'http://localhost:3001/public/uploads/brands/vsmart.png',
    isHide: false,
    createdAt: '2021-11-23T04:39:59.704Z',
    updatedAt: '2021-11-23T04:39:59.704Z',
    slug: 'vsmart'
  }
];
