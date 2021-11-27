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
