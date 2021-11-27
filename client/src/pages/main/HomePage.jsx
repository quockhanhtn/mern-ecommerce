import { useEffect } from 'react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// components
import { Container, Card, CardContent, CardHeader, Grid } from '@material-ui/core';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../../actions/categories';
import { getAllBrands } from '../../actions/brands';
import { getAllDiscounts } from '../../actions/discounts';
// hooks
import useLocales from '../../hooks/useLocales';
// components
import Page from '../../components/Page';
import { CarouselAnimation, CarouselMiniList } from '../../components/carousel';
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
  const { t } = useLocales();

  const dispatch = useDispatch();
  const { listSimple: brandsListRaw, isLoading: isLoadingBrand } = useSelector((state) => state.brand);
  const { listSimple: discountsListRaw, isLoading: isLoadingDiscount } = useSelector((state) => state.discount);
  const brandsList = brandsListRaw.map((x) => ({
    title: x.name,
    image: x.image,
    description: x.description,
    path: `/b/${x.slug}`
  }));
  const discountList = discountsListRaw.map((x) => ({
    _id: x._id,
    image: x.image || 'https://source.unsplash.com/random/800x600',
    title: x.name,
    link: `/d/${x.code}`,
    description: x.desc
  }));

  useEffect(() => {
    dispatch(getAllCategories(true));
    dispatch(getAllBrands(true));
    dispatch(getAllDiscounts(true));
  }, [dispatch]);

  return (
    <RootStyle title={t('home.page-title')} id="move_top">
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
                <CardHeader title={t('dashboard.brands.heading')} />
                <CardContent>
                  <CarouselMiniList
                    items={brandsList}
                    numberPerRow={2}
                    numberShow={2}
                    isLoading={isLoadingBrand}
                    width={200}
                    height={60}
                    isShowTitle={false}
                    imgObjectFit="contain"
                    otherSlickSetting={{
                      infinite: true,
                      swipeToSlide: true,
                      slidesPerRow: 2,
                      rows: 2,
                      responsive: [
                        {
                          breakpoint: 1024,
                          settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true }
                        },
                        {
                          breakpoint: 600,
                          settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2 }
                        },
                        {
                          breakpoint: 480,
                          settings: { slidesToShow: 1, slidesToScroll: 1 }
                        }
                      ]
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Products List */}
            <Grid item xs={12}>
              <Card>
                <CardHeader title={t('dashboard.products.heading')} />
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
